import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import * as Algorand from '@/lib/algorand'

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
    const viewer = url.searchParams.get('viewer')
    if (!viewer) return NextResponse.json({ error: 'viewer required' }, { status: 400 })

    const db = await readDB()

    // 1) Memories the viewer owns themself
    const ownMemories = typeof Algorand.getMemoriesForOwner === 'function'
      ? await Algorand.getMemoriesForOwner(viewer)
      : []

    // 2) Find owners who have viewer in their family lists
    const owners = Object.keys(db).filter(owner => Array.isArray(db[owner]) && db[owner].includes(viewer))

    // 3) Gather memories from those owners (concurrently)
    const ownerMemoriesArrays = await Promise.all(
      owners.map(async (owner) => {
        if (typeof Algorand.getMemoriesForOwner === 'function') {
          return await Algorand.getMemoriesForOwner(owner)
        } else {
          return []
        }
      })
    )

    const combined = [
      ...ownMemories,
      ...ownerMemoriesArrays.flat()
    ]

    return NextResponse.json({ memories: combined })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
