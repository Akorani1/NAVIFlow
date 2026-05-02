const leadsData = [
  { id: 1, name: 'Sarah Chen', initials: 'SC', email: 'sarah.chen@techcorp.com', phone: '+1 (555) 234-5678', role: 'Marketing Director at TechCorp', status: 'contacted', tags: ['VIP', 'Enterprise', 'Q1 Campaign'], color: '#2F6FA3', conversation: [{ sender: 'lead', text: 'Hi, I saw your enterprise plans and have a few questions about integration.', time: 'Yesterday, 10:30 AM' }, { sender: 'user', text: 'Hi Sarah! I can absolutely help with that. What specific tools are you looking to integrate?', time: 'Yesterday, 10:45 AM' }, { sender: 'lead', text: 'Mainly our CRM and payment processor. Can we schedule a quick call?', time: '1h ago' }] },
  { id: 2, name: 'Mike Ross', initials: 'MR', email: 'mike.ross@startup.io', phone: '+1 (555) 345-6789', role: 'CEO at StartupIO', status: 'new', tags: ['Hot Lead', 'SaaS'], color: '#45B29D', conversation: [] },
  { id: 3, name: 'Emily Watson', initials: 'EW', email: 'emily@designstudio.co', phone: '+1 (555) 456-7890', role: 'Creative Director', status: 'converted', tags: ['Agency', 'Referral'], color: '#1E3A5F', conversation: [] },
  { id: 4, name: 'James Lee', initials: 'JL', email: 'james.lee@globalcorp.com', phone: '+1 (555) 567-8901', role: 'VP Sales at GlobalCorp', status: 'contacted', tags: ['Enterprise', 'Priority'], color: '#9ED8C3', conversation: [] },
  { id: 5, name: 'Priya Sharma', initials: 'PS', email: 'priya@innovate.tech', phone: '+1 (555) 678-9012', role: 'Product Manager', status: 'new', tags: ['Tech', 'Inbound'], color: '#2F6FA3', conversation: [] },
  { id: 6, name: 'David Kim', initials: 'DK', email: 'david.kim@ecom.store', phone: '+1 (555) 789-0123', role: 'Founder at EcomStore', status: 'new', tags: ['E-commerce', 'VIP'], color: '#45B29D', conversation: [] },
  { id: 7, name: 'Laura Martinez', initials: 'LM', email: 'laura@boutique.co', phone: '+1 (555) 890-1234', role: 'Owner at Boutique Co', status: 'converted', tags: ['Retail', 'Loyal'], color: '#1E3A5F', conversation: [] },
  { id: 8, name: 'Tom Bradley', initials: 'TB', email: 'tom@fitness.pro', phone: '+1 (555) 901-2345', role: 'Fitness Coach', status: 'contacted', tags: ['Health', 'B2C'], color: '#2F6FA3', conversation: [] },
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const { status } = req.query;
    const filtered = status && status !== 'all'
      ? leadsData.filter(l => l.status === status)
      : leadsData;
    return res.status(200).json({ data: filtered, total: filtered.length });
  }

  if (req.method === 'POST') {
    const { name, email, phone, role, status = 'new', tags = [] } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required' });
    }
    const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const colors = ['#2F6FA3', '#45B29D', '#1E3A5F', '#9ED8C3'];
    const newLead = {
      id: Date.now(),
      name, email, phone: phone || '', role: role || '', status,
      tags, initials, color: colors[Math.floor(Math.random() * colors.length)],
      conversation: [],
    };
    return res.status(201).json({ data: newLead });
  }

  if (req.method === 'PATCH') {
    const { id } = req.query;
    const lead = leadsData.find(l => l.id === parseInt(id));
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    const updated = { ...lead, ...req.body };
    return res.status(200).json({ data: updated });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
