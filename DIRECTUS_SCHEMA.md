# Directus Database Schema для Luxe Salon

## 1. Services (Послуги)
### Таблиця: `services`

| Колонка | Тип | Параметри | Опис |
|---------|-----|----------|------|
| id | UUID | Primary Key, Auto | Унікальний ідентифікатор |
| name_en | String | Required, 255 | Назва послуги (англійська) |
| name_uk | String | Required, 255 | Назва послуги (українська) |
| name_cs | String | Required, 255 | Назва послуги (чеська) |
| description_en | Text | Required | Опис послуги (англійська) |
| description_uk | Text | Required | Опис послуги (українська) |
| description_cs | Text | Required | Опис послуги (чеська) |
| price | Decimal | Required, precision: 10, scale: 2 | Ціна послуги |
| duration | Integer | Required | Тривалість у хвилинах |
| category_id | UUID | Foreign Key → categories | Зв'язок до категорії |
| image | UUID | File | Основне зображення послуги |
| icon | String | Optional | Іконка для послуги (назва класу) |
| sort | Integer | Optional | Порядок сортування |
| is_active | Boolean | Default: true | Активна послуга |
| created_at | Timestamp | Auto | Дата створення |
| updated_at | Timestamp | Auto | Дата оновлення |

---

## 2. Categories (Категорії послуг)
### Таблиця: `categories`

| Колонка | Тип | Параметри | Опис |
|---------|-----|----------|------|
| id | UUID | Primary Key, Auto | Унікальний ідентифікатор |
| name_en | String | Required, 255 | Назва категорії (англійська) |
| name_uk | String | Required, 255 | Назва категорії (українська) |
| name_cs | String | Required, 255 | Назва категорії (чеська) |
| description_en | Text | Optional | Опис (англійська) |
| description_uk | Text | Optional | Опис (українська) |
| description_cs | Text | Optional | Опис (чеська) |
| icon | String | Optional | CSS клас іконки |
| sort | Integer | Optional | Порядок сортування |
| is_active | Boolean | Default: true | Активна категорія |
| created_at | Timestamp | Auto | Дата створення |
| updated_at | Timestamp | Auto | Дата оновлення |

**Зв'язок**: One-to-Many з `services` (одна категорія має багато послуг)

---

## 3. Gallery (Галерея)
### Таблиця: `gallery`

| Колонка | Тип | Параметри | Опис |
|---------|-----|----------|------|
| id | UUID | Primary Key, Auto | Унікальний ідентифікатор |
| title_en | String | Required, 255 | Назва зображення (англійська) |
| title_uk | String | Required, 255 | Назва зображення (українська) |
| title_cs | String | Required, 255 | Назва зображення (чеська) |
| description_en | Text | Optional | Опис (англійська) |
| description_uk | Text | Optional | Опис (українська) |
| description_cs | Text | Optional | Опис (чеська) |
| image | UUID | File, Required | Зображення галереї |
| thumbnail | UUID | File, Optional | Мініатюра |
| service_id | UUID | Foreign Key → services | Зв'язок до послуги (опціонально) |
| sort | Integer | Optional | Порядок сортування |
| is_featured | Boolean | Default: false | Головне зображення |
| created_at | Timestamp | Auto | Дата створення |
| updated_at | Timestamp | Auto | Дата оновлення |

**Зв'язки**: 
- Many-to-One з `services` (опціонально)
- Many-to-One з `files` через `image`

---

## 4. Bookings (Бронювання)
### Таблиця: `bookings`

| Колонка | Тип | Параметри | Опис |
|---------|-----|----------|------|
| id | UUID | Primary Key, Auto | Унікальний ідентифікатор |
| customer_name | String | Required, 255 | Ім'я клієнта |
| customer_email | String | Required, Email | Email клієнта |
| customer_phone | String | Required, 20 | Номер телефону клієнта |
| service_id | UUID | Foreign Key → services | Обрана послуга |
| booking_date | Date | Required | Дата бронювання |
| booking_time | Time | Required | Час бронювання |
| notes | Text | Optional | Додаткові примітки |
| status | String | Enum: pending, confirmed, completed, cancelled | Статус бронювання |
| reminder_sent | Boolean | Default: false | Напоминання відправлено |
| created_at | Timestamp | Auto | Дата створення |
| updated_at | Timestamp | Auto | Дата оновлення |

**Зв'язок**: Many-to-One з `services`

---

## 5. ContactMessages (Повідомлення контактної форми)
### Таблиця: `contact_messages`

| Колонка | Тип | Параметри | Опис |
|---------|-----|----------|------|
| id | UUID | Primary Key, Auto | Унікальний ідентифікатор |
| name | String | Required, 255 | Ім'я відправника |
| email | String | Required, Email | Email відправника |
| phone | String | Optional, 20 | Номер телефону |
| subject | String | Required, 255 | Тема повідомлення |
| message | Text | Required | Текст повідомлення |
| status | String | Enum: new, read, replied | Статус |
| reply_text | Text | Optional | Відповідь |
| created_at | Timestamp | Auto | Дата створення |
| updated_at | Timestamp | Auto | Дата оновлення |

---

## 6. Users (Адміністратори)
### Таблиця: `directus_users`

Це таблиця Directus за замовчуванням, але додайте ці кастомні поля:

| Поле | Тип | Опис |
|------|-----|------|
| first_name | String | Ім'я |
| last_name | String | Прізвище |
| email | String | Email |
| password | String | Пароль (auto-hashed) |
| role | UUID | Роль користувача |
| status | String | Статус (active/inactive) |
| avatar | UUID | Аватарка |

