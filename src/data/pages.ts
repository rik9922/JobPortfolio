export type PageId = 'home' | 'about' | 'capabilities' | 'journey' | 'play' | 'contact';

export const PAGES: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'journey', label: 'Journey' },
  { id: 'play', label: 'Play' },
  { id: 'contact', label: 'Contact' },
];

export const isPageId = (value: string): value is PageId =>
  PAGES.some((p) => p.id === value);

