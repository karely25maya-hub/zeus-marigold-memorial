import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import zeus from "@/assets/zeus.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altar digital para Zeus 🐾 | Día de Muertos" },
      { name: "description", content: "Un altar digital de Día de Muertos con cempasúchil, papel picado y veladoras en memoria de Zeus, mi gatito." },
      { property: "og:title", content: "Altar digital para Zeus" },
      { property: "og:description", content: "Cempasúchil, papel picado y veladoras para recordar a Zeus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PAPEL = ["bg-accent", "bg-primary", "bg-secondary", "bg-marigold-deep", "bg-rosa", "bg-flame"];

function Marigold({ size = 56, className = "" }: { size?: number; className?: string }) {
  const rings = [
    { n: 14, r: 0.42, c: "var(--marigold-deep)" },
    { n: 11, r: 0.3, c: "var(--marigold)" },
    { n: 8, r: 0.17, c: "var(--flame)" },
  ];
  return (
    <svg width={size} height={size} viewBox="-1 -1 2 2" className={className} aria-hidden>
      {rings.map((ring, i) =>
        Array.from({ length: ring.n }).map((_, j) => {
          const a = (j / ring.n) * Math.PI * 2 + i;
          return (
            <ellipse key={`${i}-${j}`} cx={Math.cos(a) * ring.r} cy={Math.sin(a) * ring.r}
              rx={0.28 - i * 0.05} ry={0.18 - i * 0.03}
              transform={`rotate(${(a * 180) / Math.PI} ${Math.cos(a) * ring.r} ${Math.sin(a) * ring.r})`}
              fill={ring.c} stroke="var(--marigold-deep)" strokeWidth="0.02" />
          );
        }),
      )}
      <circle r="0.1" fill="var(--marigold-deep)" />
    </svg>
  );
}

function Petals() {
  const petals = useMemo(
    () => Array.from({ length: 28 }).map((_, i) => ({
      left: Math.random() * 100, size: 8 + Math.random() * 12,
      dur: 7 + Math.random() * 8, delay: -Math.random() * 15,
      drift: `${(Math.random() - 0.5) * 200}px`, key: i,
    })), []);
  return <>{petals.map((p) => (
    <span key={p.key} className="petal" style={{
      left: `${p.left}%`, width: p.size, height: p.size,
      animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
      ["--drift" as string]: p.drift,
    }} />
  ))}</>;
}

function PapelPicado() {
  return (
    <div className="pointer-events-auto relative z-30 w-full">
      <div className="absolute left-0 right-0 top-3 h-0.5 bg-muted-foreground/60" />
      <div className="flex justify-around px-2 pt-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="sway grow-hover" style={{ animationDelay: `${i * 0.2}s` }}>
            <div className={`${PAPEL[i % PAPEL.length]} relative flex h-20 w-14 items-center justify-center opacity-90 sm:h-24 sm:w-20`}
              style={{ clipPath: "polygon(0 0,100% 0,100% 85%,90% 100%,80% 85%,70% 100%,60% 85%,50% 100%,40% 85%,30% 100%,20% 85%,10% 100%,0 85%)" }}>
              <svg viewBox="0 0 40 40" className="h-10 w-10 fill-background/70" aria-hidden>
                <circle cx="20" cy="14" r="7" /><circle cx="10" cy="28" r="3" /><circle cx="30" cy="28" r="3" />
                <circle cx="20" cy="30" r="2" /><rect x="6" y="4" width="4" height="4" /><rect x="30" y="4" width="4" height="4" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Veladora({ delay = 0 }: { delay?: number }) {
  return (
    <div className="grow-hover flex flex-col items-center">
      <div className="flame mb-[-4px] h-12 w-6" style={{ animationDelay: `${delay}s` }} />
      <div className="h-2 w-1 bg-nose" />
      <div className="relative flex h-40 w-28 flex-col items-center justify-center overflow-hidden rounded-b-2xl rounded-t-md border-2 border-marigold bg-gradient-to-b from-foreground/95 to-muted-foreground/80 shadow-[var(--glow-flame)]">
        <div className="absolute inset-x-0 top-0 h-3 bg-rosa" />
        <img src={zeus.url} alt="Zeus" className="mt-2 h-20 w-20 rounded-full border-4 border-marigold object-cover object-[50%_40%]" />
        <span className="mt-2 font-script text-lg text-secondary">Zeus</span>
        <div className="absolute inset-x-0 bottom-0 h-3 bg-secondary" />
      </div>
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background px-6 text-center">
      <p className="font-script text-3xl text-marigold sm:text-4xl">Para encender el altar de Zeus…</p>
      <button onClick={onStart} aria-label="Presiona la nariz para entrar" className="nose-pulse grow-hover">
        <svg width="200" height="160" viewBox="0 0 200 160">
          <path d="M100 150 C40 150 10 110 20 70 C30 25 70 15 100 30 C130 15 170 25 180 70 C190 110 160 150 100 150Z" fill="var(--nose)" />
          <ellipse cx="65" cy="85" rx="20" ry="14" fill="var(--background)" transform="rotate(-20 65 85)" />
          <ellipse cx="135" cy="85" rx="20" ry="14" fill="var(--background)" transform="rotate(20 135 85)" />
          <path d="M100 100 L100 140" stroke="var(--background)" strokeWidth="4" />
          <ellipse cx="80" cy="45" rx="20" ry="8" fill="var(--foreground)" opacity="0.25" />
        </svg>
      </button>
      <p className="text-muted-foreground">Presiona la naricita 🐾</p>
    </div>
  );
}

function Index() {
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative min-h-screen">
      {!started && <Intro onStart={() => setStarted(true)} />}
      {mounted && started && <Petals />}

      {started && (
        <>
          <PapelPicado />

          <section className="reveal mx-auto flex max-w-5xl flex-col items-center px-4 pb-10 pt-8 text-center">
            <p className="font-script text-2xl text-marigold">Día de Muertos</p>
            <h1 className="grow-hover mt-2 font-display text-5xl font-bold text-primary sm:text-7xl">Zeus</h1>
            <p className="mt-3 max-w-md text-muted-foreground">Mi gatito, mi compañero. Este altar es para que encuentres el camino de vuelta a casa.</p>

            {/* Arco de cempasúchil */}
            <div className="relative mt-12 aspect-[4/5] w-full max-w-md">
              {Array.from({ length: 25 }).map((_, i) => {
                const t = i / 24;
                const a = Math.PI * (1 - t);
                const x = 50 + Math.cos(a) * 46;
                const y = t < 0 ? 0 : 42 - Math.sin(a) * 40;
                return (
                  <div key={i} className="grow-hover absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                    <Marigold size={i % 2 ? 46 : 58} />
                  </div>
                );
              })}
              {[50, 62, 74, 86, 98].map((y) => (
                <div key={y} className="contents">
                  {[4, 96].map((x) => (
                    <div key={x} className="grow-hover absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                      <Marigold size={50} />
                    </div>
                  ))}
                </div>
              ))}
              <div className="absolute inset-x-[16%] top-[18%] bottom-[8%] flex flex-col items-center">
                <div className="grow-hover overflow-hidden rounded-t-full border-4 border-marigold shadow-[var(--shadow-photo)]">
                  <img src={zeus.url} alt="Zeus, gatito negro con suéter a cuadros" className="aspect-[3/4] w-full object-cover" />
                </div>
                <p className="mt-4 font-script text-3xl text-flame">Siempre en mi corazón</p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 py-12">
            <h2 className="text-center font-display text-3xl text-marigold">Veladoras para Zeus</h2>
            <div className="mt-10 flex flex-wrap items-end justify-center gap-8">
              {[0, 0.3, 0.6, 0.9, 1.2].map((d) => <Veladora key={d} delay={d} />)}
            </div>
          </section>

          <section className="mx-auto grid max-w-4xl gap-6 px-4 py-12 sm:grid-cols-3">
            {[
              { e: "🐟", t: "Su ofrenda", d: "Croquetas, atún y su juguete favorito." },
              { e: "🌼", t: "Cempasúchil", d: "Sus pétalos guían su camino." },
              { e: "🐾", t: "Sus huellitas", d: "Las que dejó en cada rincón de casa." },
            ].map((c) => (
              <div key={c.t} className="grow-hover rounded-xl border border-border bg-card p-6 text-center">
                <div className="text-5xl">{c.e}</div>
                <h3 className="mt-3 font-display text-xl text-primary">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </section>

          <footer className="flex justify-center gap-2 py-10">
            {Array.from({ length: 9 }).map((_, i) => <div key={i} className="grow-hover"><Marigold size={40} /></div>)}
          </footer>
        </>
      )}
    </main>
  );
}
