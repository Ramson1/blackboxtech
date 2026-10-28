export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      data-cfasync="false"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
