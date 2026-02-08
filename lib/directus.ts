import { GraphQLClient } from 'graphql-request'

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'
const apiToken = process.env.DIRECTUS_API_TOKEN

if (!apiToken) {
  console.warn('[v0] DIRECTUS_API_TOKEN не встановлений. Використовуємо mock data.')
}

// GraphQL клієнт для Directus
export const directusGraphQL = new GraphQLClient(`${directusUrl}/graphql`, {
  headers: {
    Authorization: `Bearer ${apiToken}`,
  },
})

// REST API запити
export async function directusRest(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${directusUrl}/items/${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Directus API error: ${response.statusText}`)
  }

  return response.json()
}

// Типи даних
export interface Category {
  id: string
  name_en: string
  name_uk: string
  name_cs: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name_en: string
  name_uk: string
  name_cs: string
  description_en: string
  description_uk: string
  description_cs: string
  price: number
  duration: number
  category: {
    id: string
    name_en: string
    name_uk: string
    name_cs: string
  }
  image?: {
    id: string
    title: string
    type: string
    filename_disk: string
  }
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  name: string
  email: string
  phone: string
  service: {
    id: string
    name_en: string
    name_uk: string
    name_cs: string
    price: number
    duration: number
  }
  booking_date: string
  booking_time: string
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  title_en: string
  title_uk: string
  title_cs: string
  description_en: string
  description_uk: string
  description_cs: string
  image: {
    id: string
    title: string
    type: string
    filename_disk: string
  }
  service: {
    id: string
    name_en: string
  }
  created_at: string
  updated_at: string
}

// Запити до Directus
export async function getServices(): Promise<Service[]> {
  try {
    const query = `
      query GetServices {
        services {
          id
          name_en
          name_uk
          name_cs
          description_en
          description_uk
          description_cs
          price
          duration
          category {
            id
            name_en
            name_uk
            name_cs
          }
          image {
            id
            title
            type
            filename_disk
          }
          created_at
          updated_at
        }
      }
    `

    const response = await directusGraphQL.request<{ services: Service[] }>(query)
    return response.services || []
  } catch (error) {
    console.error('[v0] Error fetching services:', error)
    return []
  }
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const query = `
      query GetService($id: ID!) {
        services_by_id(id: $id) {
          id
          name_en
          name_uk
          name_cs
          description_en
          description_uk
          description_cs
          price
          duration
          category {
            id
            name_en
            name_uk
            name_cs
          }
          image {
            id
            title
            type
            filename_disk
          }
          created_at
          updated_at
        }
      }
    `

    const response = await directusGraphQL.request<{ services_by_id: Service }>(query, {
      id,
    })
    return response.services_by_id || null
  } catch (error) {
    console.error('[v0] Error fetching service:', error)
    return null
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const query = `
      query GetCategories {
        categories {
          id
          name_en
          name_uk
          name_cs
          created_at
          updated_at
        }
      }
    `

    const response = await directusGraphQL.request<{ categories: Category[] }>(query)
    return response.categories || []
  } catch (error) {
    console.error('[v0] Error fetching categories:', error)
    return []
  }
}

export async function getGallery(): Promise<GalleryImage[]> {
  try {
    const query = `
      query GetGallery {
        gallery {
          id
          title_en
          title_uk
          title_cs
          description_en
          description_uk
          description_cs
          image {
            id
            title
            type
            filename_disk
          }
          service {
            id
            name_en
          }
          created_at
          updated_at
        }
      }
    `

    const response = await directusGraphQL.request<{ gallery: GalleryImage[] }>(query)
    return response.gallery || []
  } catch (error) {
    console.error('[v0] Error fetching gallery:', error)
    return []
  }
}

export async function createBooking(bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const response = await directusRest('bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    })
    return response
  } catch (error) {
    console.error('[v0] Error creating booking:', error)
    throw error
  }
}

export async function createContactMessage(messageData: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
    const response = await directusRest('contact_messages', {
      method: 'POST',
      body: JSON.stringify({
        ...messageData,
        status: 'new',
      }),
    })
    return response
  } catch (error) {
    console.error('[v0] Error creating contact message:', error)
    throw error
  }
}

export function getImageUrl(filename: string): string {
  return `${directusUrl}/assets/${filename}`
}
