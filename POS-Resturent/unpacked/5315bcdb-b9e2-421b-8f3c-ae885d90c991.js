// Floor plan view

const TableCard = ({ table, selected, onClick, onContextMenu, totals, currency }) => {
  const statusLabel = { available: "Available", occupied: "Occupied", reserved: "Reserved" }[table.status];
  return (
    <div
      className={`table-card ${table.status} ${selected ? "selected" : ""}`}
      onClick={() => onClick(table)}
      onContextMenu={(e) => { e.preventDefault(); onContextMenu(e, table); }}
    >
      <div className="table-top">
        <div>
          <div className="table-num">T{table.num}</div>
          <div className="table-cap">
            <Icon name="users" size={10} /> Seats {table.capacity}
          </div>
        </div>
        <div className="table-status">{statusLabel}</div>
      </div>
      <div>
        {table.waiter ? (
          <div className="table-waiter">{table.waiter}</div>
        ) : (
          <div className="table-meta">Unassigned</div>
        )}
        {totals != null && totals > 0 && (
          <div className="table-total">{currency}{totals.toFixed(2)}</div>
        )}
      </div>
      {table.splits.length > 1 && (
        <div className="table-splits">{table.splits.length} SPLITS</div>
      )}
    </div>
  );
};

const FloorPlan = ({ tables, selectedId, onSelect, onContext, settings, getTableTotal }) => {
  return (
    <div>
      <div className="section-head">
        <div>
          <div className="section-title">Floor Plan</div>
          <div className="section-sub">Tap a table to load its order · Right-click to change status</div>
        </div>
        <div className="legend">
          <span><span className="legend-dot" style={{background:'var(--green)'}}/>Available</span>
          <span><span className="legend-dot" style={{background:'var(--amber)'}}/>Occupied</span>
          <span><span className="legend-dot" style={{background:'var(--blue)'}}/>Reserved</span>
        </div>
      </div>
      <div className="floor-grid">
        {tables.map(t => (
          <TableCard
            key={t.id}
            table={t}
            selected={selectedId === t.id}
            onClick={onSelect}
            onContextMenu={onContext}
            totals={getTableTotal(t)}
            currency={settings.currency}
          />
        ))}
      </div>
    </div>
  );
};

const TableContextMenu = ({ ctx, onClose, onSetStatus, onAssignWaiter }) => {
  const ref = React.useRef();
  React.useEffect(() => {
    const close = (e) => { if (!ref.current?.contains(e.target)) onClose(); };
    document.addEventListener("click", close);
    document.addEventListener("contextmenu", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("contextmenu", close);
    };
  }, []);
  if (!ctx) return null;
  const table = ctx.table;
  return (
    <div ref={ref} className="ctx-menu" style={{ top: ctx.y, left: ctx.x }}>
      <div className="ctx-item" onClick={() => { onSetStatus(table, "available"); onClose(); }}>
        <span className="legend-dot" style={{background:'var(--green)'}}/>Mark Available
      </div>
      <div className="ctx-item" onClick={() => { onSetStatus(table, "reserved"); onClose(); }}>
        <span className="legend-dot" style={{background:'var(--blue)'}}/>Mark Reserved
      </div>
      <div className="ctx-item" onClick={() => { onSetStatus(table, "occupied"); onClose(); }}>
        <span className="legend-dot" style={{background:'var(--amber)'}}/>Mark Occupied
      </div>
      <div className="divider" style={{margin:'4px 6px'}} />
      <div className="ctx-item" onClick={() => { onAssignWaiter(table); onClose(); }}>
        <Icon name="user" size={12} /> Assign Waiter
      </div>
    </div>
  );
};

Object.assign(window, { FloorPlan, TableContextMenu });
