// CURSOR
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx+'px'; cursor.style.top = my+'px';
  });
  (function animate() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(animate);
  })();
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
  });

  // MOBILE MENU
  function toggleMenu() { 
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  }
  function closeMenu() { 
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // COUNTERS
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        let cur = 0; const step = target / 50;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { el.textContent = target + suffix; clearInterval(t); }
          else { el.textContent = Math.floor(cur) + suffix; }
        }, 30);
        e.target._obs.unobserve(el);
      });
    }, { threshold: 0.3 }).observe(el);
  });
  // fix: store observer ref
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      const target = +el.dataset.target, suffix = el.dataset.suffix || '';
      let cur = 0;
      const t = setInterval(() => {
        cur += target / 50;
        el.textContent = (cur >= target ? target : Math.floor(cur)) + suffix;
        if (cur >= target) clearInterval(t);
      }, 30);
      obs.unobserve(el);
    }, { threshold: 0.3 });
    obs.observe(el);
  });

  // SEARCH DEMO
  function handleSearch() {
    const val = document.getElementById('heroInput').value.trim();
    if (!val) { document.getElementById('heroInput').focus(); return; }
    alert('🎉 VidDownloader encontrou seu vídeo!\n\nEsta é uma demo da landing page.\nBaixe o app para a funcionalidade completa.');
  }
  document.getElementById('heroInput').addEventListener('keydown', e => { if (e.key === 'Enter') handleSearch(); });