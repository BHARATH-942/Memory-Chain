import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'families.json')

async function readDB() {
  try {
    const txt = await fs.readFile(DB_PATH, 'utf8')
    return JSON.parse(txt || '{}')
  } catch (e) {
    return {}
  }
}

async function writeDB(obj: Record<string, string[]>) {
  await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })
  await fs.writeFile(DB_PATH, JSON.stringify(obj, null, 2), 'utf8')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const owner: string = body.owner
    const member: string = body.member

    if (!owner || !member) return NextResponse.json({ error: 'owner and member required' }, { status: 400 })

    const db = await readDB()
    const arr: string[] = Array.isArray(db[owner]) ? db[owner] : []
    db[owner] = arr.filter((m: string) => m !== member)
    await writeDB(db)

    return NextResponse.json({ ok: true, members: db[owner] })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
