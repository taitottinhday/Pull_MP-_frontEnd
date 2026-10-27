import { useState } from "react";
import { getOfflineLyricsLibrary } from "../utils/offlineLyrics";

export default function OfflineLyrics() {
  const [songs] = useState(getOfflineLyricsLibrary);
  const [selectedId, setSelectedId] = useState(songs[0]?.songId || "");
  const selected = songs.find((entry) => entry.songId === selectedId);

  return (
    <section className="mx-auto w-full max-w-4xl space-y-5 text-white">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200/65">
          Dùng khi mất mạng
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Lời bài hát offline</h1>
        <p className="mt-2 text-sm text-white/55">
          Lời được tự lưu trên thiết bị mỗi khi bạn mở bài hát lúc có mạng.
        </p>
      </header>

      {!songs.length ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/65">
          Chưa có lời bài hát được lưu. Khi còn mạng, mở bài hát và vào phần lời;
          web sẽ tự lưu để bạn xem lần sau khi offline.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.4fr)]">
          <nav className="space-y-2" aria-label="Bài hát đã lưu offline">
            {songs.map((entry) => {
              const song = entry.song || {};
              return (
                <button
                  key={entry.songId}
                  type="button"
                  onClick={() => setSelectedId(entry.songId)}
                  className={`block w-full rounded-xl border p-3 text-left transition ${
                    selectedId === entry.songId
                      ? "border-emerald-300/30 bg-emerald-300/[0.08]"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="block font-medium">{song.title || "Bài hát"}</span>
                  {song.artist_name ? (
                    <span className="mt-1 block text-sm text-white/50">
                      {song.artist_name}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <article className="max-h-[70vh] overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <h2 className="mb-4 text-lg font-semibold">
              {selected?.song?.title || "Lời bài hát"}
            </h2>
            <div className="space-y-3 text-[1.05rem] leading-8 text-white/85">
              {(selected?.items || []).map((line, index) => (
                <p key={line.id || `${index}-${line.text}`}>{line.text}</p>
              ))}
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
