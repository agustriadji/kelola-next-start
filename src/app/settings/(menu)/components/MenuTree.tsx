// File: MenuTree.tsx
'use client'

import { cn } from '@/utils/clsxCn'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMenuStore } from '../stores/useMenuStore2'
import { MenuItem } from '../types'
import { buildTree, FlattenedItem, flattenTree, insertItem, removeItem } from '../utils/treeUtils'

export default function MenuTree({ onEdit }: { onEdit?: (item: MenuItem) => void }) {
  const { menuTree, setMenuTree } = useMenuStore()
  const [flattened, setFlattened] = useState<FlattenedItem[]>([])
  const [activeItem, setActiveItem] = useState<FlattenedItem | null>(null)

  useEffect(() => {
    setFlattened(flattenTree(menuTree))
  }, [menuTree])

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const activeItem = flattened.find((i) => i.id === active.id)
    const overItem = flattened.find((i) => i.id === over.id)

    if (!activeItem || !overItem) return

    // 1. Remove active item from its current place
    const flatWithoutActive = removeItem(flattened, activeItem.id)

    // 2. Insert it as a child of overItem
    const updatedFlat = insertItem(flatWithoutActive, activeItem, overItem.id)

    // 3. Build new tree and update
    const updatedTree = buildTree(updatedFlat)
    setMenuTree(updatedTree)
    setFlattened(updatedFlat)
    setActiveItem(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={({ active }) => {
        const item = flattened.find((f) => f.id === active.id)
        if (item) setActiveItem(item)
      }}
    >
      <SortableContext
        items={flattened.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {flattened.map((item) => (
            <MenuItemNode key={item.id} item={item} depth={item.depth} onEdit={onEdit} />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem && (
          <div className="px-3 py-2 bg-white shadow rounded text-sm">{activeItem.data.name}</div>
        )}
      </DragOverlay>
    </DndContext>
  )
}

function MenuItemNode({
  item,
  depth,
  onEdit,
}: {
  item: FlattenedItem
  depth: number
  onEdit?: (item: MenuItem) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    marginLeft: `${depth * 1.5}rem`,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center justify-between bg-white rounded border px-3 py-2 shadow-sm',
        'hover:bg-gray-100',
      )}
      {...attributes}
    >
      <div className="flex items-center gap-2">
        <span {...listeners}>
          <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
        </span>
        <span className="text-sm">{item.data.name}</span>
      </div>
      <button onClick={() => onEdit?.(item.data)}>
        <Pencil className="w-4 h-4 text-gray-400 hover:text-black" />
      </button>
    </div>
  )
}
