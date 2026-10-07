(function () {
  const app = document.getElementById('app');
  if (!app) return;

  function renderSafe() {
    const inline = window.__JFT_INLINE__ || {};
    const papers = Array.isArray(inline.papers) ? inline.papers : [];
    const sources = Array.isArray(inline.sources) ? inline.sources : [];
    const kanji = Array.isArray(inline.kanji) ? inline.kanji : [];

    const total = papers.length + sources.length + kanji.length;
    const heading = total ? 'JFT Master' : 'JFT Master — Data not ready';
    const body = total
      ? `Loaded ${papers.length} paper set(s), ${sources.length} source document(s), and ${kanji.length} Kanji records.`
      : 'The app data bundle is not available yet. Try serving the repo from a local web server or reload the page.';

    app.innerHTML = '<div class="boot"><div style="font-size:2rem">🇯🇵</div><h1>' + heading + '</h1><p>' + body + '</p><p style="max-width:34rem;margin:0 auto">If the main UI is still missing after reload, open the project via a local web server instead of double-clicking the HTML file.</p></div>';
  }

  const shouldFallback = function () {
    if (!app.innerHTML || app.innerHTML.trim() === '') return true;
    if (!app.querySelector('.boot')) return false;
    return true;
  };

  if (shouldFallback()) {
    renderSafe();
  }

  window.addEventListener('load', function () {
    if (shouldFallback()) {
      renderSafe();
    }
  });
})();
