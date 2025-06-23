import { MenuListSchema, MenuListSchemaType } from '@/schemas/menuSchema'
import { getFromDB } from '@/utils/idb'
export async function save(data: MenuListSchemaType) {
  console.log(data, 'services/settings/menu.ts')
  const parse = MenuListSchema.safeParse(data)
  console.log(parse, 'services/settings/menu.ts')
  if (!parse.success) {
    return { success: false, error: parse.error }
  } else {
    return { success: true, data: parse.data }
  }
}

export async function get() {
  const data = await getFromDB('menu')
  const parse = MenuListSchema.safeParse(data)
  if (!parse.success) {
    return { success: false, error: parse.error }
  } else {
    return { success: true, data: parse.data }
  }
}
