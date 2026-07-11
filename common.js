// ---------- page loader ----------
(function(){
  const loader = document.createElement('div');
  loader.id = 'tixteeLoader';
  loader.innerHTML = `<img src="images/rlogo.jpg" alt="tixtee" class="loader-logo">`;
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

// ---------- toast helper ----------
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
  showTixteeToast("This content belongs to Tixtee — thanks for respecting that 🙂");
});

document.addEventListener('copy', (e) => {
  const tag = e.target.tagName;
  if(tag === 'INPUT' || tag === 'TEXTAREA') return;
  showTixteeToast("Copying is disabled on this page");
  e.preventDefault();
});