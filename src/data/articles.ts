export const img = (id: string, w = 760) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const CZECH_MONTHS: Record<string, string> = {
  leden: "01", únor: "02", březen: "03", duben: "04", květen: "05", červen: "06",
  červenec: "07", srpen: "08", září: "09", říjen: "10", listopad: "11", prosinec: "12",
};

/** "červenec 2026" -> "2026-07-01" (day is unknown, so ISO 8601 falls back
    to the 1st — still valid for BlogPosting's datePublished). */
export function toISODate(czechDate: string): string {
  const [month, year] = czechDate.split(" ");
  return `${year}-${CZECH_MONTHS[month] ?? "01"}-01`;
}

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "cta"; text: string; href: string; label: string };

export interface Article {
  slug: string;
  cat: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  /** CSS object-position for the image crop; defaults to "center" */
  imagePosition?: string;
  alt: string;
  lead: string;
  blocks: ArticleBlock[];
  tags?: string[];
}

export const articles: Article[] = [
  {
    slug: "ai-ktera-neprekazi",
    cat: "AI · 5 min",
    date: "červenec 2026",
    title: "AI, která nepřekáží",
    excerpt: "Asistent má pomáhat, ne otravovat. Kdy se chatbot vyplatí a kdy je jen ozdoba.",
    image: "1604264849633-67b1ea2ce0a4",
    alt: "Pracovní stůl s monitorem, knihami a rostlinou",
    lead:
      "Skoro každá schůzka s klientem se dnes v nějakém bodě stočí k umělé inteligenci. Půlka lidí ji chce, protože ji má konkurence. Druhá půlka se bojí, že jim udělá z webu robota. Obě skupiny se přitom ptají špatně — otázka nezní jestli, ale kde.",
    blocks: [
      {
        type: "p",
        text: "Mám jednoduché pravidlo: technologie na webu má fungovat jako elektřina ve zdech. Je všude, bez ní to nejde, a přitom o ní celý den nevíte. Nikdo nechodí po domě a neobdivuje zásuvky. Stejně tak nemá návštěvník webu obdivovat AI — má jen zjistit, že věci jdou nějak podezřele hladce.",
      },
      { type: "h2", text: "Kdy se asistent vyplatí" },
      {
        type: "p",
        text: "Vezměte si restauraci. Ve tři odpoledne zvoní telefon a někdo se ptá, jestli máte v sobotu volný stůl pro šest lidí a jestli umíte bezlepkovou pizzu. Číšník zrovna nese čtyři talíře. Tenhle rozhovor umí asistent vyřídit celý — zdvořile, okamžitě a klidně o půlnoci. To není hračka, to je zaměstnanec navíc.",
      },
      {
        type: "p",
        text: "Dobrý asistent má jedno poznávací znamení: odpovídá z reálných dat. Zná váš jídelní lístek, otevírací dobu, ceník nebo stav objednávky. Neplácá obecné fráze posbírané po internetu. Typicky se vyplatí na čtyřech místech:",
      },
      {
        type: "list",
        items: [
          "Rezervace a objednávky mimo otevírací dobu",
          "Odpovědi na dotazy, které se opakují pořád dokola",
          "Navigace ve větším katalogu nebo ceníku",
          "První roztřídění poptávek, než se k nim dostanete vy",
        ],
      },
      { type: "h2", text: "Kdy je to jen ozdoba" },
      {
        type: "p",
        text: "A pak je tu druhý případ: bublina, která vyskočí tři vteřiny po načtení stránky a ptá se „Jak vám mohu pomoci?“, zatímco vy jen hledáte otevírací dobu. To není pomoc, to je figurant. Návštěvník mu nevěří, jednou se zeptá, dostane vyhýbavou odpověď — a víckrát to nezkusí.",
      },
      {
        type: "quote",
        text: "Nejlepší test: kdybych asistenta z webu zítra vypnul, všiml by si toho vůbec někdo? Pokud ne, nemá tam co dělat.",
      },
      { type: "h2", text: "AI v mé dílně" },
      {
        type: "p",
        text: "Používám ji i já při stavbě webů — přizná to málokdo, já klidně. Zrychlí mi rutinu: první nástřel textu, hledání chyby, nudné části kódu. Co jí ale nesvěřím, je rozhodování. AI neví, jak voní vaše pekárna v šest ráno, a nepozná, že tahle oranžová je přesně ta vaše. Vkus, výběr a odpovědnost zůstávají u člověka.",
      },
      {
        type: "p",
        text: "Takže až budete příště řešit, jestli na web chcete AI, zkuste otázku otočit: co konkrétně má za vás udělat? Když na to existuje jasná odpověď, postavím vám ji rád. Když ne, ušetřím vám peníze a řeknu vám to na rovinu.",
      },
    ],
  },
  {
    slug: "web-zacina-u-atmosfery",
    cat: "Esej · 8 min",
    date: "červen 2026",
    title: "Proč dobrý web začíná u atmosféry, ne u funkcí",
    excerpt: "Než otevřu editor, ptám se: jaký pocit má návštěvník mít? Funkce přijdou potom.",
    image: "1600453364898-255c24a205d2",
    alt: "Pracovní stůl ve večerním teplém světle lampy",
    lead:
      "Když vejdete do restaurace, rozhodnete se během pár vteřin, jestli se tu budete cítit dobře. Ještě jste nic neochutnali, neviděli jste lístek, neznáte ceny. Rozhodlo světlo, hudba, vůně a to, jak se na vás někdo podíval. Web funguje úplně stejně — jen ty vteřiny jsou ještě kratší.",
    blocks: [
      { type: "h2", text: "Pocit se rozhoduje dřív než rozum" },
      {
        type: "p",
        text: "Návštěvník si o vašem webu udělá úsudek dřív, než stihne přečíst první větu. Ne proto, že by byl povrchní — tak prostě funguje vnímání. Barvy, rozložení a písmo zpracuje mozek dřív než obsah. Než dočtete tento odstavec, rozhodly se už desítky lidí někde jinde, jestli zůstanou, nebo odejdou.",
      },
      {
        type: "p",
        text: "Proto mi přijde zvláštní, že se většina zadání webu píše jako seznam funkcí: rezervační formulář, galerie, mapa, kontakt. Všechno důležité věci. Ale žádná z nich neodpovídá na otázku, proč by tam měl člověk vůbec zůstat.",
      },
      { type: "h2", text: "Z čeho se atmosféra staví" },
      {
        type: "p",
        text: "Atmosféra zní jako mlhavé slovo, ale staví se z velmi konkrétních věcí:",
      },
      {
        type: "list",
        items: [
          "Teplota barev — jestli stránka působí jako večer u lampy, nebo jako čekárna",
          "Písmo — jiným hlasem mluví patková elegance, jiným tučný plakát",
          "Tempo — kolik toho na člověka vybalíte najednou a kolik necháte na později",
          "Fotky — jedna opravdová fotka řekne víc než tři odstavce textu",
          "Ticho — prázdné místo na stránce je pauza v hudbě, ne plýtvání",
        ],
      },
      {
        type: "quote",
        text: "Funkce si návštěvník zapamatuje málokdy. Pocit si zapamatuje vždycky.",
      },
      { type: "h2", text: "Funkce přijdou potom — a snadněji" },
      {
        type: "p",
        text: "Tohle není manifest proti funkcím. Rezervace, objednávky i formuláře stavím rád a pořádně. Jde o pořadí. Když nejdřív víte, jak má web dýchat, funkce do něj zapadnou přirozeně — víte, kde má formulář být, jak má vypadat a co má říkat tlačítko. Když začnete funkcemi, vyjde vám sklad. Funkční, ale nikdo v něm nechce bydlet.",
      },
      {
        type: "p",
        text: "V praxi to znamená, že první schůzka se mnou nevypadá jako výslech ohledně technologií. Ptám se, jak má zákazník od vás odcházet. Co má cítit, když web zavře. Zní to možná měkce, ale je to nejtvrdší zadání, jaké znám — a jediné, které se pak dá poznat z výsledku.",
      },
    ],
  },
  {
    slug: "rychlost-je-zdvorilost",
    cat: "Vývoj · 6 min",
    date: "květen 2026",
    title: "Rychlost je zdvořilost",
    excerpt: "Každá vteřina načítání je test trpělivosti. Jak držím weby svižné bez kompromisů.",
    image: "1560890264-4b92305ee66e",
    alt: "Notebook na dřevěném stole v útulné chatě",
    lead:
      "Nikdo vám nenapíše, že máte pomalý web. Prostě odejde. Každá vteřina načítání je malý test trpělivosti, ke kterému se návštěvník nepřihlásil — a který za vás potichu rozhoduje o zakázkách.",
    blocks: [
      { type: "h2", text: "Co pomalý web říká mezi řádky" },
      {
        type: "p",
        text: "Rychlost není technický parametr, je to způsob chování. Pomalý web říká návštěvníkovi totéž, co prodavač, který vás nechá pět minut stát u pultu: váš čas mě nezajímá. Nikdo si to takhle vědomě nepřeloží, ale ten pocit zůstane. A obráceně — web, který reaguje okamžitě, působí jako podnik, kde věci fungují.",
      },
      {
        type: "p",
        text: "Čísla jsou v tomhle neúprosná. Většina lidí opustí mobilní stránku, která se načítá déle než pár vteřin. Druhou šanci vám nedají, protože nemusí — konkurence je jedno klepnutí daleko.",
      },
      { type: "h2", text: "Jak držím weby svižné" },
      {
        type: "p",
        text: "Žádné kouzlo, spíš disciplína. Pár věcí, které dělám u každého webu:",
      },
      {
        type: "list",
        items: [
          "Obrázky posílám v moderních formátech a přesně v té velikosti, v jaké se zobrazí",
          "Písma hostuju u sebe a načítám jen řezy, které web opravdu používá",
          "JavaScript přidávám, až když si to zaslouží — každá knihovna se musí obhájit",
          "Co není vidět hned, se načítá později; co je vidět hned, má přednost",
          "Testuju na levném telefonu a pomalé síti, ne na vývojářském stroji s optikou",
        ],
      },
      {
        type: "quote",
        text: "Nejrychlejší kód je ten, který jsem vůbec nemusel napsat.",
      },
      { type: "h2", text: "Rychlost se navrhuje, neopravuje" },
      {
        type: "p",
        text: "Nejdůležitější rozhodnutí o rychlosti nepadají při optimalizaci na konci, ale při návrhu na začátku. Video přes celou obrazovku, pět animačních knihoven a karusel s dvaceti fotkami — to se pak už jen těžko zachraňuje. Svižnost je návrhové rozhodnutí: co na stránce být musí, co unese a co je jen balast, který by návštěvník stejně přeskočil.",
      },
      {
        type: "p",
        text: "Výsledek se nedá okecat. Web buď odsýpá, nebo ne — a pozná to každý, i když neumí říct proč. Právě proto řeším rychlost dřív, než klient vůbec ví, že by ji měl chtít. Je to zdvořilost, kterou na první pohled nikdo nevidí. Jen web najednou působí… slušně vychovaně.",
      },
    ],
  },
  {
    slug: "kolik-stoji-web",
    cat: "Byznys · 6 min",
    date: "červenec 2026",
    title: "Kolik stojí web v roce 2026 (a proč je to špatná otázka)",
    excerpt: "Cena webu není jedno číslo. Je to součet rozhodnutí, která ještě nikdo neudělal — dokud si nepromluvíme.",
    image: "1560415903-cca53660d61d",
    imagePosition: "center 85%",
    tags: ["cena"],
    alt: "Starý psací stroj a stolní lampa v teplém přítmí",
    lead:
      "Kolikrát mi tuhle otázku položili už při prvním hovoru, ještě než jsem věděl, co vlastně chcete postavit. Chápu to — potřebujete si to nějak zaškatulkovat. Jenže „web“ není jednotka, po které se ptáte v pekárně. Je to rozsah práce, který se teprve musí definovat.",
    blocks: [
      { type: "h2", text: "Proč se ptáte špatně" },
      {
        type: "p",
        text: "Zeptat se „kolik stojí web“ je jako zeptat se „kolik stojí dům“. Chatka na zahradě i vila se čtyřmi patry jsou obě „dům“. Rozdíl dělá všechno kolem toho slova — a u webu je to úplně stejné.",
      },
      {
        type: "p",
        text: "Vizitka na pár odstavců textu a rezervační systém napojený na platební bránu mají společné jedno: obojí běží v prohlížeči. Jinak nemají skoro nic společného — ani čas, ani náročnost, ani cenu.",
      },
      { type: "h2", text: "Co skutečně určuje cenu" },
      {
        type: "list",
        items: [
          "Kolik podstránek a funkcí web potřebuje",
          "Jestli existuje obsah a grafika, nebo se tvoří od nuly",
          "Jak moc je řešení na míru — administrace, AI, platby, propojení na jiné systémy",
          "Jak rychle to musí být hotové",
        ],
      },
      {
        type: "quote",
        text: "Cena webu se nedá spočítat z názvu projektu. Dá se spočítat jen z toho, co má web umět.",
      },
      { type: "h2", text: "Proč radši mluvím, než počítám" },
      {
        type: "p",
        text: "Mohl bych na web hodit tabulku s čísly a nechat vás hádat, do které kolonky zapadáte. Skoro vždycky by to bylo špatně — buď byste přeplatili za jednoduchý web, nebo doplatili na to, že vaše „jednoduché“ zadání jednoduché vůbec nebylo.",
      },
      {
        type: "p",
        text: "Proto radši nejdřív slyším, co potřebujete. Trvá to pár vět z vaší strany a pár otázek z mé — a na konci dostanete číslo, které sedí na váš projekt, ne na průměr trhu.",
      },
      {
        type: "cta",
        text: "Chcete vědět, jak k té ceně doopravdy docházím?",
        href: "/cena",
        label: "Cena je rozhovor",
      },
    ],
  },
  {
    slug: "proc-nemam-cenik",
    cat: "Esej · 5 min",
    date: "červenec 2026",
    title: "Proč nemám ceník",
    excerpt: "Ceník by mi ušetřil pár e-mailů. Rozhodl jsem se ho i tak nemít — a tady je proč.",
    image: "1661956602868-6ae368943878",
    tags: ["cena"],
    alt: "Šálek kávy vedle notebooku a diáře na pracovním stole",
    lead:
      "Občas mi někdo napíše, ať prostě dám na web tabulku s cenami, ať to zjednoduším. Rozumím tomu popudu — sám mám radši weby, které říkají věci na rovinu. Jenže ceník by tady na rovinu neříkal nic. Říkal by jen půlku pravdy.",
    blocks: [
      { type: "h2", text: "Co ceník slibuje a co nedokáže splnit" },
      {
        type: "p",
        text: "Ceník vypadá jako transparentnost. Ve skutečnosti je to zjednodušení, které funguje jen tehdy, když všichni klienti chtějí skoro to samé. U agentury s balíčky služeb to dává smysl. U mě šablona není ani ve výsledku, natož v ceně.",
      },
      {
        type: "p",
        text: "Kdybych napsal „web od 15 000 Kč“, bude to pravda pro někoho a lež pro někoho jiného — a vy byste to nepoznali, dokud byste mi nenapsali a nezjistili, do které skupiny patříte. Takže tu zprávu radši čekám rovnou, jen bez zavádějícího čísla nad ní.",
      },
      { type: "h2", text: "Přímý kontakt bez agenturní vrstvy" },
      {
        type: "p",
        text: "Nejsem agentura s ceníkem služeb a obchodním oddělením mezi vámi a tím, kdo web skutečně staví. Jsem jeden člověk, který se s vámi baví o projektu a pak ho postaví. Cena vychází z toho rozhovoru, ne z ceníku vytištěného před rokem pro úplně jiné klienty.",
      },
      {
        type: "quote",
        text: "Ceník je odpověď na otázku, kterou jste ještě nepoložili. Radši slyším tu vaši.",
      },
      { type: "h2", text: "Co tím získáváte vy" },
      {
        type: "p",
        text: "Žádné škatulkování do balíčků, které vám buď nesedí, nebo vás nutí platit za funkce, které nepotřebujete. Popíšete projekt tak, jak ho vidíte vy, a já vám řeknu, co reálně obnáší — časově i finančně.",
      },
      {
        type: "cta",
        text: "Chcete vidět, co přesně cenu ovlivňuje?",
        href: "/cena",
        label: "Cena je rozhovor",
      },
    ],
  },
  {
    slug: "co-je-v-cene-webu",
    cat: "Vývoj · 7 min",
    date: "červenec 2026",
    title: "Co všechno je v ceně webu, o kterém se obvykle nemluví",
    excerpt: "Cena webu není jen sazba za hodiny u klávesnice. Hosting, doména, údržba i SEO základ — co všechno se schovává pod jedním číslem.",
    image: "1761322572550-967ea8c0bfd9",
    tags: ["cena"],
    alt: "Otevřený zápisník s perem a tužkami na dřevěném stole",
    lead:
      "Když klient slyší cenu za web, málokdy se ptá, co všechno je v ní schované. A přitom je to fér otázka — protože „web“ nekončí ve chvíli, kdy ho spustíte. Tady je seznam věcí, které se do ceny počítají, i když je na první pohled nevidíte.",
    blocks: [
      { type: "h2", text: "Co se stane před spuštěním" },
      {
        type: "list",
        items: [
          "Návrh struktury a obsahu, ne jen „nakódování“",
          "Texty a jejich sladění s tím, jak má firma znít",
          "SEO základ — meta popisky, rychlost, mobilní verze — od prvního řádku, ne jako dodatečná služba",
          "Testování na různých telefonech a prohlížečích, ne jen na mém monitoru",
        ],
      },
      { type: "h2", text: "Co se řeší po spuštění" },
      {
        type: "p",
        text: "Doména a hosting jsou obvykle oddělená položka, kterou platíte přímo poskytovateli — pomůžu je vybrat a nastavit, ale nejsou schované v ceně webu. Údržba je jiná věc: opravy, drobné úpravy, obnova po výpadku. Řeknu vám předem, jestli váš web nějakou pravidelnou péči potřebuje a kolik by stála — žádná položka, na kterou přijdete až po faktuře.",
      },
      {
        type: "quote",
        text: "Web, který jen „existuje“, a web, který vám přivádí zákazníky, se liší v detailech, které nejsou vidět na první pohled — a přesně tam mizí většina rozpočtu.",
      },
      { type: "h2", text: "Proč o tom mluvím dopředu" },
      {
        type: "p",
        text: "Nerad bych, aby vás cena po měsíci provozu překvapila položkou, o které jste nevěděli. Radši to projdeme hned na začátku — co je jednorázové, co se opakuje a co si klidně můžete zajistit sami.",
      },
      {
        type: "cta",
        text: "Chcete vidět, jak celý rozhovor o ceně probíhá?",
        href: "/cena",
        label: "Cena je rozhovor",
      },
    ],
  },
];
