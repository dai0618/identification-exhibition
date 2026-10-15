import { CursorIcon, EyeIcon, MagnifierIcon, TargetIcon } from "./PixelIcons";

export default function TopScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="screen screen--top">
      <div className="top-deco" aria-hidden="true">
        <MagnifierIcon className="deco deco--magnifier" />
        <EyeIcon className="deco deco--eye" />
        <TargetIcon className="deco deco--target" />
        <CursorIcon className="deco deco--cursor" />
      </div>

      <div className="top-body">
        <p className="top-kicker pixel-en">WEB EXPERIENCE</p>
        <h1 className="top-title">
          <span>特定して</span>
          <span>みた展</span>
        </h1>
        <div className="top-rule" aria-hidden="true" />
        <p className="top-statement">
          何気なく投稿した一枚から、
          <br />
          どこまで場所は特定できるだろう。
        </p>
        <p className="top-statement">
          写真に残されたヒントを手がかりに、
          <br />
          撮影場所を見つけてみよう。
        </p>
      </div>

      <div className="top-cta">
        <button type="button" className="btn btn--lime btn--xl" onClick={onStart}>
          特定してみる
          <span className="btn__arrow" aria-hidden="true">▶</span>
        </button>
      </div>
    </section>
  );
}
