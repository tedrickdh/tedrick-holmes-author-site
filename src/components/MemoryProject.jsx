import { useState } from "react";

const MEMORY_FORM_URL =
  "https://script.google.com/macros/s/AKfycbygIXoS29fUsDhnNVcB5eYQBzstIdu8F0dCTIF3p_R6B246mmcavmFBzH455evmJ6su/exec";

const initialForm = {
  address: "",
  city: "",
  memory: "",
};

export default function MemoryProject() {
  const [form, setForm] = useState(initialForm);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const address = form.address.trim();
    const city = form.city.trim();
    const memory = form.memory.trim();

    if (!address || !city || !memory) {
      setStatus({
        type: "error",
        message: "Please complete all three fields before sharing your story.",
      });

      return;
    }

    if (memory.length < 20) {
      setStatus({
        type: "error",
        message: "Please write at least 20 characters about your memory.",
      });

      return;
    }

    setIsSubmitting(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await fetch(MEMORY_FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          formType: "memory",
          address,
          city,
          memory,
          submittedAt: new Date().toISOString(),
        }),
      });

      const responseText = await response.text();

      let result = {};

      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        result = {
          success: response.ok,
        };
      }

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || "The memory could not be submitted."
        );
      }

      setStatus({
        type: "success",
        message:
          "Thank you for sharing your memory. Your story has been received.",
      });

      setForm(initialForm);
    } catch (error) {
      console.error("Memory submission error:", error);

      setStatus({
        type: "error",
        message:
          "Your memory could not be submitted. Please wait a moment and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="memory-project">
      <div className="memory-overlay" />

      <div className="container memory-content">
        <p className="memory-small reveal">
          EVERYONE HAS A PLACE THEY NEVER FORGET
        </p>

        <h2 className="memory-title reveal">
          What address
          <br />
          still lives
          <br />
          in your memory?
        </h2>

        <p className="memory-text reveal">
          Before there was a book, there was a neighborhood. Before there was
          a neighborhood, there was a child trying to understand the world
          around him.
        </p>

        <form className="memory-card reveal" onSubmit={handleSubmit}>
          <label htmlFor="memory-address">Street Address</label>

          <input
            id="memory-address"
            name="address"
            type="text"
            value={form.address}
            onChange={handleChange}
            placeholder="5619 Aldine Bender Road"
            autoComplete="street-address"
            disabled={isSubmitting}
          />

          <label htmlFor="memory-city">City</label>

          <input
            id="memory-city"
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            placeholder="Houston, Texas"
            autoComplete="address-level2"
            disabled={isSubmitting}
          />

          <label htmlFor="memory-story">One Memory</label>

          <textarea
            id="memory-story"
            name="memory"
            rows="6"
            value={form.memory}
            onChange={handleChange}
            placeholder="Tell me something you will never forget..."
            disabled={isSubmitting}
          />

          {status.message && (
            <p
              className={`memory-status memory-status--${status.type}`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </p>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sharing Your Story..." : "Share Your Story"}
          </button>
        </form>
      </div>
    </section>
  );
}