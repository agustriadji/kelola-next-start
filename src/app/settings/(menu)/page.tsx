'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import MenuFormDialog from './components/MenuFormDialog'
import MenuToolbar from './components/MenuToolbar'
import MenuTree from './components/MenuTree'
import { dummyMenu } from './menuData'
import { useMenuStore } from './stores/useMenuStore2'
import { MenuItem } from './types'

export default function MenuSettingPage() {
  const { setMenuTree, saveChanges, loadFromDB } = useMenuStore()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>(undefined)

  useEffect(() => {
    const load = async () => {
      await loadFromDB()
      if (useMenuStore.getState().menuTree.length === 0) {
        setMenuTree(dummyMenu)
        saveChanges()
      }
    }
    load()
  }, [loadFromDB, setMenuTree, saveChanges])

  const handleAddClick = () => {
    setEditingItem(undefined)
    setDialogOpen(true)
  }

  return (
    <main className="flex justify-center p-6 h-max select-none">
      <Card className="w-full md:max-w-lg">
        <CardHeader className="space-y-1 ">
          <CardTitle className="text-2xl flex justify-between">
            Menu Configuration
            <Button variant="outline" onClick={handleAddClick}>
              <Plus className="w-4 h-4 mr-2" />
              Add Menu
            </Button>
          </CardTitle>
          <CardDescription>Preview list menu</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="p-2 space-y-2">
            <MenuTree
              onEdit={(item) => {
                setEditingItem(item)
                setDialogOpen(true)
              }}
            />
            <MenuToolbar />
            <MenuFormDialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              editingItem={editingItem}
            />
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
