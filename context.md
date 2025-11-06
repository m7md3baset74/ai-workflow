Please create a complete Visual Workflow Builder for Automation using Next.js, TailwindCSS, MongoDB, and React Flow. The app should allow users to create, edit, and manage automation workflows by dragging and dropping nodes (representing triggers, actions, and conditions) and connecting them with edges. Below are the detailed requirements:

**Tech Stack**:

- **Frontend**: Next.js (v15 or later, App Router, TypeScript, src/ directory structure with pages in src/app, components in src/components, API routes in src/app/api). Use TailwindCSS (v4 or higher, configured in src/app/globals.css with @config directive) for styling. Integrate React Flow (@xyflow/react) for the workflow canvas with features like drag-and-drop nodes, zooming, panning, and plugins (Background, Minimap, Controls, NodeToolbar, NodeResizer).
- **Backend**: MongoDB for storing workflows as JSON documents (nodes, edges, metadata like workflow name, owner, last modified). Use Mongoose for schema management. Implement Next.js API routes for CRUD operations and workflow execution.
- **Authentication**: Use NextAuth.js for user authentication (email/password and Google provider). Protect routes to ensure only authenticated users can access the dashboard and workflows.

**Features**:

1. **Dashboard**: A responsive dashboard (styled with TailwindCSS) showing a list of user-created workflows with options to create, edit, or delete. Include a sidebar for node selection (triggers: webhook, schedule; actions: API call, database update; conditions: if-else, loops) and a toolbar for workflow actions (save, export as JSON, run).
2. **Workflow Canvas**: Use React Flow to render an interactive canvas where users can:
   - Drag and drop custom nodes (React components styled with TailwindCSS) for triggers, actions, and conditions.
   - Connect nodes with directed edges to define workflow logic.
   - Resize nodes using NodeResizer and view the canvas with Background (grid pattern) and Minimap.
   - Use NodeToolbar for node-specific actions (e.g., configure parameters, delete).
   - Validate workflows in real-time (e.g., ensure all nodes are connected).
3. **Workflow Management**:
   - Save workflows to MongoDB as JSON documents with nodes (type, position, configuration), edges, and metadata.
   - Allow users to export workflows as JSON or shareable links.
   - Implement a "Run" feature to execute workflows by processing the graph (e.g., trigger an API call or database update based on node configuration).
4. **Integrations**: Support third-party API integrations (e.g., Slack, Google Sheets) for action nodes. Mock these integrations with sample API calls for demo purposes.
5. **Responsive Design**: Ensure the UI is fully responsive (mobile, tablet, desktop) using TailwindCSS. Use a clean, modern design with hover effects, color-coded nodes (e.g., blue for triggers, green for actions), and smooth animations for node/edge interactions.
6. **Real-time Feedback**: Provide visual feedback (e.g., error messages, success indicators) during workflow creation and execution.

**Project Structure**:

- `src/app`: Next.js pages (e.g., `/dashboard`, `/workflow/[id]` for editing).
- `src/components`: Reusable React components (e.g., WorkflowCanvas, NodeTypes, Sidebar, Toolbar).
- `src/app/api`: API routes for workflows (e.g., `/api/workflows` for CRUD, `/api/run` for execution).
- `src/lib`: MongoDB connection, Mongoose schemas, and NextAuth.js setup.
- `src/app/globals.css`: TailwindCSS configuration with @config directive.

**Additional Requirements**:

- Use Zustand for state management (e.g., manage selected nodes, canvas state).
- Ensure SEO optimization for public pages (e.g., landing page) using Next.js metadata.
- Deployable on Vercel (no need to push .next directory).
- Follow clean code practices: modular components, type safety with TypeScript, and error handling.
- Include a sample workflow in MongoDB for demo purposes (e.g., a workflow that triggers on a schedule, checks a condition, and sends a Slack message).

**Deliverables**:

- Complete source code for the Next.js project, including frontend, backend, and MongoDB integration.
- Instructions for setting up MongoDB locally or using MongoDB Atlas.
- A sample .env.local file with necessary environment variables (e.g., MongoDB URI, NextAuth.js secrets).
- A README.md with setup and deployment instructions for Vercel.

Please generate the full project code, ensuring all features are implemented, and provide the file structure with all necessary files (e.g., pages, components, API routes, schemas). Use modern JavaScript/TypeScript syntax, TailwindCSS v4+ for styling, and ensure the app is production-ready.
