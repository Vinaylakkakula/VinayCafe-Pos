// ═══════════════════════════════════════════════════════════════
// MOBILE FIX v3 — Complete rewrite
// Fixes: modal save buttons hidden, no menu on floor, no back btn
// ═══════════════════════════════════════════════════════════════

var IS_MOBILE = window.innerWidth <= 768;
window.addEventListener('resize', function(){ IS_MOBILE = window.innerWidth <= 768; });

// ── 1. INJECT CSS ─────────────────────────────────────────────
var style = document.createElement('style');
style.id = 'mob-fix-v3';
style.textContent = `

/* ════ BOTTOM NAV ════════════════════════════════════════════ */
.mob-nav {
  display: none;
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 9000;
  height: 58px; background: var(--bg-2); border-top: 1px solid var(--line);
  align-items: stretch; justify-content: space-around;
}
.mob-nav-btn {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 3px;
  background: none; border: none; cursor: pointer;
  color: var(--text-dim); font-size: 9px; font-weight: 600;
  letter-spacing: .05em; text-transform: uppercase; padding: 6px 2px;
  position: relative; transition: color .15s;
}
.mob-nav-btn svg { width: 20px; height: 20px; stroke-width: 1.75; }
.mob-nav-btn.active { color: var(--amber); }
.mob-nav-btn.active::after {
  content: ''; position: absolute; top: 0; left: 20%; right: 20%;
  height: 2px; background: var(--amber); border-radius: 0 0 2px 2px;
}

/* ════ MENU BOTTOM SHEET ════════════════════════════════════ */
.mob-sheet-backdrop {
  display: none; position: fixed; inset: 0; z-index: 9500;
  background: rgba(0,0,0,.6);
}
.mob-sheet-backdrop.open { display: block; }
.mob-sheet {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 9501;
  height: 88vh; background: var(--bg-2);
  border-radius: 18px 18px 0 0;
  display: flex; flex-direction: column; overflow: hidden;
  transform: translateY(100%);
  transition: transform .32s cubic-bezier(.32,1,.45,1);
  pointer-events: none;
}
.mob-sheet.open { transform: translateY(0); pointer-events: all; }
.mob-sheet-handle {
  width: 36px; height: 4px; background: var(--line);
  border-radius: 2px; margin: 10px auto 0; flex-shrink: 0;
}
.mob-sheet-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px 8px; flex-shrink: 0;
  border-bottom: 1px solid var(--line);
}
.mob-sheet-head h2 { font-size: 15px; font-weight: 700; color: var(--text); margin: 0; }
.mob-sheet-close {
  background: none; border: none; cursor: pointer;
  color: var(--text-dim); font-size: 22px; line-height: 1; padding: 4px;
}
.mob-cat-bar {
  display: flex; overflow-x: auto; gap: 6px;
  padding: 8px 14px; flex-shrink: 0; scrollbar-width: none;
}
.mob-cat-bar::-webkit-scrollbar { display: none; }
.mob-cat-btn {
  flex-shrink: 0; padding: 5px 13px; font-size: 12px; font-weight: 600;
  border-radius: 20px; border: 1px solid var(--line);
  background: none; color: var(--text-dim); cursor: pointer;
  white-space: nowrap; transition: all .15s;
}
.mob-cat-btn.active { background: var(--amber); border-color: var(--amber); color: #000; }
.mob-items-list { flex: 1; overflow-y: auto; padding: 8px 14px 20px; -webkit-overflow-scrolling: touch; }
.mob-item-row {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 0; border-bottom: 1px solid var(--line); cursor: pointer;
}
.mob-item-img {
  width: 60px; height: 60px; border-radius: 8px;
  object-fit: cover; flex-shrink: 0; background: var(--bg-3);
}
.mob-item-emoji {
  width: 60px; height: 60px; border-radius: 8px;
  background: var(--bg-3); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 26px;
}
.mob-item-info { flex: 1; min-width: 0; }
.mob-item-name { font-size: 13px; font-weight: 600; color: var(--text); }
.mob-item-desc { font-size: 11px; color: var(--text-dim); margin-top: 2px; overflow: hidden;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.mob-item-price { font-size: 13px; font-weight: 700; color: var(--amber); margin-top: 4px; }
.mob-item-add {
  width: 34px; height: 34px; border-radius: 50%; background: var(--amber);
  border: none; color: #000; font-size: 22px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  transition: transform .1s;
}
.mob-item-add:active { transform: scale(.88); }
.mob-item-unavail { font-size: 9px; font-weight: 700; background: #ef4444; color: #fff;
  border-radius: 3px; padding: 1px 4px; margin-left: 5px; vertical-align: middle; }

/* ════ ADD ITEMS BUTTON (inside order panel) ══════════════════ */
.mob-add-items-bar {
  display: none;
  width: 100%; padding: 12px 16px; margin: 0 0 10px;
  background: var(--amber); color: #000;
  font-size: 14px; font-weight: 700;
  border: none; border-radius: 10px; cursor: pointer;
  align-items: center; justify-content: center; gap: 8px;
  flex-shrink: 0;
}

/* ════ TOAST ════════════════════════════════════════════════ */
#mob-toast {
  position: fixed; bottom: 68px; left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--amber); color: #000;
  font-size: 13px; font-weight: 700; padding: 7px 18px;
  border-radius: 20px; z-index: 9999;
  opacity: 0; pointer-events: none;
  transition: opacity .2s, transform .2s; white-space: nowrap;
}
#mob-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

/* ════ RESPONSIVE ════════════════════════════════════════════ */
@media (max-width: 768px) {

  /* Show bottom nav, hide sidebar */
  .mob-nav { display: flex !important; }
  .sidebar { display: none !important; }

  /* Root layout */
  html, body { height: 100% !important; overflow: hidden !important; }
  #root { display: flex !important; flex-direction: column !important;
    width: 100vw !important; height: 100vh !important; overflow: hidden !important; }

  /* Main column scrollable */
  .main-col {
    flex: 1 1 0 !important; width: 100% !important;
    overflow-x: hidden !important; overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding-bottom: 68px !important; min-height: 0 !important;
  }

  /* Topbar compact */
  .topbar {
    padding: 8px 12px !important; flex-shrink: 0 !important;
    flex-wrap: nowrap !important;
  }
  .page-title-sub, .search-box, .cashier-chip, .shift-badge, .clock { display: none !important; }
  .page-title-main { font-size: 15px !important; }

  /* Stats grid 2 cols */
  .stats-strip { display: grid !important; grid-template-columns: 1fr 1fr !important;
    gap: 6px !important; padding: 8px 10px !important; }
  .stat-tile { padding: 8px 10px !important; }
  .stat-tile-value { font-size: 18px !important; }

  /* Tip banner */
  .tip-banner { font-size: 11px !important; padding: 7px 10px !important; margin: 0 10px 6px !important; }
  .tip-banner kbd { display: none !important; }

  /* Alerts */
  .alerts-strip { padding: 0 10px 4px !important; flex-wrap: wrap !important; gap: 4px !important; }
  .alert-chip { font-size: 10px !important; padding: 3px 7px !important; }

  /* Dash layout — vertical stack */
  .dash-body { flex-direction: column !important; height: auto !important;
    overflow: visible !important; }
  .dash-center { overflow: visible !important; height: auto !important;
    max-height: none !important; padding: 8px 10px !important; }
  .dash-right { width: 100% !important; height: auto !important;
    overflow: visible !important; border-left: none !important;
    border-top: 1px solid var(--line) !important; }

  /* Floor grid */
  .floor-grid { display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)) !important;
    gap: 7px !important; padding: 8px 10px !important; overflow: visible !important; }
  .table-card { padding: 8px 6px !important; }
  .table-num { font-size: 17px !important; }
  .table-splits { display: none !important; }

  /* Workspace (admin, settings, etc) */
  .workspace, .workspace-inner { height: auto !important; max-height: none !important;
    overflow: visible !important; }
  .workspace-inner { padding: 10px !important; }

  /* HIDE desktop menu, show mobile sheet */
  .menu-area { display: none !important; }
  .mob-add-items-bar { display: flex !important; }

  /* Order panel */
  .order-panel { width: 100% !important; height: auto !important;
    overflow: visible !important; border-radius: 0 !important;
    padding: 10px 12px !important; }
  .order-items { max-height: 280px !important; overflow-y: auto !important; }
  .order-actions { flex-wrap: wrap !important; gap: 6px !important; }
  .order-actions .btn { flex: 1 1 40% !important; font-size: 12px !important;
    padding: 10px 6px !important; min-height: 42px !important; }

  /* Pay methods */
  .pay-methods { flex-wrap: wrap !important; gap: 7px !important; }
  .pay-method { flex: 1 1 40% !important; padding: 10px 6px !important; }

  /* Context menu */
  .ctx-menu { position: fixed !important; bottom: 66px !important;
    left: 10px !important; right: 10px !important; top: auto !important;
    width: auto !important; border-radius: 12px !important; z-index: 8999 !important; }
  .ctx-item { padding: 12px 16px !important; font-size: 14px !important; }

  /* ═══ MODAL BOTTOM-SHEET SYSTEM ══════════════════════════ */
  /* Every modal becomes a bottom sheet */
  .modal-backdrop {
    position: fixed !important; inset: 0 !important;
    display: flex !important; align-items: flex-end !important;
    justify-content: center !important; padding: 0 !important;
    z-index: 9100 !important;
  }

  .modal {
    position: relative !important;
    width: 100% !important; max-width: 100% !important;
    max-height: 90vh !important; height: auto !important;
    margin: 0 !important;
    border-radius: 18px 18px 0 0 !important;
    display: flex !important; flex-direction: column !important;
    overflow: hidden !important;
    top: auto !important; left: 0 !important; right: 0 !important;
    transform: none !important;
  }

  /* Drag pill */
  .modal::before {
    content: ''; display: block;
    width: 36px; height: 4px;
    background: var(--line); border-radius: 2px;
    margin: 10px auto 0; flex-shrink: 0;
  }

  /* Modal header — fixed height */
  .modal-head {
    padding: 10px 16px 10px !important;
    flex-shrink: 0 !important;
    border-bottom: 1px solid var(--line) !important;
  }
  .modal-title { font-size: 16px !important; }

  /* Modal body — SCROLLABLE */
  .modal-body {
    flex: 1 1 0 !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding: 14px 16px 20px !important;
    max-height: none !important; height: auto !important;
  }

  /* settings-grid inside modal body — single column */
  .modal-body .settings-grid {
    grid-template-columns: 1fr !important;
  }
  .modal-body .setting-field.full { grid-column: 1 !important; }

  /* Modal footer — ALWAYS VISIBLE AT BOTTOM */
  .modal-foot {
    flex-shrink: 0 !important;
    position: relative !important; bottom: auto !important;
    padding: 12px 16px 24px !important;
    border-top: 1px solid var(--line) !important;
    background: var(--bg-2) !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
  }

  /* Every button in modal footer — full width, tall enough to tap */
  .modal-foot .btn,
  .modal-foot button {
    width: 100% !important;
    min-height: 48px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    border-radius: 10px !important;
    flex: none !important;
    justify-content: center !important;
  }

  /* Checkout split inputs */
  .split-inputs { flex-direction: column !important; }

  /* Admin section tabs */
  [style*="display: flex"][style*="borderBottom"] {
    overflow-x: auto !important; flex-wrap: nowrap !important;
    scrollbar-width: none !important;
  }

  /* Section head action row */
  .section-head {
    flex-wrap: wrap !important; gap: 8px !important;
    padding-bottom: 10px !important;
  }
  .section-head .btn { min-height: 38px !important; }

  /* Admin item table — horizontal scroll */
  .admin-table-wrap, table { overflow-x: auto !important; display: block !important;
    width: 100% !important; }
  table tbody, table thead { display: table !important; width: 100% !important; }

  /* Admin category cards */
  [style*="gridTemplateColumns"][style*="minmax(240px"] {
    grid-template-columns: 1fr 1fr !important;
  }

  /* KOT / Receipt paper — scale to screen */
  .kot-paper, .bill-paper { width: 100% !important; max-width: 320px !important; }

  /* Live activity ticker */
  .ticker { padding: 8px 12px !important; }
  .ticker-item { font-size: 10px !important; }

  /* No-print keep bottom nav visible */
  .no-print { display: none; }
}

/* ════ PRINT ═════════════════════════════════════════════════ */
@media print {
  body * { visibility: hidden; }
  body.printing-kot .print-kot-target,
  body.printing-kot .print-kot-target * { visibility: visible; }
  body.printing-kot .print-kot-target {
    position: fixed; top: 0; left: 0; width: 80mm; background: #fff; padding: 8px;
  }
  body.printing-bill .print-bill-target,
  body.printing-bill .print-bill-target * { visibility: visible; }
  body.printing-bill .print-bill-target {
    position: fixed; top: 0; left: 0; width: 80mm; background: #fff; padding: 8px;
  }
  .mob-nav, .mob-sheet, .mob-sheet-backdrop, #mob-toast { display: none !important; }
}
`;
document.head.appendChild(style);

