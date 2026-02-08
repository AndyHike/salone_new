# 🚀 Повна інструкція - Інтеграція Next.js сайту з локальним Directus

## 📋 Резюме

Ви маєте локально розгорнуті:
- **Directus CMS** (порт 8055) через Coolify
- **Next.js сайт** (порт 3000) буде розгорнено в тому ж стеці
- **Локальна мережа** - обидва сервери спілкуватимуться по IP адресам

---

## ✅ Крок 1: Генерація API токена в Directus

### На сервері з Directus:

1. **Відкрийте Directus Admin:**
   ```
   http://ваша_ip_адреса:8055
   ```

2. **Увійдіть з admin акаунтом** (той, що вказували при розгортанні)

3. **Перейдіть на:**
   ```
   Settings → Access Control → API Tokens
   ```

4. **Клацніть "Create Token"** (зеленої кнопки)

5. **Заповніть форму:**
   - **Description:** "Salon Frontend API"
   - **Role:** Select "Administrator" (для розробки)
   - **Expiration:** "Never" (для локального розвитку)

6. **Скопіюйте згенерований токен** - виглядає приблизно так:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## 🔧 Крок 2: Налаштування Environment Variables

### На сервері з Next.js сайтом:

1. **Перейдіть до папки проекту:**
   ```bash
   cd /path/to/your/salon-website
   ```

2. **Створіть файл `.env.local`:**
   ```bash
   cp .env.example .env.local
   ```

3. **Відредагуйте `.env.local`:**
   ```env
   # Directus CMS Configuration
   NEXT_PUBLIC_DIRECTUS_URL=http://192.168.1.100:8055
   DIRECTUS_API_TOKEN=your_copied_token_here
   ```

   Замініть:
   - `192.168.1.100` на IP адресу серверу з Directus
   - `your_copied_token_here` на токен, що ви скопіювали

### Як знайти IP адресу Directus серверу:

**На Linux/Mac:**
```bash
ip addr show
# або
ifconfig
```

**На Windows:**
```cmd
ipconfig
```

Шукайте адресу в форматі `192.168.x.x` або `10.0.x.x`

---

## 🧪 Крок 3: Тестування підключення

### 1. Стартуйте Next.js сайт:
```bash
npm run dev
# або
pnpm dev
```

### 2. Відкрийте у браузері:
```
http://localhost:3000/api/test-directus
```

### 3. Ви повинні бачити відповідь типу:
```json
{
  "status": "OK",
  "message": "Connected to Directus successfully",
  "servicesCount": 8,
  "sample": {
    "id": "1",
    "name_en": "Hair Coloring",
    "name_uk": "Фарбування волосся",
    ...
  }
}
```

Якщо error - перевірте:
- ✓ IP адреса правильна
- ✓ Токен скопійований коректно
- ✓ Directus сервер запущений
- ✓ Обидва сервери в одній мережі

---

## 📱 Крок 4: Використання Directus даних на сайті

### Приклад - Отримання послуг на головній сторінці:

**File: `app/[lang]/page.tsx`**

```typescript
import { getServices } from '@/lib/directus'
import { getTranslation } from '@/lib/i18n'

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const t = (key: string) => getTranslation(lang, key)
  
  // Замість mock data - отримуємо з Directus
  const services = await getServices()
  const featuredServices = services.slice(0, 3)

  return (
    // ... JSX
  )
}
```

### Приклад - Отримання однієї послуги:

**File: `app/[lang]/services/[id]/page.tsx`**

```typescript
import { getServiceById } from '@/lib/directus'

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params
  
  // Отримуємо послугу з Directus
  const service = await getServiceById(id)

  if (!service) {
    return <div>Service not found</div>
  }

  return (
    // ... JSX
  )
}
```

---

## 🌐 Крок 5: Розгортання в Coolify

### При добавленні Next.js приложення в Coolify:

1. **Встановіть змінні окруження:**
   - Перейдіть в **Environment → Environment Variables**
   - Додайте:
     ```
     NEXT_PUBLIC_DIRECTUS_URL=http://директус_сервер_ip:8055
     DIRECTUS_API_TOKEN=ваш_токен
     ```

2. **Для внутрішнього спілкування між контейнерами (якщо в одному Docker Compose):**
   ```
   NEXT_PUBLIC_DIRECTUS_URL=http://directus:8055
   ```
   (де `directus` - це назва сервісу в docker-compose.yml)

---

## 🔐 CORS налаштування (якщо потрібно)

Якщо сайт і Directus на різних машинах/портах, може знадобиться CORS:

### У Directus Admin:
```
Settings → Project Settings → Security → CORS Origins
```

Додайте:
```
http://192.168.1.101:3000
```

---

## 📚 Доступні функції з `lib/directus.ts`

```typescript
// Отримати всі послуги
const services = await getServices()

// Отримати одну послугу по ID
const service = await getServiceById('123')

// Отримати категорії
const categories = await getCategories()

// Отримати галерею
const gallery = await getGallery()

// Створити бронювання
await createBooking({
  name: 'John',
  email: 'john@example.com',
  service: { id: '1' },
  booking_date: '2024-02-14',
  booking_time: '10:00',
  status: 'pending'
})

// Створити повідомлення контакту
await createContactMessage({
  name: 'John',
  email: 'john@example.com',
  subject: 'Question',
  message: 'Hello...'
})

// Отримати URL зображення
const imageUrl = getImageUrl('filename.jpg')
```

---

## ⚠️ Поширені проблеми

### ❌ "Could not connect to Directus"
- Перевірте IP адресу
- Перевірте, що Directus запущений
- Перевірте firewall налаштування

### ❌ "Invalid token"
- Скопіюйте токен заново (не обрізайте кінці)
- Переконайтесь, що не додали пробілів

### ❌ "CORS error"
- Додайте домен сайту в Directus CORS налаштування

### ❌ "Connection refused"
- Потім сервери в одній мережі мають бути доступні один одному
- Перевірте firewall на обох машинах

---

## ✨ Все готово!

Тепер ваш сайт підключений до Directus і відображатиме реальні дані з CMS!
