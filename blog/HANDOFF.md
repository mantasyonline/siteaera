# Blog AERA — Handoff Técnico

> Pacote de design pronto para implementação. Direção visual escolhida: **Horizonte Cinematográfico** (Home V1).

---

## 1. O que é este blog

Um blog editorial para AERA — Soluções Ambientais e Sustentáveis. A direção visual evoca a sensação de **vista aérea** (voar de avião, estrada cênica), com tom **clean, ambiental e tecnológico** ao mesmo tempo. Sem rusticidade. Conexão com o meio ambiente através de altitude, horizonte e atmosfera — não através de folhagem ou madeira.

**Identidade:**
- Paleta 100% conforme brand-guide AERA (Azul `#1877F2`, Navy `#0A1628`, Verde `#22C55E`)
- Tipografia única: **Inter** (Google Fonts), pesos 400–900
- Imagens: fotos aéreas reais (céu, horizonte, paisagens vistas do alto, estradas)
- Detalhes "tech": coordenadas, dados ambientais (ppm CO₂, altitude) em fonte monoespaçada como decoração editorial
- Linhas topográficas sutis como elementos de composição

---

## 2. Arquivos para mandar ao Antigravity

### Arquivos de design (referência visual)
Estes são os mockups React/JSX que você usa como **referência de design**. Não são para produção — são o "Figma" do projeto.

| Arquivo | Função |
|---|---|
| `Blog AERA.html` | Mockup principal — abre o canvas com todos os designs |
| `blog-shared.jsx` | Tokens da marca, ícones, dados de exemplo, placeholders aéreos |
| `blog-home-cinema.jsx` | **Home V1 — o design escolhido** |
| `blog-home-editorial.jsx` | Home V2 (alternativa, ignorar para produção) |
| `blog-post.jsx` | Página de artigo + sistema de comentários |
| `blog-search.jsx` | Tela de busca |

### Arquivos de infraestrutura (NÃO mandar)
Estes são apenas para o ambiente de design — descarte:
- `design-canvas.jsx`, `tweaks-panel.jsx` — chrome do canvas
- `uploads/brand-guide.html` — referência interna

---

## 3. Telas a implementar

### 3.1 Home (`/blog`)
Referência: `blog-home-cinema.jsx` — função `HomeCinema`

**Estrutura (de cima para baixo):**
1. **Nav** — sticky, transparente sobre o hero, fica sólido ao rolar. Logo + chip "BLOG" + links de editoria + busca (⌘K) + CTA "Acessar AERA APP"
2. **Hero full-bleed** (720px de altura) — foto aérea + overlay de gradiente escuro inferior + coordenadas no canto superior direito + chip "Em destaque · ESG" + título grande (72px/800) + excerpt + meta + CTA "Ler artigo completo"
3. **Strip de categorias** (sticky abaixo do nav) — filtros de editoria
4. **Artigo secundário** — split 1.2fr/1fr, imagem + texto lateral
5. **Grid de posts** — 3 colunas, card "tall" no primeiro, depois cards normais
6. **Newsletter band** — fundo navy com foto aérea de fundo, formulário translúcido
7. **Footer** — 4 colunas (marca + 3 colunas de links) + linha de copyright

### 3.2 Página de Artigo (`/blog/[slug]`)
Referência: `blog-post.jsx` — função `PostPage`

**Estrutura:**
1. Barra de progresso de leitura (3px, fixed top, azul, anima conforme scroll)
2. Nav (mesma da Home, modo claro)
3. Botão "Voltar ao blog"
4. Header centralizado — categoria + título 48px/800 + lead + linha de autor com avatar/data/tempo de leitura + ações (curtir/salvar/compartilhar)
5. Hero image — 16:8, com badge de coordenadas no canto
6. Corpo do artigo — coluna de 680px, parágrafos 18px/1.75. Tipos de bloco: `lead`, `p`, `h2`, `quote`, `list`, `numlist`
7. Tags do post (chips)
8. Card do autor
9. Sistema de comentários (composer + lista com replies em thread)
10. "Continue lendo" (3 posts relacionados)
11. Newsletter band + Footer

