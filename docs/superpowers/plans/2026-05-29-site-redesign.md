# Ever Guild Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Сильный рестайл лендинга Ever Guild в стиле «engineering console / blueprint» – единая сетка, типографика, система кнопок, переработанные карточки, протянутый визуальный язык и продающий текст, строго в палитре брендбука.

**Architecture:** Сначала фундамент (токены из брендбука, сетка/blueprint-миксины, fallback reveal), затем UI-примитивы (Button, Section, SectionHeader), затем посекционное применение (Navbar→Hero→About→Team→Services→Contact→Footer), в конце – протяжка визуального мотива и финальная верификация.

**Tech Stack:** React 19, Vite 7, SCSS (sass), three / @react-three/fiber, lucide-react / react-icons.

**Верификация (адаптация под визуальный домен):** тестов нет – каждый шаг проверяется `npm run build` (TS + сборка) и при необходимости скриншотом `node .shot-dev.mjs` (desktop 1440 + mobile 390, reveal отключён) с визуальным осмотром. Палитра – только токены из `docs/brandbook.md`.

**Источники истины:**
- Спека: `docs/superpowers/specs/2026-05-29-site-redesign-design.md`
- Брендбук: `docs/brandbook.md`

---

## File Structure

- `src/styles/_variables.scss` – токены (цвета по брендбуку, типошкала, роли шрифтов, контраст).
- `src/styles/_mixins.scss` – миксины: container/grid, index-маркер, button-варианты, blueprint-линии, reveal + fallback.
- `src/styles/_reset.scss` – keyframes/база (правка fallback при необходимости).
- `src/App.scss` – blueprint-фон страницы, вертикальный ритм.
- `src/components/ui/Button.{tsx,scss}` – система кнопок (primary/secondary/ghost, sm/md/lg).
- `src/components/ui/Section.{tsx,scss}` – обёртка с index-колонкой и сеткой.
- `src/components/ui/SectionHeader.{tsx,scss}` – mono-индекс + display-заголовок + lead.
- `src/components/sections/*.{tsx,scss}` – применение сетки/карточек/кнопок + новый копирайтинг.
- `src/components/three/*` – лёгкая протяжка мотива (без новой сцены).

---

## Task 1: Синхронизировать токены с брендбуком

**Files:**
- Modify: `src/styles/_variables.scss`
- Reference: `docs/brandbook.md`

