// ==================== NAVIFLOW PROTOTYPE ====================
// Navigation, data rendering, charts, and interactions

// ==================== DATA ====================
const leadsData = [
    {
        id: 1, name: 'Sarah Chen', initials: 'SC', email: 'sarah.chen@techcorp.com', phone: '+1 (555) 234-5678', role: 'Marketing Director at TechCorp', status: 'contacted', tags: ['VIP', 'Enterprise', 'Q1 Campaign'], color: '#2F6FA3',
        conversation: [
            { sender: 'lead', text: 'Hi, I saw your enterprise plans and have a few questions about integration.', time: 'Yesterday, 10:30 AM' },
            { sender: 'user', text: 'Hi Sarah! I can absolutely help with that. What specific tools are you looking to integrate?', time: 'Yesterday, 10:45 AM' },
            { sender: 'lead', text: 'Mainly our CRM and payment processor. Can we schedule a quick call?', time: '1h ago' },
        ]
    },
    { id: 2, name: 'Mike Ross', initials: 'MR', email: 'mike.ross@startup.io', phone: '+1 (555) 345-6789', role: 'CEO at StartupIO', status: 'new', tags: ['Hot Lead', 'SaaS'], color: '#45B29D', conversation: [] },
    { id: 3, name: 'Emily Watson', initials: 'EW', email: 'emily@designstudio.co', phone: '+1 (555) 456-7890', role: 'Creative Director', status: 'converted', tags: ['Agency', 'Referral'], color: '#1E3A5F', conversation: [] },
    { id: 4, name: 'James Lee', initials: 'JL', email: 'james.lee@globalcorp.com', phone: '+1 (555) 567-8901', role: 'VP Sales at GlobalCorp', status: 'contacted', tags: ['Enterprise', 'Priority'], color: '#9ED8C3', conversation: [] },
    { id: 5, name: 'Priya Sharma', initials: 'PS', email: 'priya@innovate.tech', phone: '+1 (555) 678-9012', role: 'Product Manager', status: 'new', tags: ['Tech', 'Inbound'], color: '#2F6FA3', conversation: [] },
    { id: 6, name: 'David Kim', initials: 'DK', email: 'david.kim@ecom.store', phone: '+1 (555) 789-0123', role: 'Founder at EcomStore', status: 'new', tags: ['E-commerce', 'VIP'], color: '#45B29D', conversation: [] },
    { id: 7, name: 'Laura Martinez', initials: 'LM', email: 'laura@boutique.co', phone: '+1 (555) 890-1234', role: 'Owner at Boutique Co', status: 'converted', tags: ['Retail', 'Loyal'], color: '#1E3A5F', conversation: [] },
    { id: 8, name: 'Tom Bradley', initials: 'TB', email: 'tom@fitness.pro', phone: '+1 (555) 901-2345', role: 'Fitness Coach', status: 'contacted', tags: ['Health', 'B2C'], color: '#2F6FA3', conversation: [] },
];

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

// ==================== SCREEN NAVIGATION ====================
const screens = {};
let currentScreen = 'screen-splash';

function initScreens() {
    document.querySelectorAll('.screen').forEach(s => {
        screens[s.id] = s;
    });
}

function navigateTo(screenId, showNav = true) {
    const prev = screens[currentScreen];
    const next = screens[screenId];
    if (!next || screenId === currentScreen) return;

    prev.classList.remove('active');
    next.classList.add('active');
    currentScreen = screenId;

    const nav = document.getElementById('bottom-nav');
    const navScreens = ['screen-dashboard', 'screen-leads', 'screen-pos', 'screen-campaigns', 'screen-settings'];
    if (showNav && navScreens.includes(screenId)) {
        nav.classList.remove('hidden');
    } else if (screenId === 'screen-splash' || screenId === 'screen-login') {
        nav.classList.add('hidden');
    }

    // Update active tab
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.screen === screenId);
    });

    // Reset scroll position
    const scroll = next.querySelector('.screen-scroll');
    if (scroll) scroll.scrollTop = 0;

    // Trigger animations for dashboard
    if (screenId === 'screen-dashboard') {
        animateCounters();
        setTimeout(() => drawCharts(), 300);
    }
    if (screenId === 'screen-analytics') {
        setTimeout(() => drawAnalyticsCharts(), 300);
    }
    if (screenId === 'screen-pos') {
        animatePOSCounters();
        setTimeout(() => {
            drawStockChart();
            animateStockBars();
        }, 300);
    }
}

// ==================== SPLASH SCREEN ====================
function initSplash() {
    setTimeout(() => {
        navigateTo('screen-login', false);
    }, 3000);
}

