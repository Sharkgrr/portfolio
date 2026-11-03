import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowUpRight, BookOpen, Crosshair, Linkedin, Map, Moon, Rocket, Sun } from 'lucide-react'
import './styles.css'
import PortalHubCase, { PortalHubCard } from './PortalHubCase'

const LINKEDIN_URL = 'https://www.linkedin.com/in/raphaelaoliveirajava'
const THEME_STORAGE_KEY = 'portfolio-theme'
const CURRENT_YEAR = new Date().getFullYear()
const DEFAULT_TAB = 'overview'
const CASE_ROUTE = 'portal-hub'
function readRoute() {
  const route = window.location.hash.slice(1)
  return route === CASE_ROUTE || TAB_OPTIONS.some(tab => tab.id === route) ? route : DEFAULT_TAB
}

const TAB_OPTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'work', label: 'Mission log' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'more', label: 'More' },
]

const HERO = {
  status: 'Aerospace systems · Florida, USA',
  title: 'Software engineer building APIs and the interfaces on top of them.',
  description: 'I build APIs, data platforms and, more and more, the interfaces on top of them — across aerospace at Blue Origin and banking at Itaú Unibanco.',
  image: `${import.meta.env.BASE_URL}raphaela-dev.jpg`,
}

const FACTS = [
  { label: 'Now', value: 'Blue Origin' },
  { label: 'Before', value: 'Itaú Unibanco' },
  { label: 'Strongest at', value: 'Java · Kotlin · APIs' },
  { label: 'Languages', value: 'EN · PT' },
]

const WORK_ITEMS = [
  { title: 'Supplier Data API', company: 'Blue Origin · Aerospace', text: 'Implemented the Java API layer and Databricks integration that brought supplier data into one place, making procurement reviews easier to trace and reuse across aerospace supply-chain systems.', stack: 'Java · Databricks' },
  { title: 'Approved Components Catalog', company: 'Blue Origin · Aerospace', text: 'Designed a centralized catalog of approved aerospace components, supporting reuse, reducing redundancy and improving technical decisions.', stack: 'React · Java · Supply chain' },
  { title: 'Banking Platforms', company: 'Itaú Unibanco · Banking', text: 'Financing, insurance quotation and access management platforms for banking channels serving high-volume user bases.', stack: 'Java · REST APIs' },
]

const EXPERIENCE_ITEMS = [
  { period: '2025 — Now', company: 'Blue Origin', role: 'Software Engineer', text: 'Working more on frontend and product interfaces, bringing advanced backend context from APIs, data and platform systems.' },
  { period: '2020 — 2025', company: 'Itaú Unibanco', role: 'Software Engineer', text: 'Built a strong backend foundation through APIs, automation and banking features — from requirements to delivery and production support.' },
  { period: '2019 — 2022', company: 'University', role: 'B.S. Computer Science', text: 'Plus additional studies in English and an ongoing Theology degree.' },
]

const SKILL_GROUPS = [
  { title: 'Backend', items: ['Java', 'Kotlin', 'REST APIs', 'Spring Boot'] },
  { title: 'Frontend', items: ['React', 'Vite', 'Product UI'] },
  { title: 'Data & Cloud', items: ['SQL', 'Databricks', 'AWS', 'Terraform'] },
  { title: 'Quality & Ops', items: ['Postman · Insomnia', 'CloudWatch · Datadog', 'CI/CD', 'Automated tests'] },
]

const CAREER_MILESTONES = [
  { year: '2020', company: 'Itaú Unibanco', detail: 'Software Engineer Internship', tone: 'yellow', label: 'Intern' },
  { year: '2021', company: 'Itaú Unibanco', detail: 'Junior Software Engineer', tone: 'purple', label: 'Junior' },
  { year: '2024', company: 'Itaú Unibanco', detail: 'Mid-Level Software Engineer', tone: 'purple', label: 'Mid-Level' },
  { year: '2025', company: 'Blue Origin', detail: 'Junior Software Engineer', tone: 'yellow', label: 'Blue Origin' },
]

const AWARDS = [
  { title: 'GenAI Hackathon Award', text: 'Project DRILL — vision AI that extracts engineering specs from drawings into searchable data.', meta: 'Blue Origin' },
  { title: 'Merit Bonus', text: 'Delivered an auto insurance service that simplified simulation flows.', meta: 'Itaú' },
  { title: 'Highlight Project EXPO', text: 'Recognized for project impact and delivery quality.', meta: 'College' },
]

