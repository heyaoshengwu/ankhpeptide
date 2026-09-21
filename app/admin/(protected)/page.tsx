import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Package, MessageSquare } from 'lucide-react'

export default async function AdminDashboard() {
  const [totalProducts, publishedProducts, totalInquiries] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { published: true } }),
    prisma.inquiry.count(),
  ])

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: Package, href: '/admin/products' },
    { label: 'Published', value: publishedProducts, icon: Package, href: '/admin/products' },
    { label: 'Inquiries', value: totalInquiries, icon: MessageSquare, href: '/admin/products' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <s.icon className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Quick Actions</h2>
        <div className="flex gap-3">
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Add Product
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50"
          >
            Manage Products
          </Link>
        </div>
      </div>
    </div>
  )
}
