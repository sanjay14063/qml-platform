import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Container } from '@/components/ui'
import './globals.css'

export const metadata: Metadata = {
  title: 'QML Platform | Quantum Machine Learning',
  description: 'A structured, code-backed learning reference for Quantum Machine Learning',
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.41 7.86 10.94.58.1.79-.25.79-.56v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.18 1.18A10.9 10.9 0 0 1 12 6.16c.98 0 1.95.13 2.87.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.03c0 .31.21.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-ink font-sans antialiased">
        <header className="sticky top-0 z-50 border-b border-line bg-cream/85 backdrop-blur-md">
          <Container>
            <nav className="flex min-h-16 flex-wrap items-center justify-between gap-4 py-3 md:gap-6 md:py-0">
              <Link
                href="/"
                className="text-sm font-bold uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-70"
              >
                QML Platform
              </Link>
              <ul className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted md:gap-7">
                <li><Link href="/foundations" className="transition-colors hover:text-ink">Foundations</Link></li>
                <li><Link href="/research" className="transition-colors hover:text-ink">Research Lab</Link></li>
                <li><Link href="/insights" className="transition-colors hover:text-ink">Insights</Link></li>
                <li><Link href="/about" className="transition-colors hover:text-ink">About</Link></li>
                <li>
                  <Link
                    href="https://github.com/sanjayshivaganesh/qml-platform"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source on GitHub"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-card hover:text-ink"
                  >
                    <GitHubIcon />
                  </Link>
                </li>
              </ul>
            </nav>
          </Container>
        </header>
        <main>{children}</main>
        <footer className="border-t border-line py-8 text-sm text-muted">
          <Container>
            <p>
              QML Platform — A living research reference.{' '}
              <Link href="https://github.com/sanjayshivaganesh/qml-research-lab/tree/main" target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:text-ink">
                View source on GitHub
              </Link>
              .
            </p>
          </Container>
        </footer>
      </body>
    </html>
  )
}
