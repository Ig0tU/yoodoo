<?php
defined('_JEXEC') or die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Factory;
use Joomla\CMS\Uri\Uri;

class PlgSystemYoothemeagent extends CMSPlugin
{
    protected $autoloadLanguage = true;

    public function onBeforeCompileHead()
    {
        $app = Factory::getApplication();
        if (!$app->isClient('site')) {
            return;
        }

        // Only allow for authenticated administrators
        $user = Factory::getUser();
        if (!$user->authorise('core.admin')) {
            return;
        }

        $doc = Factory::getDocument();
        if ($doc->getType() !== 'html') {
            return;
        }

        // Only inject in YOOtheme Customizer or if forced?
        // For now, let's look for the YOOtheme customizer signature
        $isCustomizer = $app->input->get('option') === 'com_ajax' && $app->input->get('p') === 'customizer';

        // Also check if we are in the preview iframe
        $isPreview = $app->input->get('tpl') === 'yootheme';

        // We'll inject it everywhere for now to be safe, but usually it's for the customizer
        $this->injectAgent($doc);
    }

    protected function injectAgent($doc)
    {
        $params = $this->params;

        // Pass ONLY non-sensitive params to JS
        $jsParams = json_encode([
            'ai_provider' => $params->get('ai_provider', 'ollama'),
            'ollama_cloud_url' => $params->get('ollama_cloud_url', 'https://api.ollama.com'),
            'ajax_url' => Uri::root() . 'index.php?option=com_ajax&plugin=yoothemeagent&group=system&format=json'
        ]);

        $doc->addScriptDeclaration("window.YOO_AGENT_CONFIG = {$jsParams};");

        // Add Fonts and FontAwesome
        $doc->addStyleSheet('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Sora:wght@400;500;600;700&display=swap');
        $doc->addStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
        $doc->addStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css');

        // Add Highlight.js and Marked
        $doc->addScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js');
        $doc->addScript('https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.0/marked.min.js');

        // Add plugin assets
        $doc->addStyleSheet(Uri::root(true) . '/plugins/system/yoothemeagent/assets/css/agent.css');
        $doc->addScript(Uri::root(true) . '/plugins/system/yoothemeagent/assets/js/agent.js');
    }

    public function onAfterRender()
    {
        $app = Factory::getApplication();
        if (!$app->isClient('site')) return;

        // Only allow for authenticated administrators
        $user = Factory::getUser();
        if (!$user->authorise('core.admin')) {
            return;
        }

        $doc = Factory::getDocument();
        if ($doc->getType() !== 'html') return;

        $body = $app->getBody();

        // Simple injection of the agent container
        if (strpos($body, 'id="yoo-agent-root"') === false) {
            $agentHtml = "\n" . '<div id="yoo-agent-root"></div>' . "\n";
            if (stripos($body, '</body>') !== false) {
                $body = str_ireplace('</body>', $agentHtml . '</body>', $body);
            } else {
                $body .= $agentHtml;
            }
            $app->setBody($body);
        }
    }

    /**
     * AJAX handler for secure AI requests
     */
    public function onAjaxYoothemeagent()
    {
        $app = Factory::getApplication();
        $user = Factory::getUser();

        if (!$user->authorise('core.admin')) {
            return ['error' => 'Unauthorized'];
        }

        $input = $app->input->get('payload', '', 'raw');
        $payload = json_decode($input, true);
        if (!$payload) return ['error' => 'Invalid payload'];

        $params = $this->params;
        $provider = $payload['provider'] ?? $params->get('ai_provider', 'ollama');

        $url = '';
        $key = '';
        $body = $payload['body'] ?? [];

        switch ($provider) {
            case 'openrouter':
                $url = 'https://openrouter.ai/api/v1/chat/completions';
                $key = $params->get('openrouter_key');
                break;
            case 'grok':
                $url = 'https://api.x.ai/v1/chat/completions';
                $key = $params->get('grok_key');
                break;
            case 'ollama_cloud':
                $url = $params->get('ollama_cloud_url');
                $key = $params->get('ollama_cloud_key');
                break;
            default:
                return ['error' => 'Provider not supported via proxy'];
        }

        if (!$key) return ['error' => 'API Key not configured'];

        // Perform the request server-side
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $key,
            'HTTP-Referer: ' . Uri::root(),
            'X-Title: YOOtheme Agent'
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200) {
            return ['error' => 'AI Provider error (' . $httpCode . ')', 'details' => $response];
        }

        return json_decode($response, true);
    }
}
