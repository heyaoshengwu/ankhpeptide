import { NextRequest } from 'next/server'
import { createReadStream } from 'fs'
import { stat } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'

const UPLOAD_DIR = process.env.UPLOAD_DIR || '/opt/apeptide/uploads'

const CONTENT_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  csv: 'text/csv',
  txt: 'text/plain',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params
  const filename = segments.join('/')

  if (!filename || filename.includes('..') || filename.includes('/') || filename.startsWith('.')) {
    return new Response('Not found', { status: 404 })
  }

  const full = path.join(UPLOAD_DIR, filename)
  let info
  try {
    info = await stat(full)
  } catch {
    return new Response('Not found', { status: 404 })
  }

  const ext = filename.split('.').pop()?.toLowerCase() || ''
  const type = CONTENT_TYPES[ext] || 'application/octet-stream'

  const stream = createReadStream(full)
  const headers = new Headers()
  headers.set('Content-Type', type)
  headers.set('Content-Length', String(info.size))
  headers.set('Content-Disposition', `inline; filename="${encodeURIComponent(filename.replace(/^[0-9a-f-]{36}-/, ''))}"`)
  headers.set('Cache-Control', 'public, max-age=31536000')

  return new Response(stream as unknown as BodyInit, { headers })
}