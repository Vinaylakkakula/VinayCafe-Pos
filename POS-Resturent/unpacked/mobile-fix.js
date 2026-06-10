(function () {
  const css = `
* { box-sizing: border-box; }

/* ── Bottom nav (hidden on desktop) ─────────────────────── */
.mobile-bottom-nav {
  display: none;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  z-index: 9999;
  height: 60px;
  background: var(--bg-2, #16191f);
  border-top: 1px solid var(--line, #2a2e38);
  align-items: stretch;
  justify-content: space-around;
}
.mobile-bottom-nav button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-dim, #555e6e);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 6px 2px;
  position: relative;
  transition: color 0.15s;
}
.mobile-bottom-nav button.active { color: var(--amber, #f59e0b); }
.mobile-bottom-nav button.active::after {
  content: '';
  position: absolute;
  top: 0; left: 20%; right: 20%;
  height: 2px;
  background: var(--amber, #f59e0b);
  border-radius: 0 0 2px 2px;
}
.mobile-bottom-nav button svg { width: 20px; height: 20px; }
.mobile-bottom-nav .nav-pulse {
  position: absolute;
  top: 6px; right: calc(50% - 16px);
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #ef4444;
}

@media (max-width: 768px) {

  .mobile-bottom-nav { display: flex !important; }
  .sidebar { display: none !important; }

  /* ── Root: full viewport, scrollable column ─────────────── */
  html, body {
    height: 100% !important;
    overflow: hidden !important;
  }

  #root {
    display: flex !important;
    flex-direction: column !important;
    width: 100vw !important;
    height: 100vh !important;
    min-width: 0 !important;
    overflow: hidden !important;
  }

  /* ── main-col: fills remaining space, IS the scroll container ── */
  .main-col {
    flex: 1 1 0 !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    /* This is the ONE scroll container — everything else is overflow:visible */
    overflow-x: hidden !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    /* Pad bottom so content clears the fixed nav bar */
    padding-bottom: 70px !important;
    /* Remove any height that could trap content */
    height: auto !important;
    max-height: none !important;
    display: flex !important;
    flex-direction: column !important;
  }

  /* ── Topbar: fixed height, never shrinks ─────────────────── */
  .topbar {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    padding: 8px 12px !important;
    gap: 8px !important;
    min-height: unset !important;
    height: auto !important;
    flex-shrink: 0 !important;
  }
  .page-title { flex: 1; min-width: 0; }
  .page-title-main {
    font-size: 16px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  .page-title-sub  { display: none !important; }
  .topbar-right    { display: flex !important; align-items: center !important; gap: 6px !important; flex-shrink: 0 !important; }
  .search-box      { display: none !important; }
  .cashier-chip    { display: none !important; }
  .shift-badge     { display: none !important; }
  .clock           { display: none !important; }

  /* ── Stats: 2×2 grid, no shrink ─────────────────────────── */
  .stats-strip {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 6px !important;
    padding: 8px 10px !important;
    flex-shrink: 0 !important;
  }
  .stat-tile       { padding: 8px 10px !important; border-radius: 8px !important; }
  .stat-tile-value { font-size: 18px !important; }
  .stat-tile-label { font-size: 9px !important; }
  .stat-tile-delta { font-size: 9px !important; margin-top: 2px !important; }

  /* ── Tip / alerts ────────────────────────────────────────── */
  .tip-banner {
    font-size: 11px !important;
    padding: 8px 10px !important;
    margin: 4px 10px !important;
    flex-shrink: 0 !important;
  }
  .tip-banner kbd { display: none !important; }
  .alerts-strip   { padding: 0 10px 6px !important; flex-wrap: wrap !important; gap: 4px !important; }
  .alert-chip     { font-size: 10px !important; padding: 3px 7px !important; }

  /* ── THE CRITICAL SCROLL FIX: dash-body ─────────────────── */
  /*
    All inner containers must be overflow:visible and height:auto
    so content expands naturally. The ONLY scroll container is .main-col above.
    If any child has overflow:scroll or a fixed height, it creates a nested
    scroll trap and the outer scroll stops working on iOS/Android.
  */
  .dash-body {
    display: flex !important;
    flex-direction: column !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    overflow: visible !important;
    flex: 1 1 auto !important;
  }
  .dash-center {
    display: block !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    overflow: visible !important;
    flex: none !important;
  }
  .dash-right {
    display: block !important;
    width: 100% !important;
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    border-left: none !important;
    border-top: 1px solid var(--line, #2a2e38) !important;
    flex: none !important;
  }

  /* ── Floor plan grid ─────────────────────────────────────── */
  .floor-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)) !important;
    gap: 7px !important;
    padding: 8px 10px !important;
    height: auto !important;
    min-height: 0 !important;
    overflow: visible !important;
  }
  .table-card   { padding: 8px 6px !important; min-width: 0 !important; height: auto !important; }
  .table-num    { font-size: 17px !important; }
  .table-cap,
  .table-status { font-size: 9px !important; }
  .table-waiter { font-size: 9px !important; overflow: hidden !important; text-overflow: ellipsis !important; white-space: nowrap !important; }
  .table-meta   { font-size: 9px !important; }
  .table-total  { font-size: 10px !important; }
  .table-splits { display: none !important; }

  /* ── Order placeholder (no table selected) ───────────────── */
  .no-table-placeholder,
  .order-placeholder,
  [class*="placeholder"],
  [class*="empty-state"] {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 40px 20px !important;
    height: auto !important;
    min-height: 160px !important;
  }

  /* ── Live activity / ticker ──────────────────────────────── */
  .live-activity,
  .activity-section {
    padding: 8px 10px !important;
    height: auto !important;
    overflow: visible !important;
  }
  .ticker        { padding: 8px 12px !important; height: auto !important; overflow: visible !important; }
  .ticker-title  { font-size: 10px !important; }
  .ticker-item   { font-size: 10px !important; padding: 3px 0 !important; }
  .ticker-time   { font-size: 9px !important; }

  /* ── Menu grid ───────────────────────────────────────────── */
  .menu-area { padding: 6px 0 0 !important; height: auto !important; }
  .cat-tabs {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    padding: 4px 10px 8px !important;
    gap: 5px !important;
    scrollbar-width: none !important;
    height: auto !important;
  }
  .cat-tabs::-webkit-scrollbar { display: none !important; }
  .cat-tabs button {
    flex-shrink: 0 !important;
    padding: 5px 10px !important;
    font-size: 11px !important;
    white-space: nowrap !important;
  }
  .menu-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 7px !important;
    padding: 0 10px 10px !important;
    height: auto !important;
    overflow: visible !important;
  }
  .menu-img       { height: 72px !important; }
  .menu-card-body { padding: 7px !important; }
  .menu-name      { font-size: 11px !important; }
  .menu-desc      {
    font-size: 10px !important;
    -webkit-line-clamp: 2 !important;
    overflow: hidden !important;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
  }
  .menu-price     { font-size: 12px !important; }
  .menu-add       { padding: 4px 8px !important; font-size: 11px !important; }
  .section-head   { padding: 8px 10px 4px !important; }
  .section-title  { font-size: 12px !important; }
  .section-sub    { display: none !important; }

  /* ── Order panel ─────────────────────────────────────────── */
  .order-panel {
    display: block !important;
    width: 100% !important;
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    border-radius: 0 !important;
    padding: 10px 12px !important;
  }
  .order-head-row  { flex-wrap: wrap !important; gap: 6px !important; }
  .order-table-num { font-size: 17px !important; }
  .split-tabs      { flex-wrap: wrap !important; gap: 4px !important; }
  /* Order items: short inner scroll is fine here since it's a bounded list */
  .order-items     { max-height: 260px !important; overflow-y: auto !important; }
  .order-item      { padding: 7px 0 !important; }
  .qty-btn         { width: 26px !important; height: 26px !important; }
  .totals          { padding: 8px 0 !important; }
  .total-row       { font-size: 12px !important; }
  .total-val       { font-size: 12px !important; }
  .grand .val      { font-size: 19px !important; }
  .small-input     { width: 52px !important; }
  .tax-input       { width: 52px !important; }
  .order-actions   { flex-wrap: wrap !important; gap: 6px !important; }
  .order-actions .btn {
    flex: 1 1 40% !important;
    font-size: 12px !important;
    padding: 9px 6px !important;
    text-align: center !important;
  }

  /* ── Modals: bottom sheet ────────────────────────────────── */
  .modal-backdrop {
    padding: 0 !important;
    align-items: flex-end !important;
  }
  .modal {
    width: 100% !important;
    max-width: 100% !important;
    border-radius: 16px 16px 0 0 !important;
    max-height: 90vh !important;
    overflow-y: auto !important;
    margin: 0 !important;
  }
  .modal-head  { padding: 14px 16px 10px !important; }
  .modal-body  { padding: 10px 14px !important; }
  .modal-foot  { padding: 10px 14px 16px !important; flex-wrap: wrap !important; gap: 7px !important; }
  .modal-foot .btn { flex: 1 !important; }

  /* ── Context menu ────────────────────────────────────────── */
  .ctx-menu {
    position: fixed !important;
    bottom: 68px !important;
    left: 10px !important; right: 10px !important;
    top: auto !important;
    width: auto !important;
    border-radius: 12px !important;
    z-index: 9998 !important;
  }
  .ctx-item { padding: 12px 16px !important; font-size: 14px !important; }

  /* ── Other views ─────────────────────────────────────────── */
  .workspace { overflow-y: auto !important; }
  .workspace-inner { padding: 10px !important; max-width: 100% !important; }
  .pay-methods { flex-wrap: wrap !important; gap: 7px !important; }
  .pay-method  { flex: 1 1 40% !important; padding: 10px 6px !important; }
}
`;

  /* ── Inject stylesheet ───────────────────────────────────── */
  let existing = document.getElementById('mobile-responsive-fix');
  if (existing) existing.remove();

  const style = document.createElement('style');
  style.id = 'mobile-responsive-fix';
  style.textContent = css;
  document.head.appendChild(style);

  /* ── Bottom navigation ───────────────────────────────────── */
  const NAV = [
    { id: 'floor',        label: 'Floor',   idx: 0, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
    { id: 'reservations', label: 'Reserve', idx: 1, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
    { id: 'customers',    label: 'Guests',  idx: 2, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { id: 'history',      label: 'Orders',  idx: 3, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 1 .5 4M3 17V11h6"/></svg>' },
    { id: 'admin',        label: 'Admin',   idx: 5, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>' },
  ];

  function buildNav() {
    if (document.getElementById('mobile-bottom-nav')) return;

    const nav = document.createElement('div');
    nav.id = 'mobile-bottom-nav';
    nav.className = 'mobile-bottom-nav no-print';

    NAV.forEach(item => {
      const btn = document.createElement('button');
      btn.dataset.view = item.id;
      btn.innerHTML = item.icon + `<span>${item.label}</span>`;
      btn.addEventListener('click', () => {
        const btns = document.querySelectorAll('.sidebar-nav .sidebar-btn');
        if (btns[item.idx]) btns[item.idx].click();
        setActive(item.id);
        /* Scroll back to top of content on tab switch */
        const mc = document.querySelector('.main-col');
        if (mc) mc.scrollTop = 0;
      });
      nav.appendChild(btn);
    });

    document.body.appendChild(nav);
    setActive('floor');

    /* Sync bottom nav with sidebar active state */
    const viewMap = ['floor','reservations','customers','history','summary','admin','settings'];
    new MutationObserver(() => {
      const btns = [...document.querySelectorAll('.sidebar-nav .sidebar-btn')];
      const i = btns.findIndex(b => b.classList.contains('active'));
      if (i >= 0 && viewMap[i]) setActive(viewMap[i]);
    }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

    function setActive(id) {
      nav.querySelectorAll('button').forEach(b =>
        b.classList.toggle('active', b.dataset.view === id)
      );
    }
  }

  /* Wait for React to mount */
  setTimeout(buildNav, 800);
})();
/* ===== VINAY MOBILE FIX PATCH ===== */
(function(){
  const style=document.createElement('style');
  style.id='vinay-mobile-modal-fix';
  style.textContent=`
  @media (max-width:768px){

    .modal{
      display:flex !important;
      flex-direction:column !important;
      max-height:95vh !important;
    }

    .modal-body{
      flex:1 1 auto !important;
      overflow-y:auto !important;
      padding-bottom:90px !important;
    }

    .modal-foot{
      position:sticky !important;
      bottom:0 !important;
      background:#16191f !important;
      z-index:100 !important;
      display:flex !important;
      gap:8px !important;
    }

    .modal-foot .btn{
      flex:1 !important;
      min-height:44px !important;
    }

    .order-panel{
      max-height:none !important;
      overflow-y:visible !important;
    }

    .main-col{
      padding-bottom:140px !important;
    }

    .dash-body{
      display:flex !important;
      flex-direction:column !important;
    }

    .dash-center,
    .dash-right{
      width:100% !important;
      max-width:100% !important;
    }

    .menu-area{
      display:block !important;
      width:100% !important;
    }
  }`;
  document.head.appendChild(style);
})();
