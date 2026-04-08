const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name images basePrice isCustomizable');

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, selectedConfig, configPrice } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      item => item.product.toString() === productId &&
      JSON.stringify(item.selectedConfig) === JSON.stringify(selectedConfig)
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
        selectedConfig: selectedConfig || {},
        configPrice: configPrice || product.basePrice
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    await cart.populate('items.product', 'name images basePrice isCustomizable');

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route   PUT /api/cart/:itemId
// @desc    Update item quantity
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (quantity <= 0) {
      cart.items.pull(req.params.itemId);
    } else {
      item.quantity = quantity;
    }

    cart.updatedAt = Date.now();
    await cart.save();
    await cart.populate('items.product', 'name images basePrice isCustomizable');

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route   DELETE /api/cart/:itemId
// @desc    Remove item from cart
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items.pull(req.params.itemId);
    cart.updatedAt = Date.now();
    await cart.save();

    res.json({ message: 'Item removed', cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] },
      { new: true }
    );
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};