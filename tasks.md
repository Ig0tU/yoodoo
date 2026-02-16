Ascii visualized directory stack for a fully integrated joomla/yootheme based plugin, 100% ready and formatted for flawless install. It should use local ai providers, grok free, open openrouter free, and ollama cloud ( docs.ollama.com/cloud ) ; should operate like replit code assistent / dev agent / builder agent ; 

Project: <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>YOOtheme Builder Agent</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/php.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/twig.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/json.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/css.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/javascript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/xml.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/yaml.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/less.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.0/marked.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
:root {
  --bg-primary: #0a0e17;
  --bg-secondary: #0f1520;
  --bg-tertiary: #151d2e;
  --bg-elevated: #1a2436;
  --bg-hover: #1e2a40;
  --bg-active: #243350;
  --border: #1e2d44;
  --border-bright: #2a3f5f;
  --text-primary: #e2e8f0;
  --text-secondary: #8b9dc3;
  --text-muted: #5a6e8a;
  --accent: #3b82f6;
  --accent-hover: #60a5fa;
  --accent-dim: #1e3a5f;
  --accent-glow: rgba(59, 130, 246, 0.15);
  --yoo-blue: #2563eb;
  --yoo-cyan: #06b6d4;
  --yoo-purple: #7c3aed;
  --success: #22c55e;
  --error: #ef4444;
  --warning: #f59e0b;
  --code-bg: #0d1117;
  --sidebar-w: 380px;
  --topbar-h: 48px;
  --radius: 8px;
  --radius-lg: 12px;
  --transition: 180ms ease;
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.4);
  --font-ui: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-heading: 'Sora', sans-serif;
}

html.dark {
  color-scheme: dark;
}

html:not(.dark) {
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f1f5f9;
  --bg-elevated: #e8edf4;
  --bg-hover: #e2e8f0;
  --bg-active: #dbeafe;
  --border: #d1d9e6;
  --border-bright: #bbc5d6;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --accent-dim: #dbeafe;
  --accent-glow: rgba(59, 130, 246, 0.08);
  --code-bg: #f6f8fa;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: var(--font-ui);
  background: var(--bg-primary);
  color: var(--text-primary);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ─── LAYOUT ─── */
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.topbar {
  height: var(--topbar-h);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  flex-shrink: 0;
  z-index: 100;
}

.topbar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 15px;
  color: var(--text-primary);
  user-select: none;
}

.topbar-logo .logo-icon {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, var(--yoo-blue), var(--yoo-cyan));
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);
}

.topbar-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 4px;
  background: var(--accent-dim);
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: var(--font-mono);
}

.topbar-spacer { flex: 1; }

.topbar-actions {
  display: flex;
  gap: 4px;
  align-items: center;
}

.topbar-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  width: 34px;
  height: 34px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all var(--transition);
}
.topbar-btn:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.topbar-btn.active {
  background: var(--accent-dim);
  color: var(--accent);
}

.main-area {
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
}

/* ─── CHAT PANEL ─── */
.chat-panel {
  width: var(--sidebar-w);
  min-width: 320px;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  position: relative;
  z-index: 10;
}

.chat-header {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-header-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--yoo-blue), var(--yoo-purple));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
  flex-shrink: 0;
}

.chat-header-text h3 {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}
.chat-header-text span {
  font-size: 11px;
  color: var(--text-muted);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  scroll-behavior: smooth;
}

.chat-messages::-webkit-scrollbar { width: 5px; }
.chat-messages::-webkit-scrollbar-track { background: transparent; }
.chat-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

.message {
  display: flex;
  gap: 10px;
  animation: msgIn 0.3s ease;
}

@keyframes msgIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
  margin-top: 2px;
}

.message.agent .message-avatar {
  background: linear-gradient(135deg, var(--yoo-blue), var(--yoo-cyan));
  color: #fff;
}

.message.user .message-avatar {
  background: var(--bg-elevated);
  color: var(--text-secondary);
}

.message-body {
  flex: 1;
  min-width: 0;
}

.message-sender {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-family: var(--font-mono);
}

.message-content {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-primary);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.message-content p { margin-bottom: 8px; }
.message-content p:last-child { margin-bottom: 0; }
.message-content code {
  font-family: var(--font-mono);
  font-size: 12.5px;
  background: var(--bg-tertiary);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--accent-hover);
}
.message-content pre {
  background: var(--code-bg);
  border-radius: var(--radius);
  padding: 12px;
  margin: 8px 0;
  overflow-x: auto;
  border: 1px solid var(--border);
}
.message-content pre code {
  background: none;
  padding: 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-primary);
}
.message-content ul, .message-content ol {
  padding-left: 20px;
  margin-bottom: 8px;
}
.message-content li { margin-bottom: 4px; }
.message-content strong { color: var(--text-primary); font-weight: 600; }
.message-content h1, .message-content h2, .message-content h3, .message-content h4 {
  font-family: var(--font-heading);
  margin: 12px 0 6px;
  color: var(--text-primary);
}
.message-content h3 { font-size: 14px; }
.message-content h4 { font-size: 13px; }

