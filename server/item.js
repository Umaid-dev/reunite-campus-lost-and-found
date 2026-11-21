import mongoose from 'mongoose';
import { CATEGORIES, TYPES, STATUSES } from '../shared/constants.js';
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    type: { type: String, required: true, enum: TYPES },
    category: { type: String, required: true, enum: CATEGORIES },
    location: { type: String, required: true, trim: true, maxlength: 100 },
    date: { type: String, required: true },
    contact: { type: String, required: true, trim: true, maxlength: 120 },
    status: { type: String, enum: STATUSES, default: 'open' },
  },
  { timestamps: true, versionKey: false },
);
export const Item = mongoose.model('Item', schema);
