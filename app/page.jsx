'use client';
import { useState, useEffect, useRef } from 'react';

const NAMES = [
  { ar: 'الرَّحْمَنُ',     tr: 'Ar-Rahmān',      en: 'The Most Gracious' },
  { ar: 'الرَّحِيمُ',     tr: 'Ar-Rahīm',       en: 'The Most Merciful' },
  { ar: 'الْمَلِكُ',      tr: 'Al-Malik',        en: 'The King' },
  { ar: 'الْقُدُّوسُ',   tr: 'Al-Quddūs',      en: 'The Most Holy' },
  { ar: 'السَّلَامُ',     tr: 'As-Salām',        en: 'The Source of Peace' },
  { ar: 'الْمُؤْمِنُ',   tr: "Al-Mu'min",       en: 'The Granter of Security' },
  { ar: 'الْمُهَيْمِنُ', tr: 'Al-Muhaymin',     en: 'The Protector' },
  { ar: 'الْعَزِيزُ',    tr: "Al-'Azīz",        en: 'The Almighty' },
  { ar: 'الْجَبَّارُ',   tr: 'Al-Jabbār',       en: 'The Compeller' },
  { ar: 'الْمُتَكَبِّرُ',tr: 'Al-Mutakabbir',   en: 'The Supreme' },
  { ar: 'الْخَالِقُ',    tr: 'Al-Khāliq',       en: 'The Creator' },
  { ar: 'الْبَارِئُ',    tr: "Al-Bāri'",        en: 'The Originator' },
  { ar: 'الْمُصَوِّرُ',  tr: 'Al-Musawwir',     en: 'The Fashioner' },
  { ar: 'الْغَفَّارُ',   tr: 'Al-Ghaffār',      en: 'The Ever-Forgiving' },
  { ar: 'الْقَهَّارُ',   tr: 'Al-Qahhār',       en: 'The Subduer' },
  { ar: 'الْوَهَّابُ',   tr: 'Al-Wahhāb',       en: 'The Bestower' },
  { ar: 'الرَّزَّاقُ',   tr: 'Ar-Razzāq',       en: 'The Provider' },
  { ar: 'الْفَتَّاحُ',   tr: 'Al-Fattāh',       en: 'The Opener' },
  { ar: 'الْعَلِيمُ',    tr: "Al-'Alīm",        en: 'The All-Knowing' },
  { ar: 'الْقَابِضُ',    tr: 'Al-Qābid',        en: 'The Withholder' },
  { ar: 'الْبَاسِطُ',    tr: 'Al-Bāsit',        en: 'The Extender' },
  { ar: 'الْخَافِضُ',    tr: 'Al-Khāfid',       en: 'The Abaser' },
  { ar: 'الرَّافِعُ',    tr: "Ar-Rāfi'",        en: 'The Exalter' },
  { ar: 'الْمُعِزُّ',    tr: "Al-Mu'izz",       en: 'The Honourer' },
  { ar: 'الْمُذِلُّ',    tr: 'Al-Mudhill',      en: 'The Humiliator' },
  { ar: 'السَّمِيعُ',    tr: "As-Samī'",        en: 'The All-Hearing' },
  { ar: 'الْبَصِيرُ',    tr: 'Al-Basīr',        en: 'The All-Seeing' },
  { ar: 'الْحَكَمُ',     tr: 'Al-Hakam',        en: 'The Judge' },
  { ar: 'الْعَدْلُ',     tr: "Al-'Adl",         en: 'The Just' },
  { ar: 'اللَّطِيفُ',    tr: 'Al-Latīf',        en: 'The Subtle One' },
  { ar: 'الْخَبِيرُ',    tr: 'Al-Khabīr',       en: 'The All-Aware' },
  { ar: 'الْحَلِيمُ',    tr: 'Al-Halīm',        en: 'The Forbearing' },
  { ar: 'الْعَظِيمُ',    tr: "Al-'Azīm",        en: 'The Magnificent' },
  { ar: 'الْغَفُورُ',    tr: 'Al-Ghafūr',       en: 'The All-Forgiving' },
  { ar: 'الشَّكُورُ',    tr: 'Ash-Shakūr',      en: 'The Appreciative' },
  { ar: 'الْعَلِيُّ',    tr: "Al-'Alī",         en: 'The Most High' },
  { ar: 'الْكَبِيرُ',    tr: 'Al-Kabīr',        en: 'The Most Great' },
  { ar: 'الْحَفِيظُ',    tr: 'Al-Hafīz',        en: 'The Preserver' },
  { ar: 'الْمُقِيتُ',    tr: 'Al-Muqīt',        en: 'The Nourisher' },
  { ar: 'الْحَسِيبُ',    tr: 'Al-Hasīb',        en: 'The Reckoner' },
  { ar: 'الْجَلِيلُ',    tr: 'Al-Jalīl',        en: 'The Majestic' },
  { ar: 'الْكَرِيمُ',    tr: 'Al-Karīm',        en: 'The Most Generous' },
  { ar: 'الرَّقِيبُ',    tr: 'Ar-Raqīb',        en: 'The Watchful' },
  { ar: 'الْمُجِيبُ',    tr: 'Al-Mujīb',        en: 'The Responsive' },
  { ar: "الْوَاسِعُ",    tr: "Al-Wāsi'",        en: 'The All-Encompassing' },
  { ar: 'الْحَكِيمُ',    tr: 'Al-Hakīm',        en: 'The Most Wise' },
  { ar: 'الْوَدُودُ',    tr: 'Al-Wadūd',        en: 'The Most Loving' },
  { ar: 'الْمَجِيدُ',    tr: 'Al-Majīd',        en: 'The Most Glorious' },
  { ar: 'الْبَاعِثُ',    tr: "Al-Bā'ith",       en: 'The Resurrector' },
  { ar: 'الشَّهِيدُ',    tr: 'Ash-Shahīd',      en: 'The Witness' },
  { ar: 'الْحَقُّ',      tr: 'Al-Haqq',         en: 'The Truth' },
  { ar: 'الْوَكِيلُ',    tr: 'Al-Wakīl',        en: 'The Trustee' },
  { ar: 'الْقَوِيُّ',    tr: 'Al-Qawī',         en: 'The Most Strong' },
  { ar: 'الْمَتِينُ',    tr: 'Al-Matīn',        en: 'The Firm' },
  { ar: 'الْوَلِيُّ',    tr: 'Al-Walī',         en: 'The Protecting Friend' },
  { ar: 'الْحَمِيدُ',    tr: 'Al-Hamīd',        en: 'The Praiseworthy' },
  { ar: 'الْمُحْصِي',    tr: 'Al-Muhsī',        en: 'The Counter' },
  { ar: 'الْمُبْدِئُ',   tr: "Al-Mubdi'",       en: 'The Originator' },
  { ar: 'الْمُعِيدُ',    tr: "Al-Mu'īd",        en: 'The Restorer' },
  { ar: 'الْمُحْيِي',    tr: 'Al-Muhyī',        en: 'The Giver of Life' },
  { ar: 'الْمُمِيتُ',    tr: 'Al-Mumīt',        en: 'The Taker of Life' },
  { ar: 'الْحَيُّ',      tr: 'Al-Hayy',         en: 'The Ever-Living' },
  { ar: 'الْقَيُّومُ',   tr: 'Al-Qayyūm',       en: 'The Self-Subsisting' },
  { ar: 'الْوَاجِدُ',    tr: 'Al-Wājid',        en: 'The Perceiver' },
  { ar: 'الْمَاجِدُ',    tr: 'Al-Mājid',        en: 'The Illustrious' },
  { ar: 'الْوَاحِدُ',    tr: 'Al-Wāhid',        en: 'The One' },
  { ar: 'الْأَحَدُ',     tr: 'Al-Ahad',         en: 'The Unique' },
  { ar: 'الصَّمَدُ',     tr: 'As-Samad',        en: 'The Eternal' },
  { ar: 'الْقَادِرُ',    tr: 'Al-Qādir',        en: 'The Omnipotent' },
  { ar: 'الْمُقْتَدِرُ', tr: 'Al-Muqtadir',     en: 'The Powerful' },
  { ar: 'الْمُقَدِّمُ',  tr: 'Al-Muqaddim',     en: 'The Expediter' },
  { ar: 'الْمُؤَخِّرُ',  tr: "Al-Mu'akhkhir",   en: 'The Delayer' },
  { ar: 'الْأَوَّلُ',    tr: 'Al-Awwal',        en: 'The First' },
  { ar: 'الْآخِرُ',      tr: 'Al-Ākhir',        en: 'The Last' },
  { ar: 'الظَّاهِرُ',    tr: 'Az-Zāhir',        en: 'The Manifest' },
  { ar: 'الْبَاطِنُ',    tr: 'Al-Bātin',        en: 'The Hidden' },
  { ar: 'الْوَالِي',     tr: 'Al-Wālī',         en: 'The Governor' },
  { ar: 'الْمُتَعَالِي', tr: "Al-Muta'āli",     en: 'The Most Exalted' },
  { ar: 'الْبَرُّ',      tr: 'Al-Barr',         en: 'The Source of Goodness' },
  { ar: 'التَّوَّابُ',   tr: 'At-Tawwāb',       en: 'The Ever-Relenting' },
  { ar: 'الْمُنْتَقِمُ', tr: 'Al-Muntaqim',     en: 'The Avenger' },
  { ar: 'الْعَفُوُّ',    tr: "Al-'Afuww",       en: 'The Pardoner' },
  { ar: 'الرَّؤُوفُ',    tr: "Ar-Ra'ūf",        en: 'The Most Kind' },
  { ar: 'مَالِكُ الْمُلْكِ', tr: 'Mālik-ul-Mulk', en: 'The Owner of All Sovereignty' },
  { ar: 'ذُو الْجَلَالِ', tr: 'Dhul-Jalāl',     en: 'Lord of Majesty & Bounty' },
  { ar: 'الْمُقْسِطُ',   tr: 'Al-Muqsit',       en: 'The Equitable' },
  { ar: "الْجَامِعُ",    tr: "Al-Jāmi'",        en: 'The Gatherer' },
  { ar: 'الْغَنِيُّ',    tr: 'Al-Ghanī',        en: 'The Self-Sufficient' },
  { ar: 'الْمُغْنِي',    tr: 'Al-Mughnī',       en: 'The Enricher' },
  { ar: "الْمَانِعُ",    tr: "Al-Māni'",        en: 'The Preventer' },
  { ar: 'الضَّارُّ',     tr: 'Ad-Dārr',         en: 'The Distresser' },
  { ar: "النَّافِعُ",    tr: "An-Nāfi'",        en: 'The Propitious' },
  { ar: 'النُّورُ',      tr: 'An-Nūr',          en: 'The Light' },
  { ar: 'الْهَادِي',     tr: 'Al-Hādī',         en: 'The Guide' },
  { ar: "الْبَدِيعُ",    tr: "Al-Badī'",        en: 'The Incomparable' },
  { ar: 'الْبَاقِي',     tr: 'Al-Bāqī',         en: 'The Everlasting' },
  { ar: 'الْوَارِثُ',    tr: 'Al-Wārith',       en: 'The Inheritor' },
  { ar: 'الرَّشِيدُ',    tr: 'Ar-Rashīd',       en: 'The Guide to the Right Path' },
  { ar: 'الصَّبُورُ',    tr: 'As-Sabūr',        en: 'The Patient' },
];

