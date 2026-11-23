import React, { Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Award, BookOpen, Cloud, CodeXml, Compass, Download, Gamepad2, GitBranch, GraduationCap, House, Layers, Medal, Network, Orbit, PanelsTopLeft, Rocket, Server, ShieldCheck, Sprout, UserRound } from 'lucide-react'
import { workNotes, challenges, toolkit } from './portfolioContent'
import './portfolio.css'

const RoleFit = lazy(() => import('./RoleFit'))
const LINKEDIN_URL = 'https://www.linkedin.com/in/raphaelaoliveirajava'
const resumeUrl = new URL('./assets/resume.pdf', import.meta.url).href
const portraitUrl = `${import.meta.env.BASE_URL}raphaela-dev.jpg`
const sections = [
  { id: 'overview', label: 'Overview', icon: House },
  { id: 'work', label: 'Work', icon: CodeXml },
  { id: 'about', label: 'About', icon: UserRound },
  { id: 'recognition', label: 'Recognition', icon: Award },
  { id: 'learning', label: 'Learning', icon: BookOpen },
]
const aliases = { experience: 'work', more: 'about' }
function readRoute() {
  const hash = window.location.hash.slice(1)
  const route = aliases[hash] || hash
  return [...sections.map(section => section.id), 'role-fit', 'challenge', 'skills'].includes(route) ? route : 'overview'
}
function LinkedIn({ children, className }) {
  return <a className={className} href={LINKEDIN_URL} target="_blank" rel="noreferrer">{children}</a>
}
function Eyebrow({ children, className = '' }) {
  return <span className={`eyebrow ${className}`}>{children}</span>
}
function Sidebar({ route }) {
  return <aside className="sidebar">
    <div className="sidebarUpper">
      <a className="sidebarIdentity" href="#overview" aria-label="Raphaela Oliveira, overview">
        <img src={portraitUrl} alt="" width="48" height="48" />
        <span>RAPHAELA<br />OLIVEIRA</span>
      </a>
      <nav className="sideNav" aria-label="Portfolio sections">
        <Eyebrow>Explore</Eyebrow>
        {sections.map(({ id, label, icon: Icon }) => <a key={id} href={`#${id}`} aria-current={route === id ? 'page' : undefined}><Icon size={21} aria-hidden="true" /><span>{label}</span></a>)}
      </nav>
    </div>
    <div className="sidebarContact"><Eyebrow>Let’s connect</Eyebrow><LinkedIn>LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></LinkedIn><a href={resumeUrl} download="Raphaela-Oliveira-Resume.pdf"><Download size={15} aria-hidden="true" /> Résumé</a></div>
  </aside>
}
function PageHeader({ route }) {
  const index = sections.findIndex(section => section.id === route)
  const title = index >= 0 ? sections[index].label : route === 'role-fit' ? 'Ask the guide' : route === 'skills' ? 'Toolkit' : 'Engineering challenge'
  return <header className="pageHeader"><a href="#overview" className="wordmark"><Orbit size={27} aria-hidden="true" /><span>RAPHAELA OLIVEIRA</span></a><Eyebrow>{index >= 0 ? `0${index + 1} / ` : ''}{title}</Eyebrow></header>
}
const deliveryStages = [
  { icon: Server, title: 'Infrastructure', tools: 'Terraform · AWS' },
  { icon: GitBranch, title: 'CI/CD', tools: 'Build · Test · Deploy' },
  { icon: CodeXml, title: 'Backend', tools: 'Java · Kotlin' },
  { icon: PanelsTopLeft, title: 'Interface', tools: 'React' },
  { icon: Rocket, title: 'Production', tools: 'Deploy · Monitor' },
]
function DeliveryFlow() {
  return <section className="deliveryFlow" aria-label="End-to-end software delivery"><ol>{deliveryStages.map(({ icon: Icon, title, tools }, index) => <li key={title}><div className="deliveryStage"><Icon size={38} aria-hidden="true" /><h2>{title}</h2><span>{tools}</span></div>{index < deliveryStages.length - 1 && <ArrowRight className="deliveryArrow" size={22} aria-hidden="true" />}</li>)}</ol></section>
}
function Home() {
  return <>
    <section className="hero" aria-labelledby="home-title">
      <img className="heroPortrait" src={portraitUrl} alt="Raphaela Oliveira during a trip, wearing a cap and hoodie" fetchPriority="high" />
      <div className="heroShade" aria-hidden="true" />
      <div className="heroCopy"><Eyebrow>Software engineer / curious by nature</Eyebrow><h1 id="home-title">Hi, I’m Raphaela.<br />Engineer. Explorer.</h1><p>Software engineer at Blue Origin.<br />Gamer, manga reader, and curious traveler.</p><a className="button primary" href="#work">Explore my work <ArrowDownRight size={20} aria-hidden="true" /></a></div>
      <div className="heroMeta"><Eyebrow>5+ years in software / Melbourne, FL</Eyebrow><Eyebrow>Banking → Aerospace</Eyebrow></div>
    </section>
    <DeliveryFlow />
  </>
}
function CaseDetails({ note, ask, open }) {
  const [stage, setStage] = useState(0)
  const [node, setNode] = useState(0)
  const current = note.stages[stage]
  return <details className="caseDetails" open={open || undefined}>
    <summary>Explore the work <ArrowDownRight size={16} aria-hidden="true" /></summary>
    <div className="caseBody"><div className="tags">{note.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
      <div className="stageSelector" role="tablist" aria-label={`${note.category} walkthrough`}>{note.stages.map((item, index) => <button key={item.label} id={`${note.id}-stage-${index}`} role="tab" aria-selected={stage === index} aria-controls={`${note.id}-panel`} tabIndex={stage === index ? 0 : -1} onClick={() => setStage(index)} onKeyDown={event => {
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
        event.preventDefault()
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : 2)) % 3
        setStage(next)
        document.getElementById(`${note.id}-stage-${next}`)?.focus()
      }}>{item.label}</button>)}</div>
      <div className="stagePanel" id={`${note.id}-panel`} role="tabpanel" aria-labelledby={`${note.id}-stage-${stage}`}><h4>{current.title}</h4><p>{current.text}</p><p className="caseNote">{current.note}</p></div>
      <div className="systemSketch"><Eyebrow>Engineering walkthrough / simplified example</Eyebrow><div className="flowNodes">{note.flow.map((item, index) => <button key={item.label} aria-pressed={node === index} onClick={() => setNode(index)}>{item.label}</button>)}</div><p aria-live="polite">{note.flow[node].detail}</p></div>
      <button className="plainButton" onClick={() => ask(note.question)}>Discuss this with the guide <ArrowUpRight size={15} aria-hidden="true" /></button>
    </div>
  </details>
}
function Work({ ask, selectedCase }) {
  const note = id => workNotes.find(item => item.id === id)
  return <section className="workPage sectionPad" aria-labelledby="work-title">
    <div className="sectionHeading"><h1 id="work-title">Engineering in practice.</h1><Eyebrow>Selected experience / 01—03</Eyebrow></div>
    <div className="workGrid">
      <article className="workCard procurement"><div className="caseMeta"><Eyebrow>01 / Blue Origin</Eyebrow><Eyebrow>Procurement automation</Eyebrow></div><div className="workVisual"><strong className="metric">~3 days → hours</strong><Eyebrow>Overall processing time</Eyebrow></div><h2>Spreadsheets → shared portal.</h2><p>Supplier registration for 30+ commodity managers.</p><CaseDetails note={note('interfaces')} ask={ask} open={selectedCase === 'interfaces'} /></article>
      <article className="workCard backend"><div className="caseMeta"><Eyebrow>02 / Itaú Unibanco</Eyebrow><Eyebrow>Backend engineering</Eyebrow></div><div className="workVisual languageVisual"><CodeXml size={70} aria-hidden="true" /><strong>Java + Kotlin</strong></div><h2>APIs people rely on.</h2><p>Insurance quotes. Financing. Secure access.</p><CaseDetails note={note('apis')} ask={ask} open={selectedCase === 'apis'} /></article>
    </div>
    <article className="deliveryCard"><div className="deliveryCardCopy"><Eyebrow>03 / Blue Origin / cloud & delivery</Eyebrow><h2>Build once. Deploy repeatably.</h2><p>Terraform + AWS ECS/Fargate + CI/CD.<br />Adopted and extended by 3 engineering teams.</p><CaseDetails note={note('delivery')} ask={ask} open={selectedCase === 'delivery'} /></div><div className="deploymentMetric"><strong className="metric">~5 min</strong><Eyebrow>Dev deployments</Eyebrow></div></article>
    <div className="workFootnote"><Eyebrow>Selected work / banking → aerospace</Eyebrow><div><a href="#skills">Explore my toolkit <ArrowUpRight size={14} /></a><a href="#challenge">Think through a challenge <ArrowUpRight size={14} /></a></div></div>
  </section>
}
const career = [
  { year: '2020', icon: Sprout, date: 'Mar 2020 — Sep 2021', title: 'Software Engineer Intern', company: 'Itaú Unibanco · Brazil' },
  { year: '2021', icon: CodeXml, date: 'Sep 2021 — Sep 2024', title: 'Junior Software Engineer', company: 'Itaú Unibanco · Brazil' },
  { year: '2024', icon: Layers, date: 'Oct 2024 — Feb 2025', title: 'Mid-Level Software Engineer', company: 'Itaú Unibanco · Brazil' },
  { year: '2025', icon: Rocket, date: 'Aug 2025 — Present', title: 'Software Engineer I', company: 'Blue Origin · Florida', current: true },
]
function CareerTimeline() {
  return <section className="career sectionPad" aria-labelledby="career-title"><Eyebrow>Experience / the path so far</Eyebrow><h2 id="career-title">From banking to aerospace.</h2><ol className="careerTimeline">{career.map(({ year, icon: Icon, date, title, company, current }, index) => <li className={current ? 'currentRole' : ''} key={year}><div className="milestoneYear"><Icon size={28} aria-hidden="true" /><strong>{year}</strong></div><span className="careerDate">{date}</span><h3>{title}</h3><p>{company}</p>{index < career.length - 1 && <ArrowRight className="careerArrow" size={24} aria-hidden="true" />}{current && <span className="srOnly">Current position</span>}</li>)}</ol><div className="education"><GraduationCap size={32} aria-hidden="true" /><span className="educationYear">2022</span><h3>B.S. Computer Science</h3><p>Universidade São Judas Tadeu · Brazil</p></div></section>
}
function About() {
  return <>
    <section className="aboutIntro sectionPad" aria-labelledby="about-title"><figure><img src={portraitUrl} alt="Raphaela Oliveira, the person behind the code" width="420" height="430" loading="lazy" /><figcaption>Raphaela Oliveira / the person behind the code</figcaption></figure><div><Eyebrow>Career / banking to aerospace</Eyebrow><h1 id="about-title">One engineer.<br />End-to-end delivery.</h1><p>Software engineer at Blue Origin.<br />5+ years across banking and aerospace.<br />From the first commit to production.</p><LinkedIn className="textLink">Connect on LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></LinkedIn></div></section>
    <section className="interests" aria-label="Interests beyond engineering"><Eyebrow>Beyond code</Eyebrow>{[[Gamepad2, 'FPS games', 'One more round.'], [BookOpen, 'Manga', 'One more chapter.'], [Compass, 'Travel', 'One more place to explore.']].map(([Icon, title, caption]) => <div className="interest" key={title}><Icon size={26} aria-hidden="true" /><div><h2>{title}</h2><p>{caption}</p></div></div>)}</section>
    <CareerTimeline />
  </>
}
function Recognition() {
  return <section className="recognitionPage sectionPad" aria-labelledby="recognition-title"><Eyebrow>Recognition / work that made a difference</Eyebrow><h1 id="recognition-title">Recognized for the execution.</h1><div className="awardGrid"><article><Eyebrow>Blue Origin / February 2026</Eyebrow><Award size={64} className="awardIcon" aria-hidden="true" /><h2>Golden Rivet Award</h2><h3>Best Technical Execution</h3><p>Co-developed DRILL, a GenAI solution that extracts data from engineering drawings. Our team received the Golden Rivet Award for Best Technical Execution.</p><p>The team’s code was later reused in production by another engineering team — taking the work beyond the prototype.</p></article><article><Eyebrow>Itaú Unibanco / April 2024</Eyebrow><Medal size={64} className="awardIcon" aria-hidden="true" /><h2>Merit Bonus</h2><h3>Insurance & backend engineering</h3><p>Recognized for contributions to an auto insurance service, including backend and simulation workflows.</p><p>This work connected API development with a simpler insurance simulation experience.</p></article></div></section>
}
const courses = [
  { icon: Activity, title: 'Site Reliability Engineering', provider: 'Training / 2024', description: 'A focus on software reliability and operating services in production — complementing my work with monitoring, troubleshooting, and delivery.' },
  { icon: ShieldCheck, title: 'Ethical Web Hacking', provider: '42 São Paulo / 2024', description: 'Training in ethical web hacking, adding a security perspective to how I think about web applications and APIs.' },
  { icon: Cloud, title: 'Getting Started with Serverless', provider: 'AWS / 2023', description: 'An introduction to serverless computing, alongside my practical experience evaluating and using AWS Lambda workflows.' },
  { icon: Layers, title: 'Cloud Foundations', provider: 'AWS Academy / 2021', description: 'Foundational cloud training that supports the broader AWS toolkit I use for infrastructure and application delivery.' },
  { icon: Network, title: 'Introduction to IoT', provider: 'Cisco / 2021', description: 'An introduction to the Internet of Things, extending my learning beyond application code to connected systems.' },
  { icon: BookOpen, title: 'Lifelong Learning', provider: 'Certiprof / 2020', description: 'Continued learning as an ongoing practice — building new skills as my work evolves from financial services to aerospace.' },
]
function Learning() {
  return <section className="learningPage sectionPad" aria-labelledby="learning-title"><Eyebrow>Courses / continued learning</Eyebrow><h1 id="learning-title">Keep building. Keep learning.</h1><p className="sectionIntro">Continued learning across reliability, cloud, security, and connected systems.</p><div className="courseGrid">{courses.map(({ icon: Icon, title, provider, description }) => <article key={title}><div className="courseTitle"><Icon size={28} aria-hidden="true" /><h2>{title}</h2></div><Eyebrow>{provider}</Eyebrow><p>{description}</p></article>)}</div></section>
}
function Challenge({ ask }) {
  const [selected, setSelected] = useState(0)
  const [choice, setChoice] = useState(null)
  const challenge = challenges[selected]
  return <section className="explorerPage sectionPad"><Eyebrow>Think it through with me</Eyebrow><h1>Where would you start?</h1><p className="sectionIntro">A short engineering thought experiment. Choose a first move and explore what it tells you.</p><div className="segmented">{challenges.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => { setSelected(index); setChoice(null) }}>{index === 0 ? 'An API under pressure' : 'A workflow to simplify'}</button>)}</div><article className="challengeCard"><Eyebrow>Illustrative scenario</Eyebrow><h2>{challenge.title}</h2><p>{challenge.situation}</p><div className="challengeChoices">{challenge.options.map((option, index) => <button key={option.label} aria-pressed={choice === index} onClick={() => setChoice(index)}>{option.label}</button>)}</div>{choice !== null && <div className="challengeResponse" aria-live="polite"><p>{challenge.options[choice].response}</p><p>{challenge.connection}</p><button className="button primary" onClick={() => ask(challenge.prompt)}>Keep exploring with the guide</button></div>}</article></section>
}
function Toolkit({ openWork }) {
  const [selected, setSelected] = useState(0)
  const tool = toolkit[selected]
  return <section className="explorerPage sectionPad"><Eyebrow>Tools, with context</Eyebrow><h1>What I reach for.</h1><p className="sectionIntro">Select a tool to see how it connects to my experience.</p><div className="toolkitExplorer"><div className="toolChoices">{toolkit.map((item, index) => <button key={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)}><Eyebrow>{item.group}</Eyebrow>{item.name}</button>)}</div><article className="toolDetail"><CodeXml size={36} /><Eyebrow>{tool.group}</Eyebrow><h2>{tool.name}</h2><p>{tool.text}</p><button className="button primary" onClick={() => openWork(tool.caseId)}>Explore the connected work</button></article></div><p className="sectionIntro">Also in my toolkit: AWS · Databricks · Postman · Insomnia · Datadog · Automated tests</p></section>
}
function Footer() {
  return <footer className="contactFooter"><Eyebrow>Let’s connect / software engineering</Eyebrow><LinkedIn className="contactHeadline"><span>Let’s build what’s next.</span><ArrowUpRight size={40} aria-hidden="true" /></LinkedIn><div className="footerMeta"><span>Raphaela Oliveira / Melbourne, FL</span><div><a href="#role-fit">Ask the guide <ArrowUpRight size={13} /></a><a href={resumeUrl} download="Raphaela-Oliveira-Resume.pdf">Résumé <Download size={13} /></a><LinkedIn>LinkedIn <ArrowUpRight size={13} /></LinkedIn></div></div></footer>
}
function Portfolio() {
  const [route, setRoute] = useState(readRoute)
  const [guideOpened, setGuideOpened] = useState(false)
  const [guideQuestion, setGuideQuestion] = useState(null)
  const [selectedCase, setSelectedCase] = useState(null)
  useEffect(() => {
    const syncRoute = () => setRoute(readRoute())
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])
  useEffect(() => {
    if (route === 'role-fit') setGuideOpened(true)
    const title = sections.find(section => section.id === route)?.label || (route === 'role-fit' ? 'Ask the guide' : route === 'skills' ? 'Toolkit' : 'Engineering challenge')
    document.title = `${title} — Raphaela Oliveira | Software Engineer`
    document.getElementById('content')?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [route])
  function ask(text) {
    setGuideQuestion({ id: crypto.randomUUID(), text })
    window.location.hash = 'role-fit'
  }
  function openWork(id) {
    setSelectedCase(id)
    window.location.hash = 'work'
  }
  const pages = { overview: <Home />, work: <Work ask={ask} selectedCase={selectedCase} />, about: <About />, recognition: <Recognition />, learning: <Learning />, challenge: <Challenge ask={ask} />, skills: <Toolkit openWork={openWork} /> }
  return <div className="portfolio"><a className="skipLink" href="#content" onClick={event => { event.preventDefault(); document.getElementById('content')?.focus() }}>Skip to content</a><Sidebar route={route} /><div className="pageShell" data-page={route}><PageHeader route={route} /><main id="content" tabIndex={-1}>{pages[route]}{(guideOpened || route === 'role-fit') && <div className="guideWrap" hidden={route !== 'role-fit'}><Suspense fallback={<p role="status">Opening the guide…</p>}><RoleFit question={guideQuestion} /></Suspense></div>}</main><Footer /></div></div>
}

createRoot(document.getElementById('root')).render(<Portfolio />)
