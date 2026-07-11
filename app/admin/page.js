'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabaseBrowser } from '@/lib/supabase-browser';

const STAGES = ['Nuevo', 'Contactado', 'Propuesta', 'Cerrado'];

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function AdminLogin({ onAuthed }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const { error: authError } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (authError) {
      setError('Correo o contraseña incorrectos.');
      return;
    }
    onAuthed();
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>Oli — Admin</h1>
        <p>Acceso solo para el equipo interno.</p>
        {error && <div className="admin-error">{error}</div>}
        <div className="admin-field">
          <label htmlFor="admin-email">Correo</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="admin-password">Contraseña</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="admin-btn" disabled={loading}>
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

// Paso de verificación en dos pasos al iniciar sesión, solo aparece si
// la cuenta ya tiene 2FA activo (ver SecuritySettings más abajo).
function MfaChallenge({ onVerified }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const { data: factors, error: factorsError } = await supabaseBrowser.auth.mfa.listFactors();
    const totpFactor = factors?.totp?.[0];
    if (factorsError || !totpFactor) {
      setLoading(false);
      setError('No se encontró tu método de verificación. Contacta al administrador.');
      return;
    }

    const { data: challenge, error: challengeError } = await supabaseBrowser.auth.mfa.challenge({
      factorId: totpFactor.id,
    });
    if (challengeError) {
      setLoading(false);
      setError('No se pudo iniciar la verificación. Intenta de nuevo.');
      return;
    }

    const { error: verifyError } = await supabaseBrowser.auth.mfa.verify({
      factorId: totpFactor.id,
      challengeId: challenge.id,
      code,
    });
    setLoading(false);
    if (verifyError) {
      setError('Código incorrecto. Revisa tu app de autenticación.');
      return;
    }
    onVerified();
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>Verificación en dos pasos</h1>
        <p>Escribe el código de 6 dígitos de tu app de autenticación.</p>
        {error && <div className="admin-error">{error}</div>}
        <div className="admin-field">
          <label htmlFor="mfa-code">Código</label>
          <input
            id="mfa-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            required
          />
        </div>
        <button type="submit" className="admin-btn" disabled={loading || code.length !== 6}>
          {loading ? 'Verificando…' : 'Verificar'}
        </button>
      </form>
    </div>
  );
}

