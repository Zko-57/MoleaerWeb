import type { CSSProperties } from 'react';

function sat(angle: string, orbit: string): CSSProperties {
  return { ['--angle']: angle, ['--orbit']: orbit } as CSSProperties;
}

export function RdVisual() {
  return (
    <div className="rd-system mx-auto">
      <div className="rd-ring rd-ring-1" aria-hidden />
      <div className="rd-ring rd-ring-2" aria-hidden />
      <div className="rd-ring rd-ring-3" aria-hidden />
      <div className="rd-orb" aria-hidden />
      <div className="rd-orbit rd-orbit-1" aria-hidden>
        <span className="rd-sat" style={sat('90deg', '95px')} />
        <span className="rd-sat" style={sat('270deg', '95px')} />
      </div>
      <div className="rd-orbit rd-orbit-2" aria-hidden>
        <span className="rd-sat" style={sat('0deg', '130px')} />
        <span className="rd-sat" style={sat('180deg', '130px')} />
      </div>
      <div className="rd-orbit rd-orbit-3" aria-hidden>
        <span className="rd-sat" style={sat('45deg', '165px')} />
        <span className="rd-sat" style={sat('135deg', '165px')} />
        <span className="rd-sat" style={sat('225deg', '165px')} />
        <span className="rd-sat" style={sat('315deg', '165px')} />
      </div>
    </div>
  );
}
