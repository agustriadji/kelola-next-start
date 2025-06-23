import type { MenuInterface } from '@/types/menu'
import { v4 as uuidv4 } from 'uuid'

export const createMenuItem = ({
  name,
  icon,
  parent,
  editingItem,
}: {
  name: string
  icon: string
  parent: string
  editingItem?: MenuInterface
}): MenuInterface => {
  return {
    id: editingItem?.id ?? uuidv4(),
    name,
    icon,
    parent,
    children: editingItem?.children ?? [],
  }
}

export const updateMenuTree = ({
  menuTree,
  newItem,
  editingItem,
}: {
  menuTree: MenuInterface[]
  newItem: MenuInterface
  editingItem?: MenuInterface
}) => {
  if (editingItem) {
    return menuTree.map((item) => (item.id === editingItem.id ? newItem : item))
  } else {
    return [...menuTree, newItem]
  }
}
