# Portfolio — Filip Hirt

Osobní portfolio webdesignéra a vývojáře. Jednostránková aplikace (SPA) s horizontálním scroll-storytellingem, vlastním kurzorem, smooth scrollingem a 3D prvky. Backend běží jako serverless funkce na Netlify (kontaktní formulář + AI chatbot), data se ukládají do Neon PostgreSQL a notifikace odesílá Resend.

## 🧱 Tech stack

| Vrstva | Technologie |
|--------|-------------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styly | TailwindCSS 4, vlastní CSS |
| Animace / scroll | Framer Motion, Lenis (smooth scroll) |
| 3D | Three.js |
| Routing | wouter |
| UI komponenty | Radix UI + lokální `components/ui` (shadcn-style) |
| Serverless | Netlify Functions (Node.js) |
| Databáze | Neon PostgreSQL (`@neondatabase/serverless`) |
| E-maily | Resend |
| AI chatbot | Groq (produkce) / Ollama (lokálně) |

## 🚀 Lokální vývoj

### 1. Instalace závislostí
```bash
npm install
```

### 2. Spuštění dev serveru
```bash
npm run dev
```
Vite poběží na `http://localhost:5173`. Volání na `/api/*` se proxují na `http://localhost:8888` (Netlify Dev — viz níže).

### 3. Serverless funkce (kontaktní formulář, chatbot)
Funkce v `netlify/functions` poběží jen přes Netlify CLI:
```bash
npm install -g netlify-cli
netlify dev
```
Netlify Dev spustí Vite i funkce dohromady a sjednotí je na `http://localhost:8888`.

## 🔑 Environment variables

Hodnoty drž v `.env` (je v `.gitignore`, **nikdy necommitovat**). Vzor je v [`.env.example`](.env.example). V produkci je nastav v **Netlify → Site settings → Environment variables**.

| Proměnná | Použití | Povinná |
|----------|---------|---------|
| `NETLIFY_DATABASE_URL` | Connection string k Neon — čte ji `submit-contact` za běhu. Netlify ji vyplní automaticky při napojení Neon integrace. | ano (runtime) |
| `NEON_DATABASE_URL` | Connection string k Neon — používá ji lokální setup skript databáze. | ano (setup) |
| `RESEND_API_KEY` | API klíč pro odesílání e-mailů přes Resend. | ano |
| `RECIPIENT_EMAIL` | E-mail, kam chodí notifikace o nové poptávce. | ne (fallback je nastaven v kódu) |
| `GROQ_API_KEY` | Klíč pro Groq API — pokud je nastaven, chatbot běží přes Groq. | ne |
| `OLLAMA_API_URL` | URL lokálního Ollama serveru pro chatbot (default `http://127.0.0.1:11434`). | ne |

> ℹ️ Pozn.: runtime funkce čte `NETLIFY_DATABASE_URL`, zatímco setup skript a `.env.example` používají `NEON_DATABASE_URL`. Lokálně nastav obě na stejnou hodnotu, ať vše funguje.

## 🗃️ Databáze

Tabulku `contact_submissions` vytvoříš jednorázově setup skriptem:
```bash
node netlify/functions/setup-database.js
```
**Očekávaný výstup**: `✅ Table created successfully!`

Schéma:

| Sloupec | Typ |
|---------|-----|
| `id` | SERIAL PRIMARY KEY |
| `name` | VARCHAR(255), NOT NULL |
| `email` | VARCHAR(255), NOT NULL |
| `phone` | VARCHAR(50) |
| `service` | VARCHAR(100) |
| `message` | TEXT, NOT NULL |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |

Data lze prohlížet přes [Neon Console](https://console.neon.tech) → SQL Editor:
```sql
SELECT * FROM contact_submissions ORDER BY created_at DESC;
```

## 📦 Skripty

| Příkaz | Co dělá |
|--------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | Produkční build do `dist/` |
| `npm run serve` | Náhled produkčního buildu |
| `npm run typecheck` | Kontrola typů (`tsc --noEmit`) |

## 🌐 Deploy (Netlify)

Konfigurace je v [`netlify.toml`](netlify.toml):
- **Build**: `npm run build`, publikuje se `dist`
- **Functions**: `netlify/functions` (bundler esbuild)
- **Redirect**: `/api/*` → `/.netlify/functions/:splat`

Postup:
```bash
git add .
git commit -m "..."
git push
```
Netlify deployne automaticky po pushi. Před prvním deployem nastav environment variables (viz výše).

## 📁 Struktura projektu

```
Portfolio/
├── src/
│   ├── components/        # Sekce stránky (Hero, Services, Contact, …)
│   │   └── ui/            # Znovupoužitelné UI komponenty (Radix/shadcn-style)
│   ├── pages/            # Home, NotFound
│   ├── hooks/            # Vlastní React hooky
│   ├── lib/             # Pomocné funkce
│   ├── App.tsx          # Root + smooth scroll (Lenis) + routing
│   └── main.tsx         # Vstupní bod
├── netlify/
│   └── functions/
│       ├── submit-contact.js   # Příjem formuláře → DB + e-mail
│       ├── chat.js             # AI chatbot (Groq/Ollama)
│       ├── setup-database.js   # Vytvoření tabulky v Neon
│       └── templates/
│           └── contact-email.js
├── public/             # Statická aktiva (fonty, obrázky, favicon)
├── index.html          # HTML shell + meta/SEO
├── netlify.toml        # Konfigurace Netlify
├── vite.config.ts      # Konfigurace Vite (alias @ → src, proxy /api)
└── .env.example        # Vzor environment variables
```

## ✨ Funkce

- 🖥️ Horizontální scroll-storytelling se sekcemi About / Services / Portfolio / Journal / Chatbot / Contact
- 🎯 Vlastní kurzor a smooth scrolling (Lenis), s respektem k `prefers-reduced-motion`
- 🧊 3D prvky přes Three.js
- 📨 Kontaktní formulář → uložení do Neon PostgreSQL + e-mailová notifikace přes Resend
- 🤖 AI chatbot (asistent pana Hirta) přes Groq nebo lokální Ollama
- ♿ Reveal animace, progress bar, loader
- 🌍 SEO meta tagy a Open Graph

## 🔧 Troubleshooting

**„Database connection failed"**
- Zkontroluj `NETLIFY_DATABASE_URL` / `NEON_DATABASE_URL` v `.env` i v Netlify.
- Ověř, že tabulka existuje (`node netlify/functions/setup-database.js`).

**„Email not sent"**
- Zkontroluj `RESEND_API_KEY`. Pro produkci doporučeno nastavit vlastní ověřenou doménu v Resend místo `onboarding@resend.dev`.

**„Function not found"**
- Ověř, že běžíš přes `netlify dev` (ne jen `npm run dev`) a že existuje složka `netlify/functions`.

**Chatbot neodpovídá**
- Bez `GROQ_API_KEY` se funkce snaží spojit s lokálním Ollama serverem. Pro produkci nastav `GROQ_API_KEY`.
