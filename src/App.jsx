import React from 'react';
import Landing from './pages/Landing.jsx';
import SobreNosotros from './pages/SobreNosotros.jsx';

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/sobre-nosotros') return <SobreNosotros />;
  return <Landing />;
}
