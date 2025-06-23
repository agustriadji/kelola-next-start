import { MenuInterface } from '@/types/menu'
import { MenuListSchema } from '@/schemas/menuSchema'

const pathUrl = '/api/settings/menu'

export async function fetchMenu(): Promise<MenuInterface[]> {
  const res = await fetch(pathUrl)
  const json = await res.json()
  const parsed = MenuListSchema.safeParse(json)
  if (!parsed.success) throw new Error('Invalid menu structure')
  return parsed.data
}

export async function saveMenu(updated: MenuInterface[]) {
  await fetch(pathUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated),
  })
}
