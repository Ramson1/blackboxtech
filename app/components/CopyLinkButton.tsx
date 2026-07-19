"use client";

export function CopyLinkButton({ url }: { url: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url);
      }}
      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-dark hover:text-white transition-colors"
      aria-label="Copy link"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
    </button>
  );
}
