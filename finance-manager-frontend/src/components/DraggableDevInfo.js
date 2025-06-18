import React, { useRef, useState, useEffect } from 'react';

// CSS variables for light/dark mode and neon
const rootVars = `
:root {
  --dev-bg: rgba(255,255,255,0.18);
  --dev-border: rgba(255,255,255,0.28);
  --dev-shadow: 0 8px 32px 0 rgba(30,64,175,0.18);
  --dev-text: #222;
  --dev-title: #ff0000;
  --dev-link1: #fffb00;
  --dev-link2: #00ffc8;
  --dev-link3: #00aeff;
  --dev-blur: blur(18px) saturate(180%);
  --dev-icon-bg: rgba(255,255,255,0.18);
  --dev-icon-color: #ff0000;
}
@media (prefers-color-scheme: dark) {
  :root {
    --dev-bg: rgba(20,20,30,0.38);
    --dev-border: rgba(255,255,255,0.18);
    --dev-shadow: 0 8px 32px 0 rgba(0,255,255,0.12);
    --dev-text: #f2f2f2;
    --dev-title: #ff3b82;
    --dev-link1: #fff200;
    --dev-link2: #00ffd0;
    --dev-link3: #00c3ff;
    --dev-blur: blur(18px) saturate(180%);
    --dev-icon-bg: rgba(30,30,40,0.38);
    --dev-icon-color: #ff3b82;
  }
}
`;

// Inject CSS variables and component styles
if (!document.getElementById('draggable-devinfo-style')) {
  const style = document.createElement('style');
  style.id = 'draggable-devinfo-style';
  style.innerHTML = `
    ${rootVars}
    .devinfo-draggable {
      position: fixed;
      bottom: 32px;
      right: 32px;
      z-index: 9999;
      transition: box-shadow 0.3s, background 0.3s, border 0.3s, transform 0.35s cubic-bezier(.4,2,.6,1), width 0.35s, height 0.35s;
      will-change: transform;
      user-select: none;
    }
    .devinfo-inner {
      background: var(--dev-bg);
      border-radius: 1.7rem;
      box-shadow: var(--dev-shadow);
      border: 1.5px solid var(--dev-border);
      padding: 1.3rem 2.1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: 1.08rem;
      backdrop-filter: var(--dev-blur);
      -webkit-backdrop-filter: var(--dev-blur);
      color: var(--dev-text);
      cursor: grab;
      min-width: 260px;
      max-width: 95vw;
      min-height: 120px;
      transition: box-shadow 0.3s, background 0.3s, border 0.3s;
    }
    .devinfo-title {
      font-weight: 800;
      font-size: 1.15rem;
      letter-spacing: 0.01em;
      color: var(--dev-title);
      text-shadow: 0 2px 8px rgba(30,64,175,0.08);
      margin-bottom: 0.2rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .devinfo-close {
      margin-left: 1.5rem;
      cursor: pointer;
      font-weight: 700;
      font-size: 1.3rem;
      color: var(--dev-title);
      background: none;
      border: none;
      outline: none;
      transition: color 0.2s;
    }
    .devinfo-close:hover {
      color: #fff;
    }
    .devinfo-links {
      display: flex;
      gap: 1.2rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .devinfo-link1 { color: var(--dev-link1); font-weight: 700; text-decoration: underline; }
    .devinfo-link2 { color: var(--dev-link2); font-weight: 700; text-decoration: underline; }
    .devinfo-link3 { color: var(--dev-link3); font-weight: 700; text-decoration: underline; }
    .devinfo-search {
      width: 100%;
      margin-bottom: 0.5rem;
    }
    .devinfo-search input {
      width: 100%;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      border: 1px solid #fff;
      background: rgba(255,255,255,0.25);
      color: var(--dev-text);
      font-size: 1rem;
      outline: none;
      margin-bottom: 0.2rem;
      box-sizing: border-box;
      transition: background 0.2s, color 0.2s;
    }
    .devinfo-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--dev-icon-bg);
      box-shadow: var(--dev-shadow);
      border: 1.5px solid var(--dev-border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: var(--dev-icon-color);
      cursor: pointer;
      backdrop-filter: var(--dev-blur);
      -webkit-backdrop-filter: var(--dev-blur);
      transition: box-shadow 0.3s, background 0.3s, border 0.3s, width 0.35s, height 0.35s;
      will-change: width, height, background, color;
      outline: none;
      border: 2px solid var(--dev-title);
    }
    @media (max-width: 600px) {
      .devinfo-draggable {
        bottom: 16px;
        right: 16px;
      }
      .devinfo-inner {
        padding: 1rem 0.7rem;
        min-width: 180px;
        font-size: 0.98rem;
      }
      .devinfo-icon {
        width: 48px;
        height: 48px;
        font-size: 1.5rem;
      }
    }
  `;
  document.head.appendChild(style);
}

