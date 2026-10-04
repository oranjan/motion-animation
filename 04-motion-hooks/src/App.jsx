import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { createPortal } from "react-dom";
import {
  IconArrowUp,
  IconCamera,
  IconMapPin,
  IconMaximize,
  IconX,
} from "@tabler/icons-react";
import { mountains, panoramas } from "./mountains";

const formatMeters = (m) => `${m.toLocaleString("en-IN")} m`;
const mapSearch = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
// Section backgrounds, blended through as each section scrolls past
const backgrounds = ["#e9ecef", "#f8f9fa", "#dee2e6"]// light grey → whitish → greyer; all keep text at 4.5:1 or better
const slug = (name) => name.toLowerCase().replace(/\s+/g, "-");
const peaksWithCards = new Set(mountains.map((m) => m.name));

// "2015-09-16T12:08" → "16 Sep 2015, 12:08"; date-only and year-only pass through
const formatTakenAt = (value) => {
  if (!value || /^\d{4}$/.test(value)) return value;
  const date = new Date(value);
  const day = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  if (!value.includes("T")) return day;
  return `${day}, ${value.slice(11, 16)}`;
};

// Labels share one baseline just above the highest summit, so the rotated
// names stay parallel; each stem runs down to its own peak.
const labelBaseline = (peaks) => Math.min(...peaks.map((p) => p.y)) - 3;

export default function App() {
  return (
    <main className="bg-gray-50 text-stone-900">
      {panoramas.map((pano) => (
        <PanoramaSection key={pano.id} pano={pano} />
      ))}
      {mountains.map((peak) => (
        <MountainSection key={peak.name} peak={peak} />
      ))}
      <BackToTop />
    </main>
  );
}

// Appears once the first screen has scrolled away.
function BackToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > window.innerHeight);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          className="group fixed right-6 bottom-6 z-40 rounded-full bg-white p-3 text-black shadow-lg"
        >
          <IconArrowUp
            size={20}
            stroke={2}
            className="transition-opacity group-hover:opacity-50"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function PanoramaSection({ pano }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 1], backgrounds)

  const [fullscreen, setFullscreen] = useState(false);
  const closeFullscreen = useCallback(() => setFullscreen(false), []);

  return (
    <motion.div
      style={{ backgroundColor }}
      ref={containerRef}
      id={pano.id}
      className="flex min-h-dvh flex-col gap-6 px-4 py-6 md:h-dvh md:px-10 md:py-10"
    >
      <header className="max-w-3xl">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          {pano.title}
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Panorama · {pano.takenFrom}
        </p>
        <p className="mt-5 leading-relaxed text-stone-600">
          {pano.description}
        </p>
      </header>

      <figure className="group relative h-[50dvh] overflow-hidden rounded-xl bg-stone-800 md:h-auto md:min-h-0 md:flex-1">
        <div className="h-full overflow-x-auto overflow-y-hidden">
          <PanoramaImage pano={pano} />
        </div>
        <ScrollHint />
        <FullscreenButton onClick={() => setFullscreen(true)} />
        <figcaption className="pointer-events-none absolute right-4 bottom-4 left-4 text-[10px] text-white opacity-50 drop-shadow transition-opacity duration-300 group-hover:opacity-100">
          <PhotoMeta photo={pano} />
        </figcaption>
      </figure>

      <div className="text-sm">
        <p className="font-semibold text-stone-900">Jump to a peak</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {pano.peaks
            .filter((peak) => peaksWithCards.has(peak.name))
            .map((peak) => (
              <a
                key={peak.name}
                href={`#${slug(peak.name)}`}
                className="rounded-full bg-stone-100 px-3 py-1 text-stone-700 hover:bg-stone-200"
              >
                {peak.name}{" "}
                <span className="text-stone-600">
                  {formatMeters(peak.elevation)}
                </span>
              </a>
            ))}
        </div>
      </div>

      {fullscreen && (
        <FullscreenView photo={pano} onClose={closeFullscreen}>
          <div className="h-full overflow-x-auto overflow-y-hidden">
            <PanoramaImage pano={pano} />
          </div>
          <ScrollHint />
        </FullscreenView>
      )}
    </motion.div>
  );
}

function ScrollHint() {
  return (
    <div className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/50 px-3 py-1 text-[11px] whitespace-nowrap text-white backdrop-blur-sm">
      Scroll sideways to see the full range
    </div>
  );
}

function PanoramaImage({ pano }) {
  return (
    <div className="relative h-full w-max">
      <img
        src={pano.image}
        alt={`Panorama of the ${pano.title} from ${pano.takenFrom}`}
        width={pano.width}
        height={pano.height}
        className="h-full w-auto max-w-none"
      />
      {!pano.labelled &&
        pano.peaks.map((peak) => (
          <PeakLabel
            key={peak.name}
            peak={peak}
            baseline={labelBaseline(pano.peaks)}
          />
        ))}
    </div>
  );
}

function PeakLabel({ peak, baseline }) {
  return (
    <>
      <span
        className="pointer-events-none absolute w-px bg-white/70"
        style={{
          left: `${peak.x}%`,
          top: `${baseline}%`,
          height: `${peak.y - baseline}%`,
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{ left: `${peak.x}%`, top: `${baseline}%` }}
      >
        <span className="absolute bottom-0 left-0 origin-bottom-left -rotate-45 px-1 text-xs font-semibold whitespace-nowrap text-white drop-shadow">
          {peak.name}
        </span>
      </div>
    </>
  );
}

function FullscreenButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="View full screen"
      className="group absolute top-3 right-3 rounded-full bg-white p-1.5 text-black shadow"
    >
      <IconMaximize
        size={14}
        stroke={2}
        className="transition-opacity group-hover:opacity-50"
      />
    </button>
  );
}

