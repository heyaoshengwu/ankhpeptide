import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
import { unlink } from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/opt/apeptide/uploads'

function fileNameFromUrl(url: string) {
  const parts = url.split('/')
  return parts[parts.length - 1]
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const doc = await prisma.document.findUnique({ where: { id } })
  if (!doc) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await prisma.document.delete({ where: { id } })

  const name = fileNameFromUrl(doc.fileUrl)
  if (name) {
    try {
      await unlink(path.join(UPLOAD_DIR, name))
    } catch {
      // file may not exist; ignore
    }
  }

  return NextResponse.json({ success: true })
}