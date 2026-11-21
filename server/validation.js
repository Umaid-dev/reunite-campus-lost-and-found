import { CATEGORIES, TYPES } from '../shared/constants.js';
export function validateItem(body) {
  const errors = {};
  const item = {};
  const fields = { title: [3, 80], description: [10, 1000], location: [2, 100], contact: [3, 120] };
  for (const [key, [min, max]] of Object.entries(fields)) {
    const value = typeof body[key] === 'string' ? body[key].trim() : '';
    if (value.length < min || value.length > max) errors[key] = `Use ${min}–${max} characters.`;
    item[key] = value;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.contact)) errors.contact = 'Enter a valid email address.';
  if (!TYPES.includes(body.type)) errors.type = 'Choose lost or found.';
  if (!CATEGORIES.includes(body.category)) errors.category = 'Choose a valid category.';
  const date = typeof body.date === 'string' ? body.date : '';
  const parsed = new Date(`${date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date || date > new Date().toISOString().slice(0, 10)) errors.date = 'Choose a real date that is not in the future.';
  Object.assign(item, { type: body.type, category: body.category, date });
  return { item, errors };
}
