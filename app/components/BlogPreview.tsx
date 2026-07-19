import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

async function getLatestBlogs() {
  try {
    const { data } = await supabase
      .from("blackbox_blogs")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(4);
    return data || [];
  } catch {
    return [];
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readTime(content: string) {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function BlogPreview() {
  const blogs = await getLatestBlogs();

  return (
    <section id="blog" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-[-100%] animate-gradient-rotate"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, #ddd7fd 0deg, #ffffff 72deg, #fde8e8 144deg, #ffffff 216deg, #fbbcbc 288deg, #ddd7fd 360deg)",
            filter: "blur(60px)",
            opacity: 0.5,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-crimson-200 uppercase tracking-[0.25em] mb-2">
            Insights &amp; Updates
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            From Our Blog
          </h2>
          <p className="text-gray max-w-2xl mx-auto text-lg">
            Expert insights on software development, AI, startup strategy, and
            technology trends.
          </p>
        </div>

        {blogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {blogs.map((blog, idx) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={blog.cover_image}
                      alt={blog.title}
                      fill
                      priority={idx < 2}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-crimson-200 px-2.5 py-1 rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] text-gray-400 mb-2">
                      {formatDate(blog.published_at)} · {readTime(blog.content)} min read
                    </p>
                    <h3 className="text-base font-bold text-dark mb-2 line-clamp-2 group-hover:text-crimson-200 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-dark hover:bg-dark/80 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
              >
                View All Blogs
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray text-lg">Blog posts coming soon. Stay tuned!</p>
          </div>
        )}
      </div>
    </section>
  );
}
