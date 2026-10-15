import { useRef } from "react";
import { type Location, formatId } from "@/data/mission";

type Props = {
  location: Location | null;
  onIdentify: (id: number) => void;
  onClose: () => void;
};

export default function LocationSheet({ location, onIdentify, onClose }: Props) {
  // 閉じるアニメーション中も直前の地点を表示し続ける
  const last = useRef<Location | null>(null);
  if (location) last.current = location;
  const shown = location ?? last.current;
  const open = location !== null;

  return (
    <>
      <div className={`sheet-backdrop${open ? " is-open" : ""}`} onClick={onClose} aria-hidden="true" />
      <div className={`sheet${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!open} aria-label="候補地点の詳細">
        <div className="sheet__handle" aria-hidden="true" />
        {shown && (
          <>
            <div className="sheet__photo" key={shown.id}>
              {/* 候補地点の画像は MAP 表示時にプリロード済み */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shown.image} alt={`候補地点 ${formatId(shown.id)} ${shown.name}の写真`} />
              <span className="corner corner--tl" />
              <span className="corner corner--tr" />
              <span className="corner corner--bl" />
              <span className="corner corner--br" />
            </div>
            <div className="sheet__meta">
              <span className="sheet__no">
                候補地点 <span className="pixel-en">{formatId(shown.id)}</span>
              </span>
              <h3 className="sheet__name">{shown.name}</h3>
            </div>
            <div className="sheet__actions">
              <button type="button" className="btn btn--lime" onClick={() => onIdentify(shown.id)} tabIndex={open ? 0 : -1}>
                この場所を特定する
              </button>
              <button type="button" className="btn btn--ghost" onClick={onClose} tabIndex={open ? 0 : -1}>
                MAPに戻る
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
