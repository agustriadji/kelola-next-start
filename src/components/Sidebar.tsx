'use client'

import { useMenuStore } from '@/app/settings/(menu)/stores/useMenuStore2'
import {
  Home,
  LayoutDashboard,
  LucideChevronDown,
  LucideChevronRight,
  LucideIcon,
} from 'lucide-react'
import { useState } from 'react'

type Props = {
  className?: string
}

export default function SidebarMenu({ className }: Props) {
  const { menuTree } = useMenuStore()

  const [openIds, setOpenIds] = useState<string[]>([])

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const isOpen = (id: string) => openIds.includes(id)

  const renderMenu = (menu: (typeof menuTree)[number], depth = 0) => {
    const paddingLeft = depth * 12
    const hasChildren = menu?.children?.length > 0
    const isExpanded = isOpen(menu.id)

    const IconComponent = menu.icon
      ? (LucideIconMap[menu.icon] ?? LayoutDashboard)
      : LayoutDashboard

    return (
      <div key={menu.id} className={`py-1 pl-[${paddingLeft}px] space-y-2`}>
        <div
          onClick={() => hasChildren && toggleOpen(menu.id)}
          className="flex items-center gap-2 text-sm cursor-pointer block py-1 px-1 rounded hover:bg-gray-500"
        >
          <span>{menu.name}</span>
          {hasChildren && (
            <span className="ml-auto text-2xl text-gray-400">
              {isExpanded ? <LucideChevronDown /> : <LucideChevronRight />}
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-3 border-l pl-3 mt-1">
            {menu.children.map((child) => renderMenu(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className="w-64 border-r border-gray-200 bg-white p-2 flex flex-col space-y-2">
      <nav className={className}>{menuTree.map((item) => renderMenu(item))}</nav>
    </aside>
  )
}

// Sementara icon dummy:
const LucideIconMap: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  home: Home,
}