// ==================== LOGIN ====================
function initLogin() {
    const form = document.getElementById('login-form');
    const btnLogin = document.getElementById('btn-login');
    const btnGoogle = document.getElementById('btn-google');
    const linkSignup = document.getElementById('link-signup');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        btnLogin.textContent = 'Signing in...';
        setTimeout(() => {
            btnLogin.textContent = 'Sign In';
            navigateTo('screen-dashboard');
        }, 800);
    });

    btnGoogle.addEventListener('click', () => {
        btnGoogle.textContent = 'Connecting...';
        setTimeout(() => {
            btnGoogle.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> Continue with Google`;
            navigateTo('screen-dashboard');
        }, 800);
    });

    linkSignup.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('screen-dashboard');
    });
}

// ==================== DASHBOARD ====================
function initDashboard() {
    // Set date
    const dateEl = document.getElementById('dash-date');
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    // Quick actions
    document.querySelectorAll('.qa-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            navigateTo(btn.dataset.screen);
        });
    });

    // Animate goal progress bar
    setTimeout(() => {
        const goalFill = document.getElementById('dash-goal-fill');
        if (goalFill) {
            goalFill.style.width = '82%';
        }
    }, 500);
}

function animateCounters() {
    document.querySelectorAll('.stat-value').forEach(el => {
        // use data-val instead of data-count if it exists, to support floats and larger numbers
        const targetAttr = el.getAttribute('data-val') || el.getAttribute('data-count');
        const target = parseFloat(targetAttr);
        if (isNaN(target)) return;

        const isCurrency = el.id === 'dashboard-revenue-val';
        const isPercent = el.id === 'dashboard-conv-val';
        let current = 0;
        const duration = 1200;
        const step = target / (duration / 16);

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            let displayValue;
            if (isCurrency) {
                displayValue = '$' + Math.floor(current).toLocaleString();
            } else if (isPercent) {
                displayValue = current.toFixed(1) + '%';
            } else {
                displayValue = Math.floor(current).toLocaleString();
            }

            el.textContent = displayValue;
        }, 16);
    });
}

// ==================== CHARTS ====================
function drawCharts() {
    drawDashboardRevenueChart();
    drawCampaignChart();
    drawLeadGrowthChart();
}

function drawDashboardRevenueChart() {
    const canvas = document.getElementById('chart-dashboard-revenue');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 32) * dpr;
    canvas.height = 200 * dpr;
    canvas.style.width = (rect.width - 32) + 'px';
    canvas.style.height = '200px';
    ctx.scale(dpr, dpr);

    const w = rect.width - 32;
    const h = 200;
    const data = [12000, 15000, 14200, 18500, 21000, 20500, 24680];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxVal = 30000;
    const padding = { top: 20, right: 10, bottom: 30, left: 45 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#e2e6eb';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(w - padding.right, y);
        ctx.stroke();
        ctx.fillStyle = '#9ca3af';
        ctx.font = '10px Inter';
        ctx.textAlign = 'right';
        ctx.fillText('$' + Math.round((maxVal - (maxVal / 4) * i) / 1000) + 'k', padding.left - 6, y + 4);
    }

    // Labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    data.forEach((_, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        ctx.fillText(labels[i], x, h - 8);
    });

    // Gradient fill matches new emerald green branding
    const grad = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    grad.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0)');

    ctx.beginPath();
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding.left + chartW, h - padding.bottom);
    ctx.lineTo(padding.left, h - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();

    // Data points
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#white';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#10b981';
        ctx.stroke();
    });
}

function drawCampaignChart() {
    const canvas = document.getElementById('chart-campaign');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 32) * dpr;
    canvas.height = 200 * dpr;
    canvas.style.width = (rect.width - 32) + 'px';
    canvas.style.height = '200px';
    ctx.scale(dpr, dpr);

    const w = rect.width - 32;
    const h = 200;
    const data = [45, 62, 58, 78, 72, 85, 92];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxVal = 100;
    const padding = { top: 20, right: 10, bottom: 30, left: 35 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#e2e6eb';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(w - padding.right, y);
        ctx.stroke();
        ctx.fillStyle = '#9ca3af';
        ctx.font = '10px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxVal - (maxVal / 4) * i), padding.left - 6, y + 4);
    }

    // Labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    data.forEach((_, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        ctx.fillText(labels[i], x, h - 8);
    });

    // Gradient fill
    const grad = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    grad.addColorStop(0, 'rgba(69,178,157,0.3)');
    grad.addColorStop(1, 'rgba(69,178,157,0)');

    ctx.beginPath();
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding.left + chartW, h - padding.bottom);
    ctx.lineTo(padding.left, h - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    const lineGrad = ctx.createLinearGradient(padding.left, 0, w - padding.right, 0);
    lineGrad.addColorStop(0, '#1E3A5F');
    lineGrad.addColorStop(0.5, '#2F6FA3');
    lineGrad.addColorStop(1, '#45B29D');

    ctx.beginPath();
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Dots
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#45B29D';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function drawLeadGrowthChart() {
    const canvas = document.getElementById('chart-leads');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 32) * dpr;
    canvas.height = 200 * dpr;
    canvas.style.width = (rect.width - 32) + 'px';
    canvas.style.height = '200px';
    ctx.scale(dpr, dpr);

    const w = rect.width - 32;
    const h = 200;
    const data = [120, 180, 220, 290, 340, 410, 520, 580, 650, 720, 780, 847];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const maxVal = 900;
    const padding = { top: 20, right: 10, bottom: 30, left: 35 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const barWidth = (chartW / data.length) * 0.6;
    const gap = (chartW / data.length) * 0.4;

    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = '#e2e6eb';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(w - padding.right, y);
        ctx.stroke();
        ctx.fillStyle = '#9ca3af';
        ctx.font = '9px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxVal - (maxVal / 4) * i), padding.left - 6, y + 4);
    }

    // Bars
    data.forEach((val, i) => {
        const x = padding.left + (chartW / data.length) * i + gap / 2;
        const barH = (val / maxVal) * chartH;
        const y = padding.top + chartH - barH;

        const barGrad = ctx.createLinearGradient(0, y, 0, padding.top + chartH);
        barGrad.addColorStop(0, '#45B29D');
        barGrad.addColorStop(1, '#1E3A5F');

        const r = Math.min(barWidth / 2, 4);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + barWidth - r, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + r);
        ctx.lineTo(x + barWidth, padding.top + chartH);
        ctx.lineTo(x, padding.top + chartH);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fillStyle = barGrad;
        ctx.fill();

        // Label
        ctx.fillStyle = '#9ca3af';
        ctx.font = '8px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barWidth / 2, h - 8);
    });
}

// ==================== LEADS ====================
function initLeads() {
    renderLeads(leadsData);

    // Search
    document.getElementById('leads-search').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const filtered = leadsData.filter(l =>
            l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)
        );
        renderLeads(filtered);
    });

    // Filter pills
    document.querySelectorAll('.filter-pills .pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.filter-pills .pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const filter = pill.dataset.filter;
            if (filter === 'all') {
                renderLeads(leadsData);
            } else if (filter === 'vip') {
                renderLeads(leadsData.filter(l => l.tags.some(t => t.toLowerCase() === 'vip')));
            } else {
                renderLeads(leadsData.filter(l => l.status === filter));
            }
        });
    });
}

function renderLeads(leads) {
    const list = document.getElementById('leads-list');
    list.innerHTML = leads.map(lead => `
    <div class="lead-card" data-id="${lead.id}" style="animation: slideIn 0.3s ease-out both; animation-delay: ${leads.indexOf(lead) * 0.05}s">
      <div class="lead-avatar" style="background: ${lead.color}">${lead.initials}</div>
      <div class="lead-info">
        <h4>${lead.name}</h4>
        <p>${lead.email}</p>
      </div>
      <span class="lead-status status-${lead.status}">${lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}</span>
    </div>
  `).join('');

    // Click to view detail
    list.querySelectorAll('.lead-card').forEach(card => {
        card.addEventListener('click', () => {
            const lead = leadsData.find(l => l.id === parseInt(card.dataset.id));
            if (lead) showLeadDetail(lead);
        });
    });
}

function showLeadDetail(lead) {
    document.getElementById('lead-detail-avatar').textContent = lead.initials;
    document.getElementById('lead-detail-avatar').style.background = `linear-gradient(135deg, ${lead.color}, #45B29D)`;
    document.getElementById('lead-detail-name').textContent = lead.name;
    document.getElementById('lead-detail-role').textContent = lead.role;
    document.getElementById('lead-detail-email').textContent = lead.email;
    document.getElementById('lead-detail-phone').textContent = lead.phone;

    const statusEl = document.getElementById('lead-detail-status');
    statusEl.textContent = lead.status.charAt(0).toUpperCase() + lead.status.slice(1);
    statusEl.className = `lead-status-badge status-${lead.status}`;

    const tagsEl = document.getElementById('lead-detail-tags');
    tagsEl.innerHTML = lead.tags.map(t => `<span class="tag">${t}</span>`).join('');

    // Lead Detail Tabs logic
    const tabs = document.querySelectorAll('.ld-tab');
    const contents = document.querySelectorAll('.ld-tab-content');
    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`ld-tab-${tab.dataset.ldTab}`).classList.add('active');
        };
    });

    // Default to timeline tab when opening profile
    tabs[0].click();

    // Render conversation
    renderConversation(lead);

    // Handle chat sending
    const chatInput = document.getElementById('lead-chat-input');
    const sendBtn = document.getElementById('lead-chat-send');

    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;
        lead.conversation.push({ sender: 'user', text, time: 'Just now' });
        renderConversation(lead);
        chatInput.value = '';

        // Simulate reply
        setTimeout(() => simulateReply(lead), 1000);
    };

    sendBtn.onclick = sendMessage;
    chatInput.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };

    navigateTo('screen-lead-detail', true);
    document.getElementById('bottom-nav').classList.remove('hidden');
}

