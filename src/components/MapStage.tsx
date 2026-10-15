import Image from "next/image";
import { LOCATIONS, MAP_IMAGE, formatId } from "@/data/mission";

type Props = {
  /** true: ポイントを表示して操作可能 / false: 背景としてぼかして表示 */
  interactive: boolean;
  selectedId: number | null;
  visited: number[];
  onSelect: (id: number) => void;
};

/**
 * map.png を画面いっぱいに（cover）表示し、同じ座標系の上に候補ポイントを重ねる。
 * SNS → ヒント → MAP の間ずっと同じ要素を使い、背景から主役へ切り替える。
 */
export default function MapStage({ interactive, selectedId, visited, onSelect }: Props) {
  return (
    <div className={`map-viewport ${interactive ? "is-active" : "is-backdrop"}`} aria-hidden={!interactive}>
      <div className="map-stage" style={{ aspectRatio: `${MAP_IMAGE.width} / ${MAP_IMAGE.height}` }}>
        <Image
          src={MAP_IMAGE.src}
          alt="街の地図"
          fill
          priority
          sizes="(max-width: 480px) 130vw, 560px"
          quality={90}
          className="map-image"
        />
        {interactive && (
          <div className="map-points">
            {LOCATIONS.map((loc, i) => {
              const isSelected = loc.id === selectedId;
              const isVisited = visited.includes(loc.id);
              return (
                <button
                  key={loc.id}
                  type="button"
                  className={`map-point${isSelected ? " is-selected" : ""}${isVisited ? " is-visited" : ""}`}
                  style={{ left: `${loc.x}%`, top: `${loc.y}%`, animationDelay: `${200 + i * 70}ms` }}
                  aria-label={`候補地点 ${formatId(loc.id)} を見る`}
                  onClick={() => onSelect(loc.id)}
                >
                  <span className="map-point__ring" />
                  <span className="map-point__dot" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
