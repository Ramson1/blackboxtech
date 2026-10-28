"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogCategories } from "@/lib/blog-data";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  category: string;
  tags: string[];
  published_at: string;
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "8" });
      if (category) params.set("category", category);
      if (search) params.set("search", search);

      const res = await fetch(`/api/blogs?${params}`);
      const json = await res.json();
      setBlogs(json.blogs || []);
      setTotalPages(json.totalPages || 1);
    } catch (err) {
      console.error("Blog fetch error:", err);
    }
    setLoading(false);
  }, [page, category, search]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat === category ? "" : cat);
    setPage(1);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-[-100%] animate-gradient-rotate"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, #ddd7fd 0deg, #ffffff 72deg, #fde8e8 144deg, #ffffff 216deg, #fbbcbc 288deg, #ddd7fd 360deg)",
              filter: "blur(60px)",
              opacity: 0.4,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-dark transition-colors">Home</Link>
            <span>/</span>
            <span className="text-dark font-medium">Blog</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Insights &amp; Ideas
          </h1>
          <p className="text-gray text-lg max-w-2xl mx-auto mb-8">
            Expert articles on software development, AI, startup strategy, design, and technology trends from the BlackBox Tech team.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:border-crimson-200 transition-colors"
              />
            </div>
          </form>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-xs font-medium px-4 py-2 rounded-full transition-colors ${
                  category === cat
                    ? "bg-crimson-200 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl aspect-[16/10] mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-6 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
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
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-crimson-200 px-2.5 py-1 rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-[11px] text-gray-400 mb-2">
                        {formatDate(blog.published_at)} · {readTime(blog.content)} min read
                      </p>
                      <h2 className="text-lg font-bold text-dark mb-2 line-clamp-2 group-hover:text-crimson-200 transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-sm text-gray line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-crimson-100 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-crimson-200">B</span>
                        </div>
                        <span className="text-xs text-gray-500">{blog.author}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                        page === i + 1
                          ? "bg-crimson-200 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray text-lg">No articles found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
