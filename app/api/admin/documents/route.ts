import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/opt/apeptide/uploads'

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const form = await request.formData()
    const file = form.get('file') as File | null
    const productId = (form.get('productId') as string) || ''
    const type = (form.get('type') as string) || 'COA'
    const locale = (form.get('locale') as string) || 'en'
    const title = (form.get('title') as string) || ''

    if (!file || !productId) {
      return NextResponse.json({ error: 'file and productId are required' }, { status: 400 })
    }
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 50MB)' }, { status: 400 })
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\s+/g, '_')
    const filename = `${crypto.randomUUID()}-${safeName}`
    await mkdir(UPLOAD_DIR, { recursive: true })
    await writeFile(path.join(UPLOAD_DIR, filename), Buffer.from(await file.arrayBuffer()))

    const doc = await prisma.document.create({
      data: {
        productId,
        type,
        locale,
        title: title || file.name,
        fileUrl: `/api/files/${filename}`,
      },
    })

    return NextResponse.json(doc, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}