import { z } from 'zod'
import { MenuInterface } from '@/types/menu'

export const MenuSchema: z.ZodType<MenuInterface> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    url: z.string().optional(),
    icon: z.string().optional(),
    parent: z.string().nullable().optional(),
    children: z.array(MenuSchema).optional(),
  }),
)

export const MenuListSchema: z.ZodType<MenuInterface[]> = z.array(MenuSchema)

export type MenuSchemaType = z.infer<typeof MenuSchema>
export type MenuListSchemaType = z.infer<typeof MenuListSchema>
