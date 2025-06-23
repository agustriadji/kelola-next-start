import { cn } from '@/utils/clsxCn'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil } from 'lucide-react'
import { ItemProps } from '../hooks/useMenuTree'

export const MenuItemNode = ({ item }: ItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
        <span className="text-sm">{item.name}</span>
      </div>
      <button>
        <Pencil className="w-4 h-4 text-gray-400 hover:text-black" />
      </button>
    </div>
  )
}
