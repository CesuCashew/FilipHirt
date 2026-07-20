import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { articles, img, type ArticleBlock } from "../data/articles";
import { useSeo } from "../lib/seo";

const SITE_URL = "https://filiphirt.cz";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="article-h2">{block.text}</h2>;
    case "quote":
      return <blockquote className="article-quote">{block.text}</blockquote>;
    case "list":
      return (
        <ul className="article-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p className="article-p">{block.text}</p>;
  }
}

export default function Article({ params }: { params: { slug: string } }) {
  const idx = articles.findIndex((a) => a.slug === params.slug);
  const article = idx >= 0 ? articles[idx] : null;
  const next = article ? articles[(idx + 1) % articles.length] : null;
  const progressRef = useRef<HTMLDivElement>(null);

  const articleUrl = article ? `${SITE_URL}/zurnal/${article.slug}` : undefined;
  const articleImage = article ? img(article.image, 1200) : undefined;

  useSeo(
    article
      ? {
          title: `${article.title} — Filip Hirt`,
          description: article.excerpt,
          canonical: articleUrl,
          ogType: "article",
          ogTitle: article.title,
          ogDescription: article.excerpt,
          ogUrl: articleUrl,
          ogImage: articleImage,
          twitterTitle: article.title,
          twitterDescription: article.excerpt,
          twitterImage: articleImage,
        }
      : { title: "Ztraceno v zápisníku — Filip Hirt", robots: "noindex" }
  );

  // new article → start at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  // reading progress bar (same treatment as the home page)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [params.slug]);

  if (!article || !next) {
    return (
      <div className="article-page">
        <header className="article-top">
          <Link href="/#journal" className="article-back">← Žurnál</Link>
          <Link href="/" className="article-brand">Filip Hirt<span>.</span></Link>
        </header>
        <main className="article-main article-missing">
          <h1 className="article-title">Ztraceno v zápisníku</h1>
          <p className="article-lead">Tenhle článek tu není — buď se odstěhoval, nebo nikdy nevznikl.</p>
          <Link href="/#journal" className="article-home">← Zpět na žurnál</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="article-page">
      <div className="page-progress"><div ref={progressRef} className="page-progress-fill" /></div>

      <header className="article-top">
        <Link href="/#journal" className="article-back">← Žurnál</Link>
        <Link href="/" className="article-brand">Filip Hirt<span>.</span></Link>
      </header>

      <main className="article-main">
        <article>
          <header className="article-head">
            <p className="article-meta">
              <span className="article-meta-cat">{article.cat}</span>
              <span aria-hidden="true">·</span>
              <span>{article.date}</span>
            </p>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-lead">{article.lead}</p>
          </header>

          <figure className="article-media">
            <img src={img(article.image, 1600)} alt={article.alt} />
          </figure>

          <div className="article-body">
            {article.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
            <p className="article-sign">— Filip</p>
          </div>
        </article>

        <footer className="article-end">
          <Link href={`/zurnal/${next.slug}`} className="article-next">
            <span className="article-next-label">Další článek</span>
            <span className="article-next-title">{next.title}</span>
            <span className="article-next-go">Číst →</span>
          </Link>
          <div className="article-end-row">
            <Link href="/#journal" className="article-home">← Zpět na žurnál</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
