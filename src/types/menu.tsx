export interface MenuInterface {
  id: string
  name: string
  url?: string
  icon?: string
  parent?: string | null
  children?: MenuInterface[]
}
