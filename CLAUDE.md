# CLAUDE.md — Project Orchestrator

## Agents

This project uses two specialized agents. Dispatch them using the Agent tool with the contents of their role file as instructions.

### Web Designer
- **Role file:** `agents/web-designer.md`
- **Trigger:** User asks to design, build, or create a website/page
- **Output:** HTML files in `site/` served at `http://localhost:3000`
- **Requires:** The `frontend-design` skill

### WordPress Developer
- **Role file:** `agents/wordpress-developer.md`
- **Trigger:** User asks to convert to WordPress, deploy to Studio, or create a WordPress theme
- **Input:** HTML files in `site/`
- **Output:** WordPress block theme deployed to a local Studio site

## Dispatching Rules

1. Read the agent's role file before dispatching — pass its full contents as the agent prompt.
2. Include the user's request and any relevant context (site description, brand requirements, etc.) in the prompt.
3. Only one agent runs at a time. Do not run both in parallel.
4. If the user asks to design AND convert in one request, run the web designer first. After it completes, run the WordPress developer.

## Handoff Protocol

The web designer produces HTML files in `site/`. The WordPress developer reads from `site/` to convert.

When handing off from web designer → WordPress developer:
- Confirm the HTML site is complete and the user is satisfied before converting.
- Pass the Studio site name/path if the user specified one, otherwise let the WordPress developer create a new site.
