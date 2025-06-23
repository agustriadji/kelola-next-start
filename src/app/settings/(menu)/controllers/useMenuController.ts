import { MENU_STORAGE_KEY } from '@/constants/storage'
import { MenuInterface } from '@/types/menu'
import { getFromDB, setToDB } from '@/utils/idb'
import { dummyMenu } from '../menuData'
const pathUrl = '/api/settings/menu'

export const fetchMenuList = async (): Promise<MenuInterface[]> => {
  let data = await getFromDB<MenuInterface[]>(MENU_STORAGE_KEY)
  data ??= dummyMenu
  return data
}

export const saveMenuList = async (menus: MenuInterface[]) => {
  const res = await fetch(pathUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menus),
  })
  if (res.status === 200) {
    await setToDB(MENU_STORAGE_KEY, menus)
  }
  return menus
}
