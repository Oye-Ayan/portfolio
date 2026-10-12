/**
 * Shared, owner-keyed page scroll lock.
 *
 * Multiple overlays (mobile menu, case-study modal, lightbox) can request a lock
 * independently; the page is only unlocked once every owner has released it.
 * Calls are idempotent per owner, so it is safe to unlock imperatively (e.g. before
 * a programmatic scroll) and again from an effect cleanup.
 */

const owners = new Set<string>();

let saved: {
  htmlOverflow: string;
  bodyOverflow: string;
  bodyPaddingRight: string;
} | null = null;

export function lockScroll(owner: string): void {
  if (typeof document === 'undefined' || owners.has(owner)) return;
  owners.add(owner);
  if (owners.size > 1) return;

  const html = document.documentElement;
  const body = document.body;
  const scrollbarWidth = window.innerWidth - html.clientWidth;

  saved = {
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPaddingRight: body.style.paddingRight,
  };

  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  // Prevent a layout shift when the desktop scrollbar disappears.
  if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
}

export function unlockScroll(owner: string): void {
  if (typeof document === 'undefined' || !owners.delete(owner)) return;
  if (owners.size > 0 || !saved) return;

  document.documentElement.style.overflow = saved.htmlOverflow;
  document.body.style.overflow = saved.bodyOverflow;
  document.body.style.paddingRight = saved.bodyPaddingRight;
  saved = null;
}