function DraggableDevInfo() {
  const [collapsed, setCollapsed] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [touchId, setTouchId] = useState(null);
  const [search, setSearch] = useState('');
  const dragRef = useRef();
  const offset = useRef({ x: 0, y: 0 });

  // Mouse drag handlers
  const onMouseDown = (e) => {
    if (collapsed) return;
    setDragging(true);
    offset.current = {
      x: e.clientX - (dragRef.current?.getBoundingClientRect().left || 0),
      y: e.clientY - (dragRef.current?.getBoundingClientRect().top || 0),
    };
    document.body.style.userSelect = 'none';
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };
  const onMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = '';
  };

  // Touch drag handlers
  const onTouchStart = (e) => {
    if (collapsed) return;
    const touch = e.targetTouches[0];
    setTouchId(touch.identifier);
    setDragging(true);
    offset.current = {
      x: touch.clientX - (dragRef.current?.getBoundingClientRect().left || 0),
      y: touch.clientY - (dragRef.current?.getBoundingClientRect().top || 0),
    };
  };
  const onTouchMove = (e) => {
    if (!dragging) return;
    const touch = Array.from(e.targetTouches).find(t => t.identifier === touchId);
    if (!touch) return;
    setPos({
      x: touch.clientX - offset.current.x,
      y: touch.clientY - offset.current.y,
    });
  };
  const onTouchEnd = () => {
    setDragging(false);
    setTouchId(null);
  };

  // Attach/detach listeners
  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
    // eslint-disable-next-line
  }, [dragging, touchId]);

  // Keep box within viewport
  useEffect(() => {
    if (!dragging) {
      const box = dragRef.current;
      if (!box) return;
      const { innerWidth, innerHeight } = window;
      const rect = box.getBoundingClientRect();
      let newX = pos.x, newY = pos.y;
      if (rect.right > innerWidth) newX -= (rect.right - innerWidth);
      if (rect.bottom > innerHeight) newY -= (rect.bottom - innerHeight);
      if (rect.left < 0) newX -= rect.left;
      if (rect.top < 0) newY -= rect.top;
      if (newX !== pos.x || newY !== pos.y) setPos({ x: newX, y: newY });
    }
    // eslint-disable-next-line
  }, [dragging]);

  // Animate collapse/expand
  const boxClass = 'devinfo-draggable' + (collapsed ? ' devinfo-collapsed' : '');
  const boxStyle = {
    transform: `translate(${pos.x}px, ${pos.y}px)`,
    width: collapsed ? 56 : undefined,
    height: collapsed ? 56 : undefined,
    minWidth: collapsed ? 56 : undefined,
    minHeight: collapsed ? 56 : undefined,
    transition: 'box-shadow 0.3s, background 0.3s, border 0.3s, transform 0.35s cubic-bezier(.4,2,.6,1), width 0.35s, height 0.35s',
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(search)}`, '_blank');
    }
  };

  return collapsed ? (
    <div
      ref={dragRef}
      className={boxClass}
      style={boxStyle}
      tabIndex={0}
      aria-label="Show developer info"
    >
      <div
        className="devinfo-icon"
        title="Show developer info"
        onClick={() => setCollapsed(false)}
        tabIndex={0}
        role="button"
        aria-label="Expand developer info"
        style={{ outline: 'none' }}
      >
        <span style={{fontWeight:800, color:'var(--dev-icon-color)', textShadow:'0 2px 8px rgba(30,64,175,0.18)'}}>P</span>
      </div>
    </div>
  ) : (
    <div
      ref={dragRef}
      className={boxClass}
      style={boxStyle}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      tabIndex={0}
      aria-label="Developer info box"
    >
      <div className="devinfo-inner">
        <div className="devinfo-title">
          <span>Developed by Priyanshu Singh</span>
          <button
            className="devinfo-close"
            title="Collapse"
            onClick={() => setCollapsed(true)}
            aria-label="Collapse developer info"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSearch} className="devinfo-search">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search online..."
            aria-label="Search online"
          />
          <button type="submit" style={{display:'none'}}>Search</button>
        </form>
        <div className="devinfo-links">
          <a href="https://priyanshusinghportfolio.onrender.com/" target="_blank" rel="noopener" className="devinfo-link1">Portfolio</a>
          <a href="https://github.com/PRIYANSHUSINGH2003" target="_blank" rel="noopener" className="devinfo-link2">GitHub</a>
          <a href="https://www.linkedin.com/in/priyanshu-singh-0859211b6/" target="_blank" rel="noopener" className="devinfo-link3">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

export default DraggableDevInfo;