.typing-indicator {
  display: flex;
  gap: 5px;
  padding: 8px 0;
}
.typing-indicator span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  animation: blink 1.4s infinite;
}
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0%, 80%, 100% { opacity: 0.25; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
}

/* Chat input */
.chat-input-area {
  padding: 12px 16px;
  border-top: 1px solid var(--border);
  background: var(--bg-secondary);
}

.chat-input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 8px 12px;
  transition: border-color var(--transition);
}
.chat-input-wrapper:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.chat-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  resize: none;
  min-height: 24px;
  max-height: 140px;
  line-height: 1.5;
  padding: 2px 0;
}
.chat-input::placeholder { color: var(--text-muted); }

.send-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, var(--yoo-blue), var(--yoo-cyan));
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
  transition: all var(--transition);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}
.send-btn:hover { transform: scale(1.05); }
.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.chat-hint {
  text-align: center;
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 8px;
}

/* ─── EDITOR PANEL ─── */
.editor-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  min-width: 0;
}

.editor-topbar {
  display: flex;
  align-items: center;
  height: 40px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  padding: 0 12px;
  gap: 4px;
  overflow-x: auto;
  flex-shrink: 0;
}

.editor-topbar::-webkit-scrollbar { height: 0; }

.file-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-size: 12px;
  font-family: var(--font-mono);
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 6px;
  white-space: nowrap;
  transition: all var(--transition);
  border: none;
  background: none;
  user-select: none;
}
.file-tab:hover {
  color: var(--text-secondary);
  background: var(--bg-hover);
}
.file-tab.active {
  color: var(--text-primary);
  background: var(--bg-active);
}
.file-tab .tab-icon {
  font-size: 11px;
  opacity: 0.7;
}
.file-tab .tab-close {
  font-size: 10px;
  opacity: 0;
  margin-left: 4px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  transition: all var(--transition);
}
.file-tab:hover .tab-close { opacity: 0.6; }
.file-tab .tab-close:hover {
  opacity: 1;
  background: var(--bg-elevated);
}

.editor-topbar-spacer { flex: 1; }

.editor-action-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all var(--transition);
}
.editor-action-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.editor-body {
  flex: 1;
  overflow: auto;
  position: relative;
}

.code-container {
  padding: 16px;
  min-height: 100%;
}

.code-container pre {
  margin: 0;
  background: transparent !important;
  padding: 0;
  border: none;
}

.code-container code {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  tab-size: 2;
}

.line-numbers {
  display: flex;
}

.line-numbers .line-num-col {
  color: var(--text-muted);
  text-align: right;
  padding-right: 20px;
  user-select: none;
  opacity: 0.5;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  min-width: 40px;
}

.line-numbers .line-code-col {
  flex: 1;
  min-width: 0;
  overflow-x: auto;
}

/* Welcome state */
.welcome-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px;
  text-align: center;
}

.welcome-icon {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--yoo-blue), var(--yoo-purple));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #fff;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.25);
  animation: floatIn 0.6s ease;
}

