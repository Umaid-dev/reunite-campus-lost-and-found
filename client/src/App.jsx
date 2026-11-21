import { useEffect, useState } from 'react';
import {
  Search,
  Plus,
  Bookmark,
  MapPin,
  CalendarDays,
  HandHeart,
  ShieldCheck,
  SearchX,
  CircleCheck,
  RotateCcw,
  Mail,
  Check,
  ChevronDown,
} from 'lucide-react';
import { CATEGORIES } from '../../shared/constants.js';
import { selectItems, stats } from '../../shared/board.js';
import { api } from './api.js';
import Modal from './components/Modal.jsx';
import ReportForm from './components/ReportForm.jsx';
import ItemCard, { formatDate } from './components/ItemCard.jsx';
import ItemArt from './components/ItemArt.jsx';
const STORAGE = 'reunite-saved-v1';
function readSaved() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE) || '[]');
    return Array.isArray(value) ? value.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}
export default function App() {
  const [items, setItems] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState('');
  const [query, setQuery] = useState(''),
    [category, setCategory] = useState('All categories'),
    [type, setType] = useState('all'),
    [sort, setSort] = useState('newest');
  const [view, setView] = useState('board'),
    [saved, setSaved] = useState(readSaved),
    [modal, setModal] = useState(null),
    [active, setActive] = useState(null);
  const [mode, setMode] = useState('mongodb');
  const [toast, setToast] = useState(''),
    [busy, setBusy] = useState(false),
    [confirm, setConfirm] = useState(false),
    [detailError, setDetailError] = useState('');
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 4500);
    return () => clearTimeout(id);
  }, [toast]);
  async function load() {
    setLoading(true);
    setError('');
    try {
      setItems(await api());
    } catch {
      setError(
        'We couldn’t load the board. Check that the API and MongoDB are running, then retry.',
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
    fetch('/api/health')
      .then((r) => r.json())
      .then((data) => setMode(data.mode))
      .catch(() => {});
  }, []);
  function save(id) {
    const next = saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem(STORAGE, JSON.stringify(next));
    } catch {
      setToast('Saved for this visit. Browser storage is unavailable.');
    }
  }
  function open(item) {
    setActive(item);
    setConfirm(false);
    setDetailError('');
    setModal('detail');
  }
  function clearFilters() {
    setQuery('');
    setCategory('All categories');
    setType('all');
  }
  async function markReturned() {
    setBusy(true);
    setDetailError('');
    try {
      const updated = await api(`/${active._id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'returned' }),
      });
      setItems(items.map((x) => (x._id === updated._id ? updated : x)));
      setActive(updated);
      setConfirm(false);
      setToast('Another item, back where it belongs. Marked as returned.');
    } catch (error) {
      setDetailError(error.message);
    } finally {
      setBusy(false);
    }
  }
  const filtered = selectItems(items, {
    query,
    category,
    type,
    savedOnly: view === 'saved',
    saved,
    sort,
  });
  const counts = stats(items);
  const savedCount = items.filter((x) => saved.includes(x._id)).length;
  return (
    <>
      <header className="header">
        <div className="shell nav">
          <a
            href="#"
            className="brand"
            aria-label="Reunite home"
            onClick={(e) => {
              e.preventDefault();
              setView('board');
              clearFilters();
            }}
          >
            <span className="brand-icon">
              <HandHeart size={23} />
            </span>
            reunite<span className="brand-dot">.</span>
          </a>
          <nav aria-label="Main navigation">
            <button
              className={view === 'board' ? 'nav-link active' : 'nav-link'}
              onClick={() => setView('board')}
            >
              The board
            </button>
            <button
              className={view === 'saved' ? 'nav-link active' : 'nav-link'}
              onClick={() => setView('saved')}
            >
              <Bookmark size={16} />
              Saved{savedCount > 0 && <span className="nav-count">{savedCount}</span>}
            </button>
            <button className="nav-link how-nav" onClick={() => setModal('how')}>
              How it works
            </button>
          </nav>
          <button className="btn primary nav-report" onClick={() => setModal('report')}>
            <Plus size={18} />
            Report an item
          </button>
        </div>
      </header>
      <main className="shell">
        {mode === 'demo' && (
          <p className="demo-notice">
            Demo mode · Fictional sample data · Changes reset when the server restarts
          </p>
        )}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="hero-kicker">
              <span className="tiny-spark">✳</span> SMALL ACTS. HAPPY REUNIONS.
            </span>
            <h1 id="hero-title">
              Good things find
              <br />
              their way <em>back.</em>
            </h1>
            <p>
              Your campus lost &amp; found, all in one place.
              <br className="desktop-break" /> A little help from you could make someone’s day.
            </p>
            <div className="hero-actions">
              <button className="btn primary" onClick={() => setModal('report')}>
                <Plus size={18} />
                Report a lost or found item
              </button>
              <span className="hero-caption">
                <HandHeart size={18} />
                Made for our community
              </span>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <span className="float-note note-top">
              <Check size={16} />A little kindness goes a long way
            </span>
            <div className="hero-photo">
              <ItemArt category="Bags & accessories" title="Canvas tote" />
              <span className="photo-check">
                <Check size={24} />
              </span>
            </div>
            <span className="float-note note-bottom">
              <HandHeart size={18} />
              Let’s get it back home.
            </span>
            <span className="spark spark-one">✳</span>
            <span className="spark spark-two">✳</span>
          </div>
        </section>
        <section className="stats" aria-label="Board statistics">
          <div>
            <span className="stat-icon stat-lost">
              <Search size={20} />
            </span>
            <div>
              <strong>{loading || error ? '—' : counts.lost}</strong>
              <span>Looking for their owners</span>
            </div>
          </div>
          <div>
            <span className="stat-icon stat-found">
              <HandHeart size={20} />
            </span>
            <div>
              <strong>{loading || error ? '—' : counts.found}</strong>
              <span>Found &amp; waiting</span>
            </div>
          </div>
          <div>
            <span className="stat-icon stat-returned">
              <CircleCheck size={20} />
            </span>
            <div>
              <strong>{loading || error ? '—' : counts.returned}</strong>
              <span>Happy reunions</span>
            </div>
          </div>
          <p className="stats-note">
            Every item has a story.
            <br />
            <strong>Help it find its next chapter.</strong>
          </p>
        </section>
        <section className="board" aria-labelledby="board-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A COMMUNITY THAT LOOKS OUT FOR EACH OTHER</span>
              <h2 id="board-title">
                {view === 'saved' ? 'Your saved items' : 'Have a look around.'}
              </h2>
            </div>
            <span className="results-count" aria-live="polite">
              {loading
                ? 'Loading items…'
                : `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'} on the board`}
            </span>
          </div>
          <div className="search-row">
            <div className="search-box">
              <Search size={20} />
              <input
                aria-label="Search items"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for an item, description or location…"
              />
              {query && (
                <button
                  className="clear-search"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            <label className="select-wrap">
              <span className="sr-only">Filter by category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>All categories</option>
                {CATEGORIES.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <ChevronDown size={16} />
            </label>
          </div>
          <div className="filter-row">
            <div className="filter-tabs" aria-label="Filter items by report type or status">
              {[
                ['all', 'All items'],
                ['lost', 'Lost'],
                ['found', 'Found'],
                ['returned', 'Returned'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  aria-pressed={type === value}
                  className={type === value ? 'filter-tab selected' : 'filter-tab'}
                  onClick={() => setType(value)}
                >
                  {label}
                  {value === 'all' && <span>{items.length}</span>}
                </button>
              ))}
            </div>
            <label className="sort">
              <span>Sort by</span>
              <select
                aria-label="Sort items"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
              <ChevronDown size={14} />
            </label>
          </div>
          {loading ? (
            <div className="item-grid" aria-label="Loading board">
              {[1, 2, 3].map((x) => (
                <div key={x} className="skeleton" />
              ))}
            </div>
          ) : error ? (
            <div className="empty" role="alert">
              <SearchX size={32} />
              <h3>The board is taking a moment.</h3>
              <p>{error}</p>
              <button className="btn outline" onClick={load}>
                <RotateCcw size={16} />
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty">
              <SearchX size={35} />
              <h3>
                {view === 'saved' ? 'Nothing saved here yet.' : 'No matching items just yet.'}
              </h3>
              <p>
                {view === 'saved'
                  ? 'Save an item using its bookmark button, or adjust your filters.'
                  : 'Try another keyword or category. You can also post an item.'}
              </p>
              <button className="btn outline" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="item-grid">
              {filtered.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  saved={saved.includes(item._id)}
                  onSave={save}
                  onOpen={open}
                />
              ))}
            </div>
          )}
        </section>
        <section className="kindness">
          <span className="kindness-icon">
            <ShieldCheck size={27} />
          </span>
          <div>
            <h3>A good reunion starts with a little care.</h3>
            <p>
              Confirm a unique detail before handing an item over. Meet in a public campus space.
            </p>
          </div>
          <button className="text-btn" onClick={() => setModal('how')}>
            Read our tips
          </button>
        </section>
      </main>
      <footer className="shell footer">
        <span className="brand footer-brand">reunite.</span>
        <p>Less lost. More found. A little more connected.</p>
        <span>Classroom demo · Fictional details only</span>
      </footer>
      {toast && (
        <div className="toast" role="status">
          <Check size={18} />
          {toast}
        </div>
      )}
      {modal === 'report' && (
        <Modal title="Let’s help it find its way." wide onClose={() => setModal(null)}>
          <ReportForm
            onCreated={(item) => {
              setItems([item, ...items]);
              setModal(null);
              setView('board');
              clearFilters();
              setToast('Your item is on the board. Thanks for looking out.');
            }}
          />
        </Modal>
      )}
      {modal === 'how' && (
        <Modal title="A little help goes a long way." onClose={() => setModal(null)}>
          <div className="how-content">
            <div>
              <Search />
              <h3>Have a look around</h3>
              <p>
                Search descriptions and locations. Filter lost or found posts to narrow things down.
              </p>
            </div>
            <div>
              <Plus />
              <h3>Share what you know</h3>
              <p>
                Report an item with a clear description. Keep one identifying detail private so you
                can verify the owner.
              </p>
            </div>
            <div>
              <HandHeart />
              <h3>Make a happy reunion</h3>
              <p>
                Contact the reporter, verify ownership, and meet in a public place. Mark the item
                returned after the handover.
              </p>
            </div>
            <p className="form-note">
              This classroom prototype has no accounts or ownership controls. Anyone with access can
              post and change a status. Use fictional contact details; it is not ready for public
              use.
            </p>
          </div>
        </Modal>
      )}
      {modal === 'detail' && active && (
        <Modal
          title={active.title}
          onClose={() => {
            if (!busy) setModal(null);
          }}
        >
          <div className="detail-art">
            <ItemArt category={active.category} title={active.title} />
            <span className={`badge ${active.status === 'returned' ? 'returned' : active.type}`}>
              {active.status === 'returned'
                ? 'Returned'
                : active.type === 'lost'
                  ? 'Lost'
                  : 'Found'}
            </span>
          </div>
          <div className="detail-content">
            <p className="eyebrow">{active.category}</p>
            <p className="meta">
              <MapPin size={17} />
              {active.location}
            </p>
            <p className="meta">
              <CalendarDays size={17} />
              {formatDate(active.date)}
            </p>
            <p className="description">{active.description}</p>
            <div className="contact-block">
              <span className="eyebrow">CONTACT THE REPORTER</span>
              <a href={`mailto:${active.contact}`}>
                <Mail size={17} />
                {active.contact}
              </a>
              <small>
                Demo contact information. Confirm ownership before arranging a handover.
              </small>
            </div>
            {detailError && (
              <p className="error" role="alert">
                {detailError}
              </p>
            )}
            {active.status === 'returned' ? (
              <p className="returned-note">
                <CircleCheck size={19} />
                This item has made its way home.
              </p>
            ) : confirm ? (
              <div className="confirmation">
                <p>Has this item been handed back to its owner?</p>
                <div>
                  <button className="btn primary" disabled={busy} onClick={markReturned}>
                    {busy ? 'Updating…' : 'Yes, mark as returned'}
                  </button>
                  <button className="btn outline" disabled={busy} onClick={() => setConfirm(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button className="btn primary full" onClick={() => setConfirm(true)}>
                <Check size={18} />
                Mark as returned
              </button>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
