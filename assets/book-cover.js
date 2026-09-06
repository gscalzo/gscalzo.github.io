document.querySelectorAll('.book-cover').forEach((book) => {
  const cover = book.querySelector('.book-object__front');
  const inside = book.querySelector('.book-object__inside');
  let pinned = false;
  const setOpen = (open) => {
    book.classList.toggle('is-open', open);
    cover.setAttribute('aria-expanded', String(open));
    cover.setAttribute('aria-label', `${open ? 'Close' : 'Open'} ${cover.querySelector('img').alt}`);
    inside.hidden = !open;
  };
  cover.addEventListener('click', () => {
    pinned = !pinned;
    setOpen(pinned);
  });
  book.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') setOpen(true);
  });
  book.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse' && !pinned && !book.contains(document.activeElement)) setOpen(false);
  });
  book.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (!pinned && !book.contains(document.activeElement) && !book.matches(':hover')) setOpen(false);
    });
  });
  book.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      pinned = false;
      cover.focus();
      setOpen(false);
    }
  });
});
