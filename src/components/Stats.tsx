import ScrambleText from "./ScrambleText";

export default function Stats() {
  return (
    <div className="stats-row reveal">
      <div className="stat-item">
        <div className="stat-num">
          <ScrambleText text="30+" trigger="view" duration={70} />
        </div>
        <div className="stat-label">Projektů dokončeno</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">
          <ScrambleText text="3+" trigger="view" duration={70} />
        </div>
        <div className="stat-label">Roky zkušeností</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">
          <ScrambleText text="100%" trigger="view" duration={70} />
        </div>
        <div className="stat-label">Spokojených klientů</div>
      </div>
    </div>
  );
}
