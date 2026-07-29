/**
 * Minimal className combiner — avoids pulling in `clsx`/`tailwind-merge`
 * for something this small. Falsy values are filtered out.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}