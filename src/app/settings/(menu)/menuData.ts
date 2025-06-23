import { MenuInterface } from '@/types/menu'

export const dummyMenu: MenuInterface[] = [
  {
    id: '1',
    name: 'Dashboard',
    icon: 'layout-dashboard',
    parent: null,
    children: [],
  },
  {
    id: '2',
    name: 'Dashboard2',
    icon: 'layout-dashboard',
    parent: null,
    children: [
      {
        id: '3',
        name: 'Dashboard2.1',
        icon: 'layout-dashboard',
        parent: '2',
        children: [],
      },
    ],
  },
]