// Panel para activar/desactivar 2FA. La primera vez que se activa, se
// exige verificar un código antes de confirmar — así no se puede
// activar por error con una app mal configurada y quedar fuera.
function SecuritySettings({ onClose }) {
  const [factors, setFactors] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [secret, setSecret] = useState(null);
  const [factorId, setFactorId] = useState(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadFactors = useCallback(async () => {
    const { data } = await supabaseBrowser.auth.mfa.listFactors();
    setFactors(data?.totp || []);
  }, []);

  useEffect(() => {
    loadFactors();
  }, [loadFactors]);

  async function startEnroll() {
    setError('');
    setLoading(true);
    const { data, error: enrollError } = await supabaseBrowser.auth.mfa.enroll({
      factorType: 'totp',
    });
    setLoading(false);
    if (enrollError) {
      setError('No se pudo iniciar la activación. Intenta de nuevo.');
      return;
    }
    setFactorId(data.id);
    setQrCode(data.totp.qr_code);
    setSecret(data.totp.secret);
    setEnrolling(true);
  }

  async function confirmEnroll(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    const { data: challenge, error: challengeError } = await supabaseBrowser.auth.mfa.challenge({
      factorId,
    });
    if (challengeError) {
      setLoading(false);
      setError('No se pudo verificar. Intenta de nuevo.');
      return;
    }
    const { error: verifyError } = await supabaseBrowser.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code,
    });
    setLoading(false);
    if (verifyError) {
      setError('Código incorrecto. Revisa tu app de autenticación e intenta de nuevo.');
      return;
    }
    setEnrolling(false);
    setQrCode(null);
    setSecret(null);
    setCode('');
    loadFactors();
  }

  async function removeFactor(id) {
    await supabaseBrowser.auth.mfa.unenroll({ factorId: id });
    loadFactors();
  }

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-head">
          <div>
            <h3>Seguridad</h3>
            <p>Verificación en dos pasos (2FA)</p>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        {error && <div className="admin-error">{error}</div>}

        {factors === null && <p>Cargando…</p>}

        {factors && factors.length > 0 && !enrolling && (
          <>
            <p>Verificación en dos pasos activa en esta cuenta.</p>
            {factors.map((f) => (
              <button
                key={f.id}
                type="button"
                className="admin-logout"
                onClick={() => removeFactor(f.id)}
              >
                Desactivar
              </button>
            ))}
          </>
        )}

        {factors && factors.length === 0 && !enrolling && (
          <>
            <p>
              No tienes verificación en dos pasos activa. Se recomienda
              activarla — necesitas una app como Google Authenticator, Authy
              o similar en tu teléfono.
            </p>
            <button type="button" className="admin-btn" onClick={startEnroll} disabled={loading}>
              {loading ? 'Preparando…' : 'Activar verificación en dos pasos'}
            </button>
          </>
        )}

        {enrolling && (
          <form onSubmit={confirmEnroll}>
            <p>Escanea este código con tu app de autenticación:</p>
            {qrCode && (
              // El QR viene firmado por nuestro propio proyecto de Supabase
              // (no es contenido de un usuario), por eso es seguro insertarlo.
              // eslint-disable-next-line react/no-danger
              <div
                style={{ background: 'white', padding: '1rem', borderRadius: 12, marginBottom: '1rem' }}
                dangerouslySetInnerHTML={{ __html: qrCode }}
              />
            )}
            {secret && (
              <p style={{ fontSize: '0.8rem', wordBreak: 'break-all', color: 'var(--ink-soft)' }}>
                O ingresa este código manualmente en tu app: <code>{secret}</code>
              </p>
            )}
            <div className="admin-field">
              <label htmlFor="enroll-code">Código de 6 dígitos</label>
              <input
                id="enroll-code"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
            <button type="submit" className="admin-btn" disabled={loading || code.length !== 6}>
              {loading ? 'Confirmando…' : 'Confirmar y activar'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function LeadDetail({ lead, onClose, onUpdated }) {
  const [estado, setEstado] = useState(lead.estado);
  const [notas, setNotas] = useState(lead.notas || '');
  const [savingNotas, setSavingNotas] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  async function updateEstado(nuevoEstado) {
    setEstado(nuevoEstado);
    await supabaseBrowser
      .from('oli_one_leads')
      .update({ estado: nuevoEstado })
      .eq('id', lead.id);
    onUpdated({ ...lead, estado: nuevoEstado });
  }

  async function saveNotas() {
    setSavingNotas(true);
    await supabaseBrowser.from('oli_one_leads').update({ notas }).eq('id', lead.id);
    setSavingNotas(false);
    setSavedAt(new Date());
    onUpdated({ ...lead, notas });
  }

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-head">
          <div>
            <h3>{lead.nombre}</h3>
            <p>{lead.puesto} — {lead.empresa}</p>
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <select
          className="admin-stage-select"
          value={estado}
          onChange={(e) => updateEstado(e.target.value)}
        >
          {STAGES.map((stage) => (
            <option key={stage} value={stage}>{stage}</option>
          ))}
        </select>

        <div className="admin-detail-grid">
          <div className="admin-detail-item">
            <label>Correo</label>
            <div><a href={`mailto:${lead.correo}`}>{lead.correo}</a></div>
          </div>
          <div className="admin-detail-item">
            <label>Teléfono</label>
            <div><a href={`tel:${lead.telefono}`}>{lead.telefono}</a></div>
          </div>
          <div className="admin-detail-item">
            <label>Tamaño de empresa</label>
            <div>{lead.tamano_empresa}</div>
          </div>
          <div className="admin-detail-item">
            <label>Recibido</label>
            <div>{formatDate(lead.created_at)}</div>
          </div>
          <div className="admin-detail-item admin-detail-full">
            <label>Proceso a mejorar</label>
            <div>{lead.proceso}</div>
          </div>
          {lead.herramientas && (
            <div className="admin-detail-item admin-detail-full">
              <label>Herramientas actuales</label>
              <div>{lead.herramientas}</div>
            </div>
          )}
          {lead.mensaje && (
            <div className="admin-detail-item admin-detail-full">
              <label>Mensaje</label>
              <div>{lead.mensaje}</div>
            </div>
          )}
          {(lead.utm_source || lead.utm_campaign) && (
            <div className="admin-detail-item admin-detail-full">
              <label>Origen (UTM)</label>
              <div>
                {[lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(' · ') || '—'}
              </div>
            </div>
          )}
        </div>

        <div className="admin-notes">
          <label htmlFor="admin-notas">Notas internas</label>
          <textarea
            id="admin-notas"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            onBlur={saveNotas}
            placeholder="Notas de seguimiento, próximos pasos, quién le habló…"
          />
          <div className="admin-notes-saved">
            {savingNotas ? 'Guardando…' : savedAt ? `Guardado ${savedAt.toLocaleTimeString('es-MX')}` : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

function Board({ leads, onOpenLead }) {
  return (
    <div className="admin-board">
      {STAGES.map((stage) => {
        const stageLeads = leads.filter((lead) => lead.estado === stage);
        return (
          <div className="admin-column" key={stage}>
            <div className="admin-column-head">
              <span>{stage}</span>
              <span className="admin-column-count">{stageLeads.length}</span>
            </div>
            {stageLeads.length === 0 && <p className="admin-empty">Sin leads aquí.</p>}
            {stageLeads.map((lead) => (
              <div className="admin-card" key={lead.id} onClick={() => onOpenLead(lead)}>
                <h4>{lead.nombre}</h4>
                <p>{lead.empresa}</p>
                <time>{formatDate(lead.created_at)}</time>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState(undefined); // undefined = cargando, null = sin sesión
  const [needsMfaChallenge, setNeedsMfaChallenge] = useState(false);
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showSecurity, setShowSecurity] = useState(false);

  const loadLeads = useCallback(async () => {
    const { data } = await supabaseBrowser
      .from('oli_one_leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setLeads(data);
  }, []);

  const checkMfaStatus = useCallback(async () => {
    const { data } = await supabaseBrowser.auth.mfa.getAuthenticatorAssuranceLevel();
    if (data && data.nextLevel === 'aal2' && data.currentLevel !== 'aal2') {
      setNeedsMfaChallenge(true);
    } else {
      setNeedsMfaChallenge(false);
    }
  }, []);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    const { data: listener } = supabaseBrowser.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    checkMfaStatus();
  }, [session, checkMfaStatus]);

  useEffect(() => {
    if (!session || needsMfaChallenge) return undefined;
    loadLeads();

    const channel = supabaseBrowser
      .channel('oli_one_leads_admin')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'oli_one_leads' },
        () => loadLeads()
      )
      .subscribe();

    return () => supabaseBrowser.removeChannel(channel);
  }, [session, needsMfaChallenge, loadLeads]);

  if (session === undefined) {
    return <div className="admin-loading">Cargando…</div>;
  }

  if (!session) {
    return <AdminLogin onAuthed={() => {}} />;
  }

  if (needsMfaChallenge) {
    return <MfaChallenge onVerified={() => setNeedsMfaChallenge(false)} />;
  }

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <strong>Oli — CRM</strong>
        <div className="admin-topbar-actions">
          <button type="button" className="admin-logout" onClick={() => setShowSecurity(true)}>
            Seguridad
          </button>
          <span>{session.user.email}</span>
          <button
            type="button"
            className="admin-logout"
            onClick={() => supabaseBrowser.auth.signOut()}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <Board leads={leads} onOpenLead={setSelectedLead} />

      {selectedLead && (
        <LeadDetail
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdated={(updated) => {
            setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
            setSelectedLead(updated);
          }}
        />
      )}

      {showSecurity && <SecuritySettings onClose={() => setShowSecurity(false)} />}
    </div>
  );
}