// Covers the whole viewport with a fixed overlay; doesn't use the browser's
// native fullscreen mode.
function FullscreenView({ photo, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black">
      {children}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close full screen"
        className="absolute top-4 right-4 rounded-full bg-white/90 p-2 text-stone-900 shadow transition-colors hover:bg-white"
      >
        <IconX size={20} stroke={2} />
      </button>
      <p className="pointer-events-none absolute right-4 bottom-4 left-4 text-xs text-white/80 drop-shadow">
        <PhotoMeta photo={photo} />
      </p>
    </div>,
    document.body,
  );
}

function PhotoMeta({ photo }) {
  const details = [
    photo.takenFrom && (
      <span key="from" className="inline-flex items-center gap-1">
        <IconMapPin size={12} stroke={2} />
        {photo.takenFrom}
      </span>
    ),
    photo.coords && (
      <a
        key="coords"
        href={`https://www.openstreetmap.org/?mlat=${photo.coords[0]}&mlon=${photo.coords[1]}#map=13/${photo.coords[0]}/${photo.coords[1]}`}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto underline underline-offset-2 hover:text-white"
      >
        {photo.coords.map((c) => c.toFixed(4)).join(", ")}
      </a>
    ),
    photo.takenAt && formatTakenAt(photo.takenAt),
    photo.camera && (
      <span key="camera" className="inline-flex items-center gap-1">
        <IconCamera size={12} stroke={2} />
        {photo.camera}
      </span>
    ),
  ].filter(Boolean);

  return (
    <>
      {details.length > 0 && (
        <span className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          {details}
        </span>
      )}
      Photo:{" "}
      <a
        href={photo.source}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto underline underline-offset-2 hover:text-white"
      >
        {photo.credit}
      </a>{" "}
      · {photo.license} · Wikimedia Commons
    </>
  );
}


function MountainSection({ peak }) {
  const containerRef=useRef(null)
  const {scrollYProgress}=useScroll({
    target:containerRef,
    offset:["start end","end start"]//element vs veiwport 
  })

  const translateContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 150, -150])
  const blur = useTransform(scrollYProgress,[0,0.5,1],[1,0,1])
  const filter = useMotionTemplate`blur(${blur}px)`


  const [fullscreen, setFullscreen] = useState(false);
  const closeFullscreen = useCallback(() => setFullscreen(false), []);

  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 1], backgrounds)

  return (
    <motion.div
      style={{ backgroundColor }}
      ref={containerRef}

      id={slug(peak.name)}
      className="flex min-h-dvh px-4 py-4 md:h-dvh md:px-10 md:py-8"
    >
      <article className="grid w-full items-center overflow-hidden md:grid-cols-2">
        {/* Left: image */}

        <motion.figure
          style={{ y: translateContent }}
          className="relative aspect-3/2 w-full max-w-lg justify-self-center overflow-hidden rounded-xl bg-stone-800">
          <img
            src={peak.image}
            alt={`${peak.name}, Uttarakhand`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
          <FullscreenButton onClick={() => setFullscreen(true)} />
          <figcaption className="absolute right-4 bottom-4 left-4 text-[10px] text-white opacity-50 transition-opacity duration-300 hover:opacity-100">
            <PhotoMeta photo={peak} />
          </figcaption>
        </motion.figure>

        {/* Right: info */}
        <motion.section
          style={{ filter }}

        className="flex flex-col justify-center overflow-y-auto p-6 md:p-10 lg:p-14">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            {peak.name}
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            {peak.region} · {peak.district}, Uttarakhand
          </p>

          <p className="mt-5 leading-relaxed text-stone-600">
            {peak.description}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            <Stat label="Elevation" value={formatMeters(peak.elevation)} />
            <Stat label="Best time" value={peak.bestTime} />
          </dl>

          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-stone-900">See it from</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {peak.seeFrom.map((place) => (
                  <a
                    key={place}
                    href={mapSearch(`${place}, Uttarakhand`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1 text-stone-700 hover:bg-stone-200"
                  >
                    <IconMapPin size={14} stroke={2} />
                    {place}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-stone-900">Getting there</dt>
              <dd className="mt-1 leading-relaxed text-stone-600">
                {peak.gettingThere}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-stone-900">Permit</dt>
              <dd className="mt-1 leading-relaxed text-stone-600">
                {peak.permit}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-stone-900">Summit location</dt>
              <dd className="mt-1">
                <a
                  href={mapSearch(peak.summit.join(","))}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-800 underline underline-offset-2"
                >
                  {peak.summit.map((c) => c.toFixed(4)).join(", ")}
                </a>
              </dd>
            </div>
          </dl>
        </motion.section>
      </article>

      {fullscreen && (
        <FullscreenView photo={peak} onClose={closeFullscreen}>
          <img
            src={peak.image}
            alt={`${peak.name}, Uttarakhand`}
            className="h-full w-full object-contain"
          />
        </FullscreenView>
      )}
    </motion.div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-stone-100 p-3">
      <dt className="text-[11px] font-medium tracking-wide text-stone-600 uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-stone-900">{value}</dd>
    </div>
  );
}
