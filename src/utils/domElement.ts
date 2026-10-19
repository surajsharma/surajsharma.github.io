export function toggleClass(element: HTMLElement, className: string) {
  element.classList.toggle(className);
}

export function elementHasClass(element: HTMLElement, className: string) {
  return element.classList.contains(className);
}

export function truncateString(str, maxLength) {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}
