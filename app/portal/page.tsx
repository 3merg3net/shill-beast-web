"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

/** Prevent static export / prerender */
export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Lazy Supabase client (only created in the browser, on demand) */
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    // Show a friendly message client-side instead of crashing build
    throw new Error(
      "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel → Project → Settings → Environment Variables (for Preview and Production) and redeploy."
    );
  }
  return createClient(url, key);
}

type UploadSlot = { file?: File; url?: string; status?: "idle"|"uploading"|"done"|"error"; };

export default function Portal() {
  // form state
  const [name, setName] = useState("Base Gold");
  const [slug, setSlug] = useState("basegold-1");
  const [website, setWebsite] = useState("https://basereserve.gold");
  const [ctaUrl, setCtaUrl] = useState("https://basereserve.gold");
  const [hashtags, setHashtags] = useState("#Base,#DeFi");
  const [xHandle, setXHandle] = useState("@BaseGold");
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [github, setGithub] = useState("");
  const [medium, setMedium] = useState("");

  // post fields (OG)
  const [title, setTitle] = useState("Base Gold — Stake on Base");
  const [desc, setDesc] = useState("Stake digital gold on Base. Earn passive yield.");
  const [imageUrl, setImageUrl] = useState("/hero.png");

  // redirect options
  const [redirect, setRedirect] = useState(true);
  const [redirectDelayMs, setRedirectDelayMs] = useState(0);

  const [note, setNote] = useState("");
  const [envOk, setEnvOk] = useState<boolean>(true);

  useEffect(() => {
    // lightweight check only on client
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setEnvOk(false);
      setNote("Missing Supabase env vars. Set them in Vercel and redeploy.");
    }
  }, []);

  // restore/persist
  useEffect(() => {
    const saved = localStorage.getItem("shillbeast.portal.v2");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        setName(s.name ?? name);
        setSlug(s.slug ?? slug);
        setWebsite(s.website ?? website);
        setCtaUrl(s.ctaUrl ?? ctaUrl);
        setHashtags(s.hashtags ?? hashtags);
        setXHandle(s.xHandle ?? xHandle);
        setTelegram(s.telegram ?? telegram);
        setDiscord(s.discord ?? discord);
        setGithub(s.github ?? github);
        setMedium(s.medium ?? medium);
        setTitle(s.title ?? title);
        setDesc(s.desc ?? desc);
        setImageUrl(s.imageUrl ?? imageUrl);
        setRedirect(s.redirect ?? redirect);
        setRedirectDelayMs(s.redirectDelayMs ?? redirectDelayMs);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const payload = { name, slug, website, ctaUrl, hashtags, xHandle, telegram, discord, github, medium, title, desc, imageUrl, redirect, redirectDelayMs };
    localStorage.setItem("shillbeast.portal.v2", JSON.stringify(payload));
  }, [name, slug, website, ctaUrl, hashtags, xHandle, telegram, discord, github, medium, title, desc, imageUrl, redirect, redirectDelayMs]);

  const landingUrl = useMemo(() => `/s/${slug}`, [slug]);

  async function fetchFromWebsite() {
    setNote("Fetching site metadata…");
    try {
      const res = await fetch("/api/fetch-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: website })
      });
      const data = await res.json();
      if (data.title) setTitle(data.title);
      if (data.description) setDesc(data.description);
      if (data.image) setImageUrl(data.image);
      setNote("Pulled metadata. Review and adjust as needed.");
    } catch {
      setNote("Could not fetch metadata. Fill these manually.");
    }
  }

  async function handleUpload(i: number, file?: File) {
    if (!file) return;
    try {
      const supabase = getSupabase();
      const ext = file.name.split(".").pop() || "png";
      const objectName = `${slug}-${i+1}.${ext}`;
      const path = objectName;

      setNote("Uploading…");
      const { error } = await supabase.storage.from("shill-images").upload(path, file, {
        upsert: true,
        contentType: file.type
      });
      if (error) throw error;

      const { data: pub } = supabase.storage.from("shill-images").getPublicUrl(path);
      const url = pub?.publicUrl;

      setUploads(prev => prev.map((u, idx) => idx===i ? { ...u, url, status: "done" } : u));
      setNote("Upload complete ✅");
    } catch (e: any) {
      setNote(`Upload failed: ${e?.message ?? "unknown error"}`);
      setUploads(prev => prev.map((u, idx) => idx===i ? { ...u, status: "error" } : u));
    }
  }

  async function saveToSupabase() {
    try {
      const supabase = getSupabase();
      setNote("Saving to Supabase…");

      const proj = {
        name,
        slug,
        website,
        cta_url: ctaUrl,
        hashtags: hashtags.split(",").map(s=>s.trim()).filter(Boolean),
        x_handle: xHandle,
        telegram,
        discord,
        github,
        medium,
        redirect,
        redirect_delay_ms: Number(redirectDelayMs) || 0
      };

      const { data: project, error: pErr } = await supabase
        .from("projects")
        .upsert(proj, { onConflict: "slug" })
        .select()
        .single();

      if (pErr) throw pErr;

      const post = {
        project_id: project.id,
        slug,
        title,
        description: desc,
        image_url: imageUrl,
        cta_url: ctaUrl
      };

      const { error: postErr } = await supabase.from("posts").upsert(post, { onConflict: "slug" });
      if (postErr) throw postErr;

      setNote(`Saved ✅ — OG URL: ${landingUrl}`);
    } catch (e: any) {
      setNote(`Save failed: ${e?.message ?? "unknown error"}`);
    }
  }

  const [uploads, setUploads] = useState<UploadSlot[]>([{},{},{}]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-cyan-300">Project Portal</h1>
      {!envOk && (
        <p className="text-amber-300 text-sm">
          Missing Supabase env vars. Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in Vercel → Project → Settings → Environment Variables (Preview & Production), then redeploy.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT: Project & socials */}
        <section className="space-y-5">
          <div className="grid gap-3">
            <label className="text-sm text-gray-400">Project Name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} />
          </div>

          <div className="grid gap-3">
            <label className="text-sm text-gray-400">Slug (used at /s/[slug])</label>
            <input className="input" value={slug} onChange={e=>setSlug(e.target.value)} />
            <p className="text-xs text-gray-400">Tweet this URL: <span className="text-cyan-300">{landingUrl}</span></p>
          </div>

          <div className="grid gap-3">
            <label className="text-sm text-gray-400">Website (for metadata fetch)</label>
            <input className="input" value={website} onChange={e=>setWebsite(e.target.value)} />
            <button onClick={fetchFromWebsite} className="btn mt-2">Fetch from website</button>
          </div>

          <div className="grid gap-3">
            <label className="text-sm text-gray-400">CTA URL (click-thru)</label>
            <input className="input" value={ctaUrl} onChange={e=>setCtaUrl(e.target.value)} />
          </div>

          <div className="grid gap-3">
            <label className="text-sm text-gray-400">Hashtags (comma)</label>
            <input className="input" value={hashtags} onChange={e=>setHashtags(e.target.value)} />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-400">X Handle</label>
              <input className="input" value={xHandle} onChange={e=>setXHandle(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-400">Telegram Link</label>
              <input className="input" value={telegram} onChange={e=>setTelegram(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-400">Discord</label>
              <input className="input" value={discord} onChange={e=>setDiscord(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-400">GitHub</label>
              <input className="input" value={github} onChange={e=>setGithub(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-400">Medium / Blog</label>
              <input className="input" value={medium} onChange={e=>setMedium(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-3">
            <label className="text-sm text-gray-400">Redirect from OG page</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={redirect} onChange={e=>setRedirect(e.target.checked)} />
                Enable auto-redirect
              </label>
              <input className="input w-40" type="number" min={0} step={100} value={redirectDelayMs} onChange={e=>setRedirectDelayMs(Number(e.target.value))} />
              <span className="text-xs text-gray-400">delay ms (0 = instant)</span>
            </div>
          </div>
        </section>

        {/* RIGHT: Post (OG) */}
        <section className="space-y-5">
          <div className="grid gap-3">
            <label className="text-sm text-gray-400">OG Title</label>
            <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <label className="text-sm text-gray-400">OG Description</label>
            <textarea className="input min-h-24" value={desc} onChange={e=>setDesc(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <label className="text-sm text-gray-400">OG Image URL (1200x630)</label>
            <input className="input" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
            <img src={imageUrl} alt="preview" className="mt-2 max-h-48 rounded border border-white/10" />
            <p className="text-xs text-gray-400">Tip: upload to your Supabase bucket and paste the public URL.</p>
          </div>

          <div className="flex gap-3">
            <button onClick={saveToSupabase} className="btn">Save</button>
            <a href={landingUrl} className="btn-outline">Open OG page</a>
          </div>

          {note && <p className="text-xs text-amber-300">{note}</p>}
        </section>
      </div>

      <div className="rounded-xl border border-white/10 p-4 mt-6">
        <p className="text-gray-400 text-xs">
          Upload slots:
        </p>
        {uploads.map((u, i)=>(
          <div key={i} className="flex items-center gap-3 mt-2">
            <input type="file" accept="image/*" onChange={(e)=> {
              const file = e.target.files?.[0];
              if (file) {
                // optimistic local state
                // @ts-ignore
                setUploads(prev => prev.map((x, idx)=> idx===i ? {...x, file, status:"idle"} : x));
                handleUpload(i, file);
              }
            }} />
            <span className="text-xs text-gray-400">
              {u.status === "uploading" && "Uploading…"}
              {u.status === "done" && "Done ✅"}
              {u.status === "error" && "Error ❌"}
              {!u.status && "—"}
            </span>
            {u.url && <a className="text-cyan-300 text-xs hover:underline break-all" href={u.url} target="_blank">{u.url}</a>}
          </div>
        ))}
      </div>

      <style jsx global>{`
        .input { @apply w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-cyan-400; }
        .btn { @apply px-4 py-2 rounded-lg bg-cyan-500/90 text-black font-semibold hover:bg-cyan-400; }
        .btn-outline { @apply px-4 py-2 rounded-lg border border-cyan-400/40 text-cyan-300 hover:bg-white/5; }
      `}</style>
    </main>
  );
}
