import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description?: string;
  canonical?: string;
  robots?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  /** JSON-LD for this page (e.g. BlogPosting on an article) — kept separate
      from the site-wide ProfessionalService/Person graph in index.html. */
  structuredData?: object;
}

function setMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setRobots(content?: string) {
  const el = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (!content) {
    el?.remove();
    return;
  }
  if (el) {
    el.setAttribute("content", content);
    return;
  }
  const created = document.createElement("meta");
  created.setAttribute("name", "robots");
  created.setAttribute("content", content);
  document.head.appendChild(created);
}

/** Per-page JSON-LD, identified by data-seo="page" so it never collides with
    the static site-wide graph already seeded in index.html. */
function setStructuredData(json?: string) {
  const existing = document.querySelector<HTMLScriptElement>('script[data-seo="page"]');
  if (!json) {
    existing?.remove();
    return;
  }
  if (existing) {
    existing.textContent = json;
    return;
  }
  const el = document.createElement("script");
  el.type = "application/ld+json";
  el.setAttribute("data-seo", "page");
  el.textContent = json;
  document.head.appendChild(el);
}

/** Updates the document head in place (title/meta/canonical already seeded in index.html). */
export function useSeo(opts: SeoOptions) {
  // stringified so the effect re-runs on content changes, not on the new
  // object reference callers pass in on every render
  const structuredDataJson = opts.structuredData ? JSON.stringify(opts.structuredData) : undefined;

  useEffect(() => {
    document.title = opts.title;
    if (opts.description) setMetaByName("description", opts.description);
    if (opts.canonical) setCanonical(opts.canonical);
    setRobots(opts.robots);
    if (opts.ogType) setMetaByProperty("og:type", opts.ogType);
    setMetaByProperty("og:title", opts.ogTitle ?? opts.title);
    if (opts.ogDescription) setMetaByProperty("og:description", opts.ogDescription);
    if (opts.ogUrl) setMetaByProperty("og:url", opts.ogUrl);
    if (opts.ogImage) setMetaByProperty("og:image", opts.ogImage);
    setMetaByName("twitter:title", opts.twitterTitle ?? opts.title);
    if (opts.twitterDescription) setMetaByName("twitter:description", opts.twitterDescription);
    if (opts.twitterImage) setMetaByName("twitter:image", opts.twitterImage);
    setStructuredData(structuredDataJson);
  }, [
    opts.title,
    opts.description,
    opts.canonical,
    opts.robots,
    opts.ogType,
    opts.ogTitle,
    opts.ogDescription,
    opts.ogUrl,
    opts.ogImage,
    opts.twitterTitle,
    opts.twitterDescription,
    opts.twitterImage,
    structuredDataJson,
  ]);
}
