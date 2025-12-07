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

    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      company: document.getElementById('company').value,
      service: document.getElementById('service').value,
      budget: document.getElementById('budget').value,
      message: document.getElementById('message').value,
      timeline: document.getElementById('timeline').value,
      newsletter: document.querySelector('input[name="newsletter"]').checked
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        form.style.display = 'none';
        formError.style.display = 'block';
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