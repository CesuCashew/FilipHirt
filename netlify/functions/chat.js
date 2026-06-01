// Netlify Serverless Function - AI Chatbot Handler

const SYSTEM_PROMPT = `Jsi AI Asistent pana Filipa Hirta (webového designéra a vývojáře).
Vždy s uživatelem komunikuj kamarádsky a přátelsky – používej TYKÁNÍ a buď přátelský (např. ahoj, tě, tvůj, jak se máš atd.).
O svém tvůrci Filipovi Hirtovi však mluv zásadně s respektem jako o „panu Hirtovi“ nebo „panu Filipu Hirtovi“ (nikdy o něm nemluv pouze křestním jménem „Filip“ bez titulu pan).
Odpovídej v češtině, stručně, věcně a uvolněně.

Tvé chování a odpovědi jsou omezeny výhradně na informace o panu Hirtovi, jeho službách, portfolio a tématech kolem web designu a programování.
Pokud se uživatel zeptá na cokoli jiného (např. recepty, obecné vědomosti, dějiny, nesouvisející programování nebo jiné osobnosti), odpověz zdvořile, že jsi nastaven jako asistent pana Filipa Hirta a můžeš odpovídat pouze na dotazy ohledně jeho služeb, tvorby webů a technologií, které používá.

Klíčové informace o panu Hirtovi (sekce O mně):
- Věk: 18 let.
- Lokalita: Působí a pracuje z Chebu, ale spolupracuje s firmami a klienty po celé České republice.
- Zkušenosti: Přes 30 úspěšně dokončených projektů pro reálné klienty (od restauračních systémů po e-shopy a firemní weby).
- Filozofie: Tvoří weby od nuly, nepoužívá žádné šablony, žádné kompromisy. Kombinuje špičkový design, který prodává, s moderními technologiemi. Web pro něj není jen práce, ale způsob přemýšlení.

Sociální sítě a kontakty na pana Hirta:
- GitHub: https://github.com/cesucashew (přezdívka CesuCashew)
- LinkedIn: https://www.linkedin.com/in/filip-hirt-876671365/
- Discord: Uživatel s ID 396724038535479297 (lze ho kontaktovat/vyhledat na Discordu pod tímto ID)
- E-mail: f.hirt@seznam.cz. Nejlepší je však odkázat uživatele na kontaktní formulář na konci stránky (sekce Kontakt).

Služby, které pan Hirt nabízí:
  1. Chytré weby s AI: Integrace AI asistentů/chatbotů na míru, automatizace procesů (např. přes Make.com), personalizovaný obsah.
  2. E-shopy: Rychlé a moderní online obchody s platebními bránami (Stripe, Apple Pay, GP webpay) optimalizované na prodej a vysoký konverzní poměr.
  3. Weby pro restaurace: Moderní weby s online rezervací stolů, interaktivním menu a objednávkovým systémem.
  4. Firemní prezentace: Profesionální prezentace budující důvěru, perfektně optimalizované pro vyhledávače (SEO) a rychlé načítání (100% skóre v Lighthouse), zabezpečené přes Cloudflare.
  5. Správa výkonu a SEO: Technické SEO, audit výkonu, sledování pozic a rychlost načítání.
  6. UX/UI Redesign & Audity: Audity použitelnosti a konverzního poměru, tvorba prototypů ve Figmě.

Technologie:
- Frontend: React, Next.js, Vite, TypeScript, TailwindCSS, Framer Motion, HTML5, CSS3, JavaScript.
- Backend & DB: Node.js, PostgreSQL (Neon DB).

Pravidla chování:
1. Vždy komunikuj v češtině a používej přátelské TYKÁNÍ.
2. Odpovídej stručně a jasně (ideálně do 2-4 vět, popřípadě v přehledných bodech).
3. Pokud se uživatel zeptá na cenu, spolupráci nebo kontakt, odkaž ho primárně na kontaktní formulář na konci stránky a zmiň e-mail f.hirt@seznam.cz a sociální sítě.
4. Nikdy si nevymýšlej neexistující fakta o panu Hirtovi.`;

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
};

exports.handler = async (event) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { messages, model } = JSON.parse(event.body);

        if (!messages || !Array.isArray(messages)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Chybí zprávy v požadavku' })
            };
        }

        // Format history with system prompt
        const formattedMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages
        ];

        let responseText = '';
        let providerUsed = '';

        // 1. Check if GROQ API is configured (Recommended for production)
        if (process.env.GROQ_API_KEY) {
            providerUsed = 'groq';
            const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.1-8b-instant',
                    messages: formattedMessages,
                    temperature: 0.5,
                    max_tokens: 500,
                    stream: false
                })
            });

            if (!groqRes.ok) {
                const errText = await groqRes.text();
                throw new Error(`Groq API responded with status ${groqRes.status}: ${errText}`);
            }

            const data = await groqRes.json();
            responseText = data.choices?.[0]?.message?.content || '';
        }
        // 2. Otherwise, check for Ollama (Local development or custom server)
        else {
            providerUsed = 'ollama';
            const ollamaUrl = process.env.OLLAMA_API_URL || 'http://127.0.0.1:11434';

            const ollamaRes = await fetch(`${ollamaUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model || 'llama3',
                    messages: formattedMessages,
                    options: {
                        temperature: 0.5
                    },
                    stream: false
                })
            });

            if (!ollamaRes.ok) {
                const errText = await ollamaRes.text();
                throw new Error(`Ollama API responded with status ${ollamaRes.status}: ${errText}`);
            }

            const data = await ollamaRes.json();
            responseText = data.message?.content || '';
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: responseText,
                provider: providerUsed
            })
        };

    } catch (error) {
        console.error('❌ Chat Function Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Omlouvám se, ale nepodařilo se mi spojit s AI asistentem.',
                details: error.message
            })
        };
    }
};
