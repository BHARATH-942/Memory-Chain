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

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const owner = url.searchParams.get('owner')
    if (!owner) return NextResponse.json({ error: 'owner required' }, { status: 400 })

    const db = await readDB()
    const arr: string[] = Array.isArray(db[owner]) ? db[owner] : []
    return NextResponse.json({ members: arr })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
