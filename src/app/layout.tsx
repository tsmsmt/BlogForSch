import type { Metadata, Viewport } from 'next'

import '@/styles/globals.css'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import Analytics from '@/components/analytics'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { MY_NAME, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/constants'
import { cn } from '@/utils/cn'

import Providers from './providers'

type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`
  },
  description: SITE_DESCRIPTION,
  creator: 'TSMSMT',
  manifest: '/site.webmanifest',
  alternates: {
    canonical: SITE_URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  authors: {
    name: MY_NAME,
    url: 'https://tsmsmt.com'
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: 'website',
    locale: 'en-US',
    images: [
      {
        url: '/og-imag.png',
        width: 1280,
        height: 832,
        alt: SITE_DESCRIPTION,
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    siteId: '1111111111111111111',
    creator: '@tsmsmtx',
    creatorId: '1111111111111111111'
  },
  icons: {
    icon: {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favico.ico'
    },
    apple: [
      {
        type: 'image/png',
        url: '/apple-touch-ico.png',
        sizes: '180x180'
      }
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/favico.svg',
        sizes: 'any'
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/favico-16x16.png',
        sizes: '16x16'
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/favico-32x32.png',
        sizes: '32x32'
      }
    ]
  }
}

export const viewport: Viewport = {
  themeColor: {
    color: '#000000'
  }
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html lang='en-US' className={cn(GeistSans.variable, GeistMono.variable)} suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <main className='mx-auto min-h-page max-w-4xl px-6 pt-24 pb-16'>{children}</main>
          <Toaster />
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