function renderConversation(lead) {
    const chatBox = document.getElementById('lead-chat-messages');
    if (lead.conversation.length === 0) {
        chatBox.innerHTML = '<p style="text-align: center; color: var(--gray-400); font-size: 0.8rem; margin-top: 20px;">No messages yet. Start the conversation!</p>';
        return;
    }
    chatBox.innerHTML = lead.conversation.map(msg => `
        <div class="lead-chat-msg ${msg.sender === 'user' ? 'outgoing' : 'incoming'}">
            <div class="lead-chat-bubble">${msg.text}</div>
            <span class="lead-chat-time">${msg.time}</span>
        </div>
    `).join('');
    chatBox.scrollTop = chatBox.scrollHeight;
}

function simulateReply(lead) {
    const chatBox = document.getElementById('lead-chat-messages');
    chatBox.insertAdjacentHTML('beforeend', `
        <div class="lead-chat-msg incoming ai-typing" id="lead-typing-indicator">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        const ind = document.getElementById('lead-typing-indicator');
        if (ind) ind.remove();
        lead.conversation.push({ sender: 'lead', text: "Thanks for reaching out! Let's schedule a call.", time: 'Just now' });
        renderConversation(lead);
    }, 2000);
}

// ==================== AUTOMATIONS ====================
function initAutomations() {
    // Toggle switches
    document.querySelectorAll('.auto-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle.classList.toggle('active');
        });
    });

    // Node pulse animation
    document.querySelectorAll('.auto-node').forEach((node, i) => {
        node.style.animation = `slideIn 0.4s ease-out ${i * 0.1}s both`;
    });
}

// ==================== CAMPAIGNS ====================
function initCampaigns() {
    // Tab switching
    document.querySelectorAll('.camp-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.camp-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Audience chip selection
    document.querySelectorAll('.audience-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.audience-chip').forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
        });
    });

    // Schedule option
    document.querySelectorAll('.schedule-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.schedule-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
        });
    });

    // Launch button
    document.getElementById('btn-send-campaign').addEventListener('click', () => {
        const btn = document.getElementById('btn-send-campaign');
        btn.textContent = 'Launching...';
        btn.style.opacity = '0.7';
        setTimeout(() => {
            btn.textContent = 'Campaign Launched!';
            btn.style.background = 'linear-gradient(135deg, #45B29D, #9ED8C3)';
            setTimeout(() => {
                btn.textContent = 'Launch Campaign';
                btn.style.opacity = '1';
                btn.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// ==================== ANALYTICS CHARTS ====================
function drawAnalyticsCharts() {
    drawConversionChart();
    drawRevenueChart();
    drawResponseChart();
}

function drawConversionChart() {
    const canvas = document.getElementById('chart-conversion');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 32) * dpr;
    canvas.height = 200 * dpr;
    canvas.style.width = (rect.width - 32) + 'px';
    canvas.style.height = '200px';
    ctx.scale(dpr, dpr);
    const w = rect.width - 32, h = 200;
    const data = [12, 18, 15, 22, 28, 25, 32];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    drawLineChart(ctx, w, h, data, labels, '#2F6FA3', '#45B29D', 35);
}

function drawRevenueChart() {
    const canvas = document.getElementById('chart-revenue');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 32) * dpr;
    canvas.height = 200 * dpr;
    canvas.style.width = (rect.width - 32) + 'px';
    canvas.style.height = '200px';
    ctx.scale(dpr, dpr);
    const w = rect.width - 32, h = 200;
    const data = [1200, 1800, 2400, 1900, 3200, 2800, 3600];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    drawBarChart(ctx, w, h, data, labels, 4000);
}

function drawResponseChart() {
    const canvas = document.getElementById('chart-response');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 32) * dpr;
    canvas.height = 200 * dpr;
    canvas.style.width = (rect.width - 32) + 'px';
    canvas.style.height = '200px';
    ctx.scale(dpr, dpr);
    const w = rect.width - 32, h = 200;
    const data1 = [35, 42, 38, 52, 48, 55, 62];
    const data2 = [22, 28, 25, 35, 32, 40, 45];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const padding = { top: 20, right: 10, bottom: 30, left: 35 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const maxVal = 70;
    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = '#e2e6eb';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(w - padding.right, y); ctx.stroke();
        ctx.fillStyle = '#9ca3af'; ctx.font = '10px Inter'; ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxVal - (maxVal / 4) * i) + '%', padding.left - 6, y + 4);
    }
    labels.forEach((l, i) => {
        ctx.fillStyle = '#9ca3af'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
        ctx.fillText(l, padding.left + (chartW / (labels.length - 1)) * i, h - 8);
    });

    // Line 1 - Email
    drawSingleLine(ctx, data1, padding, chartW, chartH, maxVal, '#2F6FA3', 2.5);
    // Line 2 - SMS
    drawSingleLine(ctx, data2, padding, chartW, chartH, maxVal, '#45B29D', 2.5);

    // Legend
    ctx.fillStyle = '#2F6FA3'; ctx.fillRect(w - 100, 8, 10, 3);
    ctx.fillStyle = '#9ca3af'; ctx.font = '9px Inter'; ctx.textAlign = 'left';
    ctx.fillText('Email', w - 86, 12);
    ctx.fillStyle = '#45B29D'; ctx.fillRect(w - 50, 8, 10, 3);
    ctx.fillStyle = '#9ca3af'; ctx.fillText('SMS', w - 36, 12);
}

function drawSingleLine(ctx, data, padding, chartW, chartH, maxVal, color, lineW) {
    ctx.beginPath();
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = lineW;
    ctx.lineJoin = 'round';
    ctx.stroke();
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
    });
}

function drawLineChart(ctx, w, h, data, labels, color1, color2, maxVal) {
    const padding = { top: 20, right: 10, bottom: 30, left: 35 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#e2e6eb'; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(w - padding.right, y); ctx.stroke();
        ctx.fillStyle = '#9ca3af'; ctx.font = '10px Inter'; ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxVal - (maxVal / 4) * i) + '%', padding.left - 6, y + 4);
    }
    labels.forEach((l, i) => {
        ctx.fillStyle = '#9ca3af'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
        ctx.fillText(l, padding.left + (chartW / (data.length - 1)) * i, h - 8);
    });

    // Fill
    const grad = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    grad.addColorStop(0, `${color2}40`); grad.addColorStop(1, `${color2}00`);
    ctx.beginPath();
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding.left + chartW, h - padding.bottom);
    ctx.lineTo(padding.left, h - padding.bottom);
    ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

    // Line
    const lineGrad = ctx.createLinearGradient(padding.left, 0, w - padding.right, 0);
    lineGrad.addColorStop(0, color1); lineGrad.addColorStop(1, color2);
    ctx.beginPath();
    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = lineGrad; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.stroke();

    data.forEach((val, i) => {
        const x = padding.left + (chartW / (data.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color2; ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    });
}

function drawBarChart(ctx, w, h, data, labels, maxVal) {
    const padding = { top: 20, right: 10, bottom: 30, left: 40 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const barWidth = (chartW / data.length) * 0.6;
    const gap = (chartW / data.length) * 0.4;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#e2e6eb'; ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(w - padding.right, y); ctx.stroke();
        ctx.fillStyle = '#9ca3af'; ctx.font = '9px Inter'; ctx.textAlign = 'right';
        ctx.fillText('$' + Math.round((maxVal - (maxVal / 4) * i) / 1000) + 'k', padding.left - 6, y + 4);
    }

    data.forEach((val, i) => {
        const x = padding.left + (chartW / data.length) * i + gap / 2;
        const barH = (val / maxVal) * chartH;
        const y = padding.top + chartH - barH;
        const barGrad = ctx.createLinearGradient(0, y, 0, padding.top + chartH);
        barGrad.addColorStop(0, '#2F6FA3');
        barGrad.addColorStop(1, '#1E3A5F');
        const r = Math.min(barWidth / 2, 4);
        ctx.beginPath();
        ctx.moveTo(x + r, y); ctx.lineTo(x + barWidth - r, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + r);
        ctx.lineTo(x + barWidth, padding.top + chartH); ctx.lineTo(x, padding.top + chartH);
        ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath(); ctx.fillStyle = barGrad; ctx.fill();
        ctx.fillStyle = '#9ca3af'; ctx.font = '9px Inter'; ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barWidth / 2, h - 8);
    });
}

// ==================== SETTINGS ====================
function initSettings() {
    document.querySelectorAll('.settings-group-header').forEach(header => {
        header.addEventListener('click', () => {
            const group = header.closest('.settings-group');
            group.classList.toggle('open');
        });
    });

    // Toggle switches in settings
    document.querySelectorAll('.settings-group-content .auto-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle.classList.toggle('active');
        });
    });

    // Logout
    document.getElementById('btn-logout').addEventListener('click', () => {
        navigateTo('screen-login', false);
        document.getElementById('bottom-nav').classList.add('hidden');
    });
}

// ==================== BOTTOM NAV ====================
function initBottomNav() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navigateTo(item.dataset.screen);
        });
    });
}

// ==================== BACK BUTTONS ====================
function initBackButtons() {
    document.getElementById('btn-back-leads').addEventListener('click', () => {
        navigateTo('screen-leads');
    });
}

// ==================== PERIOD BUTTONS ====================
function initPeriodButtons() {
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    initScreens();
    initSplash();
    initLogin();
    initDashboard();
    initLeads();
    initAutomations();
    initCampaigns();
    initPOS();
    initSettings();
    initBottomNav();
    initBackButtons();
    initPeriodButtons();
    initAIChatbot();
});

// ==================== POS (POINT OF SALE) ====================
function getProductIcon(icon) {
    const icons = {
        headphones: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>',
        watch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M16.51 17.35l-.35 3.83a2 2 0 01-2 1.82H9.83a2 2 0 01-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 019.83 1h4.35a2 2 0 012 1.82l.35 3.83"/></svg>',
        shirt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.38 3.46L16 2 12 5 8 2 3.62 3.46a2 2 0 00-1.34 1.73l-.73 9.2A2 2 0 003.54 16.5h2.96l.5 5.5h10l.5-5.5h2.96a2 2 0 001.99-2.11l-.73-9.2a2 2 0 00-1.34-1.73z"/></svg>',
        shoe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 18h20v2H2zM4 18V8l4-4 2 2 2-2 2 2 2-2 4 4v10"/></svg>',
        coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>',
        leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 20 2 20 2s-1.5 5-4.5 8.5c-3 3.5-4.5 3.5-4.5 3.5"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 12 13"/></svg>',
        pill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.5 1.5H8A6.5 6.5 0 001.5 8v8A6.5 6.5 0 008 22.5h8a6.5 6.5 0 006.5-6.5v-2.5"/><circle cx="18" cy="6" r="4"/></svg>',
        activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>',
        lamp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2v1M4.22 7.22l.71.71M1 14h2M21 14h2M19.07 7.93l-.71.71"/><path d="M17 14a5 5 0 00-10 0"/></svg>',
        speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><line x1="12" y1="6" x2="12.01" y2="6"/></svg>',
        package: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    };
    return icons[icon] || icons.package;
}

function initPOS() {
    renderProducts(inventoryData);
    populateSaleDropdown();

    // Search
    document.getElementById('pos-search').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const activeCat = document.querySelector('.pos-categories .pill.active')?.dataset.posCat || 'all';
        let filtered = inventoryData.filter(p =>
            p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
        );
        if (activeCat !== 'all') filtered = filtered.filter(p => p.category === activeCat);
        renderProducts(filtered);
    });

    // Category pills
    document.querySelectorAll('.pos-categories .pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.pos-categories .pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const cat = pill.dataset.posCat;
            const q = document.getElementById('pos-search').value.toLowerCase();
            let filtered = cat === 'all' ? [...inventoryData] : inventoryData.filter(p => p.category === cat);
            if (q) filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
            renderProducts(filtered);
        });
    });

    // Quick Sale Panel
    const fab = document.getElementById('pos-fab');
    const overlay = document.getElementById('pos-sale-overlay');
    const panel = document.getElementById('pos-sale-panel');

    fab.addEventListener('click', () => {
        overlay.classList.add('active');
        panel.classList.add('active');
    });

    overlay.addEventListener('click', () => {
        overlay.classList.remove('active');
        panel.classList.remove('active');
    });

    // Add Item Panel
    const btnAdd = document.getElementById('btn-pos-add');
    const fabAdd = document.getElementById('pos-fab-add');
    const addOverlay = document.getElementById('pos-add-overlay');
    const addPanel = document.getElementById('pos-add-panel');
    const addSubmit = document.getElementById('pos-add-submit');

    const openAddModal = () => {
        addOverlay.classList.add('active');
        addPanel.classList.add('active');
    };

    if (btnAdd) btnAdd.addEventListener('click', openAddModal);
    if (fabAdd) fabAdd.addEventListener('click', openAddModal);

    if (addOverlay) {
        addOverlay.addEventListener('click', () => {
            addOverlay.classList.remove('active');
            addPanel.classList.remove('active');
        });
    }

    if (addSubmit) {
        addSubmit.addEventListener('click', () => {
            const name = document.getElementById('pos-add-name').value.trim();
            const sku = document.getElementById('pos-add-sku').value.trim();
            const category = document.getElementById('pos-add-category').value;
            const price = parseFloat(document.getElementById('pos-add-price').value) || 0;
            const stock = parseInt(document.getElementById('pos-add-stock').value) || 0;

            if (!name || !sku) return;

            addSubmit.innerHTML = '<svg viewBox="0 0 24 24" fill="none" class="spin-icon" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg> Adding...';
            addSubmit.style.opacity = '0.8';

            setTimeout(() => {
                const newId = inventoryData.length > 0 ? Math.max(...inventoryData.map(p => p.id)) + 1 : 1;
                inventoryData.unshift({
                    id: newId, name, sku, price, stock, maxStock: stock < 50 ? 50 : stock * 2, category: category.toLowerCase(),
                    gradient: 'linear-gradient(135deg, #45B29D, #2F6FA3)', icon: 'package'
                });

                addSubmit.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg> Added!';
                addSubmit.classList.add('success');
                addSubmit.style.opacity = '1';

                renderProducts(inventoryData);
                populateSaleDropdown();
                drawStockChart();

                // Update total count smoothly
                const countEl = document.querySelector('.pos-stat-card:nth-child(1) .pos-stat-value');
                if (countEl) countEl.dataset.posCount = inventoryData.length;
                animatePOSCounters();

                setTimeout(() => {
                    addSubmit.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Product';
                    addSubmit.classList.remove('success');
                    addOverlay.classList.remove('active');
                    addPanel.classList.remove('active');

                    document.getElementById('pos-add-name').value = '';
                    document.getElementById('pos-add-sku').value = '';
                    document.getElementById('pos-add-price').value = '';
                    document.getElementById('pos-add-stock').value = '';
                }, 1000);
            }, 800);
        });
    }

    // Quantity controls
    const qtyInput = document.getElementById('pos-sale-qty');
    document.getElementById('pos-qty-minus').addEventListener('click', () => {
        const val = parseInt(qtyInput.value) || 1;
        if (val > 1) qtyInput.value = val - 1;
        updateSaleTotal();
    });
    document.getElementById('pos-qty-plus').addEventListener('click', () => {
        const val = parseInt(qtyInput.value) || 1;
        if (val < 99) qtyInput.value = val + 1;
        updateSaleTotal();
    });
    qtyInput.addEventListener('input', updateSaleTotal);
    document.getElementById('pos-sale-product').addEventListener('change', updateSaleTotal);

    // Process sale
    document.getElementById('pos-process-sale').addEventListener('click', () => {
        const btn = document.getElementById('pos-process-sale');
        const productId = document.getElementById('pos-sale-product').value;
        if (!productId) return;

        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" class="spin-icon"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg> Processing...';
        btn.style.opacity = '0.8';

        setTimeout(() => {
            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg> Sale Complete!';
            btn.classList.add('success');
            btn.style.opacity = '1';

            setTimeout(() => {
                btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg> Process Sale';
                btn.classList.remove('success');
                overlay.classList.remove('active');
                panel.classList.remove('active');
                qtyInput.value = 1;
                document.getElementById('pos-sale-product').value = '';
                document.getElementById('pos-sale-total').textContent = '$0.00';
            }, 1500);
        }, 1000);
    });
}

function renderProducts(products) {
    const grid = document.getElementById('pos-products-grid');
    document.getElementById('pos-product-count').textContent = `${products.length} item${products.length !== 1 ? 's' : ''}`;

    grid.innerHTML = products.map((p, i) => {
        const pct = Math.round((p.stock / p.maxStock) * 100);
        let levelClass = 'fill-good';
        let qtyClass = 'pos-qty-good';
        if (pct <= 20) { levelClass = 'fill-danger'; qtyClass = 'pos-qty-danger'; }
        else if (pct <= 50) { levelClass = 'fill-warning'; qtyClass = 'pos-qty-warning'; }

        return `
        <div class="pos-product-card" style="animation-delay: ${i * 0.06}s" data-product-id="${p.id}">
            <div class="pos-product-thumb" style="background: ${p.gradient}">
                ${getProductIcon(p.icon)}
            </div>
            <div class="pos-product-body">
                <div class="pos-product-name">${p.name}</div>
                <div class="pos-product-sku">${p.sku}</div>
                <div class="pos-product-meta">
                    <span class="pos-product-price">$${p.price.toFixed(2)}</span>
                    <span class="pos-product-qty ${qtyClass}">${p.stock} in stock</span>
                </div>
                <div class="pos-stock-bar">
                    <div class="pos-stock-fill ${levelClass}" data-stock-pct="${pct}"></div>
                </div>
            </div>
        </div>`;
    }).join('');

    // Animate stock bars after a brief delay
    requestAnimationFrame(() => {
        setTimeout(() => animateStockBars(), 100);
    });
}

function animateStockBars() {
    document.querySelectorAll('.pos-stock-fill').forEach(bar => {
        const pct = bar.dataset.stockPct;
        bar.style.width = pct + '%';
    });
}

function animatePOSCounters() {
    document.querySelectorAll('.pos-stat-value').forEach(el => {
        const target = parseInt(el.dataset.posCount);
        const isCurrency = el.classList.contains('pos-currency');
        let current = 0;
        const duration = 1200;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = isCurrency
                ? '$' + Math.floor(current).toLocaleString()
                : Math.floor(current).toLocaleString();
        }, 16);
    });
}

function populateSaleDropdown() {
    const sel = document.getElementById('pos-sale-product');
    inventoryData.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.name} ($${p.price.toFixed(2)})`;
        sel.appendChild(opt);
    });
}