const CERTIFICATIONS = [
  { title: 'Lifelong Learning', text: 'Certiprof', meta: '2020' },
  { title: 'Introduction to IoT', text: 'Cisco', meta: '2021' },
  { title: 'Cloud Foundation', text: 'AWS Academy', meta: '2021' },
  { title: 'Getting Started with Serverless', text: 'AWS', meta: '2023' },
  { title: 'Ethical Web Hacking', text: '42 São Paulo', meta: '2024' },
]

const INTERESTS = [
  { icon: Crosshair, label: 'FPS games' },
  { icon: BookOpen, label: 'Manga' },
  { icon: Map, label: 'Travel' },
]

const PANEL_COMPONENTS = {
  'portal-hub': PortalHubCase,
  overview: Overview,
  work: WorkPanel,
  experience: ExperiencePanel,
  skills: SkillsPanel,
  more: MorePanel,
}

function Section({ id, index, title, children }) {
  return (
    <section id={id} className="section">
      <header className="sectionHeader">
        <h2>{title}</h2>
        <span className="mono">{index}</span>
      </header>
      {children}
    </section>
  )
}

function ExternalLink({ href = LINKEDIN_URL, className, children }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>
}

function Hero({ onNavigate }) {
  return (
    <section id="top" className="hero">
      <Rocket className="heroRocket" aria-hidden="true" />
      <div className="heroCopy">
        <span className="status mono"><i aria-hidden="true" /> {HERO.status}</span>
        <h1>{HERO.title}</h1>
        <p>{HERO.description}</p>
        <div className="actions">
          <button className="btnPrimary" onClick={() => onNavigate('work')}>View selected work <ArrowDownRight size={16} /></button>
          <ExternalLink className="btnGhost"><Linkedin size={16} /> LinkedIn</ExternalLink>
        </div>
      </div>
      <img className="photo" src={HERO.image} alt="Raphaela Oliveira wearing a cap and hoodie while traveling" />
    </section>
  )
}

