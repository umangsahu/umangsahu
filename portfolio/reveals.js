// Content is visible before enhancement, including when JavaScript is disabled.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target); // Scrolling back never replays a reveal.
    }
  }, {
    threshold: 0.08, // Increase this fraction to wait for more of the item.
    rootMargin: '0px 0px -12px 0px'
  });

  document.querySelectorAll('[data-reveal]').forEach(item => observer.observe(item));
  reducedMotion.addEventListener('change', event => {
    if (event.matches) observer.disconnect();
  });
}
