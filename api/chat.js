const SYSTEM_PROMPT = `You are NaviAI, an intelligent business assistant embedded in NaviFlow CRM. You help business owners understand their data, identify opportunities, and take action.

You have access to real-time data from the user's NaviFlow dashboard including leads, revenue, inventory, and recovery opportunities. When answering questions, reference specific numbers from the context provided.

Keep responses concise and actionable — 2-4 sentences max. Use a confident, friendly tone. Always end with a clear next step or insight when relevant.

You can help with:
- Lead analysis and prioritization
- Revenue trends and forecasting
- Inventory management and low-stock alerts
- Lost revenue recovery opportunities
- Campaign performance insights
- General business strategy questions`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, context } = req.body || {};
  if (!message) return res.status(400).json({ error: 'message is required' });

  const contextBlock = context
    ? `Current NaviFlow dashboard data:\n${JSON.stringify(context, null, 2)}\n\n`
    : '';

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 256,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `${contextBlock}User question: ${message}` },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Groq API error:', err);
      return res.status(500).json({ error: 'AI service unavailable', details: err });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content ?? "I couldn't generate a response right now.";
    return res.status(200).json({ response: text });
  } catch (err) {
    console.error('Groq fetch error:', err);
    return res.status(500).json({ error: 'AI service unavailable', details: err.message });
  }
}