---

## 7. BlogPosts (Блог - опціонально)
### Таблиця: `blog_posts`

| Колонка | Тип | Параметри | Опис |
|---------|-----|----------|------|
| id | UUID | Primary Key, Auto | Унікальний ідентифікатор |
| title_en | String | Required, 255 | Заголовок (англійська) |
| title_uk | String | Required, 255 | Заголовок (українська) |
| title_cs | String | Required, 255 | Заголовок (чеська) |
| slug_en | String | Required, 255, Unique | URL slug (англійська) |
| slug_uk | String | Required, 255, Unique | URL slug (українська) |
| slug_cs | String | Required, 255, Unique | URL slug (чеська) |
| content_en | Text | Required | Вміст (англійська) |
| content_uk | Text | Required | Вміст (українська) |
| content_cs | Text | Required | Вміст (чеська) |
| featured_image | UUID | File | Основне зображення |
| excerpt_en | String | Optional | Витяг (англійська) |
| excerpt_uk | String | Optional | Витяг (українська) |
| excerpt_cs | String | Optional | Витяг (чеська) |
| author_id | UUID | Foreign Key → directus_users | Автор поста |
| published | Boolean | Default: false | Опубліковано |
| published_at | Timestamp | Optional | Дата публікації |
| sort | Integer | Optional | Порядок сортування |
| created_at | Timestamp | Auto | Дата створення |
| updated_at | Timestamp | Auto | Дата оновлення |

**Зв'язок**: Many-to-One з `directus_users`

---

## 8. Reviews (Відгуки - опціонально)
### Таблиця: `reviews`

| Колонка | Тип | Параметри | Опис |
|---------|-----|----------|------|
| id | UUID | Primary Key, Auto | Унікальний ідентифікатор |
| customer_name | String | Required, 255 | Ім'я клієнта |
| customer_email | String | Required, Email | Email клієнта |
| rating | Integer | Required, Min: 1, Max: 5 | Рейтинг (1-5) |
| text_en | Text | Required | Текст відгуку (англійська) |
| text_uk | Text | Required | Текст відгуку (українська) |
| text_cs | Text | Required | Текст відгуку (чеська) |
| service_id | UUID | Foreign Key → services | На яку послугу відгук |
| avatar_image | UUID | File, Optional | Аватарка клієнта |
| is_approved | Boolean | Default: false | Схвалено адміном |
| featured | Boolean | Default: false | На головній сторінці |
| created_at | Timestamp | Auto | Дата створення |
| updated_at | Timestamp | Auto | Дата оновлення |

**Зв'язок**: Many-to-One з `services`

---

## 9. Settings (Налаштування сайту)
### Таблиця: `settings`

| Колонка | Тип | Параметри | Опис |
|---------|-----|----------|------|
| id | UUID | Primary Key, Auto | Унікальний ідентифікатор |
| key | String | Required, Unique | Ключ налаштування |
| value | JSON | Optional | Значення (гнучкий формат) |
| description | String | Optional | Опис налаштування |

**Приклади ключів**:
- `salon_email` - Email салону
- `salon_phone` - Телефон салону
- `salon_address` - Адреса салону
- `salon_hours` - Режим роботи
- `social_media` - Соціальні мережі (JSON)
- `google_analytics_id` - ID Google Analytics
- `smtp_config` - Конфігурація SMTP для листів

---

## 10. Notifications (Сповіщення)
### Таблиця: `notifications`

| Колонка | Тип | Параметри | Опис |
|---------|-----|----------|------|
| id | UUID | Primary Key, Auto | Унікальний ідентифікатор |
| type | String | Enum: email_confirmation, booking_reminder, booking_confirmation, new_contact_message | Тип сповіщення |
| recipient_email | String | Required | Email одержувача |
| subject | String | Required | Тема листа |
| content | Text | Required | Вміст листа |
| variables | JSON | Optional | Змінні для шаблону |
| sent_at | Timestamp | Optional | Час відправлення |
| status | String | Enum: pending, sent, failed | Статус |
| error_message | Text | Optional | Повідомлення про помилку |
| created_at | Timestamp | Auto | Дата створення |

---

## Зв'язки (Relations Summary)

```
categories (1) ──→ (Many) services
  ↓
services (1) ──→ (Many) bookings
  ↓
services (1) ──→ (Many) gallery
  ↓
services (1) ──→ (Many) reviews

directus_users (1) ──→ (Many) blog_posts

files:
  - services.image
  - gallery.image
  - gallery.thumbnail
  - blog_posts.featured_image
  - reviews.avatar_image
```

---

## Примітки для Directus

1. **Перекладацькі поля**: Всі поля з суфіксом `_en`, `_uk`, `_cs` повинні бути налаштовані як звичайні Text/String поля. Directus не має вбудованої підтримки i18n, тому використовуємо цей підхід.

2. **Enum Статуси**: Налаштуйте Enum поля в Directus з допустимими значеннями

3. **Foreign Keys**: Всі FK автоматично створюватимуть зв'язки M2O (Many-to-One) і O2M (One-to-Many)

4. **File Relations**: UUID поля для файлів автоматично створюватимуть зв'язки з таблицею `files`

5. **Дати**: Використовуйте Timestamp для автоматичного заповнення UTC часу

6. **JSON поля**: Корисні для гнучких налаштувань без додаткових таблиць

---

## SQL для створення таблиць (за потреби)

Якщо вам потрібні SQL запити, напишіть "sql" і я надам весь DDL код.
