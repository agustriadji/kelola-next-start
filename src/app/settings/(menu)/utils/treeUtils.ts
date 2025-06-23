import { arrayMove } from '@dnd-kit/sortable'
import { MenuItem } from '../types'

export type FlattenedItem = {
  id: string
  parentId: string | null
  depth: number
  data: MenuItem
}

export function flattenTree(
  tree: MenuItem[],
  parentId: string | null = null,
  depth = 0,
): FlattenedItem[] {
  return tree.flatMap((node) => {
    const item: FlattenedItem = {
      id: node.id,
      parentId,
      depth,
      data: node,
    }

    const children = node.children?.length ? flattenTree(node.children, node.id, depth + 1) : []

    return [item, ...children]
  })
}

export function buildTree(flat: FlattenedItem[]): MenuItem[] {
  const map = new Map<string, MenuItem & { children: MenuItem[] }>()

  flat.forEach(({ data }) => {
    map.set(data.id, { ...data, children: [] })
  })

  const tree: MenuItem[] = []

  flat.forEach(({ id, parentId }) => {
    const item = map.get(id)!
    if (parentId === null) {
      tree.push(item)
    } else {
      const parent = map.get(parentId)
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(item)
      }
    }
  })

  return tree
}

export function moveItem(flat: FlattenedItem[], activeId: string, overId: string): FlattenedItem[] {
  const oldIndex = flat.findIndex((i) => i.id === activeId)
  const newIndex = flat.findIndex((i) => i.id === overId)
  return arrayMove(flat, oldIndex, newIndex)
}

export function findParentId(
  items: MenuItem[],
  childId: string,
  parentId: string | null = null,
): string | null {
  for (const item of items) {
    if (item.id === childId) return parentId
    if (item.children) {
      const found = findParentId(item.children, childId, item.id)
      if (found) return found
    }
  }
  return null
}

export function insertItemToParent(
  tree: MenuItem[],
  item: MenuItem,
  parentId: string | null,
): MenuItem[] {
  if (parentId === null) return [...tree, item]

  return tree.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), item],
      }
    }

    console.log('check')

    if (node.children) {
      return {
        ...node,
        children: insertItemToParent(node.children, item, parentId),
      }
    }

    return node
  })
}

export function removeItem(flat: FlattenedItem[], id: string): FlattenedItem[] {
  return flat.filter((item) => item.id !== id)
}

// Menyisipkan item sebagai child dari parentId
export function insertItem(
  flat: FlattenedItem[],
  item: FlattenedItem,
  parentId: string,
): FlattenedItem[] {
  const parent = flat.find((i) => i.id === parentId)
  if (!parent) return flat

  return [
    ...flat,
    {
      ...item,
      parentId: parentId,
      depth: parent.depth + 1,
    },
  ]
}
