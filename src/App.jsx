import { useEffect, useMemo, useState } from 'react';
import './styles.css';

const AMAZON_AUTHOR_URL = 'https://www.amazon.com/Tedrick-Holmes/e/B0CHDWZK48';

const books = [
  {
    slug: 'from-kitty-hawk',
    title: 'From Kitty Hawk',
    eyebrow: 'A literary coming-of-age novel',
    status: 'Featured project',
    cover: '/covers/from-kitty-hawk.png',
    fallback: 'FKH',
    summary:
      'A Houston story about memory, family, survival, and the apartment community that helped shape a boy into a man.',
    long:
      'Set in a Houston apartment community, From Kitty Hawk follows Malcolm as he grows up inside a world that is loving, dangerous, funny, and complicated. The story explores the people and places that stay with us long after we leave them behind.',
    themes: ['Coming of age', 'Houston', 'Family', 'Community', 'Memory'],
    buyUrl: AMAZON_AUTHOR_URL,
  },
  {
    slug: 'inheritance-protocol',
    title: 'The Inheritance Protocol',
    eyebrow: 'Speculative fiction',
    status: 'Featured project',
    cover: '/covers/inheritance-protocol.png',
    fallback: 'TIP',
    summary:
      'A science-fiction story about reparations, inheritance, power, and what happens when history becomes enforceable.',
    long:
      'The Inheritance Protocol asks a bold question: what would happen if a future system could calculate what nations, institutions, and families owe? The result is a story about justice, technology, identity, and the cost of receiving what history denied.',
    themes: ['Science fiction', 'Reparations', 'Inheritance', 'Technology', 'Justice'],
    buyUrl: AMAZON_AUTHOR_URL,
  },
  {
    slug: 'our-shades-of-black-history',
    title: 'Our Shades of Black History',
    eyebrow: 'Anthology contribution',
    status: 'Published',
    cover: '/covers/our-shades-of-black-history.png',
    fallback: 'OSBH',
    summary:
      'Individual stories from Black men and women, including Tedrick Holmes’s reflections on perseverance, service, and community.',
    long:
      'This anthology gathers personal accounts from Black contributors who chose to preserve a piece of their history. Tedrick Holmes contributes a story shaped by family, military service, education, leadership, and the communities that helped him keep moving forward.',
    themes: ['Black history', 'Memoir', 'Service', 'Perseverance', 'Community'],
    buyUrl: AMAZON_AUTHOR_URL,
  },
];

const journalPosts = [
  {
    slug: 'places-never-leave-us',
    category: 'Author Notes',
    title: 'Why the places we leave never really leave us',
    excerpt: 'Some neighborhoods become more than a setting. They become a witness, a teacher, and part of the family.',
    body: [
      'Some places never stop living inside us. We remember the sounds, the shortcuts, the people sitting outside, and the rules nobody had to explain.',
      'That is the emotional center of my work. I am interested in what a neighborhood gives us, what it takes from us, and what we carry into adulthood without realizing it.',
      'Writing about place is not just describing buildings. It is writing about memory, pressure, humor, danger, love, and the people who made a difficult place feel like home.',
    ],
  },
  {
    slug: 'screen-to-novel',
    category: 'Behind the Story',
    title: 'From a television idea to a literary novel',
    excerpt: 'The first version of the story was built for the screen. The book gave it room to slow down and breathe.',
    body: [
      'The original idea was visual. I imagined a television story that showed the part of the neighborhood people remembered but rarely saw represented with care.',
      'The novel changed the pace. It allowed me to stay inside a character’s thoughts and let memory work the way it really works: unevenly, emotionally, and with small details that return years later.',
      'The screen version may still come. The book became the foundation that lets the characters, setting, and emotional truth exist on their own first.',
    ],
  },
  {
    slug: 'writing-memory-honestly',
    category: 'Writing Life',
    title: 'Writing memory without cleaning it up',
    excerpt: 'The truth is rarely neat. The work is learning how to tell it with honesty, care, and enough distance to see it clearly.',
    body: [
      'Memory can make us protect people, blame people, or turn hard years into simple stories. Good writing has to resist that temptation.',
      'I want the people in my stories to be fully human. They can be wrong and still loved. They can be funny during painful moments. They can survive something without becoming a symbol.',
      'Honesty does not mean cruelty. It means refusing to flatten real lives into easy heroes and villains.',
    ],
  },
];

