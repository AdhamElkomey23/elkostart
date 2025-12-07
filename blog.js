document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  const searchInput = document.getElementById('blog-search');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.getAttribute('data-category');
      filterCards(category, searchInput.value.toLowerCase());
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const activeFilter = document.querySelector('.filter-btn.active');
      const category = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
      filterCards(category, this.value.toLowerCase());
    });
  }

  function filterCards(category, searchTerm) {
    blogCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
      const cardExcerpt = card.querySelector('.card-excerpt').textContent.toLowerCase();
      
      const matchesCategory = category === 'all' || cardCategory === category;
      const matchesSearch = !searchTerm || 
        cardTitle.includes(searchTerm) || 
        cardExcerpt.includes(searchTerm);
      
      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.classList.add('hidden');
      }
    });
  }

  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput.value) {
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.background = 'var(--gold-light)';
        emailInput.value = '';
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
        }, 3000);
      }
    });
  }
});