@keyframes floatIn {
  from { opacity: 0; transform: translateY(20px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.welcome-title {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.welcome-desc {
  font-size: 14px;
  color: var(--text-secondary);
  max-width: 440px;
  line-height: 1.6;
  margin-bottom: 32px;
}

.welcome-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  width: 100%;
  max-width: 560px;
}

.welcome-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px;
  text-align: left;
  cursor: pointer;
  transition: all var(--transition);
}
.welcome-card:hover {
  border-color: var(--accent);
  background: var(--bg-hover);
  box-shadow: 0 4px 16px var(--accent-glow);
  transform: translateY(-2px);
}

.welcome-card-icon {
  font-size: 18px;
  margin-bottom: 8px;
}

.welcome-card h4 {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  font-family: var(--font-heading);
}

.welcome-card p {
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.4;
}

/* File tree sidebar */
.file-tree {
  width: 200px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.file-tree-header {
  padding: 10px 14px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.file-tree-list {
  flex: 1;
  overflow-y: auto;
  padding: 6px;
}

.file-tree-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 6px;
  transition: all var(--transition);
  user-select: none;
}
.file-tree-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
.file-tree-item.active {
  background: var(--accent-dim);
  color: var(--accent);
}
.file-tree-item .ft-icon {
  font-size: 11px;
  width: 16px;
  text-align: center;
}
.file-tree-item .ft-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Empty state for file tree */
.file-tree-empty {
  padding: 20px 14px;
  text-align: center;
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.5;
}

/* Status bar */
.status-bar {
  height: 26px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 14px;
  gap: 16px;
  flex-shrink: 0;
}

.status-item {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 5px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.4);
}

.status-dot.busy {
  background: var(--warning);
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.4);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* ─── RESIZE HANDLE ─── */
.resize-handle {
  width: 5px;
  cursor: col-resize;
  background: transparent;
  position: relative;
  z-index: 20;
  flex-shrink: 0;
  transition: background var(--transition);
}
.resize-handle:hover, .resize-handle.active {
  background: var(--accent);
}

/* ─── TOAST / NOTIFICATION ─── */
.toast-container {
  position: fixed;
  top: 60px;
  right: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toast {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 10px 16px;
  font-size: 13px;
  color: var(--text-primary);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: 8px;
  animation: toastIn 0.3s ease, toastOut 0.3s ease 2.7s forwards;
  max-width: 300px;
}

@keyframes toastIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes toastOut {
  to { opacity: 0; transform: translateX(20px); }
}

.toast.success { border-left: 3px solid var(--success); }
.toast.error { border-left: 3px solid var(--error); }
.toast.info { border-left: 3px solid var(--accent); }

/* ─── CUSTOM MODAL ─── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-box {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: var(--shadow-lg);
  animation: modalIn 0.25s ease;
}

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.modal-title {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.modal-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.modal-btn {
  padding: 8px 18px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 13px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: all var(--transition);
}
.modal-btn:hover { background: var(--bg-hover); }
.modal-btn.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.modal-btn.primary:hover { background: var(--accent-hover); }
.modal-btn.danger {
  background: var(--error);
  border-color: var(--error);
  color: #fff;
}

/* ─── MOBILE RESPONSIVE ─── */
.mobile-nav {
  display: none;
  height: 44px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  padding: 0 8px;
  gap: 4px;
  align-items: center;
}

.mobile-nav-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  border: none;
  background: none;
  color: var(--text-muted);
  font-size: 12px;
  font-family: var(--font-ui);
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: all var(--transition);
}
.mobile-nav-btn.active {
  color: var(--accent);
  background: var(--accent-dim);
}

@media (max-width: 768px) {
  .mobile-nav { display: flex; }
  .chat-panel {
    position: absolute;
    inset: 0;
    width: 100% !important;
    max-width: 100%;
    z-index: 50;
    display: none;
  }
  .chat-panel.mobile-show { display: flex; }
  .file-tree {
    position: absolute;
    inset: 0;
    width: 100% !important;
    z-index: 45;
    display: none;
  }
  .file-tree.mobile-show { display: flex; }
  .editor-panel {
    position: absolute;
    inset: 0;
    display: none;
  }
  .editor-panel.mobile-show { display: flex; }
  .resize-handle { display: none; }
  .main-area { position: relative; }
}

/* ─── SCROLLBAR ─── */
.editor-body::-webkit-scrollbar { width: 8px; height: 8px; }
.editor-body::-webkit-scrollbar-track { background: transparent; }
.editor-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
.editor-body::-webkit-scrollbar-corner { background: transparent; }

/* ─── HIGHLIGHT OVERRIDES ─── */
.hljs { background: transparent !important; }

/* Context action badges */
.context-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-family: var(--font-mono);
  font-weight: 500;
  margin: 2px 2px 2px 0;
}
.context-badge.file {
  background: var(--accent-dim);
  color: var(--accent);
  cursor: pointer;
}
.context-badge.file:hover { opacity: 0.8; }
.context-badge.action {
  background: rgba(124, 58, 237, 0.12);
  color: var(--yoo-purple);
}

/* ─── ONBOARDING CHAT MSG ─── */
.onboard-list {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}
.onboard-list li {
  padding: 6px 0;
  font-size: 13px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.onboard-list li::before {
  content: '▸';
  color: var(--accent);
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 1px;
}
</style>
</head>
<body>
<div class="toast-container" id="toastContainer"></div>

<div class="app-shell">
  <!-- Top Bar -->
  <div class="topbar">
    <div class="topbar-logo">
      <div class="logo-icon"><i class="fa-solid fa-cube"></i></div>
      <span>YOOtheme Agent</span>
    </div>
    <span class="topbar-badge">Builder</span>
    <div class="topbar-spacer"></div>
    <div class="topbar-actions">
      <button class="topbar-btn" id="btnNewSession" title="New Session"><i class="fa-solid fa-plus"></i></button>
      <button class="topbar-btn" id="btnToggleTree" title="Toggle Files"><i class="fa-solid fa-folder-tree"></i></button>
      <button class="topbar-btn" id="btnDownloadAll" title="Download All"><i class="fa-solid fa-download"></i></button>
    </div>
  </div>

  <!-- Mobile Nav -->
  <div class="mobile-nav">
    <button class="mobile-nav-btn active" data-panel="chat" id="mobileChat">
      <i class="fa-solid fa-comments"></i> Chat
    </button>
    <button class="mobile-nav-btn" data-panel="files" id="mobileFiles">
      <i class="fa-solid fa-folder"></i> Files
    </button>
    <button class="mobile-nav-btn" data-panel="editor" id="mobileEditor">
      <i class="fa-solid fa-code"></i> Editor
    </button>
  </div>

  <!-- Main Area -->
  <div class="main-area">
    <!-- Chat Panel -->
    <div class="chat-panel mobile-show" id="chatPanel">
      <div class="chat-header">
        <div class="chat-header-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
        <div class="chat-header-text">
          <h3>Builder Agent</h3>
          <span>YOOtheme Pro &bull; Custom Elements &bull; Layouts</span>
        </div>
      </div>
      <div class="chat-messages" id="chatMessages"></div>
      <div class="chat-input-area">
        <div class="chat-input-wrapper">
          <textarea class="chat-input" id="chatInput" placeholder="Describe what you want to build..." rows="1"></textarea>
          <button class="send-btn" id="sendBtn"><i class="fa-solid fa-arrow-up"></i></button>
        </div>
        <div class="chat-hint">Press Enter to send &bull; Shift+Enter for new line</div>
      </div>
    </div>

    <!-- Resize Handle -->
    <div class="resize-handle" id="resizeHandle"></div>

    <!-- File Tree -->
    <div class="file-tree" id="fileTree" style="display:none;">
      <div class="file-tree-header">
        <span>Explorer</span>
      </div>
      <div class="file-tree-list" id="fileTreeList">
        <div class="file-tree-empty">
          <i class="fa-solid fa-folder-open" style="font-size:20px;display:block;margin-bottom:8px;"></i>
          Files generated by the agent will appear here
        </div>
      </div>
    </div>

    <!-- Editor Panel -->
    <div class="editor-panel mobile-show" id="editorPanel">
      <div class="editor-topbar" id="editorTabs"></div>
      <div class="editor-body" id="editorBody">
        <div class="welcome-state" id="welcomeState">
          <div class="welcome-icon"><i class="fa-solid fa-cube"></i></div>
          <div class="welcome-title">YOOtheme Builder Agent</div>
          <div class="welcome-desc">
            Describe what you want to build and I'll generate production-ready YOOtheme Pro code — custom elements, layouts, templates, and more.
          </div>
          <div class="welcome-cards">
            <div class="welcome-card" data-prompt="Create a custom YOOtheme element for a pricing table with toggle between monthly/yearly">
              <div class="welcome-card-icon">💰</div>
              <h4>Pricing Table</h4>
              <p>Custom element with monthly/yearly toggle</p>
            </div>
            <div class="welcome-card" data-prompt="Build a YOOtheme Pro hero section with parallax background, animated text, and CTA buttons">
              <div class="welcome-card-icon">🎨</div>
              <h4>Hero Section</h4>
              <p>Parallax hero with animated headline</p>
            </div>
            <div class="welcome-card" data-prompt="Create a YOOtheme custom source for fetching and displaying WooCommerce products with filtering">
              <div class="welcome-card-icon">🛒</div>
              <h4>WooCommerce Source</h4>
              <p>Custom source for product listings</p>
            </div>
            <div class="welcome-card" data-prompt="Generate a complete YOOtheme child theme with custom LESS variables, overrides, and a modular structure">
              <div class="welcome-card-icon">⚙️</div>
              <h4>Child Theme</h4>
              <p>Full child theme boilerplate</p>
            </div>
            <div class="welcome-card" data-prompt="Create a dynamic YOOtheme element that fetches posts from a custom REST API endpoint and displays them in a masonry grid">
              <div class="welcome-card-icon">📡</div>
              <h4>REST API Grid</h4>
              <p>Dynamic content from API endpoint</p>
            </div>
            <div class="welcome-card" data-prompt="Build a YOOtheme Pro multi-step form element with validation, progress bar, and conditional fields">
              <div class="welcome-card-icon">📝</div>
              <h4>Multi-Step Form</h4>
              <p>Complex form with validation logic</p>
            </div>
          </div>
        </div>
        <div class="code-container" id="codeContainer" style="display:none;"></div>
      </div>
      <div class="status-bar">
        <div class="status-item">
          <div class="status-dot" id="statusDot"></div>
          <span id="statusText">Ready</span>
        </div>
        <div class="status-item" id="langIndicator" style="display:none;">
          <i class="fa-solid fa-code" style="font-size:10px;"></i>
          <span id="langText">PHP</span>
        </div>
        <div style="flex:1;"></div>
        <div class="status-item" id="lineCount" style="display:none;">
          <span id="lineCountText">0 lines</span>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
/* ═══════════════════════════════════════════════════
   YOOtheme Builder Agent
   ═══════════════════════════════════════════════════ */

// ─── Dark mode detection ───
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  if (event.matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

// ─── State ───
const state = {
  files: {},           // { filename: { content, lang, icon } }
  activeFile: null,
  messages: [],
  isGenerating: false,
  fileTreeVisible: false,
  mobilePanel: 'chat',
};

// ─── System Prompt ───
const SYSTEM_PROMPT = `You are YOOtheme Builder Agent — an elite, specialized AI assistant exclusively focused on YOOtheme Pro development. You operate like a senior YOOtheme developer with deep expertise in:

CORE EXPERTISE:
- YOOtheme Pro Page Builder: elements, layouts, sections, rows, columns, and all builder configurations
- Custom Elements: PHP element definitions (element.php), Twig templates, LESS/CSS styling, and element.json manifests
- Custom Sources: Creating custom content sources, dynamic content providers, and source types
- Theme Development: Child themes, custom LESS variables, template overrides, module positions
- WordPress & Joomla Integration: Theme hooks, filters, custom post types, Joomla modules
- UIkit 3 Framework: All UIkit components, utilities, and LESS customization within YOOtheme context
- Builder JSON: Layout configurations, element schemas, and builder data structures

RESPONSE FORMAT:
1. When generating code, ALWAYS wrap each file in a clearly labeled code block with the filename as a comment on the first line
2. Use this exact format for file output:
   \`\`\`php
   // filename: element.php
   ... code here ...
   \`\`\`

   \`\`\`twig
   {# filename: template.html.twig #}
   ... code here ...
   \`\`\`

   \`\`\`json
   // filename: element.json
   ... code here ...
   \`\`\`

   \`\`\`less
   // filename: style.less
   ... code here ...
   \`\`\`

3. Provide clear explanations before and after code blocks
4. Structure multi-file outputs in logical order (config → PHP → template → styles)
5. Include installation/integration instructions when relevant

GUIDELINES:
- Always use current YOOtheme Pro 4.x conventions and API
- Follow WordPress/Joomla coding standards as appropriate
- Include proper namespacing and autoloading when needed
- Add meaningful comments in code
- Consider responsive design and UIkit utilities
- Handle edge cases and provide fallback behavior
- If a request is ambiguous, ask clarifying questions
- Provide complete, production-ready code — not snippets or pseudocode

You are an AGENT, not a chatbot. Think step-by-step, plan the file structure, then generate complete implementations.`;

// ─── DOM References ───
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const editorTabs = document.getElementById('editorTabs');
const editorBody = document.getElementById('editorBody');
const welcomeState = document.getElementById('welcomeState');
const codeContainer = document.getElementById('codeContainer');
const fileTreeEl = document.getElementById('fileTree');
const fileTreeList = document.getElementById('fileTreeList');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const langIndicator = document.getElementById('langIndicator');
const langText = document.getElementById('langText');
const lineCount = document.getElementById('lineCount');
const lineCountText = document.getElementById('lineCountText');
const toastContainer = document.getElementById('toastContainer');

// ─── Marked Configuration ───
marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }
});

