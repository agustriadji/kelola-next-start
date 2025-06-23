import { MenuInterface } from '@/types/menu'
import { arrayMove } from '@dnd-kit/sortable'

export const reorderMenu = (
  menuTree: MenuInterface[],
  activeId: string | number,
  overId: string | number,
) => {
  const oldIndex = menuTree.findIndex((item) => item.id === activeId)
  const newIndex = menuTree.findIndex((item) => item.id === overId)

  return arrayMove(menuTree, oldIndex, newIndex)
}