### 3.3 Tela de Busca (`/blog/busca`)
Referência: `blog-search.jsx` — função `SearchPage`

**Estrutura:**
1. Header sticky com logo + chip "BUSCA" + botão "Esc"
2. Input gigante 48px/700 com sublinhado grosso, ícone de lupa à direita
3. Filtros por categoria (chips)
4. Trending searches (quando vazio)
5. Lista de resultados — thumb 120px + título + excerpt + tempo de leitura. Highlight do termo buscado.

---

## 4. Sistema de Design

### 4.1 Tokens (CSS Custom Properties recomendado)

```css
:root {
  /* Cores AERA */
  --blue: #1877F2;
  --blue-dark: #1462CC;
  --navy: #0A1628;
  --green: #22C55E;
  --bg: #F8FAFE;
  --bg-alt: #F0F4FB;
  --border: #E2E8F0;
  --text-primary: #0F172A;
  --text-secondary: #334155;
  --text-muted: #475569;
  --text-dim: #94A3B8;

  /* Tipografia */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', Menlo, monospace;

  /* Layout */
  --max-w: 1280px;
  --max-w-text: 680px;     /* coluna de leitura */
  --max-w-search: 960px;
  --pad-x: 48px;

  /* Radii */
  --r-sm: 4px;
  --r-md: 8px;
  --r-lg: 12px;
  --r-pill: 999px;
}
```

### 4.2 Categorias

```js
const CATEGORIES = [
  { id: 'sustentabilidade', name: 'Sustentabilidade', color: '#22C55E' },
  { id: 'meio-ambiente',    name: 'Meio Ambiente',    color: '#0EA5A4' },
  { id: 'esg',              name: 'ESG',              color: '#1877F2' },
  { id: 'certificacoes',    name: 'Certificações',    color: '#7C3AED' },
  { id: 'residuos',         name: 'Gestão de Resíduos', color: '#F59E0B' },
];
```

### 4.3 Tipografia (escala)

| Uso | Tamanho | Peso | Line | Letter |
|---|---|---|---|---|
| Hero H1 | 72px | 800 | 1.05 | -0.025em |
| Article H1 | 48px | 800 | 1.12 | -0.025em |
| Section H2 | 36–52px | 700–800 | 1.1 | -0.02em |
| Article H2 (corpo) | 30px | 700 | 1.2 | -0.015em |
| Card title | 20–24px | 700 | 1.25 | -0.015em |
| Lead | 20–22px | 400–500 | 1.55 | -0.005em |
| Body | 18px | 400 | 1.75 | 0 |
| Meta/UI | 12–14px | 400–600 | 1.5 | 0 |
| Eyebrow/tag | 11px | 700 | 1 | 0.12em uppercase |
| Mono (data) | 10–12px | 400 | 1.5 | 0.08em |

---

## 5. Imagens — guideline

> O design usa placeholders SVG gerados (gradiente + linhas topográficas) na referência. **Em produção, substituir por fotos reais.**

**Critérios de seleção:**
- Vista aérea (drone, avião, montanha) — horizonte sempre visível
- Paletas frias e atmosféricas: céus, oceano, neblina, alvorada, estradas longas
- Evitar: closes de folhas, fotos de lixo, paisagens "rústicas", clichês de sustentabilidade
- Sempre adicionar overlay escuro `linear-gradient(180deg, rgba(10,22,40,0.15) 0%, rgba(10,22,40,0.7) 100%)` no hero para legibilidade do texto
- Aspect ratios: hero `16:8` ou full-height (720px), cards `4:3`, "tall" `4:5`

**Banco de imagens sugerido:** Unsplash com termos: *aerial view brazil*, *highway aerial*, *mountain horizon*, *cloud above*, *coastline aerial*, *foggy mountains*.

---

## 6. Componentes-chave para implementar

