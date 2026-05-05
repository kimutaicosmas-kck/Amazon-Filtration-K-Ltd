/** Slug helpers for marketing product lines ↔ DB `products.category` values */

export function lineSlugFromName(name) {
  return String(name)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

const ORDERED_LINE_NAMES = [
  'Air Filters',
  'Fuel Filters',
  'Oil Filters',
  'Hydraulic Return Filters',
  'Coolant Filters',
  'Cabin Filters',
];

export function categoryFromLineSlug(slug) {
  if (!slug) return null;
  return ORDERED_LINE_NAMES.find((n) => lineSlugFromName(n) === slug) ?? null;
}
