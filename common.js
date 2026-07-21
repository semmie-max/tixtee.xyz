// ---------- page loader ----------
(function(){
  const shapes = {
    profile: `
      <div class="tx-shape-profile">
        <div class="tx-sk tx-sk-circle"></div>
        <div class="tx-col">
          <div class="tx-sk tx-title"></div>
          <div class="tx-sk tx-sub"></div>
        </div>
        <div class="tx-sk tx-sk-circle tx-dot"></div>
      </div>`,
    auth: `
      <div class="tx-shape-auth">
        <div class="tx-sk tx-logo"></div>
        <div class="tx-sk tx-input"></div>
        <div class="tx-sk tx-input"></div>
        <div class="tx-sk tx-button"></div>
      </div>`,
    list: `
      <div class="tx-shape-list">
        ${Array(3).fill(`
          <div class="tx-row">
            <div class="tx-sk tx-thumb"></div>
            <div class="tx-col">
              <div class="tx-sk tx-title"></div>
              <div class="tx-sk tx-sub"></div>
            </div>
          </div>`).join('')}
      </div>`,
    card: `
      <div class="tx-shape-card">
        <div class="tx-sk tx-banner"></div>
        <div class="tx-sk tx-title"></div>
        <div class="tx-sk tx-sub"></div>
      </div>`
  };

  function detectShape(){
    const path = window.location.pathname;

    if(/^\/(login|signup|forgot-password|reset-password)/.test(path)) return 'auth';
    if(/^\/(events|search|explore)/.test(path)) return 'list';
    if(/^\/event\//.test(path)) return 'card';

    return 'profile'; // dashboard, pending, account, everything else
  }

  const shape = detectShape();
  const loader = document.createElement('div');
  loader.id = 'tixteeLoader';
  loader.innerHTML = shapes[shape] || shapes.profile;
  document.body.insertBefore(loader, document.body.firstChild);

  const minTime = new Promise(resolve => setTimeout(resolve, 1100));
  const pageLoaded = new Promise(resolve => {
    if(document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve);
  });

  Promise.all([minTime, pageLoaded]).then(() => {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 600);
  });
})();

function showTixteeToast(text){
  let toast = document.getElementById('tixteeToast');
  if(!toast){
    toast = document.createElement('div');
    toast.id = 'tixteeToast';
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ---------- copy protection (gentle, not blocking form fields) ----------
document.addEventListener('contextmenu', (e) => {
  const tag = e.target.tagName;
  if(tag === 'INPUT' || tag === 'TEXTAREA') return;
  e.preventDefault();
  showTixteeToast("??? lol...");
});

document.addEventListener('copy', (e) => {
  const tag = e.target.tagName;
  if(tag === 'INPUT' || tag === 'TEXTAREA') return;
  showTixteeToast("Copying is disabled on this page");
  e.preventDefault();
});