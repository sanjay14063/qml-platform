import { redirect } from 'next/navigation'
import { getAllModuleSlugs } from '@/lib/mdx'

export async function generateStaticParams() {
  const slugs = await getAllModuleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function LibraryModuleRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  redirect(`/foundations/${slug}`)
}
