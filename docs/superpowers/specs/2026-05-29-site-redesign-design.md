# Ever Guild – редизайн сайта (spec)

Дата: 2026-05-29
Статус: на ревью

## Цель

Сильный рестайл лендинга Ever Guild в рамках текущего стека и палитры. Сайт сейчас
держится на одном сильном приёме (WebGL-герой), а ниже – плоско, низкий контраст,
рваный вертикальный ритм, карточки без иерархии, нет системы кнопок. Задача –
превратить набор разрозненных секций в **единый «инженерный чертёж»** с цельной
сеткой, типографикой и протянутым визуальным языком.

## Ограничения (не трогаем)

- Палитра – из `docs/brandbook.md` (источник `Colors.svg`).
- Стек: React 19 + Vite + SCSS + three / @react-three/fiber.
- Набор секций: Navbar, Hero, About, Team, Services, Contact, Footer.
- WebGL-герой как ядро.
- Язык сайта – английский (международная аудитория).
- Факты неизменны: копирайтинг переписываем, но НЕ выдумываем новых фактов
  (только то, что уже есть: since 2021, senior-led, remote-first, Web3/AI/full-stack,
  услуги, стек, команда, контакт).
- Шрифты: Tilt Warp + JetBrains Mono + Hanken Grotesk (новые не добавляем).

## Концепция: «Engineering console / blueprint»

Объединяющий приём – видимая структура интерфейса: тонкие grid-линии, mono-разметка
(индексы секций, координаты) и протянутый из героя мотив частиц/линий. «Гильдия
инженеров» подаётся как интерфейс инженера.

## Объём работ по областям

### 1. Сетка и ритм (каркас)
- Единый вертикальный ритм секций через `clamp()`; убрать случайные провалы.
- 12-колоночная сетка с левой **index-колонкой**: у каждой секции mono-маркер
  вида `01 – ABOUT`, контент сдвинут вправо → асимметричный editorial-layout.
- Сквозные hairline вертикальные линии / «линейка» по странице (CSS) как blueprint-фон.
- Реализация: расширить `Section`/`SectionHeader` так, чтобы index-маркер и сетка
  задавались декларативно (проп `index`, `label`), без дублирования разметки в секциях.

### 2. Типографика
- Роли шрифтов – по брендбуку: Tilt Warp (display/H2), JetBrains Mono (индексы,
  eyebrow, лейблы, теги, кнопки, uppercase+трекинг), Hanken Grotesk (body).
- Усилить иерархию H2 ↔ body (больший скачок размера, контроль трекинга/leading).
- Контраст: поднять `text-2`/`text-3` до AA на тёмном тиле (либо ограничить их
  использование крупным/декоративным текстом). Проверить ключевые пары.

### 3. Система кнопок (`Button`)
- Три варианта: `primary` (gold-фон, deep-teal текст), `secondary` (hairline-бордер,
  cream), `ghost`/`link` (mono uppercase + стрелка).
- Единые размеры (sm/md), состояния hover/active, `:focus-visible` кольцо.
- Применить консистентно: Navbar CTA, Hero (2 кнопки), Contact.

### 4. Карточки
- **About-статы** → плотная «spec-полоса»: mono-лейбл + крупное значение,
  hairline-разделители, золотой тик-акцент.
- **Team** → сильнее иерархия: имя (display) крупнее, роль в mono,
  hover-подъём с золотой кромкой, единый стиль аватара/плейсхолдера.
- **Services** → нумерованные карточки (01–04): mono-индекс, золотая верхняя
  hairline, hover-состояние. Tech-стек → mono-чипы.

### 5. Протяжка визуального языка
- Разделители секций и фон Contact – лёгкое эхо героя (частицы/линии).
- Производительно: CSS-разметка + минимальное переиспользование текущего three-setup;
  без второй тяжёлой WebGL-сцены. Респект `prefers-reduced-motion`.

