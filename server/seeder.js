const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Category = require('./models/Category');
const Product = require('./models/Product');

const categories = [
  {
    name: 'Furniture',
    slug: 'furniture',
    description: 'Chairs, desks, beds, sofas and more',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    isCustomizable: true
  },
  {
    name: 'Hardware',
    slug: 'hardware',
    description: 'Tools, fasteners, locks and fittings',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
    isCustomizable: false
  },
  {
    name: 'Chemicals',
    slug: 'chemicals',
    description: 'Paints, adhesives, solvents and cleaners',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
    isCustomizable: false
  },
  {
    name: 'Wood & Laminates',
    slug: 'wood-laminates',
    description: 'Plywood, laminates, veneers and timber',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800',
    isCustomizable: true
  },
  {
    name: 'Appliances',
    slug: 'appliances',
    description: 'Kitchen and home appliances',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    isCustomizable: false
  },
  {
    name: 'Wall Decors',
    slug: 'wall-decors',
    description: 'Wallpapers, panels, tiles and art',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    isCustomizable: true
  }
];

const furnitureImages = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
  'https://images.unsplash.com/photo-1561677978-583a6c2a177a?w=800',
  'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
  'https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab6?w=800',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
  'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
  'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800',
  'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800',
  'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800',
  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
  'https://images.unsplash.com/photo-1486304873000-235643847519?w=800',
];

const hardwareImages = [
  'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
  'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800',
  'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800',
  'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800',
  'https://images.unsplash.com/photo-1566843972142-a7fcb70de55b?w=800',
  'https://images.unsplash.com/photo-1594576722512-582bcd4c5d6a?w=800',
];

const chemicalImages = [
  'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800',
  'https://images.unsplash.com/photo-1609205807107-2b82a5b2c5e4?w=800',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800',
  'https://images.unsplash.com/photo-1600857062241-98e5dba7f4f7?w=800',
];

const woodImages = [
  'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800',
  'https://images.unsplash.com/photo-1520116468816-95b69f847357?w=800',
  'https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?w=800',
  'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800',
];

const applianceImages = [
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
  'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800',
  'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800',
  'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800',
  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
  'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=800',
];

