import Image from "next/image";
import { SNS_POST } from "@/data/mission";

export function WrongModal({ onBackToMap, onOpenHints }: { onBackToMap: () => void; onOpenHints: () => void }) {
  return (
    <div className="modal-layer" role="alertdialog" aria-modal="true" aria-labelledby="wrong-title">
      <div className="modal modal--wrong">
        <p id="wrong-title" className="glitch wrong-title pixel-en" data-text="NOT FOUND...">
          NOT FOUND...
        </p>
        <p className="wrong-lead">ここではないようです。</p>
        <p className="wrong-sub">もう一度ヒントを見てみよう。</p>
        <div className="modal__actions">
          <button type="button" className="btn btn--lime" onClick={onBackToMap}>
            MAPに戻る
          </button>
          <button type="button" className="btn btn--ghost" onClick={onOpenHints}>
            ヒントを確認する
          </button>
        </div>
      </div>
    </div>
  );
}

export function PostModal({ onClose }: { onClose: () => void }) {
  const { image } = SNS_POST;
  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label="SNS投稿" onClick={onClose}>
      <div className="post-modal" onClick={(e) => e.stopPropagation()}>
        <Image src={image.src} alt="SNSの投稿画像" width={image.width} height={image.height} sizes="(max-width: 480px) 90vw, 400px" />
        <button type="button" className="btn btn--white" onClick={onClose}>
          MAPに戻る
        </button>
      </div>
    </div>
  );
}
