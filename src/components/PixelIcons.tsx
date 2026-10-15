type PixelArtProps = {
  rows: string[];
  palette: Record<string, string>;
  className?: string;
};

/** 文字列グリッドからドット絵SVGを描く。'.' は透明。 */
export function PixelArt({ rows, palette, className }: PixelArtProps) {
  const w = rows[0].length;
  const h = rows.length;
  const rects: React.ReactElement[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((c, x) => {
      const fill = palette[c];
      if (fill) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />);
    });
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} shapeRendering="crispEdges" aria-hidden="true">
      {rects}
    </svg>
  );
}

const WHITE = "#ffffff";
const LIME = "var(--lime)";
const BLUE = "var(--blue-deep)";

const MAGNIFIER = [
  "...XXXXX.....",
  "..X.....X....",
  ".X..HH...X...",
  "X..H......X..",
  "X..H......X..",
  "X.........X..",
  "X.........X..",
  ".X.......X...",
  "..X.....XX...",
  "...XXXXXLLL..",
  ".........LLL.",
  "..........LLL",
  "...........LL",
];

const EYE = [
  ".....XXXXXXX.....",
  "...XX.......XX...",
  ".XX....LLL....XX.",
  "X.....LBBBL.....X",
  "X....LBBWBBL....X",
  "X.....LBBBL.....X",
  ".XX....LLL....XX.",
  "...XX.......XX...",
  ".....XXXXXXX.....",
];

const CURSOR = [
  "X.........",
  "XX........",
  "XWX.......",
  "XWWX......",
  "XWWWX.....",
  "XWWWWX....",
  "XWWWWWX...",
  "XWWWWWWX..",
  "XWWWWXXXX.",
  "XWXXWX....",
  "XX..XWX...",
  "X...XWX...",
  ".....XX...",
];

const TARGET = [
  "....XXXXX....",
  "..XX.....XX..",
  ".X...XXX...X.",
  ".X..X...X..X.",
  "X..X.....X..X",
  "X..X..L..X..X",
  "X..X.LLL.X..X",
  "X..X..L..X..X",
  "X..X.....X..X",
  ".X..X...X..X.",
  ".X...XXX...X.",
  "..XX.....XX..",
  "....XXXXX....",
];

export function MagnifierIcon({ className }: { className?: string }) {
  return <PixelArt rows={MAGNIFIER} palette={{ X: WHITE, H: WHITE, L: LIME }} className={className} />;
}

export function EyeIcon({ className }: { className?: string }) {
  return <PixelArt rows={EYE} palette={{ X: WHITE, L: LIME, B: BLUE, W: WHITE }} className={className} />;
}

export function CursorIcon({ className }: { className?: string }) {
  return <PixelArt rows={CURSOR} palette={{ X: BLUE, W: WHITE }} className={className} />;
}

export function TargetIcon({ className, color = WHITE }: { className?: string; color?: string }) {
  return <PixelArt rows={TARGET} palette={{ X: color, L: LIME }} className={className} />;
}
