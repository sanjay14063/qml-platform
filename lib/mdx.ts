import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import type { MDXComponents } from 'mdx/types'
import type { ComponentType } from 'react'

const contentDir = path.join(process.cwd(), 'content')
type MdxContentComponent = ComponentType<{ components?: MDXComponents }>

export type ResearchPaperWalkthrough = {
  slug: string
  kind: 'paper-walkthrough'
  order?: number
  title?: string
  paperTitle?: string
  authors?: string
  description?: string
  venue?: string
  year?: string
  status?: string
}

function normalizeMathDelimiters(content: string) {
  return content
    .replace(/\\\[((?:.|\n)*?)\\\]/g, (_, math) => `$$${math}$$`)
    .replace(/\\\((.*?)\\\)/g, (_, math) => `$${math}$`)
}

export async function getModuleBySlug(slug: string) {
  const fullPath = path.join(contentDir, 'modules', `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  const raw = fs.readFileSync(fullPath, 'utf-8').trimStart()
  const { data, content } = matter(raw)
  const normalizedContent = normalizeMathDelimiters(content)
  const Content = await compileMdxToComponent(normalizedContent)
  return { frontmatter: data, content: normalizedContent, Content }
}

export async function getAllModuleSlugs() {
  const modulesDir = path.join(contentDir, 'modules')
  if (!fs.existsSync(modulesDir)) return []
  const files = fs.readdirSync(modulesDir).filter((f) => f.endsWith('.mdx') && !f.startsWith('module-template'))
  return files.map((f) => f.replace('.mdx', ''))
}

export async function getPostBySlug(slug: string, folder: string) {
  const fullPath = path.join(contentDir, folder, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  const raw = fs.readFileSync(fullPath, 'utf-8').trimStart()
  const { data, content } = matter(raw)
  const normalizedContent = normalizeMathDelimiters(content)
  const Content = await compileMdxToComponent(normalizedContent)
  return { frontmatter: data, content: normalizedContent, Content }
}

export async function getAllPostSlugs(folder: string) {
  const dir = path.join(contentDir, folder)
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  return files.map((f) => f.replace('.mdx', ''))
}

export async function getResearchPaperWalkthroughs() {
  const slugs = await getAllPostSlugs('research')
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug, 'research')
      if (!post || post.frontmatter.kind !== 'paper-walkthrough') return null
      return { slug, ...post.frontmatter } as ResearchPaperWalkthrough
    })
  )

  return posts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((a, b) => {
      const aOrder = typeof a.order === 'number' ? a.order : 999
      const bOrder = typeof b.order === 'number' ? b.order : 999
      return aOrder - bOrder
    })
}

export const mdxOptions = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
}

async function compileMdxToComponent(source: string): Promise<MdxContentComponent> {
  const compiled = await evaluate(source, {
    ...runtime,
    // Keep plugin wiring centralized; cast avoids vfile type duplication noise.
    remarkPlugins: mdxOptions.remarkPlugins as any[],
    rehypePlugins: mdxOptions.rehypePlugins as any[],
  })

  return compiled.default as MdxContentComponent
}
