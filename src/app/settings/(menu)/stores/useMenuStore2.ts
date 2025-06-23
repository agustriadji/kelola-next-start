import { MENU_STORAGE_KEY } from '@/constants/storage'
import { getFromDB, setToDB } from '@/utils/idb'
import { create } from 'zustand'
import { MenuItem } from '../types'

type State = {
  menuTree: MenuItem[]
  originalMenuTree: MenuItem[]
  setMenuTree: (tree: MenuItem[]) => void
  resetChanges: () => void
  saveChanges: () => void
  loadFromDB: () => Promise<void>
  saveToDB: () => Promise<void>
}

export const useMenuStore = create<State>((set, get) => ({
  menuTree: [],
  originalMenuTree: [],
  setMenuTree: (tree) => set({ menuTree: tree }),
  resetChanges: () => set({ menuTree: get().originalMenuTree }),
  saveChanges: () => set({ originalMenuTree: get().menuTree }),

  loadFromDB: async () => {
    const data = await getFromDB<MenuItem[]>(MENU_STORAGE_KEY)
    if (data) {
      set({ menuTree: data, originalMenuTree: data })
    }
  },

  saveToDB: async () => {
    await setToDB(MENU_STORAGE_KEY, get().menuTree)
    set({ originalMenuTree: get().menuTree }) // update original after save
  },
}))
