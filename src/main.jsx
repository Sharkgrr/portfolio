import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowUpRight, BookOpen, Crosshair, Download, Linkedin, Map, Moon, Sun, MessageCircle, Plus, BriefcaseBusiness, Wrench, Award, PanelLeftClose, Menu, X } from 'lucide-react'
import './styles.css'
import './compact.css'
import './chat.css'
import './chat-clean.css'
import RoleFit from './RoleFit'

const LINKEDIN_URL = 'https://www.linkedin.com/in/raphaelaoliveirajava'
const THEME_STORAGE_KEY = 'portfolio-theme'
const CURRENT_YEAR = new Date().getFullYear()
const DEFAULT_TAB = 'overview'
const [resumeUrl] = Object.values(import.meta.glob('./assets/resume.pdf', { eager: true, query: '?url', import: 'default' }))

function readRoute() {
  const route = window.location.hash.slice(1)
  return TAB_OPTIONS.some(tab => tab.id === route) ? route : DEFAULT_TAB
}

const TAB_OPTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'role-fit', label: 'Role fit' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'more', label: 'More' },
]

const HERO = {
  status: 'Software engineering · Florida, USA',
  title: 'Backend depth.\nFull-stack perspective.',
  description: 'I’m Raphaela, a software engineer with 5+ years building APIs and product interfaces. From banking at Itaú to aerospace at Blue Origin.',
  image: `${import.meta.env.BASE_URL}raphaela-dev.jpg`,
}

const FACTS = [
  { label: 'Now', value: 'Blue Origin' },
  { label: 'Focus', value: 'Backend · Full stack' },
  { label: 'Strongest at', value: 'Java · Kotlin · APIs' },
  { label: 'Languages', value: 'EN · PT' },
]

const EXPERIENCE_ITEMS = [
  { period: 'Aug 2025 — Now', company: 'Blue Origin', role: 'Software Engineer I', text: 'Build APIs and product interfaces, with a focus on making data easier to work with.' },
  { period: 'Mar 2020 — Feb 2025', company: 'Itaú Unibanco', role: 'Software Engineer', text: 'Built a strong backend foundation through APIs, automation and banking features — from requirements to delivery and production support.' },
  { period: '2019 — 2022', company: 'Universidade São Judas Tadeu', role: 'B.S. Computer Science', text: 'Plus additional studies in English and an ongoing Theology degree.' },
]

const SKILL_GROUPS = [
  { title: 'Backend', items: ['Java', 'Kotlin', 'REST APIs', 'Spring Boot'] },
  { title: 'Frontend', items: ['React', 'Vite', 'Product UI'] },
  { title: 'Data & Cloud', items: ['SQL', 'Databricks', 'AWS', 'Terraform'] },
  { title: 'Quality & Ops', items: ['Postman · Insomnia', 'CloudWatch · Datadog · Splunk', 'CI/CD', 'Automated tests'] },
]

const CAREER_MILESTONES = [
  { year: '2020', company: 'Itaú Unibanco', detail: 'Software Engineer Internship', tone: 'yellow', label: 'Intern' },
  { year: '2021', company: 'Itaú Unibanco', detail: 'Junior Software Engineer', tone: 'purple', label: 'Junior' },
  { year: '2024', company: 'Itaú Unibanco', detail: 'Mid-Level Software Engineer', tone: 'purple', label: 'Mid-Level' },
  { year: '2025', company: 'Blue Origin', detail: 'Software Engineer I', tone: 'yellow', label: 'Blue Origin' },
]

const AWARDS = [
  { title: 'GenAI Hackathon Award', text: 'Recognized for a document processing prototype.', meta: 'Blue Origin' },
  { title: 'Merit Bonus', text: 'Delivered an auto insurance service that simplified simulation flows.', meta: 'Itaú' },
  { title: 'Highlight Project EXPO', text: 'Recognized for project impact and delivery quality.', meta: 'College' },
]

const CERTIFICATIONS = [
  { title: 'Site Reliability Engineering', text: 'Training', meta: '2024' },
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
  overview: RoleFit,
  'role-fit': RoleFit,
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

      <div className="heroCopy">
        <span className="status mono"><i aria-hidden="true" /> {HERO.status}</span>
        <h1>{HERO.title}</h1>
        <p>{HERO.description}</p>
        <div className="actions">
          <button className="btnPrimary" onClick={() => onNavigate('role-fit')}>Explore role fit <ArrowDownRight size={16} /></button>
          <ExternalLink className="btnGhost"><Linkedin size={16} /> LinkedIn</ExternalLink>
          {resumeUrl && <a className="btnGhost" href={resumeUrl} download="Raphaela-Oliveira-Resume.pdf"><Download size={16} /> Download résumé</a>}
        </div>
      </div>
      <div className="portrait"><img className="photo" src={HERO.image} alt="Raphaela Oliveira wearing a cap and hoodie while traveling" /><span className="mono">Engineer. Always curious.</span></div>
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
          <select id="section-menu" value={activeTab} onChange={event => onNavigate(event.target.value)}>
            {TAB_OPTIONS.map(tab => <option key={tab.id} value={tab.id}>{tab.label}</option>)}
          </select>
        </label>
        {TAB_OPTIONS.map(tab => <a key={tab.id} href={`#${tab.id}`} aria-current={activeTab === tab.id ? 'page' : undefined} className={activeTab === tab.id ? 'tab active' : 'tab'}>{tab.label}</a>)}
      </nav>
    </>
  )
}

