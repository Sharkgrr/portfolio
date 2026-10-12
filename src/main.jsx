import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowUpRight,
  BadgeCheck,
  Braces,
  Cloud,
  Code2,
  Crosshair,
  Database,
  FlaskConical,
  Gamepad2,
  Landmark,
  Layers3,
  Linkedin,
  Mail,
  Rocket,
  Server,
  ShieldCheck,
  Terminal,
  Trophy,
  Zap,
} from 'lucide-react'
import './styles.css'

const stats = [
  { label: 'Current focus', value: 'Frontend growth' },
  { label: 'Strongest base', value: 'Backend systems' },
  {
    label: 'Languages',
    value: (
      <>
        <span className="flag flagBr" aria-label="Brazil" /> PT native ·{' '}
        <span className="flag flagUs" aria-label="United States" /> EN intermediate
      </>
    ),
  },
  {
    label: 'Location',
    value: (
      <>
        <span className="flag flagUs" aria-label="United States" /> Florida, USA
      </>
    ),
  },
]

const skills = [
  { icon: Server, title: 'Backend', level: 5, items: ['Java', 'Kotlin', 'REST APIs'] },
  { icon: Layers3, title: 'Frontend', level: 3, items: ['React', 'Vite', 'Product UI'] },
  { icon: Database, title: 'Data', level: 3, items: ['SQL', 'Databricks', 'Data visibility'] },
  { icon: FlaskConical, title: 'Testing', level: 4, items: ['Postman', 'Insomnia', 'API validation'] },
  { icon: Cloud, title: 'Observability', level: 3, items: ['CloudWatch', 'Datadog', 'Monitoring'] },
  { icon: ShieldCheck, title: 'Delivery', level: 4, items: ['Automated tests', 'CI/CD', 'Production support'] },
]

const courses = [
  {
    order: 2,
    provider: 'Cisco',
    title: 'Introduction to IoT',
    date: 'May 2021',
    skills: ['IoT', 'Sensors', 'Connected systems'],
  },
  {
    order: 3,
    provider: 'AWS Academy',
    title: 'Cloud Foundation',
    date: 'Jun 2021',
    skills: ['AWS', 'Cloud fundamentals'],
  },
  {
    order: 4,
    provider: 'AWS',
    title: 'Getting Started with Serverless',
    date: 'Jul 2023',
    skills: ['API Gateway', 'CloudFormation', 'Serverless'],
  },
  {
    order: 5,
    provider: '42 São Paulo',
    title: 'Ethical Web Hacking',
    date: 'Sep 2024',
    skills: ['Python', 'Docker', 'Web security'],
  },
  {
    order: 1,
    provider: 'Certiprof',
    title: 'Lifelong Learning',
    date: 'Jul 2020',
    skills: ['Growth mindset', 'Continuous learning'],
  },
].sort((a, b) => a.order - b.order)

const projects = [
  {
    tag: 'Blue Origin',
    industry: 'Aerospace',
    icon: Rocket,
    tone: 'aerospace',
    title: 'Supplier Data API',
    text: 'Built and maintained a supplier data API integrated with Databricks, centralizing procurement visibility for aerospace supply-chain systems.',
    stack: ['Java', 'Databricks', 'Aerospace data'],
  },
  {
    tag: 'Blue Origin',
    industry: 'Aerospace',
    icon: Rocket,
    tone: 'aerospace',
    title: 'Approved Components Catalog',
    text: 'Designed a centralized catalog for approved aerospace components, supporting reuse, reducing redundancy, and improving technical decisions.',
    stack: ['Frontend', 'Backend', 'Supply chain'],
  },
  {
    tag: 'Itaú Unibanco',
    industry: 'Banking',
    icon: Landmark,
    tone: 'banking',
    title: 'Banking Platforms',
    text: 'Worked on financing, insurance quotation, and access management platforms for banking channels with high-volume user bases.',
    stack: ['Java', 'APIs', 'Banking'],
  },
]

const awards = [
  {
    title: 'GenAI Hackathon Award',
    source: 'Blue Origin',
    text: 'Recognized for Project DRILL, a vision AI prototype that extracts engineering specs from drawings into searchable data.',
  },
  {
    title: 'Merit Bonus',
    source: 'Itaú Unibanco',
    text: 'Recognition for delivering an auto insurance service, improving simulation flows and reducing operational complexity.',
  },
  {
    title: 'Highlight Project EXPO',
    source: 'College project recognition',
    text: 'Awarded for project impact and delivery quality during a technical showcase.',
  },
]

