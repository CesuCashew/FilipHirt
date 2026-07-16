export const img = (id: string, w = 760) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface Article {
  slug: string;
  cat: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  lead: string;
  blocks: ArticleBlock[];
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
];
