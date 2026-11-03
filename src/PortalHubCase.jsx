import React from 'react'
import { LayoutTemplate, Network, Container, ShieldCheck, Link, RefreshCw, Activity } from 'lucide-react'
import PortalDiagram from './PortalDiagram'

const CAPABILITIES = [
  { icon: LayoutTemplate, title: 'One shell', text: 'Persistent header + navigation' },
  { icon: Network, title: 'One ALB', text: 'Path-based routing' },
  { icon: Container, title: 'Independent services', text: 'ECS Fargate per module' },
]
const CHECKS = [
  { icon: Link, title: 'Paths & assets', text: 'Exact paths, nested routes and base URLs' },
  { icon: RefreshCw, title: 'Refresh & navigation', text: 'Direct links and module switching' },
  { icon: Activity, title: 'Service health', text: 'Target-group health checks' },
  { icon: ShieldCheck, title: 'Access control', text: 'Authorization enforced by each service' },
]

export function PortalHubCard() {
  return <article className="featuredWork buyerFeature">
    <div><span className="mono">MISSION LOG / ARCHITECTURE CASE</span><h2>Portal Hub</h2>
      <p>One shell. Independent modules. Path-based routing on AWS.</p>
      <a className="caseLink" href="#portal-hub">Explore architecture ↗</a>
    </div><span className="mono">Shell SPA · ALB · ECS Fargate</span>
  </article>
}

export default function PortalHubCase() {
  return <article className="section caseStudy" aria-labelledby="case-title">
    <a className="caseLink" href="#work">← Back to Mission log</a>
    <header><span className="mono">PORTAL HUB / ARCHITECTURE CASE</span>
      <h1>One portal. Independent modules.</h1>
      <p>A shared shell connects tools through iframes and AWS path-based routing.</p>
      <span className="caseDisclaimer">Illustrative architecture · Fictional routes and data</span>
    </header>
    <div className="capabilityStrip">{CAPABILITIES.map(({ icon: Icon, title, text }) => <div key={title}><Icon size={24} aria-hidden="true" /><h2>{title}</h2><p>{text}</p></div>)}</div>
    <PortalDiagram />
    <section className="caseTradeoffs"><h2>Why this design?</h2><div className="tradeoffColumns"><div><span className="mono">ENABLES</span><ul><li>Consistent portal navigation</li><li>Independent module releases</li><li>Separate application documents</li></ul></div><div><span className="mono">REQUIRES</span><ul><li>Explicit authentication contracts</li><li>Responsive iframe sizing</li><li>Validated cross-document messages</li></ul></div></div></section>
    <section><h2>Validation checklist</h2><p className="caseDisclaimer">Proposed checks — not production test results.</p><div className="validationGrid">{CHECKS.map(({icon: Icon, title, text}) => <div key={title}><Icon size={22} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>
    <details><summary>Routing contract & integration notes</summary><pre><code>{`/ → Shell SPA (default target group)

/search-contracts
/search-contracts/*
→ Contracts target group → ECS Fargate

/analyze-suppliers
/analyze-suppliers/*
→ Suppliers target group → ECS Fargate

<iframe title="Search contracts" src="/search-contracts/" />`}</code></pre><p>Modules must respect their base path. Path matching does not remove the prefix. Iframes are not authorization boundaries; services enforce access independently.</p></details>
  </article>
}
