export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden>
      <div className="ambient__bg" />
      <div className="ambient__tint" />
      <div className="ambient__grid" />
      <div className="light-rays">
        <span className="ray" />
        <span className="ray" />
        <span className="ray" />
        <span className="ray" />
        <span className="ray" />
      </div>
      <div className="ambient__veil" />
    </div>
  );
}
