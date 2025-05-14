- write UML-like diagrams
- import JSON workflow files from n8n into diagrams
- run workflows tasks in background (offline with workers)
- responsive design
- owner nodes (Schedule Trigger, Set, HTTP Request, Code, "NoOp", ...)
- many APIs (Google Sheets, Telegram, ...)
---
client may create new workflows
workflows will have, at first, an "initial trigger"
"initial trigger" results datetime in JSON
client may add workflow nodes
nodes may be "owner" (already implemented functions) or "api" (http requests)
client may save workflows running them by "schedule trigger" in background (workers)
