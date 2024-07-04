import { MouseEvent } from "react";

export function handlePaginationClick(
  e: MouseEvent,
  setCurrentPage: (currentPage: number) => void
) {
  const target = e.target as HTMLElement;
  const btn = target.closest("button");

  if (!btn) return;

  setCurrentPage(+btn.value);
}
