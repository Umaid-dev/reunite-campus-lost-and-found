export function sampleItems() {
  const daysAgo = n => { const d = new Date(); d.setUTCDate(d.getUTCDate() - n); return d.toISOString().slice(0, 10); };
  return [
    { title: 'Sony wireless headphones', description: 'Black over-ear headphones in a grey carry case. Found on a table near the quiet study area. Tell me a distinguishing detail to confirm ownership.', type: 'found', category: 'Electronics', location: 'Library · Second floor', date: daysAgo(0), contact: 'library@example.com' },
    { title: 'Everyday canvas tote', description: 'Looking for my cream canvas tote with a small green patch. It contains some notebooks. Last seen around the student centre.', type: 'lost', category: 'Bags & accessories', location: 'Student centre', date: daysAgo(1), contact: 'student@example.com' },
    { title: 'Keys with a blue keyring', description: 'A small set of keys with a blue fabric keyring. Picked up near the main entrance. Please describe the attached charm when contacting me.', type: 'found', category: 'Keys & cards', location: 'Main building · Entrance', date: daysAgo(1), contact: 'reception@example.com' },
    { title: 'Sage green water bottle', description: 'Reusable green bottle with a black lid. Left behind after an afternoon class. Please contact me if you have seen it.', type: 'lost', category: 'Other', location: 'Science building · Room 204', date: daysAgo(2), contact: 'owner@example.com' },
    { title: 'Navy zip-up hoodie', description: 'Navy hoodie found on a bench next to the gym. No name on the label. Describe the logo to help confirm it belongs to you.', type: 'found', category: 'Clothing', location: 'Recreation centre', date: daysAgo(2), contact: 'gym@example.com' },
    { title: 'The little blue notebook', description: 'Blue hardback notebook with lecture notes. Its owner has collected it from the library help desk. Thanks for spreading the word!', type: 'found', category: 'Books & stationery', location: 'Library · Help desk', date: daysAgo(4), contact: 'desk@example.com', status: 'returned' }
  ];
}
