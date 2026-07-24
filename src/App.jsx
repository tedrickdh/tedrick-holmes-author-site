import { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';
import HomeHero from "./components/HomeHero";
import MemoryProject from "./components/MemoryProject";

const AMAZON_AUTHOR_URL = 'https://www.amazon.com/Tedrick-Holmes/e/B0CHDWZK48';
const GOOGLE_FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbygIXoS29fUsDhnNVcB5eYQBzstIdu8F0dCTIF3p_R6B246mmcavmFBzH455evmJ6su/exec";

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
  const [scrolled, setScrolled] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}
    >
      <div className="container nav-shell">
        <NavLink to="/" onClick={close}>
          <span className="brand">
            <span className="brand-mark">TH</span>

            <span className="brand-copy">
              <strong>Tedrick Holmes</strong>
              <small>Author · Educator · Veteran</small>
            </span>
          </span>
        </NavLink>

        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className={open ? "nav open" : "nav"}>
          <NavLink to="/books" onClick={close}>
            Books
          </NavLink>

          <NavLink to="/journal" onClick={close}>
            Journal
          </NavLink>

          <NavLink to="/about" onClick={close}>
            About
          </NavLink>

          <NavLink to="/speaking" onClick={close}>
            Speaking
          </NavLink>

          <NavLink to="/media" onClick={close}>
            Media
          </NavLink>

          <NavLink to="/contact" onClick={close}>
            Contact
          </NavLink>
        </nav>

        <NavLink to="/books/from-kitty-hawk" onClick={close}>
          <span className="header-project-link">
            <small>Featured story</small>
            <strong>From Kitty Hawk →</strong>
          </span>
        </NavLink>
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
function LanternIcon() {
  return (
    <svg
      className="lantern-svg"
      viewBox="0 0 180 260"
      role="img"
      aria-label="Glowing lantern"
    >
      <defs>
        <radialGradient id="lanternLight" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#fff8d2" />
          <stop offset="45%" stopColor="#f7c56a" />
          <stop offset="100%" stopColor="#b86726" />
        </radialGradient>

        <linearGradient id="lanternFrame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7f522f" />
          <stop offset="50%" stopColor="#25160f" />
          <stop offset="100%" stopColor="#93623a" />
        </linearGradient>

        <filter id="lanternGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        className="lantern-handle"
        d="M52 65C52 17 128 17 128 65"
        fill="none"
        stroke="url(#lanternFrame)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <path
        d="M49 66H131L143 94H37L49 66Z"
        fill="url(#lanternFrame)"
      />

      <rect
        x="42"
        y="91"
        width="96"
        height="116"
        rx="18"
        fill="#180f0c"
        stroke="#7a4d2e"
        strokeWidth="7"
      />

      <rect
        className="lantern-light"
        x="57"
        y="106"
        width="66"
        height="86"
        rx="20"
        fill="url(#lanternLight)"
        filter="url(#lanternGlow)"
      />

      <path
        d="M37 205H143L132 230H48L37 205Z"
        fill="url(#lanternFrame)"
      />

      <rect
        x="77"
        y="228"
        width="26"
        height="14"
        rx="5"
        fill="#25160f"
      />

      <path
        d="M48 96L60 204M132 96L120 204"
        stroke="#8e5b35"
        strokeWidth="5"
        opacity="0.8"
      />
    </svg>
  );
}

function CinematicHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const rect = hero.getBoundingClientRect();

      const relativeX = (event.clientX - rect.left) / rect.width;
      const relativeY = (event.clientY - rect.top) / rect.height;

      const x = (relativeX - 0.5) * 2;
      const y = (relativeY - 0.5) * 2;

      hero.style.setProperty("--pointer-x", x.toFixed(3));
      hero.style.setProperty("--pointer-y", y.toFixed(3));
    };

    const resetPointer = () => {
      hero.style.setProperty("--pointer-x", "0");
      hero.style.setProperty("--pointer-y", "0");
    };

    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", resetPointer);

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  const scrollToStories = () => {
    document
      .getElementById("featured-work")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={heroRef}
      className="hero cinematic-hero"
      aria-labelledby="home-hero-title"
    >
      <div className="hero-sky" aria-hidden="true" />
      <div className="hero-stars hero-stars-far" aria-hidden="true" />
      <div className="hero-stars hero-stars-near" aria-hidden="true" />

      <div className="hero-horizon" aria-hidden="true">
        <div className="horizon-building building-one" />
        <div className="horizon-building building-two" />
        <div className="horizon-building building-three" />
        <div className="horizon-building building-four" />
        <div className="horizon-building building-five" />
      </div>

      <div className="hero-fog fog-back" aria-hidden="true" />
      <div className="hero-fog fog-front" aria-hidden="true" />
      <div className="hero-gradient" aria-hidden="true" />

      <div className="hero-lantern" aria-hidden="true">
        <div className="lantern-aura" />
        <div className="lantern-swing">
          <LanternIcon />
        </div>
      </div>

      <div className="container hero-grid cinematic-hero-grid">
        <div className="hero-copy cinematic-copy">
          <span className="eyebrow hero-eyebrow">
            Houston-born writer · Army veteran · Educator
          </span>

          <h1 id="home-hero-title">
            Stories built
            <span>from memory.</span>
          </h1>

          <p>
            Every neighborhood leaves fingerprints. Every family carries
            history. Every generation inherits something.
          </p>

          <div className="button-row">
            <NavLink to="/books">
              <span className="button primary">Enter the stories →</span>
            </NavLink>

            <NavLink to="/about">
              <span className="button secondary hero-secondary-button">
                Meet Tedrick
              </span>
            </NavLink>
          </div>
        </div>

        <div className="featured-stack cinematic-book hero-featured-book">
          <div className="book-light" aria-hidden="true" />

          <CoverImage book={books[0]} large />

          <div className="floating-quote">
            “The places that shape us deserve to be remembered honestly.”
          </div>
        </div>
      </div>

      <button
        className="scroll-indicator"
        type="button"
        onClick={scrollToStories}
        aria-label="Scroll to featured books"
      >
        <span className="scroll-line" />
        <span className="scroll-label">Discover</span>
      </button>
    </section>
  );
}
function StoryQuote() {
  return (
    <section className="story-quote reveal" aria-label="Author quote">
      <div className="story-quote-glow" aria-hidden="true" />

      <div className="container story-quote-inner">
        <span className="story-quote-mark" aria-hidden="true">
          “
        </span>

        <blockquote>
          The places we leave
          <span>never really leave us.</span>
        </blockquote>

        <p>— Tedrick Holmes</p>
      </div>
    </section>
  );
}
function FeaturedBook() {
  const book = books[0];

  return (
    <section className="featured-bookcase reveal">
      <div className="container featured-book-layout">

        <div className="featured-book-cover">
          <CoverImage book={book} large />
        </div>

        <div className="featured-book-copy">

          <span className="eyebrow">
            Featured Novel
          </span>

          <h2>{book.title}</h2>

          <p className="lead">
            {book.long}
          </p>

          <div className="tag-list">
            {book.themes.map(theme => (
              <span key={theme}>{theme}</span>
            ))}
          </div>

          <div className="button-row">

            <NavLink to={`/books/${book.slug}`}>
              <span className="button primary">
                Explore the Story →
              </span>
            </NavLink>

            <a
              href={book.buyUrl}
              target="_blank"
              rel="noreferrer"
              className="button secondary"
            >
              Amazon ↗
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
function AuthorJourney() {
  const milestones = [
    {
      number: "01",
      title: "Houston",
      text: "Born and shaped by the neighborhoods, families, humor, pressure, and possibility of Houston.",
    },
    {
      number: "02",
      title: "Army",
      text: "Twenty years of military service built a foundation of leadership, responsibility, resilience, and service.",
    },
    {
      number: "03",
      title: "Technology",
      text: "A career managing systems, operations, infrastructure, teams, and complex organizational challenges.",
    },
    {
      number: "04",
      title: "Education",
      text: "Bringing leadership and systems thinking into schools, classrooms, and community-centered work.",
    },
    {
      number: "05",
      title: "Author",
      text: "Writing stories about memory, history, justice, family, place, and the lives people too often misunderstand.",
    },
  ];

  return (
    <section className="author-journey">
      <div className="container">
        <div className="author-journey-heading reveal">
          <span className="eyebrow">The journey</span>

          <h2>
            Every chapter shaped
            <span>the stories that followed.</span>
          </h2>

          <p>
            Tedrick Holmes writes from a life lived across neighborhoods,
            military installations, technology systems, classrooms, leadership
            roles, and community work.
          </p>
        </div>

        <div className="journey-track">
          <div className="journey-line" aria-hidden="true" />

          {milestones.map((milestone) => (
            <article className="journey-stop reveal" key={milestone.title}>
              <div className="journey-marker">
                <span>{milestone.number}</span>
              </div>

              <div className="journey-copy">
                <h3>{milestone.title}</h3>
                <p>{milestone.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="journey-action reveal">
          <NavLink to="/about">
            <span className="button secondary">
              Read the full biography →
            </span>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
function HomePage() {
  return (
    <>
     <HomeHero book={books[0]} />

<StoryQuote />

<section className="section" id="featured-work">
        <div className="container">
          <FeaturedBook />

<SectionHeading
    kicker="More Stories"
    title="Explore the collection"
/>

<div className="books-grid">
    {books.slice(1).map(book => (
        <BookCard
            key={book.slug}
            book={book}
        />
    ))}
</div>
        </div>
      </section>

      <AuthorJourney />

      <section className="section">
        <div className="container">
          <MemoryProject />
          <SectionHeading
            kicker="From the journal"
            title="Notes on writing, memory, and the work"
          />

          <div className="journal-grid">
            {journalPosts.map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
          </div>
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
  const highlights = [
    {
      number: '20',
      label: 'Years of military service',
    },
    {
      number: 'Houston',
      label: 'Born, raised, and shaped',
    },
    {
      number: 'Author',
      label: 'Fiction and personal narrative',
    },
    {
      number: 'Leader',
      label: 'Education, technology, and operations',
    },
  ];

  const journey = [
    {
      title: 'Military service',
      text:
        'Tedrick served in the United States Army, where he developed his approach to leadership, technology, responsibility, and service.',
    },
    {
      title: 'Technology and operations',
      text:
        'His professional career has included large-scale technology systems, organizational operations, project leadership, and team development.',
    },
    {
      title: 'Education',
      text:
        'He later brought those experiences into education, working at the intersection of teaching, leadership, systems, and student opportunity.',
    },
    {
      title: 'Writing',
      text:
        'His books explore family, memory, community, justice, inheritance, resilience, and the people whose stories are often oversimplified.',
    },
  ];

  return (
    <PageShell
      kicker="About Tedrick"
      title="A writer shaped by Houston, military service, education, leadership, and family."
      intro="Tedrick Holmes writes with a broad view of how systems, neighborhoods, history, and personal choices shape ordinary lives."
    >
      <section className="about-feature reveal">
        <div className="about-feature-image">
          <img
            src="/images/tedrick-holmes.jpg"
            alt="Tedrick Holmes"
            className="portrait-image"
          />

          <div className="about-image-caption">
            <span>Houston, Texas</span>
            <p>
              Author, educator, Army veteran, technology leader, and
              entrepreneur.
            </p>
          </div>
        </div>

        <div className="about-feature-copy prose">
          <span className="eyebrow">Biography</span>

          <h2>Stories informed by a life spent moving between worlds.</h2>

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

          <div className="button-row">
            <NavLink to="/books">
              <span className="button primary">Explore the books →</span>
            </NavLink>

            <NavLink to="/contact">
              <span className="button secondary">Contact Tedrick</span>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="about-highlights reveal">
        {highlights.map((item) => (
          <div className="about-highlight" key={item.label}>
            <strong>{item.number}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="about-journey reveal">
        <div className="section-heading">
          <div>
            <span className="eyebrow">The journey</span>
            <h2>Experience across service, systems, classrooms, and stories.</h2>
          </div>

          <p>
            Each stage of Tedrick&apos;s career has shaped the way he
            approaches leadership, character, community, and storytelling.
          </p>
        </div>

        <div className="about-journey-grid">
          {journey.map((item, index) => (
            <article className="about-journey-card" key={item.title}>
              <span className="about-card-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-quote reveal">
        <span className="eyebrow">A guiding idea</span>

        <blockquote>
          “The places we come from do not define our limits. They define our
          foundation.”
        </blockquote>
      </section>

      <section className="split-grid light-split about-bottom reveal">
        <div>
          <span className="eyebrow">Selected background</span>
          <h2>Leadership grounded in lived experience.</h2>

          <ul className="topic-list">
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

        <div className="inquiry-card">
          <span className="eyebrow">Connect</span>
          <h3>Speaking, interviews, schools, and book conversations</h3>

          <p>
            Tedrick is available for literary discussions, veteran and
            leadership events, schools, universities, podcasts, panels, and
            community conversations.
          </p>

          <NavLink to="/contact">
            <span className="button primary">
              Start a conversation →
            </span>
          </NavLink>
        </div>
      </section>
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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const reason = String(form.get("reason") || "General inquiry").trim();
    const message = String(form.get("message") || "").trim();

    setSending(true);
    setSent(false);
    setError("");

    try {
      if (message.length < 5) {
        throw new Error("Please enter a complete message.");
      }

      const body = new URLSearchParams({
        name,
        email,
        reason,
        message,
        source: "tedrickholmes.com",
      });

      const response = await fetch(GOOGLE_FORM_ENDPOINT, {
        method: "POST",
        body,
      });

      const responseText = await response.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("Google returned an unreadable response.");
      }

      if (!data.success) {
        throw new Error(data.message || "Your message could not be sent.");
      }

      formElement.reset();
      setSent(true);
    } catch (err) {
      console.error("Contact form error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Your message could not be sent. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <PageShell
      kicker="Contact"
      title="Let’s start a conversation."
      intro="For interviews, speaking requests, book events, media, publishing, film rights, or general questions, use the form below."
    >
      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="field-row">
            <label>
              Name
              <input required name="name" />
            </label>

            <label>
              Email
              <input required type="email" name="email" />
            </label>
          </div>

          <label>
            Reason
            <select name="reason" defaultValue="General inquiry">
              <option>General inquiry</option>
              <option>Speaking request</option>
              <option>Book event</option>
              <option>Media or interview</option>
              <option>Rights or publishing</option>
            </select>
          </label>

          <label>
            Message
            <textarea required minLength={5} rows={7} name="message" />
          </label>

          <button
            className="button primary"
            type="submit"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send message"}
          </button>

          {sent && (
            <p className="form-note" role="status">
              Thank you. Your message has been sent successfully.
            </p>
          )}

          {error && (
            <p className="form-note" role="alert">
              {error}
            </p>
          )}
        </form>

        <aside className="contact-aside">
          <h3>Get in touch</h3>
          <p>
            Use this form for interviews, speaking engagements, book events,
            publishing inquiries, and general questions.
          </p>

          <a
            href={AMAZON_AUTHOR_URL}
            target="_blank"
            rel="noreferrer"
          >
            Visit Amazon author page ↗
          </a>
        </aside>
      </div>
    </PageShell>
  );
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
