
function toggleNav(){
  const nav = document.getElementById('nav');
  nav.classList.toggle('open');
}

// Google Analytics 4 — ne se charge qu'avec le consentement de l'utilisateur
function loadGoogleAnalytics(){
  const id = window.GA_MEASUREMENT_ID;
  if(!id || id.indexOf('XXXX') !== -1) return; // pas encore configuré
  if(window.gaLoaded) return;
  window.gaLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id, { anonymize_ip: true });
}

// Bannière cookies (consentement simple, mémorisé)
(function(){
  const KEY = 'neodrive-cookie-consent';
  let consent;
  try { consent = localStorage.getItem(KEY); } catch(e) { consent = null; }

  if(consent === 'accepted'){
    loadGoogleAnalytics();
    return;
  }
  if(consent) return; // 'declined' déjà enregistré, ne rien faire

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <p>Ce site utilise des cookies techniques (formulaire de contact) et, si vous l'acceptez, un outil de mesure d'audience (Google Analytics) pour comprendre la fréquentation. Aucun cookie publicitaire.</p>
    <div class="cookie-actions">
      <button type="button" class="btn btn-ghost" id="cookie-decline">Refuser</button>
      <button type="button" class="btn btn-primary" id="cookie-accept">Accepter</button>
    </div>
  `;
  document.body.appendChild(banner);

  function close(value){
    try { localStorage.setItem(KEY, value); } catch(e){}
    if(value === 'accepted') loadGoogleAnalytics();
    banner.remove();
  }
  document.getElementById('cookie-accept').addEventListener('click', ()=> close('accepted'));
  document.getElementById('cookie-decline').addEventListener('click', ()=> close('declined'));
})();

// Ferme le menu mobile quand on clique un lien
document.querySelectorAll('.nav a').forEach(a=>{
  a.addEventListener('click', ()=>{
    document.getElementById('nav')?.classList.remove('open');
  });
});

// UX du formulaire de contact (Netlify Forms gère la soumission réelle)
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', ()=>{
    const status = document.getElementById('formStatus');
    const btn = form.querySelector('button[type="submit"]');
    if(status){
      status.textContent = "Envoi en cours…";
    }
    if(btn){
      btn.disabled = true;
      btn.textContent = "Envoi en cours…";
    }
    // Netlify intercepte et traite la soumission nativement (pas de preventDefault)
  });
}

// UX du formulaire d'inscription Shop (Netlify Forms gère la soumission réelle)
const shopForm = document.querySelector('.shop-notify-form');
if(shopForm){
  shopForm.addEventListener('submit', ()=>{
    const btn = shopForm.querySelector('button');
    if(btn){
      btn.disabled = true;
      btn.textContent = "Envoi…";
    }
  });
}

// Slider de comparaison avant/après
document.querySelectorAll('.compare').forEach(el=>{
  const before = el.querySelector('.compare-before');
  const beforeImg = el.querySelector('.compare-before img');
  const handle = el.querySelector('.compare-handle');
  if(!before) return;

  let value = 50;

  function setImageWidth(){
    const fullWidth = el.offsetWidth;
    if(beforeImg) beforeImg.style.width = fullWidth + 'px';
  }

  function update(v){
    value = Math.min(100, Math.max(0, v));
    before.style.width = value + '%';
    if(handle) handle.style.left = value + '%';
    el.setAttribute('aria-valuenow', Math.round(value));
  }

  function valueFromClientX(clientX){
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return ratio * 100;
  }

  let dragging = false;

  el.addEventListener('pointerdown', (e)=>{
    dragging = true;
    el.setPointerCapture(e.pointerId);
    update(valueFromClientX(e.clientX));
    e.preventDefault();
  });
  el.addEventListener('pointermove', (e)=>{
    if(!dragging) return;
    update(valueFromClientX(e.clientX));
  });
  el.addEventListener('pointerup', ()=> dragging = false);
  el.addEventListener('pointercancel', ()=> dragging = false);

  // Clavier (accessibilité)
  el.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft'){ update(value - 5); e.preventDefault(); }
    if(e.key === 'ArrowRight'){ update(value + 5); e.preventDefault(); }
    if(e.key === 'Home'){ update(0); e.preventDefault(); }
    if(e.key === 'End'){ update(100); e.preventDefault(); }
  });

  window.addEventListener('resize', setImageWidth);
  setImageWidth();
  update(50);
});

// ============================================================
// Sélecteur de compatibilité véhicule (Marque → Modèle → Année)
// ============================================================
(function(){
  const data = window.NEODRIVE_COMPAT;
  const root = document.getElementById('compat-finder');
  if(!data || !root) return;

  const selMarque = document.getElementById('compat-marque');
  const selModele = document.getElementById('compat-modele');
  const selAnnee  = document.getElementById('compat-annee');
  const result    = document.getElementById('compat-result');

  function reset(sel, placeholder){
    sel.innerHTML = '<option value="">' + placeholder + '</option>';
    sel.disabled = true;
  }

  // Remplit les marques
  Object.keys(data).sort().forEach(marque=>{
    const opt = document.createElement('option');
    opt.value = marque; opt.textContent = marque;
    selMarque.appendChild(opt);
  });

  function clearResult(){
    result.innerHTML = '';
    result.classList.remove('show');
  }

  selMarque.addEventListener('change', ()=>{
    reset(selModele, 'Choisir le modèle');
    reset(selAnnee, 'Choisir l\'année');
    clearResult();
    const marque = selMarque.value;
    if(!marque) return;
    data[marque].forEach((m, i)=>{
      const opt = document.createElement('option');
      opt.value = i; opt.textContent = m.modele;
      selModele.appendChild(opt);
    });
    selModele.disabled = false;
  });

  selModele.addEventListener('change', ()=>{
    reset(selAnnee, 'Choisir l\'année');
    clearResult();
    const marque = selMarque.value;
    const mi = selModele.value;
    if(mi === '') return;
    const gens = data[marque][mi].generations;
    gens.forEach((g, i)=>{
      const opt = document.createElement('option');
      opt.value = i; opt.textContent = g.label;
      selAnnee.appendChild(opt);
    });
    selAnnee.disabled = false;
  });

  selAnnee.addEventListener('change', ()=>{
    clearResult();
    const marque = selMarque.value;
    const mi = selModele.value;
    const gi = selAnnee.value;
    if(gi === '') return;
    const g = data[marque][mi].generations[gi];
    showResult(marque, data[marque][mi].modele, g);
  });

  function showResult(marque, modele, g){
    let icon, typeLabel;
    if(g.type === 'autoradio'){
      icon = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="4" width="14" height="10" rx="1.4"/><rect x="18" y="3" width="4" height="12" rx="0.8"/><path d="M5 17h8M8 14v3"/></svg>';
      typeLabel = 'Autoradio Android';
    } else if(g.type === 'non-compatible'){
      icon = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg>';
      typeLabel = 'Nous consulter';
    } else {
      icon = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M3 9h18M8 14h2"/></svg>';
      typeLabel = 'Boîtier CarPlay';
    }

    if(g.type === 'non-compatible'){
      result.innerHTML =
        '<div class="compat-result-head">' + icon +
        '<div><span class="compat-result-type">' + typeLabel + '</span>' +
        '<h3>Solution à confirmer</h3></div></div>' +
        '<p class="compat-result-car">' + marque + ' ' + modele + ' · ' + g.label + '</p>' +
        '<p class="compat-result-note">' + g.note + '</p>' +
        '<a class="btn btn-primary" href="contact.html">Demander conseil</a>';
    } else {
      result.innerHTML =
        '<div class="compat-result-head">' + icon +
        '<div><span class="compat-result-type">' + typeLabel + '</span>' +
        '<h3>' + g.produit + '</h3></div></div>' +
        '<p class="compat-result-car">Compatible avec votre ' + marque + ' ' + modele +
        ' · système ' + g.systeme + '</p>' +
        '<p class="compat-result-note">' + g.note + '</p>' +
        '<div class="compat-result-actions">' +
        '<a class="btn btn-primary" href="#produits">Voir le produit</a>' +
        '<a class="btn btn-ghost" href="contact.html">Me faire installer</a>' +
        '</div>';
    }
    result.classList.add('show');
  }
})();