const timeline = [
  {
    period: '2025 - Now',
    company: 'Blue Origin',
    title: 'Frontend growth at Blue Origin',
    text: 'Currently working more with frontend and product interfaces, while using advanced backend context from APIs, data, and platform systems.',
  },
  {
    period: '2020 - 2025',
    company: 'Itaú Unibanco',
    title: 'Advanced backend foundation at Itaú Unibanco',
    text: 'Built a strong backend foundation through APIs, automation, and banking features across requirements, development, testing, delivery, and support.',
  },
  {
    period: '2019 - 2022',
    company: 'College',
    title: 'Computer Science background',
    text: 'Bachelor in Computer Science, with additional studies in English and an ongoing Theology degree.',
  },
]

const timelineYears = ['2019', '2020', '2021', '2022', '2023', '2024', '2025', 'Now']

const timelineTracks = [
  {
    period: '2019 - 2022',
    place: 'Computer Science',
    left: 0,
    width: 43,
    tone: 'study',
  },
  {
    period: '2020 - 2025',
    place: 'Itaú Unibanco',
    left: 14,
    width: 72,
    tone: 'banking',
  },
  {
    period: '2025 - Now',
    place: 'Blue Origin',
    left: 76,
    width: 24,
    tone: 'aerospace',
  },
]

const personalTraits = [
  'Video games and FPS',
  'Manga reader',
  'Travel',
]

