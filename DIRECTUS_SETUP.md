# Директус - Налаштування локального підключення

## 1. Генерація API токена в Directus

### Крок 1: Увійти до Directus Admin
- Перейдіть на `http://localhost:8055` (або ваш локальний адрес Directus)
- Увійдіть з admin акаунтом

### Крок 2: Створити API токен
1. Перейдіть в **Settings** → **Access Control** → **API Tokens**
2. Клацніть **"Create Token"**
3. Заповніть поля:
   - **Description**: "Salon Frontend"
   - **Role**: Select "Editor" або "Administrator" (залежить від потреб)
   - **Expiration**: Встановіть на "Never" для локального розробки
4. Скопіюйте згенерований токен

### Крок 3: Налаштувати Environment Variables
Створіть файл `.env.local` у корені проекту:

```env
# Directus Configuration
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
DIRECTUS_API_TOKEN=your_generated_token_here
```

**Важливо:** Якщо ви розгорнете сайт у тому ж локальному мережі, замініть `localhost` на IP адресу серверу Directus:
```env
NEXT_PUBLIC_DIRECTUS_URL=http://192.168.1.100:8055
DIRECTUS_API_TOKEN=your_token_here
```

## 2. Архітектура спілкування

### Локальна мережа (Coolify)
```
┌─────────────────────────────────────┐
│     Ваша локальна мережа             │
│  192.168.x.x або 10.0.x.x            │
└─────────────────────────────────────┘
         ↓                    ↓
   Directus CMS         Next.js App
   (Port 8055)          (Port 3000)
   
   Спілкування: HTTP по локальній мережі
```

### Конфігурація:
- **Backend (Directus)**: Слухає на `0.0.0.0:8055` (доступна всім в мережі)
- **Frontend (Next.js)**: Слухає на `0.0.0.0:3000` (доступна всім в мережі)
- **API запити**: Сайт робить запити на `http://директус_ip:8055/graphql` або REST API

## 3. Типи API запитів до Directus

### REST API приклад:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8055/items/services
```

### GraphQL приклад:
```graphql
query GetServices {
  services {
    id
    name_en
    name_uk
    name_cs
    description_en
    price
    category {
      id
      name_en
    }
  }
}
```

## 4. CORS налаштування в Directus

Якщо потрібно дозволити запити з іншої локальної IP:

1. Перейдіть **Settings** → **Project Settings** → **Security**
2. В полі **CORS** додайте вашу локальну IP сайту:
```
http://192.168.1.101:3000
```

## 5. Порядок розгортання в Coolify

### На серверу Coolify:
1. Стартуйте Directus контейнер (повинен бути доступний на локальній мережі)
2. Запустіть Next.js контейнер (зі змінними окруження).env.local)
3. Обидва сервери автоматично виявлять один одного по IP адресам

### Основні порти:
- Directus: `8055`
- Next.js: `3000`
- Обидва на локальній мережі без портів у firewall

## 6. Тестування підключення

Додайте цей код для тестування:

```typescript
// app/api/test/directus/route.ts
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/services`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
        },
      }
    )
    
    const data = await response.json()
    return Response.json({ status: "OK", data })
  } catch (error) {
    return Response.json({ status: "ERROR", error: error.message }, { status: 500 })
  }
}
```

Перейдіть на `http://localhost:3000/api/test/directus` щоб перевірити підключення.
