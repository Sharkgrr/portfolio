import React, { useState } from 'react'
import './portal-diagram.css'
import { Globe, AppWindow, Route, Network, Container } from 'lucide-react'

const MODULES = [
  { title: 'Search contracts', path: '/search-contracts', target: 'Contracts target group', rows: ['CT-204 · Aurora Labs', 'CT-205 · Orbit Supply'] },
  { title: 'Analyze suppliers', path: '/analyze-suppliers', target: 'Suppliers target group', rows: ['Aurora Labs · Active', 'Orbit Supply · Review'] },
]

function Connection({ label }) {
  return <div className="diagramConnection"><span>{label}</span><svg viewBox="0 0 100 36" aria-hidden="true"><path className="trafficDots" d="M50 0 V28" /><path className="trafficTip" d="M44 22 L50 29 L56 22" /></svg></div>
}

export default function PortalDiagram() {
  const [paused, setPaused] = useState(false)
  return <figure className={`awsDiagram${paused ? ' paused' : ''}`} aria-labelledby="diagram-title">
    <figcaption className="diagramHeading"><div><span className="mono">ARCHITECTURE / REQUEST FLOW</span><h2 id="diagram-title">One entry point. Two independent modules.</h2></div><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? 'Play flow' : 'Pause flow'}</button></figcaption>
    <div className="diagramBrowser"><Globe size={18} /><span>Browser</span><code>portal.example</code></div>
    <Connection label="Open portal" />
    <section className="diagramShell">
      <header><AppWindow size={22} /><strong>Shell SPA</strong><span className="mono">BROWSER / UI</span></header>
      <div className="shellHeaderPreview"><strong>Portal Hub</strong><span>Search contracts · Analyze suppliers</span><span className="mono">Account</span></div>
      <p className="shellHeaderNote">Shared header and navigation belong to the shell and remain visible while modules change.</p>
      <div className="diagramRouter"><Route size={20} /><div><strong>Client-side router</strong><small>Selects the module and iframe URL</small></div></div>
      <div className="diagramBranches">{MODULES.map(module => <div key={module.path}>
        <Connection label="Set iframe src" />
        <div className="miniIframe"><header><span className="windowDots">● ● ●</span><span>iframe</span></header><div className="iframeContent"><strong>{module.title}</strong><code>{module.path}</code>{module.rows.map(row => <div className="iframeRow" key={row}>{row}<span>↗</span></div>)}</div></div>
      </div>)}</div>
    </section>
    <Connection label="HTTPS requests from iframe URLs" />
    <section className="diagramCloud"><div className="cloudLabel">AWS CLOUD <span>Illustrative architecture</span></div>
      <div className="diagramAlb"><Network size={28} /><div><strong>Application Load Balancer</strong><small>One ALB · path-based listener rules</small></div></div>
      <div className="diagramBranches">{MODULES.map(module => <div key={module.path}><Connection label={`${module.path} + /*`} /><div className="diagramService"><span className="mono">{module.target}</span><Container size={26} /><strong>ECS Fargate</strong><small>{module.title} service</small><span className="taskBadge">Independent deployment</span></div></div>)}</div>
    </section>
    <p className="diagramNote">Dotted arrows show request direction. Responses return to each iframe. The shell router selects URLs; ALB rules select backend target groups. Fictional data and paths.</p>
  </figure>
}
