/* js/contact-form.js — Enquiry form validation + success toast */
(function () {
    'use strict';
    const form         = document.getElementById('enquiry-form');
    const nameInput    = document.getElementById('form-name');
    const emailInput   = document.getElementById('form-email');
    const phoneInput   = document.getElementById('form-phone');
    const messageInput = document.getElementById('form-message');
    const toast        = document.getElementById('toast-success');
    if (!form) return;

    function showError(el)  { el.parentElement.classList.add('error'); }
    function clearError(el) { el.parentElement.classList.remove('error'); }
    function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.toLowerCase()); }

    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
        if (input) input.addEventListener('input', () => clearError(input));
    });

    function validate() {
        let valid = true;
        if (!nameInput.value.trim())                              { showError(nameInput);    valid = false; } else clearError(nameInput);
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) { showError(emailInput);   valid = false; } else clearError(emailInput);
        if (!phoneInput.value.trim())                             { showError(phoneInput);   valid = false; } else clearError(phoneInput);
        if (!messageInput.value.trim())                           { showError(messageInput); valid = false; } else clearError(messageInput);
        return valid;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!validate()) return;
        form.reset();
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        }
    });
})();
