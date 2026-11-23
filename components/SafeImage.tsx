import Image from "next/image";

// A wrapper around next/image that never crashes the page.
// If the image field is empty (or isn't a valid path / https link), it shows a
// plain grey box instead. This matters now that the admin page lets you clear
// or type any value into an image field.
export default function SafeImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  const valid =
    (src.startsWith("/") && !src.startsWith("//")) || src.startsWith("https://");

  if (!src || !valid) {
    return (
      <div
        className={`${className} bg-ink-light/5 dark:bg-ink-dark/10`}
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
