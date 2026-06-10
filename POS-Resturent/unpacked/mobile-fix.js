(function () {

  /* ═══════════════════════════════════════════════════════════
     CSS
  ═══════════════════════════════════════════════════════════ */
  const css = `
* { box-sizing: border-box; }

/* ── Bottom nav ──────────────────────────────────────────── */
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

/* ── Add Items FAB ───────────────────────────────────────── */
#mob-add-items-btn { display: none; }

/* ── Menu Bottom Sheet ───────────────────────────────────── */
#mob-menu-sheet {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 10000;
}
#mob-menu-sheet.open { display: block; }
#mob-menu-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
}
#mob-menu-drawer {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 88vh;
  background: var(--bg-2, #16191f);
  border-radius: 18px 18px 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: translateY(100%);
  transition: transform 0.32s cubic-bezier(.32,1,.45,1);
}
#mob-menu-sheet.open #mob-menu-drawer { transform: translateY(0); }
#mob-menu-drag-handle {
  width: 36px; height: 4px;
  background: var(--line, #2a2e38);
  border-radius: 2px;
  margin: 10px auto 0;
  flex-shrink: 0;
}
#mob-menu-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 6px;
  flex-shrink: 0;
}
#mob-menu-topbar h2 {
  font-size: 16px; font-weight: 600;
  color: var(--text, #e2e8f0); margin: 0;
}
#mob-menu-close {
  background: none; border: none; cursor: pointer;
  color: var(--text-dim, #555e6e); padding: 4px; font-size: 22px; line-height: 1;
}
#mob-cat-tabs {
  display: flex; flex-wrap: nowrap; overflow-x: auto;
  gap: 6px; padding: 4px 14px 10px;
  scrollbar-width: none; flex-shrink: 0;
  border-bottom: 1px solid var(--line, #2a2e38);
}
#mob-cat-tabs::-webkit-scrollbar { display: none; }
#mob-cat-tabs button {
  flex-shrink: 0; padding: 5px 13px; font-size: 12px; font-weight: 600;
  border-radius: 20px; border: 1px solid var(--line, #2a2e38);
  background: none; color: var(--text-dim, #555e6e);
  cursor: pointer; white-space: nowrap; transition: all 0.15s;
}
#mob-cat-tabs button.active {
  background: var(--amber, #f59e0b);
  border-color: var(--amber, #f59e0b); color: #000;
}
#mob-menu-scroll {
  flex: 1; overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 10px 14px 20px;
}
.mob-menu-card {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 0; border-bottom: 1px solid var(--line, #1e2330); cursor: pointer;
}
.mob-menu-card:active { opacity: 0.7; }
.mob-menu-card-img {
  width: 62px; height: 62px; border-radius: 8px;
  object-fit: cover; background: var(--bg-3, #0f1117); flex-shrink: 0;
}
.mob-menu-card-img-placeholder {
  width: 62px; height: 62px; border-radius: 8px;
  background: var(--bg-3, #0f1117); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 24px;
}
.mob-menu-card-info { flex: 1; min-width: 0; }
.mob-menu-card-name {
  font-size: 13px; font-weight: 600; color: var(--text, #e2e8f0);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.mob-menu-card-desc {
  font-size: 11px; color: var(--text-dim, #555e6e); margin-top: 2px;
  overflow: hidden; display: -webkit-box;
  -webkit-line-clamp: 2; -webkit-box-orient: vertical;
}
.mob-menu-card-price {
  font-size: 13px; font-weight: 600; color: var(--amber, #f59e0b); margin-top: 4px;
}
.mob-menu-card-add {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--amber, #f59e0b); border: none; cursor: pointer;
  color: #000; font-size: 24px; font-weight: 300;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: transform 0.1s; line-height: 1;
}
.mob-menu-card-add:active { transform: scale(0.88); }
.mob-86d {
  font-size: 9px; font-weight: 700; background: #ef4444; color: #fff;
  border-radius: 4px; padding: 1px 5px; margin-left: 6px; vertical-align: middle;
}
.mob-menu-card.unavail { opacity: 0.4; pointer-events: none; }

/* Toast */
#mob-add-toast {
  position: fixed; bottom: 74px; left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--amber, #f59e0b); color: #000;
  font-size: 13px; font-weight: 700; padding: 7px 18px;
  border-radius: 20px; z-index: 10100;
  opacity: 0; pointer-events: none;
  transition: opacity 0.2s, transform 0.2s; white-space: nowrap;
}
#mob-add-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

/* ════════════════════════════════════════════════════════════
   RESPONSIVE
════════════════════════════════════════════════════════════ */
@media (max-width: 768px) {

  .mobile-bottom-nav { display: flex !important; }
  .sidebar { display: none !important; }

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

  /* ── Single scroll container ─────────────────────────────── */
  .main-col {
    flex: 1 1 0 !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding-bottom: 70px !important;
    height: auto !important;
    max-height: none !important;
    display: flex !important;
    flex-direction: column !important;
  }

  /* ── Topbar ──────────────────────────────────────────────── */
  .topbar {
    display: flex !important; flex-direction: row !important;
    flex-wrap: nowrap !important; align-items: center !important;
    padding: 8px 12px !important; gap: 8px !important;
    height: auto !important; flex-shrink: 0 !important;
  }
  .page-title { flex: 1; min-width: 0; }
  .page-title-main {
    font-size: 16px !important; white-space: nowrap !important;
    overflow: hidden !important; text-overflow: ellipsis !important;
  }
  .page-title-sub { display: none !important; }
  .topbar-right   { display: flex !important; align-items: center !important; gap: 6px !important; flex-shrink: 0 !important; }
  .search-box     { display: none !important; }
  .cashier-chip   { display: none !important; }
  .shift-badge    { display: none !important; }
  .clock          { display: none !important; }

  /* ── Stats ───────────────────────────────────────────────── */
  .stats-strip {
    display: grid !important; grid-template-columns: 1fr 1fr !important;
    gap: 6px !important; padding: 8px 10px !important; flex-shrink: 0 !important;
  }
  .stat-tile       { padding: 8px 10px !important; border-radius: 8px !important; }
  .stat-tile-value { font-size: 18px !important; }
  .stat-tile-label { font-size: 9px !important; }
  .stat-tile-delta { font-size: 9px !important; margin-top: 2px !important; }

  /* ── Alerts ──────────────────────────────────────────────── */
  .tip-banner {
    font-size: 11px !important; padding: 8px 10px !important;
    margin: 4px 10px !important; flex-shrink: 0 !important;
  }
  .tip-banner kbd { display: none !important; }
  .alerts-strip   { padding: 0 10px 6px !important; flex-wrap: wrap !important; gap: 4px !important; }
  .alert-chip     { font-size: 10px !important; padding: 3px 7px !important; }

  /* ── Dash layout ─────────────────────────────────────────── */
  .dash-body {
    display: flex !important; flex-direction: column !important;
    height: auto !important; min-height: 0 !important;
    max-height: none !important; overflow: visible !important;
    flex: 1 1 auto !important;
  }
  .dash-center {
    display: block !important; width: 100% !important;
    height: auto !important; max-height: none !important;
    overflow: visible !important; flex: none !important;
  }
  .dash-right {
    display: block !important; width: 100% !important;
    height: auto !important; max-height: none !important;
    overflow: visible !important; border-left: none !important;
    border-top: 1px solid var(--line, #2a2e38) !important; flex: none !important;
  }

  /* ── Floor grid ──────────────────────────────────────────── */
  .floor-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)) !important;
    gap: 7px !important; padding: 8px 10px !important;
    height: auto !important; overflow: visible !important;
  }
  .table-card   { padding: 8px 6px !important; min-width: 0 !important; height: auto !important; }
  .table-num    { font-size: 17px !important; }
  .table-cap, .table-status { font-size: 9px !important; }
  .table-waiter { font-size: 9px !important; overflow: hidden !important; text-overflow: ellipsis !important; white-space: nowrap !important; }
  .table-meta   { font-size: 9px !important; }
  .table-total  { font-size: 10px !important; }
  .table-splits { display: none !important; }

  /* ── Placeholder ─────────────────────────────────────────── */
  .no-table-placeholder, .order-placeholder,
  [class*="placeholder"], [class*="empty-state"] {
    display: flex !important; flex-direction: column !important;
    align-items: center !important; justify-content: center !important;
    padding: 40px 20px !important; height: auto !important; min-height: 160px !important;
  }

  /* ── Ticker ──────────────────────────────────────────────── */
  .live-activity, .activity-section {
    padding: 8px 10px !important; height: auto !important; overflow: visible !important;
  }
  .ticker       { padding: 8px 12px !important; height: auto !important; overflow: visible !important; }
  .ticker-title { font-size: 10px !important; }
  .ticker-item  { font-size: 10px !important; padding: 3px 0 !important; }
  .ticker-time  { font-size: 9px !important; }

  /* ── Desktop menu — hidden, sheet handles it ─────────────── */
  .menu-area { display: none !important; }

  /* ── Order panel ─────────────────────────────────────────── */
  .order-panel {
    display: block !important; width: 100% !important;
    height: auto !important; max-height: none !important;
    overflow: visible !important; border-radius: 0 !important; padding: 10px 12px !important;
  }
  .order-head-row  { flex-wrap: wrap !important; gap: 6px !important; }
  .order-table-num { font-size: 17px !important; }
  .split-tabs      { flex-wrap: wrap !important; gap: 4px !important; }
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
    flex: 1 1 40% !important; font-size: 12px !important;
    padding: 9px 6px !important; text-align: center !important;
  }

  /* ── Add Items button ────────────────────────────────────── */
  #mob-add-items-btn {
    display: flex !important;
    align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 13px; margin: 0 0 12px 0;
    background: var(--amber, #f59e0b); color: #000;
    font-size: 14px; font-weight: 700;
    border: none; border-radius: 10px; cursor: pointer;
  }
  #mob-add-items-btn svg { width: 18px; height: 18px; }

  /* ════════════════════════════════════════════════════════
     ADMIN PANEL FIXES
  ════════════════════════════════════════════════════════ */

  /* ── Workspace (admin view container) ────────────────────── */
  .workspace {
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
  }
  .workspace-inner {
    padding: 10px !important;
    max-width: 100% !important;
    height: auto !important;
    overflow: visible !important;
  }

  /* ── Admin section tabs (Menu / Tables / Staff etc) ──────── */
  .admin-tabs,
  [class*="admin-tab"],
  [class*="section-tabs"] {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    scrollbar-width: none !important;
    gap: 4px !important;
    padding: 6px 10px !important;
    flex-shrink: 0 !important;
  }
  .admin-tabs::-webkit-scrollbar,
  [class*="admin-tab"]::-webkit-scrollbar { display: none !important; }

  /* ── Item list / category list ───────────────────────────── */
  .item-list,
  .cat-list,
  [class*="item-list"],
  [class*="cat-list"],
  [class*="menu-list"] {
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
  }

  /* ── Add Item / Edit Item FORM ───────────────────────────── */
  /*
     The form lives in .workspace-inner or a panel.
     On desktop it's a sidebar with fixed height.
     On mobile we make it a normal scrollable block.
     The critical fix: remove any fixed/max height so the
     Save button at the bottom is reachable.
  */
  .item-form,
  .edit-form,
  .add-form,
  [class*="item-form"],
  [class*="edit-form"],
  [class*="add-form"],
  [class*="menu-form"],
  form {
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    display: block !important;
    padding-bottom: 16px !important;
  }

  /* ── Form fields ─────────────────────────────────────────── */
  .form-group,
  .field-group,
  [class*="form-group"],
  [class*="field-group"] {
    margin-bottom: 12px !important;
  }

  .form-label,
  label {
    font-size: 11px !important;
    margin-bottom: 4px !important;
    display: block !important;
  }

  .form-input,
  .form-select,
  .form-textarea,
  input[type="text"],
  input[type="number"],
  input[type="url"],
  input[type="email"],
  select,
  textarea {
    width: 100% !important;
    font-size: 14px !important;
    padding: 10px 12px !important;
    border-radius: 8px !important;
    min-height: 42px !important;
  }

  textarea {
    min-height: 80px !important;
    resize: vertical !important;
  }

  /* Two-column form rows → single column on mobile */
  .form-row,
  .field-row,
  [class*="form-row"],
  [class*="field-row"] {
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
  }

  /* ── Save / Submit buttons inside forms ──────────────────── */
  .form-actions,
  .form-footer,
  [class*="form-action"],
  [class*="form-footer"],
  [class*="save-btn"],
  [class*="submit-btn"] {
    position: static !important;
    bottom: auto !important;
    width: 100% !important;
    padding: 12px 0 4px !important;
    background: transparent !important;
    box-shadow: none !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
  }

  /* Make any submit / save / add button full width and tappable */
  .form-actions .btn,
  .form-actions button,
  .form-footer .btn,
  .form-footer button,
  [class*="save-btn"],
  [class*="submit-btn"],
  button[type="submit"] {
    width: 100% !important;
    min-height: 46px !important;
    font-size: 14px !important;
    border-radius: 10px !important;
  }

  /* ── MODAL / DIALOG — bottom sheet override ──────────────── */
  /*
     Both the Add Item modal and Add Category modal need to:
     1. Anchor to the bottom of the screen
     2. Have a scrollable body
     3. Show the footer (save button) always at the bottom
  */
  .modal-backdrop {
    position: fixed !important;
    inset: 0 !important;
    display: flex !important;
    align-items: flex-end !important;   /* anchor to bottom */
    justify-content: center !important;
    padding: 0 !important;
    z-index: 9990 !important;
    background: rgba(0,0,0,0.55) !important;
  }

  .modal,
  .dialog,
  [class*="modal"],
  [class*="dialog"],
  [role="dialog"] {
    /* Full-width bottom sheet */
    position: relative !important;
    width: 100% !important;
    max-width: 100% !important;
    max-height: 92vh !important;
    height: auto !important;
    margin: 0 !important;
    border-radius: 20px 20px 0 0 !important;
    /* Internal flex column: header | scrollable body | sticky footer */
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    /* Prevent the modal itself from being off-screen */
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    transform: none !important;
    top: auto !important;
  }

  /* Drag handle for modal sheets */
  .modal::before,
  [role="dialog"]::before {
    content: '';
    display: block;
    width: 36px; height: 4px;
    background: var(--line, #2a2e38);
    border-radius: 2px;
    margin: 10px auto 0;
    flex-shrink: 0;
  }

  /* Modal header — fixed, never scrolls */
  .modal-head,
  .modal-header,
  .dialog-head,
  [class*="modal-head"],
  [class*="dialog-head"] {
    padding: 12px 16px 10px !important;
    flex-shrink: 0 !important;
    border-bottom: 1px solid var(--line, #2a2e38) !important;
  }
  .modal-head h2,
  .modal-head h3,
  .modal-title,
  [class*="modal-title"] {
    font-size: 16px !important;
    font-weight: 600 !important;
    margin: 0 !important;
  }
  .modal-head p,
  .modal-subtitle,
  [class*="modal-subtitle"] {
    font-size: 12px !important;
    margin: 2px 0 0 !important;
    color: var(--text-dim, #555e6e) !important;
  }

  /* Modal body — scrolls freely */
  .modal-body,
  .dialog-body,
  [class*="modal-body"],
  [class*="dialog-body"] {
    flex: 1 1 0 !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding: 14px 16px !important;
    height: auto !important;
    max-height: none !important;
    /* Give extra bottom room so footer doesn't cover last field */
    padding-bottom: 20px !important;
  }

  /* Modal footer — always visible at the bottom */
  .modal-foot,
  .modal-footer,
  .dialog-foot,
  [class*="modal-foot"],
  [class*="modal-footer"],
  [class*="dialog-foot"] {
    flex-shrink: 0 !important;
    padding: 12px 16px 20px !important;
    border-top: 1px solid var(--line, #2a2e38) !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    background: var(--bg-2, #16191f) !important;
  }

  /* Buttons inside modal footer */
  .modal-foot .btn,
  .modal-foot button,
  .modal-footer .btn,
  .modal-footer button,
  [class*="modal-foot"] .btn,
  [class*="modal-foot"] button {
    width: 100% !important;
    min-height: 46px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    border-radius: 10px !important;
    flex: none !important;
  }

  /* ── Specifically: Add Category modal fields ─────────────── */
  /* The emoji + category name row */
  .cat-form-row,
  [class*="cat-form"],
  .emoji-row,
  [class*="emoji-row"] {
    display: flex !important;
    flex-direction: row !important;
    gap: 10px !important;
    align-items: flex-start !important;
  }
  .emoji-picker-btn,
  [class*="emoji-btn"],
  [class*="emoji-pick"] {
    min-width: 60px !important;
    min-height: 60px !important;
    font-size: 28px !important;
    border-radius: 10px !important;
  }

  /* ── Admin panel top action row (Add Item / Add Category btns) */
  .admin-actions,
  .panel-actions,
  [class*="admin-action"],
  [class*="panel-action"] {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    padding: 8px 10px !important;
  }
  .admin-actions .btn,
  .panel-actions .btn,
  [class*="admin-action"] .btn,
  [class*="panel-action"] .btn {
    flex: 1 1 auto !important;
    min-height: 40px !important;
    font-size: 13px !important;
  }

  /* Pay methods */
  .pay-methods { flex-wrap: wrap !important; gap: 7px !important; }
  .pay-method  { flex: 1 1 40% !important; padding: 10px 6px !important; }

  /* Ctx menu */
  .ctx-menu {
    position: fixed !important; bottom: 68px !important;
    left: 10px !important; right: 10px !important;
    top: auto !important; width: auto !important;
    border-radius: 12px !important; z-index: 9998 !important;
  }
  .ctx-item { padding: 12px 16px !important; font-size: 14px !important; }
}
`;

  /* ── Inject CSS ──────────────────────────────────────────── */
  const oldStyle = document.getElementById('mobile-responsive-fix');
  if (oldStyle) oldStyle.remove();
  const style = document.createElement('style');
  style.id = 'mobile-responsive-fix';
  style.textContent = css;
  document.head.appendChild(style);

  /* ═══════════════════════════════════════════════════════════
     MODAL STRUCTURE FIXER
     Ensures every modal/dialog has the correct
     head → body → foot structure so the save button
     is always visible and the body scrolls.
  ═══════════════════════════════════════════════════════════ */
  function fixModal(modal) {
    if (modal.dataset.mobFixed) return;
    modal.dataset.mobFixed = '1';

    // Already flex-column from CSS — just make sure body is scrollable
    var body = modal.querySelector(
      '.modal-body, .dialog-body, [class*="modal-body"], [class*="dialog-body"]'
    );
    var foot = modal.querySelector(
      '.modal-foot, .modal-footer, .dialog-foot, [class*="modal-foot"], [class*="modal-footer"]'
    );

    if (body) {
      body.style.overflowY  = 'auto';
      body.style.webkitOverflowScrolling = 'touch';
      body.style.flex       = '1 1 0';
      body.style.maxHeight  = 'none';
    }

    if (foot) {
      foot.style.flexShrink = '0';
      foot.style.position   = 'relative';
      foot.style.bottom     = 'auto';
      // Ensure buttons are full-width
      foot.querySelectorAll('button, .btn').forEach(function(btn) {
        btn.style.width     = '100%';
        btn.style.minHeight = '46px';
      });
    }
  }

  function scanModals() {
    var isMobile = window.innerWidth <= 768;
    if (!isMobile) return;
    document.querySelectorAll(
      '.modal, .dialog, [class*="modal"]:not(.modal-backdrop):not(.modal-body):not(.modal-head):not(.modal-foot), [role="dialog"]'
    ).forEach(fixModal);
  }

  new MutationObserver(scanModals)
    .observe(document.body, { childList: true, subtree: true });

  /* ═══════════════════════════════════════════════════════════
     BOTTOM NAV
  ═══════════════════════════════════════════════════════════ */
  const NAV_ITEMS = [
    { id: 'floor',        label: 'Floor',   idx: 0, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
    { id: 'reservations', label: 'Reserve', idx: 1, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
    { id: 'customers',    label: 'Guests',  idx: 2, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { id: 'history',      label: 'Orders',  idx: 3, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 1 .5 4M3 17V11h6"/></svg>' },
    { id: 'admin',        label: 'Admin',   idx: 5, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>' },
  ];

  function buildNav() {
    if (document.getElementById('mobile-bottom-nav')) return;
    var nav = document.createElement('div');
    nav.id = 'mobile-bottom-nav';
    nav.className = 'mobile-bottom-nav no-print';

    NAV_ITEMS.forEach(function(item) {
      var btn = document.createElement('button');
      btn.dataset.view = item.id;
      btn.innerHTML = item.icon + '<span>' + item.label + '</span>';
      btn.addEventListener('click', function() {
        var btns = document.querySelectorAll('.sidebar-nav .sidebar-btn');
        if (btns[item.idx]) btns[item.idx].click();
        setActive(item.id);
        var mc = document.querySelector('.main-col');
        if (mc) mc.scrollTop = 0;
      });
      nav.appendChild(btn);
    });

    document.body.appendChild(nav);
    setActive('floor');

    var viewMap = ['floor','reservations','customers','history','summary','admin','settings'];
    new MutationObserver(function() {
      var btns = Array.from(document.querySelectorAll('.sidebar-nav .sidebar-btn'));
      var i = btns.findIndex(function(b){ return b.classList.contains('active'); });
      if (i >= 0 && viewMap[i]) setActive(viewMap[i]);
    }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

    function setActive(id) {
      nav.querySelectorAll('button').forEach(function(b) {
        b.classList.toggle('active', b.dataset.view === id);
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
     MENU BOTTOM SHEET
  ═══════════════════════════════════════════════════════════ */
  function buildMenuSheet() {
    if (!document.getElementById('mob-add-items-btn')) {
      var addBtn = document.createElement('button');
      addBtn.id = 'mob-add-items-btn';
      addBtn.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
        'Add Items to Order';
      addBtn.addEventListener('click', openSheet);
      document.body.appendChild(addBtn);
    }

    if (!document.getElementById('mob-menu-sheet')) {
      var sheet = document.createElement('div');
      sheet.id = 'mob-menu-sheet';
      sheet.innerHTML =
        '<div id="mob-menu-backdrop"></div>' +
        '<div id="mob-menu-drawer">' +
          '<div id="mob-menu-drag-handle"></div>' +
          '<div id="mob-menu-topbar"><h2>Add Items</h2><button id="mob-menu-close">&#x2715;</button></div>' +
          '<div id="mob-cat-tabs"></div>' +
          '<div id="mob-menu-scroll"></div>' +
        '</div>';
      document.body.appendChild(sheet);
      document.getElementById('mob-menu-backdrop').addEventListener('click', closeSheet);
      document.getElementById('mob-menu-close').addEventListener('click', closeSheet);
      var startY = 0;
      var drawer = document.getElementById('mob-menu-drawer');
      drawer.addEventListener('touchstart', function(e){ startY = e.touches[0].clientY; }, { passive: true });
      drawer.addEventListener('touchend', function(e){
        if (e.changedTouches[0].clientY - startY > 80) closeSheet();
      }, { passive: true });
    }

    if (!document.getElementById('mob-add-toast')) {
      var toast = document.createElement('div');
      toast.id = 'mob-add-toast';
      document.body.appendChild(toast);
    }

    watchOrderPanel();
  }

  function watchOrderPanel() {
    var lastPanel = null;
    function check() {
      var panel = document.querySelector('.order-panel');
      var btn   = document.getElementById('mob-add-items-btn');
      if (!panel || !btn) return;
      if (panel === lastPanel && btn.parentElement === panel) return;
      lastPanel = panel;
      var totals = panel.querySelector('.totals');
      if (totals) {
        panel.insertBefore(btn, totals);
      } else {
        var items = panel.querySelector('.order-items');
        if (items && items.nextSibling) panel.insertBefore(btn, items.nextSibling);
      }
    }
    new MutationObserver(check).observe(document.body, { childList: true, subtree: true });
    check();
  }

  function openSheet() {
    populateSheet();
    var sheet = document.getElementById('mob-menu-sheet');
    if (sheet) sheet.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSheet() {
    var sheet = document.getElementById('mob-menu-sheet');
    if (sheet) sheet.classList.remove('open');
    document.body.style.overflow = '';
  }

  function populateSheet() {
    var catTabsEl = document.getElementById('mob-cat-tabs');
    var scrollEl  = document.getElementById('mob-menu-scroll');
    catTabsEl.innerHTML = '';
    scrollEl.innerHTML  = '';

    var desktopCatBtns = document.querySelectorAll(
      '.cat-tabs button, .menu-tabs button, [class*="cat-tab"] button'
    );
    var cats = [];
    desktopCatBtns.forEach(function(b){
      var t = b.textContent.trim();
      if (t && cats.indexOf(t) === -1) cats.push(t);
    });
    if (cats.length === 0) cats = ['All'];

    cats.forEach(function(cat, i) {
      var tb = document.createElement('button');
      tb.textContent = cat;
      if (i === 0) tb.classList.add('active');
      tb.addEventListener('click', function(){
        catTabsEl.querySelectorAll('button').forEach(function(b){ b.classList.remove('active'); });
        tb.classList.add('active');
        desktopCatBtns.forEach(function(b){ if (b.textContent.trim() === cat) b.click(); });
        setTimeout(function(){ renderItems(scrollEl); }, 120);
      });
      catTabsEl.appendChild(tb);
    });

    renderItems(scrollEl);
  }

  function renderItems(scrollEl) {
    scrollEl.innerHTML = '';
    var cards = document.querySelectorAll(
      '.menu-card, .menu-item, [class*="menu-card"], [class*="menu-item"]'
    );

    if (cards.length === 0) {
      scrollEl.innerHTML =
        '<div style="text-align:center;padding:48px 20px;color:var(--text-dim,#555e6e)">' +
          '<div style="font-size:36px;margin-bottom:12px">🍽️</div>' +
          '<div style="font-size:14px;font-weight:600;color:var(--text,#e2e8f0);margin-bottom:6px">Menu not loaded</div>' +
          '<div style="font-size:12px">Select a table on the Floor tab first.</div>' +
        '</div>';
      return;
    }

    var shown = 0;
    cards.forEach(function(card) {
      var nameEl  = card.querySelector('.menu-name,[class*="menu-name"],h3,h4,strong');
      var priceEl = card.querySelector('.menu-price,[class*="price"]');
      var descEl  = card.querySelector('.menu-desc,[class*="desc"],p');
      var imgEl   = card.querySelector('img');
      var addEl   = card.querySelector('.menu-add,[class*="add-btn"],[class*="add"]');
      var is86d   = card.classList.contains('unavail') || card.classList.contains('sold-out') || !!card.querySelector('[class*="86"]');

      var name   = nameEl  ? nameEl.textContent.trim()  : 'Item';
      var price  = priceEl ? priceEl.textContent.trim() : '';
      var desc   = descEl  ? descEl.textContent.trim()  : '';
      var imgSrc = imgEl   ? imgEl.src                  : '';

      var row = document.createElement('div');
      row.className = 'mob-menu-card' + (is86d ? ' unavail' : '');
      row.innerHTML =
        (imgSrc ? '<img class="mob-menu-card-img" src="' + imgSrc + '" alt="' + name + '" loading="lazy"/>'
                : '<div class="mob-menu-card-img-placeholder">🍽</div>') +
        '<div class="mob-menu-card-info">' +
          '<div class="mob-menu-card-name">' + name + (is86d ? '<span class="mob-86d">86\'d</span>' : '') + '</div>' +
          (desc ? '<div class="mob-menu-card-desc">' + desc + '</div>' : '') +
          '<div class="mob-menu-card-price">' + price + '</div>' +
        '</div>' +
        '<button class="mob-menu-card-add" aria-label="Add ' + name + '">+</button>';

      function doAdd() {
        if (is86d) return;
        if (addEl) addEl.click();
        else if (card.querySelector('button')) card.querySelector('button').click();
        else card.click();
        showToast(name + ' added');
      }

      row.querySelector('.mob-menu-card-add').addEventListener('click', function(e){ e.stopPropagation(); doAdd(); });
      row.addEventListener('click', doAdd);
      scrollEl.appendChild(row);
      shown++;
    });

    if (shown === 0) {
      scrollEl.innerHTML = '<div style="text-align:center;padding:40px 20px;color:var(--text-dim,#555e6e);font-size:12px">No items found</div>';
    }
  }

  var toastTimer = null;
  function showToast(msg) {
    var t = document.getElementById('mob-add-toast');
    if (!t) return;
    t.textContent = '✓ ' + msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 1800);
  }

  /* ── INIT ────────────────────────────────────────────────── */
  setTimeout(function(){
    buildNav();
    buildMenuSheet();
    scanModals();
  }, 900);

})();
