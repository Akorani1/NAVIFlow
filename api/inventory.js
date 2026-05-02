const inventoryData = [
  { id: 1, name: 'Wireless Earbuds', sku: 'NF-ELEC-001', price: 79.99, stock: 45, maxStock: 100, category: 'electronics', gradient: 'linear-gradient(135deg, #2F6FA3, #1E3A5F)', icon: 'headphones' },
  { id: 2, name: 'Smart Watch Pro', sku: 'NF-ELEC-002', price: 249.99, stock: 12, maxStock: 50, category: 'electronics', gradient: 'linear-gradient(135deg, #1E3A5F, #2F6FA3)', icon: 'watch' },
  { id: 3, name: 'Premium T-Shirt', sku: 'NF-CLTH-001', price: 34.99, stock: 78, maxStock: 120, category: 'clothing', gradient: 'linear-gradient(135deg, #45B29D, #2F6FA3)', icon: 'shirt' },
  { id: 4, name: 'Running Sneakers', sku: 'NF-CLTH-002', price: 129.99, stock: 8, maxStock: 60, category: 'clothing', gradient: 'linear-gradient(135deg, #9ED8C3, #45B29D)', icon: 'shoe' },
  { id: 5, name: 'Organic Coffee Beans', sku: 'NF-FOOD-001', price: 17.99, stock: 156, maxStock: 200, category: 'food', gradient: 'linear-gradient(135deg, #8B6914, #C49B30)', icon: 'coffee' },
  { id: 6, name: 'Green Tea Pack', sku: 'NF-FOOD-002', price: 12.99, stock: 5, maxStock: 80, category: 'food', gradient: 'linear-gradient(135deg, #45B29D, #9ED8C3)', icon: 'leaf' },
  { id: 7, name: 'Vitamin D3 Caps', sku: 'NF-HLTH-001', price: 24.99, stock: 92, maxStock: 150, category: 'health', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)', icon: 'pill' },
  { id: 8, name: 'Yoga Mat', sku: 'NF-HLTH-002', price: 29.99, stock: 3, maxStock: 40, category: 'health', gradient: 'linear-gradient(135deg, #2F6FA3, #45B29D)', icon: 'activity' },
  { id: 9, name: 'Scented Candle Set', sku: 'NF-HOME-001', price: 39.99, stock: 34, maxStock: 80, category: 'home', gradient: 'linear-gradient(135deg, #1E3A5F, #9ED8C3)', icon: 'flame' },
  { id: 10, name: 'Bamboo Desk Lamp', sku: 'NF-HOME-002', price: 59.99, stock: 18, maxStock: 45, category: 'home', gradient: 'linear-gradient(135deg, #45B29D, #1E3A5F)', icon: 'lamp' },
  { id: 11, name: 'Bluetooth Speaker', sku: 'NF-ELEC-003', price: 89.99, stock: 6, maxStock: 35, category: 'electronics', gradient: 'linear-gradient(135deg, #2F6FA3, #9ED8C3)', icon: 'speaker' },
  { id: 12, name: 'Protein Bars (12pk)', sku: 'NF-FOOD-003', price: 28.99, stock: 67, maxStock: 100, category: 'food', gradient: 'linear-gradient(135deg, #9ED8C3, #2F6FA3)', icon: 'package' },
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const { category } = req.query;
    const filtered = category && category !== 'all'
      ? inventoryData.filter(p => p.category === category)
      : inventoryData;
    const lowStock = inventoryData.filter(p => p.stock <= 10).length;
    const totalValue = inventoryData.reduce((sum, p) => sum + p.price * p.stock, 0);
    return res.status(200).json({
      data: filtered,
      total: filtered.length,
      stats: { totalProducts: inventoryData.length, lowStock, totalValue: Math.round(totalValue * 100) / 100 }
    });
  }

  if (req.method === 'POST') {
    const { name, sku, price, stock, maxStock, category } = req.body;
    if (!name || !sku || price == null || stock == null) {
      return res.status(400).json({ error: 'name, sku, price, and stock are required' });
    }
    const gradients = {
      electronics: 'linear-gradient(135deg, #2F6FA3, #1E3A5F)',
      clothing: 'linear-gradient(135deg, #45B29D, #2F6FA3)',
      food: 'linear-gradient(135deg, #8B6914, #C49B30)',
      health: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
      home: 'linear-gradient(135deg, #1E3A5F, #9ED8C3)',
    };
    const newProduct = {
      id: Date.now(), name, sku, price: parseFloat(price),
      stock: parseInt(stock), maxStock: parseInt(maxStock || stock * 2),
      category: category || 'electronics',
      gradient: gradients[category] || gradients.electronics,
      icon: 'package',
    };
    return res.status(201).json({ data: newProduct });
  }

  if (req.method === 'PATCH') {
    const { id } = req.query;
    const product = inventoryData.find(p => p.id === parseInt(id));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const updated = { ...product, ...req.body };
    return res.status(200).json({ data: updated });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
