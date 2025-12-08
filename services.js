document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.service-tab');
  const panels = document.querySelectorAll('.tab-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetId = this.getAttribute('data-tab');
      
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      this.classList.add('active');
      document.getElementById(targetId).classList.add('active');
    });
  });
  
  const projectForm = document.getElementById('custom-project-form');
  const formSuccess = document.getElementById('project-form-success');
  const submitBtn = document.getElementById('project-submit-btn');
  
  if (projectForm) {
    projectForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const fullName = formData.get('name').trim();
      const email = formData.get('email');
      const company = formData.get('company') || 'Not provided';
      const phone = formData.get('phone') || 'Not provided';
      const message = formData.get('message');
      const timeline = formData.get('timeline');
      
      const selectedServices = formData.getAll('services');
      const servicesStr = selectedServices.length > 0 ? selectedServices.join(', ') : 'Not specified';
      
      if (!fullName || !email || !message || selectedServices.length === 0) {
        alert('Please fill in all required fields and select at least one service.');
        return;
      }
      
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '(Not provided)';
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
          <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        Sending...
      `;
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            company: company,
            service: servicesStr,
            budget: 'Custom Quote Requested',
            message: message,
            timeline: timeline,
            newsletter: false
          })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          projectForm.style.display = 'none';
          formSuccess.style.display = 'block';
        } else {
          throw new Error(result.error || 'Failed to send message');
        }
      } catch (error) {
        alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
        console.error('Form submission error:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          Get Your Custom Proposal
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        `;
      }
    });
  }
});
