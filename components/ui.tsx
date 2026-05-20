import Link from 'next/link'
import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
      {children}
    </div>
  )
}

type SectionProps = ContainerProps & {
  id?: string
}

export function Section({ children, className = '', id }: SectionProps) {
  return <section id={id} className={`py-16 ${className}`}>{children}</section>
}

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ eyebrow, title, description, className = '' }: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-muted md:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}

export function Card({ children, className = '' }: ContainerProps) {
  return (
    <div className={`rounded-xl border border-line bg-card p-5 transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-soft md:p-6 ${className}`}>
      {children}
    </div>
  )
}

type ButtonProps = {
  href: string
  children: ReactNode
  className?: string
  target?: string
  rel?: string
}

export function ButtonPrimary({ href, children, className = '', target, rel }: ButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center justify-center rounded-full border border-ink bg-ink px-5 py-3 text-sm font-semibold text-cream transition duration-200 hover:-translate-y-0.5 hover:bg-ink-soft ${className}`}
    >
      {children}
    </Link>
  )
}

export function ButtonGhost({ href, children, className = '', target, rel }: ButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center justify-center rounded-full border border-line bg-transparent px-5 py-3 text-sm font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-card ${className}`}
    >
      {children}
    </Link>
  )
}
