import { NextRequest, NextResponse } from 'next/server'
import { save, get } from '@/services/settings/menu'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const result = await save(data)

  console.log(data, '0000000000000000000000000000')
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 401 })
  }

  return NextResponse.json({ user: result.data })
}

export async function GET() {
  const result = await get()

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 401 })
  }

  return NextResponse.json({ data: result.data }, { status: 200 })
}
