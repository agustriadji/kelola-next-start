import { MenuInterface } from '@/types/menu'
import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useMenuStore } from '../stores/useMenuStore2'

export type ItemProps = {
  item: MenuInterface
}

export const useMenuTree = () => {
  const menuTree = useMenuStore((s) => s.menuTree)
  const setMenuTree = useMenuStore((s) => s.setMenuTree)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = menuTree.findIndex((item) => item.id === active.id)
    const newIndex = menuTree.findIndex((item) => item.id === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    const reordered = arrayMove(menuTree, oldIndex, newIndex)
    setMenuTree(reordered)
  }

  return {
    menuTree,
    handleDragEnd,
  }
}
