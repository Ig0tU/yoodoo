(function() {
    'use strict';

    // --- AGENT HTML CONTENT (Injected into the root) ---
    const AGENT_HTML = `
<div id="yoo-agent-wrapper" style="display:none;">
    <div class="toast-container" id="toastContainer"></div>
    <div class="app-shell">
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
          <button class="topbar-btn" id="btnCloseAgent" title="Close Agent"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
      <div class="mobile-nav">
        <button class="mobile-nav-btn active" data-panel="chat" id="mobileChat"><i class="fa-solid fa-comments"></i> Chat</button>
        <button class="mobile-nav-btn" data-panel="files" id="mobileFiles"><i class="fa-solid fa-folder"></i> Files</button>
        <button class="mobile-nav-btn" data-panel="editor" id="mobileEditor"><i class="fa-solid fa-code"></i> Editor</button>
      </div>
      <div class="main-area">
        <div class="chat-panel mobile-show" id="chatPanel">
          <div class="chat-header">
            <div class="chat-header-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
            <div class="chat-header-text"><h3>Builder Agent</h3><span>YOOtheme Pro &bull; Custom Elements</span></div>
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
        <div class="resize-handle" id="resizeHandle"></div>
        <div class="file-tree" id="fileTree" style="display:none;">
          <div class="file-tree-header"><span>Explorer</span></div>
          <div class="file-tree-list" id="fileTreeList"><div class="file-tree-empty"><i class="fa-solid fa-folder-open"></i> Files appear here</div></div>
        </div>
        <div class="editor-panel mobile-show" id="editorPanel">
          <div class="editor-topbar" id="editorTabs"></div>
          <div class="editor-body" id="editorBody">
            <div class="welcome-state" id="welcomeState">
              <div class="welcome-icon"><i class="fa-solid fa-cube"></i></div>
              <div class="welcome-title">YOOtheme Builder Agent</div>
              <div class="welcome-desc">Generate production-ready YOOtheme Pro code.</div>
              <div class="welcome-cards">
                <div class="welcome-card" data-prompt="Create a custom YOOtheme element for a pricing table"><h4>Pricing Table</h4><p>Custom element</p></div>
                <div class="welcome-card" data-prompt="Build a YOOtheme Pro hero section"><h4>Hero Section</h4><p>Parallax hero</p></div>
              </div>
            </div>
            <div class="code-container" id="codeContainer" style="display:none;"></div>
          </div>
          <div class="status-bar">
            <div class="status-item"><div class="status-dot" id="statusDot"></div><span id="statusText">Ready</span></div>
            <div class="status-item" id="langIndicator" style="display:none;"><i class="fa-solid fa-code"></i><span id="langText">PHP</span></div>
            <div style="flex:1;"></div>
            <div class="status-item" id="lineCount" style="display:none;"><span id="lineCountText">0 lines</span></div>
          </div>
        </div>
      </div>
    </div>
</div>
<button id="yoo-agent-toggle-btn" title="Toggle YOOtheme Agent">
    <i class="fa-solid fa-wand-magic-sparkles"></i>
</button>
`;

    // --- SOV Core Logic (Adapted from ai2.js) ---
    const SOV = {
        HybridArchitect: {
            isYOOtheme() { return !!document.querySelector('.yo-customizer') || !!document.querySelector('.yo-builder'); },
            getLayoutData() {
                if (window.yooThemeBuilderData) return window.yooThemeBuilderData;
                const script = document.getElementById('yootheme-builder-data');
                if (script && script.textContent) { try { return JSON.parse(script.textContent); } catch (e) {} }
                return null;
            }
        },
        ActionExecutor: {
            async humanType(selector, text) {
                const el = (typeof selector === 'string') ? document.querySelector(selector) : selector;
                if (!el) return;
                el.focus();
                for (const char of text) {
                    if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') el.value += char;
                    else if (el.isContentEditable) el.textContent += char;
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    await new Promise(r => setTimeout(r, 20));
                }
            }
        },
        SecOpsGovernance: {
            validatePayload(input) {
                const blacklist = [/javascript:/i, /<script/i, /onload=/i];
                return !blacklist.some(regex => regex.test(input));
            }
        }
    };

    // --- AI Provider ---
    const AIProvider = {
        async sendMessage(prompt, config) {
            const provider = config.ai_provider || 'ollama';
            switch (provider) {
                case 'ollama':
                    return this.callOllama('http://localhost:11434/api/generate', prompt);
                case 'lmstudio':
                    return this.callOpenAIStyle('http://localhost:1234/v1/chat/completions', prompt);
                case 'openrouter':
                case 'grok':
                case 'ollama_cloud':
                    return this.callProxy(provider, prompt, config);
                default:
                    throw new Error('Unknown provider: ' + provider);
            }
        },
        async callOllama(url, prompt) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: 'llama3', prompt, stream: false })
            });
            const data = await response.json();
            return data.response;
        },
        async callOpenAIStyle(url, prompt) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: prompt }],
                    stream: false
                })
            });
            const data = await response.json();
            return data.choices[0].message.content;
        },
        async callProxy(provider, prompt, config) {
            const isOpenRouter = provider === 'openrouter';
            const payload = {
                provider: provider,
                body: {
                    model: isOpenRouter ? 'meta-llama/llama-3-8b-instruct:free' : 'grok-beta',
                    messages: [{ role: 'user', content: prompt }],
                    prompt: prompt, // For Ollama style
                    stream: false
                }
            };
            const response = await fetch(config.ajax_url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'payload=' + encodeURIComponent(JSON.stringify(payload))
            });
            const data = await response.json();
            if (data.data) {
                const res = data.data;
                if (res.error) throw new Error(res.error);
                return res.choices ? res.choices[0].message.content : res.response;
            }
            throw new Error('Unexpected proxy response');
        }
    };

    // --- UI State & Logic ---
    const state = {
        files: {},
        activeFile: null,
        messages: [],
        isGenerating: false,
        fileTreeVisible: false,
        mobilePanel: 'chat',
    };

    const SYSTEM_PROMPT = `You are YOOtheme Builder Agent — an elite YOOtheme Pro developer.
    ALWAYS wrap each file in a clearly labeled code block with the filename as a comment on the first line.
    Example:
    \`\`\`php
    // filename: element.php
    ... code ...
    \`\`\``;

    function initUI() {
        const root = document.getElementById('yoo-agent-root');
        if (!root) return;
        root.innerHTML = AGENT_HTML;

        const container = document.getElementById('yoo-agent-wrapper');
        const toggleBtn = document.getElementById('yoo-agent-toggle-btn');
        const closeBtn = document.getElementById('btnCloseAgent');
        const sendBtn = document.getElementById('sendBtn');
        const chatInput = document.getElementById('chatInput');

        toggleBtn.addEventListener('click', () => {
            const show = container.style.display === 'none';
            container.style.display = show ? 'block' : 'none';
        });

        closeBtn.addEventListener('click', () => container.style.display = 'none');

        sendBtn.addEventListener('click', () => handleSendMessage());
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
            }
        });

        // New Session
        document.getElementById('btnNewSession').addEventListener('click', () => {
            state.files = {};
            state.messages = [];
            state.activeFile = null;
            document.getElementById('chatMessages').innerHTML = '';
            document.getElementById('fileTreeList').innerHTML = '';
            document.getElementById('editorTabs').innerHTML = '';
            document.getElementById('codeContainer').style.display = 'none';
            document.getElementById('welcomeState').style.display = 'flex';
            addOnboardingMessage();
        });

        // Toggle Tree
        document.getElementById('btnToggleTree').addEventListener('click', () => {
            const tree = document.getElementById('fileTree');
            state.fileTreeVisible = tree.style.display === 'none';
            tree.style.display = state.fileTreeVisible ? 'flex' : 'none';
        });

        // Download All
        document.getElementById('btnDownloadAll').addEventListener('click', () => {
            Object.keys(state.files).forEach(name => {
                const blob = new Blob([state.files[name].content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = name;
                a.click();
                URL.revokeObjectURL(url);
            });
        });

        // Welcome Cards
        document.querySelectorAll('.welcome-card').forEach(card => {
            card.addEventListener('click', () => {
                chatInput.value = card.dataset.prompt;
                handleSendMessage();
            });
        });

        // Mobile Nav
        document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const panel = btn.dataset.panel;
                document.getElementById('chatPanel').classList.toggle('mobile-show', panel === 'chat');
                document.getElementById('fileTree').classList.toggle('mobile-show', panel === 'files');
                document.getElementById('editorPanel').classList.toggle('mobile-show', panel === 'editor');
            });
        });

        addOnboardingMessage();
    }

    async function handleSendMessage() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        if (!text || state.isGenerating) return;

        if (!SOV.SecOpsGovernance.validatePayload(text)) {
            addMessage('agent', '⚠️ Malicious input detected and blocked.');
            return;
        }

        state.isGenerating = true;
        setStatus('Generating...', true);
        addMessage('user', text);
        input.value = '';
        showTypingIndicator();

        try {
            const response = await AIProvider.sendMessage(SYSTEM_PROMPT + "\n\nUser: " + text, window.YOO_AGENT_CONFIG || {});
            removeTypingIndicator();

            if (!SOV.SecOpsGovernance.validatePayload(response)) {
                addMessage('agent', '⚠️ Malicious payload detected in AI response.');
                return;
            }

            addMessage('agent', response);
            processGeneratedFiles(response);
        } catch (err) {
            removeTypingIndicator();
            addMessage('agent', "Error: " + err.message);
            setStatus('Error', false);
        } finally {
            state.isGenerating = false;
            setStatus('Ready', false);
        }
    }

    function setStatus(text, busy) {
        document.getElementById('statusText').textContent = text;
        const dot = document.getElementById('statusDot');
        if (busy) dot.classList.add('busy');
        else dot.classList.remove('busy');
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
        toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i> ${message}`;
        document.getElementById('toastContainer').appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    function addMessage(role, content) {
        state.messages.push({ role, content });
        renderMessages();
    }

    function renderMessages() {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = state.messages.map(m => `
            <div class="message ${m.role}">
                <div class="message-avatar">${m.role === 'agent' ? '<i class="fa-solid fa-cube"></i>' : '<i class="fa-solid fa-user"></i>'}</div>
                <div class="message-body">
                    <div class="message-sender">${m.role === 'agent' ? 'YOO Agent' : 'You'}</div>
                    <div class="message-content">${marked.parse(m.content)}</div>
                </div>
            </div>
        `).join('');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        const div = document.createElement('div');
        div.id = 'typing-indicator';
        div.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }

    function processGeneratedFiles(content) {
        const codeBlockRegex = /```(\w+)\s*\n\s*(?:\/\/|{#|<!--|#)\s*filename:\s*([^\n}#>-]+?)(?:\s*#}|\s*-->|\s*)?\n([\s\S]*?)```/g;
        let match;
        let found = false;
        while ((match = codeBlockRegex.exec(content)) !== null) {
            const lang = match[1];
            const filename = match[2].trim();
            const code = match[3].trim();
            state.files[filename] = { content: code, lang, icon: 'fa-solid fa-file' };
            found = true;
        }
        if (found) {
            renderFileTree();
            renderFileTabs();
            // Open the first file
            const first = Object.keys(state.files)[0];
            openFile(first);
        }
    }

    function renderFileTree() {
        const treeList = document.getElementById('fileTreeList');
        if (Object.keys(state.files).length === 0) {
            treeList.innerHTML = '<div class="file-tree-empty"><i class="fa-solid fa-folder-open"></i> Files appear here</div>';
            return;
        }
        treeList.innerHTML = Object.keys(state.files).map(name => `
            <div class="file-tree-item ${state.activeFile === name ? 'active' : ''}" onclick="window.openFile('${name}')">
                <i class="fa-solid fa-file"></i> <span>${name}</span>
            </div>
        `).join('');
    }

    function renderFileTabs() {
        const tabs = document.getElementById('editorTabs');
        tabs.innerHTML = Object.keys(state.files).map(name => `
            <button class="file-tab ${state.activeFile === name ? 'active' : ''}" onclick="window.openFile('${name}')">
                <i class="fa-solid fa-file"></i> ${name}
                <span class="tab-close" onclick="event.stopPropagation(); window.closeFile('${name}')">&times;</span>
            </button>
        `).join('');
    }

    window.openFile = function(name) {
        state.activeFile = name;
        const file = state.files[name];
        if (!file) return;
        document.getElementById('welcomeState').style.display = 'none';
        const container = document.getElementById('codeContainer');
        container.style.display = 'block';
        container.innerHTML = `<pre><code class="hljs">${hljs.highlightAuto(file.content).value}</code></pre>`;
        renderFileTree();
        renderFileTabs();
        updateStatusBar();
    };

    window.closeFile = function(name) {
        delete state.files[name];
        if (state.activeFile === name) {
            state.activeFile = Object.keys(state.files)[0] || null;
        }
        if (state.activeFile) openFile(state.activeFile);
        else {
            document.getElementById('welcomeState').style.display = 'flex';
            document.getElementById('codeContainer').style.display = 'none';
            renderFileTree();
            renderFileTabs();
            updateStatusBar();
        }
    };

    function updateStatusBar() {
        if (state.activeFile && state.files[state.activeFile]) {
            const file = state.files[state.activeFile];
            document.getElementById('langIndicator').style.display = 'flex';
            document.getElementById('langText').textContent = file.lang.toUpperCase();
            document.getElementById('lineCount').style.display = 'flex';
            document.getElementById('lineCountText').textContent = file.content.split('\n').length + ' lines';
        } else {
            document.getElementById('langIndicator').style.display = 'none';
            document.getElementById('lineCount').style.display = 'none';
        }
    }

    function addOnboardingMessage() {
        addMessage('agent', "Welcome! Describe what you want to build for YOOtheme Pro.");
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUI);
    } else {
        initUI();
    }

})();
