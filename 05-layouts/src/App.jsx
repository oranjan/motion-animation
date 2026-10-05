import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IconX } from "@tabler/icons-react";
import useClickOutside from "./hooks/useClickOutside";
import { artists, regions, songs } from "./songs";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [region, setRegion] = useState("all");
  const [current, setCurrent] = useState(songs[0]);
  const [detailOpen, setDetailOpen] = useState(false);

  const visible =
    region === "all" ? songs : songs.filter((song) => song.region === region);

  return (
    <div className="min-h-screen bg-page font-sans text-white">
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <header>
          <h1 className="text-2xl font-bold">Most streamed</h1>
        </header>

        {/* One long pill; a white indicator slides to the selected button */}
        <div className="mt-6 flex w-full max-w-md rounded-full bg-highlight p-1">
          {regions.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRegion(r.id)}
              aria-pressed={region === r.id}
              // Text colour fades with the same timing and curve as the pill
              className={`relative flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-350 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-2 focus-visible:outline-white ${
                region === r.id ? "text-black" : "text-silver hover:text-white"
              }`}
            >
              {/* Only the selected button renders the pill. They all share one
                  layoutId, so Motion slides it from the old button to the new one */}
              {region === r.id && (
                <motion.span
                  layoutId="region-pill"
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}
              <span className="relative">{r.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4 border-b border-white/10 px-3 pb-2 text-sm text-silver">
          <span className="w-5 text-right">#</span>
          <span className="flex-1">Title</span>
          <span className="hidden w-1/4 md:block">Album</span>
        </div>

        <ol className="mt-3 flex flex-col gap-2">
          {visible.map((song) => (
            <li key={song.id}>
              <SongRow
                song={song}
                playing={song.id === current.id}
                onSelect={() => {
                  setCurrent(song);
                  setDetailOpen(true);
                }}
              />
            </li>
          ))}
        </ol>
      </main>

      {/* Keeps the overlay mounted until its exit animation finishes */}
      <AnimatePresence>
        {detailOpen && (
          <SongDetail
            key={current.id}
            song={current}
            onClose={() => setDetailOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function SongRow({ song, playing, onSelect }) {

  return (
    <motion.button
      layoutId={`card-${song.id}`}
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-4 rounded-lg p-3 text-left focus-visible:outline-2 focus-visible:outline-white ${
        playing ? "bg-highlight" : "bg-surface hover:bg-highlight"
      }`}
    >
      <motion.span
        layout
        className={`w-5 text-right text-sm tabular-nums ${playing ? "text-green" : "text-silver"}`}
      >
        {song.rank}
      </motion.span>

      <motion.div layout className="flex min-w-0 flex-1 items-center gap-3">
        <motion.img
          layoutId={`card--image-${song.id}`}
          src={song.cover.thumb}
          alt={`${song.album} cover`}
          width={56}
          height={56}
          className="size-14 shrink-0 rounded-md object-cover shadow-[0_8px_8px_rgba(0,0,0,0.3)]"
        />
        <motion.div layout className="min-w-0">
          <motion.h2
            layoutId={`card--title-${song.id}`}
            className={`truncate font-bold ${playing ? "text-green" : "text-white"}`}
          >
            {song.title}
          </motion.h2>
          <motion.p
            layoutId={`card--artist-${song.id}`}
          className="mt-0.5 truncate text-sm text-silver">{song.artist}</motion.p>
        </motion.div>
      </motion.div>

      <motion.span
        layoutId={`card--album-${song.id}`}

        className="hidden w-1/4 text-sm text-silver md:block">
        {song.album}
      </motion.span>
    </motion.button>
  );
}

function SongDetail({ song, onClose }) {
  const panel = useRef(null);
  const closeButton = useRef(null);

  useClickOutside(panel, onClose);

  useEffect(() => {
    const opener = document.activeElement;
    closeButton.current.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, []);

  const songArtists = song.artistIds.map((id) => artists[id]);

  return createPortal(
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }    }
      exit={{
        opacity: 0
      }}
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-md">
      <motion.article
        layoutId={`card-${song.id}`}
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${song.title} by ${song.artist}`}
        className="relative flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-lg bg-surface font-sans text-white shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
      >
        <div className="shrink-0 px-6 pt-6">
          <motion.img
            layoutId={`card--image-${song.id}`}
            src={song.cover.large}
            alt={`${song.album} cover`}
            width={1000}
            height={1000}
            className="mx-auto aspect-square w-full max-w-[35dvh] rounded-md object-cover shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Same text styles as the list row */}
        <div className="shrink-0 px-6 pt-4">
          <motion.h2
            layoutId={`card--title-${song.id}`}
            className="truncate font-bold text-white">{song.title}
          </motion.h2>
          <motion.p
            layoutId={`card--artist-${song.id}`}
            className="mt-0.5 truncate text-sm text-silver">{song.artist}</motion.p>
          <motion.p
            layoutId={`card--album-${song.id}`}
            className="mt-0.5 text-sm text-silver">{song.album}</motion.p>
        </div>

        {/* The cover and song info stay put; only the about text scrolls */}
        <section
          aria-labelledby="about-artist"
          className="flex min-h-0 flex-1 flex-col"
        >
          <h3 id="about-artist" className="px-6 pt-6 text-lg font-semibold">
            {songArtists.length > 1 ? "About the artists" : "About the artist"}
          </h3>
          {/* Soft fade at both edges; the padding (pt-4 / pb-14) matches the
              fade sizes so the first and last lines can scroll fully clear */}
          <div className="mt-3 flex min-h-0 flex-col gap-3 overflow-y-auto px-6 pt-4 pb-14 mask-[linear-gradient(to_bottom,transparent,black_16px,black_calc(100%-56px),transparent)]">
            {songArtists.map((artist, i) => (
              <ArtistCard key={artist.name} artist={artist} index={i} />
            ))}
          </div>
        </section>

        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white"
        >
          <IconX size={20} />
        </button>
      </motion.article>
    </motion.div>,
    document.body,
  );
}

function ArtistCard({ artist, index }) {
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0, y: 8 }}
      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      // Same tween as the region pill; cards come in one after another
      transition={{
        duration: 0.45,
        ease: [0.32, 0.72, 0, 1],
        delay: 0.2 + index * 0.08,
      }}
      className="rounded-lg bg-highlight p-4"
    >
      <h4 className="font-bold">{artist.name}</h4>
      <div className="mt-2 space-y-3 text-sm leading-normal text-[#cbcbcb]">
        {artist.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </motion.div>
  );
}
