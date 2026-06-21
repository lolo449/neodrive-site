
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

// ============================================================
// PANIER (Shop) — stockage en session, envoi vers le contact
// ============================================================
(function(){
  const panel = document.getElementById('cart-panel');
  if(!panel) return; // pas sur la page shop

  const KEY = 'neodrive-cart';
  const overlay = document.getElementById('cart-overlay');
  const countEl = document.getElementById('cart-count');
  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const footEl  = document.getElementById('cart-foot');
  const checkoutBtn = document.getElementById('cart-checkout');

  let cart = [];
  try { cart = JSON.parse(sessionStorage.getItem(KEY)) || []; } catch(e) { cart = []; }

  function save(){
    try { sessionStorage.setItem(KEY, JSON.stringify(cart)); } catch(e){}
  }

  function totalCount(){
    return cart.reduce((n, it)=> n + it.qty, 0);
  }

  function updateCount(){
    const n = totalCount();
    if(n > 0){ countEl.hidden = false; countEl.textContent = n; }
    else { countEl.hidden = true; }
  }

  function render(){
    itemsEl.innerHTML = '';
    if(cart.length === 0){
      emptyEl.style.display = 'block';
      footEl.hidden = true;
    } else {
      emptyEl.style.display = 'none';
      footEl.hidden = false;
      cart.forEach((it, i)=>{
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML =
          '<div class="cart-item-info">' +
            '<span class="cart-item-name">' + it.name + '</span>' +
            (it.price ? '<span class="cart-item-price">' + it.price + '</span>' : '') +
          '</div>' +
          '<div class="cart-item-qty">' +
            '<button aria-label="Diminuer" data-act="dec" data-i="' + i + '">−</button>' +
            '<span>' + it.qty + '</span>' +
            '<button aria-label="Augmenter" data-act="inc" data-i="' + i + '">+</button>' +
            '<button class="cart-item-remove" aria-label="Retirer" data-act="rm" data-i="' + i + '">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>' +
            '</button>' +
          '</div>';
        itemsEl.appendChild(row);
      });
    }
    updateCount();
    updateCheckoutLink();
  }

  function updateCheckoutLink(){
    // Prépare un message pré-rempli vers le formulaire de contact
    if(cart.length === 0){ checkoutBtn.href = 'contact.html'; return; }
    let lines = cart.map(it => '- ' + it.name + (it.price ? ' (' + it.price + ')' : '') + ' x' + it.qty);
    const msg = 'Bonjour, je souhaite commander :\n' + lines.join('\n') + '\n\nMerci de me recontacter pour finaliser.';
    checkoutBtn.href = 'contact.html?panier=' + encodeURIComponent(msg);
  }

  function addItem(name, price){
    const existing = cart.find(it => it.name === name);
    if(existing){ existing.qty += 1; }
    else { cart.push({ name: name, price: price, qty: 1 }); }
    save(); render(); openCart();
  }

  // Gestion des +/-/suppression dans le panneau
  itemsEl.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-act]');
    if(!btn) return;
    const i = parseInt(btn.getAttribute('data-i'), 10);
    const act = btn.getAttribute('data-act');
    if(act === 'inc') cart[i].qty += 1;
    else if(act === 'dec'){ cart[i].qty -= 1; if(cart[i].qty <= 0) cart.splice(i, 1); }
    else if(act === 'rm') cart.splice(i, 1);
    save(); render();
  });

  // Transforme chaque bouton produit en "Ajouter au panier"
  document.querySelectorAll('.product-card').forEach(card=>{
    const nameEl = card.querySelector('h4');
    const priceEl = card.querySelector('.product-price');
    const btn = card.querySelector('.product-buy .btn');
    if(!nameEl || !btn) return;
    btn.textContent = 'Ajouter au panier';
    btn.setAttribute('href', 'javascript:void(0)');
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const price = priceEl ? priceEl.textContent.trim() : '';
      addItem(nameEl.textContent.trim(), price);
    });
  });

  // Ouvre/ferme (exposées en global pour les onclick)
  window.openCart = function(){
    panel.classList.add('open');
    overlay.classList.add('show');
    panel.setAttribute('aria-hidden', 'false');
  };
  window.closeCart = function(){
    panel.classList.remove('open');
    overlay.classList.remove('show');
    panel.setAttribute('aria-hidden', 'true');
  };

  render();
})();

// Pré-remplissage du message de contact depuis le panier (?panier=...)
(function(){
  const ta = document.getElementById('message');
  if(!ta) return;
  const params = new URLSearchParams(window.location.search);
  const panier = params.get('panier');
  if(panier){
    ta.value = panier;
    ta.focus();
  }
})();
