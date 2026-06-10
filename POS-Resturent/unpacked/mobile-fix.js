// ============================================================
// MOBILE RESPONSIVE FIX v2 — screens ≤ 768px
// ============================================================

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
  border-radius: 0;
  transition: color 0.15s;
  position: relative;
}
.mobile-bottom-nav button.active {
  color: var(--amber, #f59e0b);
}
.mobile-bottom-nav button.active::after {
  content: '';
  position: absolute;
  top: 0; left: 20%; right: 20%;
  height: 2px;
  background: var(--amber, #f59e0b);
  border-radius: 0 0 2px 2px;
}
.mobile-bottom-nav button svg {
  width: 20px; height: 20px;
}
.mobile-bottom-nav .nav-pulse {
  position: absolute;
  top: 6px; right: calc(50% - 16px);
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #ef4444;
}

@media (max-width: 768px) {

  /* ── Show bottom nav ───────────────────────────────────── */
  .mobile-bottom-nav { display: flex !important; }

  /* ── Hide sidebar ──────────────────────────────────────── */
  .sidebar { display: none !important; }

  /* ── Root flex: sidebar gone, main-col fills screen ────── */
  #root,
  #root > *:not(.mobile-bottom-nav) {
    display: flex;
    flex-direction: column;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
  }
  .main-col {
    flex: 1;
    width: 100% !important;
    min-width: 0 !important;
    overflow-x: hidden;
    padding-bottom: 60px;
  }

  /* ── Topbar ────────────────────────────────────────────── */
  .topbar {
    display: flex !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    padding: 8px 12px !important;
    gap: 8px !important;
    min-height: unset !important;
    overflow: hidden;
  }
  .page-title { flex: 1; min-width: 0; }
  .page-title-main { font-size: 16px !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .page-title-sub  { display: none !important; }
  .topbar-right    { display: flex !important; align-items: center; gap: 6px !important; flex-shrink: 0; }
  .search-box      { display: none !important; }
  .cashier-chip    { display: none !important; }
  .shift-badge     { display: none !important; }
  .clock           { display: none !important; }
  .notif-trigger   { width: 32px !important; height: 32px !important; }

  /* ── Stats strip: 2×2 grid ─────────────────────────────── */
  .stats-strip {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 6px !important;
    padding: 8px 10px !important;
    flex-shrink: 0;
  }
  .stat-tile        { padding: 8px 10px !important; border-radius: 8px !important; }
  .stat-tile-value  { font-size: 18px !important; }
  .stat-tile-label  { font-size: 9px !important; }
  .stat-tile-delta  { font-size: 9px !important; margin-top: 2px !important; }

  /* ── Tip banner ─────────────────────────────────────────── */
  .tip-banner {
    font-size: 11px !important;
    padding: 8px 10px !important;
    margin: 6px 10px !important;
  }
  .tip-banner kbd { display: none !important; }

  /* ── Alerts strip ───────────────────────────────────────── */
  .alerts-strip {
    padding: 0 10px 6px !important;
    flex-wrap: wrap !important;
    gap: 4px !important;
  }
  .alert-chip { font-size: 10px !important; padding: 3px 7px !important; }

  /* ── Dash body: stack vertically ───────────────────────── */
  .dash-body {
    flex-direction: column !important;
    height: auto !important;
    min-height: 0 !important;
    overflow: visible !important;
    flex: unset !important;
  }
  .dash-center {
    width: 100% !important;
    min-width: 0 !important;
    flex: unset !important;
    overflow: visible !important;
    height: auto !important;
  }
  .dash-right {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    flex-shrink: 0 !important;
    border-left: none !important;
    border-top: 1px solid var(--line, #2a2e38) !important;
    height: auto !important;
    overflow: visible !important;
  }

  /* ── Floor plan grid ─────────────────────────────────────── */
  .floor-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(76px, 1fr)) !important;
    gap: 7px !important;
    padding: 8px 10px !important;
  }
  .table-card      { padding: 8px 6px !important; min-width: 0 !important; }
  .table-num       { font-size: 17px !important; }
  .table-cap       { font-size: 9px !important; }
  .table-status    { font-size: 9px !important; }
  .table-waiter    { font-size: 9px !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .table-meta      { font-size: 9px !important; }
  .table-total     { font-size: 10px !important; }
  .table-splits    { display: none !important; }
  .table-top       { margin-bottom: 4px !important; }

  /* ── Menu area ───────────────────────────────────────────── */
  .menu-area { padding: 6px 0 0 !important; }
  .cat-tabs  {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    padding: 4px 10px 8px !important;
    gap: 5px !important;
    scrollbar-width: none !important;
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
  }
  .menu-img        { height: 72px !important; }
  .menu-card-body  { padding: 7px !important; }
  .menu-name       { font-size: 11px !important; }
  .menu-desc       { font-size: 10px !important; -webkit-line-clamp: 2 !important; overflow: hidden !important; display: -webkit-box !important; -webkit-box-orient: vertical !important; }
  .menu-price      { font-size: 12px !important; }
  .menu-add        { padding: 4px 8px !important; font-size: 11px !important; }
  .section-head    { padding: 8px 10px 4px !important; }
  .section-title   { font-size: 12px !important; }

  /* ── Order panel ─────────────────────────────────────────── */
  .order-panel {
    width: 100% !important;
    min-width: 0 !important;
    max-height: none !important;
    border-radius: 0 !important;
    padding: 10px 12px !important;
    overflow: visible !important;
  }
  .order-head-row  { flex-wrap: wrap !important; gap: 6px !important; }
  .order-table-num { font-size: 17px !important; }
  .order-waiter-row { flex-wrap: wrap !important; }
  .split-tabs      { flex-wrap: wrap !important; gap: 4px !important; }
  .order-items     { max-height: 240px !important; overflow-y: auto !important; }
  .order-item      { padding: 7px 0 !important; }
  .order-item-row  { flex-wrap: wrap !important; gap: 4px !important; }
  .qty-btn         { width: 26px !important; height: 26px !important; }
  .qty-val         { font-size: 13px !important; }
  .note-input      { font-size: 11px !important; }
  .totals          { padding: 8px 0 !important; }
  .total-row       { font-size: 12px !important; }
  .total-val       { font-size: 12px !important; }
  .grand .val      { font-size: 19px !important; }
  .small-input     { width: 52px !important; }
  .tax-input       { width: 52px !important; }
  .order-actions   { flex-wrap: wrap !important; gap: 6px !important; }
  .order-actions .btn { flex: 1 1 40% !important; font-size: 12px !important; padding: 9px 6px !important; text-align: center !important; }

  /* ── Live activity ticker ─────────────────────────────────── */
  .ticker {
    padding: 8px 12px !important;
    max-height: 130px !important;
    overflow-y: auto !important;
  }
  .ticker-title  { font-size: 10px !important; }
  .ticker-item   { font-size: 10px !important; padding: 3px 0 !important; }
  .ticker-time   { font-size: 9px !important; }

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
  .modal-head   { padding: 14px 16px 10px !important; }
  .modal-title  { font-size: 15px !important; }
  .modal-body   { padding: 10px 14px !important; }
  .modal-foot   { padding: 10px 14px 16px !important; flex-wrap: wrap !important; gap: 7px !important; }
  .modal-foot .btn { flex: 1 !important; }

  /* ── Context menu: pinned above bottom nav ─────────────── */
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

  /* ── Workspace pages (reservations, settings …) ─────────── */
  .workspace { overflow-y: auto !important; }
  .workspace-inner { padding: 10px !important; max-width: 100% !important; }

  /* Pay methods row in checkout ──────────────────────────── */
  .pay-methods { flex-wrap: wrap !important; gap: 7px !important; }
  .pay-method  { flex: 1 1 40% !important; padding: 10px 6px !important; }
}
`;

  // Inject styles
  const style = document.createElement('style');
  style.id = 'mobile-responsive-fix';
  style.textContent = css;
  document.head.appendChild(style);

  // ── Bottom navigation ──────────────────────────────────────
  const NAV = [
    { id: 'floor',        label: 'Floor',   sidebarIdx: 0, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
    { id: 'reservations', label: 'Reserve', sidebarIdx: 1, hasAlert: true, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
    { id: 'customers',    label: 'Guests',  sidebarIdx: 2, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { id: 'history',      label: 'Orders',  sidebarIdx: 3, hasAlert: true, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 1 .5 4M3 17V11h6"/></svg>' },
    { id: 'admin',        label: 'Admin',   sidebarIdx: 5, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/><line x1="12" y1="14" x2="12" y2="20"/></svg>' },
  ];

  function buildBottomNav() {
    if (document.getElementById('mobile-bottom-nav')) return;

    const nav = document.createElement('div');
    nav.id = 'mobile-bottom-nav';
    nav.className = 'mobile-bottom-nav no-print';

    NAV.forEach(item => {
      const btn = document.createElement('button');
      btn.dataset.view = item.id;
      btn.setAttribute('aria-label', item.label);
      btn.innerHTML = item.icon + `<span>${item.label}</span>`;
      btn.addEventListener('click', () => {
        const sidebarBtns = document.querySelectorAll('.sidebar-nav .sidebar-btn');
        const target = sidebarBtns[item.sidebarIdx];
        if (target) target.click();
        setActive(item.id);
      });
      nav.appendChild(btn);
    });

    document.body.appendChild(nav);

    // Sync active tab by watching .sidebar-btn.active class changes
    let lastActive = 'floor';
    const observer = new MutationObserver(() => {
      const sidebarBtns = [...document.querySelectorAll('.sidebar-nav .sidebar-btn')];
      const activeIdx = sidebarBtns.findIndex(b => b.classList.contains('active'));
      const viewMap = ['floor','reservations','customers','history','summary','admin','settings'];
      const view = viewMap[activeIdx] || lastActive;
      if (view !== lastActive) { lastActive = view; setActive(view); }

      // Mirror alert dots from sidebar pulse spans
      NAV.forEach(item => {
        const sb = sidebarBtns[item.sidebarIdx];
        const hasPulse = sb && sb.querySelector('.pulse');
        const btn = nav.querySelector(`[data-view="${item.id}"]`);
        if (!btn) return;
        let dot = btn.querySelector('.nav-pulse');
        if (hasPulse && !dot) {
          dot = document.createElement('span');
          dot.className = 'nav-pulse';
          btn.appendChild(dot);
        } else if (!hasPulse && dot) {
          dot.remove();
        }
      });
    });
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

    setActive('floor');

    function setActive(viewId) {
      nav.querySelectorAll('button').forEach(b => {
        b.classList.toggle('active', b.dataset.view === viewId);
      });
    }
  }

  // Wait for React to mount
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(buildBottomNav, 800));
  } else {
    setTimeout(buildBottomNav, 800);
  }

})();