- [ ] **Step 1: Прочитать текущий `_variables.scss` и брендбук**, сверить цвета.
- [ ] **Step 2:** Привести цветовые токены в точное соответствие брендбуку (ядро: `#FFE79C`, `#F1B800`, `#002835`, `#442801`, `#381E00`; промежуточные `#F0B800`, `#FFE89E`; производные surface/bg уже выведены). Убедиться, что нет «левых» hex вне брендбука.
- [ ] **Step 3:** Поднять контраст текста: проверить `$color-text-2` (#9FB1AF) и `$color-text-3` (#889995) на фоне `#001D25`/`#002835`. Для основного body-текста использовать токены ≥ AA (4.5:1); приглушённые оставить только для крупного/декоративного. При нехватке – осветлить значения, сохранив тил-оттенок.
- [ ] **Step 4:** Зафиксировать роли шрифтов комментариями (display=Tilt Warp, mono=JetBrains Mono, body=Hanken Grotesk) – уже заданы, выверить.
- [ ] **Step 5: Verify:** `npm run build` → PASS.
- [ ] **Step 6: Commit:** `git add -A && git commit -m "style(tokens): sync palette with brandbook, fix text contrast"`

---

## Task 2: Сетка, blueprint-фон и fallback для reveal

**Files:**
- Modify: `src/styles/_mixins.scss`, `src/App.scss`, `src/styles/_reset.scss`

- [ ] **Step 1:** Добавить миксин `grid-12` (CSS Grid, 12 колонок, gap, max-width $container-max, gutter) и миксин `section-rhythm` (вертикальные паддинги через `clamp()`), чтобы убрать рваные пустоты.
- [ ] **Step 2:** Добавить миксин `blueprint-lines` – тонкие вертикальные hairline-линии (`$color-border`) как фон страницы/секций (через `background-image: linear-gradient(...)` или псевдоэлементы), дёшево и без DOM-мусора.
- [ ] **Step 3:** Обновить миксин `reveal`: гарантировать fallback – вне `@supports (animation-timeline: view())` и при `prefers-reduced-motion: reduce` контент `opacity:1; transform:none`.
- [ ] **Step 4:** Применить blueprint-фон в `App.scss`, выровнять глобальный вертикальный ритм.
- [ ] **Step 5: Verify:** `npm run build` → PASS; `node .shot-dev.mjs` → проверить фон-линии и ритм.
- [ ] **Step 6: Commit:** `git commit -am "style(layout): add 12-col grid, blueprint background, reveal fallback"`

---

## Task 3: Система кнопок

**Files:**
- Modify: `src/components/ui/Button.tsx`, `src/components/ui/Button.scss`

- [ ] **Step 1:** Прочитать текущий `Button.tsx`/`.scss` (props variant/size/href уже используются в Hero).
- [ ] **Step 2:** Реализовать 3 варианта: `primary` (фон `$color-accent`, текст `$color-on-accent`), `secondary` (прозрачный фон, бордер `$color-border-2`/`$color-border-3`, текст cream), `ghost`/`link` (mono uppercase + стрелка). Размеры `sm`/`md`/`lg`.
- [ ] **Step 3:** Состояния: hover (secondary → золотая кромка `$color-border-3`; primary → `$color-accent-2`), active, и `:focus-visible` золотое кольцо.
- [ ] **Step 4:** Подписи кнопок – JetBrains Mono, uppercase, трекинг `$tracking-wide`.
- [ ] **Step 5: Verify:** `npm run build` → PASS; скриншот героя – 2 кнопки в новых стилях.
- [ ] **Step 6: Commit:** `git commit -am "feat(ui): button system (primary/secondary/ghost) with focus-visible"`

---

## Task 4: Section + SectionHeader (index-колонка)

**Files:**
- Modify: `src/components/ui/Section.{tsx,scss}`, `src/components/ui/SectionHeader.{tsx,scss}`

- [ ] **Step 1:** Прочитать текущие `Section`/`SectionHeader`.
- [ ] **Step 2:** В `Section` добавить опц. props `index?: string` и `label?: string`; разметка – `grid-12` с левой index-колонкой (mono-маркер `01 – ABOUT`, sticky/выровнен сверху), контент в правых колонках. На мобайле index становится строкой над контентом.
- [ ] **Step 3:** В `SectionHeader` – mono-eyebrow (опц.), display-заголовок (Tilt Warp, $text-4xl/5xl, трекинг tight), lead (Hanken, $text-lg, контрастный токен).
- [ ] **Step 4:** Прокинуть `index`/`label` из секций (About=01, Team=02, Services=03, Contact=04) – обновить вызовы в секциях минимально (только props).
- [ ] **Step 5: Verify:** `npm run build` → PASS; скриншот – у секций видны индексы и асимметрия.
- [ ] **Step 6: Commit:** `git commit -am "feat(ui): section index column + header hierarchy"`

---

## Task 5: Navbar – рестайл + единый CTA

**Files:**
- Modify: `src/components/sections/Navbar.{tsx,scss}`

- [ ] **Step 1:** CTA `Get in Touch` → `Start a project`; использовать примитив `Button` (variant primary, size sm) вместо кастомного `navbar__cta`.
- [ ] **Step 2:** Линки навбара – выровнять под mono/нав-типографику, состояние hover/active с золотым акцентом, focus-visible.
- [ ] **Step 3:** Выверить `navbar--scrolled` фон/бордер по токенам брендбука; мобильное меню – отступы/контраст.
- [ ] **Step 4: Verify:** `npm run build` → PASS; скриншоты desktop+mobile (меню открыто).
- [ ] **Step 5: Commit:** `git commit -am "feat(navbar): unified CTA + restyle"`

---

## Task 6: Hero – рестайл + копирайтинг

**Files:**
- Modify: `src/components/sections/Hero.{tsx,scss}`

- [ ] **Step 1:** Текст: eyebrow → `Senior-led · Remote-first · Since 2021`; description → `Senior engineers who ship Web3, AI and full-stack products built to survive production – and stay maintainable long after launch`; tagline оставить.
- [ ] **Step 2:** Типографика героя: tagline Tilt Warp, контроль размеров `clamp()` (до $text-6xl), трекинг tight; eyebrow mono uppercase.
- [ ] **Step 3:** Кнопки – через обновлённый `Button`; выровнять hero__actions, отступы, socials (mono-подписи/иконки) по сетке.
- [ ] **Step 4:** Слой WebGL-поля под контентом – проверить z-index/читабельность текста (при необходимости лёгкая подложка по токену, без glow).
- [ ] **Step 5: Verify:** `npm run build` → PASS; скриншоты desktop+mobile.
- [ ] **Step 6: Commit:** `git commit -am "feat(hero): restyle + selling copy"`

---

## Task 7: About – spec-полоса + копирайтинг

**Files:**
- Modify: `src/components/sections/About.{tsx,scss}`

- [ ] **Step 1:** Текст: title → `Senior engineers, end to end – no hand-offs to juniors`; lead → `We take Web3 infrastructure, AI products and full-stack platforms from idea to production – and keep them running clean, without the technical debt that slows you down later`
- [ ] **Step 2:** `about__facts` → плотная «spec-полоса»: mono-лейбл (`$color-text-3`) + крупное значение (display/cream), hairline-разделители между, золотой тик-акцент у каждого.
- [ ] **Step 3:** Применить index `01`/label через `Section`.
- [ ] **Step 4: Verify:** `npm run build` → PASS; скриншот секции.
- [ ] **Step 5: Commit:** `git commit -am "feat(about): spec strip + selling copy"`

---

## Task 8: Team – карточки с иерархией

**Files:**
- Modify: `src/components/sections/Team.{tsx,scss}`

- [ ] **Step 1:** Текст title → `The senior engineers you'll work with directly`
- [ ] **Step 2:** Карточка: имя крупнее (display), роль в mono uppercase ($color-accent/text-3), bio body-контраст; единый стиль аватара (рамка/радиус по токенам).
- [ ] **Step 3:** Hover-состояние: подъём (`translateY`) + золотая кромка `$color-border-3`, плавность `$transition-base`. GitHub-ссылка – стиль ghost-link.
- [ ] **Step 4:** Применить index `02`/label.
- [ ] **Step 5: Verify:** `npm run build` → PASS; скриншот (+ hover вручную в браузере при ревью).
- [ ] **Step 6: Commit:** `git commit -am "feat(team): card hierarchy + hover + copy"`

---

## Task 9: Services – нумерованные карточки + чипы + копирайтинг

**Files:**
- Modify: `src/components/sections/Services.{tsx,scss}`

- [ ] **Step 1:** Текст title → `What we build for you`; описания услуг заострить под выгоду, факты (TON/EVM/NEAR, LLM/агенты, React/Next/Node, дизайн) сохранить.
- [ ] **Step 2:** Карточки `01`–`04`: mono-индекс в углу, золотая верхняя hairline, заголовок display, hover-состояние (фон `$color-surface-2`, кромка).
- [ ] **Step 3:** Tech-стек → mono-чипы (бордер `$color-border`, uppercase/трекинг, hover-золото).
- [ ] **Step 4:** Применить index `03`/label.
- [ ] **Step 5: Verify:** `npm run build` → PASS; скриншот секции (desktop 2-кол + mobile 1-кол).
- [ ] **Step 6: Commit:** `git commit -am "feat(services): numbered cards + mono chips + copy"`

---

## Task 10: Contact + Footer

**Files:**
- Modify: `src/components/sections/Contact.{tsx,scss}`, `src/components/sections/Footer.{tsx,scss}`

- [ ] **Step 1:** Contact note → `Tell us what you're building, we reply within a day` Большой e-mail – усилить как фокус (display, hover золотой + стрелка), index `04`.
- [ ] **Step 2:** Footer – выверить тёплую зону (`$color-warm-deep`/`#442801`), wordmark, socials, контраст meta-текста по токенам.
- [ ] **Step 3: Verify:** `npm run build` → PASS; скриншоты.
- [ ] **Step 4: Commit:** `git commit -am "feat(contact,footer): focal email + warm anchor polish"`

---

## Task 11: Протяжка визуального языка

**Files:**
- Modify: `src/components/three/*`, секционные `.scss`

- [ ] **Step 1:** Прочитать текущие three-компоненты (`Scene`, `InfinityField`), понять, как переиспользовать дёшево.
- [ ] **Step 2:** Добавить эхо мотива минимум в 2 зоны: разделители секций (CSS-частицы/линии) и фон Contact (лёгкое поле или статичный motif), без второй тяжёлой WebGL-сцены, с уважением `prefers-reduced-motion`.
- [ ] **Step 3: Verify:** `npm run build` → PASS; скриншот full-page – мотив прослеживается, производительность ок.
- [ ] **Step 4: Commit:** `git commit -am "feat(visual): carry hero motif across sections"`

---

## Task 12: Финальная верификация

**Files:** –

- [ ] **Step 1:** `npm run build` → PASS (типы + сборка чистые).
- [ ] **Step 2:** `node .shot-dev.mjs` – desktop 1440 + mobile 390 (reveal отключён) – осмотреть все секции на ритм, иерархию, контраст, единый CTA.
- [ ] **Step 3:** Проверить контраст ключевых пар (body/lead/labels) – AA для основного контента.
- [ ] **Step 4:** Проверить reduced-motion: контент виден, анимации отключаются.
- [ ] **Step 5:** Сверить с критериями готовности спеки – отметить выполнение каждого.
- [ ] **Step 6: Commit:** `git commit -am "chore: final redesign verification"` (если остались правки).

---

## Self-Review (план против спеки)

- Сетка/ритм → Task 2, 4. ✓
- Типографика/роли шрифтов/контраст → Task 1, 4. ✓
- Система кнопок → Task 3 (+ применение 5,6,10). ✓
- Карточки (About/Team/Services) → Task 7, 8, 9. ✓
- Протяжка визуального языка (≥2 зоны) → Task 11. ✓
- Доступность/reduced-motion/focus → Task 2, 3, 12. ✓
- Копирайтинг (продающе, на фактах) → Task 5–10. ✓
- Палитра только из брендбука → Task 1 + сквозное правило. ✓
- Мобайл 390px → Task 5, 6, 9, 12. ✓
