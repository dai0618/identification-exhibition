// ミッションに関するデータはすべてここで一元管理する。
// 座標は map.png の左上を (0%, 0%)、右下を (100%, 100%) とした割合。

export type Location = {
  id: number;
  name: string;
  x: number;
  y: number;
  image: string;
  correct: boolean;
};

export type Hint = {
  id: number;
  label: string;
  title: string;
  description: string;
  clues: string[];
  /** 正解画面で表示する短いまとめ */
  summary: string;
  image: string;
  /** タップでズームできる場合のズーム中心 (%) */
  zoom?: { x: number; y: number; scale: number; caption: string };
};

export type ImageAsset = { src: string; width: number; height: number };

const ASSET_DIR = "/assets";

export const MAP_IMAGE: ImageAsset = {
  src: `${ASSET_DIR}/map.png`,
  width: 941,
  height: 1672,
};

export const SNS_POST = {
  image: {
    src: `${ASSET_DIR}/SNS.png`,
    width: 1088,
    height: 1446,
  } satisfies ImageAsset,
  /** 投稿表示直後に点滅させるターゲット位置 (SNS.png に対する %) */
  targets: [
    { x: 91, y: 17 }, // 背景の高層ビル
    { x: 52, y: 27.5 }, // 瞳
    { x: 52, y: 81 }, // 投稿文
  ],
};

export const MISSION = {
  number: "#01",
  title: "この投稿が撮影された場所を\n特定せよ。",
};

export const HINTS: Hint[] = [
  {
    id: 1,
    label: "HINT 01",
    title: "背景の景色",
    description: "背景には、緑が多く開けた場所が写っている。",
    clues: ["木々", "遊歩道", "少し見える高層ビル"],
    summary: "自然が多く開けた場所",
    image: `${ASSET_DIR}/01_background_scene.png`,
  },
  {
    id: 2,
    label: "HINT 02",
    title: "瞳の映り込み",
    description: "瞳をよく見ると、\n青いアーチ橋が映り込んでいる。",
    clues: ["青いアーチ橋", "水辺の手すり", "街灯"],
    summary: "瞳に映った青いアーチ橋",
    image: `${ASSET_DIR}/02_eye_reflection.png`,
    zoom: { x: 60, y: 57, scale: 2.4, caption: "瞳をタップしてズーム" },
  },
  {
    id: 3,
    label: "HINT 03",
    title: "投稿文",
    description: "「駅から少し歩いてみたら」\nという投稿文も手がかりになる。",
    clues: ["駅の近く", "歩いて行ける距離"],
    summary: "駅から少し歩いたという投稿文",
    image: `${ASSET_DIR}/03_post_text.png`,
  },
];

// ※ 地点番号と画像ファイル番号は一部ズレている（6↔7）。
export const LOCATIONS: Location[] = [
  { id: 1, name: "川沿い", x: 28.6, y: 31.2, image: `${ASSET_DIR}/01_riverfront.png`, correct: true },
  { id: 2, name: "駅前", x: 52.0, y: 45.0, image: `${ASSET_DIR}/02_station.png`, correct: false },
  { id: 3, name: "商店街", x: 40.8, y: 51.5, image: `${ASSET_DIR}/03_shopping_street.png`, correct: false },
  { id: 4, name: "住宅街", x: 87.6, y: 16.1, image: `${ASSET_DIR}/04_residential.png`, correct: false },
  { id: 5, name: "公園", x: 73.3, y: 17.4, image: `${ASSET_DIR}/05_park.png`, correct: false },
  { id: 6, name: "高架下", x: 23.0, y: 67.6, image: `${ASSET_DIR}/07_underpass.png`, correct: false },
  { id: 7, name: "学校", x: 32.7, y: 19.9, image: `${ASSET_DIR}/06_school.png`, correct: false },
  { id: 8, name: "オフィス街", x: 75.0, y: 60.8, image: `${ASSET_DIR}/08_office_district.png`, correct: false },
  { id: 9, name: "坂道", x: 77.9, y: 83.3, image: `${ASSET_DIR}/09_hillside.png`, correct: false },
  { id: 10, name: "コンビニ周辺", x: 65.0, y: 49.7, image: `${ASSET_DIR}/10_convenience_store.png`, correct: false },
];

export const CLOSING_MESSAGE =
  "何気ない一枚でも、\n複数の情報を組み合わせることで、\n撮影場所が特定できることがあります。";

export const formatId = (id: number) => String(id).padStart(2, "0");
