const mongoose = require('mongoose');

const customizationOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  values: [
    {
      label: { type: String, required: true },
      priceModifier: { type: Number, default: 0 }
    }
  ]
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  basePrice: {
    type: Number,
    required: [true, 'Base price is required']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  images: [{ type: String }],
  stock: {
    type: Number,
    default: 0
  },
  isCustomizable: {
    type: Boolean,
    default: false
  },
  customizationOptions: [customizationOptionSchema],
  popularConfigs: [
    {
      configHash: { type: String },
      configSnapshot: { type: Object },
      count: { type: Number, default: 1 }
    }
  ],
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);