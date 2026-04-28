import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
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
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
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
          <h2 className="contact-headline">Začněme<br />Váš Projekt</h2>
          <p className="contact-sub">Připraveni na váš další úspěšný web? Napišme mi!</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Jméno *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Vaše jméno"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-input"
                placeholder="vas@email.cz"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Telefon</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+420 123 456 789"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Typ webu</label>
              <select
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
              <label className="form-label">Zpráva *</label>
              <textarea
                className="form-textarea"
                placeholder="Popište váš projekt..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            {submitError && (
              <div className="form-group full" style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
                {submitError}
              </div>
            )}
            
            <div className="form-group full" style={{ textAlign: "center" }}>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Odesílám..." : submitted ? "Odesláno ✓" : "Odeslat Zprávu"}
              </button>
            </div>
          </form>

          <div className="email-copy-block">
            <p className="email-copy-label">Nebo mi napište rovnou:</p>
            <button className="email-copy-link" onClick={copyEmail}>
              f.hirt@seznam.cz
            </button>
            <div className={`copy-toast${copied ? " show" : ""}`}>Email zkopírován ✓</div>
          </div>
        </div>
      </div>
    </section>
  );
}
