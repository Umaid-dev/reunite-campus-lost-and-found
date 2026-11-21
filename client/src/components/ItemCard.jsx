import { MapPin, CalendarDays, Bookmark, Check } from 'lucide-react';
import ItemArt from './ItemArt.jsx';
export function formatDate(value) { return new Intl.DateTimeFormat('en-CA', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`)); }
export default function ItemCard({ item, saved, onSave, onOpen }) {
  const label = item.status === 'returned' ? 'Returned' : item.type === 'lost' ? 'Lost' : 'Found';
  return <article className="item-card">
    <div className={`art-panel art-${item.category.split(' ')[0].toLowerCase()}`}>
      <span className={`badge ${label.toLowerCase()}`}>{label === 'Returned' && <Check size={12}/>} {label}</span>
      <button className={`save-btn ${saved ? 'is-saved' : ''}`} aria-label={`${saved ? 'Unsave' : 'Save'} ${item.title}`} aria-pressed={saved} onClick={() => onSave(item._id)}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'}/></button>
      <ItemArt category={item.category} title={item.title}/>
      <span className="illustration-label">Illustration</span>
    </div>
    <div className="card-body"><p className="eyebrow category-label">{item.category}</p><h3><button onClick={() => onOpen(item)}>{item.title}</button></h3><p className="meta"><MapPin size={15}/>{item.location}</p><div className="card-bottom"><span className="meta"><CalendarDays size={14}/>{formatDate(item.date)}</span><button className="text-btn" onClick={() => onOpen(item)} aria-label={`View details for ${item.title}`}>View details</button></div></div>
  </article>;
}