function useHashRoute() {
  const getHash = () => window.location.hash.replace(/^#/, '') || '/';
  const [route, setRoute] = useState(getHash);

  useEffect(() => {
    const onChange = () => {
      setRoute(getHash());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

function NavLink({ to, children, onClick }) {
  return <a href={`#${to}`} onClick={onClick}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <NavLink to="/" onClick={close}>
          <span className="brand">
            <span className="brand-mark">TH</span>
            <span><strong>Tedrick Holmes</strong><small>Author & Storyteller</small></span>
          </span>
        </NavLink>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? 'Close' : 'Menu'}</button>
        <nav className={open ? 'nav open' : 'nav'}>
          <NavLink to="/books" onClick={close}>Books</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/journal" onClick={close}>Journal</NavLink>
          <NavLink to="/speaking" onClick={close}>Speaking</NavLink>
          <NavLink to="/media" onClick={close}>Media Kit</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <span className="brand footer-brand"><span className="brand-mark">TH</span><span><strong>Tedrick Holmes</strong><small>Author & Storyteller</small></span></span>
          <p>Stories rooted in truth, memory, service, and possibility.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/journal">Journal</NavLink>
        </div>
        <div>
          <h4>Connect</h4>
          <NavLink to="/speaking">Speaking</NavLink>
          <NavLink to="/media">Media Kit</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div>
          <h4>Find the books</h4>
          <a href={AMAZON_AUTHOR_URL} target="_blank" rel="noreferrer">Amazon Author Page ↗</a>
        </div>
      </div>
      <div className="container copyright">© {new Date().getFullYear()} Tedrick Holmes. All rights reserved.</div>
    </footer>
  );
}

function CoverImage({ book, large = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`cover-wrap ${large ? 'large' : ''}`}>
      {!failed ? (
        <img src={book.cover} alt={`${book.title} cover`} onError={() => setFailed(true)} />
      ) : (
        <div className="cover-fallback"><span>{book.fallback}</span><small>{book.title}</small></div>
      )}
    </div>
  );
}

function BookCard({ book }) {
  return (
    <article
  className="book-card"
  onMouseMove={(e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }}
>
      <CoverImage book={book} />
      <div className="book-card-copy">
        <span className="eyebrow">{book.status}</span>
        <h3>{book.title}</h3>
        <p>{book.summary}</p>
        <div className="card-actions">
          <NavLink to={`/books/${book.slug}`}><span className="text-link">Book details →</span></NavLink>
          <a href={book.buyUrl} target="_blank" rel="noreferrer">Amazon ↗</a>
        </div>
      </div>
    </article>
  );
}
function ScrollAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Houston-born writer • Army veteran • Educator</span>
            <h1>Stories about what we inherit, what we survive, and who we become.</h1>
            <p>Tedrick Holmes writes fiction and personal narratives rooted in family, memory, community, history, and the complicated places people call home.</p>
            <div className="button-row">
              <NavLink to="/books"><span className="button primary">Explore the books →</span></NavLink>
              <NavLink to="/about"><span className="button secondary">Meet Tedrick</span></NavLink>
            </div>
          </div>
          <div className="featured-stack">
            <CoverImage book={books[0]} large />
            <div className="floating-quote">“The places that shape us deserve to be remembered honestly.”</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading kicker="Featured work" title="Books and stories by Tedrick Holmes" text="Literary fiction, speculative storytelling, and personal history grounded in real emotion and lived experience." />
          <div className="books-grid">{books.map(book => <BookCard key={book.slug} book={book} />)}</div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container split-grid">
          <div><span className="eyebrow">About the author</span><h2>Writing from the intersection of memory, service, education, and community.</h2></div>
          <div><p>A Houston native and retired Army veteran, Tedrick brings decades of leadership, education, technology, and community experience to his writing.</p><NavLink to="/about"><span className="text-link light">Read the full biography →</span></NavLink></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading kicker="From the journal" title="Notes on writing, memory, and the work" />
          <div className="journal-grid">{journalPosts.map(post => <JournalCard key={post.slug} post={post} />)}</div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

function SectionHeading({ kicker, title, text }) {
  return <div className="section-heading"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}

function BooksPage() {
  return (
    <PageShell kicker="The books" title="Stories built from memory, history, imagination, and lived experience." intro="Explore Tedrick Holmes’s featured fiction, speculative work, and published anthology contribution.">
      <div className="books-grid">{books.map(book => <BookCard key={book.slug} book={book} />)}</div>
    </PageShell>
  );
}

function BookPage({ slug }) {
  const book = books.find(item => item.slug === slug);
  if (!book) return <NotFound />;
  return (
    <main>
      <section className="page-hero book-detail-hero">
        <div className="container book-detail-grid">
          <CoverImage book={book} large />
          <div>
            <span className="eyebrow">{book.eyebrow}</span>
            <h1>{book.title}</h1>
            <p className="lead">{book.long}</p>
            <div className="tag-list">{book.themes.map(theme => <span key={theme}>{theme}</span>)}</div>
            <div className="button-row"><a className="button primary" href={book.buyUrl} target="_blank" rel="noreferrer">View on Amazon ↗</a><NavLink to="/contact"><span className="button secondary">Media or rights inquiry</span></NavLink></div>
          </div>
        </div>
      </section>
      <section className="section"><div className="container narrow"><span className="eyebrow">About the work</span><h2>What this story explores</h2><p>{book.summary}</p><p>Updates, release information, appearances, and related material can be added to this page as the project develops.</p></div></section>
    </main>
  );
}

function AboutPage() {
  return (
    <PageShell
      kicker="About Tedrick"
      title="A writer shaped by Houston, military service, education, leadership, and family."
      intro="Tedrick Holmes writes with a broad view of how systems, neighborhoods, and personal choices shape ordinary lives."
    >
      <div className="about-layout reveal">
        <div className="portrait-panel">
          <img
            src="/images/tedrick-holmes.jpg"
            alt="Tedrick Holmes"
            className="portrait-image"
          />

          <div className="author-social-section">
            <h3 className="social-title">Connect With Tedrick</h3>

            <p className="social-subtitle">
              Follow my writing journey, upcoming releases, and behind-the-scenes
              updates.
            </p>

            <div className="author-social-links">
              <a
                href="https://www.facebook.com/tedrickdholmes"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
              >
                Facebook
              </a>

              <a href="/books" className="social-button">
                Books
              </a>

              <a href="/journal" className="social-button">
                Journal
              </a>

              <a href="/contact" className="social-button">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="prose">
          <h2>Biography</h2>

          <p>
            Tedrick Holmes is a Houston-born author, retired U.S. Army veteran,
            educator, technology professional, and entrepreneur. His work draws
            from a life spent moving between neighborhoods, military
            installations, classrooms, leadership roles, and community-centered
            projects.
          </p>

          <p>
            His writing explores family, race, responsibility, survival,
            justice, memory, and the lasting influence of place. He is
            especially interested in characters whose lives are often reduced
            to stereotypes but contain far more humor, intelligence, conflict,
            tenderness, and possibility.
          </p>

          <p>
            Across literary fiction, speculative fiction, and personal
            narrative, Tedrick writes stories that ask readers to look again—at
            a neighborhood, a family, a historical debt, or a person they
            thought they understood.
          </p>

          <h3>Selected background</h3>

          <ul>
            <li>Houston native</li>
            <li>Retired U.S. Army noncommissioned officer</li>
            <li>Educator and education leader</li>
            <li>Technology and operations professional</li>
            <li>Entrepreneur and community advocate</li>
            <li>
              Contributor to <em>Our Shades of Black History</em>
            </li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}

function JournalCard({ post }) {
  return <article className="journal-card"><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><NavLink to={`/journal/${post.slug}`}><span className="text-link">Read the note →</span></NavLink></article>;
}

function JournalPage() {
  return <PageShell kicker="Journal" title="Notes on writing, memory, history, and the work." intro="Behind-the-story reflections and updates from Tedrick Holmes."><div className="journal-grid">{journalPosts.map(post => <JournalCard key={post.slug} post={post} />)}</div></PageShell>;
}

function JournalPostPage({ slug }) {
  const post = journalPosts.find(item => item.slug === slug);
  if (!post) return <NotFound />;
  return <PageShell kicker={post.category} title={post.title} intro={post.excerpt}><article className="article-body">{post.body.map((p, i) => <p key={i}>{p}</p>)}</article></PageShell>;
}

function SpeakingPage() {
  const topics = ['From military leadership to education and authorship','Writing place, memory, and community with honesty','Black stories beyond stereotypes','Technology, justice, and speculative fiction','Leadership, resilience, and reinvention'];
  return <PageShell kicker="Speaking" title="Conversations that connect story, leadership, service, and community." intro="Tedrick is available for schools, universities, veteran groups, community events, panels, podcasts, and literary conversations."><div className="split-grid light-split"><div><h2>Possible topics</h2><ul className="topic-list">{topics.map(t => <li key={t}>{t}</li>)}</ul></div><div className="inquiry-card"><h3>Invite Tedrick</h3><p>Share your event date, audience, location, format, and what you want attendees to take away.</p><NavLink to="/contact"><span className="button primary">Start a speaking inquiry →</span></NavLink></div></div></PageShell>;
}

function MediaPage() {
  return <PageShell kicker="Media kit" title="Resources for interviews, events, booksellers, and media." intro="This page gives partners a fast place to find approved author information and promotional assets."><div className="media-grid"><MediaCard title="Short biography" text="Tedrick Holmes is a Houston-born author, retired Army veteran, educator, and entrepreneur whose writing explores memory, family, justice, community, and the lasting influence of place." /><MediaCard title="Interview topics" text="Houston and place-based storytelling; military service; education leadership; Black history; reparations and speculative fiction; turning lived experience into story." /><MediaCard title="Assets to add" text="Professional headshots, high-resolution book covers, event introduction, speaker sheet, press releases, and downloadable biography files." /></div><div className="callout"><h2>Media or interview request</h2><p>Use the contact page and select “Media or interview.”</p><NavLink to="/contact"><span className="button primary">Contact Tedrick →</span></NavLink></div></PageShell>;
}

function MediaCard({ title, text }) { return <div className="media-card"><h3>{title}</h3><p>{text}</p></div>; }

function ContactPage() {
  const [sent, setSent] = useState(false);
  return <PageShell kicker="Contact" title="Let’s start a conversation." intro="For interviews, speaking requests, book events, media, publishing, film rights, or general questions, use the form below."><div className="contact-layout"><form className="contact-form" onSubmit={e => { e.preventDefault(); setSent(true); }}><div className="field-row"><label>Name<input required name="name" /></label><label>Email<input required type="email" name="email" /></label></div><label>Reason<select name="reason" defaultValue="General inquiry"><option>General inquiry</option><option>Speaking request</option><option>Book event</option><option>Media or interview</option><option>Rights or publishing</option></select></label><label>Message<textarea required rows="7" name="message" /></label><button className="button primary" type="submit">Send message</button>{sent && <p className="form-note">The design works. Connect this form to Resend or Formspree before publishing so it can deliver messages.</p>}</form><aside className="contact-aside"><h3>Before publishing</h3><p>Replace placeholder social links, connect the form, add your author photo, and add exact book purchase links.</p><a href={AMAZON_AUTHOR_URL} target="_blank" rel="noreferrer">Visit Amazon author page ↗</a></aside></div></PageShell>;
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  return <section className="newsletter"><div className="container newsletter-grid"><div><span className="eyebrow">Author updates</span><h2>Follow the stories as they grow.</h2><p>Book news, behind-the-scenes notes, events, and occasional essays.</p></div><form onSubmit={e => {e.preventDefault(); setJoined(true); setEmail('');}}><input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" /><button type="submit">Join the list →</button>{joined && <small>Signup captured in the demo. Connect a newsletter provider before launch.</small>}</form></div></section>;
}

function PageShell({ kicker, title, intro, children }) {
  return <main><section className="page-hero"><div className="container narrow"><span className="eyebrow">{kicker}</span><h1>{title}</h1>{intro && <p className="lead">{intro}</p>}</div></section><section className="section"><div className="container">{children}</div></section></main>;
}

function NotFound() { return <PageShell kicker="404" title="That page could not be found." intro="Use the navigation to return to the site."><NavLink to="/"><span className="button primary">Return home</span></NavLink></PageShell>; }

function AppRouter() {
  const route = useHashRoute();
  const page = useMemo(() => {
    if (route === '/') return <HomePage />;
    if (route === '/books') return <BooksPage />;
    if (route.startsWith('/books/')) return <BookPage slug={route.split('/')[2]} />;
    if (route === '/about') return <AboutPage />;
    if (route === '/journal') return <JournalPage />;
    if (route.startsWith('/journal/')) return <JournalPostPage slug={route.split('/')[2]} />;
    if (route === '/speaking') return <SpeakingPage />;
    if (route === '/media') return <MediaPage />;
    if (route === '/contact') return <ContactPage />;
    return <NotFound />;
  }, [route]);
  return (
  <>
    <ScrollAnimations />
    <Header />
    {page}
    <Footer />
  </>
);
}

export default function App() { return <AppRouter />; }