// ─── Utilities ───
function showToast(message, type) {
  type = type || 'info';
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  toast.innerHTML = '<i class="fa-solid ' + (icons[type] || icons.info) + '"></i> ' + message;
  toastContainer.appendChild(toast);
  setTimeout(function() { if (toast.parentNode) toast.remove(); }, 3000);
}

function getFileIcon(filename) {
  var ext = filename.split('.').pop().toLowerCase();
  var icons = {
    php: 'fa-brands fa-php',
    twig: 'fa-solid fa-leaf',
    json: 'fa-solid fa-brackets-curly',
    less: 'fa-solid fa-palette',
    css: 'fa-solid fa-palette',
    js: 'fa-brands fa-js',
    html: 'fa-solid fa-code',
    yaml: 'fa-solid fa-file-lines',
    yml: 'fa-solid fa-file-lines',
    xml: 'fa-solid fa-file-code',
  };
  return icons[ext] || 'fa-solid fa-file';
}

function getFileLang(filename) {
  var ext = filename.split('.').pop().toLowerCase();
  if (filename.endsWith('.html.twig')) return 'twig';
  var langs = {
    php: 'php', twig: 'twig', json: 'json', less: 'less', css: 'css',
    js: 'javascript', html: 'xml', yaml: 'yaml', yml: 'yaml', xml: 'xml',
  };
  return langs[ext] || 'plaintext';
}

