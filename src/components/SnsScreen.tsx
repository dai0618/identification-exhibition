import Image from "next/image";
import { MISSION, SNS_POST } from "@/data/mission";
import { EyeIcon, TargetIcon } from "./PixelIcons";

export default function SnsScreen({ onNext }: { onNext: () => void }) {
  const { image, targets } = SNS_POST;
  return (
    <section className="screen screen--sns">
      <header className="mission-head">
        <span className="badge pixel-en">MISSION {MISSION.number}</span>
        <h2 className="mission-title">{MISSION.title}</h2>
      </header>

      <div className="sns-card">
        <div className="sns-card__inner">
          <Image
            src={image.src}
            alt="SNSの投稿画像"
            width={image.width}
            height={image.height}
            priority
            sizes="(max-width: 480px) 90vw, 400px"
            className="sns-card__img"
          />
          {targets.map((t, i) => (
            <span
              key={i}
              className="blink-target"
              style={{ left: `${t.x}%`, top: `${t.y}%`, animationDelay: `${700 + i * 250}ms` }}
              aria-hidden="true"
            >
              <TargetIcon color="var(--lime)" />
            </span>
          ))}
        </div>
      </div>

      <div className="instruction">
        <EyeIcon className="instruction__icon" />
        <div>
          <p>
            写真の中には、
            <br />
            場所につながるヒントが隠れています。
          </p>
          <p className="instruction__strong">気になるところを見てみよう。</p>
        </div>
      </div>

      <div className="sticky-cta">
        <button type="button" className="btn btn--lime" onClick={onNext}>
          ヒントを見る
          <span className="btn__arrow" aria-hidden="true">▶</span>
        </button>
      </div>
    </section>
  );
}