function Overview(props) {
  return (
    <section className="overviewPanel" aria-label="Overview">
      <RoleFit {...props} />
      <div className="overviewDetails">
        <section className="careerSummary"><header className="denseHeading"><h2>Experience</h2><a href="#experience">Full timeline ↗</a></header>{EXPERIENCE_ITEMS.slice(0, 2).map(item => <article className="careerRow" key={item.company}><span className="companyMark">{item.company === 'Blue Origin' ? 'BO' : 'I'}</span><div><h3>{item.company}</h3><p>{item.role}</p><small>{item.period}</small></div><ArrowUpRight size={16} /></article>)}<div className="educationLine"><span className="mono">EDUCATION</span><p>B.S. Computer Science</p><small>São Judas Tadeu · 2019–2022</small></div></section>
        <section className="toolkitSummary"><header className="denseHeading"><h2>Engineering toolkit</h2><a href="#skills" aria-label="Explore toolkit">↗</a></header>{SKILL_GROUPS.map(group => <div className="toolkitRow" key={group.title}><h3>{group.title}</h3><p>{group.items.join(' · ')}</p></div>)}</section>
      </div>
      <a className="recognitionStrip" href="#more"><span className="awardGlyph">↗</span><div><span className="mono">RECOGNITION</span><p>GenAI Hackathon Award <span>at Blue Origin</span></p></div><span>Explore awards & credentials ↗</span></a>
    </section>
  )
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
  return <><Section id="recognition" index="04" title="Flight record"><div className="twoCols"><RowList label="Awards" rows={AWARDS} /><RowList label="Certifications & training" rows={CERTIFICATIONS} /></div></Section><Section id="about" index="05" title="Beyond the mission"><div className="about"><p>I play FPS games, read manga and travel whenever I can. Strategy, good stories and new places keep me curious — and that curiosity is a big part of how I keep growing as an engineer.</p><ul>{INTERESTS.map(({ icon: Icon, label }) => <li key={label}><Icon size={18} /> {label}</li>)}</ul></div></Section></>
}

function Footer() {
  return <footer className="contact"><div className="contactLine"><p>Good systems start with a conversation.</p><ExternalLink className="email">Let’s connect <ArrowUpRight size={18} /></ExternalLink></div><div className="footerBottom"><span>© {CURRENT_YEAR} Raphaela Oliveira</span><div><ExternalLink>LinkedIn <ArrowUpRight size={13} /></ExternalLink><a href="#top">Back to top ↑</a></div></div></footer>
}

function App() {
  const [activeTab, setActiveTab] = useState(readRoute)
  const [priorities, setPriorities] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
    setSidebarOpen(false)
  }

  function newConversation() {
    setPriorities([])
    openSection('overview')
  }

  const isSection = activeTab !== DEFAULT_TAB
  const pageClass = ['page', isSection && 'isSection', darkMode && 'dark'].filter(Boolean).join(' ')
  const ActivePanel = PANEL_COMPONENTS[activeTab] ?? Overview

  return (
    <div className={`${pageClass} chatShell`}>
      {sidebarOpen && <button className="sidebarScrim" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <aside className={`chatSidebar ${sidebarOpen ? 'isOpen' : ''}`}>
        <div className="sidebarBrand"><a href="#overview" onClick={() => setSidebarOpen(false)}><span className="monogram">ro.</span> Portfolio</a><button className="closeSidebar" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={18} /></button></div>
        <button className="newConversation" onClick={newConversation}><Plus size={17} /> New conversation</button>

        <nav className="chatNavigation" aria-label="Portfolio sections">{[{id:'overview', label:'Role fit', icon:MessageCircle},{id:'experience',label:'Experience',icon:BriefcaseBusiness},{id:'skills',label:'Engineering toolkit',icon:Wrench},{id:'more',label:'About & recognition',icon:Award}].map(({id,label,icon:Icon}) => <a key={id} href={`#${id}`} className={(activeTab === id || (id === 'overview' && activeTab === 'role-fit')) ? 'selected' : ''} aria-current={(activeTab === id || (id === 'overview' && activeTab === 'role-fit')) ? 'page' : undefined} onClick={() => setSidebarOpen(false)}><Icon size={17} />{label}</a>)}</nav>

        <div className="sidebarBottom">{resumeUrl && <a className="resumeLink" href={resumeUrl} download="Raphaela-Oliveira-Resume.pdf"><Download size={16} /> Download résumé <ArrowUpRight size={13} /></a>}<a className="sidebarProfile" href="https://www.linkedin.com/in/raphaelaoliveirajava" target="_blank" rel="noreferrer"><img src={HERO.image} alt="Raphaela Oliveira" /><div><strong>Raphaela Oliveira</strong><span>Software Engineer · Florida</span></div><ArrowUpRight size={14} /></a></div>
      </aside>
      <main className="chatMain">
        <header className="chatTopbar"><div><button className="openSidebar" aria-label="Open navigation" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(true)}><Menu size={20} /></button><span>Portfolio <span className="topbarSlash">/</span> <strong>{activeTab === 'overview' || activeTab === 'role-fit' ? 'Role fit' : TAB_OPTIONS.find(tab => tab.id === activeTab)?.label}</strong></span></div><div><button className="themeToggle" onClick={() => setDarkMode(value => !value)} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{darkMode ? <Sun size={16} /> : <Moon size={16} />}</button><ExternalLink className="chatConnect">Let’s connect <ArrowUpRight size={14} /></ExternalLink></div></header>
        <div id="content-panel" tabIndex={-1}><ActivePanel priorities={priorities} setPriorities={setPriorities} resumeUrl={resumeUrl} /></div>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
