import { useEffect, useRef } from "react";

const skills = [
  { name: "Webdesign a UI/UX design", pct: 95 },
  { name: "Custom Development (React/Node)", pct: 90 },
  { name: "SEO & Konverzní Strategie", pct: 88 },
];

export default function WhyWorkWithMe() {
  return (
    <section id="tech">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-number">03</span>
          <div className="section-label">O mně</div>
          <h2 className="section-title">Proč navázat<br />spolupráci?</h2>
        </div>

        <div className="why-grid reveal">
          <div className="why-main">
            <p className="why-quote">
              Stavím digitální produkty, které{" "}
              <span className="lime">skutečně fungují</span>{" "}
              a prodávají.
            </p>
            <div>
              {skills.map((s) => (
                <div className="skill-row" key={s.name}>
                  <div className="skill-row-header">
                    <span className="skill-row-name">{s.name}</span>
                    <span className="skill-row-pct">{s.pct}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div
                      className="skill-bar-fill"
                      style={{ "--target-width": `${s.pct}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="why-stats">
            <div className="why-stat">
              <div className="why-stat-num">30+</div>
              <div className="why-stat-label">projektů</div>
            </div>
            <div className="why-stat">
              <div className="why-stat-num">3+</div>
              <div className="why-stat-label">roky zkušeností</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
