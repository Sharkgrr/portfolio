import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowUpRight, BookOpen, Crosshair, Linkedin, Map, Moon, Rocket, Sun } from 'lucide-react'
import './styles.css'

const EMAIL = 'raphaelaoliveira79@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/raphaelaoliveirajava'

const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'more', label: 'About' },
]

const facts = [
  { label: 'Now', value: 'Blue Origin' },
  { label: 'Before', value: 'Itaú Unibanco' },
  { label: 'Strongest at', value: 'Java · Kotlin · APIs' },
  { label: 'Languages', value: 'EN · PT' },
]

const work = [
  {
    title: 'Supplier Data API',
    company: 'Blue Origin · Aerospace',
    text: 'Implemented the Java API layer and Databricks integration that brought supplier data into one place, making procurement reviews easier to trace and reuse across aerospace supply-chain systems.',
    stack: 'Java · Databricks',
  },
  {
    title: 'Approved Components Catalog',
    company: 'Blue Origin · Aerospace',
    text: 'Designed a centralized catalog of approved aerospace components, supporting reuse, reducing redundancy and improving technical decisions.',
    stack: 'React · Java · Supply chain',
  },
  {
    title: 'Banking Platforms',
    company: 'Itaú Unibanco · Banking',
    text: 'Financing, insurance quotation and access management platforms for banking channels serving high-volume user bases.',
    stack: 'Java · REST APIs',
  },
]

const experience = [
  {
    period: '2025 — Now',
    company: 'Blue Origin',
    role: 'Software Engineer',
    text: 'Working more on frontend and product interfaces, bringing advanced backend context from APIs, data and platform systems.',
  },
  {
    period: '2020 — 2025',
    company: 'Itaú Unibanco',
    role: 'Software Engineer',
    text: 'Built a strong backend foundation through APIs, automation and banking features — from requirements to delivery and production support.',
  },
  {
    period: '2019 — 2022',
    company: 'University',
    role: 'B.S. Computer Science',
    text: 'Plus additional studies in English and an ongoing Theology degree.',
  },
]

const skills = [
  { title: 'Backend', items: ['Java', 'Kotlin', 'REST APIs', 'Spring Boot'] },
  { title: 'Frontend', items: ['React', 'Vite', 'Product UI'] },
  { title: 'Data & Cloud', items: ['SQL', 'Databricks', 'AWS', 'Terraform'] },
  { title: 'Quality & Ops', items: ['Postman · Insomnia', 'CloudWatch · Datadog', 'CI/CD', 'Automated tests'] },
]

const awards = [
  {
    title: 'GenAI Hackathon Award',
    text: 'Project DRILL — vision AI that extracts engineering specs from drawings into searchable data.',
    meta: 'Blue Origin',
  },
  {
    title: 'Merit Bonus',
    text: 'Delivered an auto insurance service that simplified simulation flows.',
    meta: 'Itaú',
  },
  {
    title: 'Highlight Project EXPO',
    text: 'Recognized for project impact and delivery quality.',
    meta: 'College',
  },
]

const certifications = [
  { title: 'Lifelong Learning', text: 'Certiprof', meta: '2020' },
  { title: 'Introduction to IoT', text: 'Cisco', meta: '2021' },
  { title: 'Cloud Foundation', text: 'AWS Academy', meta: '2021' },
  { title: 'Getting Started with Serverless', text: 'AWS', meta: '2023' },
  { title: 'Ethical Web Hacking', text: '42 São Paulo', meta: '2024' },
]

const interests = [
  { icon: Crosshair, label: 'FPS games' },
  { icon: BookOpen, label: 'Manga' },
  { icon: Map, label: 'Travel' },
]

const chartData = [
  { label: 'Availability', value: 99.98, display: '99.98%' },
  { label: 'Test coverage', value: 92, display: '92%' },
  { label: 'Deploy frequency', value: 78, display: '78%' },
]

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

