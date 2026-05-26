import React from 'react';
import { ArrowRight, CheckCircle2, Eye, HeartHandshake, Lock, ShieldCheck, Target, Users } from 'lucide-react';

const BRAND = {
  legal: 'Optimiventas SRL',
  phone: '40012788',
  email: 'infocentral@ontimiventascr.com',
  instagram: 'optimiventas.cr',
};

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

function ValueCard({ icon: Icon, title, text }) {
  return (
    <article className="card">
      <div className="testimonial-avatar"><Icon size={24} /></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export default function SobreNosotros() {
  return (
    <main className="about-page">
      <header className="header">
        <div className="container nav">
          <Logo />
          <a href="/" className="nav-cta">Volver a la landing</a>
        </div>
      </header>

      <section className="about-hero">
        <div className="container about-hero-grid">
          <div>
            <span className="tag light">Sobre nosotros</span>
            <h1>Ayudamos a las personas a organizar sus finanzas antes de tomar decisiones importantes.</h1>
            <p>
              Optimiventas SRL es un canal de orientación y gestión financiera. No otorgamos créditos directamente. Nuestro trabajo es escuchar, ordenar información y acompañar procesos de valoración con entidades o canales aliados.
            </p>
            <a href="/" className="nav-cta">Solicitar valoración <ArrowRight size={18} /></a>
          </div>
          <div className="about-card">
            <ShieldCheck size={34} />
            <h2>Primero claridad. Luego análisis si corresponde.</h2>
            <p>No solicitamos recaudos al inicio. Primero revisamos la situación general del cliente y determinamos si tiene sentido avanzar.</p>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="container about-two">
          <article className="statement">
            <Target size={30} />
            <span className="tag">Misión</span>
            <h2>Brindar orientación financiera responsable, clara y humana.</h2>
            <p>Ayudamos a las personas a entender su situación, organizar sus obligaciones y valorar alternativas reales sin presión, sin cobros al cliente y sin promesas de aprobación.</p>
          </article>
          <article className="statement soft">
            <Eye size={30} />
            <span className="tag">Visión</span>
            <h2>Ser un referente de confianza en orientación financiera.</h2>
            <p>Buscamos que cada persona que contacte a Optimiventas reciba claridad, respeto y una ruta honesta, incluso cuando su caso no pueda avanzar.</p>
          </article>
        </div>
      </section>

      <section className="values">
        <div className="container">
          <div className="head">
            <span className="tag">Nuestros principios</span>
            <h2>Un proceso financiero sensible necesita criterio, orden y trato humano.</h2>
          </div>
          <div className="values-grid">
            <ValueCard icon={HeartHandshake} title="Escucha activa" text="Antes de hablar de soluciones, entendemos la situación completa del cliente." />
            <ValueCard icon={Lock} title="Confidencialidad" text="La información se trata con discreción y se utiliza solo para orientar el proceso solicitado." />
            <ValueCard icon={CheckCircle2} title="Responsabilidad" text="No promovemos falsas expectativas ni solicitudes innecesarias de documentos." />
            <ValueCard icon={Users} title="Acompañamiento" text="Guiamos al cliente paso a paso cuando el caso puede avanzar a una revisión más profunda." />
          </div>
        </div>
      </section>

      <section className="process">
        <div className="container two">
          <div>
            <span className="tag light">Cómo trabajamos</span>
            <h2>La llamada inicial es el punto de partida.</h2>
            <p>El primer contacto no busca vender un crédito. Busca entender si existe una posibilidad real de ordenar la situación del cliente mediante una ruta responsable.</p>
          </div>
          <div className="process-list">
            <div>El cliente solicita valoración.</div>
            <div>Se revisan datos básicos y contexto general.</div>
            <div>Si el caso puede avanzar, se orienta el siguiente paso.</div>
            <div>Solo entonces se solicitan documentos de respaldo.</div>
          </div>
        </div>
      </section>

      <section className="help">
        <div className="container help-card">
          <Users size={34} />
          <h2>Gana dinero ayudando</h2>
          <p>También abrimos oportunidades para personas con empatía, disciplina y criterio comercial que quieran ayudar a otros a reorganizar sus finanzas de forma responsable.</p>
          <a href="/" className="nav-cta">Conocer cómo participar</a>
        </div>
      </section>

      <footer className="footer">
        <div className="container foot">
          <div><strong>{BRAND.legal}</strong><p>Orientación financiera confidencial y gratuita para el cliente.</p></div>
          <div><p>WhatsApp: {BRAND.phone}</p><p>Correo: {BRAND.email}</p><p>Instagram: @{BRAND.instagram}</p></div>
        </div>
      </footer>
    </main>
  );
}
