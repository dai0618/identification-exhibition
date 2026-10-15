import Image from "next/image";
import { useRef, useState } from "react";
import { HINTS, MISSION } from "@/data/mission";
import { MagnifierIcon } from "./PixelIcons";

type Props = {
  index: number;
  viewed: number[];
  leaving: boolean;
  onIndexChange: (index: number) => void;
  onToMap: () => void;
};

export default function HintScreen({ index, viewed, leaving, onIndexChange, onToMap }: Props) {
  const hint = HINTS[index];
  const allViewed = HINTS.every((h) => viewed.includes(h.id));
  const isLast = index === HINTS.length - 1;
  const [zoomed, setZoomed] = useState(false);
  const touchX = useRef<number | null>(null);

  const goTo = (next: number) => {
    if (next < 0 || next >= HINTS.length) return;
    setZoomed(false);
    onIndexChange(next);
  };

  return (
    <section className={`screen screen--hints${leaving ? " is-leaving" : ""}`}>
      <header className="hint-head">
        <span className="badge pixel-en">MISSION {MISSION.number}</span>
        <div className="hint-progress" aria-label={`ヒント ${viewed.length} / ${HINTS.length} 確認済み`}>
          {HINTS.map((h, i) => (
            <button
              key={h.id}
              type="button"
              className={`hint-progress__cell${viewed.includes(h.id) ? " is-viewed" : ""}${i === index ? " is-current" : ""}`}
              onClick={() => goTo(i)}
              aria-label={h.label}
            >
              <span className="pixel-en">{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </header>

      <article
        key={hint.id}
        className="hint-card"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) goTo(index + (dx < 0 ? 1 : -1));
        }}
      >
        <p className="hint-card__label pixel-en">{hint.label}</p>
        <div
          className={`hint-image${hint.zoom ? " is-zoomable" : ""}${zoomed ? " is-zoomed" : ""}`}
          onClick={hint.zoom ? () => setZoomed((z) => !z) : undefined}
          role={hint.zoom ? "button" : undefined}
          aria-label={hint.zoom ? hint.zoom.caption : undefined}
        >
          <Image
            src={hint.image}
            alt={hint.title}
            width={627}
            height={627}
            priority
            sizes="(max-width: 480px) 90vw, 400px"
            style={
              hint.zoom
                ? {
                    transformOrigin: `${hint.zoom.x}% ${hint.zoom.y}%`,
                    transform: zoomed ? `scale(${hint.zoom.scale})` : undefined,
                  }
                : undefined
            }
          />
          <span className="corner corner--tl" />
          <span className="corner corner--tr" />
          <span className="corner corner--bl" />
          <span className="corner corner--br" />
          {hint.zoom && (
            <span className="zoom-tip">
              <MagnifierIcon className="zoom-tip__icon" />
              {zoomed ? "タップで戻す" : hint.zoom.caption}
            </span>
          )}
        </div>
        <h3 className="hint-card__title">{hint.title}</h3>
        <p className="hint-card__desc">{hint.description}</p>
        <ul className="clue-list" aria-label="手がかり">
          {hint.clues.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </article>

      <div className="hint-nav">
        <button type="button" className="nav-arrow" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="前のヒント">
          ◀
        </button>
        <span className="hint-nav__count pixel-en">
          {index + 1} / {HINTS.length}
        </span>
        <button type="button" className="nav-arrow" onClick={() => goTo(index + 1)} disabled={isLast} aria-label="次のヒント">
          ▶
        </button>
      </div>

      <div className="sticky-cta">
        {allViewed ? (
          <button type="button" className="btn btn--lime btn--pop" onClick={onToMap}>
            MAPで特定する
            <span className="btn__arrow" aria-hidden="true">▶</span>
          </button>
        ) : (
          <button type="button" className="btn btn--white" onClick={() => goTo(index + 1)}>
            次のヒントへ
            <span className="btn__arrow" aria-hidden="true">▶</span>
          </button>
        )}
      </div>
    </section>
  );
}
