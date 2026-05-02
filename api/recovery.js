const recoveryOpps = [
  { id: 1, name: 'Marcus Webb', initials: 'MW', value: 4500, daysSince: 5, dropReason: 'slow_response', reasonLabel: 'Slow Response', status: 'pending', campaignType: 'slot-save', color: '#ef4444', aiMessage: 'We saved your slot. Want me to book it for you right now?', aiAnalysis: 'Lead waited 4+ hours for first reply. Interest dropped significantly after 2 hours.' },
  { id: 2, name: 'Diana Cruz', initials: 'DC', value: 7200, daysSince: 3, dropReason: 'price_hesitation', reasonLabel: 'Price Hesitation', status: 'recovering', campaignType: 'discount', color: '#f59e0b', aiMessage: 'Still interested? Here is an exclusive 15% discount, valid today only.', aiAnalysis: 'Engaged with pricing page 4 times. Left after seeing total. Price sensitivity detected.' },
  { id: 3, name: 'Leo Martinez', initials: 'LM', value: 3800, daysSince: 7, dropReason: 'unclear_offer', reasonLabel: 'Unclear Offer', status: 'pending', campaignType: 'question', color: '#8b5cf6', aiMessage: 'Quick question before you go. What stopped you from moving forward?', aiAnalysis: 'Opened 3 emails but never clicked CTA. Likely confused by offer structure.' },
  { id: 4, name: 'Rachel Kim', initials: 'RK', value: 2900, daysSince: 10, dropReason: 'went_cold', reasonLabel: 'Went Cold', status: 'pending', campaignType: 'reminder', color: '#6b7280', aiMessage: 'Hey Rachel, we have not heard from you in a while. Still looking for a solution?', aiAnalysis: 'Was active for 2 weeks then suddenly stopped. No negative signals detected.' },
  { id: 5, name: 'Jake Thornton', initials: 'JT', value: 5100, daysSince: 2, dropReason: 'wrong_timing', reasonLabel: 'Wrong Timing', status: 'recovering', campaignType: 'slot-save', color: '#3b82f6', aiMessage: 'Your consultation slot is still available. Want to reschedule for a better time?', aiAnalysis: 'Booked a call but cancelled 1 hour before. Calendar shows heavy schedule this week.' },
  { id: 6, name: 'Nina Patel', initials: 'NP', value: 6500, daysSince: 4, dropReason: 'price_hesitation', reasonLabel: 'Price Hesitation', status: 'recovered', campaignType: 'discount', color: '#f59e0b', aiMessage: 'Great news! We have a limited offer just for you. 20% off if you sign up today.', aiAnalysis: 'Compared pricing with 2 competitors. Returned after receiving discount offer.' },
];

const stats = {
  atRisk: 30000,
  recoveredThisWeek: 12450,
  recoveryRate: 27,
  pendingCount: 8,
  totalRecovered: 48200,
  weeklyData: {
    recovered: [1200, 1800, 2100, 1500, 2400, 1900, 1550],
    lost: [800, 1200, 600, 2100, 900, 1400, 1100],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
};

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
      ? recoveryOpps.filter(o => o.status === status)
      : recoveryOpps;
    return res.status(200).json({ data: filtered, stats, total: filtered.length });
  }

  if (req.method === 'PATCH') {
    const { id } = req.query;
    const opp = recoveryOpps.find(o => o.id === parseInt(id));
    if (!opp) return res.status(404).json({ error: 'Opportunity not found' });
    const updated = { ...opp, ...req.body };
    return res.status(200).json({ data: updated });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