Liste estes para o Antigravity:

- `<Nav>` — sticky, modo claro/transparente, com busca ⌘K
- `<Hero>` — full-bleed com overlay de coordenadas e gradiente
- `<CategoryStrip>` — sticky de filtros
- `<PostCard>` — variantes `default` e `tall`
- `<SecondaryFeature>` — split image+text
- `<NewsletterBand>` — com estado de sucesso
- `<Footer>` — 4 colunas
- `<ReadingProgress>` — barra fixa no topo
- `<ArticleBody>` — renderizador dos blocos (lead/p/h2/quote/list/numlist)
- `<Comments>` — composer + threading + curtir
- `<SearchOverlay>` — input grande, filtros, resultados com highlight
- `<CoordinatesBadge>` — bloco monoespaçado para sobrepor imagens
- `<TopoLines>` — SVG decorativo de linhas topográficas

---

## 7. Comportamentos / interações

- Cards e títulos: hover aplica `text-decoration: underline` em azul AERA com `text-underline-offset: 4px`
- Imagens em cards: hover aplica `transform: scale(1.04)` com transição `.6s cubic-bezier(.2,.7,.3,1)` (parent com `overflow: hidden`)
- Newsletter: validação de email, estado de sucesso com check verde
- Busca: foco automático no input, fechar com Esc, debounce no filtro
- Comentários: postar adiciona ao topo da lista, responder abre composer inline
- Reading progress: calcular pelo `getBoundingClientRect()` do article ref, atualizar em scroll passivo

---

## 8. Stack sugerida para implementação

Como o design já está em React, recomendamos para produção:
- **Next.js 14+ App Router** (SSR, SEO, sitemap)
- **MDX** para conteúdo dos posts (suporta os blocos custom)
- **Tailwind CSS** com extensão das cores AERA OU CSS Modules com variáveis
- **CMS opcional**: Contentlayer, Sanity, Notion API ou MDX local
- **Newsletter**: integrar Resend / ConvertKit / Substack API

Se preferir manter em outro stack (Astro, Remix, etc.) o design é portável — só HTML+CSS+JSX.

---

## 9. Prompt sugerido para Antigravity

> "Implemente o blog AERA seguindo o design do arquivo `blog-home-cinema.jsx` (Home), `blog-post.jsx` (página de artigo) e `blog-search.jsx` (busca). Use Next.js 14 App Router, Tailwind CSS, e MDX para os posts. Os tokens da marca estão em `blog-shared.jsx` (constante `BRAND` e `CATEGORIES`). Tipografia: Inter via next/font. Substitua os componentes `AerialPlaceholder` por `next/image` com fotos aéreas reais — eu vou fornecer as URLs. Mantenha estritamente: paleta de cores, espaçamentos, tipografia, comportamentos de hover, sticky nav, reading progress bar, sistema de comentários funcional, e a sensação atmosférica/aérea no hero."

---

## 10. Checklist de paridade

Use isto para validar a implementação contra o design:

- [ ] Hero: 720px de altura, foto + gradiente + coordenadas + título 72px + CTA
- [ ] Nav: sticky, fica sólido após hero, ⌘K abre busca
- [ ] Categorias: chips/strip sticky logo abaixo do nav
- [ ] Grid de posts: 3 colunas, primeiro card "tall" (4:5), demais 4:3
- [ ] Newsletter band: navy + foto aérea + form translúcido + estado de sucesso
- [ ] Footer: 4 colunas + copyright
- [ ] Article: barra de progresso + lead + corpo 680px + autor card + comentários
- [ ] Comentários: composer, lista, curtir, responder em thread
- [ ] Busca: overlay full-screen, input grande, filtros, highlight
- [ ] Cores: somente paleta AERA do brand-guide
- [ ] Fonte: Inter exclusivamente
- [ ] Hover states: underline azul nos títulos, scale .04 nas imagens
- [ ] Mobile responsivo: nav colapsa, grid vira 1 coluna, hero ajusta título
