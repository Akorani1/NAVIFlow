export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      stats: {
        leadsToday: 24,
        activeAutomations: 8,
        totalRevenue: 24680,
        conversionRate: 4.8,
        goalProgress: 82,
        goalTarget: 30000,
      },
      revenueChart: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [12000, 15000, 14200, 18500, 21000, 20500, 24680],
      },
      campaignChart: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [45, 62, 58, 78, 72, 85, 92],
      },
      leadGrowthChart: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [180, 220, 310, 420],
      },
      speedGuard: [
        { id: 101, name: 'Sarah Chen', initials: 'SC', color: '#2F6FA3', message: 'Hi, I saw your enterprise plans and have a few questions about integration.', elapsedSeconds: 85, status: 'active', autoReplied: false },
        { id: 102, name: 'Mike Ross', initials: 'MR', color: '#45B29D', message: 'Hey! Just filled out the contact form. Looking for a demo.', elapsedSeconds: 210, status: 'active', autoReplied: false },
        { id: 103, name: 'David Kim', initials: 'DK', color: '#45B29D', message: 'Replying to your SMS - yes I am interested in the premium plan!', elapsedSeconds: 340, status: 'active', autoReplied: false },
      ],
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