function Facts() {
  return <dl className="facts">{FACTS.map((fact) => <div key={fact.label}><dt className="mono">{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
}

function Navigation({ activeTab, darkMode, onNavigate, onToggleTheme }) {
  return (
    <>
      <nav className="nav">
        <a className="brand" href="#overview">Raphaela Oliveira</a>
        <div className="navLinks">
          <button className="themeToggle" onClick={onToggleTheme} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{darkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
          <ExternalLink className="navCta">Let's connect ↗</ExternalLink>
        </div>
      </nav>
      <nav className="tabs" aria-label="Portfolio sections">
        <label className="mobileMenu" htmlFor="section-menu">
          <span className="mono">Explore</span>
          <select id="section-menu" value={activeTab === CASE_ROUTE ? 'work' : activeTab} onChange={event => onNavigate(event.target.value)}>
            {TAB_OPTIONS.map(tab => <option key={tab.id} value={tab.id}>{tab.label}</option>)}
          </select>
        </label>
        {TAB_OPTIONS.map(tab => <a key={tab.id} href={`#${tab.id}`} aria-current={activeTab === tab.id || (activeTab === CASE_ROUTE && tab.id === 'work') ? 'page' : undefined} className={activeTab === tab.id || (activeTab === CASE_ROUTE && tab.id === 'work') ? 'tab active' : 'tab'}>{tab.label}</a>)}
      </nav>
    </>
  )
}

function Overview() {
  return (
    <section className="overviewPanel" aria-label="Overview">
      <PortalHubCard />
      <div className="overviewIntro"><span className="mono">01 · TOOLKIT</span><h2>Skills with a point of view.</h2><p>A practical toolkit shaped by systems, delivery and product thinking.</p></div>
      <div className="skillSignals">{SKILL_GROUPS.map((group, index) => <div className="skillSignal" key={group.title}><span className="mono">{String(index + 1).padStart(2, '0')}</span><div><h3>{group.title}</h3><p>{group.items.join(' · ')}</p></div></div>)}</div>
      <article className="featuredWork"><div><span className="mono">FEATURED PROJECT · 01</span><h3>Supplier Data API</h3><p>{WORK_ITEMS[0].text}</p></div><span className="mono">{WORK_ITEMS[0].stack}</span></article>
    </section>
  )
}

function WorkPanel() {
  return <Section id="work" index="01" title="Mission log"><PortalHubCard /><ol className="workList">{WORK_ITEMS.map((item, index) => <li key={item.title}><span className="mono num">{String(index + 1).padStart(2, '0')}</span><div className="workTitle"><h3>{item.title}</h3><span>{item.company}</span></div><div className="workBody"><p>{item.text}</p><span className="mono stack">{item.stack}</span></div></li>)}</ol></Section>
}

function CareerTimeline() {
  return <div className="timelineCard"><div className="timelineHeader"><div><h3>Career progression</h3><p>From internship to full-stack systems</p></div><span className="mono">2020 — Now</span></div><div className="timelineLegend"><span><i className="legendSwatch purple" /> Career growth</span><span><i className="legendSwatch yellow" /> Company transition</span></div><div className="careerLineChart"><svg viewBox="0 0 900 125" role="img" aria-label="Career progression line chart"><path d="M 15 112 C 110 100 190 92 280 72 S 405 48 485 30 S 680 16 850 8" />{CAREER_MILESTONES.map((milestone, index) => <circle key={milestone.year} cx={[15, 280, 485, 850][index]} cy={[112, 72, 30, 8][index]} r="6" />)}{CAREER_MILESTONES.map((milestone, index) => <text key={`${milestone.year}-label`} x={[15, 280, 485, 760][index]} y="128">{milestone.year} · {milestone.label}</text>)}</svg></div><div className="timelineAxis">{CAREER_MILESTONES.map((item) => <div className="timelineMilestone" key={`${item.year}-${item.company}`}><span className="mono">{item.year}</span><div className={`timelineBar ${item.tone}`} /><strong>{item.company}</strong><small>{item.detail}</small></div>)}</div></div>
}

function ExperiencePanel() {
  return <Section id="experience" index="02" title="Experience"><CareerTimeline /><ol className="expList">{EXPERIENCE_ITEMS.map((item) => <li key={item.company}><span className="mono period">{item.period}</span><div className="expRole"><h3>{item.company}</h3><span>{item.role}</span></div><p>{item.text}</p></li>)}</ol></Section>
}

function SkillsPanel() {
  return <Section id="skills" index="03" title="Systems toolkit"><div className="skillGrid">{SKILL_GROUPS.map((group) => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></Section>
}

function RowList({ label, rows }) {
  return <div className="rowList"><span className="mono label">{label}</span><ul>{rows.map((row) => <li key={row.title}><div><strong>{row.title}</strong><p>{row.text}</p></div><span className="mono">{row.meta}</span></li>)}</ul></div>
}

function MorePanel() {
  return <><Section id="recognition" index="04" title="Flight record"><div className="twoCols"><RowList label="Awards" rows={AWARDS} /><RowList label="Certifications" rows={CERTIFICATIONS} /></div></Section><Section id="about" index="05" title="Beyond the mission"><div className="about"><p>I play FPS games, read manga and travel whenever I can. Strategy, good stories and new places keep me curious — and that curiosity is a big part of how I keep growing as an engineer.</p><ul>{INTERESTS.map(({ icon: Icon, label }) => <li key={label}><Icon size={18} /> {label}</li>)}</ul></div></Section></>
}

function Footer() {
  return <footer className="contact"><p>Open to frontend and full-stack roles where backend context matters.</p><ExternalLink className="email">Connect on LinkedIn ↗</ExternalLink><div className="footerBottom"><span>© {CURRENT_YEAR} Raphaela Oliveira</span><div><ExternalLink>LinkedIn <ArrowUpRight size={13} /></ExternalLink><a href="#top">Back to top ↑</a></div></div></footer>
}

function App() {
  const [activeTab, setActiveTab] = useState(readRoute)
  const [darkMode, setDarkMode] = useState(() => window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark')

  useEffect(() => {
    document.body.classList.toggle('darkMode', darkMode)
    window.localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light')
    return () => document.body.classList.remove('darkMode')
  }, [darkMode])

  useEffect(() => {
    const syncRoute = () => setActiveTab(readRoute())
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    if (activeTab === DEFAULT_TAB) return
    const frame = requestAnimationFrame(() => {
      const panel = document.getElementById('content-panel')
      panel?.focus({ preventScroll: true })
      panel?.scrollIntoView({ behavior: 'instant', block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [activeTab])

  function openSection(id) {
    window.location.hash = id
  }

  const isSection = activeTab !== DEFAULT_TAB
  const pageClass = ['page', isSection && 'isSection', darkMode && 'dark'].filter(Boolean).join(' ')
  const ActivePanel = PANEL_COMPONENTS[activeTab] ?? Overview

  return (
    <div className={pageClass}>
      <Navigation
        activeTab={activeTab}
        darkMode={darkMode}
        onNavigate={openSection}
        onToggleTheme={() => setDarkMode((value) => !value)}
      />
      <main>
        <Hero onNavigate={openSection} />
        <Facts />
        <div id="content-panel" tabIndex={-1}><ActivePanel /></div>
      </main>
      <Footer />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
