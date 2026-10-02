import { useState, type CSSProperties } from "react";
import { Link } from "../lib/router";
import { Reveal } from "../lib/motion";
import { Button, Container } from "../components/ui";
import { PageHero } from "../components/sections";
import { ArrowUpRight, Clock } from "../components/Icons";
import { HeartFill, Sparkle } from "../components/Decor";
import { articles, type Article } from "../data/content";

export function ArticleCard({ a, i = 0 }: { a: Article; i?: number }) {
  return (
    <Link to={`/journal/${a.slug}`} className="group block" data-cursor="hover">
      <div className="relative overflow-hidden rounded-[24px] bg-petal">
        <img src={a.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110 group-hover:rotate-1" style={{ transitionTimingFunction: "var(--ease)" }} />
        <div className="absolute inset-0 bg-rose/0 transition-colors duration-700 group-hover:bg-rose/15" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-rose backdrop-blur">{a.category}</span>
        <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 scale-75 place-items-center rounded-full bg-white text-rose opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="mt-5 flex items-center gap-3 text-[13px] text-muted">
        <span>{a.date}</span>
        <span className="h-1 w-1 rounded-full bg-blush" />
        <span className="inline-flex items-center gap-1"><Clock size={13} /> {a.read} read</span>
        <span className="ml-auto text-[12px] font-bold text-blush">{String(i + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="display mt-2 text-[24px] leading-tight transition-colors duration-300 group-hover:text-rose sm:text-[26px]">{a.title}</h3>
      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">{a.excerpt}</p>
    </Link>
  );
}

export default function Journal() {
  const cats = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];
  const [cat, setCat] = useState("All");
  const featured = articles.find((a) => a.featured)!;
  const list = articles.filter((a) => !a.featured && (cat === "All" || a.category === cat));
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title={"Notes on design,\ncode & softness."}
        highlight={["softness"]}
        text="Essays, case notes and tiny lessons from the studio — written slowly, with a cup of chai."
      />

      <section className="pb-16">
        <Container>
          <Reveal variant="mask">
            <Link to={`/journal/${featured.slug}`} className="group grid overflow-hidden rounded-[32px] border border-line bg-white lg:grid-cols-[1.3fr_1fr]" data-cursor="hover">
              <div className="relative overflow-hidden">
                <img src={featured.image} alt="" className="aspect-[16/10] h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" style={{ transitionTimingFunction: "var(--ease)" }} />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-bold tracking-[0.12em] text-rose uppercase backdrop-blur"><HeartFill size={11} /> Featured</span>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="flex items-center gap-3 text-[13px] text-muted"><span className="tag">{featured.category}</span>{featured.date} · {featured.read} read</div>
                <h2 className="display mt-4 text-[clamp(32px,3.6vw,46px)] leading-[1.08] transition-colors group-hover:text-rose">{featured.title}</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">{featured.excerpt}</p>
                <span className="mt-7 inline-flex items-center gap-3 text-[14px] font-semibold text-rose">Read article <span className="round-arrow"><ArrowUpRight size={16} /></span></span>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <Reveal className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-all duration-300 ${cat === c ? "border-rose bg-rose text-white shadow-[0_8px_20px_-8px_rgba(233,79,131,.8)]" : "border-line bg-white/70 text-ink/70 hover:border-blush hover:text-rose"}`}>
                {c}
              </button>
            ))}
          </Reveal>
          <div key={cat} className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a, i) => (
              <div key={a.slug} className="filter-item is-enter" style={{ "--d": `${i * 80}ms` } as CSSProperties}>
                <ArticleCard a={a} i={i} />
              </div>
            ))}
            {list.length === 0 && <p className="col-span-full py-16 text-center text-muted">Fresh notes coming soon ♡</p>}
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <Reveal variant="clip" className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(110deg,#FCE3EB,#F9D2DF)] p-8 sm:p-14">
            <div className="dots absolute right-10 top-10 h-16 w-24 opacity-60" />
            <Sparkle size={22} className="twinkle absolute right-[30%] top-8 text-rose" />
            <div className="relative grid items-center gap-8 lg:grid-cols-2">
              <div>
                <p className="eyebrow">Newsletter</p>
                <h2 className="display mt-3 text-[clamp(32px,4vw,50px)] leading-[1.05]">Soft letters, <span className="script text-rose">once a month</span></h2>
                <p className="mt-3 max-w-md text-[15.5px] text-ink/70">New essays, resources and behind-the-scenes studio notes. No spam, ever.</p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => { e.preventDefault(); (e.currentTarget.querySelector("input") as HTMLInputElement).value = ""; alert("Thank you for subscribing ♡"); }}>
                <label className="sr-only" htmlFor="nl">Email</label>
                <input id="nl" type="email" required placeholder="you@lovely.email" className="h-12 flex-1 rounded-2xl border border-white bg-white/80 px-5 text-[15px] outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(233,79,131,.15)]" />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
