// ============================================================
// MOBILE RESPONSIVE FIX — Inject CSS for screens ≤768px
// Drop this script AFTER all other scripts in your HTML
// ============================================================

(function injectMobileStyles() {
  const css = `
/* ── Reset & base ───────────────────────────────────────────── */
* { box-sizing: border-box; }

/* ── Root layout: sidebar + main-col ────────────────────────── */
@media (max-width: 768px) {

  /* Hide the left sidebar — replaced by bottom nav */
  .sidebar {
    display: none !important;
  }

  /* Root layout — single column */
  #root {
    display: flex !important;
    flex-direction: column !important;
    grid-template-columns: none !important;
  }

  /* Main column takes full width */
  .main-col {
    width: 100% !important;
    min-width: 0 !important;
    padding-bottom: 72px; /* space for bottom nav */
    overflow-x: hidden;
    overflow-y: auto !important;
  }

  /* ── Top bar ─────────────────────────────────────────────── */
  .topbar {
    padding: 10px 14px !important;
    gap: 8px !important;
    flex-wrap: wrap !important;
    min-height: unset !important;
    height: auto !important;
  }
  .page-title-main { font-size: 17px !important; }
  .page-title-sub  { font-size: 11px !important; display: none; }
  .topbar-right    { gap: 8px !important; flex-wrap: wrap; }
  .search-box      { width: 100% !important; order: 10; }
  .cashier-chip    { display: none !important; }
  .shift-badge     { display: none !important; }
  .clock-date      { display: none !important; }
  .clock-time      { font-size: 13px !important; }

  /* ── Stats strip: 2×2 grid instead of 4-col row ────────────── */
  .stats-strip {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 1px !important;
    padding: 0 !important;
    background: var(--line) !important;
  }
  .stat-tile {
    padding: 10px 12px !important;
  }
  .stat-tile-value { font-size: 18px !important; }
  .stat-tile-label { font-size: 9px !important; }
  .stat-tile-delta { font-size: 10px !important; }

  /* ── Tip banner ───────────────────────────────────────────── */
  .tip-banner {
    font-size: 12px !important;
    padding: 10px 12px !important;
    margin: 8px 12px !important;
  }

  /* ── Floor view: stack center + right ────────────────────── */
  .dash-body {
    display: flex !important;
    flex-direction: column !important;
    grid-template-columns: none !important;
    overflow: visible !important;
    height: auto !important;
    min-height: 0 !important;
    background: var(--bg) !important;
    gap: 0 !important;
  }
  .dash-center {
    width: 100% !important;
    min-width: 0 !important;
    overflow: visible !important;
    padding: 10px 12px !important;
    flex: none !important;
  }
  .dash-right {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    flex-direction: column !important;
    border-left: none !important;
    border-top: 1px solid var(--line) !important;
  }

  /* ── Floor plan grid: smaller table cards ─────────────────── */
  .floor-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(85px, 1fr)) !important;
    gap: 8px !important;
    padding: 0 !important;
  }
  .table-card {
    padding: 10px 8px !important;
    min-width: 0 !important;
    aspect-ratio: 1.1 !important;
  }
  .table-num  { font-size: 18px !important; }
  .table-cap,
  .table-waiter,
  .table-meta { font-size: 9px !important; }
  .table-total { font-size: 10px !important; }
  .table-splits { display: none !important; }
  .table-status { font-size: 8px !important; padding: 2px 5px !important; }

  /* ── Menu area ───────────────────────────────────────────── */
  .menu-area {
    padding: 0 !important;
    margin-top: 16px !important;
  }
  .cat-tabs {
    gap: 4px !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    padding: 0 0 6px 0 !important;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .cat-tabs::-webkit-scrollbar { display: none; }
  .cat-tabs button,
  .cat-tab {
    padding: 6px 10px !important;
    font-size: 11px !important;
    flex-shrink: 0 !important;
  }
  .menu-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important;
    gap: 8px !important;
  }
  .menu-card-body { padding: 8px !important; }
  .menu-name      { font-size: 12px !important; }
  .menu-desc      { font-size: 10px !important; display: -webkit-box !important; -webkit-line-clamp: 2 !important; -webkit-box-orient: vertical !important; overflow: hidden !important; }
  .menu-img       { aspect-ratio: 1.3 !important; }
  .menu-price     { font-size: 13px !important; }
  .menu-add       { padding: 5px 10px !important; font-size: 11px !important; }

  /* ── Section heads ───────────────────────────────────────── */
  .section-head {
    padding: 0 0 10px 0 !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
  }
  .section-title { font-size: 16px !important; }
  .section-sub { font-size: 11px !important; }

  /* ── Order panel ─────────────────────────────────────────── */
  .order-panel {
    width: 100% !important;
    min-width: 0 !important;
    max-height: none !important;
    border-radius: 0 !important;
    border-left: none !important;
  }
  .order-head      { padding: 12px 16px !important; }
  .order-table-num { font-size: 18px !important; }
  .totals {
    padding: 10px 16px !important;
  }
  .total-row { font-size: 12px !important; }
  .total-val { font-size: 12px !important; }
  .grand .val { font-size: 18px !important; }
  .order-actions {
    padding: 12px 16px 16px !important;
  }
  .order-actions .btn {
    font-size: 12px !important;
    padding: 10px !important;
  }
  .order-items { max-height: 240px !important; overflow-y: auto !important; }
  .order-item  { padding: 8px 16px !important; }
  .small-input { width: 50px !important; }
  .tax-input   { width: 50px !important; }

  /* ── Live activity ticker ────────────────────────────────── */
  .ticker {
    padding: 10px 12px !important;
    max-height: 130px !important;
    overflow-y: auto !important;
  }

  /* ── Modals: bottom sheet on mobile ──────────────────────── */
  .modal-backdrop {
    padding: 0 !important;
    align-items: flex-end !important;
  }
  .modal {
    width: 100% !important;
    max-width: 100% !important;
    border-radius: 18px 18px 0 0 !important;
    max-height: 90vh !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
  }
  .modal-head {
    padding: 16px 18px !important;
    position: sticky !important;
    top: 0 !important;
    background: var(--bg-1) !important;
    z-index: 10 !important;
    border-bottom: 1px solid var(--line) !important;
    flex-shrink: 0 !important;
  }
  .modal-body {
    padding: 14px 18px !important;
    overflow-y: auto !important;
    flex: 1 !important;
    -webkit-overflow-scrolling: touch;
  }
  .modal-foot {
    padding: 12px 18px 20px !important;
    flex-wrap: nowrap !important;
    gap: 8px !important;
    position: sticky !important;
    bottom: 0 !important;
    background: var(--bg-1) !important;
    z-index: 10 !important;
    border-top: 1px solid var(--line) !important;
    flex-shrink: 0 !important;
  }
  .modal-foot .btn {
    flex: 1 !important;
    padding: 12px !important;
    font-size: 14px !important;
  }
  .modal-title { font-size: 16px !important; }
  .modal-sub { font-size: 11px !important; }

  /* Settings grid inside modals — single column on mobile */
  .modal .settings-grid {
    grid-template-columns: 1fr !important;
  }
  .modal .settings-grid .setting-field {
    grid-column: 1 !important;
  }

  /* ── Context menu ────────────────────────────────────────── */
  .ctx-menu {
    position: fixed !important;
    bottom: 80px !important;
    left: 12px !important;
    right: 12px !important;
    top: auto !important;
    width: auto !important;
    border-radius: 12px !important;
  }
  .ctx-item { padding: 12px 16px !important; font-size: 14px !important; }

  /* ── Workspace (other views: reservations, settings, etc) ── */
  .workspace-inner {
    padding: 12px !important;
  }

  /* ── Reservation cards ───────────────────────────────────── */
  .resv-card {
    grid-template-columns: 60px 1fr !important;
    gap: 10px !important;
    padding: 10px !important;
  }
  .resv-actions {
    grid-column: 1 / -1 !important;
    justify-content: flex-end !important;
    padding-top: 6px !important;
    border-top: 1px solid var(--line) !important;
    margin-top: 4px !important;
  }

  /* ── Customer grid ──────────────────────────────────────── */
  .cust-grid {
    grid-template-columns: 1fr !important;
    gap: 8px !important;
  }

  /* ── History view ───────────────────────────────────────── */
  .history-row {
    grid-template-columns: 1fr 1fr !important;
    gap: 6px !important;
    padding: 10px 12px !important;
    font-size: 12px !important;
  }
  .history-filters {
    flex-wrap: wrap !important;
    gap: 6px !important;
  }

  /* ── Summary view ──────────────────────────────────────── */
  .summary-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 8px !important;
  }

  /* ── Settings view ─────────────────────────────────────── */
  .settings-grid {
    grid-template-columns: 1fr !important;
  }

  /* ── Admin panel ───────────────────────────────────────── */
  /* Admin tab buttons - scroll horizontally */
  .workspace-inner > div > div:first-child {
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
    -webkit-overflow-scrolling: touch;
  }

  /* Admin menu table → stacked cards on mobile */
  table {
    display: block !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
  }
  thead { display: none !important; }
  tbody { display: block !important; }
  tbody tr {
    display: flex !important;
    flex-wrap: wrap !important;
    padding: 12px !important;
    border-bottom: 1px solid var(--line) !important;
    gap: 8px !important;
    align-items: center !important;
  }
  tbody td {
    padding: 0 !important;
    border: none !important;
  }
  /* Item name cell - full width */
  tbody td:first-child {
    flex: 1 1 100% !important;
  }
  /* Stock and Status cells */
  tbody td:nth-child(4),
  tbody td:nth-child(5) {
    flex: 1 !important;
  }
  /* Actions cell */
  tbody td:last-child {
    flex: 1 1 100% !important;
    display: flex !important;
    justify-content: flex-end !important;
  }

  /* ── Checkout modal ─────────────────────────────────────── */
  .pay-methods {
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 6px !important;
  }
  .pay-method {
    padding: 10px 6px !important;
    font-size: 11px !important;
  }

  /* ── Notification panel ─────────────────────────────────── */
  .notif-panel {
    position: fixed !important;
    top: auto !important;
    bottom: 72px !important;
    left: 8px !important;
    right: 8px !important;
    width: auto !important;
    max-height: 60vh !important;
    border-radius: 14px !important;
  }

  /* ── Bottom nav — replaces sidebar on mobile ─────────────── */
  .mobile-bottom-nav {
    display: flex !important;
  }

  /* ── Mobile back button for table selection ──────────────── */
  .mobile-table-back-btn {
    display: flex !important;
  }

  /* ── Add customer modal on mobile ───────────────────────── */
  .add-customer-modal .modal {
    max-height: 90vh !important;
  }
}

/* ── Bottom nav base (hidden on desktop) ─────────────────────── */
.mobile-bottom-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: var(--bg-2, #1a1d22);
  border-top: 1px solid var(--line, #2a2e35);
  height: 64px;
  padding: 0 4px;
  align-items: center;
  justify-content: space-around;
  gap: 2px;
}
.mobile-bottom-nav button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  flex: 1;
  height: 56px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 4px;
  border-radius: 10px;
  color: var(--text-dim, #6b7280);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  position: relative;
  transition: color 0.15s, background 0.15s;
}
.mobile-bottom-nav button.active {
  color: var(--amber, #f59e0b);
  background: var(--amber-soft, rgba(245,158,11,0.1));
}
.mobile-bottom-nav button svg {
  width: 20px;
  height: 20px;
}
.mobile-bottom-nav .pulse {
  position: absolute;
  top: 8px;
  right: calc(50% - 14px);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--amber, #f59e0b);
  animation: pulse-anim 1.4s infinite;
}
@keyframes pulse-anim {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(1.4); }
}

/* ── Mobile back button (hidden on desktop) ──────────────────── */
.mobile-table-back-btn {
  display: none;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dim);
  background: var(--bg-2);
  border: 1px solid var(--line);
  cursor: pointer;
  transition: all .15s;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 5;
}
.mobile-table-back-btn:hover {
  color: var(--text);
  background: var(--bg-3);
}
`;

  const style = document.createElement('style');
  style.id = 'mobile-responsive-fix';
  style.textContent = css;
  document.head.appendChild(style);

  // ── Inject mobile bottom navigation ──────────────────────────
  // Wait for React to mount, then wire up bottom nav
  function injectBottomNav() {
    if (document.getElementById('mobile-bottom-nav')) return;

    const NAV = [
      { id: 'floor',        icon: 'grid',    label: 'Floor'     },
      { id: 'reservations', icon: 'clock',   label: 'Reserve'   },
      { id: 'customers',    icon: 'users',   label: 'Guests'    },
      { id: 'history',      icon: 'history', label: 'Orders'    },
      { id: 'admin',        icon: 'chef',    label: 'Admin'     },
    ];

    const ICONS = {
      grid:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
      clock:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      users:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 1 .5 4M3 17V11h6"/></svg>',
      chef:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>',
    };

    const nav = document.createElement('div');
    nav.id = 'mobile-bottom-nav';
    nav.className = 'mobile-bottom-nav no-print';

    NAV.forEach(item => {
      const btn = document.createElement('button');
      btn.dataset.view = item.id;
      btn.innerHTML = (ICONS[item.icon] || '') + `<span>${item.label}</span>`;
      btn.addEventListener('click', () => {
        // Find the matching sidebar button and click it
        const allNavBtns = document.querySelectorAll('.sidebar-nav .sidebar-btn');
        // Map our nav to sidebar order: floor=0, reservations=1, customers=2, history=3, admin=5
        const sidebarIndex = { floor:0, reservations:1, customers:2, history:3, admin:5 }[item.id];
        if (allNavBtns[sidebarIndex]) allNavBtns[sidebarIndex].click();

        updateActive(item.id);
      });
      nav.appendChild(btn);
    });

    document.body.appendChild(nav);

    function updateActive(viewId) {
      nav.querySelectorAll('button').forEach(b => {
        b.classList.toggle('active', b.dataset.view === viewId);
      });
    }

    // Sync active state by watching sidebar button active class
    const observer = new MutationObserver(() => {
      const activeSidebar = document.querySelector('.sidebar-btn.active');
      if (activeSidebar) {
        // Find which NAV item corresponds
        const sidebarBtns = [...document.querySelectorAll('.sidebar-nav .sidebar-btn')];
        const idx = sidebarBtns.indexOf(activeSidebar);
        const viewMap = ['floor','reservations','customers','history','summary','admin','settings'];
        const currentView = viewMap[idx];
        if (currentView) updateActive(currentView);
      }
    });
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

    updateActive('floor'); // default
  }

  // Inject bottom nav after React renders
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(injectBottomNav, 600));
  } else {
    setTimeout(injectBottomNav, 600);
  }
})();
