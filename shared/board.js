export function selectItems(
  items,
  {
    query = '',
    category = 'All categories',
    type = 'all',
    savedOnly = false,
    saved = [],
    sort = 'newest',
  } = {},
) {
  const needle = query.trim().toLowerCase();
  return items
    .filter(
      (item) =>
        (!needle ||
          [item.title, item.description, item.location].some((v) =>
            v.toLowerCase().includes(needle),
          )) &&
        (category === 'All categories' || item.category === category) &&
        (type === 'all' ||
          (type === 'returned'
            ? item.status === 'returned'
            : item.type === type && item.status === 'open')) &&
        (!savedOnly || saved.includes(item._id)),
    )
    .sort((a, b) =>
      sort === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
    );
}
export function stats(items) {
  return {
    lost: items.filter((x) => x.type === 'lost' && x.status === 'open').length,
    found: items.filter((x) => x.type === 'found' && x.status === 'open').length,
    returned: items.filter((x) => x.status === 'returned').length,
  };
}