function updateSaleTotal() {
    const productId = document.getElementById('pos-sale-product').value;
    const qty = parseInt(document.getElementById('pos-sale-qty').value) || 0;
    const product = inventoryData.find(p => p.id === parseInt(productId));
    const total = product ? (product.price * qty) : 0;
    document.getElementById('pos-sale-total').textContent = '$' + total.toFixed(2);
}

function drawStockChart() {
    const canvas = document.getElementById('chart-stock');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 32) * dpr;
    canvas.height = 200 * dpr;
    canvas.style.width = (rect.width - 32) + 'px';
    canvas.style.height = '200px';
    ctx.scale(dpr, dpr);

    const w = rect.width - 32;
    const h = 200;

    // Aggregate stock by category
    const categories = {};
    inventoryData.forEach(p => {
        if (!categories[p.category]) categories[p.category] = { stock: 0, max: 0 };
        categories[p.category].stock += p.stock;
        categories[p.category].max += p.maxStock;
    });

    const catNames = Object.keys(categories);
    const catLabels = { electronics: 'Electronics', clothing: 'Clothing', food: 'Food & Bev', health: 'Health', home: 'Home' };
    const labels = catNames.map(c => catLabels[c] || c);
    const data = catNames.map(c => categories[c].stock);
    const maxVal = Math.max(...data) * 1.2;
    const colors = ['#2F6FA3', '#45B29D', '#C49B30', '#f59e0b', '#1E3A5F'];

    const padding = { top: 20, right: 10, bottom: 30, left: 35 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const barWidth = (chartW / data.length) * 0.55;
    const gap = (chartW / data.length) * 0.45;

    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = '#e2e6eb';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(w - padding.right, y);
        ctx.stroke();
        ctx.fillStyle = '#9ca3af';
        ctx.font = '9px Inter';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxVal - (maxVal / 4) * i), padding.left - 6, y + 4);
    }

    // Bars
    data.forEach((val, i) => {
        const x = padding.left + (chartW / data.length) * i + gap / 2;
        const barH = (val / maxVal) * chartH;
        const y = padding.top + chartH - barH;

        const barGrad = ctx.createLinearGradient(0, y, 0, padding.top + chartH);
        barGrad.addColorStop(0, colors[i % colors.length]);
        barGrad.addColorStop(1, colors[i % colors.length] + '88');

        const r = Math.min(barWidth / 2, 4);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + barWidth - r, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + r);
        ctx.lineTo(x + barWidth, padding.top + chartH);
        ctx.lineTo(x, padding.top + chartH);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fillStyle = barGrad;
        ctx.fill();

        // Value on top
        ctx.fillStyle = colors[i % colors.length];
        ctx.font = 'bold 9px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(val, x + barWidth / 2, y - 6);

        // Label
        ctx.fillStyle = '#9ca3af';
        ctx.font = '8px Inter';
        ctx.fillText(labels[i], x + barWidth / 2, h - 8);
    });
}

