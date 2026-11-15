/* Boussole calme — V1
 * Appli 100 % locale : toutes les données restent dans le navigateur de l'appareil (localStorage).
 */
(() => {
  'use strict';

  /* ================= Pictos (SVG maison, trait arrondi) ================= */
  const S = (body, vb = '0 0 64 64') =>
    `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

  const ICON = {
    compass: S('<circle cx="32" cy="32" r="24"/><path d="M32 12v4M32 48v4M12 32h4M48 32h4"/><path d="M32 22c-3.5-4-10-1.5-9 3.5.8 4 9 10 9 10s8.2-6 9-10c1-5-5.5-7.5-9-3.5z" fill="#E07A5F" stroke="#E07A5F"/><circle cx="32" cy="42" r="2.5" fill="currentColor"/>'),
    room: S('<path d="M18 56V12a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3v44"/><path d="M12 56h40"/><circle cx="39" cy="34" r="2" fill="currentColor"/><path d="M32 24c-2-2.6-6.5-1.2-6 1.8.4 2.5 6 6.2 6 6.2s5.6-3.7 6-6.2c.5-3-4-4.4-6-1.8z" fill="#E07A5F" stroke="#E07A5F" stroke-width="2"/>'),
    sun: S('<circle cx="32" cy="32" r="11" fill="#F2B84B" stroke="#C98A12"/><path d="M32 8v6M32 50v6M8 32h6M50 32h6M15 15l4 4M45 45l4 4M15 49l4-4M45 19l4-4" stroke="#C98A12"/>'),
    cloud: S('<path d="M20 46h26a9 9 0 0 0 0-18 13 13 0 0 0-25-2 10 10 0 0 0-1 20z" fill="#DDE6F3" stroke="#6C8EBF"/>'),
    storm: S('<path d="M20 38h26a9 9 0 0 0 0-18 13 13 0 0 0-25-2 10 10 0 0 0-1 20z" fill="#C9D3E3" stroke="#56709A"/><path d="M33 40l-6 10h7l-4 9" stroke="#E0A21B" stroke-width="3.6"/>'),
    tornado: S('<path d="M12 14h40M16 23h32M21 32h22M25 41h14M29 50h8M31 57h3" stroke="#9B7BB8" stroke-width="3.8"/>'),
    dragon: S('<path d="M22 26l-3-9 8 5M40 22l6-6-1 9" fill="#F8DDD3"/><ellipse cx="32" cy="38" rx="17" ry="15" fill="#BFE0CD" stroke="#4F8A6B"/><ellipse cx="32" cy="43" rx="9" ry="7" fill="#FCEBC7" stroke="#4F8A6B" stroke-width="2.4"/><circle cx="26" cy="33" r="2" fill="currentColor" stroke="none"/><circle cx="38" cy="33" r="2" fill="currentColor" stroke="none"/><path d="M29 38.5c1.8 1.4 4.2 1.4 6 0" stroke-width="2.4"/><path d="M15 36c-6-1-8 4-7 8 3-2 5-2 7-1" fill="#BFE0CD" stroke="#4F8A6B"/>'),
    chair: S('<path d="M20 10v26M44 10v26M20 18h24M20 26h24M16 36h32v6H16zM20 42v12M44 42v12"/>'),
    notebook: S('<rect x="16" y="8" width="34" height="48" rx="4"/><path d="M24 20h18M24 28h18M24 36h12M12 16h6M12 26h6M12 36h6M12 46h6"/>'),
    lock: S('<rect x="14" y="28" width="36" height="26" rx="5"/><path d="M22 28v-7a10 10 0 0 1 20 0v7"/><circle cx="32" cy="41" r="3" fill="currentColor"/>'),
    gear: S('<circle cx="32" cy="32" r="8"/><path d="M32 8v7M32 49v7M8 32h7M49 32h7M15 15l5 5M44 44l5 5M15 49l5-5M44 20l5-5"/>'),
    back: S('<path d="M38 14L20 32l18 18"/>'),
    close: S('<path d="M18 18l28 28M46 18L18 46"/>'),
    bell: S('<path d="M18 44V30a14 14 0 0 1 28 0v14l4 5H14z"/><path d="M27 54a5 5 0 0 0 10 0"/>'),
    glass: S('<path d="M18 10h28l-4 44H22z"/><path d="M20 28h24" /><path d="M21 30h22l-2 22H23z" fill="#DDE6F3" stroke="none"/>'),
    pillow: S('<path d="M12 22c0-6 4-8 8-6 8 3 16 3 24 0 4-2 8 0 8 6v20c0 6-4 8-8 6-8-3-16-3-24 0-4 2-8 0-8-6z" fill="#EBE2F3" stroke="#9B7BB8"/><path d="M24 30l4 4M36 30l4 4" stroke="#9B7BB8"/>'),
    eye: S('<path d="M6 32s10-16 26-16 26 16 26 16-10 16-26 16S6 32 6 32z"/><circle cx="32" cy="32" r="7" fill="#6C8EBF" stroke="#6C8EBF"/>'),
    hands: S('<path d="M22 54V30m0 0v-14a3 3 0 0 1 6 0v12m0-14a3 3 0 0 1 6 0v14m0-12a3 3 0 0 1 6 0v14m0-8a3 3 0 0 1 6 0v12c0 10-6 16-15 16h-2c-6 0-9-3-12-8l-6-10a3 3 0 0 1 5-3l6 6"/>'),
    star: S('<path d="M32 8l7 15 16 2-12 11 3 16-14-8-14 8 3-16L9 25l16-2z" fill="#FCEBC7" stroke="#C98A12"/>'),
    heart: S('<path d="M32 52S10 39 10 24c0-8 6-13 12-13 5 0 8 3 10 6 2-3 5-6 10-6 6 0 12 5 12 13 0 15-22 28-22 28z" fill="#F8DDD3" stroke="#E07A5F"/>'),
    talk: S('<path d="M10 14h30a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H24l-8 7v-7h-6a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4z" fill="#FCEBC7" stroke="#C98A12"/><path d="M48 26h6a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-4v7l-8-7H32a4 4 0 0 1-4-4v-4" stroke="#C98A12"/>'),
    feel: S('<circle cx="32" cy="32" r="22" fill="#FCEBC7" stroke="#C98A12"/><circle cx="25" cy="28" r="2.4" fill="currentColor" stroke="none"/><circle cx="39" cy="28" r="2.4" fill="currentColor" stroke="none"/><path d="M24 41c5-4 11-4 16 0"/>'),
    idea: S('<path d="M24 40c-4-3-7-7-7-13a15 15 0 0 1 30 0c0 6-3 10-7 13v6H24z" fill="#FCEBC7" stroke="#C98A12"/><path d="M26 52h12M28 57h8"/>'),
    repair: S('<path d="M40 10a10 10 0 0 0-9 14L12 43a5 5 0 0 0 7 7l19-19a10 10 0 0 0 14-9l-6 6-7-1-1-7z" fill="#DCEDE3" stroke="#4F8A6B"/>'),
    breath: S('<path d="M10 24h28a6 6 0 1 0-6-6M10 34h38a6 6 0 1 1-6 6M10 44h20"/>'),
    count: S('<rect x="10" y="10" width="44" height="44" rx="10"/><path d="M24 24l4-3v22M36 23h8l-6 8a5 5 0 1 1-4 8"/>'),
    plus: S('<path d="M32 14v36M14 32h36"/>'),
    check: S('<path d="M14 34l12 12 24-26"/>'),
    trash: S('<path d="M12 18h40M26 18v-6h12v6M17 18l3 36h24l3-36"/>'),
    download: S('<path d="M32 10v30M20 28l12 12 12-12M12 52h40"/>'),
    upload: S('<path d="M32 40V10M20 22l12-12 12 12M12 52h40"/>'),
    clock: S('<circle cx="32" cy="32" r="22"/><path d="M32 18v14l9 6"/>'),
    home: S('<path d="M10 30L32 12l22 18M16 26v26h32V26"/><path d="M27 52V38h10v14"/>'),
    run: S('<circle cx="38" cy="12" r="5"/><path d="M28 24l10-2 6 10 8 2M38 22l-6 14 8 8v12M32 36l-8 8-10-2"/>'),
    blocks: S('<rect x="10" y="38" width="20" height="16" rx="2"/><rect x="34" y="38" width="20" height="16" rx="2"/><rect x="22" y="20" width="20" height="16" rx="2"/><path d="M28 14h8"/>'),
    pencil: S('<path d="M44 10l10 10-28 28H16V38z"/><path d="M38 16l10 10M12 56h40"/>'),
    puzzle: S('<path d="M12 22h12a5 5 0 1 1 10 0h12v12a5 5 0 1 0 0 10v12H34a5 5 0 1 0-10 0H12V44a5 5 0 1 1 0-10z"/>'),
    wand: S('<path d="M14 50l26-26M36 20l8 8"/><path d="M46 8l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM20 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1zM52 34l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="currentColor"/>'),
    duo: S('<circle cx="22" cy="20" r="7"/><circle cx="44" cy="20" r="7"/><path d="M8 52c0-9 6-16 14-16s14 7 14 16M30 52c1-9 7-16 14-16 8 0 14 7 14 16"/>'),
    bag: S('<path d="M14 22h36l-3 32H17z"/><path d="M24 22v-4a8 8 0 0 1 16 0v4"/><path d="M24 34h16" />'),
    screen: S('<rect x="10" y="12" width="44" height="30" rx="4"/><path d="M24 52h16M32 42v10"/>'),
    dice: S('<rect x="12" y="12" width="40" height="40" rx="9"/><circle cx="24" cy="24" r="3" fill="currentColor"/><circle cx="40" cy="24" r="3" fill="currentColor"/><circle cx="32" cy="32" r="3" fill="currentColor"/><circle cx="24" cy="40" r="3" fill="currentColor"/><circle cx="40" cy="40" r="3" fill="currentColor"/>'),
    zzz: S('<path d="M14 18h14L14 34h14M36 30h10l-10 12h10M44 12h8l-8 9h8"/>'),
    basket: S('<path d="M8 26h48l-6 28H14z" fill="#DCEDE3" stroke="#4F8A6B"/><path d="M20 26l8-14M44 26l-8-14M22 36v10M32 36v10M42 36v10" stroke="#4F8A6B"/>'),
    shirt: S('<path d="M24 10l-14 8 5 11 6-3v28h22V26l6 3 5-11-14-8c-1 4-4 6-8 6s-7-2-8-6z" fill="#DDE6F3" stroke="#56709A"/>'),
    drop: S('<path d="M32 8C24 20 16 29 16 38a16 16 0 0 0 32 0c0-9-8-18-16-30z" fill="#EBE2F3" stroke="#9B7BB8"/><path d="M24 40a8 8 0 0 0 8 8" stroke="#9B7BB8"/>'),
    play: S('<rect x="8" y="14" width="48" height="36" rx="10" fill="#F8DDD3" stroke="#E07A5F"/><path d="M27 24l13 8-13 8z" fill="#E07A5F" stroke="#E07A5F"/>'),
    link: S('<path d="M28 36a10 10 0 0 0 14 0l8-8a10 10 0 0 0-14-14l-3 3"/><path d="M36 28a10 10 0 0 0-14 0l-8 8a10 10 0 0 0 14 14l3-3"/>'),
    waves: S('<path d="M6 32c5-9 11-9 16 0s11 9 16 0 11-9 16 0"/><path d="M6 18c5-7 11-7 16 0s11 7 16 0 11-7 16 0" opacity=".55"/><path d="M6 46c5-7 11-7 16 0s11 7 16 0 11-7 16 0" opacity=".55"/>'),
    up: S('<path d="M18 38l14-14 14 14"/>'),
    down: S('<path d="M18 26l14 14 14-14"/>'),
    timer: S('<circle cx="32" cy="36" r="20"/><path d="M32 36V24M26 8h12M32 8v8M48 18l4-4"/>')
  };

  /* ================= Données ================= */
  const KEY = 'boussole-calme.v1';
  const DEFAULT = () => ({
    settings: { crisisMin: 20, timeoutMin: 4, pin: null },
    crises: [],
    meteo: [],
    active: null,
    cards: [],
    ennui: [],
    screen: null
  });
  let db = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return DEFAULT();
      const d = JSON.parse(raw);
      const base = DEFAULT();
      return { ...base, ...d, settings: { ...base.settings, ...(d.settings || {}) } };
    } catch (e) { return DEFAULT(); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); }
    catch (e) { toast("Impossible d'enregistrer sur cet appareil."); }
  }
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const crisis = (id) => db.crises.find((c) => c.id === id);

  /* ================= Outils ================= */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const app = $('#app');
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad2 = (n) => String(n).padStart(2, '0');
  const mmss = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${pad2(s % 60)}`; };
  const fmtDate = (t) => new Date(t).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
  const fmtTime = (t) => new Date(t).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const fmtWhen = (t) => {
    const d = new Date(t), now = new Date();
    const tom = new Date(now); tom.setDate(now.getDate() + 1);
    if (d.toDateString() === now.toDateString()) return `aujourd'hui à ${fmtTime(t)}`;
    if (d.toDateString() === tom.toDateString()) return `demain à ${fmtTime(t)}`;
    return `${fmtDate(t)} à ${fmtTime(t)}`;
  };
  const minutes = (ms) => Math.max(1, Math.round(ms / 60000));
  let toastTimer;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
  }
  const go = (hash) => { if (location.hash === hash) render(); else location.hash = hash; };
  const unlocked = () => sessionStorage.getItem('bc-parent') === '1';

  const TRIGGERS = ['Un « non » / une frustration', "Arrêter un écran", 'Changer d’activité / partir', 'Devoirs', 'Dispute (fratrie, copains)', 'Fatigue', 'Faim', 'Trop de bruit / de monde', 'Grosse joie / excitation', 'Je ne sais pas'];
  const PLACES = ['Maison', 'École', 'Voiture', 'Dehors', 'Chez quelqu’un'];
  const REPAIRS = ['Faire un dessin', 'Ranger ensemble', 'Réparer à deux', 'Un mot d’excuse illustré', 'Rendre un service', 'Recoller / remettre en place'];
  const GESTURES = ['Un câlin', 'Une histoire', 'Un jeu ensemble', 'Un bisou', 'Un goûter partagé'];

  /* ================= Timer (crise / temps mort) ================= */
  let tick = null;
  function stopTick() { if (tick) { clearInterval(tick); tick = null; } }

  function ringSVG(color) {
    const r = 120, c = 2 * Math.PI * r;
    return `<svg class="ring" viewBox="0 0 280 280"><circle class="track" cx="140" cy="140" r="${r}"/><circle class="prog" cx="140" cy="140" r="${r}" stroke="${color}" stroke-dasharray="${c}" stroke-dashoffset="0"/></svg>`;
  }
  function updateRing(el, frac) {
    const prog = $('.prog', el); if (!prog) return;
    const c = 2 * Math.PI * 120;
    prog.style.strokeDashoffset = String(c * (1 - Math.max(0, Math.min(1, frac))));
  }
  function runTimer(onDone) {
    stopTick();
    const step = () => {
      const a = db.active; if (!a) return stopTick();
      const left = a.start + a.durationMs - Date.now();
      const el = $('.timer');
      if (el) { updateRing(el, left / a.durationMs); const t = $('.time', el); if (t) t.textContent = mmss(left); }
      if (left <= 0) { stopTick(); onDone(); }
    };
    step();
    tick = setInterval(step, 500);
  }
  function vibrate(p) { try { navigator.vibrate && navigator.vibrate(p); } catch (e) { /* rien */ } }

  /* ================= Notifications / rappels ================= */
  let swReg = null;
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').then((r) => { swReg = r; }).catch(() => {});
    });
  }
  async function askNotif() {
    if (!('Notification' in window)) return 'unsupported';
    if (Notification.permission === 'default') {
      try { return await Notification.requestPermission(); } catch (e) { return 'denied'; }
    }
    return Notification.permission;
  }
  async function notify(title, body, url) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    const opts = { body, icon: 'icon-192.png', badge: 'icon-192.png', tag: url, data: { url } };
    try {
      const reg = swReg || (navigator.serviceWorker && await navigator.serviceWorker.getRegistration());
      if (reg) return reg.showNotification(title, opts);
      new Notification(title, opts);
    } catch (e) { /* rien */ }
  }
  const pendingTalks = () => db.crises.filter((c) => c.reminderAt && !(c.talk && c.talk.done));
  const dueTalks = () => pendingTalks().filter((c) => c.reminderAt <= Date.now());
  function checkReminders() {
    let changed = false;
    for (const c of dueTalks()) {
      if (!c.notified) {
        c.notified = true; changed = true;
        notify('Un moment pour en reparler', `La crise de ${fmtTime(c.start)} : c'est le bon moment pour en parler à froid.`, `./#/froid/${c.id}`);
      }
    }
    if (changed) { save(); if (location.hash === '' || location.hash === '#/') render(); }
  }
  setInterval(checkReminders, 30000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) checkReminders(); });

  /* ================= Rendu / routes ================= */
  function topbar(title, back = '#/', extra = '') {
    return `<div class="topbar"><a class="iconbtn" href="${back}" aria-label="Retour">${ICON.back}</a><h2>${title}</h2>${extra}</div>`;
  }

  const routes = [
    [/^#?\/?$/, viewHome],
    [/^#\/crise$/, viewCrisis],
    [/^#\/crise\/fin\/(\w+)$/, viewCrisisEnd],
    [/^#\/tm$/, viewTimeoutSetup],
    [/^#\/tm\/go$/, viewTimeout],
    [/^#\/meteo$/, viewMeteo],
    [/^#\/calme$/, viewCalm],
    [/^#\/calme\/dragon$/, viewDragon],
    [/^#\/calme\/sens$/, viewSenses],
    [/^#\/calme\/coussin$/, viewPillow],
    [/^#\/calme\/eau$/, viewWater],
    [/^#\/calme\/compter$/, viewCount],
    [/^#\/froid\/(\w+)$/, viewTalk],
    [/^#\/ennui$/, viewEnnui],
    [/^#\/minuteur$/, viewVTimer],
    [/^#\/bruit$/, viewNoise],
    [/^#\/etoiles$/, viewStars],
    [/^#\/expliquer$/, viewExplain],
    [/^#\/fiches$/, viewFiches],
    [/^#\/ranger$/, () => go('#/r/ranger')],
    [/^#\/r\/(ranger|habiller|toilette|devoirs)$/, viewRoutine],
    [/^#\/r\/(ranger|habiller|toilette|devoirs)\/go$/, viewRoutineGo],
    [/^#\/r\/(ranger|habiller|toilette|devoirs)\/liste$/, guard(viewRoutineEdit)],
    [/^#\/ennui\/pioche(?:\/(\w+))?$/, viewPioche],
    [/^#\/ennui\/duo$/, viewDuo],
    [/^#\/ennui\/reve$/, viewReve],
    [/^#\/ennui\/attente$/, viewAttente],
    [/^#\/ennui\/cartes$/, viewCards],
    [/^#\/ennui\/ecran$/, viewScreen],
    [/^#\/parent$/, viewPin],
    [/^#\/parent\/journal$/, guard(viewJournal)],
    [/^#\/parent\/crise\/(\w+)$/, guard(viewEntry)],
    [/^#\/parent\/reglages$/, guard(viewSettings)]
  ];
  function guard(fn) {
    return (...args) => {
      if (unlocked()) return fn(...args);
      sessionStorage.setItem('bc-after', location.hash);
      go('#/parent');
    };
  }

  let cleanup = null;
  function render() {
    stopTick();
    if (cleanup) { try { cleanup(); } catch (e) { /* rien */ } cleanup = null; }
    closeSheet();
    const h = location.hash || '#/';
    // Un minuteur est en cours : on y revient d'office.
    if (db.active && !/^#\/(crise|tm\/go)/.test(h) && !/^#\/crise\/fin/.test(h)) {
      if (db.active.type === 'crise' && h !== '#/crise') return go('#/crise');
      if (db.active.type === 'tm' && h !== '#/tm/go') return go('#/tm/go');
    }
    for (const [re, fn] of routes) {
      const m = h.match(re);
      if (m) { fn(...m.slice(1)); window.scrollTo(0, 0); return; }
    }
    go('#/');
  }
  window.addEventListener('hashchange', render);

  /* ---------- Accueil ---------- */
  function viewHome() {
    const due = dueTalks();
    const banner = due.length ? `
      <a class="banner" href="#/froid/${due[0].id}">
        ${ICON.talk}
        <div><strong>Un moment pour en reparler</strong><span>${due.length > 1 ? `${due.length} discussions à froid en attente` : `Crise de ${fmtWhen(due[0].start)}`} — à faire ensemble</span></div>
      </a>` : '';
    app.innerHTML = `
      <div class="topbar">
        <div class="brand">${ICON.compass}<div><h1 style="font-size:1.55rem">Boussole calme</h1><small>Pour traverser les tempêtes</small></div></div>
        <a class="starpill" href="#/etoiles" aria-label="Mes étoiles">★ ${starsSince(startOf('day'))}<small>aujourd’hui</small></a>
      </div>
      ${banner}
      <a class="tile big bg-sky" href="#/crise" id="startCrisis">
        <div class="pic c-sky">${ICON.room}</div>
        <div class="txt"><strong>Mon temps pour me calmer</strong><span>Je vais dans ma chambre</span></div>
      </a>
      <div class="grid2">
        <a class="tile bg-sun" href="#/meteo"><div class="pic">${ICON.storm}</div><div class="txt"><strong>Ma météo</strong></div></a>
        <a class="tile bg-sage" href="#/calme"><div class="pic">${ICON.dragon}</div><div class="txt"><strong>Ma boîte pour me calmer</strong></div></a>
      </div>
      <a class="tile bg-plum" href="#/ennui">
        <div class="pic c-plum">${ICON.puzzle}</div>
        <div class="txt"><strong>Je m’ennuie</strong><span>Je trouve une idée</span></div>
      </a>
      ${timerBanner()}${noiseBanner()}
      <div class="grid2">
        <a class="tile bg-sun" href="#/minuteur"><div class="pic c-terra">${ICON.timer}</div><div class="txt"><strong>Mon minuteur</strong></div></a>
        <a class="tile bg-sky" href="#/bruit"><div class="pic c-sky">${ICON.waves}</div><div class="txt"><strong>Mon bruit blanc</strong></div></a>
      </div>
      <div class="grid2">
        <a class="tile bg-sage" href="#/r/ranger"><div class="pic c-sage">${ICON.basket}</div><div class="txt"><strong>Je range ma chambre</strong></div></a>
        <a class="tile bg-sky" href="#/r/habiller"><div class="pic c-sky">${ICON.shirt}</div><div class="txt"><strong>Je m’habille</strong></div></a>
      </div>
      <div class="grid2">
        <a class="tile bg-plum" href="#/r/toilette"><div class="pic c-plum">${ICON.drop}</div><div class="txt"><strong>Ma toilette</strong></div></a>
        <a class="tile bg-sun" href="#/r/devoirs"><div class="pic c-sun">${ICON.pencil}</div><div class="txt"><strong>Mes devoirs</strong></div></a>
      </div>
      <div class="section-title">Pour le parent</div>
      ${screenBanner()}
      <div class="parentrow" style="grid-template-columns:repeat(4,1fr)">
        <a class="mini" href="#/tm">${ICON.chair}Temps mort</a>
        <a class="mini" href="#/ennui/ecran">${ICON.screen}Écrans</a>
        <a class="mini" href="#/parent/journal">${ICON.notebook}Journal</a>
        <a class="mini" href="#/parent/reglages">${ICON.gear}Réglages</a>
      </div>
      <a class="tile bg-stone" href="#/expliquer" style="margin-top:12px">
        <div class="pic c-sun">${ICON.idea}</div>
        <div class="txt"><strong>Expliquer le TDAH à mon enfant</strong><span>Repères, vidéos et lectures</span></div>
      </a>
      <a class="tile bg-stone" href="#/fiches">
        <div class="pic c-sky">${ICON.notebook}</div>
        <div class="txt"><strong>Fiches pour le parent</strong><span>Devoirs, opposition, sommeil, école, aides</span></div>
      </a>
      <div class="spacer"></div>
      <p class="center muted small" style="margin-top:22px">Tout reste sur cet appareil.</p>`;
    $('#startCrisis').addEventListener('click', (e) => { e.preventDefault(); startCrisis(); });
  }

  /* ---------- Crise ---------- */
  function startCrisis() {
    const c = { id: uid(), start: Date.now(), end: null, triggers: [], place: '', intensity: 0, note: '', reminderAt: null, notified: false, talk: null };
    db.crises.unshift(c);
    db.active = { type: 'crise', start: c.start, durationMs: db.settings.crisisMin * 60000, crisisId: c.id };
    save();
    go('#/crise');
  }

  function viewCrisis() {
    const a = db.active;
    if (!a || a.type !== 'crise') return go('#/');
    const c = crisis(a.crisisId);
    app.innerHTML = `
      <div class="calmtitle">
        <h1>Mon temps pour me calmer</h1>
        <p>Je suis dans ma chambre. La tempête va passer.</p>
      </div>
      <div class="timerwrap">
        <div class="timer">${ringSVG('#6C8EBF')}<div class="inner"><div class="c-sky breathe">${ICON.room}</div><div class="time">${mmss(a.durationMs)}</div></div></div>
      </div>
      <div class="stack">
        <button class="btn soft block" id="forParent">${ICON.lock} Pour le parent</button>
        <button class="btn soft block" id="noteBtn">${ICON.notebook} ${c && c.note || (c && c.triggers.length) ? 'Modifier la note' : 'Noter la crise'}</button>
        <button class="btn ghost" id="calmNow">Il est déjà calme — terminer</button>
      </div>`;
    runTimer(() => { vibrate([200, 120, 200]); finishCrisis(); });
    $('#forParent').addEventListener('click', parentSheet);
    $('#noteBtn').addEventListener('click', () => noteSheet(a.crisisId));
    $('#calmNow').addEventListener('click', finishCrisis);
  }

  function finishCrisis() {
    const a = db.active; if (!a) return go('#/');
    const c = crisis(a.crisisId);
    if (c) c.end = Math.min(Date.now(), a.start + a.durationMs);
    db.active = null; save();
    go(`#/crise/fin/${a.crisisId}`);
  }

  function parentSheet() {
    openSheet(`
      <h2>Pendant la crise</h2>
      <div class="parentcard" style="margin-top:12px">
        <ol>
          <li>Je reste calme.<span>Respirer lentement. Ma voix basse et posée.</span></li>
          <li>Je n’argumente pas.<span>Pendant la tempête, il ne peut pas entendre : pas de raisonnement, pas de négociation, pas de menace.</span></li>
          <li>J’interviens le moins possible.<span>Chaque échange remet du bois dans le feu. Je reste disponible, à distance.</span></li>
          <li>Je le laisse revenir seul.<span>Dans sa chambre, même s’il crie, il est en train de se calmer : je ne coupe pas ce retour.</span></li>
          <li>On en reparlera à froid.<span>Plus tard, quand tout le monde est calme. Pas de punition à chaud.</span></li>
        </ol>
      </div>
      <p class="small muted">Une crise dure souvent 15 à 20 minutes. Si quelqu’un est en danger, la sécurité passe avant tout.</p>
      <button class="btn block" data-close>J’ai compris</button>`);
  }

  function noteSheet(id, after) {
    const c = crisis(id); if (!c) return;
    const sel = new Set(c.triggers);
    let place = c.place, intensity = c.intensity;
    openSheet(`
      <h2>Noter la crise</h2>
      <p class="muted small">Pour y revenir à froid et repérer ce qui revient souvent.</p>
      <label class="lab">Qu’est-ce qui l’a déclenchée ?</label>
      <div class="chips" id="trig">${TRIGGERS.map((t) => `<button class="chip" aria-pressed="${sel.has(t)}" data-v="${esc(t)}">${esc(t)}</button>`).join('')}</div>
      <label class="lab">Où ?</label>
      <div class="chips" id="place">${PLACES.map((p) => `<button class="chip" aria-pressed="${p === place}" data-v="${esc(p)}">${esc(p)}</button>`).join('')}</div>
      <label class="lab">Intensité</label>
      <div class="scale" id="int">${[1, 2, 3, 4, 5].map((n) => `<button aria-pressed="${n === intensity}" data-v="${n}">${n}</button>`).join('')}</div>
      <label class="lab" for="note">Ce qui s’est passé</label>
      <textarea id="note" placeholder="Ce qui s’est passé juste avant, ce qu’il a dit…">${esc(c.note)}</textarea>
      <div class="row" style="margin-top:16px"><button class="btn soft" data-close>Annuler</button><button class="btn terra" id="saveNote">Enregistrer</button></div>`);
    const sh = $('.sheet');
    $$('#trig .chip', sh).forEach((b) => b.addEventListener('click', () => {
      const v = b.dataset.v; sel.has(v) ? sel.delete(v) : sel.add(v); b.setAttribute('aria-pressed', sel.has(v));
    }));
    $$('#place .chip', sh).forEach((b) => b.addEventListener('click', () => {
      place = place === b.dataset.v ? '' : b.dataset.v;
      $$('#place .chip', sh).forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === place));
    }));
    $$('#int button', sh).forEach((b) => b.addEventListener('click', () => {
      intensity = Number(b.dataset.v);
      $$('#int button', sh).forEach((x) => x.setAttribute('aria-pressed', Number(x.dataset.v) === intensity));
    }));
    $('#saveNote', sh).addEventListener('click', () => {
      c.triggers = Array.from(sel); c.place = place; c.intensity = intensity; c.note = $('#note', sh).value.trim();
      save(); closeSheet(); toast('Note enregistrée');
      if (after) after(); else if (location.hash === '#/crise') { const b = $('#noteBtn'); if (b) b.innerHTML = `${ICON.notebook} Modifier la note`; }
    });
  }

  function reminderOptions() {
    const now = new Date();
    const opts = [{ label: 'Dans 1 heure', at: Date.now() + 3600000 }];
    if (now.getHours() < 18) { const t = new Date(now); t.setHours(19, 0, 0, 0); opts.push({ label: 'Ce soir à 19 h', at: t.getTime() }); }
    const tm = new Date(now); tm.setDate(now.getDate() + 1); tm.setHours(17, 0, 0, 0);
    opts.push({ label: 'Demain à 17 h', at: tm.getTime() });
    return opts;
  }

  function viewCrisisEnd(id) {
    const c = crisis(id); if (!c) return go('#/');
    app.innerHTML = `
      <div class="calmtitle" style="margin-top:8px">
        <div class="c-sage" style="width:110px;margin:0 auto">${ICON.check}</div>
        <h1>La tempête est passée ?</h1>
        <p>Le temps pour se calmer est terminé.</p>
      </div>
      <div class="card cut" id="step1">
        <h3 class="center" style="margin-bottom:12px">Il est revenu au calme ?</h3>
        <div class="stack">
          <button class="btn sage block" id="yes">Oui, il est calme</button>
          <button class="btn soft block" id="more">Pas encore — 5 minutes de plus</button>
        </div>
      </div>
      <div class="card cut" id="step2" hidden>
        <h3 style="margin-bottom:4px">Quand en reparler à froid ?</h3>
        <p class="muted small" style="margin-bottom:12px">Quand tout le monde est reposé. Je vous enverrai un rappel.</p>
        <div class="stack">
          ${reminderOptions().map((o) => `<button class="btn soft block" data-at="${o.at}">${ICON.clock} ${o.label}</button>`).join('')}
          <button class="btn sun block" id="now">${ICON.talk} On est prêts maintenant</button>
        </div>
      </div>
      <div class="stack">
        <button class="btn soft block" id="noteBtn">${ICON.notebook} ${c.note || c.triggers.length ? 'Modifier la note' : 'Noter la crise'}</button>
        <a class="btn ghost" href="#/">Plus tard</a>
      </div>`;
    $('#yes').addEventListener('click', () => { $('#step1').hidden = true; $('#step2').hidden = false; });
    $('#more').addEventListener('click', () => {
      db.active = { type: 'crise', start: Date.now(), durationMs: 5 * 60000, crisisId: c.id };
      c.end = null; save(); go('#/crise');
    });
    $$('#step2 [data-at]').forEach((b) => b.addEventListener('click', async () => {
      c.reminderAt = Number(b.dataset.at); c.notified = false; save();
      if (!c.note && !c.triggers.length) noteSheet(c.id, () => go('#/')); else go('#/');
      askNotif().then((p) => toast(p === 'granted' ? `Rappel prévu ${fmtWhen(c.reminderAt)}` : `Prévu ${fmtWhen(c.reminderAt)} — visible à l’ouverture de l’appli`));
    }));
    $('#now').addEventListener('click', () => { c.reminderAt = Date.now(); c.notified = true; save(); go(`#/froid/${c.id}`); });
    $('#noteBtn').addEventListener('click', () => noteSheet(c.id, () => render()));
  }

  /* ---------- Temps mort ---------- */
  function viewTimeoutSetup() {
    let min = db.settings.timeoutMin;
    app.innerHTML = `
      ${topbar('Temps mort')}
      <div class="card cut">
        <div class="center c-stone" style="width:84px;margin:0 auto 6px">${ICON.chair}</div>
        <p class="center" style="font-weight:700">Pour un comportement inacceptable (manque de respect, mise en danger). Pas pour une crise d’émotions : pour ça, il y a « Mon temps pour me calmer ».</p>
      </div>
      <div class="card">
        <h3>Avant de commencer</h3>
        <ul style="margin:8px 0 0;padding-left:1.2rem">
          <li>Un endroit proche, où on le voit, mais sans rien d’intéressant (marche d’escalier, chaise du couloir).</li>
          <li>Personne ne lui parle pendant le temps mort, ni les parents ni les frères et sœurs.</li>
          <li>S’il se lève, le compte repart du début.</li>
          <li>Les premières fois peuvent être longues : prévoir du temps et de la patience.</li>
        </ul>
      </div>
      <label class="lab">Durée</label>
      <div class="scale" id="dur">${[3, 4, 5].map((n) => `<button aria-pressed="${n === min}" data-v="${n}">${n} min</button>`).join('')}</div>
      <button class="btn block" style="margin-top:18px" id="go">${ICON.chair} Lancer le temps mort</button>`;
    $$('#dur button').forEach((b) => b.addEventListener('click', () => {
      min = Number(b.dataset.v); $$('#dur button').forEach((x) => x.setAttribute('aria-pressed', Number(x.dataset.v) === min));
    }));
    $('#go').addEventListener('click', () => {
      db.active = { type: 'tm', start: Date.now(), durationMs: min * 60000, restarts: 0 };
      save(); go('#/tm/go');
    });
  }

  function viewTimeout() {
    const a = db.active;
    if (!a || a.type !== 'tm') return go('#/tm');
    app.innerHTML = `
      <div class="calmtitle"><h1>Temps mort</h1><p>On ne parle pas. On attend la fin du cercle.</p></div>
      <div class="timerwrap">
        <div class="timer">${ringSVG('#B7A99A')}<div class="inner"><div class="c-stone">${ICON.chair}</div><div class="time">${mmss(a.durationMs)}</div></div></div>
        <p class="muted small" id="restarts">${a.restarts ? `Recommencé ${a.restarts} fois` : '&nbsp;'}</p>
      </div>
      <div class="stack">
        <button class="btn terra block" id="restart">Il s’est levé — on recommence</button>
        <button class="btn ghost" id="stop">Arrêter</button>
      </div>`;
    const done = () => {
      vibrate([150]);
      db.active = null; save();
      app.innerHTML = `
        <div class="calmtitle" style="margin-top:40px">
          <div class="c-sage" style="width:110px;margin:0 auto">${ICON.check}</div>
          <h1>Temps mort terminé</h1>
          <p>On peut reprendre. Pas de sermon : on passe à la suite, et on félicite le prochain bon comportement.</p>
        </div>
        <a class="btn block" href="#/" style="margin-top:20px">${ICON.home} Retour à l’accueil</a>`;
    };
    runTimer(done);
    $('#restart').addEventListener('click', () => {
      a.start = Date.now(); a.restarts = (a.restarts || 0) + 1; save();
      $('#restarts').textContent = `Recommencé ${a.restarts} fois`;
      runTimer(done);
    });
    $('#stop').addEventListener('click', () => { db.active = null; save(); go('#/'); });
  }

  /* ---------- Météo ---------- */
  const WEATHER = {
    soleil: { label: 'Soleil', icon: 'sun', cls: 'bg-sun', msg: 'Super ! Ton ciel est tout bleu. Profite de ce moment.', act: '' },
    nuage: { label: 'Nuage', icon: 'cloud', cls: 'bg-sky', msg: 'Un petit nuage passe. Tu veux essayer un outil pour que le soleil revienne ?', act: 'calme' },
    orage: { label: 'Orage', icon: 'storm', cls: 'bg-stone', msg: 'Ça gronde à l’intérieur. Choisis un outil pour te calmer, ou demande de l’aide.', act: 'tools' },
    tornade: { label: 'Tornade', icon: 'tornado', cls: 'bg-plum', msg: 'C’est la tempête ! Va dans ton coin calme, le temps qu’elle passe.', act: 'crise' }
  };
  function viewMeteo() {
    app.innerHTML = `
      ${topbar('Ma météo')}
      <p class="center" style="font-weight:800;font-size:1.15rem;margin:0 0 14px">Quel temps fait-il dans mon cœur ?</p>
      <div class="weather">${Object.entries(WEATHER).map(([k, w]) => `<button class="${w.cls}" data-k="${k}" aria-pressed="false">${ICON[w.icon]}<strong>${w.label}</strong></button>`).join('')}</div>
      <div id="answer" style="margin-top:16px"></div>`;
    $$('.weather button').forEach((b) => b.addEventListener('click', () => {
      const k = b.dataset.k, w = WEATHER[k];
      $$('.weather button').forEach((x) => x.setAttribute('aria-pressed', x === b));
      db.meteo.unshift({ at: Date.now(), value: k }); db.meteo = db.meteo.slice(0, 500); save();
      let actions = '';
      if (w.act === 'calme') actions = `<a class="btn sage block" href="#/calme">${ICON.dragon} Ma boîte pour me calmer</a>`;
      if (w.act === 'tools') actions = `
        <div class="stack">
          <a class="btn sage block" href="#/calme/dragon">${ICON.breath} La respiration du dragon</a>
          <a class="btn soft block" href="#/calme/coussin">${ICON.pillow} Serrer mon coussin</a>
          <a class="btn soft block" href="#/calme">Voir tous les outils</a>
        </div>`;
      if (w.act === 'crise') actions = `<button class="btn sky block" id="toCrisis">${ICON.room} Mon temps pour me calmer</button>`;
      $('#answer').innerHTML = `<div class="card cut"><p style="font-weight:800;font-size:1.1rem;margin:0 0 ${actions ? 12 : 0}px">${w.msg}</p>${actions}</div>`;
      const tc = $('#toCrisis'); if (tc) tc.addEventListener('click', startCrisis);
    }));
  }

  /* ---------- Boîte pour se calmer ---------- */
  function viewCalm() {
    app.innerHTML = `
      ${topbar('Ma boîte pour me calmer')}
      <a class="tile bg-sage" href="#/calme/dragon"><div class="pic">${ICON.dragon}</div><div class="txt"><strong>La respiration du dragon</strong><span>Gonfler le ventre, souffler le feu</span></div></a>
      <a class="tile bg-sky" href="#/calme/sens"><div class="pic c-sky">${ICON.eye}</div><div class="txt"><strong>5 choses que je vois</strong><span>Je regarde autour de moi</span></div></a>
      <a class="tile bg-plum" href="#/calme/coussin"><div class="pic">${ICON.pillow}</div><div class="txt"><strong>Serrer mon coussin</strong><span>Fort… puis je relâche</span></div></a>
      <a class="tile bg-sun" href="#/calme/compter"><div class="pic c-sun">${ICON.count}</div><div class="txt"><strong>Compter jusqu’à 10</strong><span>Tout doucement</span></div></a>
      <a class="tile bg-sky" href="#/bruit"><div class="pic c-sky">${ICON.waves}</div><div class="txt"><strong>Mon bruit blanc</strong><span>Un son doux qui couvre les bruits</span></div></a>
      <a class="tile bg-stone" href="#/calme/eau"><div class="pic c-sky">${ICON.glass}</div><div class="txt"><strong>Boire un verre d’eau</strong><span>Petite gorgée par petite gorgée</span></div></a>`;
  }

  const DRAGON_BIG = `
    <svg viewBox="0 0 260 200" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <g class="flame">
        <path d="M196 92c18-8 34-4 50 2-14 4-14 10-2 14-16 6-34 6-48-2" fill="#F2B84B" stroke="#E07A5F" stroke-width="3"/>
        <path d="M200 96c10-3 20-2 28 1-8 3-8 6-1 8-9 3-19 2-27-2" fill="#F8DDD3" stroke="none"/>
      </g>
      <path d="M60 130c-30 0-46 20-40 46 10-12 22-16 34-14" fill="#BFE0CD" stroke="#4F8A6B" stroke-width="4"/>
      <path d="M86 66L72 34l26 20M150 56l14-28 2 32" fill="#F8DDD3" stroke="#4F8A6B" stroke-width="4"/>
      <path d="M70 92c-26-14-46-6-52 10 14-4 28 0 40 10" fill="#DCEDE3" stroke="#4F8A6B" stroke-width="4"/>
      <ellipse cx="120" cy="118" rx="70" ry="62" fill="#BFE0CD" stroke="#4F8A6B" stroke-width="4"/>
      <ellipse class="dragon-belly" cx="118" cy="138" rx="36" ry="30" fill="#FCEBC7" stroke="#4F8A6B" stroke-width="3"/>
      <circle cx="100" cy="96" r="7" fill="#3B2F2A"/><circle cx="148" cy="96" r="7" fill="#3B2F2A"/>
      <circle cx="102" cy="94" r="2" fill="#fff"/><circle cx="150" cy="94" r="2" fill="#fff"/>
      <circle cx="176" cy="104" r="3" fill="#4F8A6B"/><circle cx="186" cy="100" r="3" fill="#4F8A6B"/>
      <path d="M112 112c7 5 17 5 24 0" stroke="#3B2F2A" stroke-width="4"/>
      <circle cx="88" cy="112" r="7" fill="#F8DDD3"/><circle cx="160" cy="112" r="7" fill="#F8DDD3"/>
    </svg>`;

  function viewDragon() {
    const CYCLES = 5;
    app.innerHTML = `
      ${topbar('La respiration du dragon', '#/calme')}
      <div class="dragon-stage" id="stage">${DRAGON_BIG}</div>
      <div class="phase" id="phase">Prêt ?</div>
      <div class="dots" id="dots">${Array.from({ length: CYCLES }, () => '<i></i>').join('')}</div>
      <div class="stack" style="margin-top:18px"><button class="btn sage block" id="startB">${ICON.breath} On commence</button></div>`;
    let timers = [];
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    cleanup = clear;
    $('#startB').addEventListener('click', () => {
      clear();
      const stage = $('#stage'), phase = $('#phase'), dots = $$('#dots i');
      dots.forEach((d) => d.classList.remove('on'));
      $('#startB').hidden = true;
      let i = 0;
      const cycle = () => {
        if (i >= CYCLES) {
          stage.className = 'dragon-stage'; phase.textContent = 'Bravo, petit dragon ! Comment te sens-tu ?';
          $('#startB').hidden = false; $('#startB').innerHTML = `${ICON.breath} Encore une fois`;
          return;
        }
        stage.className = 'dragon-stage inhale'; phase.textContent = 'Je gonfle mon ventre… (par le nez)';
        timers.push(setTimeout(() => {
          stage.className = 'dragon-stage exhale'; phase.textContent = 'Je souffle le feu tout doucement…';
          timers.push(setTimeout(() => { dots[i].classList.add('on'); i++; cycle(); }, 6000));
        }, 4000));
      };
      cycle();
    });
  }

  function viewSenses() {
    let n = 5;
    const draw = () => {
      app.innerHTML = `
        ${topbar('5 choses que je vois', '#/calme')}
        <div class="card cut senses">
          <div class="c-sky" style="width:80px">${ICON.eye}</div>
          ${n > 0 ? `
            <div class="bignum">${n}</div>
            <p style="font-weight:800;font-size:1.15rem;text-align:center">Trouve ${n} chose${n > 1 ? 's' : ''} que tu vois autour de toi.<br><span class="muted small">Dis-les à voix haute ou dans ta tête, puis touche un rond pour chacune.</span></p>
            <div class="taps">${Array.from({ length: n }, (_, k) => `<button data-k="${k}" aria-label="Trouvé">${k + 1}</button>`).join('')}</div>` : `
            <div class="bignum">🙂</div>
            <p style="font-weight:800;font-size:1.15rem;text-align:center">Tu as bien regardé ! Ton cerveau s’est posé sur le moment présent.</p>
            <button class="btn sky" id="again">Recommencer</button>`}
        </div>`;
      if (n > 0) {
        let found = 0;
        $$('.taps button').forEach((b) => b.addEventListener('click', () => {
          if (b.classList.contains('on')) return;
          b.classList.add('on'); found++;
          if (found === n) setTimeout(() => { n = 0; draw(); }, 500);
        }));
      } else $('#again').addEventListener('click', () => { n = 5; draw(); });
    };
    draw();
  }

  function viewPillow() {
    app.innerHTML = `
      ${topbar('Serrer mon coussin', '#/calme')}
      <div class="card cut center">
        <div id="pil" style="width:150px;margin:0 auto;transition:transform .6s ease">${ICON.pillow}</div>
        <div class="phase" id="phase">Prends ton coussin (ou une peluche)</div>
        <div class="dots" id="dots"><i></i><i></i><i></i></div>
        <button class="btn block" style="margin-top:16px;background:var(--plum)" id="go">On y va</button>
      </div>`;
    let timers = [];
    cleanup = () => timers.forEach(clearTimeout);
    $('#go').addEventListener('click', () => {
      timers.forEach(clearTimeout); timers = [];
      const pil = $('#pil'), phase = $('#phase'), dots = $$('#dots i'); $('#go').hidden = true;
      dots.forEach((d) => d.classList.remove('on'));
      let i = 0;
      const round = () => {
        if (i >= 3) { phase.textContent = 'Tes muscles sont tout mous. Bravo !'; pil.style.transform = ''; $('#go').hidden = false; $('#go').textContent = 'Encore'; return; }
        phase.textContent = 'Serre fort, fort, fort ! (5 secondes)'; pil.style.transform = 'scale(.75, .85)';
        timers.push(setTimeout(() => {
          phase.textContent = 'Et… relâche tout doucement'; pil.style.transform = 'scale(1)';
          timers.push(setTimeout(() => { dots[i].classList.add('on'); i++; round(); }, 5000));
        }, 5000));
      };
      round();
    });
  }

  function viewWater() {
    app.innerHTML = `
      ${topbar('Boire un verre d’eau', '#/calme')}
      <div class="card cut center">
        <div class="c-sky" style="width:130px;margin:0 auto">${ICON.glass}</div>
        <h2 style="margin:8px 0">Un verre d’eau fraîche</h2>
        <p style="font-weight:700">Je vais chercher un verre d’eau.<br>Je bois une petite gorgée… je sens l’eau fraîche descendre.<br>Encore une. Et encore une.</p>
        <p class="muted small">Faire quelque chose avec son corps aide la tempête à se calmer.</p>
      </div>
      <a class="btn soft block" href="#/calme">Choisir un autre outil</a>`;
  }

  function viewCount() {
    let k = 0;
    app.innerHTML = `
      ${topbar('Compter jusqu’à 10', '#/calme')}
      <div class="card cut center">
        <p style="font-weight:800">Touche le grand rond à chaque nombre, tout doucement, en respirant.</p>
        <button id="cnt" style="width:200px;height:200px;border-radius:50%;border:0;background:var(--sun-soft);box-shadow:var(--shadow);margin:14px auto;display:grid;place-items:center" aria-label="Compter"><span class="bignum" id="num">1</span></button>
        <p class="muted small" id="msg">&nbsp;</p>
      </div>`;
    const num = $('#num'), msg = $('#msg');
    let last = 0;
    $('#cnt').addEventListener('click', () => {
      if (k >= 10) { k = 0; num.textContent = '1'; msg.innerHTML = '&nbsp;'; return; }
      const now = Date.now();
      if (now - last < 900 && k > 0) { msg.textContent = 'Plus lentement… comme un escargot 🐌'; return; }
      last = now; k++;
      num.textContent = k < 10 ? String(k + 1) : '10';
      msg.textContent = k < 10 ? `${k}… j’inspire, j’expire` : 'Bravo ! Touche pour recommencer.';
    });
  }

  /* ---------- Discussion à froid ---------- */
  const TALK = [
    { key: 'q1', icon: 'talk', title: 'Qu’est-ce qui s’est passé ?', help: 'On raconte ensemble, sans chercher de coupable. Le parent peut commencer : « Je me souviens que… »' },
    { key: 'q2', icon: 'feel', title: 'Qu’est-ce que tu as ressenti ?', help: 'Dans ton corps, dans ta tête. Tu peux montrer ta météo : nuage, orage, tornade…', meteo: true },
    { key: 'q3', icon: 'idea', title: 'Qu’est-ce qui pourrait t’aider la prochaine fois ?', help: 'Un signal pour demander une pause, un outil de la boîte, un endroit pour se calmer…' }
  ];
  function viewTalk(id) {
    const c = crisis(id); if (!c) return go('#/');
    c.talk = c.talk || { done: false, answers: {}, repair: [], gesture: [] };
    const t = c.talk;
    let step = 0;
    const total = TALK.length + 2;
    const draw = () => {
      const bar = `<div class="steps">${Array.from({ length: total }, (_, i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>`;
      let body = '';
      if (step === -1) {
        body = '';
      } else if (step < TALK.length) {
        const q = TALK[step];
        body = `
          <div class="question">${ICON[q.icon]}<h2>${q.title}</h2><p>${q.help}</p></div>
          ${q.meteo ? `<div class="chips" id="met" style="justify-content:center;margin-bottom:10px">${Object.entries(WEATHER).map(([k, w]) => `<button class="chip" data-v="${w.label}" aria-pressed="${(t.answers.meteo || '') === w.label}">${w.label}</button>`).join('')}</div>` : ''}
          <textarea id="ans" placeholder="Noter ses mots (facultatif)">${esc(t.answers[q.key] || '')}</textarea>`;
      } else if (step === TALK.length) {
        body = `
          <div class="question">${ICON.repair}<h2>Qu’est-ce qu’on répare ?</h2><p>Plutôt qu’une punition, un geste pour réparer. C’est meilleur pour la confiance en soi.</p></div>
          <div class="chips" id="rep">${REPAIRS.map((r) => `<button class="chip" data-v="${esc(r)}" aria-pressed="${t.repair.includes(r)}">${esc(r)}</button>`).join('')}<button class="chip" data-v="Rien à réparer" aria-pressed="${t.repair.includes('Rien à réparer')}">Rien à réparer</button></div>
          <label class="lab" for="repx">Autre idée</label><input type="text" id="repx" value="${esc(t.repairOther || '')}" placeholder="Son idée à lui…">`;
      } else {
        body = `
          <div class="question">${ICON.heart}<h2>On se réconcilie</h2><p>Quoi qu’il se soit passé, on finit ensemble et on ne reste pas fâchés.</p></div>
          <div class="chips" id="ges" style="justify-content:center">${GESTURES.map((g) => `<button class="chip" data-v="${esc(g)}" aria-pressed="${t.gesture.includes(g)}">${esc(g)}</button>`).join('')}</div>`;
      }
      const last = step === total - 1;
      app.innerHTML = `
        ${topbar('En reparler à froid', '#/')}
        <p class="muted small" style="margin:-6px 0 10px">Crise de ${fmtWhen(c.start)}${c.triggers.length ? ` · ${esc(c.triggers.join(', '))}` : ''}</p>
        ${bar}${body}
        <div class="row" style="margin-top:18px">
          ${step > 0 ? '<button class="btn soft" id="prev">Retour</button>' : ''}
          <button class="btn ${last ? 'sage' : 'sun'}" id="next">${last ? `${ICON.check} Terminer` : 'Suivant'}</button>
        </div>`;
      const sh = app;
      const toggle = (sel, arr) => $$(`${sel} .chip`, sh).forEach((b) => b.addEventListener('click', () => {
        const v = b.dataset.v; const i = arr.indexOf(v); i >= 0 ? arr.splice(i, 1) : arr.push(v); b.setAttribute('aria-pressed', arr.includes(v));
      }));
      if ($('#met')) $$('#met .chip').forEach((b) => b.addEventListener('click', () => {
        t.answers.meteo = t.answers.meteo === b.dataset.v ? '' : b.dataset.v;
        $$('#met .chip').forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === t.answers.meteo));
      }));
      if ($('#rep')) toggle('#rep', t.repair);
      if ($('#ges')) toggle('#ges', t.gesture);
      const keep = () => {
        if (step < TALK.length) t.answers[TALK[step].key] = $('#ans').value.trim();
        if (step === TALK.length) t.repairOther = $('#repx').value.trim();
        save();
      };
      if ($('#prev')) $('#prev').addEventListener('click', () => { keep(); step--; draw(); });
      $('#next').addEventListener('click', () => {
        keep();
        if (!last) { step++; draw(); return; }
        t.done = true; t.at = Date.now(); save();
        app.innerHTML = `
          <div class="calmtitle" style="margin-top:40px">
            <div style="width:120px;margin:0 auto">${ICON.star}</div>
            <h1>Bravo à vous deux</h1>
            <p>Parler d’une tempête après coup, c’est apprendre à la reconnaître la prochaine fois.</p>
          </div>
          <a class="btn block" href="#/" style="margin-top:20px">${ICON.home} Retour à l’accueil</a>`;
      });
    };
    draw();
  }

  /* ---------- Je m'ennuie ---------- */
  const FAMILIES = {
    bouger: { label: 'Bouger', icon: 'run', cls: 'bg-terra', c: 'c-terra' },
    construire: { label: 'Construire', icon: 'blocks', cls: 'bg-sun', c: 'c-sun' },
    creer: { label: 'Créer', icon: 'pencil', cls: 'bg-sage', c: 'c-sage' },
    reflechir: { label: 'Réfléchir', icon: 'puzzle', cls: 'bg-sky', c: 'c-sky' },
    imaginer: { label: 'Imaginer', icon: 'wand', cls: 'bg-plum', c: 'c-plum' }
  };
  // Cartes de départ (à remplacer / compléter par les cartes personnalisées)
  const BASE_CARDS = [
    { f: 'bouger', t: 'Parcours d’obstacles', d: 'Avec des coussins, des chaises et une couverture, invente un parcours dans le salon.', defi: 'Fais ton parcours 3 fois, de plus en plus vite !', min: 5 },
    { f: 'bouger', t: 'La danse folle', d: 'Mets une musique et danse comme un robot, un serpent, une méduse…', defi: 'Danse sans t’arrêter jusqu’à la fin du minuteur.', min: 3 },
    { f: 'bouger', t: 'Le sol est de la lave', d: 'Traverse la pièce sans toucher le sol : coussins, tapis, chaises…', defi: 'Traverse 3 fois sans tomber dans la lave.', min: 5 },
    { f: 'bouger', t: 'Basket de chaussettes', d: 'Fais des boules de chaussettes et vise un panier ou un seau.', defi: 'Marque 10 paniers avant la fin du minuteur.', min: 3 },
    { f: 'bouger', t: 'Le jeu du miroir', d: 'Avec quelqu’un : l’un fait des gestes, l’autre les copie comme un miroir.', defi: 'Tiens 2 minutes sans rire !', min: 2 },
    { f: 'construire', t: 'La tour géante', d: 'Avec des briques, des planchettes ou des gobelets, construis le plus haut possible.', defi: 'La plus haute tour en 5 minutes !', min: 5 },
    { f: 'construire', t: 'Ma cabane', d: 'Une couverture, deux chaises, des coussins : construis ta cabane secrète.', defi: 'Cabane terminée avant la fin du minuteur.', min: 10 },
    { f: 'construire', t: 'Le pont de papier', d: 'Avec une feuille de papier, fabrique un pont entre deux livres.', defi: 'Ton pont doit porter une gomme !', min: 5 },
    { f: 'construire', t: 'Circuit de billes', d: 'Avec des rouleaux en carton et du scotch, fais rouler une bille le plus loin possible.', defi: 'La bille doit faire 3 virages.', min: 10 },
    { f: 'construire', t: 'Ma ville en carton', d: 'Des boîtes, des feutres : construis une rue avec des maisons et des magasins.', defi: 'Au moins 4 bâtiments avant la sonnerie.', min: 10 },
    { f: 'creer', t: 'Le dessin les yeux fermés', d: 'Dessine un chat (ou ce que tu veux) les yeux fermés, puis regarde le résultat !', defi: '5 dessins les yeux fermés en 3 minutes.', min: 3 },
    { f: 'creer', t: 'Mon monstre en pâte à modeler', d: 'Invente un monstre : combien d’yeux ? de bras ? quel est son nom ?', defi: 'Un monstre avec au moins 5 détails.', min: 5 },
    { f: 'creer', t: 'Ma BD en 3 cases', d: 'Dessine une petite histoire en 3 cases : le début, le problème, la fin.', defi: 'BD finie avant le minuteur.', min: 10 },
    { f: 'creer', t: 'La marionnette chaussette', d: 'Une vieille chaussette, des boutons, de la laine : fabrique une marionnette.', defi: 'Ta marionnette doit dire bonjour à quelqu’un.', min: 10 },
    { f: 'creer', t: 'Le collage', d: 'Découpe des images dans des prospectus et colle-les pour faire un tableau rigolo.', defi: 'Un animal fait seulement avec des morceaux découpés.', min: 10 },
    { f: 'reflechir', t: 'Un puzzle', d: 'Sors un puzzle et commence par les bords.', defi: 'Tous les bords en place avant la sonnerie !', min: 10 },
    { f: 'reflechir', t: 'Mon labyrinthe', d: 'Dessine un labyrinthe sur une feuille et fais-le essayer à quelqu’un.', defi: 'Un labyrinthe avec 3 impasses.', min: 5 },
    { f: 'reflechir', t: 'Le grand tri', d: 'Trie tes briques, tes crayons ou tes cartes par couleur ou par taille.', defi: 'Tout trié avant la fin du minuteur.', min: 5 },
    { f: 'reflechir', t: 'Le jeu de mémoire', d: 'Pose 8 objets sur la table, regarde-les, puis quelqu’un en cache un : lequel ?', defi: 'Trouve l’objet caché 3 fois de suite.', min: 5 },
    { f: 'reflechir', t: 'Devinettes', d: 'Invente 3 devinettes et pose-les à quelqu’un de la maison.', defi: '3 devinettes prêtes en 3 minutes.', min: 3 },
    { f: 'imaginer', t: 'L’histoire des 3 objets', d: 'Prends 3 objets au hasard et invente une histoire où ils sont tous les trois.', defi: 'Raconte ton histoire en 2 minutes chrono.', min: 5 },
    { f: 'imaginer', t: 'Je deviens un personnage', d: 'Déguise-toi avec ce que tu trouves et invente qui tu es : pirate, chef cuisinier, explorateur…', defi: 'Reste dans ton personnage jusqu’à la sonnerie !', min: 10 },
    { f: 'imaginer', t: 'La carte au trésor', d: 'Cache un petit trésor et dessine une carte pour que quelqu’un le retrouve.', defi: 'Carte et trésor prêts avant le minuteur.', min: 10 },
    { f: 'imaginer', t: 'L’animal inventé', d: 'Mélange deux animaux : un lapin-requin ? un chat-papillon ? Dessine-le et donne-lui un nom.', defi: '3 animaux inventés en 5 minutes.', min: 5 },
    { f: 'imaginer', t: 'Le spectacle', d: 'Prépare un petit spectacle (marionnettes, magie, chanson) pour la famille.', defi: 'Spectacle prêt avant la sonnerie.', min: 10 }
  ];
  const DUO = [
    ['Morpion', 'Sur une feuille : 3 croix ou 3 ronds alignés pour gagner.'],
    ['Pierre-feuille-ciseaux', 'Un tournoi en 5 manches. Le perdant invente un gage rigolo.'],
    ['Le mime', 'Mime un animal ou un métier, l’autre doit deviner.'],
    ['La bataille', 'Avec un jeu de cartes : la plus forte carte gagne le pli.'],
    ['Cache-cache', 'L’un compte jusqu’à 20, l’autre se cache.'],
    ['Dessin à deux mains', 'Chacun dessine un trait à tour de rôle : qu’est-ce que ça va devenir ?']
  ];
  const WAIT = [
    ['Je vois, je vois…', '« Je vois quelque chose de… bleu ! » L’autre doit deviner ce que c’est.'],
    ['Les voitures rouges', 'Compte les voitures rouges (ou les chiens, les vélos…). Qui en trouve le plus ?'],
    ['L’histoire à deux voix', 'Chacun dit une phrase à son tour pour inventer une histoire.'],
    ['Ni oui ni non', 'Réponds aux questions sans jamais dire « oui » ni « non ».'],
    ['À quoi je pense ?', 'Pense à un animal. L’autre pose des questions pour deviner.'],
    ['Le dessin dans le dos', 'Dessine une lettre ou une forme du doigt dans le dos de l’autre : il devine.'],
    ['La chaîne de mots', 'Chaque mot commence par la dernière syllabe du précédent : maison → sonnette…'],
    ['La bataille de pouces', 'Les doigts accrochés, chacun essaie de coincer le pouce de l’autre.']
  ];
  const allCards = () => [
    ...BASE_CARDS.map((c, i) => ({ ...c, id: 'b' + i })),
    ...(db.cards || []).map((c) => ({ id: c.id, f: c.f, t: c.t, d: c.d || 'Une idée à moi !', mine: true, emoji: c.emoji }))
  ];
  function logEnnui(need) { db.ennui = db.ennui || []; db.ennui.unshift({ at: Date.now(), need }); db.ennui = db.ennui.slice(0, 500); save(); }

  function viewEnnui() {
    app.innerHTML = `
      ${topbar('Je m’ennuie')}
      <p class="center" style="font-weight:800;font-size:1.15rem;margin:0 0 14px">De quoi j’ai besoin ?</p>
      <div class="weather">
        <button class="bg-terra" data-n="bouger"><span class="c-terra">${ICON.run}</span><strong>Mon corps veut bouger</strong></button>
        <button class="bg-sky" data-n="nouveau"><span class="c-sky">${ICON.dice}</span><strong>Ma tête veut du nouveau</strong></button>
        <button class="bg-sun" data-n="duo"><span class="c-sun">${ICON.duo}</span><strong>Je veux être avec quelqu’un</strong></button>
        <button class="bg-stone" data-n="fatigue"><span class="c-stone">${ICON.zzz}</span><strong>Je suis fatigué</strong></button>
      </div>
      <div class="section-title" style="margin-top:20px">Aussi</div>
      <a class="tile bg-plum" href="#/ennui/pioche"><div class="pic c-plum">${ICON.dice}</div><div class="txt"><strong>La pioche</strong><span>Une carte au hasard</span></div></a>
      <a class="tile bg-sage" href="#/ennui/attente"><div class="pic c-sage">${ICON.bag}</div><div class="txt"><strong>Mon sac d’attente</strong><span>Voiture, salle d’attente, restaurant</span></div></a>
      <a class="tile bg-sun" href="#/ennui/cartes"><div class="pic c-sun">${ICON.plus}</div><div class="txt"><strong>Mes cartes à moi</strong><span>J’ajoute mes idées</span></div></a>`;
    $$('.weather button').forEach((b) => b.addEventListener('click', () => {
      const n = b.dataset.n; logEnnui(n);
      if (n === 'bouger') go('#/ennui/pioche/bouger');
      else if (n === 'nouveau') { const fs = ['construire', 'creer', 'reflechir', 'imaginer']; sessionStorage.setItem('bc-defi', '1'); go(`#/ennui/pioche/${fs[Math.floor(Math.random() * fs.length)]}`); }
      else if (n === 'duo') go('#/ennui/duo');
      else go('#/ennui/reve');
    }));
  }

  function viewPioche(fam) {
    let filter = FAMILIES[fam] ? fam : 'tout';
    let rerolls = 2, card = null, lastId = null;
    const suggestDefi = sessionStorage.getItem('bc-defi') === '1'; sessionStorage.removeItem('bc-defi');
    const draw = () => {
      const pool = allCards().filter((c) => (filter === 'tout' || c.f === filter) && c.id !== lastId);
      card = pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
      if (card) lastId = card.id;
      paint();
    };
    const paint = () => {
      const F = card ? FAMILIES[card.f] : null;
      app.innerHTML = `
        ${topbar('La pioche', '#/ennui')}
        <div class="chips" id="fam" style="margin-bottom:14px">
          <button class="chip" data-f="tout" aria-pressed="${filter === 'tout'}">Toutes</button>
          ${Object.entries(FAMILIES).map(([k, f]) => `<button class="chip" data-f="${k}" aria-pressed="${filter === k}">${f.label}</button>`).join('')}
        </div>
        ${card ? `
        <div class="card cut pickcard ${F.cls}" id="pc">
          <div class="pc-fam ${F.c}">${ICON[F.icon]}<span>${F.label}${card.mine ? ' · ma carte' : ''}</span></div>
          ${card.emoji ? `<div class="pc-emoji">${esc(card.emoji)}</div>` : ''}
          <h2>${esc(card.t)}</h2>
          <p>${esc(card.d)}</p>
          ${card.defi ? `<p class="pc-defi ${suggestDefi ? 'hl' : ''}">${ICON.timer}<span><b>Défi :</b> ${esc(card.defi)}</span></p>` : ''}
        </div>
        <div class="stack">
          <button class="btn block" id="ok">${ICON.check} C’est parti !</button>
          ${card.defi ? `<button class="btn terra block" id="defi">${ICON.timer} Mode défi (${card.min} min)</button>` : ''}
          <button class="btn soft block" id="again" ${rerolls ? '' : 'disabled'}>${ICON.dice} Repiocher (${rerolls} restant${rerolls > 1 ? 's' : ''})</button>
        </div>` : `<div class="hint center">Pas encore de carte dans cette famille.</div>`}`;
      $$('#fam .chip').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.f; rerolls = 2; draw(); }));
      if (!card) return;
      const pc = $('#pc'); pc.classList.add('flip');
      $('#again').addEventListener('click', () => { if (!rerolls) return; rerolls--; draw(); });
      $('#ok').addEventListener('click', () => {
        app.innerHTML = `
          <div class="calmtitle" style="margin-top:40px">
            <div class="${F.c}" style="width:110px;margin:0 auto">${ICON[F.icon]}</div>
            <h1>Amuse-toi bien !</h1>
            <p>${esc(card.t)}</p>
            <p class="small">Quand tu as fini, tu peux revenir piocher une autre carte.</p>
          </div>
          <a class="btn block" href="#/" style="margin-top:20px">${ICON.home} Accueil</a>`;
      });
      const d = $('#defi'); if (d) d.addEventListener('click', () => defiTimer(card));
    };
    draw();
  }

  function localTimer(durationMs, colorEl, onDone) {
    stopTick();
    const start = Date.now();
    const step = () => {
      const left = start + durationMs - Date.now();
      const el = $('.timer');
      if (el) { updateRing(el, left / durationMs); const t = $('.time', el); if (t) t.textContent = mmss(left); }
      if (left <= 0) { stopTick(); onDone(); }
    };
    step(); tick = setInterval(step, 500);
  }

  function defiTimer(card) {
    const F = FAMILIES[card.f];
    app.innerHTML = `
      <div class="calmtitle"><h1>Défi !</h1><p>${esc(card.defi)}</p></div>
      <div class="timerwrap"><div class="timer">${ringSVG('#E07A5F')}<div class="inner"><div class="${F.c}">${ICON[F.icon]}</div><div class="time">${card.min}:00</div></div></div></div>
      <div class="stack">
        <button class="btn sage block" id="win">${ICON.star} Défi réussi !</button>
        <a class="btn ghost" href="#/ennui/pioche">Abandonner</a>
      </div>`;
    const end = (won) => {
      stopTick(); if (!won) vibrate([200, 100, 200]);
      app.innerHTML = `
        <div class="calmtitle" style="margin-top:40px">
          <div style="width:120px;margin:0 auto">${ICON.star}</div>
          <h1>${won ? 'Bravo, défi réussi !' : 'Temps écoulé !'}</h1>
          <p>${won ? 'Tu peux être fier de toi.' : 'Tu as réussi ? Montre ce que tu as fait à quelqu’un !'}</p>
        </div>
        <div class="stack" style="margin-top:20px">
          <a class="btn block" href="#/ennui/pioche">${ICON.dice} Une autre carte</a>
          <a class="btn soft block" href="#/">${ICON.home} Accueil</a>
        </div>`;
    };
    localTimer(card.min * 60000, null, () => end(false));
    $('#win').addEventListener('click', () => { addStar('defi'); end(true); });
  }

  function viewDuo() {
    app.innerHTML = `
      ${topbar('Avec quelqu’un', '#/ennui')}
      <div class="card cut center"><div class="c-sun" style="width:80px;margin:0 auto">${ICON.duo}</div>
        <p style="font-weight:800">Va demander à quelqu’un de la maison : « Tu veux jouer avec moi ? »<br><span class="muted small">S’il ne peut pas tout de suite, demande-lui quand. En attendant, pioche une carte !</span></p></div>
      ${DUO.map(([t, d]) => `<div class="entry"><div class="top"><span>${esc(t)}</span></div><div class="meta">${esc(d)}</div></div>`).join('')}
      <a class="btn soft block" href="#/ennui/pioche">${ICON.dice} Piocher une carte en attendant</a>`;
  }

  function viewReve() {
    app.innerHTML = `
      ${topbar('Le nuage de rêverie', '#/ennui')}
      <div class="calmtitle"><p>Tu as le droit de ne rien faire.<br>Allonge-toi, regarde le plafond ou le ciel, et laisse tes idées voyager.</p></div>
      <div class="timerwrap"><div class="timer">${ringSVG('#C9D3E3')}<div class="inner"><div class="clouds">${ICON.cloud}</div><div class="time">5:00</div></div></div></div>
      <div class="stack">
        <button class="btn sky block" id="go">${ICON.cloud} Je commence</button>
        <a class="btn soft block" href="#/calme">${ICON.dragon} Plutôt ma boîte pour me calmer</a>
      </div>`;
    $('#go').addEventListener('click', () => {
      $('#go').hidden = true; $('.clouds').classList.add('drift');
      localTimer(5 * 60000, null, () => {
        app.innerHTML = `
          <div class="calmtitle" style="margin-top:40px"><div class="c-sky" style="width:110px;margin:0 auto">${ICON.cloud}</div>
            <h1>Le nuage est passé</h1><p>Ton cerveau s’est reposé. Tu veux une idée maintenant ?</p></div>
          <div class="stack" style="margin-top:20px"><a class="btn block" href="#/ennui/pioche">${ICON.dice} Piocher une carte</a><a class="btn soft block" href="#/">${ICON.home} Accueil</a></div>`;
      });
    });
  }

  function viewAttente() {
    app.innerHTML = `
      ${topbar('Mon sac d’attente', '#/ennui')}
      <p class="muted" style="margin:-4px 4px 12px;font-weight:700">Des jeux sans rien, pour la voiture, la salle d’attente ou le restaurant.</p>
      ${WAIT.map(([t, d], i) => `<div class="entry ${['bg-sun', 'bg-sky', 'bg-sage', 'bg-plum'][i % 4]}"><div class="top"><span>${esc(t)}</span></div><div class="meta">${esc(d)}</div></div>`).join('')}
      <div class="hint" style="margin-top:6px"><b>Pour le parent :</b> un petit sac prêt à emporter aide beaucoup (carnet, crayons, une figurine, une balle anti-stress). On le garde pour les moments d’attente, pour qu’il reste nouveau.</div>`;
  }

  function viewCards() {
    const draw = () => {
      const mine = db.cards || [];
      app.innerHTML = `
        ${topbar('Mes cartes à moi', '#/ennui')}
        <div class="card cut">
          <label class="lab" style="margin-top:0" for="ct">Mon idée</label>
          <input type="text" id="ct" maxlength="60" placeholder="Ex. : Faire un gâteau en pâte à sel">
          <label class="lab" for="cd">Comment on fait ? <span class="muted small">(facultatif)</span></label>
          <input type="text" id="cd" maxlength="140" placeholder="Une phrase pour s’en souvenir">
          <label class="lab">Sa famille</label>
          <div class="chips" id="cf">${Object.entries(FAMILIES).map(([k, f], i) => `<button class="chip" data-f="${k}" aria-pressed="${i === 0}">${f.label}</button>`).join('')}</div>
          <label class="lab">Une image</label>
          <div class="chips" id="ce">${['🎨', '🧱', '⚽', '🎲', '🧩', '🎭', '🎵', '🍪', '🌳', '🚀', '🦖', '📚'].map((e, i) => `<button class="chip" data-e="${e}" aria-pressed="${i === 0}" style="font-size:1.3rem">${e}</button>`).join('')}</div>
          <button class="btn terra block" style="margin-top:16px" id="add">${ICON.plus} Ajouter ma carte</button>
        </div>
        ${mine.length ? `<div class="section-title">Mes cartes (${mine.length})</div>` + mine.map((c) => `
          <div class="entry ${FAMILIES[c.f].cls}"><div class="top"><span>${esc(c.emoji || '')} ${esc(c.t)}</span><button class="btn ghost" data-del="${c.id}" aria-label="Supprimer" style="min-height:0;padding:0 4px">${ICON.close.replace('<svg', '<svg width="20" height="20"')}</button></div>
          <div class="meta">${FAMILIES[c.f].label}${c.d ? ' · ' + esc(c.d) : ''}</div></div>`).join('') : '<div class="hint center">Tes cartes apparaîtront ici, et dans la pioche.</div>'}`;
      let f = 'bouger', e = '🎨';
      $$('#cf .chip').forEach((b) => b.addEventListener('click', () => { f = b.dataset.f; $$('#cf .chip').forEach((x) => x.setAttribute('aria-pressed', x === b)); }));
      $$('#ce .chip').forEach((b) => b.addEventListener('click', () => { e = b.dataset.e; $$('#ce .chip').forEach((x) => x.setAttribute('aria-pressed', x === b)); }));
      $('#add').addEventListener('click', () => {
        const t = $('#ct').value.trim(); if (!t) { $('#ct').focus(); return toast('Écris ton idée d’abord'); }
        db.cards = db.cards || []; db.cards.unshift({ id: uid(), f, t, d: $('#cd').value.trim(), emoji: e }); save(); toast('Carte ajoutée à la pioche !'); draw();
      });
      $$('[data-del]').forEach((b) => b.addEventListener('click', () => {
        if (!confirmInline(b, 'Sûr ?')) return;
        db.cards = db.cards.filter((c) => c.id !== b.dataset.del); save(); draw();
      }));
    };
    draw();
  }

  /* ----- Sortir des écrans en douceur ----- */
  function screenBanner() {
    const s = db.screen; if (!s) return '';
    const left = s.start + s.durationMs - Date.now();
    return `<a class="banner" href="#/ennui/ecran" style="background:var(--sky-soft);border-color:var(--sky)">${ICON.screen.replace('<svg', '<svg style="color:var(--sky)"')}<div><strong>Écran en cours</strong><span>${left > 0 ? `Encore ${mmss(left)}` : 'C’est l’heure d’arrêter'}</span></div></a>`;
  }
  function checkScreen() {
    const s = db.screen; if (!s) return;
    const left = s.start + s.durationMs - Date.now();
    const warn = (key, title, body) => { if (!s[key]) { s[key] = true; save(); vibrate([150]); notify(title, body, './#/ennui/ecran'); if (location.hash === '#/ennui/ecran') toast(title); } };
    if (left <= 5 * 60000 && s.durationMs > 5 * 60000) warn('w5', 'Encore 5 minutes d’écran', 'On prévient : bientôt la fin.');
    if (left <= 2 * 60000 && s.durationMs > 2 * 60000) warn('w2', 'Encore 2 minutes d’écran', 'On termine sa partie ou son épisode.');
    if (left <= 0) warn('w0', 'C’est l’heure d’arrêter l’écran', 'Après l’écran, on choisit une carte !');
  }
  setInterval(checkScreen, 5000);

  function viewScreen() {
    const s = db.screen;
    if (!s) {
      let min = 20;
      app.innerHTML = `
        ${topbar('Sortir des écrans', '#/')}
        <div class="card cut">
          <div class="center c-sky" style="width:80px;margin:0 auto 6px">${ICON.screen}</div>
          <p style="font-weight:700">Arrêter un écran est souvent un moment de crise. On prévient à l’avance (5 minutes puis 2 minutes), et on prévoit déjà ce qu’on fera après.</p>
        </div>
        <label class="lab">Durée d’écran</label>
        <div class="scale" id="sd">${[10, 15, 20, 30, 45].map((n) => `<button aria-pressed="${n === min}" data-v="${n}">${n}</button>`).join('')}</div>
        <p class="muted small">En minutes. Les alertes s’affichent dans l’appli et en notification si vous les avez autorisées.</p>
        <button class="btn sky block" style="margin-top:14px" id="go">${ICON.timer} Lancer le minuteur d’écran</button>`;
      $$('#sd button').forEach((b) => b.addEventListener('click', () => { min = Number(b.dataset.v); $$('#sd button').forEach((x) => x.setAttribute('aria-pressed', x === b)); }));
      $('#go').addEventListener('click', () => { db.screen = { start: Date.now(), durationMs: min * 60000 }; save(); askNotif(); render(); });
      return;
    }
    app.innerHTML = `
      ${topbar('Écran en cours', '#/')}
      <div class="timerwrap"><div class="timer">${ringSVG('#6C8EBF')}<div class="inner"><div class="c-sky">${ICON.screen}</div><div class="time"></div></div></div></div>
      <div class="card cut center" id="after">
        <p style="font-weight:800;margin:0 0 10px">Après l’écran, je choisis…</p>
        <a class="btn block" href="#/ennui/pioche" id="pick">${ICON.dice} Une carte de la pioche</a>
      </div>
      <div class="stack">
        <button class="btn soft block" id="plus">+ 5 minutes</button>
        <button class="btn ghost" id="stop">Arrêter le minuteur</button>
      </div>`;
    const step = () => {
      const left = s.start + s.durationMs - Date.now();
      const el = $('.timer'); if (!el) return;
      updateRing(el, left / s.durationMs);
      $('.time', el).textContent = left > 0 ? mmss(left) : 'Fini !';
      if (left <= 0) el.classList.add('done');
      checkScreen();
    };
    step(); tick = setInterval(step, 1000);
    const clear = () => { db.screen = null; save(); };
    $('#pick').addEventListener('click', clear);
    $('#plus').addEventListener('click', () => { s.durationMs += 5 * 60000; s.w5 = s.w2 = s.w0 = false; save(); step(); toast('5 minutes de plus'); });
    $('#stop').addEventListener('click', () => { clear(); go('#/'); });
  }

  /* ---------- Minuteur visuel réglable ---------- */
  // Disque qui se vide (lecture immédiate du temps restant, même sans savoir lire l'heure)
  const PIE_R = 120;
  function pieSVG() {
    return `<svg class="pie" viewBox="0 0 280 280" aria-hidden="true">
      <circle cx="140" cy="140" r="134" fill="var(--paper)" stroke="var(--line)" stroke-width="6"/>
      ${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; const r1 = 126, r2 = i % 3 ? 118 : 110; return `<line x1="${140 + r1 * Math.sin(a)}" y1="${140 - r1 * Math.cos(a)}" x2="${140 + r2 * Math.sin(a)}" y2="${140 - r2 * Math.cos(a)}" stroke="var(--ink-soft)" stroke-width="${i % 3 ? 3 : 5}" stroke-linecap="round"/>`; }).join('')}
      <path class="slice" fill="var(--terra)" d=""/>
      <circle cx="140" cy="140" r="16" fill="var(--paper)" stroke="var(--ink)" stroke-width="5"/>
    </svg>`;
  }
  function slicePath(frac) {
    frac = Math.max(0, Math.min(1, frac));
    if (frac <= 0) return '';
    if (frac >= 0.9999) return `M140 140 m0 ${-PIE_R} a${PIE_R} ${PIE_R} 0 1 1 0 ${2 * PIE_R} a${PIE_R} ${PIE_R} 0 1 1 0 ${-2 * PIE_R}z`;
    const a = frac * 2 * Math.PI; // le temps restant, dans le sens des aiguilles d'une montre depuis midi
    const x = 140 + PIE_R * Math.sin(a), y = 140 - PIE_R * Math.cos(a);
    return `M140 140 L140 ${140 - PIE_R} A${PIE_R} ${PIE_R} 0 ${a > Math.PI ? 1 : 0} 1 ${x} ${y} Z`;
  }
  const vLeft = (v) => v.paused ? v.remaining : v.start + v.durationMs - Date.now();
  function timerBanner() {
    const v = db.vtimer; if (!v) return '';
    const left = vLeft(v);
    return `<a class="banner" href="#/minuteur" style="background:var(--terra-soft);border-color:var(--terra)">${ICON.timer.replace('<svg', '<svg style="color:var(--terra)"')}<div><strong>Minuteur ${v.paused ? 'en pause' : 'en cours'}</strong><span>${left > 0 ? `Reste ${mmss(left)}` : 'Temps écoulé'}</span></div></a>`;
  }
  function checkVTimer() {
    const v = db.vtimer; if (!v || v.paused || v.rang) return;
    if (vLeft(v) <= 0) { v.rang = true; save(); vibrate([300, 150, 300, 150, 300]); notify('Le temps est écoulé', v.label || 'Ton minuteur est terminé.', './#/minuteur'); }
  }
  setInterval(checkVTimer, 3000);

  function viewVTimer() {
    const v = db.vtimer;
    if (!v) {
      const last = db.settings.vtimerMin || 5;
      let min = last, label = '';
      const presets = [1, 2, 3, 5, 10, 15, 20, 30, 45, 60];
      const paint = () => {
        app.innerHTML = `
          ${topbar('Mon minuteur')}
          <div class="card cut center">
            <div class="stepper">
              <button class="iconbtn big" id="minus" aria-label="Moins une minute">−</button>
              <div><div class="bignum" id="val">${min}</div><div class="muted" style="font-weight:800">minute${min > 1 ? 's' : ''}</div></div>
              <button class="iconbtn big" id="plus1" aria-label="Plus une minute">+</button>
            </div>
            <div class="chips" id="pre" style="justify-content:center;margin-top:14px">${presets.map((p) => `<button class="chip" data-v="${p}" aria-pressed="${p === min}">${p < 60 ? p + ' min' : '1 h'}</button>`).join('')}</div>
          </div>
          <label class="lab" for="lbl">Pour quoi ? <span class="muted small">(facultatif)</span></label>
          <div class="chips" id="sug" style="margin-bottom:8px">${['Devoirs', 'Brossage de dents', 'Rangement', 'Habillage', 'Jeu', 'Écran'].map((s) => `<button class="chip" data-s="${s}" aria-pressed="false">${s}</button>`).join('')}</div>
          <input type="text" id="lbl" maxlength="40" placeholder="Ex. : se préparer pour l’école" value="${esc(label)}">
          <button class="btn terra block" style="margin-top:16px" id="go">${ICON.timer} Lancer ${min} minute${min > 1 ? 's' : ''}</button>`;
        const set = (n) => { min = Math.max(1, Math.min(120, n)); label = $('#lbl').value; paint(); };
        $('#minus').addEventListener('click', () => set(min - 1));
        $('#plus1').addEventListener('click', () => set(min + 1));
        $$('#pre .chip').forEach((b) => b.addEventListener('click', () => set(Number(b.dataset.v))));
        $$('#sug .chip').forEach((b) => b.addEventListener('click', () => { $('#lbl').value = b.dataset.s; $$('#sug .chip').forEach((x) => x.setAttribute('aria-pressed', x === b)); }));
        $('#go').addEventListener('click', () => {
          db.settings.vtimerMin = min;
          db.vtimer = { start: Date.now(), durationMs: min * 60000, paused: false, remaining: 0, label: $('#lbl').value.trim(), rang: false };
          save(); askNotif(); render();
        });
      };
      paint();
      return;
    }
    app.innerHTML = `
      ${topbar(v.label ? esc(v.label) : 'Mon minuteur')}
      <div class="timerwrap">
        <div class="pie-wrap">${pieSVG()}</div>
        <div class="time big" id="t"></div>
      </div>
      <div class="row">
        <button class="btn soft" id="pause"></button>
        <button class="btn soft" id="more">+ 1 min</button>
      </div>
      <div class="stack" style="margin-top:10px">
        <button class="btn ghost" id="stop">Arrêter</button>
      </div>`;
    const step = () => {
      const left = vLeft(v);
      const s = $('.slice'); if (!s) return;
      s.setAttribute('d', slicePath(left / v.durationMs));
      $('#t').textContent = left > 0 ? mmss(left) : 'Temps écoulé !';
      $('#pause').innerHTML = v.paused ? '▶ Reprendre' : '❚❚ Pause';
      $('.pie-wrap').classList.toggle('done', left <= 0);
      if (left <= 0) { $('#pause').disabled = true; checkVTimer(); }
    };
    step(); tick = setInterval(step, 500);
    $('#pause').addEventListener('click', () => {
      if (v.paused) { v.start = Date.now() - (v.durationMs - v.remaining); v.paused = false; }
      else { v.remaining = vLeft(v); v.paused = true; }
      save(); step();
    });
    $('#more').addEventListener('click', () => {
      const left = Math.max(0, vLeft(v));
      v.durationMs = Math.max(v.durationMs, left + 60000);
      if (v.paused) v.remaining = left + 60000; else v.start = Date.now() + left + 60000 - v.durationMs;
      v.rang = false; $('#pause').disabled = false; save(); step();
    });
    $('#stop').addEventListener('click', () => { db.vtimer = null; save(); go('#/'); });
  }

  /* ---------- Missions guidées : Je range ma chambre / Je m'habille ---------- */
  const ROUTINES = {
    ranger: {
      title: 'Je range ma chambre', icon: 'basket', c: 'c-sage', color: '#6FA488', btn: 'sage',
      intro: 'Une mission à la fois. Une étoile pour chaque mission réussie !',
      endAll: 'Chambre rangée !', endMsg: 'Va montrer ta chambre à quelqu’un : tu peux être fier de toi.',
      tip: '',
      steps: [
        { e: '🧸', t: 'Les jouets dans leurs bacs', min: 3 },
        { e: '👕', t: 'Le linge sale dans le panier', min: 2 },
        { e: '📚', t: 'Les livres sur l’étagère', min: 2 },
        { e: '✏️', t: 'Les feuilles et les crayons dans les bons tiroirs', min: 2 },
        { e: '🚪', t: 'Remettre dans ma chambre les jouets qui sont dans le bureau', min: 2 },
        { e: '🔍', t: 'Je vérifie le sol : plus rien par terre ?', min: 1 }
      ]
    },
    habiller: {
      title: 'Je m’habille', icon: 'shirt', c: 'c-sky', color: '#6C8EBF', btn: 'sky',
      intro: 'Un vêtement à la fois, dans l’ordre. Une étoile pour chaque étape !',
      endAll: 'Prêt, tout habillé !', endMsg: 'Va te montrer à quelqu’un : bravo, tu l’as fait tout seul !',
      tip: '<b>Astuce parent :</b> préparer les vêtements la veille avec lui, posés dans l’ordre des étapes (ou sur une chaise), loin des jouets et des écrans.',
      steps: [
        { e: '🩲', t: 'Le slip (ou la culotte)', min: 1 },
        { e: '🧦', t: 'Les chaussettes', min: 2 },
        { e: '👖', t: 'Le pantalon (ou la jupe)', min: 2 },
        { e: '👕', t: 'Le t-shirt', min: 2 },
        { e: '🧶', t: 'Le pull ou le gilet', min: 2 },
        { e: '🪞', t: 'Je me regarde dans le miroir : tout est à l’endroit ?', min: 1 }
      ]
    }
  };
  ROUTINES.toilette = {
    title: 'Ma toilette', icon: 'drop', c: 'c-plum', color: '#9B7BB8', btn: 'plum',
    intro: 'Une étape à la fois, devant le lavabo. Une étoile pour chaque étape !',
    endAll: 'Tout propre !', endMsg: 'Va sentir comme tu sens bon… et montre ton beau sourire à quelqu’un !',
    tip: '<b>Astuce parent :</b> afficher aussi au-dessus du lavabo une petite fiche avec les images des étapes, dans le même ordre. L’enfant n’a plus besoin qu’on lui redise chaque consigne.',
    steps: [
      { e: '🚽', t: 'Je passe aux toilettes et je tire la chasse', min: 2 },
      { e: '🧼', t: 'Je me lave les mains avec du savon', min: 1 },
      { e: '💦', t: 'Je me lave le visage', min: 1 },
      { e: '🪥', t: 'Je me brosse les dents jusqu’à la fin du cercle', min: 2 },
      { e: '🪮', t: 'Je me coiffe', min: 1 },
      { e: '🧺', t: 'Je range ma brosse à dents et ma serviette', min: 1 }
    ]
  };
  ROUTINES.devoirs = {
    title: 'Mes devoirs', icon: 'pencil', c: 'c-sun', color: '#F2B84B', btn: 'sun',
    intro: 'D’abord je recharge mes batteries, puis un exercice à la fois. Une étoile par étape !',
    endAll: 'Devoirs terminés !', endMsg: 'Bravo ! Maintenant, file te détendre : tu l’as bien mérité.',
    tip: '<b>Astuce parent :</b> en fin de journée, il est fatigué d’avoir fait des efforts toute la journée (et un éventuel traitement s’estompe). Un endroit calme, sans écran, vous disponible et détendu ; une consigne à la fois ; on le laisse faire seul et on le recentre seulement si besoin. Si la fatigue est trop forte, un petit mot à l’enseignant vaut mieux qu’un bras de fer. <a href="#/fiches">Voir la fiche « devoirs »</a>',
    steps: [
      { e: '🍎', t: 'Je me repose et je prends mon goûter', min: 10 },
      { e: '✉️', t: 'Je donne les papiers à signer à papa ou maman', min: 1 },
      { e: '📒', t: 'Je regarde dans mon agenda ce qu’il y a à faire', min: 2 },
      { e: '✏️', t: 'Je sors seulement ce dont j’ai besoin', min: 2 },
      { e: '💪', t: 'Je commence par le plus difficile', min: 10 },
      { e: '🧃', t: 'Petite pause : je bouge, je bois un peu d’eau', min: 2 },
      { e: '📝', t: 'Je fais le reste, un exercice à la fois', min: 10 },
      { e: '✅', t: 'Je raye dans l’agenda ce que j’ai fini', min: 1 },
      { e: '🎒', t: 'Je prépare mon cartable pour demain', min: 3 }
    ]
  };
  const routine = (k) => {
    db.routines = db.routines || {};
    if (!db.routines.ranger && db.tidy) { db.routines.ranger = db.tidy; delete db.tidy; } // reprise des données V1.3
    const R = db.routines[k] = db.routines[k] || {};
    if (!Array.isArray(R.steps)) R.steps = ROUTINES[k].steps.map((s) => ({ ...s, id: uid() }));
    R.stars = R.stars || 0; R.history = R.history || [];
    return R;
  };
  const starRow = (n, total) => `<div class="stars">${Array.from({ length: total }, (_, i) => `<span class="${i < n ? 'on' : ''}">★</span>`).join('')}</div>`;

  function viewRoutine(k) {
    const C = ROUTINES[k], T = routine(k);
    const total = T.steps.reduce((a, s) => a + s.min, 0);
    app.innerHTML = `
      ${topbar(C.title)}
      <div class="card cut center">
        <div class="${C.c}" style="width:84px;margin:0 auto">${ICON[C.icon]}</div>
        <p style="font-weight:800;font-size:1.1rem;margin-top:6px">${T.steps.length} petites missions, environ ${total} minutes.<br><span class="muted small">${C.intro}</span></p>
        <div class="stars-total">★ ${T.stars} <span>étoile${T.stars > 1 ? 's' : ''} gagnée${T.stars > 1 ? 's' : ''}</span></div>
      </div>
      <div class="card">
        <h3 style="margin-bottom:8px">Mes missions</h3>
        ${T.steps.map((s, i) => `<div class="tidy-row"><span class="tidy-e">${esc(s.e)}</span><span class="tidy-t">${i + 1}. ${esc(s.t)}</span><span class="muted small">${s.min} min</span></div>`).join('') || '<p class="muted">Aucune mission : demandez à un parent d’en ajouter.</p>'}
      </div>
      ${C.tip ? `<div class="hint" style="margin-bottom:14px">${C.tip}</div>` : ''}
      <button class="btn ${C.btn} block" id="go" ${T.steps.length ? '' : 'disabled'}>${ICON[C.icon]} C’est parti !</button>
      <a class="btn ghost block" href="#/r/${k}/liste">${ICON.lock.replace('<svg', '<svg width="18" height="18"')} Modifier les missions (parent)</a>`;
    $('#go').addEventListener('click', () => {
      T.run = { i: 0, done: 0, skipped: 0, start: Date.now(), stepStart: Date.now() }; save(); go(`#/r/${k}/go`);
    });
  }

  function viewRoutineGo(k) {
    const C = ROUTINES[k], T = routine(k), r = T.run;
    if (!r || !T.steps.length) return go(`#/r/${k}`);
    if (r.i >= T.steps.length) return routineEnd(k);
    const s = T.steps[r.i];
    const dur = s.min * 60000;
    app.innerHTML = `
      ${topbar(`Mission ${r.i + 1} sur ${T.steps.length}`, `#/r/${k}`)}
      <div class="steps">${T.steps.map((_, j) => `<i class="${j < r.i ? 'on' : ''}${j === r.i ? ' cur' : ''}"></i>`).join('')}</div>
      <div class="mission flip">
        <div class="mission-e">${esc(s.e)}</div>
        <h1>${esc(s.t)}</h1>
      </div>
      <div class="timerwrap small-timer">
        <div class="timer">${ringSVG(C.color)}<div class="inner"><div class="time">${mmss(dur)}</div></div></div>
        <p class="muted small" id="hint">&nbsp;</p>
      </div>
      <div class="stack">
        <button class="btn ${C.btn} block big" id="done">${ICON.star} C’est fait !</button>
        <button class="btn ghost" id="skip">Je passe cette mission</button>
      </div>`;
    const startAt = r.stepStart || Date.now();
    stopTick();
    const step = () => {
      const left = startAt + dur - Date.now();
      const el = $('.timer'); if (!el) return;
      updateRing(el, left / dur);
      $('.time', el).textContent = left > 0 ? mmss(left) : '0:00';
      if (left <= 0 && !el.classList.contains('done')) { el.classList.add('done'); $('#hint').textContent = 'Le temps est passé… tu y es presque ? Termine et appuie sur « C’est fait ! »'; vibrate([120]); }
    };
    step(); tick = setInterval(step, 500);
    const next = (ok) => {
      if (ok) { r.done++; T.stars++; addStar(k); vibrate([60]); } else r.skipped++;
      r.i++; r.stepStart = Date.now(); save();
      if (ok) { app.insertAdjacentHTML('beforeend', '<div class="starpop">★</div>'); setTimeout(() => render(), 650); } else render();
    };
    $('#done').addEventListener('click', () => next(true));
    $('#skip').addEventListener('click', () => next(false));
  }

  function routineEnd(k) {
    const C = ROUTINES[k], T = routine(k), r = T.run;
    const mins = minutes(Date.now() - r.start);
    T.history.unshift({ at: Date.now(), done: r.done, total: T.steps.length, min: mins }); T.history = T.history.slice(0, 200);
    T.run = null; save();
    const all = r.done === T.steps.length;
    app.innerHTML = `
      <div class="calmtitle" style="margin-top:30px">
        <div class="mission-e">${all ? '🏆' : '👏'}</div>
        <h1>${all ? C.endAll : 'Bien joué !'}</h1>
        <p>${r.done} mission${r.done > 1 ? 's' : ''} réussie${r.done > 1 ? 's' : ''} sur ${T.steps.length}, en ${mins} minute${mins > 1 ? 's' : ''}.</p>
        ${starRow(r.done, T.steps.length)}
        <p class="small">${C.endMsg}</p>
        <div class="stars-total" style="margin-top:10px">★ ${T.stars} <span>étoiles en tout</span></div>
      </div>
      <a class="btn block" href="#/" style="margin-top:20px">${ICON.home} Accueil</a>`;
  }

  function viewRoutineEdit(k) {
    const C = ROUTINES[k], T = routine(k);
    const draw = () => {
      app.innerHTML = `
        ${topbar(`${C.title} · missions`, `#/r/${k}`)}
        <p class="muted small" style="margin:-6px 4px 12px">Une action simple et concrète par mission, avec ses mots à lui si possible. L’image peut être un emoji.</p>
        ${T.steps.map((s, i) => `
          <div class="card edit-step" data-i="${i}">
            <div class="row" style="align-items:center;flex-wrap:nowrap">
              <input type="text" class="e" value="${esc(s.e)}" maxlength="4" aria-label="Image" style="width:64px;text-align:center;font-size:1.4rem;padding:8px">
              <input type="text" class="t" value="${esc(s.t)}" maxlength="70" aria-label="Mission">
            </div>
            <div class="row" style="align-items:center;margin-top:8px;flex-wrap:nowrap">
              <span class="small muted" style="font-weight:800">Durée</span>
              <select class="m" aria-label="Durée">${[1, 2, 3, 4, 5, 8, 10].map((n) => `<option value="${n}" ${n === s.min ? 'selected' : ''}>${n} min</option>`).join('')}</select>
              <button class="iconbtn" data-a="up" aria-label="Monter" ${i === 0 ? 'disabled' : ''}>${ICON.up}</button>
              <button class="iconbtn" data-a="down" aria-label="Descendre" ${i === T.steps.length - 1 ? 'disabled' : ''}>${ICON.down}</button>
              <button class="iconbtn" data-a="del" aria-label="Supprimer">${ICON.trash}</button>
            </div>
          </div>`).join('')}
        <div class="stack">
          <button class="btn soft block" id="add">${ICON.plus} Ajouter une mission</button>
          <button class="btn ${C.btn} block" id="saveT">${ICON.check} Enregistrer</button>
          <button class="btn ghost" id="reset">Revenir aux missions de départ</button>
          <button class="btn ghost" id="zero">Remettre les étoiles à zéro (${T.stars})</button>
        </div>`;
      const collect = () => {
        $$('.edit-step').forEach((c) => {
          const s = T.steps[Number(c.dataset.i)];
          s.e = $('.e', c).value.trim() || '⭐'; s.t = $('.t', c).value.trim(); s.min = Number($('.m', c).value);
        });
      };
      $$('.edit-step [data-a]').forEach((b) => b.addEventListener('click', () => {
        collect();
        const i = Number(b.closest('.edit-step').dataset.i), a = b.dataset.a;
        if (a === 'up' && i > 0) [T.steps[i - 1], T.steps[i]] = [T.steps[i], T.steps[i - 1]];
        if (a === 'down' && i < T.steps.length - 1) [T.steps[i + 1], T.steps[i]] = [T.steps[i], T.steps[i + 1]];
        if (a === 'del') T.steps.splice(i, 1);
        save(); draw();
      }));
      $('#add').addEventListener('click', () => { collect(); T.steps.push({ id: uid(), e: '⭐', t: '', min: 2 }); save(); draw(); const last = $$('.edit-step .t').pop(); if (last) last.focus(); });
      $('#saveT').addEventListener('click', () => { collect(); T.steps = T.steps.filter((s) => s.t); save(); toast('Missions enregistrées'); go(`#/r/${k}`); });
      $('#reset').addEventListener('click', () => { if (!confirmInline($('#reset'), 'Touchez encore pour confirmer')) return; T.steps = C.steps.map((s) => ({ ...s, id: uid() })); save(); draw(); });
      $('#zero').addEventListener('click', () => { if (!confirmInline($('#zero'), 'Touchez encore pour confirmer')) return; T.stars = 0; save(); draw(); });
    };
    draw();
  }
  /* ---------- Mes étoiles (jour / semaine / mois) ---------- */
  const STAR_SRC = {
    ranger: { label: 'Ma chambre', icon: 'basket' },
    habiller: { label: 'M’habiller', icon: 'shirt' },
    toilette: { label: 'Ma toilette', icon: 'drop' },
    devoirs: { label: 'Mes devoirs', icon: 'pencil' },
    defi: { label: 'Défis réussis', icon: 'timer' }
  };
  function starLog() {
    if (!Array.isArray(db.starLog)) {
      // Première ouverture : on reprend l'historique des missions déjà terminées
      db.starLog = [];
      const R = db.routines || {};
      if (db.tidy && !R.ranger) R.ranger = db.tidy;
      Object.entries(R).forEach(([k, r]) => (r.history || []).forEach((h) => { for (let i = 0; i < (h.done || 0); i++) db.starLog.push({ at: h.at, src: k }); }));
      db.starLog.sort((a, b) => a.at - b.at);
    }
    return db.starLog;
  }
  function addStar(src) { const L = starLog(); L.push({ at: Date.now(), src }); if (L.length > 10000) L.splice(0, L.length - 10000); save(); }
  function startOf(unit, ref = new Date()) {
    const d = new Date(ref); d.setHours(0, 0, 0, 0);
    if (unit === 'week') { const wd = (d.getDay() + 6) % 7; d.setDate(d.getDate() - wd); }
    if (unit === 'month') d.setDate(1);
    return d.getTime();
  }
  const starsSince = (t, until = Infinity) => starLog().filter((s) => s.at >= t && s.at < until).length;

  function viewStars() {
    let period = sessionStorage.getItem('bc-starp') || 'week';
    let offset = 0; // 0 = période en cours, -1 = précédente…
    const draw = () => {
      sessionStorage.setItem('bc-starp', period);
      const now = new Date();
      let from, to, title, bars = [];
      if (period === 'day') {
        const d = new Date(now); d.setDate(d.getDate() + offset);
        from = startOf('day', d); to = from + 86400000;
        title = offset === 0 ? 'Aujourd’hui' : offset === -1 ? 'Hier' : new Date(from).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
      } else if (period === 'week') {
        const d = new Date(now); d.setDate(d.getDate() + offset * 7);
        from = startOf('week', d); to = from + 7 * 86400000;
        title = offset === 0 ? 'Cette semaine' : offset === -1 ? 'La semaine dernière' : `Semaine du ${new Date(from).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}`;
        const names = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        for (let i = 0; i < 7; i++) { const a = from + i * 86400000; bars.push({ l: names[i], n: starsSince(a, a + 86400000), today: a === startOf('day') }); }
      } else {
        const d = new Date(now.getFullYear(), now.getMonth() + offset, 1);
        from = d.getTime(); to = new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime();
        title = offset === 0 ? 'Ce mois-ci' : d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        for (let a = from, i = 1; a < to; a = new Date(d.getFullYear(), d.getMonth(), ++i).getTime()) bars.push({ l: String(i), n: starsSince(a, new Date(d.getFullYear(), d.getMonth(), i + 1).getTime()), today: a === startOf('day') });
      }
      const total = starsSince(from, to);
      const max = Math.max(1, ...bars.map((b) => b.n));
      const bySrc = Object.keys(STAR_SRC).map((k) => ({ k, n: starLog().filter((s) => s.at >= from && s.at < to && s.src === k).length })).filter((x) => x.n);
      const prevTotal = period === 'day' ? starsSince(from - 86400000, from) : period === 'week' ? starsSince(from - 7 * 86400000, from) : starsSince(new Date(new Date(from).getFullYear(), new Date(from).getMonth() - 1, 1).getTime(), from);
      app.innerHTML = `
        ${topbar('Mes étoiles')}
        <div class="chips seg" id="per" style="margin-bottom:14px">
          ${[['day', 'Jour'], ['week', 'Semaine'], ['month', 'Mois']].map(([k, l]) => `<button class="chip" data-p="${k}" aria-pressed="${k === period}">${l}</button>`).join('')}
        </div>
        <div class="card cut center">
          <div class="row" style="align-items:center;flex-wrap:nowrap">
            <button class="iconbtn" id="prev" aria-label="Période précédente">${ICON.back}</button>
            <h2 style="flex:1;text-transform:none">${title}</h2>
            <button class="iconbtn" id="next" aria-label="Période suivante" ${offset >= 0 ? 'disabled' : ''} style="transform:scaleX(-1)">${ICON.back}</button>
          </div>
          <div class="bigstar">★ ${total}</div>
          <p class="muted" style="font-weight:800;margin:0">étoile${total > 1 ? 's' : ''}${total && total >= prevTotal && prevTotal ? ' · aussi bien ou mieux que la fois d’avant 💪' : ''}</p>
          ${bars.length ? `<div class="bars ${period}">${bars.map((b) => `<div class="bar${b.today ? ' today' : ''}" title="${b.n}"><span class="v">${b.n || ''}</span><i style="height:${Math.round((b.n / max) * 100)}%"></i><span class="l">${b.l}</span></div>`).join('')}</div>` : ''}
        </div>
        <div class="card">
          <h3 style="margin-bottom:6px">D’où viennent mes étoiles</h3>
          ${bySrc.length ? bySrc.map((x) => `<div class="tidy-row"><span class="tidy-e" style="width:32px">${ICON[STAR_SRC[x.k].icon].replace('<svg', '<svg width="28" height="28"')}</span><span class="tidy-t">${STAR_SRC[x.k].label}</span><b style="color:#C98A12">★ ${x.n}</b></div>`).join('') : '<p class="muted">Pas encore d’étoile sur cette période. Une mission ou un défi, et c’est parti !</p>'}
        </div>
        <div class="grid2" style="margin-top:4px">
          <div class="stat"><b>${starsSince(startOf('day'))}</b><span>aujourd’hui</span></div>
          <div class="stat"><b>${starsSince(startOf('week'))}</b><span>cette semaine</span></div>
          <div class="stat"><b>${starsSince(startOf('month'))}</b><span>ce mois-ci</span></div>
          <div class="stat"><b>${starLog().length}</b><span>depuis le début</span></div>
        </div>`;
      $$('#per .chip').forEach((b) => b.addEventListener('click', () => { period = b.dataset.p; offset = 0; draw(); }));
      $('#prev').addEventListener('click', () => { offset--; draw(); });
      $('#next').addEventListener('click', () => { if (offset < 0) { offset++; draw(); } });
    };
    draw();
  }

  /* ---------- Expliquer le TDAH à mon enfant ---------- */
  const EXPLAIN_LINKS = [
    { group: 'À regarder ensemble', kind: 'video', title: 'Le TDAH expliqué aux enfants : et si c’était un super pouvoir ?', by: 'Jennifer Wilson', url: 'https://www.youtube.com/watch?v=EdmbGHgDpvA' },
    { group: 'À regarder ensemble', kind: 'video', title: 'Raph et le TDAH', by: 'Synapse 360', url: 'https://www.youtube.com/watch?v=0CRBlb08poM' },
    { group: 'À regarder ensemble', kind: 'video', title: 'Qu’est-ce que le TDAH ?', by: 'Alice Gendron · La Mini Coach TDAH · 6 min', url: 'https://www.youtube.com/watch?v=YSWsc8mk1Co' },
    { group: 'Série vidéo CADDAC', kind: 'video', title: 'Vidéo 1', by: 'CADDAC – Centre de sensibilisation au TDAH Canada', url: 'https://www.youtube.com/watch?v=EAmXnm-XG_Y' },
    { group: 'Série vidéo CADDAC', kind: 'video', title: 'Vidéo 2', by: 'CADDAC – Centre de sensibilisation au TDAH Canada', url: 'https://www.youtube.com/watch?v=URjdLzEy5eA' },
    { group: 'Série vidéo CADDAC', kind: 'video', title: 'Vidéo 3 (à partir de 1:20)', by: 'CADDAC – Centre de sensibilisation au TDAH Canada', url: 'https://www.youtube.com/watch?v=rTw94ON77kU&t=80s' },
    { group: 'À lire (parent)', kind: 'link', title: 'Comment expliquer le TDAH à mon enfant', by: 'CENTAM – clinique de neuropsychologie, Montréal', url: 'https://centam.ca/comment-expliquer-le-tdah-a-mon-enfant/' },
    { group: 'À lire (parent)', kind: 'link', title: 'Désencombrer quand on a un TDAH (webinaire)', by: 'CADDAC', url: 'https://caddac.ca/fr/programs-events/comment-desencombrer-quand-on-a-un-tdah-et-quon-se-noie-dans-nos-objets/' }
  ];

  // « Ils en parlent » : personnes qui ont parlé elles-mêmes de leur diagnostic.
  const VOICES = [
    { n: 'Louane', r: 'Chanteuse', e: '🎤', w: 'Elle perd le fil d’une conversation quand une pensée l’emporte. Elle en parle parce qu’enfant, elle aurait aimé le savoir.', k: 'enfant', v: 'TDAH : la chanteuse Louane témoigne', by: 'C à vous · 6 min', url: 'https://www.youtube.com/watch?v=UAdMqrvHoMM' },
    { n: 'Philippe Katerine', r: 'Chanteur, comédien', e: '🎹', w: 'Diagnostiqué à 57 ans. Pas hyperactif du tout : il parle en riant de son « trouble d’attention mou », et se sent bien en studio devant ses dessins.', k: 'enfant', v: 'L’interview dans Clique (à 17:45)', by: 'Clique TV · nov. 2026 · ~2 min', url: 'https://www.youtube.com/watch?v=EOhSI9A0o_w&t=1065s' },
    { n: 'Simone Biles', r: 'Gymnaste, championne olympique', e: '🤸', w: 'Ses données médicales ont été piratées en 2016. Elle a répondu publiquement qu’elle avait un TDAH et un traitement depuis l’enfance : il n’y a pas de quoi avoir honte.', k: 'enfant', v: '« Il n’y a pas de quoi avoir honte »', by: 'Maman à maman, au cœur du TDAH · 6 min', url: 'https://www.youtube.com/watch?v=rR2m_UYQ2Zc' },
    { n: 'Michel Cymes', r: 'Chirurgien ORL, animateur', e: '🩺', w: 'Diagnostiqué après 55 ans. Il dit que s’ennuyer vite l’a obligé à être créatif, et que c’est devenu un atout dans son métier.', k: 'parent', v: 'Et si vous étiez TDAH sans le savoir ?', by: 'C à vous · 10 min', url: 'https://www.youtube.com/watch?v=Rpdis2s55Kw' },
    { n: 'Jérémy Ferrari', r: 'Humoriste', e: '🎭', w: 'Il se sentait différent depuis ses 14 ans, bien avant de mettre un mot dessus.', k: 'parent', v: '« Depuis mes 14 ans, je me sentais différent »', by: 'Clique TV · 24 min', url: 'https://www.youtube.com/watch?v=IvwdK9s1kOg' },
    { n: 'Manu Payet', r: 'Humoriste, comédien', e: '😄', w: 'Le boute-en-train de la classe pendant toute sa scolarité. Diagnostic très tardif : « J’aurais aimé le savoir à l’époque. »', k: 'parent', v: 'L’article de Paris Match', by: 'juin 2026', url: 'https://www.parismatch.be/actualites/people/2026/06/15/ce-trouble-diagnostique-chez-manu-payet-a-lage-adulte-jaurais-aime-le-savoir-a-lepoque-2SOPLCO7OZCKLPJSAFVVLXED6I/' },
    { n: 'Maïtena Biraben', r: 'Animatrice', e: '📺', w: 'Diagnostic d’autisme et de TDAH à 57 ans : « J’ai 57 ans de ma vie à revisiter. »', k: 'parent', v: 'Son témoignage sans filtre', by: 'Le Nouvel Obs · 24 min', url: 'https://www.youtube.com/watch?v=0jpVsfiyqoI' },
    { n: 'Laure Bailacq', r: 'Championne de France de boxe française', e: '🥊', w: 'Diagnostiquée tard. Elle a compris que la boxe était depuis toujours le traitement qu’elle se prescrivait sans le savoir.', k: 'parent', v: 'Championne devenue coach', by: 'LabO RNP · 27 min', url: 'https://www.youtube.com/watch?v=VA2x0mS16ow' },
    { n: 'Alice Gendron', r: 'Autrice du « Petit guide illustré du TDAH »', e: '✏️', w: 'Diagnostiquée à 29 ans, soulagée d’un grand poids. Elle a mis ses gribouillages dans un livre pour expliquer le TDAH en images.', k: 'parent', v: 'Mieux vivre avec un TDAH', by: 'Métamorphose · 52 min', url: 'https://www.youtube.com/watch?v=quayEihABlY' },
    { n: 'Catherine Testa', r: 'Cheffe d’entreprise', e: '💼', w: '« On m’a dit que j’avais bien trop réussi ma vie pour avoir un TDAH. » Ses notes dépendaient de sa place dans la classe.', k: 'parent', v: 'Sa conférence « TDAH : et alors ? » (à 16:05)', by: 'ITS Pierre Bourdieu', url: 'https://www.youtube.com/watch?v=GXoLHMbTblY&t=965s' }
  ];

  function viewExplain() {
    const mine = db.links || [];
    const all = [...EXPLAIN_LINKS, ...mine.map((l) => ({ ...l, group: 'Mes liens', kind: /youtu/.test(l.url) ? 'video' : 'link', mine: true }))];
    const groups = [...new Set(all.map((l) => l.group))];
    app.innerHTML = `
      ${topbar('Expliquer le TDAH')}
      <div class="card cut">
        <h3>Quelques repères pour en parler</h3>
        <ul class="tips">
          <li><b>Des mots simples et rassurants.</b> Un trouble, ce n’est pas une maladie qu’on attrape ou qu’on transmet, et ce n’est pas grave.</li>
          <li><b>Une image qu’il comprend.</b> Une tablette où toutes les applis s’ouvrent en même temps, une télé qui change de chaîne toute seule, des idées qui sautent comme un kangourou.</li>
          <li><b>Ce n’est pas de sa faute.</b> Il ne fait pas exprès : son cerveau fonctionne autrement, ce qui rend plus difficile de se concentrer ou de rester en place.</li>
          <li><b>Il y a des astuces.</b> Les minuteurs, les missions, la boîte pour se calmer : c’est fait pour l’aider, et ça marche de mieux en mieux en grandissant.</li>
          <li><b>Ses forces aussi.</b> Imagination, énergie, humour, curiosité… Le TDAH, c’est sa particularité, comme d’autres ont un grand nez ou sont plus petits.</li>
        </ul>
        <p class="muted small" style="margin:8px 0 0">D’après le guide de Faré (<i>TDAH chez l’enfant</i>) et l’article de CENTAM.</p>
      </div>
      ${groups.map((g) => `
        <div class="section-title">${esc(g)}</div>
        ${all.filter((l) => l.group === g).map((l) => `
          <div class="linkrow">
            <a class="entry linkcard" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">
              <span class="lk-ic">${ICON[l.kind === 'video' ? 'play' : 'link']}</span>
              <span class="lk-tx"><b>${esc(l.title)}</b>${l.by ? `<span>${esc(l.by)}</span>` : ''}</span>
            </a>
            ${l.mine ? `<button class="iconbtn" data-del="${l.id}" aria-label="Supprimer ce lien">${ICON.trash}</button>` : ''}
          </div>`).join('')}`).join('')}
      <div class="section-title">Ils en parlent</div>
      <p class="muted small" style="margin:-4px 4px 10px">Des personnes qui ont parlé elles-mêmes de leur diagnostic. Les trois premières se regardent bien avec un enfant.</p>
      ${VOICES.map((p) => `
        <details class="fiche card voice">
          <summary><span class="v-e">${esc(p.e)}</span><span class="v-t"><b>${esc(p.n)}</b><span class="muted small">${esc(p.r)}</span></span>${p.k === 'enfant' ? '<span class="tag ok">avec l’enfant</span>' : ''}</summary>
          <p style="font-weight:700">${esc(p.w)}</p>
          <a class="btn soft block" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${ICON.play} ${esc(p.v)} <span class="muted small">· ${esc(p.by)}</span></a>
        </details>`).join('')}
      <div class="card" style="margin-top:14px">
        <h3>Ajouter un lien</h3>
        <label class="lab" for="lt">Titre</label>
        <input type="text" id="lt" maxlength="90" placeholder="Ex. : Vidéo sur l’attention">
        <label class="lab" for="lu">Adresse</label>
        <input type="text" id="lu" inputmode="url" placeholder="https://…">
        <button class="btn soft block" style="margin-top:12px" id="addl">${ICON.plus} Ajouter</button>
      </div>
      <p class="muted small center">Les liens s’ouvrent dans le navigateur et demandent une connexion Internet. Regarder la vidéo à deux, puis en parler, aide l’enfant à se l’approprier.</p>`;
    $('#addl').addEventListener('click', () => {
      const t = $('#lt').value.trim(); let u = $('#lu').value.trim();
      if (!u) return toast('Collez l’adresse du lien');
      if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
      try { new URL(u); } catch (e) { return toast('Adresse invalide'); }
      db.links = db.links || []; db.links.push({ id: uid(), title: t || u, url: u, by: '' }); save(); toast('Lien ajouté'); render();
    });
    $$('[data-del]').forEach((b) => b.addEventListener('click', () => {
      if (!confirmInline(b, '?')) return;
      db.links = (db.links || []).filter((l) => l.id !== b.dataset.del); save(); render();
    }));
  }

  /* ---------- Fiches pour le parent (résumés) ---------- */
  const TPP = { name: 'TDAH Partout Pareil', url: 'https://www.tdah-partout-pareil.info' };
  const FICHES = [
    { g: 'Au quotidien', t: 'Le moment des devoirs', src: TPP, app: ['#/r/devoirs', 'Ouvrir « Mes devoirs »'], pts: [
      'Après l’école, il est déjà fatigué d’avoir dû se contenir et se concentrer toute la journée ; un éventuel traitement arrive en fin d’effet.',
      'Avant de commencer : un temps de repos et un vrai goûter. Puis un coin calme, bien éclairé, sans écran ni distraction.',
      'Le parent est disponible et détendu, donne une seule consigne à la fois, laisse faire seul et recentre seulement si besoin.',
      'Commencer par le plus difficile, finir par le plus facile. Faire une pause aux premiers signes de fatigue ; si c’est trop, un mot à l’enseignant.',
      'Un programme affiché (devoirs, jeux, repas, activités) avec une case à cocher ; noter les devoirs de la semaine quand on a l’agenda, pour le soir où il l’oublie.',
      'Voir avec l’enseignant : devoirs donnés à l’avance, et une trousse « de secours » avec le matériel en double.'
    ] },
    { g: 'Au quotidien', t: 'Le travail à la maison (ados, adaptable aux plus jeunes)', src: TPP, pts: [
      'Une routine fixe : toujours le même moment, le même endroit, du matériel réservé à ce moment-là.',
      'Un bureau dégagé, une couleur par matière, ce qui est prioritaire bien en vue.',
      'Des listes avec des priorités et des dates, affichées, qu’on raye au fur et à mesure.',
      'Une seule chose à la fois, les écrans éloignés.',
      'Le droit de bouger : travailler debout, manipuler, gribouiller. Rendre la leçon vivante (dessins, gestes, vidéos).'
    ] },
    { g: 'Comportement', t: 'L’opposition (TOP) : comprendre', src: TPP, pts: [
      'Le trouble oppositionnel avec provocation, c’est une opposition fréquente et durable : colères, contestation, provocations, rancune, depuis au moins 6 mois.',
      'Il accompagne souvent le TDAH (autour d’un enfant sur deux selon la fiche).',
      'Il s’installe en spirale : remarques négatives, conflits, encore plus d’opposition, à l’école comme à la maison.',
      'Les mots qu’il lance cherchent souvent à tester les limites : ne pas les prendre au pied de la lettre, ne pas tomber dans le piège.'
    ] },
    { g: 'Comportement', t: 'L’opposition (TOP) : comment en sortir', src: TPP, app: ['#/etoiles', 'Voir « Mes étoiles »'], pts: [
      'Arrêter peu à peu de réagir aux comportements indésirables. Au début, ça peut empirer (il teste la nouvelle règle), puis ça s’éteint si on reste calme.',
      'Féliciter chaque comportement attendu, même « normal », et le dire en « je » : « je suis contente que tu aies rangé ».',
      'Une seule remarque à la fois, sans jugement sur la personne : éviter « tu es… » et « tu ne… jamais ».',
      'Un tableau de points : 3 ou 4 objectifs faciles d’abord, un bilan positif chaque semaine, jamais retirer une récompense gagnée.',
      'En cas de débordement : un temps pour se calmer (environ une minute par année d’âge, 15 au maximum), sans humiliation.',
      'Des défouloirs sains : crier dans un coussin, trampoline, bataille de coussins… et l’humour pour couper la spirale.',
      'Se faire aider si besoin : programme Barkley pour les parents, psychologue, TCC, psychomotricien, méthode REACT.'
    ] },
    { g: 'Santé', t: 'Sommeil et TDAH', src: TPP, pts: [
      'Environ trois personnes avec un TDAH sur quatre ont aussi des troubles du sommeil (entretien avec la psychiatre Sandra Kooij, 2017).',
      'Leur horloge interne est souvent décalée : endormissement plus tardif, plus d’éveil le soir.',
      'Le manque de sommeil chronique aggrave les difficultés au quotidien.',
      'Mélatonine le soir ou lumière le matin peuvent aider certaines personnes : à discuter avec le médecin.'
    ] },
    { g: 'École', t: 'Le TDAH à l’école (livret)', src: TPP, pts: [
      'Le TDAH vient du fonctionnement du cerveau, pas d’un manque d’éducation ou de volonté ; il se présente sous 3 formes (inattention, hyperactivité-impulsivité, mixte).',
      'Ce qui ressemble à de l’insolence n’est pas une hostilité volontaire.',
      'La plupart des enfants concernés ont besoin d’aménagements pédagogiques, parfois d’une aide humaine ou matérielle, via des plans scolaires ou la MDPH.',
      'Un vrai partenariat famille – école – enfant – professionnels, régulier et bienveillant, qui souligne aussi les progrès.',
      'Ses forces : imagination, créativité, énergie, enthousiasme, spontanéité, originalité.'
    ] },
    { g: 'Comprendre et en parler', t: 'Relations avec les autres enfants (guide pédagogique)', src: { name: 'Fondation Jasmin Roy Sophie Desmarais' }, pts: [
      'Un guide pour mieux comprendre les comportements liés au TDAH, les expliquer aux autres enfants et mieux intervenir.',
      'Le TDAH, on ne l’attrape pas : on naît avec.',
      'La fratrie : lui expliquer que les besoins de son frère ou sa sœur sont différents, garder du temps pour chaque enfant et célébrer aussi ses réussites.',
      'À l’école : la récréation est essentielle (ne pas la supprimer comme punition) ; le sport, la musique ou le théâtre aident à se faire des amis.',
      'Parents et enseignant forment une équipe : les parents sont les experts de leur enfant.'
    ] },
    { g: 'Aides et démarches', t: 'Dispositifs et plateformes de soutien', src: TPP, pts: [
      'PCO (plateformes de coordination et d’orientation) pour un repérage et un accompagnement précoces, sur orientation du médecin, du pédiatre ou du médecin scolaire.',
      'Autres relais : PCPE, DAC (dispositifs d’appui à la coordination), réseaux régionaux spécialisés dans les troubles du neurodéveloppement.',
      'À l’école : les EMAS (équipes mobiles d’appui à la scolarisation) peuvent épauler l’équipe éducative.',
      'Des plateformes téléphoniques d’écoute et d’orientation existent ; la fiche donne les contacts par région.'
    ] },
    { g: 'Aides et démarches', t: 'Souffler : solutions de répit, haltes-garderies, centres de loisirs', src: TPP, pts: [
      'Accueil temporaire, plateformes de répit, aide à domicile ou garde d’enfant à la maison : pour quelques heures, un week-end ou les vacances.',
      'Des crèches, haltes-garderies, centres de loisirs et séjours accueillent les enfants « différents », avec des pistes de financement.',
      'Les fiches listent des adresses par région : demandez-les à l’association.',
      'Demander de l’aide n’est pas un échec : un parent qui se repose aide mieux son enfant.'
    ] },
    { g: 'Aides et démarches', t: 'Le dossier MDPH', src: TPP, pts: [
      'La MDPH ouvre l’accès à des aides et à des aménagements (dont les plans scolaires). L’association propose un guide pour monter le dossier ; la version reçue concerne les adultes (AAH, etc.).',
      'L’association accompagne ses adhérents pour les dossiers plus complexes.'
    ] }
  ];
  function viewFiches() {
    const groups = [...new Set(FICHES.map((f) => f.g))];
    app.innerHTML = `
      ${topbar('Fiches pour le parent')}
      <p class="muted small" style="margin:-6px 4px 12px">Résumés des fiches que vous avez rassemblées. Touchez une fiche pour l’ouvrir. Pour les documents complets, rendez-vous sur le site de l’association.</p>
      ${groups.map((g) => `
        <div class="section-title">${esc(g)}</div>
        ${FICHES.filter((f) => f.g === g).map((f) => `
          <details class="fiche card">
            <summary><b>${esc(f.t)}</b><span class="muted small">${esc(f.src.name)}</span></summary>
            <ul class="tips">${f.pts.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
            <div class="row" style="margin-top:8px">
              ${f.app ? `<a class="btn sun" href="${f.app[0]}">${esc(f.app[1])}</a>` : ''}
              ${f.src.url ? `<a class="btn soft" href="${f.src.url}" target="_blank" rel="noopener noreferrer">${ICON.link} Site de l’association</a>` : ''}
            </div>
          </details>`).join('')}`).join('')}
      <p class="muted small center" style="margin-top:14px">Ces résumés ne remplacent pas l’avis d’un professionnel de santé.</p>`;
  }

  /* ---------- Bruit blanc ---------- */
  const NOISES = {
    blanc: { label: 'Blanc', desc: 'Le plus couvrant. Comme un ventilateur.', c: 'c-sky' },
    rose: { label: 'Rose', desc: 'Plus doux, plus grave. Comme la pluie.', c: 'c-sage' },
    brun: { label: 'Brun', desc: 'Le plus grave. Comme la mer au loin.', c: 'c-terra' }
  };
  // Boucle audio fabriquée dans le téléphone : aucun fichier à télécharger.
  function makeNoiseURL(type, seconds = 12, sr = 44100) {
    const n = Math.floor(sr * seconds), buf = new Float32Array(n);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      let v;
      if (type === 'blanc') v = w;
      else if (type === 'rose') {
        b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.96900 * b2 + w * 0.1538520; b3 = 0.86650 * b3 + w * 0.3104856;
        b4 = 0.55000 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.0168980;
        v = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926;
      } else { last = (last + 0.02 * w) / 1.02; v = last * 3.5; }
      buf[i] = v;
    }
    // Fondu enchaîné pour une boucle sans accroc
    const xf = Math.floor(sr * 0.4);
    for (let i = 0; i < xf; i++) { const t = i / xf; buf[i] = buf[n - xf + i] * (1 - t) + buf[i] * t; }
    const len = n - xf;
    let peak = 0; for (let i = 0; i < len; i++) { const a = Math.abs(buf[i]); if (a > peak) peak = a; }
    const g = peak > 0 ? 0.85 / peak : 1;
    const ab = new ArrayBuffer(44 + len * 2), dv = new DataView(ab);
    const str = (o, t) => { for (let i = 0; i < t.length; i++) dv.setUint8(o + i, t.charCodeAt(i)); };
    str(0, 'RIFF'); dv.setUint32(4, 36 + len * 2, true); str(8, 'WAVEfmt ');
    dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true);
    dv.setUint32(24, sr, true); dv.setUint32(28, sr * 2, true); dv.setUint16(32, 2, true);
    dv.setUint16(34, 16, true); str(36, 'data'); dv.setUint32(40, len * 2, true);
    for (let i = 0; i < len; i++) { let v = buf[i] * g; v = v < -1 ? -1 : v > 1 ? 1 : v; dv.setInt16(44 + i * 2, v * 32767, true); }
    return URL.createObjectURL(new Blob([ab], { type: 'audio/wav' }));
  }

  const hms = (ms) => { const t = Math.max(0, Math.ceil(ms / 1000));
    return t >= 3600 ? `${Math.floor(t / 3600)} h ${pad2(Math.floor(t % 3600 / 60))}` : mmss(ms); };
  const fadeTxt = (ms) => { if (ms < 60000) return `les ${Math.round(ms / 1000)} dernières secondes`;
    const m = Math.round(ms / 60000); return m <= 1 ? 'la dernière minute' : `les ${m} dernières minutes`; };
  let noise = null, noiseTick = null;
  const noiseLeft = () => noise ? noise.end - Date.now() : 0;
  function noiseBanner() {
    if (!noise) return '';
    return `<a class="banner" href="#/bruit" style="background:var(--sky-soft);border-color:var(--sky)">${ICON.waves.replace('<svg', '<svg style="color:var(--sky)"')}<div><strong>Bruit ${esc(NOISES[noise.type].label.toLowerCase())} en cours</strong><span>S’éteint à ${fmtTime(noise.end)} · reste ${hms(noiseLeft())}</span></div></a>`;
  }
  function stopNoise() {
    if (noiseTick) { clearInterval(noiseTick); noiseTick = null; }
    if (noise) { try { noise.el.pause(); URL.revokeObjectURL(noise.url); } catch (e) { /* rien */ } noise = null; }
  }
  function startNoise(type, min, vol) {
    stopNoise();
    const url = makeNoiseURL(type);
    const el = new Audio(url);
    el.loop = true; el.volume = 0;
    const dur = min * 60000;
    const fadeIn = 20000;
    const fadeOut = Math.min(180000, Math.max(30000, dur * 0.1));
    noise = { type, url, el, start: Date.now(), end: Date.now() + dur, dur, fadeIn, fadeOut, vol };
    el.play().catch(() => toast('Le son n’a pas pu démarrer'));
    try {
      if ('mediaSession' in navigator) navigator.mediaSession.metadata = new MediaMetadata({ title: 'Bruit ' + NOISES[type].label.toLowerCase(), artist: 'Boussole calme' });
    } catch (e) { /* rien */ }
    noiseTick = setInterval(() => {
      if (!noise) return;
      const now = Date.now(), left = noise.end - now, since = now - noise.start;
      let v = noise.vol;
      if (since < noise.fadeIn) v = noise.vol * (since / noise.fadeIn);
      if (left < noise.fadeOut) v = Math.min(v, noise.vol * Math.max(0, left / noise.fadeOut));
      try { noise.el.volume = Math.max(0, Math.min(1, v)); } catch (e) { /* rien */ }
      if (left <= 0) { stopNoise(); if (location.hash === '#/bruit') render(); }
    }, 250);
    db.settings.noise = { type, min, vol }; save();
  }

  function viewNoise() {
    if (noise) return noisePlaying();
    const pref = db.settings.noise || { type: 'blanc', min: 45, vol: 0.5 };
    let type = NOISES[pref.type] ? pref.type : 'blanc', min = pref.min || 45, vol = pref.vol || 0.5;
    const presets = [5, 10, 15, 20, 30, 45, 60, 90, 120];
    const dur = (m) => m < 60 ? m + ' min' : (m / 60 % 1 ? (m / 60).toFixed(1).replace('.', ' h ').replace(' h 5', ' h 30') : m / 60 + ' h');
    const paint = () => {
      app.innerHTML = `
        ${topbar('Mon bruit blanc')}
        <div class="card cut center">
          <div class="${NOISES[type].c}" style="width:76px;margin:0 auto">${ICON.waves}</div>
          <p style="font-weight:800;margin-top:4px">Un son régulier qui couvre les bruits de la maison et aide à s’endormir ou à se concentrer.</p>
        </div>
        <label class="lab" style="margin-top:4px">Quel son ?</label>
        <div class="chips seg" id="ty">${Object.entries(NOISES).map(([k, v]) => `<button class="chip" data-v="${k}" aria-pressed="${k === type}">${v.label}</button>`).join('')}</div>
        <p class="muted small" style="margin:8px 4px 0">${esc(NOISES[type].desc)}</p>
        <label class="lab">Pendant combien de temps ?</label>
        <div class="card cut center" style="padding:14px">
          <div class="stepper">
            <button class="iconbtn big" id="minus" aria-label="Moins 5 minutes">−</button>
            <div><div class="bignum${min < 60 ? '' : ' nw'}">${min < 60 ? min : (min % 60 ? (min - min % 60) / 60 + ' h ' + (min % 60) : min / 60 + ' h')}</div><div class="muted" style="font-weight:800">${min < 60 ? 'minutes' : ''}</div></div>
            <button class="iconbtn big" id="plus1" aria-label="Plus 5 minutes">+</button>
          </div>
          <div class="chips" id="pre" style="justify-content:center;margin-top:12px">${presets.map((m) => `<button class="chip" data-v="${m}" aria-pressed="${m === min}">${dur(m)}</button>`).join('')}</div>
        </div>
        <label class="lab" for="vol">Volume</label>
        <input type="range" id="vol" min="5" max="100" value="${Math.round(vol * 100)}" class="slider">
        <button class="btn sky block" style="margin-top:16px" id="go">${ICON.waves} Démarrer</button>
        <p class="hint" style="margin-top:12px">Le son monte doucement pendant 20 secondes, puis redescend tout seul à la fin : l’extinction est progressive, pour ne réveiller personne. L’heure d’extinction reste affichée pendant toute la durée.</p>
        <p class="muted small center">Pas trop fort, surtout avec un casque. L’écran peut s’éteindre, le son continue.</p>`;
      const set = (m) => { min = Math.max(5, Math.min(120, m)); paint(); };
      $('#minus').addEventListener('click', () => set(min - 5));
      $('#plus1').addEventListener('click', () => set(min + 5));
      $$('#pre .chip').forEach((b) => b.addEventListener('click', () => set(Number(b.dataset.v))));
      $$('#ty .chip').forEach((b) => b.addEventListener('click', () => { type = b.dataset.v; paint(); }));
      $('#vol').addEventListener('input', (e) => { vol = Number(e.target.value) / 100; });
      $('#go').addEventListener('click', () => { startNoise(type, min, vol); render(); });
    };
    paint();
  }

  function noisePlaying() {
    const N = NOISES[noise.type];
    app.innerHTML = `
      ${topbar('Bruit ' + N.label.toLowerCase())}
      <div class="calmtitle">
        <div class="${N.c} noise-anim" style="width:130px;margin:0 auto">${ICON.waves}</div>
        <div class="offat">S’éteint à <b id="at">${fmtTime(noise.end)}</b></div>
        <p class="muted" style="font-weight:800">Reste <span id="left">${hms(noiseLeft())}</span></p>
        <p class="small muted" id="fading">&nbsp;</p>
      </div>
      <label class="lab" for="vol2">Volume</label>
      <input type="range" id="vol2" min="5" max="100" value="${Math.round(noise.vol * 100)}" class="slider">
      <div class="row" style="margin-top:14px">
        <button class="btn soft" id="more15">+ 15 min</button>
        <button class="btn soft" id="less15">− 15 min</button>
      </div>
      <button class="btn block" style="margin-top:10px;background:var(--sky)" id="stop">${ICON.close} Arrêter maintenant</button>`;
    const step = () => {
      if (!noise) return render();
      const left = noiseLeft();
      const l = $('#left'); if (!l) return;
      l.textContent = hms(left);
      $('#at').textContent = fmtTime(noise.end);
      $('#fading').innerHTML = left < noise.fadeOut ? 'Le son baisse doucement…' : `Le son baissera doucement pendant ${fadeTxt(noise.fadeOut)}.`;
    };
    step(); stopTick(); tick = setInterval(step, 1000);
    $('#vol2').addEventListener('input', (e) => { noise.vol = Number(e.target.value) / 100; db.settings.noise = { ...(db.settings.noise || {}), vol: noise.vol }; save(); });
    $('#more15').addEventListener('click', () => { noise.end += 15 * 60000; noise.dur += 15 * 60000; step(); toast('15 minutes de plus'); });
    $('#less15').addEventListener('click', () => { noise.end = Math.max(Date.now() + 30000, noise.end - 15 * 60000); step(); });
    $('#stop').addEventListener('click', () => { stopNoise(); go('#/'); });
  }

  /* ---------- Code parent ---------- */
  function viewPin() {
    const creating = !db.settings.pin;
    let code = '', first = '';
    const draw = (msg = '') => {
      app.innerHTML = `
        ${topbar('Espace parent')}
        <div class="center" style="margin-top:10px">
          <div style="width:64px;margin:0 auto">${ICON.lock}</div>
          <h2 style="margin-top:8px">${creating ? (first ? 'Confirmez le code' : 'Choisissez un code à 4 chiffres') : 'Entrez votre code'}</h2>
          <p class="muted small">${msg || (creating ? 'Il protège le journal et les réglages des petites mains.' : '&nbsp;')}</p>
        </div>
        <div class="pin" id="pin">${[0, 1, 2, 3].map((i) => `<i class="${i < code.length ? 'on' : ''}"></i>`).join('')}</div>
        <div class="pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button data-n="${n}">${n}</button>`).join('')}<span></span><button data-n="0">0</button><button data-del aria-label="Effacer">⌫</button></div>`;
      $$('.pad [data-n]').forEach((b) => b.addEventListener('click', () => press(b.dataset.n)));
      $('.pad [data-del]').addEventListener('click', () => { code = code.slice(0, -1); draw(msg); });
    };
    const press = (n) => {
      if (code.length >= 4) return;
      code += n; draw();
      if (code.length < 4) return;
      setTimeout(() => {
        if (creating && !first) { first = code; code = ''; draw(); return; }
        if (creating) {
          if (code === first) { db.settings.pin = code; save(); return unlock(); }
          first = ''; code = ''; draw('Les deux codes ne correspondent pas. On recommence.'); $('#pin').classList.add('shake'); return;
        }
        if (code === db.settings.pin) return unlock();
        code = ''; draw('Code incorrect.'); $('#pin').classList.add('shake');
      }, 150);
    };
    const unlock = () => {
      sessionStorage.setItem('bc-parent', '1');
      const after = sessionStorage.getItem('bc-after') || '#/parent/journal';
      sessionStorage.removeItem('bc-after');
      go(after);
    };
    draw();
  }

  /* ---------- Journal ---------- */
  function talkTag(c) {
    if (c.talk && c.talk.done) return '<span class="tag ok">Reparlé</span>';
    if (c.reminderAt) return `<span class="tag wait">Prévu ${c.reminderAt <= Date.now() ? 'maintenant' : fmtWhen(c.reminderAt)}</span>`;
    return '<span class="tag todo">À reparler</span>';
  }
  const idots = (n) => `<span class="idots" aria-label="Intensité ${n} sur 5">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`;

  function viewJournal() {
    const list = db.crises.filter((c) => c.end || !db.active || db.active.crisisId !== c.id);
    const monthAgo = Date.now() - 30 * 86400000;
    const recent = list.filter((c) => c.start >= monthAgo);
    const durs = list.filter((c) => c.end).map((c) => c.end - c.start);
    const avg = durs.length ? minutes(durs.reduce((a, b) => a + b, 0) / durs.length) : '–';
    const todo = list.filter((c) => !(c.talk && c.talk.done)).length;
    app.innerHTML = `
      ${topbar('Journal des crises', '#/', `<a class="iconbtn" href="#/parent/reglages" aria-label="Réglages">${ICON.gear}</a>`)}
      <div class="stats">
        <div class="stat"><b>${recent.length}</b><span>sur 30 jours</span></div>
        <div class="stat"><b>${avg}${avg === '–' ? '' : '<small style="font-size:.9rem"> min</small>'}</b><span>durée moyenne</span></div>
        <div class="stat"><b>${todo}</b><span>à reparler</span></div>
      </div>
      ${list.length ? list.map((c) => `
        <button class="entry" data-id="${c.id}">
          <div class="top"><span>${fmtDate(c.start)} · ${fmtTime(c.start)}</span>${talkTag(c)}</div>
          <div class="meta">${c.end ? `${minutes(c.end - c.start)} min` : 'durée non notée'}${c.intensity ? ` · ${idots(c.intensity)}` : ''}${c.place ? ` · ${esc(c.place)}` : ''}</div>
          ${c.triggers.length ? `<div class="meta">${esc(c.triggers.join(' · '))}</div>` : ''}
        </button>`).join('') : `<div class="hint center">Aucune crise notée pour l’instant. Elles apparaîtront ici quand vous utiliserez « Mon temps pour me calmer ».</div>`}`;
    $$('.entry').forEach((b) => b.addEventListener('click', () => go(`#/parent/crise/${b.dataset.id}`)));
  }

  function viewEntry(id) {
    const c = crisis(id); if (!c) return go('#/parent/journal');
    const t = c.talk || {};
    const a = t.answers || {};
    const talkBlock = t.done ? `
      <div class="card">
        <h3>Discussion à froid · ${fmtWhen(t.at)}</h3>
        <dl class="kv" style="margin-top:10px">
          ${a.q1 ? `<dt>Ce qui s’est passé</dt><dd>${esc(a.q1)}</dd>` : ''}
          ${a.meteo || a.q2 ? `<dt>Ressenti</dt><dd>${esc([a.meteo, a.q2].filter(Boolean).join(' — '))}</dd>` : ''}
          ${a.q3 ? `<dt>La prochaine fois</dt><dd>${esc(a.q3)}</dd>` : ''}
          ${(t.repair || []).length || t.repairOther ? `<dt>Réparation</dt><dd>${esc([...(t.repair || []), t.repairOther].filter(Boolean).join(', '))}</dd>` : ''}
          ${(t.gesture || []).length ? `<dt>Réconciliation</dt><dd>${esc(t.gesture.join(', '))}</dd>` : ''}
        </dl>
      </div>` : `
      <div class="card">
        <h3>Discussion à froid</h3>
        <p class="muted small">${c.reminderAt ? `Rappel prévu ${fmtWhen(c.reminderAt)}.` : 'Pas encore planifiée.'}</p>
        <div class="stack" style="margin-top:10px">
          <a class="btn sun block" href="#/froid/${c.id}">${ICON.talk} En parler maintenant</a>
          <button class="btn soft block" id="plan">${ICON.clock} ${c.reminderAt ? 'Changer le rappel' : 'Planifier un rappel'}</button>
        </div>
      </div>`;
    app.innerHTML = `
      ${topbar(`${fmtDate(c.start)} · ${fmtTime(c.start)}`, '#/parent/journal')}
      <div class="card cut">
        <dl class="kv">
          <dt>Durée</dt><dd>${c.end ? `${minutes(c.end - c.start)} min` : '–'}</dd>
          <dt>Intensité</dt><dd>${c.intensity ? idots(c.intensity) : '–'}</dd>
          <dt>Où</dt><dd>${esc(c.place) || '–'}</dd>
          <dt>Déclencheur</dt><dd>${esc(c.triggers.join(', ')) || '–'}</dd>
          <dt>Note</dt><dd>${esc(c.note) || '–'}</dd>
        </dl>
        <button class="btn soft block" style="margin-top:14px" id="edit">${ICON.notebook} Modifier la note</button>
      </div>
      ${talkBlock}
      <button class="btn danger block" id="del">${ICON.trash} Supprimer cette crise</button>`;
    $('#edit').addEventListener('click', () => noteSheet(c.id, () => render()));
    const plan = $('#plan');
    if (plan) plan.addEventListener('click', () => {
      openSheet(`
        <h2>Quand en reparler ?</h2>
        <div class="stack" style="margin-top:12px">
          ${reminderOptions().map((o) => `<button class="btn soft block" data-at="${o.at}">${ICON.clock} ${o.label}</button>`).join('')}
          <button class="btn ghost" data-close>Annuler</button>
        </div>`);
      $$('.sheet [data-at]').forEach((b) => b.addEventListener('click', async () => {
        c.reminderAt = Number(b.dataset.at); c.notified = false; save();
        closeSheet(); render();
        askNotif().then((p) => toast(p === 'granted' ? `Rappel prévu ${fmtWhen(c.reminderAt)}` : `Prévu ${fmtWhen(c.reminderAt)} — visible à l’ouverture`));
      }));
    });
    $('#del').addEventListener('click', () => {
      if (!confirmInline($('#del'), 'Touchez encore pour supprimer')) return;
      db.crises = db.crises.filter((x) => x.id !== c.id); save(); toast('Crise supprimée'); go('#/parent/journal');
    });
  }

  // Confirmation en deux touches (évite les boîtes de dialogue du navigateur)
  function confirmInline(btn, label) {
    if (btn.dataset.armed === '1') return true;
    btn.dataset.armed = '1'; const old = btn.innerHTML; btn.textContent = label;
    setTimeout(() => { if (btn.isConnected) { btn.dataset.armed = ''; btn.innerHTML = old; } }, 3500);
    return false;
  }

  /* ---------- Réglages ---------- */
  function viewSettings() {
    const s = db.settings;
    const perm = 'Notification' in window ? Notification.permission : 'unsupported';
    const permTxt = { granted: 'Activées', denied: 'Bloquées dans le navigateur', default: 'Pas encore autorisées', unsupported: 'Non disponibles sur ce navigateur' }[perm];
    app.innerHTML = `
      ${topbar('Réglages', '#/', `<a class="iconbtn" href="#/parent/journal" aria-label="Journal">${ICON.notebook}</a>`)}
      <div class="card">
        <label class="lab" style="margin-top:0">Durée de « Mon temps pour me calmer »</label>
        <div class="scale" id="cm">${[10, 15, 20, 25, 30].map((n) => `<button aria-pressed="${n === s.crisisMin}" data-v="${n}">${n}</button>`).join('')}</div>
        <p class="muted small">En minutes. Une crise dure souvent 15 à 20 minutes.</p>
        <label class="lab">Temps mort par défaut</label>
        <div class="scale" id="tmin">${[3, 4, 5].map((n) => `<button aria-pressed="${n === s.timeoutMin}" data-v="${n}">${n} min</button>`).join('')}</div>
      </div>
      <div class="card">
        <h3>Rappels</h3>
        <p class="small">Notifications : <b>${permTxt}</b></p>
        ${perm === 'default' ? `<button class="btn soft block" id="perm">${ICON.bell} Autoriser les notifications</button>` : ''}
        <p class="muted small" style="margin-top:8px">Un navigateur ne garantit pas une notification à l’heure exacte si l’appli est fermée (surtout avec l’économie de batterie). Le rappel apparaît aussi en bandeau à chaque ouverture.</p>
      </div>
      <div class="card">
        <h3>Mes données</h3>
        <p class="muted small">Tout est enregistré uniquement sur cet appareil. Pensez à exporter de temps en temps pour garder une copie ou changer de téléphone.</p>
        <div class="stack" style="margin-top:10px">
          <button class="btn soft block" id="exp">${ICON.download} Exporter (fichier .json)</button>
          <label class="btn soft block" style="cursor:pointer">${ICON.upload} Importer un fichier<input type="file" id="imp" accept="application/json,.json" hidden></label>
          <button class="btn soft block" id="pinch">${ICON.lock} Changer le code parent</button>
          <button class="btn danger block" id="wipe">${ICON.trash} Tout effacer</button>
        </div>
      </div>
      <p class="center muted small">Boussole calme · V2.0.1</p>`;
    $$('#cm button').forEach((b) => b.addEventListener('click', () => { s.crisisMin = Number(b.dataset.v); save(); $$('#cm button').forEach((x) => x.setAttribute('aria-pressed', x === b)); }));
    $$('#tmin button').forEach((b) => b.addEventListener('click', () => { s.timeoutMin = Number(b.dataset.v); save(); $$('#tmin button').forEach((x) => x.setAttribute('aria-pressed', x === b)); }));
    const pb = $('#perm'); if (pb) pb.addEventListener('click', async () => { await askNotif(); render(); });
    $('#exp').addEventListener('click', () => {
      const data = { ...db, active: null, settings: { ...db.settings, pin: null }, exportedAt: new Date().toISOString(), app: 'boussole-calme', version: 1 };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `boussole-calme-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      toast('Fichier exporté');
    });
    $('#imp').addEventListener('change', (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const d = JSON.parse(r.result);
          if (d.app !== 'boussole-calme' || !Array.isArray(d.crises)) throw new Error('format');
          const known = new Set(db.crises.map((c) => c.id));
          const added = d.crises.filter((c) => c && c.id && !known.has(c.id));
          db.crises = [...db.crises, ...added].sort((a, b) => b.start - a.start);
          db.meteo = [...(d.meteo || []), ...db.meteo].sort((a, b) => b.at - a.at).slice(0, 500);
          if (Array.isArray(d.starLog)) { const seen = new Set(starLog().map((x) => x.at + x.src)); d.starLog.forEach((x) => { if (!seen.has(x.at + x.src)) db.starLog.push(x); }); db.starLog.sort((a, b) => a.at - b.at); }
          if (Array.isArray(d.links)) { const ku = new Set((db.links || []).map((l) => l.url)); db.links = [...(db.links || []), ...d.links.filter((l) => l && l.url && !ku.has(l.url))]; }
          const knownCards = new Set((db.cards || []).map((c) => c.id));
          db.cards = [...(db.cards || []), ...((d.cards || []).filter((c) => c && c.id && !knownCards.has(c.id)))];
          save(); toast(`${added.length} crise${added.length > 1 ? 's' : ''} importée${added.length > 1 ? 's' : ''}`); render();
        } catch (err) { toast('Ce fichier ne vient pas de Boussole calme.'); }
      };
      r.readAsText(f);
    });
    $('#pinch').addEventListener('click', () => { db.settings.pin = null; save(); sessionStorage.setItem('bc-after', '#/parent/reglages'); go('#/parent'); });
    $('#wipe').addEventListener('click', () => {
      if (!confirmInline($('#wipe'), 'Touchez encore : tout sera effacé')) return;
      const pin = db.settings.pin; db = DEFAULT(); db.settings.pin = pin; save(); toast('Données effacées'); go('#/');
    });
  }

  /* ================= Feuille modale ================= */
  function openSheet(html) {
    closeSheet();
    const back = document.createElement('div');
    back.className = 'sheet-back';
    back.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div>`;
    back.addEventListener('click', (e) => { if (e.target === back || e.target.closest('[data-close]')) closeSheet(); });
    document.body.appendChild(back);
  }
  function closeSheet() { const s = $('.sheet-back'); if (s) s.remove(); }

  /* ================= Démarrage ================= */
  // Écran allumé pendant les minuteurs quand c'est possible
  const awakeNeeded = () => !!db.active || (location.hash === '#/minuteur' && !!db.vtimer);
  let wake = null;
  async function keepAwake(on) {
    try {
      if (on && 'wakeLock' in navigator && !wake) { wake = await navigator.wakeLock.request('screen'); wake.addEventListener('release', () => { wake = null; }); }
      if (!on && wake) { await wake.release(); wake = null; }
    } catch (e) { /* rien */ }
  }
  window.addEventListener('hashchange', () => keepAwake(awakeNeeded()));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) keepAwake(awakeNeeded()); });

  render();
  checkReminders();
  keepAwake(awakeNeeded());
})();
