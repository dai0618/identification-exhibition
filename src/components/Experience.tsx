"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HINTS, LOCATIONS } from "@/data/mission";
import FoundScreen from "./FoundScreen";
import HintScreen from "./HintScreen";
import LocationSheet from "./LocationSheet";
import MapOverlay from "./MapOverlay";
import MapStage from "./MapStage";
import { PostModal, WrongModal } from "./Modals";
import SnsScreen from "./SnsScreen";
import TopScreen from "./TopScreen";

type Screen = "top" | "sns" | "hints" | "map" | "found";

const LEAVE_MS = 450;

export default function Experience() {
  const [screen, setScreen] = useState<Screen>("top");
  const [leaving, setLeaving] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [viewedHints, setViewedHints] = useState<number[]>([]);
  const [visited, setVisited] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [wrongOpen, setWrongOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // 表示したヒントを確認済みにする
  useEffect(() => {
    if (screen !== "hints") return;
    const id = HINTS[hintIndex].id;
    setViewedHints((v) => (v.includes(id) ? v : [...v, id]));
  }, [screen, hintIndex]);

  // 候補地点の写真はタップ後すぐ出せるよう先読みしておく
  useEffect(() => {
    if (screen !== "hints" && screen !== "map") return;
    LOCATIONS.forEach((l) => {
      const img = new Image();
      img.src = l.image;
    });
  }, [screen]);

  const go = useCallback((next: Screen) => {
    window.scrollTo(0, 0);
    setScreen(next);
  }, []);

  const goToMapFromHints = () => {
    setLeaving(true);
    timer.current = window.setTimeout(() => {
      setLeaving(false);
      go("map");
    }, LEAVE_MS);
  };

  const selectLocation = (id: number) => {
    setSelectedId(id);
    setVisited((v) => (v.includes(id) ? v : [...v, id]));
  };

  const identify = (id: number) => {
    const loc = LOCATIONS.find((l) => l.id === id);
    if (!loc) return;
    if (loc.correct) {
      setSelectedId(null);
      go("found");
    } else {
      setSelectedId(null);
      setWrongOpen(true);
    }
  };

  const openHintsFromMap = () => {
    setWrongOpen(false);
    setSelectedId(null);
    setPostOpen(false);
    go("hints");
  };

  const restart = () => {
    setHintIndex(0);
    setViewedHints([]);
    setVisited([]);
    setSelectedId(null);
    setWrongOpen(false);
    setPostOpen(false);
    go("top");
  };

  const showMap = screen === "sns" || screen === "hints" || screen === "map";
  const selected = LOCATIONS.find((l) => l.id === selectedId) ?? null;

  return (
    <main className={`app app--${screen}${leaving ? " is-leaving" : ""}`}>
      {showMap && (
        <MapStage interactive={screen === "map"} selectedId={selectedId} visited={visited} onSelect={selectLocation} />
      )}

      {screen === "top" && <TopScreen onStart={() => go("sns")} />}

      {screen === "sns" && <SnsScreen onNext={() => go("hints")} />}

      {screen === "hints" && (
        <HintScreen
          index={hintIndex}
          viewed={viewedHints}
          leaving={leaving}
          onIndexChange={setHintIndex}
          onToMap={goToMapFromHints}
        />
      )}

      {screen === "map" && (
        <>
          <MapOverlay visitedCount={visited.length} onOpenPost={() => setPostOpen(true)} onOpenHints={openHintsFromMap} />
          <LocationSheet location={selected} onIdentify={identify} onClose={() => setSelectedId(null)} />
          {wrongOpen && <WrongModal onBackToMap={() => setWrongOpen(false)} onOpenHints={openHintsFromMap} />}
          {postOpen && <PostModal onClose={() => setPostOpen(false)} />}
        </>
      )}

      {screen === "found" && <FoundScreen onRestart={restart} />}
    </main>
  );
}
