export type Category = {
  id: number
  name_uk: string
  name_en: string
  name_cs: string
}

export type Service = {
  id: number
  name_en: string
  name_uk: string
  name_cs: string
  description_en: string
  description_uk: string
  description_cs: string
  price: number
  duration: number
  category: string
}

export type GalleryImage = {
  id: number
  title: string
  description: string
  service: string
}

export const mockCategories: Category[] = [
  { id: 1, name_uk: 'Фарбування', name_en: 'Coloring', name_cs: 'Barveni' },
  { id: 2, name_uk: 'Лікування', name_en: 'Treatments', name_cs: 'Lecby' },
  { id: 3, name_uk: 'Стайлінг', name_en: 'Styling', name_cs: 'Styling' },
  { id: 4, name_uk: 'Красота', name_en: 'Beauty', name_cs: 'Krasa' },
]

export const mockServices: Service[] = [
  {
    id: 1,
    name_en: 'Hair Coloring',
    name_uk: 'Фарбування волосся',
    name_cs: 'Barveni vlasu',
    description_en: 'Professional hair coloring with premium materials for a vibrant, lasting result.',
    description_uk: 'Професійне фарбування волосся преміум матеріалами для яскравого та довготривалого результату.',
    description_cs: 'Profesionalni barveni vlasu s premiumi materiali pro vibrantni a dlouhotrvajici vysledek.',
    price: 60,
    duration: 120,
    category: 'coloring',
  },
  {
    id: 2,
    name_en: 'Hair Botox',
    name_uk: 'Ботокс для волосся',
    name_cs: 'Botox pro vlasy',
    description_en: 'Hair restoration and strengthening with advanced botox treatment technology.',
    description_uk: 'Відновлення та зміцнення волосся передовою технологією ботокс-лікування.',
    description_cs: 'Obnova a posileni vlasu pokrocilou technologii botox lecby.',
    price: 80,
    duration: 90,
    category: 'treatment',
  },
  {
    id: 3,
    name_en: 'Permanent Wave',
    name_uk: 'Завивка',
    name_cs: 'Trvalá vlna',
    description_en: 'Creating beautiful, natural-looking curls that last for extended periods.',
    description_uk: 'Створення красивих, природних завитків, які тривають тривалий час.',
    description_cs: 'Vytvoreni krasnych, prirodzene vypadajicich kudrlin, ktere traji delsi dobu.',
    price: 75,
    duration: 150,
    category: 'styling',
  },
  {
    id: 4,
    name_en: 'Haircut & Styling',
    name_uk: 'Стрижка та укладка',
    name_cs: 'Strizeni a styling',
    description_en: 'Professional haircut with modern styling tailored to your face shape.',
    description_uk: 'Професійна стрижка з сучасним стайлінгом, адаптованим до форми вашого обличчя.',
    description_cs: 'Profesionalni strizeni s modernim stylingem prizpusobenym tvaru vasi tvarei.',
    price: 45,
    duration: 60,
    category: 'haircut',
  },
  {
    id: 5,
    name_en: 'Keratin Treatment',
    name_uk: 'Кератинове лікування',
    name_cs: 'Keratinova lecba',
    description_en: 'Hair saturation with keratin for incredible smoothness and mirror-like shine.',
    description_uk: 'Насичення волосся кератином для неймовірної гладкості та дзеркального блиску.',
    description_cs: 'Nasyceni vlasu keratinem pro neuverytelnou hladkost a zrcadlovy les.',
    price: 90,
    duration: 120,
    category: 'treatment',
  },
  {
    id: 6,
    name_en: 'Beauty Treatments',
    name_uk: 'Косметичні процедури',
    name_cs: 'Kosmeticke procedury',
    description_en: 'Professional beauty treatments for face and body using premium products.',
    description_uk: 'Професійні косметичні процедури для обличчя та тіла преміум продуктами.',
    description_cs: 'Profesionalni kosmeticke procedury pro oblicej a telo s premiumovymi produkty.',
    price: 55,
    duration: 60,
    category: 'beauty',
  },
  {
    id: 7,
    name_en: 'Hair Highlights',
    name_uk: 'Мелування',
    name_cs: 'Zvyraznovani vlasu',
    description_en: 'Modern highlights technique for a natural, sun-kissed appearance.',
    description_uk: 'Сучасна техніка мелування для природного вигляду, поцілованого сонцем.',
    description_cs: 'Moderna technika zvyraznovani pro prirodzeny, sluncem pohladeny vzhled.',
    price: 70,
    duration: 140,
    category: 'coloring',
  },
  {
    id: 8,
    name_en: 'Special Care',
    name_uk: 'Спеціальний догляд',
    name_cs: 'Specialni pece',
    description_en: 'Individual care program for hair health, beauty and long-lasting vitality.',
    description_uk: 'Індивідуальна програма догляду для здоров\'я волосся, краси та довготривалої жизнездатності.',
    description_cs: 'Individualni program pece pro zdravi vlasu, krasnosti a dlouhodobeho vitalneho vzhledu.',
    price: 50,
    duration: 45,
    category: 'care',
  },
]

export const mockGallery: GalleryImage[] = [
  { id: 1, title: 'Elegant Coloring', description: 'Beautiful color transformation', service: 'coloring' },
  { id: 2, title: 'Natural Curls', description: 'Perfect wave styling result', service: 'styling' },
  { id: 3, title: 'Shiny Hair', description: 'Keratin treatment results', service: 'treatment' },
  { id: 4, title: 'Modern Cut', description: 'Contemporary styling work', service: 'haircut' },
  { id: 5, title: 'Strong Hair', description: 'Botox treatment results', service: 'treatment' },
  { id: 6, title: 'Smooth Hair', description: 'Keratin smoothing treatment', service: 'treatment' },
]

export const getServiceName = (service: Service, lang: string): string => {
  const key = `name_${lang}` as keyof Service
  return (service[key] as string) || service.name_en
}

export const getServiceDescription = (service: Service, lang: string): string => {
  const key = `description_${lang}` as keyof Service
  return (service[key] as string) || service.description_en
}
