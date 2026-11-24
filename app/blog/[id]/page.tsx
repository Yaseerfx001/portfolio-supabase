import SafeImage from "@/components/SafeImage";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";

// In newer versions of Next.js (15 and 16), "params" is a Promise, so we
// "await" it. Awaiting also works fine on older versions, so this is safe everywhere.
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { blog } = await getContent();
  const post = blog.find((p) => p.id === id);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-prose px-6 py-16">
      <p className="text-xs text-ink-light/50 dark:text-ink-dark/50">{post.date}</p>
      <h1 className="font-display text-3xl mt-2 mb-6">{post.title}</h1>

      <div className="aspect-video rounded-md overflow-hidden mb-8">
        <SafeImage
          src={post.coverImage}
          alt={post.title}
          width={800}
          height={450}
          className="object-cover w-full h-full"
        />
      </div>

      {/* content is stored as plain text/markdown in content.json.
          Split on blank lines so multi-paragraph posts still look right. */}
      <div className="space-y-4 leading-relaxed">
        {post.content.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
