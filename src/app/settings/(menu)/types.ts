import { MenuInterface } from '@/types/menu'

export type MenuItem = {
  id: string
  name: string
  url?: string
  icon?: string
  parent?: string | null
  children?: MenuInterface[]
}

export type Props = {
  open: boolean
  onClose: () => void
  editingItem?: MenuItem
}
