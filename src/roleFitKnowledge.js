export const topics = [
  { label: 'Build an API', icon: 'code', keywords: /\b(api|apis|java|kotlin|backend|spring)\b/i, source: 'Itaú Unibanco', experience: 'I built Java and Kotlin APIs with Spring Boot for insurance quotes, financing simulations, and secure customer access.', question: 'How did you test a change to an insurance quote API before release?' },
  { label: 'Build a product interface', icon: 'layout', keywords: /\b(react|frontend|interface|interfaces|manual|spreadsheet|ui)\b/i, source: 'Blue Origin', experience: 'I built React workflows backed by APIs to help people move spreadsheet-based work into a shared interface.', question: 'How did you decide what users could edit and what the interface should protect?' },
  { label: 'Automate deployments', icon: 'cloud', keywords: /\b(deploy\w*|terraform|ci\/cd|cloud|automat\w*)\b/i, source: 'Blue Origin', experience: 'I used Terraform and CI/CD to automate deployments and make releases repeatable.', question: 'Which manual step did you automate first, and how did you verify the result?' },
  { label: 'Investigate production issues', icon: 'activity', keywords: /\b(production|issues|logs|monitor\w*|splunk|cloudwatch|timeout\w*)\b/i, source: 'Itaú Unibanco', experience: 'I supported APIs after release and used logs and monitoring tools, including Splunk and CloudWatch, to investigate production issues.', question: 'What would you check first if a financing API started timing out?' },
]
export function replyFor(message) {
  const exact = topics.find(topic => topic.label === message)
  const matches = exact ? [exact] : topics.filter(topic => topic.keywords.test(message)).slice(0, 2)
  return matches.length ? { matches } : { matches: [], fallback: 'I don’t have a prepared answer for that topic. This guided chat covers APIs, React interfaces, deployments, and production support. For other questions, connect with me on LinkedIn — I’d be happy to compare notes.' }
}