function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ─── File Extraction from Markdown ───
function extractFiles(markdownContent) {
  var files = {};
  var codeBlockRegex = /```(\w+)\s*\n\s*(?:\/\/|{#|<!--|#)\s*filename:\s*([^\n}#>-]+?)(?:\s*#}|\s*-->|\s*)?\n([\s\S]*?)```/g;
  var match;
  while ((match = codeBlockRegex.exec(markdownContent)) !== null) {
    var lang = match[1].trim();
    var filename = match[2].trim();
    var code = match[3].trim();
    files[filename] = {
      content: code,
      lang: lang,
      icon: getFileIcon(filename),
    };
  }
  return files;
}

// ─── Render Functions ───
function addMessage(role, content, isStreaming) {
  var msg = { role: role, content: content };
  if (!isStreaming) {
    state.messages.push(msg);
  }
  renderMessages(isStreaming ? content : null, role);
}

function renderMessages(streamContent, streamRole) {
  var html = '';
  state.messages.forEach(function(msg) {
    html += buildMessageHtml(msg.role, msg.content);
  });
  if (streamContent && streamRole) {
    html += buildMessageHtml(streamRole, streamContent);
  }
  chatMessages.innerHTML = html;
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function buildMessageHtml(role, content) {
  var isAgent = role === 'agent';
  var avatarIcon = isAgent ? '<i class="fa-solid fa-cube"></i>' : '<i class="fa-solid fa-user"></i>';
  var senderName = isAgent ? 'YOO Agent' : 'You';
  var rendered = isAgent ? marked.parse(content) : '<p>' + escapeHtml(content) + '</p>';

  return '<div class="message ' + role + '">' +
    '<div class="message-avatar">' + avatarIcon + '</div>' +
    '<div class="message-body">' +
      '<div class="message-sender">' + senderName + '</div>' +
      '<div class="message-content">' + rendered + '</div>' +
    '</div>' +
  '</div>';
}

function showTypingIndicator() {
  var el = document.createElement('div');
  el.className = 'message agent';
  el.id = 'typingMsg';
  el.innerHTML = '<div class="message-avatar"><i class="fa-solid fa-cube"></i></div>' +
    '<div class="message-body">' +
      '<div class="message-sender">YOO Agent</div>' +
      '<div class="typing-indicator"><span></span><span></span><span></span></div>' +
    '</div>';
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  var el = document.getElementById('typingMsg');
  if (el) el.remove();
}

function renderFileTabs() {
  var fileNames = Object.keys(state.files);
  if (fileNames.length === 0) {
    editorTabs.innerHTML = '';
    return;
  }
  var html = '';
  fileNames.forEach(function(name) {
    var isActive = name === state.activeFile;
    var file = state.files[name];
    html += '<button class="file-tab' + (isActive ? ' active' : '') + '" data-file="' + escapeHtml(name) + '">' +
      '<span class="tab-icon"><i class="' + (file.icon || 'fa-solid fa-file') + '"></i></span>' +
      '<span>' + escapeHtml(name) + '</span>' +
      '<span class="tab-close" data-close="' + escapeHtml(name) + '"><i class="fa-solid fa-xmark"></i></span>' +
    '</button>';
  });
  html += '<div class="editor-topbar-spacer"></div>';
  html += '<button class="editor-action-btn" id="btnCopyCode" title="Copy code"><i class="fa-solid fa-copy"></i></button>';
  html += '<button class="editor-action-btn" id="btnDownloadFile" title="Download file"><i class="fa-solid fa-download"></i></button>';
  editorTabs.innerHTML = html;

  // Tab click handlers
  editorTabs.querySelectorAll('.file-tab').forEach(function(tab) {
    tab.addEventListener('click', function(e) {
      if (e.target.closest('.tab-close')) return;
      openFile(tab.dataset.file);
    });
  });

  // Close handlers
  editorTabs.querySelectorAll('.tab-close').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeFile(btn.dataset.close);
    });
  });

  // Copy
  var copyBtn = document.getElementById('btnCopyCode');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      if (state.activeFile && state.files[state.activeFile]) {
        navigator.clipboard.writeText(state.files[state.activeFile].content).then(function() {
          showToast('Copied to clipboard', 'success');
        });
      }
    });
  }

  // Download
  var dlBtn = document.getElementById('btnDownloadFile');
  if (dlBtn) {
    dlBtn.addEventListener('click', function() {
      if (state.activeFile && state.files[state.activeFile]) {
        downloadFile(state.activeFile, state.files[state.activeFile].content);
      }
    });
  }
}

