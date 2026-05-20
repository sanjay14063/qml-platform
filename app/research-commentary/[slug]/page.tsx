import { redirect } from 'next/navigation'
import { getAllPostSlugs } from '@/lib/mdx'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs('research')
  return slugs.map((slug) => ({ slug }))
}

export default async function ResearchCommentaryPostRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  redirect(`/research/${slug}`)
}
