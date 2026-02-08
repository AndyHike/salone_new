import { getServices } from '@/lib/directus'

export async function GET() {
  try {
    console.log('[v0] Testing Directus connection...')
    console.log('[v0] Directus URL:', process.env.NEXT_PUBLIC_DIRECTUS_URL)
    console.log('[v0] API Token exists:', !!process.env.DIRECTUS_API_TOKEN)

    const services = await getServices()

    console.log('[v0] Successfully fetched services:', services.length)

    return Response.json({
      status: 'OK',
      message: 'Connected to Directus successfully',
      servicesCount: services.length,
      sample: services[0],
    })
  } catch (error) {
    console.error('[v0] Directus connection error:', error)

    return Response.json(
      {
        status: 'ERROR',
        message: 'Failed to connect to Directus',
        error: error instanceof Error ? error.message : 'Unknown error',
        debug: {
          directusUrl: process.env.NEXT_PUBLIC_DIRECTUS_URL,
          hasToken: !!process.env.DIRECTUS_API_TOKEN,
        },
      },
      { status: 500 }
    )
  }
}
