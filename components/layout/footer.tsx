'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FlaskConical, Mail, MapPin, Clock } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const lp = `/${locale}`;

  const t = useTranslations('footer');
  const tHero = useTranslations('hero');
  const tCat = useTranslations('product.categories');
  const tPurity = useTranslations('features.highPurity');

  const productsLinks = [
    { href: `${lp}/products`, label: t('allProducts') },
    { href: `${lp}/products?category=peptides`, label: tCat('peptides') },
    { href: `${lp}/products?category=glp1`, label: tCat('glp1') },
    { href: `${lp}/products?category=sarms`, label: tCat('sarms') },
    { href: `${lp}/products?category=research-supplies`, label: tCat('researchSupplies') },
  ];

  const companyLinks = [
    { href: `${lp}/about`, label: t('about') },
    { href: `${lp}/b2b`, label: t('b2b') },
    { href: `${lp}/test-results`, label: t('testResults') },
    { href: `${lp}/contact`, label: t('contact') },
  ];

  const supportLinks = [
    { href: `${lp}/faq`, label: t('faq') },
    { href: `${lp}/shipping`, label: t('shipping') },
    { href: `${lp}/quality`, label: t('quality') },
  ];

  const legalLinks = [
    { href: `${lp}/privacy`, label: t('privacy') },
    { href: `${lp}/terms`, label: t('terms') },
    { href: `${lp}/disclaimer`, label: t('disclaimer') },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href={`${lp}/`} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AnkhPeptide</span>
            </Link>
            <p className="text-sm text-slate-400 mb-4">
              {tHero('title')} | {tPurity('title')}
            </p>
            <p className="text-xs text-slate-500">
              {tHero('subtitle')}
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4" />
                <span>sales@ankhpeptide.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>European Union</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                <span>Mon-Fri 9:00-18:00 CET</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">{t('products')}</h4>
            <ul className="space-y-2">
              {productsLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t('company')}</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t('support')}</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mt-6 mb-4">{t('legal')}</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-4 mb-8">
            <p className="text-sm text-slate-400 text-center">
              <strong className="text-yellow-500">{t('disclaimer')}</strong>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} AnkhPeptide. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
