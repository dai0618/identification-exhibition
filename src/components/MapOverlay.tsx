import { LOCATIONS, MISSION } from "@/data/mission";
import { CursorIcon } from "./PixelIcons";

type Props = {
  visitedCount: number;
  onOpenPost: () => void;
  onOpenHints: () => void;
};

/** MAP探索画面の上に重ねるUI（ヘッダーと操作ガイド） */
export default function MapOverlay({ visitedCount, onOpenPost, onOpenHints }: Props) {
  return (
    <div className="map-ui">
      <header className="map-head">
        <div className="map-head__text">
          <span className="badge pixel-en">MISSION {MISSION.number}</span>
          <p className="map-head__q">撮影場所はどこ？</p>
        </div>
        <div className="map-head__tools">
          <button type="button" className="chip" onClick={onOpenPost}>
            投稿
          </button>
          <button type="button" className="chip" onClick={onOpenHints}>
            ヒント
          </button>
        </div>
      </header>

      <div className="map-guide">
        <CursorIcon className="map-guide__icon" />
        <p>
          ポイントをタップして
          <br />
          現地の写真を確認しよう
        </p>
        <span className="map-guide__count pixel-en">
          {visitedCount}/{LOCATIONS.length}
        </span>
      </div>
    </div>
  );
}