function renderFileTree() {
  var fileNames = Object.keys(state.files);
  if (fileNames.length === 0) {
    fileTreeList.innerHTML = '<div class="file-tree-empty">' +
      '<i class="fa-solid fa-folder-open" style="font-size:20px;display:block;margin-bottom:8px;"></i>' +
      'Files generated by the agent will appear here</div>';
    return;
  }
  var html = '';
  fileNames.forEach(function(name) {
    var file = state.files[name];
    var isActive = name === state.activeFile;
    html += '<div class="file-tree-item' + (isActive ? ' active' : '') + '" data-file="' + escapeHtml(name) + '">' +
      '<span class="ft-icon"><i class="' + (file.icon || 'fa-solid fa-file') + '"></i></span>' +
      '<span class="ft-name">' + escapeHtml(name) + '</span>' +
    '</div>';
  });
  fileTreeList.innerHTML = html;

  fileTreeList.querySelectorAll('.file-tree-item').forEach(function(item) {
    item.addEventListener('click', function() {
      openFile(item.dataset.file);
    });
  });
}

function openFile(filename) {
  if (!state.files[filename]) return;
  state.activeFile = filename;
  welcomeState.style.display = 'none';
  codeContainer.style.display = 'block';
  renderCode(filename);
  renderFileTabs();
  renderFileTree();
  updateStatusBar();

  // Mobile: switch to editor
  if (window.innerWidth <= 768) {
    switchMobilePanel('editor');
  }
}

