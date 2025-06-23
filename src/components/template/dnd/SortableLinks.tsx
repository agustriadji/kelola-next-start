import React, { FC } from 'react'
import { Card } from '@/components/ui/card'
import { useSortable, SortableData } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { LucideGripVertical, LucideX } from 'lucide-react'

interface Item {
  id: number
  name: string
}

interface SortableLinkCardProps {
  id: Item
  onDelete: (id: number) => void
}

const SortableLinks: FC<SortableLinkCardProps> = ({ id, onDelete }) => {
  const uniqueId = id.id
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: uniqueId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleButtonClick = () => {
    onDelete(uniqueId)
  }

  const isCursorGrabbing = attributes['aria-pressed']

  return (
    <div ref={setNodeRef} style={style} key={uniqueId}>
      <Card className="p-4 relative flex justify-between gap-5 group">
        <div>{id.name}</div>
        <div className="flex justify-center items-center gap-4">
          <button
            className="hidden group-hover:block"
            onClick={handleButtonClick}
          >
            <LucideX
              className="text-red-500"
              width={15}
              height={15}
              viewBox="0 0 24 24"
              color="#E94444"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </button>
          <button
            {...attributes}
            {...listeners}
            className={` ${isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
            aria-describedby={`DndContext-${uniqueId}`}
          >
            <LucideGripVertical
              width={15}
              viewBox="0 0 24 24"
              fill="currentColor"
            />
          </button>
        </div>
      </Card>
    </div>
  )
}

export default SortableLinks
