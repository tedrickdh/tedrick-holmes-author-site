import { useEffect, useRef } from "react";

export default function HomeHero({ book }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return undefined;
    }

    function handleMouseMove(event) {
      const rect = hero.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      hero.style.setProperty("--hero-x", x.toFixed(3));
      hero.style.setProperty("--hero-y", y.toFixed(3));
    }

    function resetPosition() {
      hero.style.setProperty("--hero-x", "0");
      hero.style.setProperty("--hero-y", "0");
    }

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", resetPosition);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", resetPosition);
    };
  }, []);

  function scrollToBooks() {
    document.getElementById("featured-work")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section
      ref={heroRef}
      className="hero cinematic-hero"
      aria-labelledby="home-hero-title"
    >
      <div className="hero-stars" aria-hidden="true" />
      <div className="hero-fog" aria-hidden="true" />
      <div className="hero-gradient" aria-hidden="true" />

      <div className="hero-lantern" aria-hidden="true">
        <div className="lantern-wire" />
        <div className="lantern-glow" />
        <div className="lantern-body">🏮</div>
      </div>

      <div className="container hero-grid">
        <div className="hero-copy cinematic-copy">
          <span className="eyebrow">
            Houston • Army Veteran • Educator • Storyteller
          </span>

          <h1 id="home-hero-title">
            Stories Built
            <br />
            From Memory.
          </h1>

          <p>
            Every neighborhood leaves fingerprints. Every family carries
            history. Every generation inherits something.
          </p>

          <div className="button-row">
            <a href="#/books" className="button primary">
              Enter the Story →
            </a>

            <a href="#/about" className="button secondary">
              Meet Tedrick
            </a>
          </div>
        </div>

        <div className="featured-stack hero-featured-book">
          <div className="hero-book-glow" aria-hidden="true" />

          <div className="cover-wrap large">
            <img src={book.cover} alt={`${book.title} cover`} />
          </div>
        </div>
      </div>

      <button
        className="scroll-indicator"
        type="button"
        onClick={scrollToBooks}
        aria-label="Scroll to featured books"
      >
        <span />
        Scroll
      </button>
    </section>
  );
}