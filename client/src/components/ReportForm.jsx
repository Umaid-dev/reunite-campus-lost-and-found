import { useState } from 'react';
import { Search, HandHeart, LoaderCircle } from 'lucide-react';
import { CATEGORIES } from '../../../shared/constants.js';
import { api } from '../api.js';
export default function ReportForm({ onCreated }) {
  const [form, setForm] = useState({
    type: 'lost',
    title: '',
    category: '',
    description: '',
    location: '',
    date: '',
    contact: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const item = await api('', { method: 'POST', body: JSON.stringify(form) });
      onCreated(item);
    } catch (error) {
      setErrors(error.fields || {});
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }
  function field(name, label, control) {
    return (
      <label className="field" htmlFor={name}>
        <span>{label}</span>
        {control}
        {errors[name] && (
          <small id={`${name}-error`} className="field-error">
            {errors[name]}
          </small>
        )}
      </label>
    );
  }
  function attrs(name) {
    return {
      id: name,
      name,
      value: form[name],
      onChange: change,
      required: true,
      'aria-invalid': !!errors[name],
      'aria-describedby': errors[name] ? `${name}-error` : undefined,
    };
  }
  return (
    <form onSubmit={submit} className="report-form">
      <p className="muted">A few details can make a big difference.</p>
      <fieldset className="type-field">
        <legend>What would you like to report?</legend>
        <div className="type-options">
          {[
            ['lost', Search, 'I lost something'],
            ['found', HandHeart, 'I found something'],
          ].map(([value, Icon, label]) => (
            <label key={value} className={form.type === value ? 'selected' : ''}>
              <input
                type="radio"
                name="type"
                value={value}
                checked={form.type === value}
                onChange={change}
              />
              <Icon size={20} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      {field(
        'title',
        'Item name',
        <input
          {...attrs('title')}
          minLength={3}
          maxLength={80}
          placeholder="e.g. Black wireless headphones"
        />,
      )}
      <div className="form-row">
        {field(
          'category',
          'Category',
          <select {...attrs('category')}>
            <option value="" disabled>
              Select a category
            </option>
            {CATEGORIES.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>,
        )}
        {field(
          'date',
          'Date lost or found',
          <input {...attrs('date')} type="date" max={new Date().toISOString().slice(0, 10)} />,
        )}
      </div>
      {field(
        'location',
        'Location',
        <input
          {...attrs('location')}
          minLength={2}
          maxLength={100}
          placeholder="e.g. Library, second floor"
        />,
      )}
      {field(
        'description',
        'Description',
        <textarea
          {...attrs('description')}
          minLength={10}
          maxLength={1000}
          rows={3}
          placeholder="Describe the item and where you last saw it. Keep a unique detail private to verify ownership."
        />,
      )}
      {field(
        'contact',
        'Contact email',
        <input
          {...attrs('contact')}
          type="email"
          maxLength={120}
          placeholder="For this demo, use a fictional email"
        />,
      )}
      <p className="form-note">
        This is a shared classroom demo with no login. Contact emails are visible in item details;
        use fictional information only.
      </p>
      {message && (
        <p role="alert" className="error">
          {message}
        </p>
      )}
      <button className="btn primary full" disabled={busy} type="submit">
        {busy ? (
          <>
            <LoaderCircle className="spin" size={18} />
            Posting…
          </>
        ) : (
          'Post to the board'
        )}
      </button>
    </form>
  );
}
