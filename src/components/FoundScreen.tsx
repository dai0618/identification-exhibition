import Image from "next/image";
import { CLOSING_MESSAGE, HINTS, LOCATIONS, MISSION, SNS_POST, formatId } from "@/data/mission";
import { TargetIcon } from "./PixelIcons";

const BURST_COLS = 9;
const BURST_ROWS = 18;

/** 中心から外側へドットが広がる演出 */
function DotBurst() {
  const cx = (BURST_COLS - 1) / 2;
  const cy = (BURST_ROWS - 1) / 2;
  const cells = [];
  for (let y = 0; y < BURST_ROWS; y++) {
    for (let x = 0; x < BURST_COLS; x++) {
      const d = Math.hypot(x - cx, (y - cy) * 0.9);
      cells.push(
        <span
          key={`${x}-${y}`}
          className={`burst__cell${(x + y) % 3 === 0 ? " is-white" : ""}`}
          style={{ animationDelay: `${Math.round(d * 45)}ms` }}
        />
      );
    }
  }
  return (
    <div className="burst" style={{ gridTemplateColumns: `repeat(${BURST_COLS}, 1fr)` }} aria-hidden="true">
      {cells}
    </div>
  );
}

export default function FoundScreen({ onRestart }: { onRestart: () => void }) {
  const answer = LOCATIONS.find((l) => l.correct)!;
  return (
    <section className="screen screen--found">
      <DotBurst />
      <div className="found-content">
        <p className="found-kicker pixel-en">MISSION {MISSION.number} CLEAR</p>
        <h2 className="glitch found-title pixel-en" data-text="LOCATION FOUND!">
          LOCATION FOUND!
        </h2>
        <p className="found-jp">特定成功！</p>
        <p className="found-lead">撮影場所を特定しました。</p>

        <div className="found-compare">
          <figure>
            <Image src={SNS_POST.image.src} alt="SNSの投稿画像" width={SNS_POST.image.width} height={SNS_POST.image.height} sizes="160px" />
            <figcaption>投稿された写真</figcaption>
          </figure>
          <TargetIcon className="found-compare__mark" />
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={answer.image} alt={`${answer.name}の写真`} />
            <figcaption>
              候補地点 {formatId(answer.id)}
              <br />
              <strong>{answer.name}</strong>
            </figcaption>
          </figure>
        </div>

        <div className="found-hints">
          <p className="found-hints__head pixel-en">USED HINTS</p>
          <ul>
            {HINTS.map((h) => (
              <li key={h.id}>
                <span className="found-hints__no pixel-en">{String(h.id).padStart(2, "0")}</span>
                {h.summary}
              </li>
            ))}
          </ul>
        </div>

        <p className="found-closing">{CLOSING_MESSAGE}</p>

        <button type="button" className="btn btn--lime" onClick={onRestart}>
          最初に戻る
        </button>
      </div>
    </section>
  );
}
