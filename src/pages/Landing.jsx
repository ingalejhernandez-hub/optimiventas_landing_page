import React, { useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';

const BRAND = {
  name: 'OPTIMIVENTAS',
  legal: 'Optimiventas SRL',
  phone: '40012788',
  whatsapp: '50640012788',
  email: 'infocentral@ontimiventascr.com',
  instagram: 'optimiventas.cr',
};

const advisors = {
  alejandro: 'Alejandro Hernández',
  maria: 'María Rodríguez',
  carlos: 'Carlos Méndez',
};

const TIME_BLOCKS = [
  '08:00 AM', '08:40 AM', '09:20 AM', '10:00 AM', '10:40 AM', '11:20 AM',
  '01:00 PM', '01:40 PM', '02:20 PM', '03:00 PM', '03:40 PM', '04:20 PM', '05:00 PM',
];

function getReferral() {
  if (typeof window === 'undefined') return { code: 'directo', name: 'Solicitud directa' };
  const params = new URLSearchParams(window.location.search);
  const ref = (params.get('ref') || params.get('asesor') || 'directo').toLowerCase().trim();
  return { code: ref, name: advisors[ref] || (ref === 'directo' ? 'Solicitud directa' : ref) };
}

function Logo() {
  return (
    <div className="logo">
      <div className="mark">OV</div>
      <div>
        <strong>OPTIMI<span>VENTAS</span></strong>
        <small>SRL</small>
      </div>
    </div>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-head">
          <h2>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar"><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function LeadForm({ referral }) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', income: '', situation: 'Pago demasiadas cuotas',
    service: 'Unificación de deudas', amount: '', date: '', time: '', contact: 'WhatsApp',
    consent: false, referralCode: referral.code, referralName: referral.name, status: 'pendiente_revision',
  });
  const set = (key, value) => setForm((old) => ({ ...old, [key]: value }));
  const ready = form.name && form.phone && form.email && form.income && form.amount && form.date && form.time && form.consent;
  const send = (event) => {
    event.preventDefault();
    if (!ready) return;
    const message = encodeURIComponent(`Hola, deseo solicitar una valoración financiera gratuita con Optimiventas.\n\nNombre: ${form.name}\nTeléfono: ${form.phone}\nCorreo: ${form.email}\nIngreso: ${form.income}\nSituación: ${form.situation}\nServicio: ${form.service}\nMonto: ${form.amount}\nFecha: ${form.date}\nHorario: ${form.time}\nReferido por: ${form.referralName}`);
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <form className="lead-form" onSubmit={send}>
      <div className="note"><strong>Solicitud recibida:</strong> primero revisamos información básica. Los documentos solo se solicitan si corresponde avanzar.</div>
      <div className="ref">Canal registrado: <strong>{referral.name}</strong></div>
      <div className="grid2">
        <input placeholder="Nombre completo" value={form.name} onChange={(event) => set('name', event.target.value)} />
        <input placeholder="WhatsApp" value={form.phone} onChange={(event) => set('phone', event.target.value)} />
      </div>
      <input type="email" placeholder="Correo electrónico" value={form.email} onChange={(event) => set('email', event.target.value)} />
      <div className="grid2">
        <select value={form.income} onChange={(event) => set('income', event.target.value)}>
          <option value="">Ingreso mensual aproximado</option>
          <option>Menos de ₡600.000</option>
          <option>₡600.000 a ₡1.000.000</option>
          <option>₡1.000.000 a ₡2.000.000</option>
          <option>Más de ₡2.000.000</option>
          <option>Más de $4.000 USD</option>
        </select>
        <select value={form.situation} onChange={(event) => set('situation', event.target.value)}>
          <option>Pago demasiadas cuotas</option>
          <option>Quiero mejorar condiciones</option>
          <option>Necesito crédito hipotecario</option>
          <option>Quiero ordenar antes de atrasarme</option>
        </select>
      </div>
      <div className="grid2">
        <select value={form.service} onChange={(event) => set('service', event.target.value)}>
          <option>Unificación de deudas</option>
          <option>Mejora de condiciones</option>
          <option>Crédito personal</option>
          <option>Crédito hipotecario</option>
          <option>Orientación financiera</option>
        </select>
        <input placeholder="Monto aproximado" value={form.amount} onChange={(event) => set('amount', event.target.value)} />
      </div>
      <div className="grid2">
        <input type="date" value={form.date} onChange={(event) => set('date', event.target.value)} />
        <select value={form.time} onChange={(event) => set('time', event.target.value)}>
          <option value="">Horario disponible</option>
          {TIME_BLOCKS.map((time) => <option key={time}>{time}</option>)}
        </select>
      </div>
      <select value={form.contact} onChange={(event) => set('contact', event.target.value)}>
        <option>WhatsApp</option>
        <option>Correo electrónico</option>
        <option>Llamada telefónica</option>
      </select>
      <label className="check">
        <input type="checkbox" checked={form.consent} onChange={(event) => set('consent', event.target.checked)} />
        <span>Autorizo ser contactado. Optimiventas no otorga créditos directamente y no cobra adelantos, honorarios ni comisiones al cliente.</span>
      </label>
      <button disabled={!ready} className="submit">Enviar solicitud</button>
    </form>
  );
}

function ReferralApplyForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', zone: '', experience: '', reason: '', consent: false });
  const set = (key, value) => setForm((old) => ({ ...old, [key]: value }));
  const ready = form.name && form.phone && form.email && form.zone && form.reason && form.consent;
  const send = (event) => {
    event.preventDefault();
    if (!ready) return;
    const message = encodeURIComponent(`Hola, deseo aplicar al sistema de referidos de Optimiventas.\n\nNombre: ${form.name}\nTeléfono: ${form.phone}\nCorreo: ${form.email}\nZona: ${form.zone}\nExperiencia: ${form.experience}\nMotivación: ${form.reason}`);
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <form className="lead-form" onSubmit={send}>
      <div className="note"><strong>Sistema de referidos:</strong> complete sus datos para valorar su participación como colaborador o referente comercial.</div>
      <div className="grid2">
        <input placeholder="Nombre completo" value={form.name} onChange={(event) => set('name', event.target.value)} />
        <input placeholder="WhatsApp" value={form.phone} onChange={(event) => set('phone', event.target.value)} />
      </div>
      <div className="grid2">
        <input type="email" placeholder="Correo electrónico" value={form.email} onChange={(event) => set('email', event.target.value)} />
        <input placeholder="Provincia / zona" value={form.zone} onChange={(event) => set('zone', event.target.value)} />
      </div>
      <select value={form.experience} onChange={(event) => set('experience', event.target.value)}>
        <option value="">Experiencia principal</option>
        <option>Ventas</option>
        <option>Créditos / banca</option>
        <option>Atención al cliente</option>
        <option>Red de contactos</option>
        <option>Quiero aprender</option>
      </select>
      <textarea placeholder="Cuéntenos por qué quiere ganar dinero ayudando a otros" value={form.reason} onChange={(event) => set('reason', event.target.value)} />
      <label className="check">
        <input type="checkbox" checked={form.consent} onChange={(event) => set('consent', event.target.checked)} />
        <span>Autorizo ser contactado por Optimiventas para valorar mi participación en el sistema de referidos.</span>
      </label>
      <button disabled={!ready} className="submit">Enviar aplicación</button>
    </form>
  );
}

function Service({ title, text }) {
  return <article className="card"><h3>{title}</h3><p>{text}</p></article>;
}

function Testimonial({ initials, name, text }) {
  return (
    <article className="testimonial-card">
      <div className="testimonial-avatar">{initials}</div>
      <h3>{name}</h3>
      <p>“{text}”</p>
    </article>
  );
}

