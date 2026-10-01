import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves static asset URLs safely across both web (HTTP/HTTPS) and Electron (file:// protocol).
 * Strips leading slash to ensure relative path resolution under Electron base.
 */
export function assetUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }
  return path.startsWith("/") ? path.slice(1) : path;
}