function RowList({ label, rows }) {
  return (
    <div className="rowList">
      <span className="mono label">{label}</span>
      <ul>
        {rows.map((row) => (
          <li key={row.title}>
            <div>
              <strong>{row.title}</strong>
              <p>{row.text}</p>
            </div>
            <span className="mono">{row.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('darkMode', darkMode)
    return () => document.body.classList.remove('darkMode')
  }, [darkMode])

  function openSection(id) {
    setActiveTab(id)
    window.setTimeout(() => document.getElementById(id === 'more' ? 'recognition' : id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  const isSection = activeTab !== 'overview'
  const pageClass = `page${isSection ? ' isSection' : ''}${darkMode ? ' dark' : ''}`

  return (
    <div className={pageClass}>
      <nav className="nav">
        <a className="brand" href="#top">
          Raphaela Oliveira
        </a>
        <div className="navLinks">
          {navLinks.map((link) => (
            <button key={link.id} className="navTab" onClick={() => openSection(link.id)}>
              {link.label}
            </button>
          ))}
          <button className="themeToggle" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a className="navCta" href={LINKEDIN} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </nav>

      <main>
        <section id="top" className="hero">
          <Rocket className="heroRocket" aria-hidden="true" />
          <div className="heroCopy">
            <span className="status mono"><i aria-hidden="true" /> Aerospace systems · Florida, USA</span>
            <h1>Software engineer building APIs and the interfaces on top of them.</h1>
            <p>I build APIs, data platforms and, more and more, the interfaces on top of them — across aerospace at Blue Origin and banking at Itaú Unibanco.</p>
            <div className="actions">
              <button className="btnPrimary" onClick={() => openSection('work')}>View selected work <ArrowDownRight size={16} /></button>
              <a className="btnGhost" href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
            </div>
          </div>
          <img className="photo" src={`${import.meta.env.BASE_URL}raphaela-dev.jpg`} alt="Raphaela Oliveira wearing a cap and hoodie while traveling" />
        </section>

        <dl className="facts">{facts.map((fact) => <div key={fact.label}><dt className="mono">{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>

        <div className="tabs" role="tablist" aria-label="Portfolio sections">
          {[['overview', 'Overview'], ['work', 'Selected work'], ['experience', 'Experience'], ['skills', 'Toolkit'], ['more', 'More']].map(([id, label]) => (
            <button key={id} role="tab" aria-selected={activeTab === id} className={activeTab === id ? 'tab active' : 'tab'} onClick={() => setActiveTab(id)}>{label}</button>
          ))}
        </div>

        {activeTab === 'overview' && <section className="overviewPanel" aria-label="Overview">
          <div className="overviewIntro"><span className="mono">01 · TOOLKIT</span><h2>Skills with a point of view.</h2><p>A practical toolkit shaped by systems, delivery and product thinking.</p></div>
          <div className="skillSignals">{skills.map((group, index) => <div className="skillSignal" key={group.title}><span className="mono">{String(index + 1).padStart(2, '0')}</span><div><h3>{group.title}</h3><p>{group.items.join(' · ')}</p></div></div>)}</div>
          <article className="featuredWork"><div><span className="mono">FEATURED PROJECT · 01</span><h3>Supplier Data API</h3><p>Implemented the Java API layer and Databricks integration that brought supplier data into one place, making procurement reviews easier to trace and reuse across aerospace supply-chain systems.</p></div><span className="mono">Java · Databricks</span></article>
        </section>}

        {activeTab === 'work' && <Section id="work" index="01" title="Mission log"><ol className="workList">{work.map((item, i) => <li key={item.title}><span className="mono num">{String(i + 1).padStart(2, '0')}</span><div className="workTitle"><h3>{item.title}</h3><span>{item.company}</span></div><div className="workBody"><p>{item.text}</p><span className="mono stack">{item.stack}</span></div></li>)}</ol></Section>}

        {activeTab === 'experience' && <Section id="experience" index="02" title="Experience"><div className="timelineCard"><div className="timelineHeader"><div><h3>Career progression</h3><p>From internship to full-stack systems</p></div><span className="mono">2020 — Now</span></div><div className="timelineLegend"><span><i className="legendSwatch purple" /> Career growth</span><span><i className="legendSwatch yellow" /> Company transition</span></div><div className="careerLineChart"><svg viewBox="0 0 900 125" role="img" aria-label="Career progression line chart"><path d="M 15 112 C 110 100 190 92 280 72 S 405 48 485 30 S 680 16 850 8" /><circle cx="15" cy="112" r="6" /><circle cx="280" cy="72" r="6" /><circle cx="485" cy="30" r="6" /><circle cx="850" cy="8" r="6" /><text x="15" y="128">2020 · Intern</text><text x="280" y="128">2021 · Junior</text><text x="485" y="128">2024 · Mid-Level</text><text x="760" y="128">2025 · Blue Origin</text></svg></div><div className="timelineAxis">{[{ year: '2020', company: 'Itaú Unibanco', detail: 'Software Engineer Internship', tone: 'yellow' }, { year: '2021', company: 'Itaú Unibanco', detail: 'Junior Software Engineer', tone: 'purple' }, { year: '2024', company: 'Itaú Unibanco', detail: 'Mid-Level Software Engineer', tone: 'purple' }, { year: '2025', company: 'Blue Origin', detail: 'Junior Software Engineer', tone: 'yellow' }].map((item) => <div className="timelineMilestone" key={`${item.year}-${item.company}`}><span className="mono">{item.year}</span><div className={`timelineBar ${item.tone}`} /><strong>{item.company}</strong><small>{item.detail}</small></div>)}</div></div><ol className="expList">{experience.map((item) => <li key={item.company}><span className="mono period">{item.period}</span><div className="expRole"><h3>{item.company}</h3><span>{item.role}</span></div><p>{item.text}</p></li>)}</ol></Section>}

        {activeTab === 'skills' && <Section id="skills" index="03" title="Systems toolkit"><div className="skillGrid">{skills.map((group) => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></Section>}

        {activeTab === 'more' && <><Section id="recognition" index="04" title="Flight record"><div className="twoCols"><RowList label="Awards" rows={awards} /><RowList label="Certifications" rows={certifications} /></div></Section><Section id="about" index="05" title="Beyond the mission"><div className="about"><p>I play FPS games, read manga and travel whenever I can. Strategy, good stories and new places keep me curious — and that curiosity is a big part of how I keep growing as an engineer.</p><ul>{interests.map(({ icon: Icon, label }) => <li key={label}><Icon size={18} /> {label}</li>)}</ul></div></Section></>}
      </main>

      <footer className="contact">
        <p>Open to frontend and full-stack roles where backend context matters.</p>
        <a className="email" href={LINKEDIN} target="_blank" rel="noreferrer">
          Connect on LinkedIn ↗
        </a>
        <div className="footerBottom">
          <span>© {new Date().getFullYear()} Raphaela Oliveira</span>
          <div>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={13} />
            </a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