const wallDecorImages = [
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
  'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800',
  'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800',
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const roundToHundred = (n) => Math.round(n / 100) * 100;

const colorCustomization = {
  name: 'Color',
  values: [
    { label: 'Natural Wood', priceModifier: 0 },
    { label: 'Dark Walnut', priceModifier: 500 },
    { label: 'White', priceModifier: 300 },
    { label: 'Black', priceModifier: 400 },
    { label: 'Oak', priceModifier: 200 }
  ]
};

const materialCustomization = {
  name: 'Material',
  values: [
    { label: 'Fabric', priceModifier: 0 },
    { label: 'Leather', priceModifier: 1500 },
    { label: 'Mesh', priceModifier: 800 },
    { label: 'Velvet', priceModifier: 1200 }
  ]
};

const sizeCustomization = {
  name: 'Size',
  values: [
    { label: 'Small', priceModifier: 0 },
    { label: 'Medium', priceModifier: 600 },
    { label: 'Large', priceModifier: 1200 },
    { label: 'XL', priceModifier: 2000 }
  ]
};

const woodTypeCustomization = {
  name: 'Wood Type',
  values: [
    { label: 'Pine', priceModifier: 0 },
    { label: 'Teak', priceModifier: 5000 },
    { label: 'Mahogany', priceModifier: 8000 },
    { label: 'Oak', priceModifier: 3000 }
  ]
};

const finishCustomization = {
  name: 'Finish',
  values: [
    { label: 'Gloss', priceModifier: 0 },
    { label: 'Matte', priceModifier: 100 },
    { label: 'Texture', priceModifier: 200 },
    { label: 'Satin', priceModifier: 150 }
  ]
};

const thicknessCustomization = {
  name: 'Thickness',
  values: [
    { label: '12mm', priceModifier: 0 },
    { label: '18mm', priceModifier: 500 },
    { label: '25mm', priceModifier: 1000 }
  ]
};

const getProducts = (categoryDocs) => {
  const furniture = categoryDocs.find(c => c.slug === 'furniture')._id;
  const hardware = categoryDocs.find(c => c.slug === 'hardware')._id;
  const chemicals = categoryDocs.find(c => c.slug === 'chemicals')._id;
  const wood = categoryDocs.find(c => c.slug === 'wood-laminates')._id;
  const appliances = categoryDocs.find(c => c.slug === 'appliances')._id;
  const wallDecors = categoryDocs.find(c => c.slug === 'wall-decors')._id;

  const furnitureProducts = [
    { name: 'Wooden Study Chair', basePrice: 4999 },
    { name: 'Executive Office Chair', basePrice: 8999 },
    { name: 'Recliner Sofa Chair', basePrice: 15999 },
    { name: 'Bar Stool Set of 2', basePrice: 6999 },
    { name: 'Accent Armchair', basePrice: 11999 },
    { name: 'Gaming Chair', basePrice: 12999 },
    { name: 'Dining Chair Set of 4', basePrice: 9999 },
    { name: 'Folding Chair', basePrice: 1999 },
    { name: 'Rocking Chair', basePrice: 7999 },
    { name: 'Bean Bag Chair', basePrice: 3999 },
    { name: 'L-Shaped Office Desk', basePrice: 12999 },
    { name: 'Standing Desk', basePrice: 18999 },
    { name: 'Computer Desk', basePrice: 6999 },
    { name: 'Writing Desk', basePrice: 5999 },
    { name: 'Corner Desk', basePrice: 9999 },
    { name: 'Foldable Study Table', basePrice: 3499 },
    { name: 'Drafting Table', basePrice: 8499 },
    { name: 'Rustic Farmhouse Desk', basePrice: 11499 },
    { name: 'King Size Bed Frame', basePrice: 24999 },
    { name: 'Queen Size Bed Frame', basePrice: 19999 },
    { name: 'Single Bed with Storage', basePrice: 12999 },
    { name: 'Bunk Bed Frame', basePrice: 17999 },
    { name: 'Platform Bed', basePrice: 15999 },
    { name: 'Canopy Bed', basePrice: 29999 },
    { name: 'Daybed with Trundle', basePrice: 21999 },
    { name: '3 Seater Sofa', basePrice: 22999 },
    { name: 'L-Shaped Sectional Sofa', basePrice: 45999 },
    { name: 'Loveseat Sofa', basePrice: 16999 },
    { name: 'Chesterfield Sofa', basePrice: 38999 },
    { name: 'Futon Sofa Bed', basePrice: 14999 },
    { name: '4 Door Wardrobe', basePrice: 28999 },
    { name: 'Sliding Door Wardrobe', basePrice: 34999 },
    { name: 'Open Wardrobe System', basePrice: 19999 },
    { name: 'Chest of Drawers', basePrice: 11999 },
    { name: 'Bedside Table Set of 2', basePrice: 7999 },
    { name: 'Bookshelf 5 Tier', basePrice: 6999 },
    { name: 'TV Unit Cabinet', basePrice: 13999 },
    { name: 'Shoe Rack Cabinet', basePrice: 4999 },
    { name: 'Display Cabinet', basePrice: 16999 },
    { name: 'Coffee Table', basePrice: 8999 },
  ].map(p => ({
    name: p.name,
    description: `Premium quality ${p.name.toLowerCase()} crafted with superior materials for lasting durability and style.`,
    basePrice: p.basePrice,
    category: furniture,
    images: [pick(furnitureImages), pick(furnitureImages)],
    stock: rand(10, 100),
    isCustomizable: true,
    customizationOptions: [
      colorCustomization,
      materialCustomization,
      sizeCustomization
    ]
  }));

  const hardwareProducts = [
    { name: 'Stainless Steel Door Handle Set', basePrice: 899 },
    { name: 'Heavy Duty Power Drill', basePrice: 3499 },
    { name: 'Brass Hinges Pack of 10', basePrice: 299 },
    { name: 'Digital Door Lock', basePrice: 6999 },
    { name: 'Deadbolt Lock Set', basePrice: 1499 },
    { name: 'Cabinet Knobs Pack of 20', basePrice: 599 },
    { name: 'Angle Grinder 4 inch', basePrice: 2999 },
    { name: 'Jigsaw Machine', basePrice: 4499 },
    { name: 'Circular Saw', basePrice: 5999 },
    { name: 'Electric Screwdriver', basePrice: 2499 },
    { name: 'Hammer Drill', basePrice: 3999 },
    { name: 'Random Orbital Sander', basePrice: 3299 },
    { name: 'Tile Cutter Machine', basePrice: 7999 },
    { name: 'Laser Level Tool', basePrice: 2799 },
    { name: 'Measuring Tape 10m', basePrice: 299 },
    { name: 'Spirit Level 24 inch', basePrice: 499 },
    { name: 'Stud Finder', basePrice: 899 },
    { name: 'Claw Hammer', basePrice: 349 },
    { name: 'Screwdriver Set 32pc', basePrice: 799 },
    { name: 'Pliers Set 5pc', basePrice: 699 },
    { name: 'Allen Key Set', basePrice: 249 },
    { name: 'Utility Knife Set', basePrice: 399 },
    { name: 'Pipe Wrench', basePrice: 599 },
    { name: 'Adjustable Spanner', basePrice: 449 },
    { name: 'Wire Stripper', basePrice: 349 },
    { name: 'PVC Conduit Pipe 3m', basePrice: 149 },
    { name: 'Electrical Junction Box', basePrice: 99 },
    { name: 'Wall Anchor Bolts Pack', basePrice: 199 },
    { name: 'Hex Bolt Set', basePrice: 249 },
    { name: 'Self Drilling Screws Pack', basePrice: 179 },
  ].map(p => ({
    name: p.name,
    description: `Professional grade ${p.name.toLowerCase()} for construction and home improvement projects.`,
    basePrice: p.basePrice,
    category: hardware,
    images: [pick(hardwareImages)],
    stock: rand(50, 500),
    isCustomizable: false
  }));

  const chemicalProducts = [
    { name: 'Interior Emulsion Paint 20L', basePrice: 2999 },
    { name: 'Exterior Weather Paint 20L', basePrice: 3499 },
    { name: 'Primer Coat 10L', basePrice: 1299 },
    { name: 'Wood Stain Dark Walnut', basePrice: 799 },
    { name: 'Wood Polish & Varnish 1L', basePrice: 599 },
    { name: 'Industrial Epoxy Adhesive', basePrice: 699 },
    { name: 'Contact Cement 1L', basePrice: 449 },
    { name: 'Tile Adhesive 20kg', basePrice: 899 },
    { name: 'White Cement 5kg', basePrice: 299 },
    { name: 'Waterproofing Chemical 5L', basePrice: 1499 },
    { name: 'Rust Remover Spray', basePrice: 349 },
    { name: 'Anti-Fungal Wall Treatment', basePrice: 799 },
    { name: 'PU Foam Sealant', basePrice: 499 },
    { name: 'Silicone Sealant Clear', basePrice: 299 },
    { name: 'Grout for Tiles 5kg', basePrice: 399 },
    { name: 'Paint Thinner 1L', basePrice: 199 },
    { name: 'Acetone Solvent 500ml', basePrice: 249 },
    { name: 'Floor Cleaner Concentrate', basePrice: 349 },
    { name: 'Wood Preservative Treatment', basePrice: 899 },
    { name: 'Enamel Paint White 1L', basePrice: 499 },
    { name: 'Chalk Paint 500ml', basePrice: 699 },
    { name: 'Spray Paint Metallic Gold', basePrice: 349 },
    { name: 'Putty Filler Wall Crack', basePrice: 299 },
    { name: 'Damp Proof Course Liquid', basePrice: 1199 },
    { name: 'Bituminous Coating 5L', basePrice: 1099 },
  ].map(p => ({
    name: p.name,
    description: `High performance ${p.name.toLowerCase()} for professional and DIY applications.`,
    basePrice: p.basePrice,
    category: chemicals,
    images: [pick(chemicalImages)],
    stock: rand(30, 300),
    isCustomizable: false
  }));

  const woodProducts = [
    { name: 'BWR Plywood 18mm', basePrice: 2499 },
    { name: 'MR Grade Plywood 12mm', basePrice: 1799 },
    { name: 'Marine Plywood 25mm', basePrice: 3499 },
    { name: 'Teak Wood Plank', basePrice: 4999 },
    { name: 'Pine Wood Board', basePrice: 1499 },
    { name: 'Bamboo Board Sheet', basePrice: 1999 },
    { name: 'MDF Board 18mm', basePrice: 1299 },
    { name: 'Particle Board 16mm', basePrice: 999 },
    { name: 'HDF Board 6mm', basePrice: 799 },
    { name: 'Block Board 19mm', basePrice: 1899 },
    { name: 'High Gloss White Laminate', basePrice: 899 },
    { name: 'Matte Finish Grey Laminate', basePrice: 949 },
    { name: 'Wood Grain Laminate Oak', basePrice: 1099 },
    { name: 'Marble Effect Laminate', basePrice: 1299 },
    { name: 'Solid Color Laminate Black', basePrice: 849 },
    { name: 'Textured Stone Laminate', basePrice: 1199 },
    { name: 'Anti-Scratch Laminate', basePrice: 1399 },
    { name: 'Postform Laminate Sheet', basePrice: 799 },
    { name: 'Teak Veneer Sheet', basePrice: 2199 },
    { name: 'Walnut Veneer Sheet', basePrice: 2499 },
    { name: 'Maple Veneer Sheet', basePrice: 1899 },
    { name: 'Cherry Wood Veneer', basePrice: 2299 },
    { name: 'Engineered Wood Flooring', basePrice: 3499 },
    { name: 'Bamboo Flooring Strip', basePrice: 2799 },
    { name: 'Cork Sheet 6mm', basePrice: 1599 },
  ].map(p => ({
    name: p.name,
    description: `Premium quality ${p.name.toLowerCase()} sourced from certified sustainable forests.`,
    basePrice: p.basePrice,
    category: wood,
    images: [pick(woodImages)],
    stock: rand(20, 200),
    isCustomizable: true,
    customizationOptions: [
      thicknessCustomization,
      finishCustomization
    ]
  }));

  const applianceProducts = [
    { name: 'Stainless Steel Kitchen Sink Double Bowl', basePrice: 4999 },
    { name: 'Auto Clean Chimney 60cm', basePrice: 8999 },
    { name: 'Geyser 15 Litre 5 Star', basePrice: 6499 },
    { name: 'Built-in Microwave Oven 25L', basePrice: 12999 },
    { name: 'Dishwasher 12 Place Setting', basePrice: 24999 },
    { name: 'Refrigerator 350L Double Door', basePrice: 32999 },
    { name: 'Washing Machine 7kg Front Load', basePrice: 28999 },
    { name: 'Air Purifier HEPA Filter', basePrice: 9999 },
    { name: 'Ceiling Fan with Light 48 inch', basePrice: 4499 },
    { name: 'Exhaust Fan 9 inch', basePrice: 1299 },
    { name: 'Water Purifier RO+UV 8L', basePrice: 11999 },
    { name: 'Mixer Grinder 750W', basePrice: 3499 },
    { name: 'Induction Cooktop 2000W', basePrice: 2999 },
    { name: 'Electric Kettle 1.5L', basePrice: 999 },
    { name: 'Toaster 4 Slice', basePrice: 1499 },
    { name: 'Hand Blender 300W', basePrice: 1299 },
    { name: 'Food Processor 600W', basePrice: 4999 },
    { name: 'Coffee Maker Drip 1L', basePrice: 2499 },
    { name: 'Air Fryer 4.5L Digital', basePrice: 5999 },
    { name: 'Electric Iron 2200W', basePrice: 1299 },
    { name: 'Vacuum Cleaner 1600W', basePrice: 5499 },
    { name: 'Water Heater Instant 3kW', basePrice: 3999 },
    { name: 'Inverter Split AC 1.5 Ton', basePrice: 34999 },
    { name: 'Portable Air Cooler 40L', basePrice: 7999 },
    { name: 'Smart LED TV 43 inch', basePrice: 29999 },
  ].map(p => ({
    name: p.name,
    description: `Energy efficient ${p.name.toLowerCase()} with modern features and durable build quality.`,
    basePrice: p.basePrice,
    category: appliances,
    images: [pick(applianceImages)],
    stock: rand(10, 80),
    isCustomizable: false
  }));

  const wallDecorProducts = [
    { name: 'Geometric 3D Wall Panel', basePrice: 2999 },
    { name: 'Brick Effect Peel & Stick Wallpaper', basePrice: 1499 },
    { name: 'Wooden Wall Clock 18 inch', basePrice: 1999 },
    { name: 'Floral Wallpaper Roll', basePrice: 1299 },
    { name: 'Abstract Canvas Wall Art', basePrice: 2499 },
    { name: 'Metal Wall Art Sculpture', basePrice: 3499 },
    { name: 'Wooden Wall Shelf Floating', basePrice: 1799 },
    { name: 'Mirror Wall Decor Set', basePrice: 2999 },
    { name: 'Stone Cladding Panel', basePrice: 1899 },
    { name: 'PVC Wall Panel 3D', basePrice: 999 },
    { name: 'Wainscoting Wall Panel Kit', basePrice: 3999 },
    { name: 'Reclaimed Wood Wall Planks', basePrice: 2499 },
    { name: 'Hexagon Wall Tiles Set', basePrice: 1999 },
    { name: 'LED Backlit Wall Panel', basePrice: 4999 },
    { name: 'Venetian Plaster Effect Panel', basePrice: 3299 },
    { name: 'Fabric Wall Panel Acoustic', basePrice: 2799 },
    { name: 'Mosaic Wall Art Tiles', basePrice: 2199 },
    { name: 'Bamboo Wall Covering', basePrice: 1699 },
    { name: 'Cork Wall Tiles Pack', basePrice: 1399 },
    { name: 'Metallic Foil Wallpaper', basePrice: 1799 },
    { name: 'Chalkboard Wall Paint Panel', basePrice: 999 },
    { name: 'Macrame Wall Hanging', basePrice: 1299 },
    { name: 'Neon Sign Wall Light', basePrice: 3999 },
    { name: 'Photo Frame Collage Set', basePrice: 1499 },
    { name: 'Tapestry Wall Hanging', basePrice: 1199 },
  ].map(p => ({
    name: p.name,
    description: `Stylish ${p.name.toLowerCase()} to transform your walls into stunning focal points.`,
    basePrice: p.basePrice,
    category: wallDecors,
    images: [pick(wallDecorImages)],
    stock: rand(20, 150),
    isCustomizable: true,
    customizationOptions: [
      colorCustomization,
      finishCustomization
    ]
  }));

  return [
    ...furnitureProducts,
    ...hardwareProducts,
    ...chemicalProducts,
    ...woodProducts,
    ...applianceProducts,
    ...wallDecorProducts
  ];
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Category.deleteMany();
    await Product.deleteMany();
    console.log('Old data cleared');

    const categoryDocs = await Category.insertMany(categories);
    console.log(`${categoryDocs.length} categories inserted`);

    const products = getProducts(categoryDocs);
    const productDocs = await Product.insertMany(products);
    console.log(`${productDocs.length} products inserted`);

    console.log('Database seeded successfully!');
    process.exit();

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

seedDB();