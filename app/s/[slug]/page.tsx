import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic"; // don't prerender at build
export const revalidate = 0;

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    // Helpful runtime message if envs are missing on Vercel
    throw new Error("Supabase env vars missing: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createClient(url, key);
}

async function getData(slug: string) {
  const supabase = getClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) return null;

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", post.project_id)
    .single();

  return {
    title: String(post.title),
    description: String(post.description ?? ""),
    image: String(post.image_url),
    cta: String(post.cta_url ?? project?.cta_url ?? project?.website ?? ""),
    redirect: (project?.redirect as boolean) ?? true,
    redirectDelayMs: (project?.redirect_delay_ms as number) ?? 0,
  };
}

// Next 15: params can be a Promise
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) return { title: "Not found" };

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [{ url: data.image, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.image],
    },
  };
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) return <main className="p-10 text-center text-gray-400">Not found</main>;

  const refresh = data.redirect
    ? <meta httpEquiv="refresh" content={`${(data.redirectDelayMs ?? 0) / 1000}; url=${data.cta}`} />
    : null;

  return (
    <html>
      <head>{refresh}</head>
      <body className="bg-black" />
    </html>
  );
}
