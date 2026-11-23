export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <h1 className="font-display text-3xl mb-2">{title}</h1>
      {description && (
        <p className="text-ink-light/70 dark:text-ink-dark/70 max-w-prose">
          {description}
        </p>
      )}
    </div>
  );
}
