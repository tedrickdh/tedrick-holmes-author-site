import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.includes('@')) {
      setMessage('Enter a valid email address.');
      return;
    }
    setMessage('You’re on the list. Watch your inbox for updates.');
    setEmail('');
  }

  return (
    <section className="newsletter" id="newsletter">
      <div className="container newsletter-grid">
        <div>
          <span className="section-kicker">Stay connected</span>
          <h2>Be first to hear what comes next.</h2>
          <p>Get new release news, behind-the-scenes notes, and stories from the road.</p>
        </div>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <label htmlFor="email">Email address</label>
          <div className="input-wrap">
            <Mail size={19} />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit">Subscribe</button>
          </div>
          <small>{message || 'No spam. Just meaningful updates.'}</small>
        </form>
      </div>
    </section>
  );
}
