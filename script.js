document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initScrollReveal();
  initTiltEffect();
  initMobileMenu();
  initSmoothHover();
  initTransformationToggle();
});

function initScrollProgress() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  let progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    navbar.appendChild(progressBar);
  }
  
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }
  
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (!entry.target.classList.contains('keep-observing')) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll('.anim-fade-up, .anim-scale-in, .anim-slide-left, .anim-slide-right, .reveal');
  animatedElements.forEach(el => observer.observe(el));
  
  document.querySelectorAll('.section-header').forEach(header => {
    if (!header.classList.contains('anim-fade-up')) {
      header.classList.add('anim-fade-up');
      observer.observe(header);
    }
  });
  
  document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card').forEach((card, index) => {
    if (!card.classList.contains('anim-fade-up')) {
      card.classList.add('anim-fade-up');
      card.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(card);
    }
  });
  
  // Process steps with faster, lighter delays
  document.querySelectorAll('.process-step').forEach((card, index) => {
    if (!card.classList.contains('anim-fade-up')) {
      card.classList.add('anim-fade-up');
      card.style.transitionDelay = `${index * 0.05}s`;
      observer.observe(card);
    }
  });
}

function initTiltEffect() {
  const tiltElements = document.querySelectorAll('.service-card, .portfolio-card, .floating-card');
  
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;
  
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -5;
      const rotateY = (x - centerX) / centerX * 5;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
  
  const mockup = document.querySelector('.mockup-browser');
  if (mockup) {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 5;
        
        mockup.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      
      heroVisual.addEventListener('mouseleave', () => {
        mockup.style.transform = 'rotateY(-5deg) rotateX(2deg)';
      });
    }
  }
}

function initMobileMenu() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');
  
  if (!mobileBtn || !navLinks) return;
  
  const closeMobileMenu = () => {
    mobileBtn.classList.remove('active');
    navLinks.classList.remove('active');
    if (navCta) navCta.classList.remove('active');
    document.body.style.overflow = '';
  };

  const openMobileMenu = () => {
    mobileBtn.classList.add('active');
    navLinks.classList.add('active');
    if (navCta) navCta.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileBtn.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileBtn.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close menu on window resize to desktop size
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 900 && mobileBtn.classList.contains('active')) {
        closeMobileMenu();
      }
    }, 250);
  });
}

function initSmoothHover() {
  const buttons = document.querySelectorAll('.btn-primary');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
  
  const cards = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = '';
      }
    });
  });
}

function initTransformationToggle() {
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const beforeView = document.querySelector('.transformation-before');
  const afterView = document.querySelector('.transformation-after');
  
  if (!toggleBtns.length || !beforeView || !afterView) return;
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      if (view === 'before') {
        beforeView.classList.add('active');
        afterView.classList.remove('active');
      } else {
        afterView.classList.add('active');
        beforeView.classList.remove('active');
      }
    });
  });
  
  setInterval(() => {
    const activeBtn = document.querySelector('.toggle-btn.active');
    const nextBtn = activeBtn.getAttribute('data-view') === 'before' 
      ? document.querySelector('.toggle-btn[data-view="after"]')
      : document.querySelector('.toggle-btn[data-view="before"]');
    
    if (nextBtn) {
      nextBtn.click();
    }
  }, 4000);
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      
      if (window.innerWidth >= 768) {
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg && scrolled < window.innerHeight) {
          heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
      }
      
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
