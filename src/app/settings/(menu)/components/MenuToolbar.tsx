'use client'

import { Button } from '@/components/ui/button'
import { useMenuStore } from '../stores/useMenuStore2'

export default function MenuToolbar() {
  const { resetChanges, saveToDB } = useMenuStore()

  const handleReset = () => {
    resetChanges()
  }

  const handleSave = async () => {
    await saveToDB()
  }

  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={handleReset}>
        Reset
      </Button>
      <Button variant="outline" onClick={handleSave}>
        Save Change
      </Button>
    </div>
  )
}
