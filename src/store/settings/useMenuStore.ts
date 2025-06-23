import { create } from 'zustand'
import { MenuInterface } from '@/types/menu'

type MenuState = {
  active: string
  menuList: MenuInterface[]
  setMenuList: (list: MenuInterface[]) => void
  editMenu: (menu: MenuInterface) => void
}

export const useMenuStore = create<MenuState>((set) => ({
  active: 'dashboard',
  menuList: [],
  setMenuList: (list) => set({ menuList: list }),
  editMenu: (menu) =>
    set((state) => ({
      menuList: state.menuList.map((item) =>
        item.id === menu.id ? menu : item,
      ),
    })),
}))
