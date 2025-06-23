'use client'

import { useMenuStore } from '@/app/settings/(menu)/stores/useMenuStore2'
import { useAuthStore } from '@/store/authentication/signInStore'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { LayoutDashboard, UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { user, setUser } = useAuthStore()
  const { loadFromDB, menuTree } = useMenuStore()
  const [userSignin, setUserSignin] = useState(user?.username)
  const router = useRouter()

  const handleSignOut = () => {
    setUser({ username: null })
    router.push('/signin')
  }

  useEffect(() => {
    loadFromDB()
    console.log(user, '342342')
  }, [])

  return (
    <nav className="flex justify-between items-center bg-black text-white p-4">
      <div className="flex space-x-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-gray-200 hover:text-gray-600"
        >
          <LayoutDashboard className="w-8 h-8" />
          <span>Dashboard</span>
        </Link>
      </div>
      <div className="flex space-x-10 mr-6">
        <Link href="/settings">Settings</Link>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="outline-none">
              <UserCircle2 className="w-7 h-7 text-gray-200" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            align="end"
            sideOffset={10}
            alignOffset={15}
            className="bg-white shadow-md border rounded-md text-sm min-w-[150px] translate-x-[-10px] translate-y-[10px]"
          >
            <DropdownMenu.Separator className="h-px bg-gray-200 " />
            <DropdownMenu.Item className="px-3 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
              <label>{userSignin ?? 'agus'}</label>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={handleSignOut}
              className="px-3 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </nav>
  )
}
