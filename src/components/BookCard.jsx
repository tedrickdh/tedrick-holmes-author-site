import { ArrowUpRight } from 'lucide-react';

export default function BookCard({ book }) {
  return (
    <article className="book-card reveal">
      <div className={`book-cover ${book.accent}`}>
        <span className="book-cover-author">TEDRICK HOLMES</span>
        <h3>{book.coverText.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
        <span className="book-cover-tag">A NOVEL</span>
      </div>
      <div className="book-copy">
        <div className="eyebrow-row">
          <span>{book.format}</span>
          <span>{book.status}</span>
        </div>
        <h3>{book.title}</h3>
        <p className="book-subtitle">{book.subtitle}</p>
        <p>{book.description}</p>
        <a href={book.link} className="text-link">
          Get release updates <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  );
}
