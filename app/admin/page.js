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
        <h1>OLI One — Admin</h1>
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
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  const loadLeads = useCallback(async () => {
    const { data } = await supabaseBrowser
      .from('oli_one_leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setLeads(data);
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
    if (!session) return undefined;
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
  }, [session, loadLeads]);

  if (session === undefined) {
    return <div className="admin-loading">Cargando…</div>;
  }

  if (!session) {
    return <AdminLogin onAuthed={() => {}} />;
  }

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <strong>OLI One — CRM</strong>
        <div className="admin-topbar-actions">
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
    </div>
  );
}
