import { useState } from "react";
import { Link } from "wouter";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    website: "", // honeypot — skryté pole, lidé ho nevidí, boti ho vyplní
  });
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("f.hirt@seznam.cz").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const response = await fetch('/.netlify/functions/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: "", email: "", phone: "", service: "", message: "", website: "" });
      } else {
        setSubmitError(result.error || "Něco se pokazilo. Zkuste to prosím znovu.");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError("Chyba připojení. Zkontrolujte internet a zkuste to znovu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-number">06</span>
        </div>
        <div className="contact-inner reveal">
          <h2 className="contact-headline">Pojďme spolu<br />něco <span className="it">postavit</span></h2>
          <p className="contact-sub">Máte nápad, web k oživení, nebo jen chuť to probrat? Napište pár vět — ozvu se obvykle do dne.</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Honeypot proti spam botům — vizuálně i pro čtečky skryté */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
              <label htmlFor="field-website">Nevyplňujte</label>
              <input
                id="field-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="field-name" className="form-label">Jméno *</label>
              <input
                id="field-name"
                type="text"
                className="form-input"
                placeholder="Vaše jméno"
                required
                maxLength={200}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="field-email" className="form-label">Email *</label>
              <input
                id="field-email"
                type="email"
                className="form-input"
                placeholder="vas@email.cz"
                required
                maxLength={255}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="field-phone" className="form-label">Telefon</label>
              <input
                id="field-phone"
                type="tel"
                className="form-input"
                placeholder="+420 123 456 789"
                maxLength={50}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="field-service" className="form-label">Typ webu</label>
              <select
                id="field-service"
                className="form-select"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="">Vyberte službu...</option>
                <option value="smart-web">Chytrý Web s AI</option>
                <option value="eshop">Online Obchod</option>
                <option value="restaurant">Web pro Restauraci</option>
                <option value="corporate">Firemní Prezentace</option>
                <option value="other">Jiné</option>
              </select>
            </div>
            <div className="form-group full">
              <label htmlFor="field-message" className="form-label">Zpráva *</label>
              <textarea
                id="field-message"
                className="form-textarea"
                placeholder="Popište váš projekt..."
                required
                maxLength={5000}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            {submitError && (
              <div role="alert" className="form-group full form-error-banner">
                {submitError}
              </div>
            )}

            <div className="form-group full" style={{ textAlign: "center" }}>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Odesílám..." : submitted ? "Odesláno ✓" : "Odeslat Zprávu"}
              </button>
              <p className="form-privacy-note">
                Odesláním souhlasíte se zpracováním údajů podle{" "}
                <Link href="/soukromi">zásad ochrany osobních údajů</Link>.
              </p>
            </div>
          </form>

          <div className="email-copy-block">
            <p className="email-copy-label">Nebo mi napište rovnou:</p>
            <button
              className="email-copy-link"
              onClick={copyEmail}
              aria-label="Kopírovat emailovou adresu do schránky"
            >
              f.hirt@seznam.cz
            </button>
            <div className={`copy-toast${copied ? " show" : ""}`}>Email zkopírován ✓</div>
          </div>
        </div>
      </div>
    </section>
  );
}
