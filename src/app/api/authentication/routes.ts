import { NextRequest, NextResponse } from 'next/server'
import { signInUser } from '@/services/authentication/signIn'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  const result = await signInUser(username, password)

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 401 })
  }

  return NextResponse.json({ user: result.data?.username })
}
