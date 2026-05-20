'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

type MotionBlockProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function MotionBlock({ children, className = '', delay = 0 }: MotionBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.22, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function MotionCard({ children, className = '', delay = 0 }: MotionBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.2, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
