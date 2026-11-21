import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
export default function Modal({ title, onClose, children, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = previous; };
  }, []);
  return <dialog ref={ref} className={`modal ${wide ? 'wide' : ''}`} aria-labelledby="dialog-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="modal-head"><h2 id="dialog-title">{title}</h2><button className="icon-btn" aria-label="Close dialog" onClick={onClose}><X size={21}/></button></div>
    {children}
  </dialog>;
}
