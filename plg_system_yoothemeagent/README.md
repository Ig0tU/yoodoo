# YOOtheme Builder Agent Joomla Plugin

AI-powered development assistant for YOOtheme Pro.

## Directory Structure
```
plg_system_yoothemeagent/
├── yoothemeagent.xml                  # Plugin manifest
├── yoothemeagent.php                  # Main plugin entry point
├── language/                          # Translation files
│   └── en-GB/
│       ├── en-GB.plg_system_yoothemeagent.ini
│       └── en-GB.plg_system_yoothemeagent.sys.ini
└── assets/                            # Plugin assets
    ├── css/
    │   └── agent.css                  # Agent UI styling
    └── js/
        └── agent.js                   # Unified Agent logic (UI + Core + AI)
```

## Features
- Deep integration with YOOtheme Pro Customizer.
- Supports multiple AI providers:
    - Local: Ollama, LM Studio
    - Cloud: OpenRouter, Grok, Ollama Cloud
- Operates like a specialized code assistant for YOOtheme Pro (Elements, Layouts, etc.).

## Installation
1. Zip the `plg_system_yoothemeagent` folder.
2. Go to Joomla Administrator > Extensions > Manage > Install.
3. Upload the zip file.
4. Go to Extensions > Plugins and enable "System - YOOtheme Builder Agent".
5. Configure your API keys in the plugin settings.

## Invocation & Enactment

### Via User Interface
1. Once enabled, a **Wand Magic Icon** will appear at the bottom-right of your website for users with Administrator privileges.
2. Click this icon to toggle the YOOtheme Builder Agent overlay.
3. Use the chat interface to describe what you want to build.

### Programmatic Invocation (Developer Console)
You can interact with the agent via the global `SOV` object:

- **Open the Agent UI**:
  ```javascript
  SOV.interact('OPEN_AGENT');
  ```

- **Query the AI directly**:
  ```javascript
  const response = await SOV.interact('THINK', { prompt: 'Create a custom UIkit button' });
  console.log(response);
  ```

- **Observe current context**:
  ```javascript
  const state = SOV.observe();
  console.log(state);
  ```
