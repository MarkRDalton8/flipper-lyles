import { PlayfieldCallout } from "./types";

export function renderDescription(text: string, callouts: PlayfieldCallout[] = []): string {
  return text.replace(/\{\{callout:([\w_-]+)\}\}/g, (match, id) => {
    const callout = callouts.find((c) => c.id === id);
    const name = callout ? callout.name : id;
    return `<a class="callout-link" data-callout-id="${id}">${name}</a>`;
  });
}
