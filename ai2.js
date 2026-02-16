// ==UserScript==
// @name         Sovereign Orchestrator: Genesis Driver
// @namespace    https://raw.githubusercontent.com/Ig0tU/hnz/main/
// @version      5.3.0-FINAL
// @description  Full Spectrum Execution: Nodes A7, D1, Q9, U8, S2e, T1 with YOOtheme Pro Integration
// @author       Sov0rc
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      localhost
// @connect      127.0.0.1
// ==/UserScript==

(function() {
    'use strict';

    // --- NODE U1 & T1: TEMPORAL CONTEXT ENGINE ---
    const TemporalContext = {
        state: {
            sessionID: Date.now(),
            history: GM_getValue('sov_history', []),
            forecast: [],
            constraints: { delayMin: 15, delayMax: 60 },
            yoothemeActive: false
        },
        log(entry) {
            const record = { ts: new Date().toISOString(), session: this.state.sessionID, ...entry };
            this.state.history.push(record);
            GM_setValue('sov_history', this.state.history.slice(-200));
            console.log(`%c[TemporalContext] Entry Logged: ${entry.action}`, "color: #ff00ff;");
        }
    };

    // --- NODE A7: HYBRID ARCHITECT (Perception Layer) ---
    const HybridArchitect = {
        isYOOtheme() {
            return !!document.querySelector('.yo-customizer');
        },

        getLayoutData() {
            if (window.yooThemeBuilderData) return window.yooThemeBuilderData;
            if (window.yootheme && window.yootheme.layout) return window.yootheme.layout;

            const script = document.getElementById('yootheme-builder-data');
            if (script && script.textContent) {
                try { return JSON.parse(script.textContent); } catch (e) {}
            }

            const allScripts = document.querySelectorAll('script[type="application/json"]');
            for (const s of allScripts) {
                if (s.textContent.includes('"type":"layout"')) {
                    try { return JSON.parse(s.textContent); } catch (e) {}
                }
            }
            return null;
        },

        buildElementTree(layoutData) {
            const root = { type: 'layout', children: [], domElement: document.querySelector('.yo-customizer') };
            const sectionElements = document.querySelectorAll('.yo-builder-section');
            if (!layoutData || !layoutData.children) return root;

            layoutData.children.forEach((sectionData, idx) => {
                const sectionEl = sectionElements[idx];
                if (!sectionEl) return;
                const sectionNode = { ...sectionData, domElement: sectionEl, children: [] };
                root.children.push(sectionNode);

                const rowElements = sectionEl.querySelectorAll('.yo-builder-grid');
                sectionData.children?.forEach((rowData, rowIdx) => {
                    const rowEl = rowElements[rowIdx];
                    if (!rowEl) return;
                    const rowNode = { ...rowData, domElement: rowEl, children: [] };
                    sectionNode.children.push(rowNode);

                    const columnElements = rowEl.querySelectorAll('.uk-grid-match > div');
                    rowData.children?.forEach((colData, colIdx) => {
                        const colEl = columnElements[colIdx];
                        if (!colEl) return;
                        const colNode = { ...colData, domElement: colEl, children: [] };
                        rowNode.children.push(colNode);

                        const elementEls = colEl.querySelectorAll('.yo-builder-element');
                        colData.children?.forEach((elData, elIdx) => {
                            const elEl = elementEls[elIdx];
                            if (!elEl) return;
                            const elNode = { ...elData, domElement: elEl };
                            colNode.children.push(elNode);
                        });
                    });
                });
            });
            return root;
        },

        resolvePath(description, layoutTree) {
            const tokens = description.split(/\s*>\s*/);
            let currentNode = layoutTree;
            for (const token of tokens) {
                const match = token.match(/^(section|row|column|headline|text|image|button)\s*(?:['"]?([^'"]+)['"]?)?(?:\s*(\d+))?$/i);
                if (!match) return null;
                const type = match[1].toLowerCase();
                const name = match[2];
                const index = parseInt(match[3]) || 1;

                if (type === 'section' && name) {
                    const section = currentNode.children.find(c => c.name && c.name.toLowerCase() === name.toLowerCase());
                    if (!section) return null;
                    currentNode = section;
                } else if (type === 'row' || type === 'column') {
                    const child = currentNode.children?.[index - 1];
                    if (!child || child.type !== type) return null;
                    currentNode = child;
                } else {
                    const elements = currentNode.children?.filter(c => c.type === type);
                    const el = elements?.[index - 1];
                    if (!el) return null;
                    currentNode = el;
                }
            }
            return currentNode;
        },

        scanDOM() {
            if (this.isYOOtheme()) {
                const data = this.getLayoutData();
                if (data) return { mode: 'YOOTHEME', hierarchy: this.buildElementTree(data) };
            }

            const selectors = 'a, button, input, select, [role="button"], [onclick], .btn, .click-target';
            const nodes = document.querySelectorAll(selectors);
            const genericNodes = Array.from(nodes).map((el, i) => ({
                idx: i,
                tag: el.tagName,
                type: el.type || 'static',
                label: el.innerText?.trim().substring(0, 30) || el.placeholder || el.ariaLabel || 'unlabeled',
                selector: this.derivePath(el),
                rect: el.getBoundingClientRect()
            })).filter(node => node.rect.width > 0);

            return { mode: 'GENERIC', nodes: genericNodes };
        },

        derivePath(el) {
            if (el.id) return `#${CSS.escape(el.id)}`;
            if (el.name) return `[name="${CSS.escape(el.name)}"]`;
            return `${el.tagName.toLowerCase()}${el.className ? '.' + Array.from(el.classList).join('.') : ''}`;
        }
    };

    // --- NODE Q9 & S8: SEC-OPS GOVERNANCE ---
    const SecOpsGovernance = {
        validatePayload(input) {
            const blacklist = [/javascript:/i, /<script/i, /onload=/i, /document\.cookie/i, /UNION SELECT/i];
            const isMalicious = blacklist.some(regex => regex.test(input));
            if (isMalicious) {
                console.warn("%c[SecOps] MALICIOUS INPUT ABORTED", "background: red; color: white;");
                return false;
            }
            return true;
        }
    };

    // --- NODE U8: AUTOMATION FORGE (Action Executor) ---
    const ActionExecutor = {
        async humanType(selector, text) {
            const el = (typeof selector === 'string') ? document.querySelector(selector) : selector;
            if (!el) throw new Error(`Node not found: ${selector}`);

            el.focus();
            for (const char of text) {
                const delay = Math.floor(Math.random() * (TemporalContext.state.constraints.delayMax - TemporalContext.state.constraints.delayMin)) + TemporalContext.state.constraints.delayMin;
                if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
                    el.value += char;
                } else if (el.isContentEditable) {
                    el.textContent += char;
                }
                el.dispatchEvent(new KeyboardEvent('keydown', { key: char }));
                el.dispatchEvent(new Event('input', { bubbles: true }));
                await new Promise(r => setTimeout(r, delay));
            }
            el.dispatchEvent(new Event('change', { bubbles: true }));
        },

        async openElementEditor(element) {
            const clickable = element.querySelector('a[aria-label="Edit"]') || element;
            clickable.click();
            // Using display visibility instead of brittle left:0px
            await this.waitForElement('.yo-sidebar-section:not([style*="display: none"])', 3000);
            const editor = document.querySelector('.yo-sidebar-section:not([style*="display: none"]) textarea, .yo-sidebar-section:not([style*="display: none"]) input[type="text"], .yo-sidebar-section:not([style*="display: none"]) [contenteditable="true"]');
            if (!editor) throw new Error('Could not find editor input');
            return editor;
        },

        async setEditorContent(editor, newText) {
            if (editor.tagName === 'TEXTAREA' || editor.tagName === 'INPUT') {
                editor.value = newText;
                editor.dispatchEvent(new Event('input', { bubbles: true }));
            } else if (editor.isContentEditable) {
                editor.textContent = newText;
                editor.dispatchEvent(new Event('input', { bubbles: true }));
            } else {
                throw new Error('Unsupported editor type');
            }
        },

        async saveEditor() {
            const saveBtn = document.querySelector('.yo-savebar .uk-button-primary');
            if (saveBtn) saveBtn.click();
            else {
                const editor = document.querySelector('.yo-sidebar-section[style*="left: 0px;"] textarea, .yo-sidebar-section[style*="left: 0px;"] input');
                if (editor) editor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            }
            await new Promise(r => setTimeout(r, 500));
        },

        async cancelEditor() {
            const cancelBtn = document.querySelector('.yo-savebar .uk-button-text');
            if (cancelBtn) cancelBtn.click();
            else document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            await new Promise(r => setTimeout(r, 500));
        },

        async modifyEditorText(editor, position, replacement, deleteCount = 0) {
            let currentText = (editor.tagName === 'TEXTAREA' || editor.tagName === 'INPUT') ? editor.value : editor.textContent;
            const before = currentText.substring(0, position);
            const after = currentText.substring(position + deleteCount);
            const newText = before + replacement + after;

            if (editor.tagName === 'TEXTAREA' || editor.tagName === 'INPUT') {
                editor.value = newText;
                editor.dispatchEvent(new Event('input', { bubbles: true }));
                const newPos = before.length + replacement.length;
                editor.setSelectionRange(newPos, newPos);
            } else if (editor.isContentEditable) {
                editor.textContent = newText;
                editor.dispatchEvent(new Event('input', { bubbles: true }));
            }
        },

        async addNewSection() {
            const lastSectionBtn = document.querySelector('.yo-builder-section:last-child .yo-builder-button-section');
            if (!lastSectionBtn) throw new Error('No "Add Section" button found');
            lastSectionBtn.click();

            const currentCount = document.querySelectorAll('.yo-builder-section').length;
            return new Promise((resolve) => {
                const observer = new MutationObserver(() => {
                    if (document.querySelectorAll('.yo-builder-section').length > currentCount) {
                        observer.disconnect();
                        setTimeout(resolve, 500);
                    }
                });
                observer.observe(document.querySelector('.yo-builder'), { childList: true, subtree: true });
            });
        },

        async deleteSection(section) {
            const deleteBtn = section.querySelector('.yo-builder-icon-delete');
            if (!deleteBtn) throw new Error('Delete button not found');
            deleteBtn.click();
            await new Promise(r => setTimeout(r, 300));
        },

        async addElementToSection(section, elementType) {
            const addElementBtn = section.querySelector('.yo-builder-button-element');
            if (!addElementBtn) throw new Error('No "Add Element" button found in this section');
            addElementBtn.click();

            await new Promise(r => setTimeout(r, 1000));
            const elementItems = document.querySelectorAll('.yo-builder-element-picker .yo-builder-element');
            for (const item of elementItems) {
                if (item.textContent.toLowerCase().includes(elementType.toLowerCase())) {
                    item.click();
                    break;
                }
            }
            await new Promise(r => setTimeout(r, 1000));
        },

        async setSectionTitle(section, newTitle) {
            const editBtn = section.querySelector('.yo-builder-icon-edit');
            if (!editBtn) throw new Error('Edit button not found for section');
            editBtn.click();

            const input = await this.waitForElement('.yo-sidebar-section:not([style*="display: none"]) input[type="text"]', 3000);
            input.value = newTitle;
            input.dispatchEvent(new Event('input', { bubbles: true }));

            const saveBtn = document.querySelector('.yo-savebar .uk-button-primary');
            if (saveBtn) saveBtn.click();
            else input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

            await new Promise(r => setTimeout(r, 500));
        },

        waitForElement(selector, timeout = 5000) {
            return new Promise((resolve, reject) => {
                if (document.querySelector(selector)) return resolve(document.querySelector(selector));
                const observer = new MutationObserver(() => {
                    if (document.querySelector(selector)) {
                        observer.disconnect();
                        resolve(document.querySelector(selector));
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });
                setTimeout(() => {
                    observer.disconnect();
                    reject(new Error(`Element ${selector} not found within ${timeout}ms`));
                }, timeout);
            });
        }
    };

    // --- NODE L5: LOCAL AI PROVIDER ---
    const LocalAIProvider = {
        config: {
            ollama: { url: 'http://localhost:11434/api/generate', active: false },
            lmstudio: { url: 'http://localhost:1234/v1/chat/completions', active: false }
        },
        async detect() {
            try {
                await new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: 'http://localhost:11434/api/tags',
                        timeout: 1000,
                        onload: (r) => r.status === 200 ? resolve() : reject(),
                        onerror: reject,
                        ontimeout: reject
                    });
                });
                this.config.ollama.active = true;
                console.log("%c[LocalAI] Ollama Detected", "color: #00ff00;");
            } catch(e) {}

            try {
                await new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: 'http://localhost:1234/v1/models',
                        timeout: 1000,
                        onload: (r) => r.status === 200 ? resolve() : reject(),
                        onerror: reject,
                        ontimeout: reject
                    });
                });
                this.config.lmstudio.active = true;
                console.log("%c[LocalAI] LM Studio Detected", "color: #00ff00;");
            } catch(e) {}
        },
        async think(prompt) {
            if (this.config.ollama.active) return this.callOllama(prompt);
            if (this.config.lmstudio.active) return this.callLMStudio(prompt);
            throw new Error("No local AI provider active.");
        },
        callOllama(prompt) {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: this.config.ollama.url,
                    data: JSON.stringify({ model: 'llama3', prompt, stream: false }),
                    onload: (r) => resolve(JSON.parse(r.responseText).response),
                    onerror: reject
                });
            });
        },
        callLMStudio(prompt) {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: this.config.lmstudio.url,
                    data: JSON.stringify({
                        messages: [{ role: 'user', content: prompt }],
                        stream: false
                    }),
                    onload: (r) => resolve(JSON.parse(r.responseText).choices[0].message.content),
                    onerror: reject
                });
            });
        }
    };

    // --- NODE S2e: NEURAL STYLE ENGINE ---
    const NeuralStyle = {
        inject(theme = 'NEURAL_DARK') {
            const css = theme === 'NEURAL_DARK' ? `
                :root { --sov-glow: #00ffcc; --sov-bg: #0a0a0c; }
                body { filter: contrast(1.1) brightness(0.9) !important; background-color: var(--sov-bg) !important; color: var(--sov-glow) !important; }
                ${this.highlightTargets()}
            ` : '';
            GM_addStyle(css);
        },
        highlightTargets() {
            return `a, button, input { border: 1px solid rgba(0, 255, 204, 0.3) !important; transition: all 0.3s; }
                    a:hover { box-shadow: 0 0 10px var(--sov-glow); }`;
        }
    };

    // --- NODE D1: AI ENGINEER (Command Interface) ---
    window.SOV = {
        observe: () => HybridArchitect.scanDOM(),

        interact: async (intent, data) => {
            TemporalContext.log({ action: intent, ...data });

            switch(intent) {
                case 'THINK':
                    if (SecOpsGovernance.validatePayload(data.prompt)) {
                        const response = await LocalAIProvider.think(data.prompt);
                        if (SecOpsGovernance.validatePayload(response)) {
                            console.log("%c[LocalAI] Response:", "color: #00ffcc;", response);
                            return response;
                        }
                    }
                    break;
                case 'FORM_FILL':
                    if (SecOpsGovernance.validatePayload(data.value)) {
                        await ActionExecutor.humanType(data.selector, data.value);
                    }
                    break;
                case 'THEME_SYNC':
                    NeuralStyle.inject('NEURAL_DARK');
                    break;
                case 'EXPORT_TRACE':
                    const trace = JSON.stringify(TemporalContext.state.history, null, 2);
                    GM_setClipboard(trace);
                    console.log("Trace exported to clipboard.");
                    break;
                case 'YO_MODIFY_PATH':
                    if (!HybridArchitect.isYOOtheme()) throw new Error('Not in YOOtheme Customizer');
                    const tree = HybridArchitect.buildElementTree(HybridArchitect.getLayoutData());
                    const targetNode = HybridArchitect.resolvePath(data.path, tree);
                    if (!targetNode || !targetNode.domElement) throw new Error(`Element not found: ${data.path}`);

                    const payload = data.newContent || data.replacement;
                    if (payload && !SecOpsGovernance.validatePayload(payload)) return;

                    const editor = await ActionExecutor.openElementEditor(targetNode.domElement);
                    if (data.position !== undefined) {
                        await ActionExecutor.modifyEditorText(editor, data.position, data.replacement, data.deleteCount);
                    } else {
                        await ActionExecutor.setEditorContent(editor, data.newContent);
                    }
                    await ActionExecutor.saveEditor();
                    break;
                case 'YO_ADD_SECTION':
                    if (!HybridArchitect.isYOOtheme()) throw new Error('Not in YOOtheme Customizer');
                    if (data.title && !SecOpsGovernance.validatePayload(data.title)) return;
                    await ActionExecutor.addNewSection();
                    if (data.title) {
                        const newSection = document.querySelector('.yo-builder-section:last-child');
                        await ActionExecutor.setSectionTitle(newSection, data.title);
                    }
                    break;
                case 'YO_DELETE_SECTION':
                    if (!HybridArchitect.isYOOtheme()) throw new Error('Not in YOOtheme Customizer');
                    const delTree = HybridArchitect.buildElementTree(HybridArchitect.getLayoutData());
                    const delNode = HybridArchitect.resolvePath(data.path, delTree);
                    if (delNode && delNode.domElement) await ActionExecutor.deleteSection(delNode.domElement);
                    break;
                case 'YO_ADD_ELEMENT':
                    if (!HybridArchitect.isYOOtheme()) throw new Error('Not in YOOtheme Customizer');
                    const addTree = HybridArchitect.buildElementTree(HybridArchitect.getLayoutData());
                    const parentNode = HybridArchitect.resolvePath(data.parentPath, addTree);
                    if (parentNode && parentNode.domElement) {
                        await ActionExecutor.addElementToSection(parentNode.domElement, data.elementType);
                    }
                    break;
                case 'YO_IMPORT_LAYOUT':
                    if (!HybridArchitect.isYOOtheme()) throw new Error('Not in YOOtheme Customizer');
                    if (data.json) {
                        const imported = (typeof data.json === 'string') ? JSON.parse(data.json) : data.json;
                        console.log("Importing layout:", imported.name || 'Untitled');
                        // v5.3 Basic Import: Process top-level sections
                        if (imported.children) {
                            for (const section of imported.children) {
                                if (SecOpsGovernance.validatePayload(section.name || '')) {
                                    await ActionExecutor.addNewSection();
                                    const newSec = document.querySelector('.yo-builder-section:last-child');
                                    if (section.name) await ActionExecutor.setSectionTitle(newSec, section.name);
                                }
                            }
                        }
                        TemporalContext.log({ action: 'IMPORT_COMPLETED', name: imported.name });
                    }
                    break;
                case 'YO_DUPLICATE_ELEMENT':
                    if (!HybridArchitect.isYOOtheme()) throw new Error('Not in YOOtheme Customizer');
                    const dupTree = HybridArchitect.buildElementTree(HybridArchitect.getLayoutData());
                    const srcNode = HybridArchitect.resolvePath(data.sourcePath, dupTree);
                    if (srcNode && srcNode.domElement) {
                        const copyBtn = srcNode.domElement.querySelector('.yo-builder-icon-copy');
                        if (copyBtn) copyBtn.click();
                        // Paste logic depends on YOOtheme clipboard state, usually simulated by clicking paste on target.
                    }
                    break;
            }
        }
    };

    LocalAIProvider.detect();
    console.log("%c» SOVEREIGN_ORCHESTRATOR_v5.3_ACTIVE", "color: #00ffcc; font-family: monospace; font-size: 14px;");
})();
