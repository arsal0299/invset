import type { CSSProperties } from "react";
import { Link } from "../lib/router";
import { Reveal, useParallax } from "../lib/motion";
import { Container } from "../components/ui";
import { ArrowLeft, Clock, Linkedin, Mail } from "../components/Icons";
import { HeartFill, Sparkle } from "../components/Decor";
import { articles, profile } from "../data/content";
import { img } from "../data/images";
import { ArticleCard } from "./Journal";
import NotFound from "./NotFound";

export default function ArticlePage({ slug }: { slug: string }) {
  const a = articles.find((x) => x.slug === slug);
  const par = useParallax<HTMLDivElement>(-0.1);
  if (!a) return <NotFound />;
  const related = articles.filter((x) => x.slug !== slug).slice(0, 3);
  const words = a.title.split(" ");

  return (
    <article>
      <header className="relative overflow-hidden pb-10 pt-8 sm:pt-12">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(247,182,200,.5),transparent)]" />
        <Container className="relative max-w-[900px]">
          <Link to="/journal" className="enter group inline-flex items-center gap-2 text-[14px] font-semibold text-muted hover:text-rose" style={{ "--d": "100ms" } as CSSProperties}>
            <ArrowLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-1" /> Journal
          </Link>
          <div className="enter mt-6 flex flex-wrap items-center gap-3 text-[13.5px] text-muted" style={{ "--d": "200ms" } as CSSProperties}>
            <span className="tag">{a.category}</span>
            <span>{a.date}</span>
            <span className="h-1 w-1 rounded-full bg-blush" />
            <span className="inline-flex items-center gap-1"><Clock size={14} /> {a.read} read</span>
          </div>
          <h1 className="display mt-5 text-[clamp(40px,6.4vw,76px)] leading-[1.02]">
            {words.map((w, i) => (
              <span key={i} className="hero-word">
                <span style={{ "--d": `${280 + i * 55}ms` } as CSSProperties}>{w}&nbsp;</span>
              </span>
            ))}
          </h1>
          <p className="enter mt-6 text-[19px] leading-relaxed text-muted" style={{ "--d": "700ms" } as CSSProperties}>{a.excerpt}</p>
          <div className="enter mt-8 flex items-center gap-4" style={{ "--d": "800ms" } as CSSProperties}>
            <img src={img.aboutAvatar} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-white" />
            <div>
              <p className="text-[15px] font-semibold">{profile.name}</p>
              <p className="text-[13px] text-muted">{profile.role}</p>
            </div>
          </div>
        </Container>
      </header>

      <Container className="max-w-[1100px]">
        <div className="enter enter-scale overflow-hidden rounded-[32px] shadow-[var(--shadow-lift)]" style={{ "--d": "900ms" } as CSSProperties}>
          <div ref={par} className="-my-10">
            <img src={a.image} alt="" className="aspect-[16/8] w-full scale-110 object-cover" />
          </div>
        </div>
      </Container>

      <Container className="max-w-[1100px] py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[80px_1fr_80px]">
          <aside className="hidden lg:block">
            <div className="sticky top-32 flex flex-col items-center gap-3">
              <span className="text-[11px] font-bold tracking-[0.16em] text-muted uppercase [writing-mode:vertical-rl]">Share</span>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="icon-btn" aria-label="Share on LinkedIn"><Linkedin size={16} /></a>
              <a href={`mailto:?subject=${encodeURIComponent(a.title)}`} className="icon-btn" aria-label="Share via email"><Mail size={16} /></a>
              <button className="icon-btn" aria-label="Like"><HeartFill size={16} /></button>
            </div>
          </aside>
          <Reveal variant="fade" className="prose-journal mx-auto max-w-[680px]">
            <p>
              <span className="display float-left mr-3 mt-1 text-[76px] leading-[0.8] text-rose">E</span>
              very project begins with a feeling. Before wireframes, before colour palettes, before a single line of code, there's a sense of how something should feel in your hands. For me, that feeling is almost always <em>soft</em> — calm, welcoming, quietly confident.
            </p>
            <p>
              Softness is often mistaken for weakness in design. We've been taught that bold means loud: saturated gradients, aggressive motion, interfaces shouting for attention. But the products people return to again and again are the ones that make them feel safe.
            </p>
            <h2>Gentle doesn't mean boring</h2>
            <p>
              A soft interface still has a strong point of view. It uses hierarchy, rhythm and restraint to guide the eye. It chooses one accent colour and uses it with intention. It lets whitespace do the heavy lifting.
            </p>
            <blockquote>“The best interfaces feel like a handwritten note — personal, thoughtful and a little bit delightful.”</blockquote>
            <p>Here are a few principles I return to on almost every project:</p>
            <ul>
              <li>Pick one accent colour and let it mean something — action, delight, or emphasis.</li>
              <li>Animate with purpose: entrances explain hierarchy, exits explain consequence.</li>
              <li>Round the corners of your language too — microcopy is part of the interface.</li>
              <li>Leave room to breathe. Density is a choice, not a default.</li>
            </ul>
            <h2>Small details, big feelings</h2>
            <p>
              The hover state on a button, the ease curve on a modal, the way a card lifts a few pixels when you touch it — these are the moments people can't name but always remember. They're the difference between a site that works and a site that feels loved.
            </p>
            <p>
              Next time you're designing, try asking not just <em>“does this work?”</em> but <em>“how does this feel?”</em>. You might be surprised how often the gentle answer is the right one.
            </p>
            <p className="hand !text-[28px] text-rose">— with love, {profile.first} ♡</p>
          </Reveal>
          <div />
        </div>
      </Container>

      <section className="pb-20">
        <Container>
          <Reveal className="mb-10 flex items-center gap-3">
            <h2 className="display text-[clamp(30px,4vw,44px)]">Keep <span className="italic text-rose">reading</span></h2>
            <Sparkle size={16} className="twinkle text-rose" />
          </Reveal>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 100}><ArticleCard a={r} i={i} /></Reveal>
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