const careerBuild = [
  { label: 'Backend', value: 92 },
  { label: 'Frontend', value: 66 },
  { label: 'Full stack', value: 76 },
]

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const [activeTab, setActiveTab] = useState('about')

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brandMark">R</span>
          <span>Raphaela.dev</span>
        </a>
        <div className="navLinks">
          {tabs.map((tab) => (
            <button
              className={activeTab === tab.id ? 'active' : ''}
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="heroGrid">
          <div className="heroCopy">
            <span className="eyebrow">
              <Gamepad2 size={16} /> full stack player
            </span>
            <h1>Advanced backend, growing frontend.</h1>
            <p>
              I am Raphaela Oliveira, a software engineer with advanced backend experience who is now
              growing into frontend work and building toward full-stack range.
            </p>
            <div className="heroActions">
              <button className="primaryBtn" type="button" onClick={() => setActiveTab('work')}>
                View projects <ArrowUpRight size={18} />
              </button>
              <button className="ghostBtn" type="button" onClick={() => setActiveTab('contact')}>
                Contact me
              </button>
            </div>
            <div className="statBar" aria-label="Professional summary">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <aside className="profilePanel" aria-label="Profile highlights">
            <div className="profileHudTop">
              <span>rank: software engineer</span>
              <span>class: full stack</span>
            </div>
            <div className="profileImageWrap">
              <img src="/raphaela-dev.jpg" alt="Raphaela Oliveira wearing a hoodie while traveling" />
              <div className="crosshair" aria-hidden="true">
                <Crosshair size={34} />
              </div>
              <div className="imageHud">
                <span>build mode</span>
                <strong>active</strong>
              </div>
            </div>
            <span className="panelKicker">current loadout</span>
            <h2>Advanced backend with frontend growth</h2>
            <p>Advanced backend foundation, current frontend focus, and a growing full-stack profile across aerospace and banking platforms.</p>
            <div className="buildMeters" aria-label="Career build progression">
              {careerBuild.map((item) => (
                <div className="buildMeter" key={item.label}>
                  <span>{item.label}</span>
                  <div>
                    <i style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="miniStack">
              <span>React</span>
              <span>UI</span>
              <span>Java</span>
              <span>AWS</span>
              <span>SQL</span>
            </div>
          </aside>
        </div>

      </section>

      <div className="tabBar" role="tablist" aria-label="Portfolio sections">
        {tabs.map((tab) => (
          <button
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? 'active' : ''}
            key={tab.id}
            role="tab"
            type="button"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'about' && (
      <section className="section aboutSection">
        <div className="aboutCopy">
          <span className="eyebrow">
            <Gamepad2 size={16} /> about me
          </span>
          <h2>Player outside work, engineer at work.</h2>
          <p>
            Outside the technical side, I like video games, especially FPS titles, reading manga, and traveling.
            I bring that same curiosity into how I learn, explore new places, and keep improving over time.
          </p>
        </div>
        <div className="aboutTraits" aria-label="Personal interests">
          {personalTraits.map((trait) => (
            <span key={trait}>{trait}</span>
          ))}
        </div>
      </section>
      )}

      {activeTab === 'skills' && (
      <>
      <section className="section">
        <div className="sectionHeader">
          <span className="eyebrow">
            <Zap size={16} /> loadout
          </span>
          <h2>Core strengths.</h2>
        </div>
        <div className="skillGrid">
          {skills.map(({ icon: Icon, title, level, items }) => (
            <article className="skillCard" key={title}>
              <div className="cardIcon">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <div className="skillLevel" aria-label={`${title} level ${level} of 5`}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <i className={index < level ? 'filled' : ''} key={`${title}-${index}`} />
                ))}
              </div>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section coursesSection">
        <div className="sectionHeader">
          <span className="eyebrow">
            <BadgeCheck size={16} /> credentials
          </span>
          <h2>Courses and certifications.</h2>
        </div>
        <div className="courseTimeline" aria-label="Courses timeline">
          {courses.map((course) => (
            <article className="courseCard" key={course.title}>
              <div className="courseMeta">
                <span>{course.provider}</span>
                <strong>{course.date}</strong>
              </div>
              <h3>{course.title}</h3>
              <div className="chips courseChips">
                {course.skills.map((skill) => (
                  <small key={skill}>{skill}</small>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      </>
      )}

      {activeTab === 'work' && (
      <section className="section projectsSection">
        <div className="sectionHeader">
          <span className="eyebrow">
            <Trophy size={16} /> highlights
          </span>
          <h2>Selected impact.</h2>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <article className={`projectCard ${project.tone}`} key={project.title}>
              <div className="industryBadge">
                <project.icon size={18} />
                <span>{project.industry}</span>
              </div>
              <span className="projectCompany">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <div className="chips">
                {project.stack.map((item) => (
                  <small key={item}>{item}</small>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      )}

      {activeTab === 'timeline' && (
      <>
      <section className="section awardsSection">
        <div className="sectionHeader">
          <span className="eyebrow">
            <Trophy size={16} /> awards
          </span>
          <h2>Recognition worth keeping visible.</h2>
        </div>
        <div className="awardGrid">
          {awards.map((award) => (
            <article className="awardCard" key={award.title}>
              <span>{award.source}</span>
              <h3>{award.title}</h3>
              <p>{award.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section splitSection">
        <div>
          <span className="eyebrow">
            <Terminal size={16} /> progress log
          </span>
          <h2>From APIs to interfaces.</h2>
          <p>
            My path started with backend engineering, APIs, and production systems. Today I am working more
            with frontend and product UI, using that backend base to become a stronger full-stack engineer.
          </p>
        </div>
        <div className="careerMap" aria-label="Career timeline by year and company">
          <div className="yearAxis" aria-hidden="true">
            {timelineYears.map((year) => (
              <span key={year}>{year}</span>
            ))}
          </div>
          <div className="timelineGraph">
            {timelineTracks.map((track) => (
              <div className="timelineTrack" key={track.place}>
                <span>{track.period}</span>
                <div className="trackLine">
                  <i
                    className={track.tone}
                    style={{ left: `${track.left}%`, width: `${track.width}%` }}
                  >
                    <strong>{track.place}</strong>
                  </i>
                </div>
              </div>
            ))}
          </div>
          <div className="timeline">
          {timeline.map((item) => (
            <article key={item.title}>
              <strong>{item.period}</strong>
              <span>{item.company}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
          </div>
        </div>
      </section>
      </>
      )}

      {activeTab === 'contact' && (
      <section id="contact" className="contact">
        <div>
          <span className="eyebrow">
            <Braces size={16} /> next round
          </span>
          <h2>Reliable systems. Sharp interfaces.</h2>
          <p>
            Frontend growth with advanced backend experience, API context, testing, observability, data visibility, and a bilingual
            profile: Portuguese native and intermediate English.
          </p>
        </div>
        <div className="contactActions">
          <a href="mailto:raphaelaoliveira79@gmail.com">
            <Mail size={18} /> Email
          </a>
          <a href="https://www.linkedin.com/in/raphaelaoliveirajava" target="_blank" rel="noreferrer">
            <Linkedin size={18} /> LinkedIn
          </a>
          <a href="#top">
            <Code2 size={18} /> Back to top
          </a>
        </div>
      </section>
      )}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