// ── 2. TOAST ─────────────────────────────────────────────────
var toastEl = document.createElement('div');
toastEl.id = 'mob-toast';
document.body.appendChild(toastEl);
var toastTimer;
function showToast(msg) {
  toastEl.textContent = '✓ ' + msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ toastEl.classList.remove('show'); }, 1800);
}

// ── 3. BOTTOM NAV ─────────────────────────────────────────────
var NAV = [
  { id: 'floor', label: 'Floor', idx: 0,
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' },
  { id: 'reservations', label: 'Reserve', idx: 1,
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
  { id: 'customers', label: 'Guests', idx: 2,
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { id: 'history', label: 'Orders', idx: 3,
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 1 .5 4M3 17V11h6"/></svg>' },
  { id: 'admin', label: 'Admin', idx: 5,
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>' },
];

var nav = document.createElement('div');
nav.className = 'mob-nav no-print';
var currentView = 'floor';

NAV.forEach(function(item) {
  var btn = document.createElement('button');
  btn.className = 'mob-nav-btn' + (item.id === 'floor' ? ' active' : '');
  btn.dataset.view = item.id;
  btn.innerHTML = item.svg + '<span>' + item.label + '</span>';
  btn.addEventListener('click', function() {
    var sideBtns = document.querySelectorAll('.sidebar-btn');
    if (sideBtns[item.idx]) sideBtns[item.idx].click();
    setNavActive(item.id);
    var mc = document.querySelector('.main-col');
    if (mc) mc.scrollTop = 0;
  });
  nav.appendChild(btn);
});
document.body.appendChild(nav);

function setNavActive(id) {
  currentView = id;
  nav.querySelectorAll('.mob-nav-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.view === id);
  });
  // Show/hide Add Items bar depending on view
  updateAddItemsBar();
}

// Watch sidebar active state to keep nav in sync
var viewIds = ['floor','reservations','customers','history','summary','admin','settings'];
new MutationObserver(function() {
  if (!IS_MOBILE) return;
  var btns = Array.from(document.querySelectorAll('.sidebar-btn'));
  var active = btns.findIndex(function(b){ return b.classList.contains('active'); });
  if (active >= 0 && viewIds[active]) setNavActive(viewIds[active]);
}).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

// ── 4. MENU BOTTOM SHEET ──────────────────────────────────────
var sheetBackdrop = document.createElement('div');
sheetBackdrop.className = 'mob-sheet-backdrop';
sheetBackdrop.addEventListener('click', closeSheet);
document.body.appendChild(sheetBackdrop);

var sheet = document.createElement('div');
sheet.className = 'mob-sheet';
sheet.innerHTML = [
  '<div class="mob-sheet-handle"></div>',
  '<div class="mob-sheet-head">',
    '<h2>Add Items</h2>',
    '<button class="mob-sheet-close" aria-label="Close">&#x2715;</button>',
  '</div>',
  '<div class="mob-cat-bar" id="mob-cat-bar"></div>',
  '<div class="mob-items-list" id="mob-items-list"></div>',
].join('');
document.body.appendChild(sheet);
sheet.querySelector('.mob-sheet-close').addEventListener('click', closeSheet);

// Swipe down to close
var swipeStartY = 0;
sheet.addEventListener('touchstart', function(e){ swipeStartY = e.touches[0].clientY; }, { passive: true });
sheet.addEventListener('touchend', function(e){
  if (e.changedTouches[0].clientY - swipeStartY > 80) closeSheet();
}, { passive: true });

function openSheet() {
  if (!IS_MOBILE) return;
  populateSheet();
  sheetBackdrop.classList.add('open');
  sheet.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSheet() {
  sheetBackdrop.classList.remove('open');
  sheet.classList.remove('open');
  document.body.style.overflow = '';
}

function populateSheet() {
  var catBar = document.getElementById('mob-cat-bar');
  catBar.innerHTML = '';

  // Get categories from desktop cat tabs
  var desktopCatBtns = document.querySelectorAll('.cat-tabs button');
  var activeCatIdx = 0;
  desktopCatBtns.forEach(function(b, i){
    if (b.classList.contains('active')) activeCatIdx = i;
  });

  desktopCatBtns.forEach(function(b, i) {
    var btn = document.createElement('button');
    btn.className = 'mob-cat-btn' + (i === activeCatIdx ? ' active' : '');
    btn.textContent = b.textContent.trim();
    btn.addEventListener('click', function(){
      catBar.querySelectorAll('.mob-cat-btn').forEach(function(x){ x.classList.remove('active'); });
      btn.classList.add('active');
      b.click(); // click desktop tab
      setTimeout(renderItems, 80);
    });
    catBar.appendChild(btn);
  });

  renderItems();
}

function renderItems() {
  var list = document.getElementById('mob-items-list');
  list.innerHTML = '';
  var cards = document.querySelectorAll('.menu-card');

  if (cards.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:48px 20px;color:var(--text-dim)">' +
      '<div style="font-size:36px;margin-bottom:10px">🍽️</div>' +
      '<div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:6px">Select a table first</div>' +
      '<div style="font-size:12px">Go to Floor, tap a table, then open Add Items</div></div>';
    return;
  }

  cards.forEach(function(card) {
    var unavail = card.classList.contains('unavailable');
    var nameEl  = card.querySelector('.menu-name');
    var priceEl = card.querySelector('.menu-price, .menu-card-foot span');
    var descEl  = card.querySelector('.menu-desc');
    var imgEl   = card.querySelector('img');

    var name  = nameEl  ? nameEl.textContent.trim()  : 'Item';
    var price = priceEl ? priceEl.textContent.trim()  : '';
    var desc  = descEl  ? descEl.textContent.trim()   : '';
    var src   = imgEl   ? imgEl.src                   : '';

    // Try to get emoji from category
    var catIcon = '';
    var catTabs = document.querySelectorAll('.cat-tabs button.active');
    if (catTabs[0]) {
      var catText = catTabs[0].textContent.trim();
      var emojiMatch = catText.match(/^\p{Emoji}/u);
      if (emojiMatch) catIcon = emojiMatch[0];
    }

    var row = document.createElement('div');
    row.className = 'mob-item-row' + (unavail ? ' mob-unavail' : '');
    if (unavail) row.style.opacity = '0.4';

    var imgHTML = src
      ? '<img class="mob-item-img" src="' + src + '" alt="" loading="lazy">'
      : '<div class="mob-item-emoji">' + (catIcon || '🍽') + '</div>';

    row.innerHTML = imgHTML +
      '<div class="mob-item-info">' +
        '<div class="mob-item-name">' + name +
          (unavail ? '<span class="mob-item-unavail">86\'d</span>' : '') +
        '</div>' +
        (desc ? '<div class="mob-item-desc">' + desc + '</div>' : '') +
        '<div class="mob-item-price">' + price + '</div>' +
      '</div>' +
      (!unavail ? '<button class="mob-item-add" aria-label="Add">+</button>' : '');

    if (!unavail) {
      function doAdd(e) {
        if (e) e.stopPropagation();
        // Find and click the + button in the hidden desktop menu card
        var addBtn = card.querySelector('.menu-add, button[aria-label*="add"], button[aria-label*="Add"]');
        if (addBtn) {
          addBtn.click();
        } else {
          card.click();
        }
        showToast(name + ' added');
      }
      row.querySelector('.mob-item-add').addEventListener('click', doAdd);
      row.addEventListener('click', function(e) {
        if (e.target.classList.contains('mob-item-add')) return;
        doAdd(null);
      });
    }
    list.appendChild(row);
  });

  if (list.children.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:40px 20px;color:var(--text-dim);font-size:12px">No items in this category</div>';
  }
}

// ── 5. ADD ITEMS BUTTON in Order Panel ───────────────────────
var addItemsBar = document.createElement('button');
addItemsBar.className = 'mob-add-items-bar';
addItemsBar.innerHTML = [
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  'Add Items to Order'
].join('');
addItemsBar.addEventListener('click', openSheet);

function updateAddItemsBar() {
  if (!IS_MOBILE) return;
  var panel = document.querySelector('.order-panel');
  if (!panel) return;

  // Show bar only when floor tab is active and a table is selected
  var onFloor = currentView === 'floor';
  var hasTable = !!panel.querySelector('.order-table-num, .order-head-row');
  addItemsBar.style.display = (onFloor && hasTable) ? 'flex' : 'none';

  // Position: inject before totals or at top of order panel body
  if (!addItemsBar.parentElement || addItemsBar.parentElement !== panel) {
    var totals = panel.querySelector('.totals');
    var items  = panel.querySelector('.order-items');
    if (totals) panel.insertBefore(addItemsBar, totals);
    else if (items) panel.insertBefore(addItemsBar, items);
    else panel.prepend(addItemsBar);
  }
}

// Watch for order panel changes
new MutationObserver(function() {
  if (IS_MOBILE) updateAddItemsBar();
}).observe(document.body, { childList: true, subtree: true });

// ── 6. MODAL FIX — ensure footer always visible ───────────────
function fixModal(modal) {
  if (!IS_MOBILE) return;
  if (modal.dataset.mobFixed) return;
  modal.dataset.mobFixed = '1';

  // Make sure body scrolls and foot is at bottom
  var body = modal.querySelector('.modal-body');
  var foot = modal.querySelector('.modal-foot');

  if (body) {
    body.style.cssText += ';overflow-y:auto;-webkit-overflow-scrolling:touch;flex:1 1 0;max-height:none';
  }
  if (foot) {
    foot.style.cssText += ';flex-shrink:0;position:relative;bottom:auto';
    // Make all buttons full width
    foot.querySelectorAll('button, .btn').forEach(function(btn) {
      btn.style.cssText += ';width:100%;min-height:48px;font-size:14px';
    });
  }
}

new MutationObserver(function(mutations) {
  if (!IS_MOBILE) return;
  mutations.forEach(function(m) {
    m.addedNodes.forEach(function(node) {
      if (node.nodeType !== 1) return;
      if (node.classList && node.classList.contains('modal-backdrop')) {
        var modal = node.querySelector('.modal');
        if (modal) fixModal(modal);
      }
      if (node.classList && node.classList.contains('modal')) {
        fixModal(node);
      }
    });
  });
}).observe(document.body, { childList: true, subtree: true });

// ── 7. INIT ───────────────────────────────────────────────────
function init() {
  updateAddItemsBar();
  // Scan for any modals already open
  document.querySelectorAll('.modal').forEach(fixModal);
}

setTimeout(init, 800);
setInterval(function(){ if (IS_MOBILE) updateAddItemsBar(); }, 1000);

})();
