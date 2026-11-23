import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";

export default async function BlogPage() {
  const { blog } = await getContent();
  const posts = [...blog].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader title="Blog" description="Notes on what I'm learning and building." />

      <div className="space-y-8">
        {posts.map((post) => (
          <Reveal key={post.id}>
            <Link
              href={`/blog/${post.id}`}
              className="flex flex-col sm:flex-row gap-4 hr-line border-b pb-8 group"
            >
              <div className="sm:w-48 aspect-video rounded-md overflow-hidden shrink-0">
                <SafeImage
                  src={post.coverImage}
                  alt={post.title}
                  width={400}
                  height={225}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-xs text-ink-light/50 dark:text-ink-dark/50">{post.date}</p>
                <h3 className="font-display text-lg group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm mt-1 text-ink-light/70 dark:text-ink-dark/70">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}

        {posts.length === 0 && (
          <p className="text-sm text-ink-light/50">No posts published yet.</p>
        )}
      </div>
    </div>
  );
}
