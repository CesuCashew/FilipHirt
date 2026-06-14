const items = ["Filip Hirt", "Filip Hirt", "Filip Hirt", "Filip Hirt"];

export default function NameMarquee() {
  return (
    <div className="name-marquee" aria-hidden="true">
      <div className="name-marquee-track">
        {[...items, ...items].map((t, i) => (
          <span className="giant-name" key={i}>{t}&nbsp;—&nbsp;</span>
        ))}
      </div>
    </div>
  );
}
