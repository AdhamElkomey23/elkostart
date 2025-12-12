document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const arrowIcon = submitBtn.querySelector('.arrow-icon');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    btnText.style.display = 'none';
    arrowIcon.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone') || 'Not provided',
      company: formData.get('company') || 'Not provided',
      service: formData.get('service') || 'Not specified',
      budget: formData.get('budget') || 'Not specified',
      message: formData.get('message'),
      timeline: formData.get('timeline') || 'Not specified',
      newsletter: formData.get('newsletter') === 'on'
    };

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      form.style.display = 'none';
      formError.style.display = 'block';
    } finally {
      btnText.style.display = 'inline';
      arrowIcon.style.display = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
});

function resetForm() {
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  
  form.reset();
  formSuccess.style.display = 'none';
  form.style.display = 'flex';
}

function hideError() {
  const form = document.getElementById('contact-form');
  const formError = document.getElementById('form-error');
  
  formError.style.display = 'none';
  form.style.display = 'flex';
}
