import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getData(slug: string) {
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
    title: post.title as string,
    description: (post.description as string) || "",
    image: post.image_url as string,
    cta: (post.cta_url as string) || (project?.cta_url as string) || (project?.website as string) || "",
    redirect: (project?.redirect as boolean) ?? true,
    redirectDelayMs: (project?.redirect_delay_ms as number) ?? 0
  };
}

// 👇 Note params is a Promise<{ slug: string }>
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

// 👇 Same here: await params
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
