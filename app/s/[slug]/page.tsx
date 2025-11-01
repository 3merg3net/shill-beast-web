import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getData(slug: string) {
  const { data: post } = await supabase.from("posts").select("*").eq("slug", slug).single();
  if (!post) return null;

  const { data: project } = await supabase.from("projects").select("*").eq("id", post.project_id).single();

  return {
    title: post.title,
    description: post.description ?? "",
    image: post.image_url,
    cta: post.cta_url || project?.cta_url || project?.website || "",
    redirect: project?.redirect ?? true,
    redirectDelayMs: project?.redirect_delay_ms ?? 0
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getData(params.slug);
  if (!data) return { title: "Not found" };
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [{ url: data.image, width: 1200, height: 630 }],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.image]
    }
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);
  if (!data) return <main className="p-10 text-center text-gray-400">Not found</main>;

  // Control redirect behavior from project settings
  const refresh = data.redirect ? (
    <meta httpEquiv="refresh" content={`${(data.redirectDelayMs ?? 0) / 1000}; url=${data.cta}`} />
  ) : null;

  return (
    <html>
      <head>{refresh}</head>
      <body className="bg-black"></body>
    </html>
  );
}