export default function Home() {
  const [posted, setPosted]             = useState(44);
  const [isAdmin, setIsAdmin]           = useState(false);
  const [gridOpen, setGridOpen]         = useState(false);
  const [activeIdx, setActiveIdx]       = useState(null);
  const [pendingIdx, setPendingIdx]     = useState(null);
  const [sessionPw, setSessionPw]       = useState('');
  const [loginOpen, setLoginOpen]       = useState(false);
  const [namePopupOpen, setNamePopup]   = useState(false);
  const [confirmOpen, setConfirmOpen]   = useState(false);
  const [pwInput, setPwInput]           = useState('');
  const [pwError, setPwError]           = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [saveLoading, setSaveLoading]   = useState(false);
  const [toast, setToast]               = useState({ msg: '', type: '', show: false });

  const toastTimer = useRef(null);

  // Load count from API on mount
  useEffect(() => {
    fetch('/api/progress')
      .then(r => r.json())
      .then(d => { if (d.posted) setPosted(d.posted); })
      .catch(() => {});
  }, []);

  // Toggle admin-mode class on body
  useEffect(() => {
    document.body.classList.toggle('admin-mode', isAdmin);
  }, [isAdmin]);

  // Escape key closes any open modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setLoginOpen(false); setNamePopup(false); setConfirmOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ── helpers ── */
  function showToast(msg, type = '') {
    setToast({ msg, type, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 3500);
  }

  const pct = ((posted / 99) * 100).toFixed(1);

  /* ── login ── */
  async function doLogin() {
    const pw = pwInput.trim();
    if (!pw) return;
    setLoginLoading(true); setPwError('');
    try {
      const r = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw, posted }),
      });
      if (r.status === 401) throw new Error('Incorrect password.');
      if (!r.ok) throw new Error('Server error.');
      setSessionPw(pw); setIsAdmin(true);
      setLoginOpen(false); setGridOpen(true); setPwInput('');
    } catch (err) {
      setPwError(err.message); setPwInput('');
    } finally {
      setLoginLoading(false);
    }
  }

  function logout() { setIsAdmin(false); setSessionPw(''); }

  /* ── name management ── */
  function openName(i) { setActiveIdx(i); setNamePopup(true); }

  function confirmSet() {
    setPendingIdx(activeIdx); setNamePopup(false); setConfirmOpen(true);
  }

  async function applySet() {
    if (pendingIdx === null) return;
    setSaveLoading(true);
    try {
      const r = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: sessionPw, posted: pendingIdx + 1 }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Failed');
      setPosted(d.posted);
      setConfirmOpen(false);
      if (!gridOpen) setGridOpen(true);
      showToast(`✦ Updated to name ${d.posted} — ${NAMES[d.posted - 1].tr}`, 'success');
      setTimeout(() => {
        document.getElementById('cell-' + pendingIdx)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setPendingIdx(null);
      }, 300);
    } catch (err) {
      setConfirmOpen(false);
      showToast('Error: ' + err.message);
      setPendingIdx(null);
    } finally {
      setSaveLoading(false);
    }
  }

  const active  = activeIdx  !== null ? NAMES[activeIdx]  : null;
  const pending = pendingIdx !== null ? NAMES[pendingIdx] : null;

  return (
    <>
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="page">

        {/* ── HERO ── */}
        <div className="hero">
          <p className="bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <div className="avatar-wrap">
            <div className="avatar-ring" />
            <div className="avatar-inner">PD</div>
          </div>
          <h1 className="hero-name">Pure Deen</h1>
          <p className="hero-handle">@pureedeenn_</p>
          <p className="hero-tagline">Growing in Deen together.</p>
        </div>

        {/* ── SOCIALS ── */}
        <p className="section-label fade-1">Find me on</p>
        <div className="links-section fade-1">
          <a className="link-btn" href="https://instagram.com/pureedeenn_" target="_blank" rel="noreferrer">
            <div className="link-btn-left">
              <div className="link-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </div>
              <div><div className="link-label">Instagram</div><div className="link-sub">@pureedeenn_</div></div>
            </div>
            <span className="link-arrow">›</span>
          </a>

          <a className="link-btn" href="#" target="_blank" rel="noreferrer">
            <div className="link-btn-left">
              <div className="link-icon">
                <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </div>
              <div><div className="link-label">YouTube</div><div className="link-sub">Coming soon</div></div>
            </div>
            <span className="link-arrow">›</span>
          </a>
        </div>

        <div className="divider fade-2" />

        {/* ── 99 NAMES SERIES ── */}
        <p className="section-label fade-2">Currently Running</p>

        {isAdmin && (
          <div className="admin-bar">
            <div className="admin-bar-left">
              <div className="admin-dot" />
              <div className="admin-bar-text">Admin — <strong>tap any name</strong> to set as current</div>
            </div>
            <button className="admin-logout" onClick={logout}>Log out</button>
          </div>
        )}

        <div className="series-card fade-2">
          <div className="series-top">
            <div>
              <div className="series-arabic">أسماء الله الحسنى</div>
              <div className="series-title-en">99 Names of Allah</div>
            </div>
            <div className="series-badge">Active</div>
          </div>

          <div className="progress-row">
            <span className="progress-label">PROGRESS</span>
            <span className="progress-num">{posted} <span>/ 99</span></span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <p className="progress-hint">{Math.round(pct)}% complete · Updated regularly</p>

          <button className="toggle-btn" onClick={() => setGridOpen(o => !o)}>
            {gridOpen ? 'Hide names' : 'View all 99 names'}&nbsp;&nbsp;
            <span className={`chevron${gridOpen ? ' open' : ''}`}>▾</span>
          </button>

          <div className={`names-grid-wrap${gridOpen ? ' open' : ''}`}>
            <div className="names-grid">
              {NAMES.map((n, i) => {
                const num = i + 1;
                const isLatest = num === posted;
                const isDone   = num < posted;
                return (
                  <div
                    key={i}
                    id={`cell-${i}`}
                    className={`name-cell${isDone ? ' done' : ''}${isLatest ? ' latest' : ''}`}
                    onClick={() => openName(i)}
                  >
                    <span className="tick">{isLatest ? '★' : '✓'}</span>
                    <div className="admin-hover">Set current</div>
                    <span className="cell-ar">{n.ar}</span>
                    <span className="cell-num">{String(num).padStart(2, '0')}</span>
                    <span className="cell-en">{n.tr}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="divider fade-3" />

        {/* ── COLLAB ── */}
        <p className="section-label fade-3">Work With Me</p>
        <div className="collab-card fade-3">
          <h2 className="collab-heading">Let&apos;s grow<br />together</h2>
          <p className="collab-text">
            Interested in collaborations, brand partnerships, or reposts?<br />
            All inquiries welcome — reach out on Instagram.
          </p>
          <div className="tags-row">
            <span className="tag">Brand Collaborations</span>
            <span className="tag">Reposts</span>
            <span className="tag">Partnerships</span>
            <span className="tag">Deen Projects</span>
          </div>
          <a className="collab-btn" href="https://instagram.com/pureedeenn_" target="_blank" rel="noreferrer">
            DM on Instagram
          </a>
        </div>

        {/* ── FOOTER ── */}
        <div className="footer fade-4">
          <p className="footer-text">
            © 2025 Pure Deen · Built by{' '}
            <a href="https://zeta-labs.dev" target="_blank" rel="noreferrer">ZetaLabs</a>
            {' '}·{' '}
            <button className="admin-link" onClick={() => { setPwInput(''); setPwError(''); setLoginOpen(true); }}>
              Admin
            </button>
          </p>
        </div>
      </div>

      {/* ══ LOGIN MODAL ══ */}
      <div className={`modal-overlay${loginOpen ? ' show' : ''}`} onClick={e => e.target === e.currentTarget && setLoginOpen(false)}>
        <div className="modal">
          <button className="modal-close" onClick={() => setLoginOpen(false)}>✕</button>
          <div className="modal-icon">🔐</div>
          <h2 className="modal-title">Admin Login</h2>
          <p className="modal-sub">Enter your password to manage the 99 Names series.</p>
          <input
            className="pw-input"
            type="password"
            placeholder="Password"
            value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doLogin()}
            autoFocus={loginOpen}
          />
          <div className="pw-error">{pwError}</div>
          <button className="modal-btn" onClick={doLogin} disabled={loginLoading}>
            {loginLoading ? 'Checking…' : 'Sign In'}
          </button>
        </div>
      </div>

      {/* ══ NAME DETAIL POPUP ══ */}
      <div className={`modal-overlay name-popup${namePopupOpen ? ' show' : ''}`} onClick={e => e.target === e.currentTarget && setNamePopup(false)}>
        <div className="modal">
          <button className="modal-close" onClick={() => setNamePopup(false)}>✕</button>
          {active && (
            <>
              <p className="popup-num">Name {String(activeIdx + 1).padStart(2, '0')} of 99</p>
              <div className="popup-ar">{active.ar}</div>
              <div className="popup-trans">{active.tr}</div>
              <div className="popup-meaning">{active.en}</div>
              <div className={`popup-status${(activeIdx + 1) <= posted ? ' done' : ' pending'}`}>
                {activeIdx + 1 === posted ? '★ Latest post' : (activeIdx + 1) < posted ? '✓ Posted' : 'Coming soon'}
              </div>
              <button className="popup-admin-btn" onClick={confirmSet}>✦ Set as current name</button>
            </>
          )}
        </div>
      </div>

      {/* ══ CONFIRM MODAL ══ */}
      <div className={`modal-overlay confirm-modal${confirmOpen ? ' show' : ''}`} onClick={e => e.target === e.currentTarget && setConfirmOpen(false)}>
        <div className="modal">
          <div className="modal-icon">✦</div>
          <h2 className="modal-title">Set name {pendingIdx !== null ? pendingIdx + 1 : ''} as current?</h2>
          {pending && (
            <p className="modal-sub">
              <span style={{ fontFamily: "'Noto Naskh Arabic', serif", fontSize: 22, color: 'var(--gold)' }}>{pending.ar}</span>
              <br />
              <span style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>{pending.tr}</span>
              <br /><br />
              Names 1–{pendingIdx + 1} will be marked as posted.
            </p>
          )}
          <button className="modal-btn" onClick={applySet} disabled={saveLoading}>
            {saveLoading ? 'Saving…' : 'Yes, update'}
          </button>
          <button className="modal-btn-ghost" onClick={() => setConfirmOpen(false)}>Cancel</button>
        </div>
      </div>

      {/* ══ TOAST ══ */}
      <div className={`toast${toast.show ? ' show' : ''}${toast.type ? ` ${toast.type}` : ''}`}>
        {toast.msg}
      </div>
    </>
  );
}
