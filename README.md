# Coffee Empire (Test Task)

## Описание

Веб-приложение на Nuxt 3 (TypeScript, Composition API, Pinia, SCSS, FSD архитектура) с имитацией API через users.json.

### 🚀 Деплой на Netlify (Nuxt 3 + SSR)

1. **Склонируйте репозиторий** к себе на GitHub или локально:
   ```
   git clone https://github.com/vibedev56/coffee-empire.git
   ```
2. **Подключите репозиторий** через "Add new site" → "Import an existing project" в панели Netlify.
3. В настройках укажите:
   - **Build command:**
     ```
     npm run build
     ```
   - **Publish directory:**
     ```
     .output/public
     ```
3. Запустите деплой ("Deploy site"). После успешной сборки сайт будет доступен по вашему Netlify URL.

---

## Краткое описание функций и архитектурных решений

- **FSD (Feature-Sliced Design):**  Приложение разделено на слои (entities, features, widgets, shared, pages) для масштабируемости и удобной поддержки.

- **Авторизация:**  Используется Pinia для хранения состояния пользователя. Сессия хранится в localStorage, чтобы сохранять авторизацию при перезагрузке страницы. Проверка логина/пароля происходит через серверный маршрут, имитирующий API.

- **Маршрутизация и защита маршрутов:**  Глобальный middleware (`auth.global.ts`) проверяет наличие сессии. Без авторизации доступ только к странице логина.

- **Таблица и фильтры:**  На странице аккаунта реализована таблица с фильтрами по дате создания и мультивыбором по имени пользователя. Фильтрация реализована реактивно через computed свойства.

- **Импорт данных:**  Данные пользователей загружаются через серверный API-роут, который читает `users.json` (имитация реального backend).

- **Стили:**  Используется препроцессор SCSS для стилизации компонентов.

- **TypeScript:**  Весь код написан на TypeScript для типобезопасности и лучшей поддержки в редакторах.

---