function closeFile(filename) {
  var fileNames = Object.keys(state.files);
  var idx = fileNames.indexOf(filename);
  delete state.files[filename];
  var remaining = Object.keys(state.files);
  if (remaining.length > 0) {
    state.activeFile = remaining[Math.min(idx, remaining.length - 1)];
    openFile(state.activeFile);
  } else {
    state.activeFile = null;
    welcomeState.style.display = 'flex';
    codeContainer.style.display = 'none';
    editorTabs.innerHTML = '';
    langIndicator.style.display = 'none';
    lineCount.style.display = 'none';
  }
  renderFileTree();
}

function renderCode(filename) {
  var file = state.files[filename];
  if (!file) return;

  var lines = file.content.split('\n');
  var highlighted;
  try {
    highlighted = hljs.highlight(file.content, { language: file.lang || 'plaintext' }).value;
  } catch (e) {
    highlighted = escapeHtml(file.content);
  }

  var numHtml = '';
  for (var i = 1; i <= lines.length; i++) {
    numHtml += i + '\n';
  }

  codeContainer.innerHTML = '<div class="line-numbers">' +
    '<pre class="line-num-col"><code>' + numHtml + '</code></pre>' +
    '<pre class="line-code-col"><code class="hljs">' + highlighted + '</code></pre>' +
  '</div>';
}

function updateStatusBar() {
  if (state.activeFile && state.files[state.activeFile]) {
    var file = state.files[state.activeFile];
    var lines = file.content.split('\n').length;
    langIndicator.style.display = 'flex';
    langText.textContent = (file.lang || 'text').toUpperCase();
    lineCount.style.display = 'flex';
    lineCountText.textContent = lines + ' lines';
  }
}

function setStatus(text, busy) {
  statusText.textContent = text;
  if (busy) {
    statusDot.classList.add('busy');
  } else {
    statusDot.classList.remove('busy');
  }
}

function downloadFile(filename, content) {
  var blob = new Blob([content], { type: 'text/plain' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Downloaded ' + filename, 'success');
}

// ─── Chat Logic ───
function sendMessage(text) {
  if (!text.trim() || state.isGenerating) return;
  state.isGenerating = true;
  sendBtn.disabled = true;
  setStatus('Generating...', true);

  addMessage('user', text.trim());
  chatInput.value = '';
  chatInput.style.height = 'auto';
  showTypingIndicator();

  var fullPrompt = SYSTEM_PROMPT + '\n\nUser request:\n' + text.trim();
  var streamedContent = '';

  window.Poe.registerHandler('yoo-builder-handler', function(result) {
    var msg = result.responses[0];
    if (!msg) return;

    removeTypingIndicator();

    if (msg.status === 'error') {
      state.isGenerating = false;
      sendBtn.disabled = false;
      setStatus('Error', false);
      addMessage('agent', '⚠️ **Error:** ' + (msg.statusText || 'Something went wrong. Please try again.'));
      return;
    }

    if (msg.status === 'incomplete') {
      streamedContent = msg.content;
      renderMessages(streamedContent, 'agent');
      return;
    }

    if (msg.status === 'complete') {
      streamedContent = msg.content;
      state.messages.push({ role: 'agent', content: streamedContent });
      renderMessages();

      // Extract files
      var extracted = extractFiles(streamedContent);
      var fileNames = Object.keys(extracted);
      if (fileNames.length > 0) {
        fileNames.forEach(function(name) {
          state.files[name] = extracted[name];
        });
        var firstNew = fileNames[0];
        openFile(state.activeFile || firstNew);
        renderFileTabs();
        renderFileTree();
        showToast(fileNames.length + ' file(s) generated', 'success');

        // Show file tree if hidden and desktop
        if (window.innerWidth > 768 && !state.fileTreeVisible) {
          state.fileTreeVisible = true;
          fileTreeEl.style.display = 'flex';
        }
      }

      state.isGenerating = false;
      sendBtn.disabled = false;
      setStatus('Ready', false);
    }
  });

  window.Poe.sendUserMessage('@Claude-Sonnet-4.5 ' + fullPrompt, {
    handler: 'yoo-builder-handler',
    stream: true,
    openChat: false,
    parameters: { thinking_budget: 16000 }
  }).catch(function(err) {
    removeTypingIndicator();
    state.isGenerating = false;
    sendBtn.disabled = false;
    setStatus('Error', false);
    addMessage('agent', '⚠️ **Error:** ' + (err.message || 'Failed to send message. Please try again.'));
  });
}

// ─── Event Listeners ───
sendBtn.addEventListener('click', function() {
  sendMessage(chatInput.value);
});

chatInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage(chatInput.value);
  }
});

// Auto-resize textarea
chatInput.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 140) + 'px';
});

// Welcome cards
document.querySelectorAll('.welcome-card').forEach(function(card) {
  card.addEventListener('click', function() {
    var prompt = card.dataset.prompt;
    if (prompt) {
      chatInput.value = prompt;
      sendMessage(prompt);
      if (window.innerWidth <= 768) {
        switchMobilePanel('chat');
      }
    }
  });
});

