/* ==========================================================
   Antescher — tells the hosting page how tall this figure is.

   The blog embeds each figure in an iframe, which has no natural
   height. Every embed loads this and posts its measured height up;
   the `antescher` shortcode listens and sizes the frame to match,
   so figures never scroll inside themselves.
   ========================================================== */
(function () {
  var last = 0;

  function measure() {
    var d = document.documentElement;
    return Math.ceil(Math.max(d.scrollHeight, d.getBoundingClientRect().height));
  }

  function report() {
    var h = measure();
    /* only speak when it actually moved — the parent resizing us
       changes our width, which can bounce us straight back here */
    if (Math.abs(h - last) < 2) return;
    last = h;
    parent.postMessage({ antescher: 'height', height: h }, '*');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', report);
  } else {
    report();
  }
  window.addEventListener('load', report);

  /* fonts land late and reflow the monospace labels */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(report);

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(report).observe(document.documentElement);
  } else {
    window.addEventListener('resize', report);
  }

  /* mermaid swaps <pre> for <svg> well after load */
  setTimeout(report, 400);
  setTimeout(report, 1600);
})();
