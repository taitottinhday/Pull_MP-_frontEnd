const STORAGE_KEY = "khoaluan:offline-lyrics:v1";

const readAll = () => {
  if (typeof localStorage === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

export const getOfflineLyricsEntry = (songId) => {
  if (!songId) return null;
  const entry = readAll()[String(songId)];
  return Array.isArray(entry?.items) ? entry : null;
};

export const getOfflineLyrics = (songId) =>
  getOfflineLyricsEntry(songId)?.items ?? null;

export const getOfflineLyricsLibrary = () =>
  Object.entries(readAll())
    .filter(([, entry]) => Array.isArray(entry?.items) && entry.items.length)
    .map(([songId, entry]) => ({ songId, ...entry }))
    .sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));

export const saveOfflineLyrics = (songId, items, song = null) => {
  if (!songId || !Array.isArray(items) || !items.length) return false;
  try {
    const all = readAll();
    all[String(songId)] = {
      items,
      song: song ? {
        id: String(songId),
        title: song.title || "Bài hát",
        artist_name: song.artist_name || song.artist || "",
        artists: Array.isArray(song.artists) ? song.artists : [],
        cover_url: song.cover_url || song.cover || song.image || "",
      } : all[String(songId)]?.song || { id: String(songId), title: "Bài hát" },
      savedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return true;
  } catch {
    return false;
  }
};

export const removeOfflineLyrics = (songId) => {
  if (!songId || typeof localStorage === "undefined") return;
  try {
    const all = readAll();
    delete all[String(songId)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // Storage may be unavailable or full.
  }
};