// New session
document.getElementById('btnNewSession').addEventListener('click', function() {
  showConfirmDialog('Start a new session?', 'This will clear all messages and generated files.', function() {
    state.files = {};
    state.activeFile = null;
    state.messages = [];
    state.isGenerating = false;
    sendBtn.disabled = false;
    chatMessages.innerHTML = '';
    editorTabs.innerHTML = '';
    codeContainer.style.display = 'none';
    welcomeState.style.display = 'flex';
    langIndicator.style.display = 'none';
    lineCount.style.display = 'none';
    setStatus('Ready', false);
    renderFileTree();
    addOnboardingMessage();
    showToast('Session cleared', 'info');
  });
});

// Toggle file tree
document.getElementById('btnToggleTree').addEventListener('click', function() {
  state.fileTreeVisible = !state.fileTreeVisible;
  fileTreeEl.style.display = state.fileTreeVisible ? 'flex' : 'none';
});

// Download all
document.getElementById('btnDownloadAll').addEventListener('click', function() {
  var fileNames = Object.keys(state.files);
  if (fileNames.length === 0) {
    showToast('No files to download', 'info');
    return;
  }
  fileNames.forEach(function(name) {
    downloadFile(name, state.files[name].content);
  });
});

// Resize handle
(function() {
  var handle = document.getElementById('resizeHandle');
  var chatPanel = document.getElementById('chatPanel');
  var dragging = false;

  handle.addEventListener('mousedown', function(e) {
    dragging = true;
    handle.classList.add('active');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    var newWidth = e.clientX;
    if (newWidth < 280) newWidth = 280;
    if (newWidth > 600) newWidth = 600;
    chatPanel.style.width = newWidth + 'px';
  });

  document.addEventListener('mouseup', function() {
    if (dragging) {
      dragging = false;
      handle.classList.remove('active');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });
})();

// Mobile panel switching
function switchMobilePanel(panel) {
  state.mobilePanel = panel;
  var chatP = document.getElementById('chatPanel');
  var fileT = document.getElementById('fileTree');
  var editorP = document.getElementById('editorPanel');

  chatP.classList.remove('mobile-show');
  fileT.classList.remove('mobile-show');
  editorP.classList.remove('mobile-show');

  document.querySelectorAll('.mobile-nav-btn').forEach(function(b) { b.classList.remove('active'); });

  if (panel === 'chat') {
    chatP.classList.add('mobile-show');
    document.getElementById('mobileChat').classList.add('active');
  } else if (panel === 'files') {
    fileT.classList.add('mobile-show');
    fileT.style.display = 'flex';
    document.getElementById('mobileFiles').classList.add('active');
  } else {
    editorP.classList.add('mobile-show');
    document.getElementById('mobileEditor').classList.add('active');
  }
}

document.getElementById('mobileChat').addEventListener('click', function() { switchMobilePanel('chat'); });
document.getElementById('mobileFiles').addEventListener('click', function() { switchMobilePanel('files'); });
document.getElementById('mobileEditor').addEventListener('click', function() { switchMobilePanel('editor'); });

// ─── Custom Confirm Dialog ───
function showConfirmDialog(title, text, onConfirm) {
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = '<div class="modal-box">' +
    '<div class="modal-title">' + escapeHtml(title) + '</div>' +
    '<div class="modal-text">' + escapeHtml(text) + '</div>' +
    '<div class="modal-actions">' +
      '<button class="modal-btn" id="modalCancel">Cancel</button>' +
      '<button class="modal-btn primary" id="modalConfirm">Confirm</button>' +
    '</div>' +
  '</div>';
  document.body.appendChild(overlay);

  overlay.querySelector('#modalCancel').addEventListener('click', function() { overlay.remove(); });
  overlay.querySelector('#modalConfirm').addEventListener('click', function() {
    overlay.remove();
    if (onConfirm) onConfirm();
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.remove();
  });
}

// ─── Onboarding ───
function addOnboardingMessage() {
  var content = "**Welcome to YOOtheme Builder Agent!** 👋\n\n" +
    "I'm your dedicated YOOtheme Pro development assistant. I can help you build:\n\n" +
    "- **Custom Elements** — PHP definitions, Twig templates, and JSON manifests\n" +
    "- **Page Layouts** — Builder configurations with sections, rows, and columns\n" +
    "- **Custom Sources** — Dynamic content providers and source types\n" +
    "- **Child Themes** — LESS variables, template overrides, and modular structures\n" +
    "- **UIkit Components** — Customized UIkit 3 elements within YOOtheme\n" +
    "- **WordPress/Joomla Integration** — Hooks, filters, and CMS-specific code\n\n" +
    "Try a quick start card on the right, or describe what you need below. All generated files appear in the editor panel and can be copied or downloaded.";

  addMessage('agent', content);
}

// Init
addOnboardingMessage();
</script>
</body>
</html>

I want a yootheme-exclusive builder agent inspired by replit-code-assistant/builder agent
