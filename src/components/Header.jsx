import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    ['Home', '#home'],
    ['Books', '#books'],
    ['About', '#about'],
    ['Journal', '#journal'],
    ['Contact', '#contact']
  ];

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a className="brand" href="#home" aria-label="Tedrick Holmes home">
          <span className="brand-mark">TH</span>
          <span>
            <strong>Tedrick Holmes</strong>
            <small>Author & Storyteller</small>
          </span>
        </a>

        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={open ? 'nav-links open' : 'nav-links'}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href="#newsletter" onClick={() => setOpen(false)}>
            Join the List
          </a>
        </nav>
      </div>
    </header>
  );
}
