(function () {
  const form = document.getElementById('telegram-form');
  const status = document.getElementById('telegram-status');
  const submit = form.querySelector('button[type="submit"]');

  function setStatus(message, state) {
    status.textContent = message;
    status.dataset.state = state || '';
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const botToken = formData.get('botToken').trim();
    const chatId = formData.get('chatId').trim();
    const message = formData.get('message').trim();
    const parseMode = formData.get('parseMode');

    if (!botToken || !chatId || !message) {
      setStatus('Complete all required fields before sending.', 'error');
      return;
    }

    const payload = {
      chat_id: chatId,
      text: message,
      disable_web_page_preview: formData.get('disablePreview') === 'on'
    };

    if (parseMode) {
      payload.parse_mode = parseMode;
    }

    submit.disabled = true;
    setStatus('Sending...', '');

    try {
      const response = await fetch(`https://api.telegram.org/bot${encodeURIComponent(botToken)}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.description || 'Telegram rejected the message.');
      }

      form.elements.message.value = '';
      setStatus('Message sent successfully.', 'success');
    } catch (error) {
      setStatus(error.message || 'Could not reach Telegram.', 'error');
    } finally {
      submit.disabled = false;
    }
  });
})();