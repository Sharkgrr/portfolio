# Portfolio

Personal portfolio for Raphaela Oliveira, built with React + Vite. Fieldnotes is an interactive engineering notebook with three entry paths, explorable work, engineering challenges, a contextual toolkit and personal interests. `src/fieldnotes.css` defines the interface.

## Guided Role Fit

The chat uses Assistant UI components and its local runtime, connected through `src/chatAdapter.js` to the Mastra agent in `server/index.js`. The guide loads on demand and keeps its conversation when navigating between sections. Work and challenge buttons pass a relevant question into the conversation. Verified experience comes from `src/roleFitKnowledge.js` and `src/portfolioContent.js`. Architecture walkthroughs and challenges are explicitly illustrative.

Requires Node >=22.13. Copy `.env.example` to `.env`, set `OPENAI_API_KEY`, then run `npm run dev` to start Vite and the agent server. Secrets stay server-side. Messages are held in React state and sent, with recent conversation context, to the server and AI provider; do not submit sensitive data. Without a configured key or on service failure, the interface explicitly falls back to curated notes. AI outputs may be inaccurate.

The server binds to loopback for local development. For GitHub Pages, deploy the Node backend separately, set its `HOST` as required by the host, and set `ALLOWED_ORIGIN` to `https://sharkgrr.github.io`. Set the frontend build variable `VITE_CHAT_API_URL` to that server's HTTPS `/api/chat` URL and rebuild. The server permits cross-origin requests from the configured origin. Hosting credentials and an AI provider key are required to enable live AI in production.

Run the matching tests with `node --test tests/roleFit.test.js`.

## Canvas and Code Parity

The code is the visual source of truth. For visual changes, update the implementation, verify desktop and mobile in the browser, then refresh the editable canvas imports from the running site. Do not maintain a separate speculative design that diverges from the implementation. Imported layers are snapshots, not automatic two-way sync. The live browser node reflects the running Vite site while the development server is available.

## Stack

- Frontend: React, Vite, modern CSS, and lucide-react
- Professional focus: advanced backend experience with intermediate frontend growth, product-minded engineering, APIs, testing, and observability
- Core technologies: Java, Kotlin, React, SQL, Databricks, AWS, Terraform, Postman, Insomnia, CloudWatch, Datadog
- Visual identity: editorial engineering notebook, green accents, serif headings, contextual annotations and responsive navigation
- Credentials highlighted: Cisco Introduction to IoT, AWS Serverless, AWS Academy Cloud Foundation, 42 Sao Paulo Ethical Web Hacking, and Certiprof Lifelong Learning
- Optional backend: Java + Spring Boot, prepared in `backend/`

## Running the Frontend

```bash
npm install
npm run dev
```

Then open the URL shown by Vite.

## Backend Java

The backend is not required for the first portfolio version. The `backend/` folder provides a Spring Boot base for a future API, such as contact handling, dynamic projects, or an admin panel.

To run the backend in the future, install Java 21 and Maven, then execute:

```bash
cd backend
mvn spring-boot:run
```

## Profile Notes

- Software Engineer with experience across aerospace and banking, focused on backend APIs and product interfaces
- Career arc: advanced backend foundation, currently growing frontend skills at an intermediate level, moving toward a stronger full-stack profile
- Portuguese native speaker and intermediate English speaker
- Personal interests: video games, FPS titles, manga, and travel
- Recognition includes an AI hackathon award, the Itaú Merit Bonus, and Highlight Project EXPO

## Next Details to Personalize

- Real projects with links
- GitHub URL
- More detailed project screenshots or demos
- Any exact wording preferred for the hero, awards, and contact sections
