export const workNotes = [
  {
    id: 'apis',
    title: 'Behind a simpler quote.',
    company: 'Itaú Unibanco',
    category: 'Backend engineering',
    summary: 'Java and Kotlin APIs for insurance quotes, financing simulations and secure customer access.',
    tools: ['Java', 'Kotlin', 'Spring Boot', 'SQL'],
    question: 'How does your experience building insurance quote APIs translate to a new backend project?',
    stages: [
      { label: 'The challenge', title: 'Make a complex flow easier to use.', text: 'Insurance quotes and financing simulations connect customer input with business rules. My work at Itaú included the APIs behind those journeys.', node: 'Customer input', note: 'Start with the information the customer actually needs to provide.' },
      { label: 'The approach', title: 'Follow the request through the system.', text: 'Explore a simplified API flow below. Select a step to see the engineering question it raises.', node: 'API contract', note: 'What does a caller send, and which outcomes can they expect?' },
      { label: 'After release', title: 'Keep following the request.', text: 'My work also included production support, using logs and monitoring tools such as Splunk and CloudWatch to investigate API issues.', node: 'Production signals', note: 'A request ID connects a customer symptom to the logs worth investigating.' },
    ],
    flow: [
      { label: 'Request', detail: 'Which fields are required? How should invalid input be explained to the caller?' },
      { label: 'Validation', detail: 'Which rules belong at the boundary, and which need business context?' },
      { label: 'Service', detail: 'What happens if a dependency is slow or temporarily unavailable?' },
      { label: 'Response', detail: 'Can the caller understand the outcome and safely decide what to do next?' },
    ],
  },
  {
    id: 'interfaces',
    title: 'From spreadsheet to shared workflow.',
    company: 'Blue Origin',
    category: 'Product interfaces',
    summary: 'React workflows backed by APIs, helping people move spreadsheet-based work into a shared interface.',
    tools: ['React', 'REST APIs', 'Product UI'],
    question: 'How do you approach turning spreadsheet-based work into a shared React interface?',
    stages: [
      { label: 'The challenge', title: 'Understand the work inside the spreadsheet.', text: 'At Blue Origin, I built React workflows backed by APIs to help people move spreadsheet-based work into a shared interface.', node: 'Daily workflow', note: 'A spreadsheet often contains a process as well as data.' },
      { label: 'The approach', title: 'Make the next action clear.', text: 'This walkthrough explores the questions involved in moving that work into an interface. Select a step to inspect it.', node: 'Interface decisions', note: 'Make editable fields, validation and save status understandable.' },
      { label: 'The connection', title: 'Bring frontend and backend together.', text: 'This work connects my backend foundation with building product interfaces and making data easier to work with.', node: 'Shared state', note: 'The screen and the API should agree on what a successful save means.' },
    ],
    flow: [
      { label: 'Read', detail: 'Which information does someone need before making a change?' },
      { label: 'Edit', detail: 'Which fields can change? What feedback helps someone correct an invalid value?' },
      { label: 'Save', detail: 'How does the interface communicate that the API accepted the change?' },
      { label: 'Recover', detail: 'If a save fails, can someone keep their input and try again?' },
    ],
  },
  {
    id: 'delivery',
    title: 'A repeatable path to production.',
    company: 'Blue Origin',
    category: 'Cloud & delivery',
    summary: 'Terraform and CI/CD to automate deployments and make releases repeatable.',
    tools: ['Terraform', 'AWS', 'CI/CD'],
    question: 'How have you used Terraform and CI/CD to make deployments repeatable?',
    stages: [
      { label: 'The challenge', title: 'Make delivery repeatable.', text: 'At Blue Origin, I used Terraform and CI/CD to automate deployments and make releases repeatable.', node: 'Release process', note: 'Repeated manual work is a place to look for an automation opportunity.' },
      { label: 'The approach', title: 'Make the process visible.', text: 'Explore a simplified delivery flow and the questions to ask at each step.', node: 'Delivery decisions', note: 'Each stage should leave enough information to explain its outcome.' },
      { label: 'The follow-through', title: 'Check what reached production.', text: 'Deployment automation connects infrastructure and application delivery. The walkthrough below makes that connection explorable.', node: 'Release verification', note: 'A completed job is one signal. The running application provides another.' },
    ],
    flow: [
      { label: 'Change', detail: 'Can someone review what the application or infrastructure change will do?' },
      { label: 'Verify', detail: 'Which checks give useful feedback before a release?' },
      { label: 'Deploy', detail: 'Is the environment configuration explicit and reproducible?' },
      { label: 'Observe', detail: 'How will you confirm that the released application behaves as expected?' },
    ],
  },
]

export const challenges = [
  {
    id: 'timeout', title: 'An API suddenly slows down.',
    situation: 'A quote endpoint starts timing out. You have logs, a dashboard and a recent release. Where would you begin?',
    prompt: 'What would you investigate first if an insurance quote API started timing out?',
    options: [
      { label: 'Trace a failing request', response: 'A useful starting point. Follow one request ID, inspect where the time is spent, then compare it with a successful request. That gives you a smaller area to investigate.' },
      { label: 'Inspect the recent release', response: 'A reasonable hypothesis. Compare when latency changed with the release time, then look for evidence in traces or logs before attributing the issue to a specific change.' },
      { label: 'Increase the timeout', response: 'This may help a long-running operation finish, but first inspect the latency and dependency behavior. A longer timeout can also leave more requests waiting.' },
    ],
    connection: 'My experience with this kind of investigation comes from supporting APIs at Itaú, using logs and monitoring tools including Splunk and CloudWatch.',
  },
  {
    id: 'workflow', title: 'A spreadsheet has become a workflow.',
    situation: 'Several people edit the same data and need a shared interface. What would you explore first?',
    prompt: 'How would you approach replacing a spreadsheet-based workflow with a React interface?',
    options: [
      { label: 'Watch someone use the spreadsheet', response: 'Start with the existing work. Watch the decisions, handoffs and repeated edits. Those observations help define what the first interface should support.' },
      { label: 'Design the data model', response: 'A useful foundation. Pair the model with examples from the current workflow so its rules reflect how people actually use the data.' },
      { label: 'Build the first screen', response: 'A small prototype can make a conversation concrete. Put one real task through it early and use the feedback to refine the fields, validation and save behavior.' },
    ],
    connection: 'At Blue Origin, I built React workflows backed by APIs to help move spreadsheet-based work into a shared interface.',
  },
]

export const toolkit = [
  { name: 'Java & Kotlin', group: 'Backend', text: 'Building APIs for insurance quotes, financing simulations and secure customer access at Itaú.', caseId: 'apis' },
  { name: 'Spring Boot', group: 'Backend', text: 'The backend framework behind my Java and Kotlin API work at Itaú.', caseId: 'apis' },
  { name: 'React', group: 'Frontend', text: 'Building shared workflows and connecting product interfaces to APIs at Blue Origin.', caseId: 'interfaces' },
  { name: 'Terraform & CI/CD', group: 'Delivery', text: 'Automating deployments and making releases repeatable at Blue Origin.', caseId: 'delivery' },
  { name: 'Splunk & CloudWatch', group: 'Observability', text: 'Investigating API issues after release through logs and monitoring at Itaú.', caseId: 'apis' },
  { name: 'SQL & Databricks', group: 'Data', text: 'Part of my data toolkit alongside backend APIs and product interfaces.', caseId: 'interfaces' },
]
