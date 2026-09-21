import { isAuthenticated } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '../sidebar'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