// ==================== AI CHATBOT ====================
function initAIChatbot() {
    const fab = document.getElementById('ai-chat-fab');
    if (!fab) return;
    const overlay = document.getElementById('ai-chat-overlay');
    const panel = document.getElementById('ai-chat-panel');
    const closeBtn = document.getElementById('ai-chat-close');
    const input = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');
    const messagesEl = document.getElementById('ai-chat-messages');

    fab.addEventListener('click', () => {
        overlay.classList.add('active');
        panel.classList.add('active');
    });

    const closeChat = () => {
        overlay.classList.remove('active');
        panel.classList.remove('active');
    };

    overlay.addEventListener('click', closeChat);
    closeBtn.addEventListener('click', closeChat);

    const generateAIResponse = (query) => {
        const lowerQ = query.toLowerCase();
        let response = "I can definitely help with that. Can you provide more details so I can look it up in your NaviFlow data?";

        if (lowerQ.includes('revenue')) {
            response = "Your current revenue this week is $24,680 across all properties. That's up 12% compared to last week!";
        } else if (lowerQ.includes('lead')) {
            const count = leadsData.length;
            const vipCount = leadsData.filter(l => l.tags.some(t => t.toLowerCase() === 'vip')).length;
            response = `You currently have ${count} total leads, including ${vipCount} VIP leads. Sarah Chen is your highest-scoring priority lead today.`;
        } else if (lowerQ.includes('stock') || lowerQ.includes('inventory')) {
            const lowStockItems = inventoryData.filter(p => (p.stock / p.maxStock) <= 0.2);
            response = `You currently have ${lowStockItems.length} items low on stock. I recommend ordering more "${lowStockItems[0]?.name || 'supplies'}" soon.`;
        } else if (lowerQ.includes('campaign') || lowerQ.includes('perform')) {
            response = "Your 'Spring Sale' campaign is currently your best performer with a 67% open rate and an excellent 12% conversion rate.";
        } else if (lowerQ.includes('hi') || lowerQ.includes('hello')) {
            response = "Hello! How can I assist you with your NaviFlow business data today?";
        }

        return response;
    };

    const appendMessage = (text, sender) => {
        messagesEl.insertAdjacentHTML('beforeend', `
            <div class="ai-msg ai-msg-${sender}">
                <div class="ai-msg-bubble">${text}</div>
                <span class="ai-msg-time">Just now</span>
            </div>
        `);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    };

    const handleSend = (text) => {
        if (!text) return;
        appendMessage(text, 'user');
        input.value = '';

        const typingId = 'ai-typing-' + Date.now();
        messagesEl.insertAdjacentHTML('beforeend', `
            <div class="ai-msg ai-msg-bot ai-typing" id="${typingId}">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `);
        messagesEl.scrollTop = messagesEl.scrollHeight;

        setTimeout(() => {
            const ind = document.getElementById(typingId);
            if (ind) ind.remove();
            appendMessage(generateAIResponse(text), 'bot');
        }, 1200);
    };

    sendBtn.addEventListener('click', () => handleSend(input.value.trim()));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend(input.value.trim());
    });

    document.querySelectorAll('.ai-prompt-chip').forEach(chip => {
        chip.addEventListener('click', () => handleSend(chip.dataset.prompt));
    });
}
