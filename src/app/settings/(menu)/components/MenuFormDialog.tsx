'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useMenuStore } from '../stores/useMenuStore2'
import { MenuItem } from '../types'
import { findParentId } from '../utils/treeUtils'

type Props = {
  open: boolean
  onClose: () => void
  editingItem?: MenuItem
}

export default function MenuFormDialog({ open, onClose, editingItem }: Props) {
  const { menuTree, setMenuTree } = useMenuStore()
  const [parentId, setParentId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('')

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name)
      setIcon(editingItem.icon || '')
      setParentId(findParentId(menuTree, editingItem.id))
    } else {
      setName('')
      setIcon('')
      setParentId(null)
    }
  }, [editingItem])

  const handleSave = () => {
    const newItem: MenuItem = {
      id: editingItem?.id || uuidv4(),
      name,
      icon,
      children: editingItem?.children || [],
    }

    let updatedTree = [...menuTree]

    // 1. Hapus item lama jika sedang edit
    if (editingItem) {
      const removeItemById = (items: MenuItem[]): MenuItem[] => {
        return items
          .map((item) => ({
            ...item,
            children: removeItemById(item.children || []),
          }))
          .filter((item) => item.id !== editingItem.id)
      }

      updatedTree = removeItemById(updatedTree)
    }

    // 2. Sisipkan ke parent baru
    const insertItemToParent = (
      items: MenuItem[],
      item: MenuItem,
      parentId: string | null,
    ): MenuItem[] => {
      if (parentId === null) return [...items, item]

      return items.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), item],
          }
        }

        if (node.children) {
          return {
            ...node,
            children: insertItemToParent(node.children, item, parentId),
          }
        }

        return node
      })
    }

    updatedTree = insertItemToParent(updatedTree, newItem, parentId)
    setMenuTree(updatedTree)
    onClose()
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[400px] bg-white p-6 rounded-xl shadow-lg z-50">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              {editingItem ? 'Edit Menu' : 'Add Menu'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button onClick={onClose}>
                <X className="w-4 h-4 text-gray-500 hover:text-black" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Icon</label>
              <Input value={icon} onChange={(e) => setIcon(e.target.value)} />
              <p className="text-xs text-gray-400 mt-1">
                Gunakan nama icon dari lucide (mis. “home”, “activity”)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Parent Menu</label>
              <select
                className="w-full border rounded p-2 text-sm"
                value={parentId || ''}
                onChange={(e) => setParentId(e.target.value === '' ? null : e.target.value)}
              >
                <option value="">Root Level</option>
                {menuTree.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Dialog.Close asChild>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </Dialog.Close>
            <Button onClick={handleSave}>{editingItem ? 'Save' : 'Add'}</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
