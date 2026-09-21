'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const supported = ['en', 'zh', 'zh-TW', 'ja', 'ko', 'es', 'de', 'fr', 'nl', 'ar', 'tr', 'fa', 'vi', 'th', 'ms', 'id', 'tl']

const texts: Record<string, { title: string; desc: string; home: string }> = {
  en: { title: 'Page not found', desc: 'Sorry, the page you are looking for does not exist or may have been removed.', home: 'Back to home' },
  zh: { title: '页面未找到', desc: '抱歉，您访问的页面不存在或已被移除。', home: '返回首页' },
  'zh-TW': { title: '頁面未找到', desc: '抱歉，您訪問的頁面不存在或已被移除。', home: '返回首頁' },
  ja: { title: 'ページが見つかりません', desc: 'お探しのページは存在しないか、削除された可能性があります。', home: 'ホームに戻る' },
  ko: { title: '페이지를 찾을 수 없습니다', desc: '요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.', home: '홈으로 돌아가기' },
  es: { title: 'Página no encontrada', desc: 'Lo sentimos, la página que buscas no existe o ha sido eliminada.', home: 'Volver al inicio' },
  de: { title: 'Seite nicht gefunden', desc: 'Die gesuchte Seite existiert nicht oder wurde entfernt.', home: 'Zurück zur Startseite' },
  fr: { title: 'Page introuvable', desc: "Désolé, la page que vous recherchez n'existe pas ou a été supprimée.", home: "Retour à l'accueil" },
  nl: { title: 'Pagina niet gevonden', desc: 'De gezochte pagina bestaat niet of is verwijderd.', home: 'Terug naar home' },
  ar: { title: 'الصفحة غير موجودة', desc: 'عذرًا، الصفحة التي تبحث عنها غير موجودة أو تمت إزالتها.', home: 'العودة إلى الرئيسية' },
  tr: { title: 'Sayfa bulunamadı', desc: 'Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.', home: 'Ana sayfaya dön' },
  fa: { title: 'صفحه یافت نشد', desc: 'با عرض پوزش، صفحه مورد نظر وجود ندارد یا حذف شده است.', home: 'بازگشت به صفحه اصلی' },
  vi: { title: 'Không tìm thấy trang', desc: 'Xin lỗi, trang bạn tìm kiếm không tồn tại hoặc đã bị gỡ.', home: 'Về trang chủ' },
  th: { title: 'ไม่พบหน้าเพจ', desc: 'ขออภัย หน้าที่คุณค้นหาไม่มีอยู่หรือถูกลบไปแล้ว', home: 'กลับสู่หน้าแรก' },
  ms: { title: 'Halaman tidak dijumpai', desc: 'Maaf, halaman yang anda cari tidak wujud atau telah dialih keluar.', home: 'Kembali ke laman utama' },
  id: { title: 'Halaman tidak ditemukan', desc: 'Maaf, halaman yang Anda cari tidak ada atau telah dihapus.', home: 'Kembali ke beranda' },
  tl: { title: 'Hindi nahanap ang pahina', desc: 'Pasensya, ang pahinang hinahanap mo ay wala o naalis na.', home: 'Bumalik sa home' },
}

export default function NotFound() {
  const pathname = usePathname() || ''
  const [locale, setLocale] = useState('en')
  useEffect(() => {
    const seg = pathname.split('/').filter(Boolean)[0]
    setLocale(supported.includes(seg) ? seg : 'en')
  }, [pathname])
  const t = texts[locale] || texts.en

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">{t.title}</h1>
      <p className="text-slate-600 mb-6">{t.desc}</p>
      <Link
        href={`/${locale}`}
        className="inline-block rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        {t.home}
      </Link>
    </div>
  )
}