### 6. Копирайтинг (чётко, продающе, без выдумок)
Принципы: говорить выгодой клиента, не списком технологий; короткие сильные фразы;
mono-eyebrow как «техническая подпись»; ноль воды. Все факты – из текущего сайта.

Before → After (предложение, финал подтверждаем при реализации):

- **Hero eyebrow:** `Remote-first software engineering guild`
  → `Senior-led · Remote-first · Since 2021`
- **Hero tagline:** `Software that lasts. Community that builds.` – оставляем (бренд-линия).
- **Hero description:** `A small team of senior engineers building and maintaining quality software – Web3, AI and full-stack – without the technical debt.`
  → `Senior engineers who ship Web3, AI and full-stack products built to survive production – and stay maintainable long after launch`
- **About title:** `A senior-led engineering guild`
  → `Senior engineers, end to end – no hand-offs to juniors`
- **About lead:** `Ever Guild builds and maintains Web3 infrastructure, AI products, backend systems and modern frontends – taking projects from idea to production without piling up technical debt.`
  → `We take Web3 infrastructure, AI products and full-stack platforms from idea to production – and keep them running clean, without the technical debt that slows you down later`
- **Team title:** `The people behind it`
  → `The senior engineers you'll work with directly`
- **Services title:** `Services & expertise`
  → `What we build for you`
- **Service descriptions:** заострить под выгоду (например Web3:
  `Production-grade smart contracts and protocol integrations on TON, EVM and NEAR – audited patterns, no shortcuts.`), факты услуг сохраняем.
- **Contact title:** `Let's build something that lasts` – оставляем (сильная).
- **Contact note:** `Interested in collaborating? Reach out – we usually reply within a day.`
  → `Tell us what you're building, we reply within a day`
- **Navbar CTA:** `Get in Touch` → `Start a project` (единый главный CTA по сайту).

### 7. Доступность и движение
- Сохранить scroll-reveal (`animation-timeline: view()`), но гарантировать видимость
  контента при `prefers-reduced-motion` и без поддержки scroll-driven анимаций
  (fallback: контент видим, opacity:1).
- Фокус-стили на всех интерактивных элементах.

## Архитектура изменений (файлы)

- `src/styles/_variables.scss` – синхронизировать токены с брендбуком (цвета/типошкала уже близки; выверить контрастные токены).
- `src/styles/_mixins.scss` – миксины сетки, index-маркера, button-вариантов, fallback reveal.
- `src/components/ui/Section.{tsx,scss}` – поддержка index-колонки и сетки.
- `src/components/ui/SectionHeader.{tsx,scss}` – mono-индекс + display-заголовок.
- `src/components/ui/Button.{tsx,scss}` – система вариантов.
- `src/components/sections/*.{tsx,scss}` – применение новой сетки/карточек/кнопок.
- `src/components/three/*` – лёгкая протяжка мотива (без новой сцены).

## Критерии готовности

- Единый вертикальный ритм, нет случайных пустот.
- Каждая секция имеет mono-индекс и читаемую иерархию заголовок→body.
- Все CTA используют единый `Button`; есть focus-visible.
- Карточки (About/Team/Services) визуально различимы, с hover-состояниями.
- Текст проходит контраст AA для основного контента.
- Визуальный мотив героя прослеживается минимум в 2 других зонах.
- Контент виден при reduced-motion и без scroll-driven анимаций.
- Тексты переписаны: чётко, продающе, на существующих фактах; единый главный CTA.
- Сборка `npm run build` проходит; мобильная раскладка (390px) корректна.

## Вне объёма (YAGNI)

- Смена палитры, стека, набора секций.
- Новые факты/заявления, которых нет на текущем сайте.
- Новые шрифты, новые секции, бэкенд/формы.
- Вторая тяжёлая WebGL-сцена.

## Связанные документы

- `docs/brandbook.md` – палитра и шрифты.
