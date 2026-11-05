// Tema claro/escuro. Script clássico carregado no <head> para aplicar o tema antes do primeiro desenho
// (sem "piscar" branco no modo escuro). Preferência: 'auto' (segue o sistema), 'claro' ou 'escuro'.
(function () {
  var KEY = 'radar.tema';
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function pref() {
    try { return localStorage.getItem(KEY) || 'auto'; } catch (e) { return 'auto'; }
  }

  function apply() {
    var p = pref();
    var dark = p === 'escuro' || (p === 'auto' && media.matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#171b23' : '#ffffff';
    document.dispatchEvent(new CustomEvent('radar:tema', { detail: { pref: p, dark: dark } }));
  }

  apply();
  // No automático, acompanha a troca de tema do sistema com a página aberta.
  media.addEventListener('change', function () { if (pref() === 'auto') apply(); });

  window.radarTema = {
    get: pref,
    set: function (p) {
      try { localStorage.setItem(KEY, p); } catch (e) { /* navegação privada: vale só nesta página */ }
      apply();
    },
  };
})();