export default function Landing() {
  const referral = useMemo(() => getReferral(), []);
  const [lead, setLead] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [menu, setMenu] = useState(false);
  const [apply, setApply] = useState(false);

  return (
    <main className="page">
      <header className="header">
        <div className="container nav">
          <Logo />
          <nav className="desktop">
            <a href="#servicios">Servicios</a>
            <a href="/sobre-nosotros">Sobre nosotros</a>
            <a href="#gana">Gana dinero ayudando</a>
            <button type="button" onClick={() => setPrivacy(true)}>Privacidad</button>
          </nav>
          <button className="top-cta" onClick={() => setLead(true)}>Solicitar valoración</button>
          <button className="menu" onClick={() => setMenu(true)}><Menu size={24} /></button>
        </div>
        {menu && (
          <div className="mobile">
            <div><strong>{BRAND.name}</strong><button onClick={() => setMenu(false)}><X size={20} /></button></div>
            <a href="#servicios" onClick={() => setMenu(false)}>Servicios</a>
            <a href="/sobre-nosotros" onClick={() => setMenu(false)}>Sobre nosotros</a>
            <a href="#gana" onClick={() => setMenu(false)}>Gana dinero ayudando</a>
            <button onClick={() => { setMenu(false); setPrivacy(true); }}>Privacidad</button>
            <button onClick={() => { setMenu(false); setLead(true); }}>Solicitar valoración</button>
          </div>
        )}
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Valoración financiera confidencial</span>
            <h1>Ordenar sus finanzas puede empezar con una sola llamada.</h1>
            <p>Revisamos su situación general antes de avanzar a una etapa de análisis. Si el caso puede continuar, se explica el siguiente paso y solo entonces se solicitan documentos.</p>
            <div className="hero-actions">
              <button onClick={() => setLead(true)} className="primary">Solicitar valoración</button>
              <a href="/sobre-nosotros">Conocer Optimiventas</a>
            </div>
            <div className="stats">
              <div><strong>₡0</strong><span>Costo para el cliente</span></div>
              <div><strong>100%</strong><span>Confidencial</span></div>
              <div><strong>{referral.name}</strong><span>Canal registrado</span></div>
            </div>
          </div>
          <div className="hero-form-card">
            <h2>Solicite una valoración gratuita</h2>
            <p>Complete la información inicial. Un asesor revisará el caso antes de indicar cualquier solicitud adicional.</p>
            <LeadForm referral={referral} />
          </div>
        </div>
      </section>

      <section className="intro">
        <div className="container two">
          <div>
            <span className="tag">El primer paso es ordenar</span>
            <h2>Muchas personas pagan al día, pero sienten que el ingreso ya no alcanza.</h2>
            <p>El problema no siempre es cuánto gana una persona, sino cómo están distribuidas sus obligaciones. La llamada inicial permite entender el panorama antes de tomar otra decisión.</p>
          </div>
          <div className="steps">
            <div><strong>1</strong><span>Escuchamos la situación general.</span></div>
            <div><strong>2</strong><span>Revisamos si existe una ruta viable.</span></div>
            <div><strong>3</strong><span>Solicitamos documentos solo si corresponde.</span></div>
          </div>
        </div>
      </section>

      <section id="servicios" className="services">
        <div className="container">
          <div className="head">
            <span className="tag">Servicios</span>
            <h2>Orientamos procesos de valoración financiera, no vendemos promesas.</h2>
            <p>Optimiventas no otorga créditos directamente. Ayudamos a organizar la información y acompañamos el proceso con entidades o canales aliados.</p>
          </div>
          <div className="grid4">
            <Service title="Unificación de deudas" text="Revise si sus obligaciones pueden ordenarse en una estructura más clara." />
            <Service title="Mejora de condiciones" text="Valore alternativas para reorganizar cuotas, plazos o carga mensual." />
            <Service title="Crédito personal" text="Orientación según ingreso, estabilidad y capacidad de pago." />
            <Service title="Crédito hipotecario" text="Apoyo para valorar opciones asociadas a vivienda o garantía." />
          </div>
        </div>
      </section>

      <section className="process">
        <div className="container two">
          <div>
            <span className="tag light">Proceso claro</span>
            <h2>La primera llamada busca entender el caso, no presionar.</h2>
            <p>Primero se revisan datos básicos. Si el caso puede avanzar, se explica el siguiente paso. La documentación se solicita únicamente cuando tiene sentido continuar.</p>
          </div>
          <div className="process-list">
            <div>Solicitud inicial</div>
            <div>Revisión interna</div>
            <div>Orientación correspondiente</div>
            <div>Documentación si aplica</div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="head center">
            <span className="tag">Historias</span>
            <h2>Personas que recuperaron claridad financiera.</h2>
          </div>
          <div className="grid3">
            <Testimonial initials="CH" name="Sra. Chávez" text="Primero entendieron mi situación antes de pedirme documentos." />
            <Testimonial initials="VA" name="Sr. Valverde" text="La llamada fue clara, seria y sin presión." />
            <Testimonial initials="HE" name="Sra. Hernández" text="Ahora tengo una idea más ordenada de mis opciones." />
          </div>
        </div>
      </section>

      <section id="gana" className="work">
        <div className="container two">
          <div>
            <span className="tag">Gana dinero ayudando</span>
            <h2>Ayude a otros a organizar sus finanzas mientras genera ingresos.</h2>
            <p>Buscamos personas con escucha, criterio y disciplina comercial para acompañar casos de forma responsable.</p>
            <button className="primary" onClick={() => setApply(true)}>Quiero participar</button>
          </div>
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop" alt="Asesora escuchando cliente" />
        </div>
      </section>

      <footer className="footer">
        <div className="container foot">
          <div><strong>{BRAND.legal}</strong><p>Orientación financiera confidencial y gratuita.</p></div>
          <div><p>{BRAND.phone}</p><p>{BRAND.email}</p><p>@{BRAND.instagram}</p></div>
        </div>
      </footer>

      <Modal open={lead} onClose={() => setLead(false)} title="Solicite una valoración gratuita"><LeadForm referral={referral} /></Modal>
      <Modal open={apply} onClose={() => setApply(false)} title="Aplicar al sistema de referidos"><ReferralApplyForm /></Modal>
      <Modal open={privacy} onClose={() => setPrivacy(false)} title="Política de privacidad">
        <div className="privacy">
          <p>En Optimiventas SRL tratamos la información recibida con carácter confidencial y únicamente para orientar, gestionar y valorar opciones financieras solicitadas por el usuario.</p>
          <div className="privacy-grid">
            <article><h3>Datos que podemos solicitar</h3><p>Nombre, teléfono, correo, ingreso aproximado, tipo de necesidad financiera, monto a valorar y documentos de respaldo si el caso avanza.</p></article>
            <article><h3>Finalidad</h3><p>Contactar al solicitante, realizar una valoración preliminar y registrar trazabilidad comercial.</p></article>
            <article><h3>Confidencialidad</h3><p>No vendemos datos personales. La información puede compartirse únicamente cuando sea necesario para un análisis autorizado.</p></article>
            <article><h3>Servicio gratuito</h3><p>Optimiventas no cobra adelantos, honorarios ni comisiones al cliente.</p></article>
          </div>
        </div>
      </Modal>
    </main>
  );
}
