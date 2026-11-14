const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const closeButton = document.querySelector('.menu-close');

if (menuButton && mobileMenu instanceof HTMLDialogElement && closeButton &&
    typeof mobileMenu.showModal === 'function') {
  const mobileLayout = window.matchMedia('(max-width: 1000px)');
  let previousOverflow = '';

  const resetMenu = () => {
    document.body.style.overflow = previousOverflow;
    menuButton.setAttribute('aria-expanded', 'false');
  };
  const closeMenu = () => {
    resetMenu();
    mobileMenu.close();
  };

  document.documentElement.classList.add('js');

  menuButton.addEventListener('click', () => {
    previousOverflow = document.body.style.overflow;
    mobileMenu.showModal();
    document.body.style.overflow = 'hidden';
    menuButton.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  });

  closeButton.addEventListener('click', closeMenu);
  mobileMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  mobileMenu.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeMenu();
  });
  mobileLayout.addEventListener('change', () => {
    if (!mobileLayout.matches && mobileMenu.open) closeMenu();
  });
}
