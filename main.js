// ==================== NAVIFLOW PROTOTYPE ====================
// Navigation, data rendering, charts, and interactions

// ==================== API ====================
const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? ''
  : '';

async function loadDataFromAPI() {
  try {
    const [dashRes, leadsRes, invRes, recRes] = await Promise.all([
      fetch(`${BASE_URL}/api/dashboard`),
      fetch(`${BASE_URL}/api/leads`),
      fetch(`${BASE_URL}/api/inventory`),
      fetch(`${BASE_URL}/api/recovery`),
    ]);

    if (dashRes.ok) {
      const dash = await dashRes.json();
      if (dash.speedGuard) speedGuardLeads.splice(0, speedGuardLeads.length, ...dash.speedGuard);
    }
    if (leadsRes.ok) {
      const leads = await leadsRes.json();
      leadsData.splice(0, leadsData.length, ...leads.data);
    }
    if (invRes.ok) {
      const inv = await invRes.json();
      inventoryData.splice(0, inventoryData.length, ...inv.data);
    }
    if (recRes.ok) {
      const rec = await recRes.json();
      recoveryData.splice(0, recoveryData.length, ...rec.data);
      Object.assign(recoveryStats, rec.stats);
    }
  } catch (e) {
    // Fall back to hardcoded demo data already in the arrays
  }
}

// ==================== DATA ====================
let leadsData = [
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

let inventoryData = [
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

let recoveryData = [
    { id: 1, name: 'Marcus Webb', initials: 'MW', value: 4500, daysSince: 5, dropReason: 'slow_response', reasonLabel: 'Slow Response', status: 'pending', campaignType: 'slot-save', color: '#ef4444', aiMessage: 'We saved your slot. Want me to book it for you right now?', aiAnalysis: 'Lead waited 4+ hours for first reply. Interest dropped significantly after 2 hours.' },
    { id: 2, name: 'Diana Cruz', initials: 'DC', value: 7200, daysSince: 3, dropReason: 'price_hesitation', reasonLabel: 'Price Hesitation', status: 'recovering', campaignType: 'discount', color: '#f59e0b', aiMessage: 'Still interested? Here is an exclusive 15% discount, valid today only.', aiAnalysis: 'Engaged with pricing page 4 times. Left after seeing total. Price sensitivity detected.' },
    { id: 3, name: 'Leo Martinez', initials: 'LM', value: 3800, daysSince: 7, dropReason: 'unclear_offer', reasonLabel: 'Unclear Offer', status: 'pending', campaignType: 'question', color: '#8b5cf6', aiMessage: 'Quick question before you go. What stopped you from moving forward?', aiAnalysis: 'Opened 3 emails but never clicked CTA. Likely confused by offer structure.' },
    { id: 4, name: 'Rachel Kim', initials: 'RK', value: 2900, daysSince: 10, dropReason: 'went_cold', reasonLabel: 'Went Cold', status: 'pending', campaignType: 'reminder', color: '#6b7280', aiMessage: 'Hey Rachel, we have not heard from you in a while. Still looking for a solution?', aiAnalysis: 'Was active for 2 weeks then suddenly stopped. No negative signals detected.' },
    { id: 5, name: 'Jake Thornton', initials: 'JT', value: 5100, daysSince: 2, dropReason: 'wrong_timing', reasonLabel: 'Wrong Timing', status: 'recovering', campaignType: 'slot-save', color: '#3b82f6', aiMessage: 'Your consultation slot is still available. Want to reschedule for a better time?', aiAnalysis: 'Booked a call but cancelled 1 hour before. Calendar shows heavy schedule this week.' },
    { id: 6, name: 'Nina Patel', initials: 'NP', value: 6500, daysSince: 4, dropReason: 'price_hesitation', reasonLabel: 'Price Hesitation', status: 'recovered', campaignType: 'discount', color: '#f59e0b', aiMessage: 'Great news! We have a limited offer just for you. 20% off if you sign up today.', aiAnalysis: 'Compared pricing with 2 competitors. Returned after receiving discount offer.' },
];

let recoveryStats = {
    atRisk: 30000,
    recoveredThisWeek: 12450,
    recoveryRate: 27,
    pendingCount: 8,
    totalRecovered: 48200,
    weeklyData: {
        recovered: [1200, 1800, 2100, 1500, 2400, 1900, 1550],
        lost: [800, 1200, 600, 2100, 900, 1400, 1100],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
};

const speedGuardConfig = {
    safeThreshold: 120,    // 0-2 min = green
    warningThreshold: 300, // 2-5 min = yellow
    // 5+ min = red (danger)
    autoReplyDelay: 360    // auto-reply fires at 6 min
};

let speedGuardLeads = [
    { id: 101, name: 'Sarah Chen', initials: 'SC', color: '#2F6FA3', message: 'Hi, I saw your enterprise plans and have a few questions about integration.', elapsedSeconds: 85, status: 'active', autoReplied: false },
    { id: 102, name: 'Mike Ross', initials: 'MR', color: '#45B29D', message: 'Hey! Just filled out the contact form. Looking for a demo.', elapsedSeconds: 210, status: 'active', autoReplied: false },
    { id: 103, name: 'David Kim', initials: 'DK', color: '#45B29D', message: 'Replying to your SMS - yes I am interested in the premium plan!', elapsedSeconds: 340, status: 'active', autoReplied: false },
];

let speedGuardInterval = null;
let speedGuardAlertShown = {};

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
    const sidebar = document.getElementById('desktop-sidebar');
    const isAuthScreen = screenId !== 'screen-splash' && screenId !== 'screen-login';
    const navScreens = ['screen-dashboard', 'screen-leads', 'screen-pos', 'screen-recovery', 'screen-settings'];

    if (showNav && navScreens.includes(screenId)) {
        nav.classList.remove('hidden');
    } else if (!isAuthScreen) {
        nav.classList.add('hidden');
    }

    if (sidebar) {
        if (isAuthScreen && showNav) {
            sidebar.classList.add('visible');
        } else if (!isAuthScreen) {
            sidebar.classList.remove('visible');
        }
    }

    // Update active tab in bottom nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.screen === screenId);
    });

    // Update active item in sidebar
    document.querySelectorAll('.sidebar-item').forEach(item => {
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
    if (screenId === 'screen-recovery') {
        animateRecoveryCounters();
        setTimeout(() => drawRecoveryChart(), 300);
    }
}

// ==================== SPLASH SCREEN ====================
function initSplash() {
    const minDelay = new Promise(resolve => setTimeout(resolve, 3000));
    Promise.all([minDelay, loadDataFromAPI()]).then(() => {
        navigateTo('screen-login', false);
    });
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
                displayValue = '₱' + Math.floor(current).toLocaleString();
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
        ctx.fillText('₱' + Math.round((maxVal - (maxVal / 4) * i) / 1000) + 'k', padding.left - 6, y + 4);
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
        ctx.fillStyle = 'white';
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

    // + button — add new lead
    document.getElementById('btn-add-lead')?.addEventListener('click', () => {
        showActionSheet('Add New Lead', `
            <div class="as-setting-form">
                <label class="as-label">Full Name</label>
                <input class="as-input" id="as-lead-name2" placeholder="e.g. Jane Smith" />
                <label class="as-label">Email</label>
                <input class="as-input" id="as-lead-email2" placeholder="jane@company.com" />
                <label class="as-label">Phone</label>
                <input class="as-input" id="as-lead-phone2" placeholder="+1 (555) 000-0000" />
                <label class="as-label">Role / Company</label>
                <input class="as-input" id="as-lead-role2" placeholder="e.g. CEO at Acme Inc." />
                <label class="as-label">Status</label>
                <div class="as-tag-grid" id="as-lead-status-chips">
                    <button class="as-tag-chip selected" data-status="new">New</button>
                    <button class="as-tag-chip" data-status="contacted">Contacted</button>
                    <button class="as-tag-chip" data-status="converted">Converted</button>
                </div>
                <button class="as-send-btn" id="as-lead-add2">Add Lead</button>
            </div>
        `);
        document.querySelectorAll('#as-lead-status-chips .as-tag-chip').forEach(c => {
            c.addEventListener('click', () => {
                document.querySelectorAll('#as-lead-status-chips .as-tag-chip').forEach(x => x.classList.remove('selected'));
                c.classList.add('selected');
            });
        });
        document.getElementById('as-lead-add2').addEventListener('click', () => {
            const name = document.getElementById('as-lead-name2').value.trim();
            const email = document.getElementById('as-lead-email2').value.trim();
            if (!name || !email) { showToast('Name and email are required', 'error'); return; }
            const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
            const colors = ['#2F6FA3', '#45B29D', '#1E3A5F', '#9ED8C3'];
            const status = document.querySelector('#as-lead-status-chips .as-tag-chip.selected')?.dataset.status || 'new';
            const newLead = {
                id: leadsData.length + 1, name, initials, email,
                phone: document.getElementById('as-lead-phone2').value.trim() || 'N/A',
                role: document.getElementById('as-lead-role2').value.trim() || 'New Contact',
                status, tags: ['New'], color: colors[leadsData.length % colors.length], conversation: []
            };
            leadsData.unshift(newLead);
            renderLeads(leadsData);
            closeActionSheet();
            showToast(`${name} added to leads`);
        });
    });

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
    currentLead = lead;
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

    // Node pulse animation + make nodes interactive
    document.querySelectorAll('.auto-node').forEach((node, i) => {
        node.style.animation = `slideIn 0.4s ease-out ${i * 0.1}s both`;
        node.style.cursor = 'pointer';
        node.addEventListener('click', () => openNodeEditor(node));
    });

    // + button — open new automation sheet
    document.getElementById('btn-add-auto')?.addEventListener('click', () => {
        showActionSheet('New Automation', `
            <div class="as-setting-form">
                <label class="as-label">Automation Name</label>
                <input class="as-input" id="as-auto-name" placeholder="e.g. New Lead Follow-Up" />
                <label class="as-label">Trigger</label>
                <div class="as-tag-grid" id="as-auto-triggers">
                    <button class="as-tag-chip selected" data-trigger="new-lead">New Lead Added</button>
                    <button class="as-tag-chip" data-trigger="no-reply">No Reply 24h</button>
                    <button class="as-tag-chip" data-trigger="tag-added">Tag Added</button>
                    <button class="as-tag-chip" data-trigger="purchase">Purchase Made</button>
                </div>
                <label class="as-label">First Action</label>
                <div class="as-tag-grid" id="as-auto-actions">
                    <button class="as-tag-chip selected" data-action="send-email">Send Email</button>
                    <button class="as-tag-chip" data-action="send-sms">Send SMS</button>
                    <button class="as-tag-chip" data-action="add-tag">Add Tag</button>
                    <button class="as-tag-chip" data-action="wait">Wait</button>
                </div>
                <button class="as-send-btn" id="as-auto-create">Create Automation</button>
            </div>
        `);
        document.querySelectorAll('#as-auto-triggers .as-tag-chip').forEach(c => {
            c.addEventListener('click', () => {
                document.querySelectorAll('#as-auto-triggers .as-tag-chip').forEach(x => x.classList.remove('selected'));
                c.classList.add('selected');
            });
        });
        document.querySelectorAll('#as-auto-actions .as-tag-chip').forEach(c => {
            c.addEventListener('click', () => {
                document.querySelectorAll('#as-auto-actions .as-tag-chip').forEach(x => x.classList.remove('selected'));
                c.classList.add('selected');
            });
        });
        document.getElementById('as-auto-create').addEventListener('click', () => {
            const name = document.getElementById('as-auto-name').value.trim();
            if (!name) { showToast('Please enter a name', 'error'); return; }
            const trigger = document.querySelector('#as-auto-triggers .as-tag-chip.selected')?.textContent || 'New Lead Added';
            closeActionSheet();
            showToast(`Automation "${name}" created`);
            // Add a card to the auto-list
            const list = document.querySelector('.auto-list');
            if (list) {
                const card = document.createElement('div');
                card.className = 'auto-card';
                card.style.animation = 'slideIn 0.3s ease-out both';
                card.innerHTML = `
                    <div class="auto-card-header">
                        <div class="auto-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
                        <div class="auto-toggle active"><div class="toggle-dot"></div></div>
                    </div>
                    <h4 class="auto-card-name">${name}</h4>
                    <p class="auto-card-trigger">Trigger: ${trigger}</p>
                    <div class="auto-card-stats"><span>0 runs</span><span class="auto-card-status active-status">Active</span></div>
                `;
                list.insertBefore(card, list.firstChild);
                card.querySelector('.auto-toggle').addEventListener('click', e => { e.stopPropagation(); card.querySelector('.auto-toggle').classList.toggle('active'); });
            }
        });
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
        const campName = document.querySelector('.camp-input')?.value.trim() || 'Campaign';
        const audience = document.querySelector('.audience-chip.selected')?.textContent?.trim() || 'All Leads';
        btn.textContent = 'Launching...';
        btn.style.opacity = '0.7';
        setTimeout(() => {
            btn.textContent = '✓ Campaign Launched!';
            btn.style.background = 'linear-gradient(135deg, #45B29D, #9ED8C3)';
            showToast(`"${campName}" sent to ${audience}`, 'success');
            setTimeout(() => {
                btn.textContent = 'Launch Campaign';
                btn.style.opacity = '1';
                btn.style.background = '';
            }, 2500);
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
        ctx.fillText('₱' + Math.round((maxVal - (maxVal / 4) * i) / 1000) + 'k', padding.left - 6, y + 4);
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
        document.getElementById('desktop-sidebar')?.classList.remove('visible');
    });
}

// ==================== DESKTOP SIDEBAR ====================
function initSidebar() {
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
            navigateTo(item.dataset.screen);
        });
    });

    const logoutBtn = document.getElementById('sidebar-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            navigateTo('screen-login', false);
            document.getElementById('bottom-nav').classList.add('hidden');
        });
    }
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
    initRecovery();
    initSettings();
    initSidebar();
    initBottomNav();
    initBackButtons();
    initPeriodButtons();
    initAIChatbot();
    initSpeedGuard();
});

// ==================== REPLY SPEED GUARD ====================
function initSpeedGuard() {
    renderSpeedGuardCards();
    updateSpeedGuardBanner();

    // Start the live timer - ticks every second
    if (speedGuardInterval) clearInterval(speedGuardInterval);
    speedGuardInterval = setInterval(() => {
        speedGuardLeads.forEach(lead => {
            if (lead.status === 'active') {
                lead.elapsedSeconds++;

                // Auto-reply trigger
                if (lead.elapsedSeconds >= speedGuardConfig.autoReplyDelay && !lead.autoReplied) {
                    triggerAutoReply(lead);
                }
            }
        });
        updateSpeedGuardTimers();
        updateSpeedGuardBanner();
    }, 1000);

    // Wire up alert dismiss
    const alertDismiss = document.getElementById('sg-alert-dismiss');
    if (alertDismiss) {
        alertDismiss.addEventListener('click', () => {
            document.getElementById('sg-alert-toast').classList.remove('active');
        });
    }
}

function getUrgencyLevel(seconds) {
    if (seconds < speedGuardConfig.safeThreshold) return 'safe';
    if (seconds < speedGuardConfig.warningThreshold) return 'warning';
    return 'danger';
}

function formatTimer(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function getUrgencyPercent(seconds) {
    // 0-360s mapped to 0-100%
    return Math.min((seconds / speedGuardConfig.autoReplyDelay) * 100, 100);
}

function renderSpeedGuardCards() {
    const container = document.getElementById('sg-cards-list');
    if (!container) return;

    const activeLeads = speedGuardLeads.filter(l => l.status === 'active');

    if (activeLeads.length === 0) {
        container.innerHTML = '<div class="sg-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span>All leads responded. You are safe!</span></div>';
        return;
    }

    container.innerHTML = activeLeads.map((lead, i) => {
        const urgency = getUrgencyLevel(lead.elapsedSeconds);
        const pct = getUrgencyPercent(lead.elapsedSeconds);
        // SVG ring: circumference = 2*PI*18 = ~113
        const dashOffset = 113 - (pct / 100) * 113;

        return `
        <div class="sg-card sg-${urgency}" data-sg-id="${lead.id}" style="animation-delay: ${i * 0.08}s">
            <div class="sg-card-left">
                <div class="sg-ring-wrap">
                    <svg class="sg-ring" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="18" fill="none" stroke-width="3" class="sg-ring-bg"/>
                        <circle cx="20" cy="20" r="18" fill="none" stroke-width="3" class="sg-ring-fill sg-ring-${urgency}" 
                            stroke-dasharray="113" stroke-dashoffset="${dashOffset}" stroke-linecap="round" transform="rotate(-90 20 20)"
                            data-sg-ring="${lead.id}"/>
                    </svg>
                    <div class="sg-avatar" style="background: ${lead.color}">${lead.initials}</div>
                </div>
            </div>
            <div class="sg-card-center">
                <div class="sg-card-name">${lead.name}</div>
                <div class="sg-card-msg">${lead.message.length > 45 ? lead.message.substring(0, 45) + '...' : lead.message}</div>
            </div>
            <div class="sg-card-right">
                <div class="sg-timer sg-timer-${urgency}" data-sg-timer="${lead.id}">${formatTimer(lead.elapsedSeconds)}</div>
                ${lead.autoReplied ?
                '<div class="sg-auto-replied"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg> AI Replied</div>' :
                `<button class="sg-reply-btn" data-sg-reply="${lead.id}">Reply</button>`
            }
            </div>
        </div>`;
    }).join('');

    // Wire up reply buttons
    container.querySelectorAll('.sg-reply-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.sgReply);
            handleManualReply(id);
        });
    });
}

function updateSpeedGuardTimers() {
    speedGuardLeads.forEach(lead => {
        if (lead.status !== 'active') return;

        const urgency = getUrgencyLevel(lead.elapsedSeconds);
        const pct = getUrgencyPercent(lead.elapsedSeconds);
        const dashOffset = 113 - (pct / 100) * 113;

        // Update timer text
        const timerEl = document.querySelector(`[data-sg-timer="${lead.id}"]`);
        if (timerEl) {
            timerEl.textContent = formatTimer(lead.elapsedSeconds);
            timerEl.className = `sg-timer sg-timer-${urgency}`;
        }

        // Update ring
        const ringEl = document.querySelector(`[data-sg-ring="${lead.id}"]`);
        if (ringEl) {
            ringEl.setAttribute('stroke-dashoffset', dashOffset);
            ringEl.className.baseVal = `sg-ring-fill sg-ring-${urgency}`;
        }

        // Update card border
        const card = document.querySelector(`[data-sg-id="${lead.id}"]`);
        if (card) {
            card.className = `sg-card sg-${urgency}`;
        }

        // Show alert when crossing danger threshold
        if (urgency === 'danger' && !speedGuardAlertShown[lead.id] && !lead.autoReplied) {
            speedGuardAlertShown[lead.id] = true;
            showSpeedGuardAlert(lead);
        }
    });

    // Update header count
    const countEl = document.getElementById('sg-active-count');
    if (countEl) {
        const activeCount = speedGuardLeads.filter(l => l.status === 'active').length;
        countEl.textContent = activeCount;
    }
}

function updateSpeedGuardBanner() {
    const banner = document.getElementById('sg-leads-banner');
    if (!banner) return;
    const activeCount = speedGuardLeads.filter(l => l.status === 'active').length;
    const dangerCount = speedGuardLeads.filter(l => l.status === 'active' && getUrgencyLevel(l.elapsedSeconds) === 'danger').length;

    if (activeCount === 0) {
        banner.classList.remove('active');
        return;
    }

    banner.classList.add('active');
    const bannerText = document.getElementById('sg-banner-text');
    if (bannerText) {
        if (dangerCount > 0) {
            bannerText.innerHTML = `<strong>${dangerCount} lead${dangerCount > 1 ? 's' : ''} at high risk!</strong> Reply now to avoid losing them.`;
        } else {
            bannerText.innerHTML = `<strong>${activeCount} lead${activeCount > 1 ? 's' : ''} waiting</strong> for your reply.`;
        }
    }
    const bannerIcon = document.getElementById('sg-banner-icon');
    if (bannerIcon) {
        bannerIcon.className = dangerCount > 0 ? 'sg-banner-dot sg-dot-danger' : 'sg-banner-dot sg-dot-warning';
    }
}

function showSpeedGuardAlert(lead) {
    const toast = document.getElementById('sg-alert-toast');
    if (!toast) return;

    document.getElementById('sg-alert-name').textContent = lead.name;
    document.getElementById('sg-alert-timer').textContent = formatTimer(lead.elapsedSeconds);

    // Wire reply actions
    const replyBtn = document.getElementById('sg-alert-reply');
    const autoBtn = document.getElementById('sg-alert-auto');

    const newReplyBtn = replyBtn.cloneNode(true);
    const newAutoBtn = autoBtn.cloneNode(true);
    replyBtn.parentNode.replaceChild(newReplyBtn, replyBtn);
    autoBtn.parentNode.replaceChild(newAutoBtn, autoBtn);

    newReplyBtn.id = 'sg-alert-reply';
    newAutoBtn.id = 'sg-alert-auto';

    newReplyBtn.addEventListener('click', () => {
        handleManualReply(lead.id);
        toast.classList.remove('active');
    });
    newAutoBtn.addEventListener('click', () => {
        triggerAutoReply(lead);
        toast.classList.remove('active');
    });

    toast.classList.add('active');

    // Auto-dismiss after 8 seconds
    setTimeout(() => {
        toast.classList.remove('active');
    }, 8000);
}

function triggerAutoReply(lead) {
    lead.autoReplied = true;

    // Update the card to show AI Replied
    const card = document.querySelector(`[data-sg-id="${lead.id}"]`);
    if (card) {
        const rightEl = card.querySelector('.sg-card-right');
        if (rightEl) {
            const btn = rightEl.querySelector('.sg-reply-btn');
            if (btn) {
                btn.outerHTML = '<div class="sg-auto-replied"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg> AI Replied</div>';
            }
        }
    }
}

function handleManualReply(leadId) {
    const lead = speedGuardLeads.find(l => l.id === leadId);
    if (!lead) return;
    lead.status = 'replied';

    // Animate card out
    const card = document.querySelector(`[data-sg-id="${leadId}"]`);
    if (card) {
        card.style.transition = 'all 0.4s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateX(60px)';
        card.style.maxHeight = card.scrollHeight + 'px';
        setTimeout(() => {
            card.style.maxHeight = '0';
            card.style.padding = '0';
            card.style.margin = '0';
            card.style.overflow = 'hidden';
        }, 200);
        setTimeout(() => {
            renderSpeedGuardCards();
        }, 500);
    }

    updateSpeedGuardBanner();
}

// ==================== RECOVERY ENGINE ====================
function initRecovery() {
    renderRecoveryOpportunities();

    // Filter pills
    document.querySelectorAll('.recovery-pills .pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.recovery-pills .pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const filter = pill.dataset.recFilter;
            if (filter === 'all') {
                renderRecoveryOpportunities(recoveryData);
            } else {
                renderRecoveryOpportunities(recoveryData.filter(r => r.status === filter));
            }
        });
    });
}

function renderRecoveryOpportunities(data = recoveryData) {
    const container = document.getElementById('recovery-opps-list');
    if (!container) return;

    const reasonIcons = {
        slow_response: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        price_hesitation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
        unclear_offer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        went_cold: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
        wrong_timing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
    };

    container.innerHTML = data.map((opp, i) => {
        const statusClass = `rec-status-${opp.status}`;
        const statusLabel = opp.status.charAt(0).toUpperCase() + opp.status.slice(1);
        return `
        <div class="lost-opp-card" style="animation-delay: ${i * 0.08}s" data-opp-id="${opp.id}">
            <div class="lost-opp-header">
                <div class="lost-opp-avatar" style="background: linear-gradient(135deg, ${opp.color}40, ${opp.color}15)">${opp.initials}</div>
                <div class="lost-opp-info">
                    <h4>${opp.name}</h4>
                    <span class="lost-opp-value">Potential: ₱${opp.value.toLocaleString()}</span>
                </div>
                <span class="lost-opp-status ${statusClass}">${statusLabel}</span>
            </div>
            <div class="lost-opp-reason">
                <div class="drop-reason drop-${opp.dropReason}">
                    <span class="drop-reason-icon">${reasonIcons[opp.dropReason] || ''}</span>
                    <span>${opp.reasonLabel}</span>
                </div>
                <span class="lost-opp-days">${opp.daysSince}d ago</span>
            </div>
            <div class="lost-opp-ai">
                <div class="ai-analysis-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    AI Analysis
                </div>
                <p class="ai-analysis-text">${opp.aiAnalysis}</p>
            </div>
            <div class="lost-opp-action">
                <div class="recovery-msg-preview">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                    <span>"${opp.aiMessage}"</span>
                </div>
                ${opp.status === 'recovered' ? `<button class="btn-recover btn-recovered" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg> Recovered</button>` : `<button class="btn-recover" data-recover-id="${opp.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> Recover Now</button>`}
            </div>
        </div>`;
    }).join('');

    // Wire up recover buttons
    container.querySelectorAll('.btn-recover:not(.btn-recovered)').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.recoverId);
            const opp = recoveryData.find(r => r.id === id);
            if (!opp) return;

            showActionSheet(`Send Recovery Message to ${opp.name}`, `
                <div style="margin-bottom:14px">
                    <div style="font-size:0.72rem;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px">AI-Crafted Message</div>
                    <div style="background:var(--gray-50);border:1.5px solid var(--gray-200);border-radius:10px;padding:12px;font-size:0.84rem;color:var(--dark);line-height:1.5">"${opp.aiMessage}"</div>
                </div>
                <div style="margin-bottom:16px">
                    <div style="font-size:0.72rem;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6px">Why This Works</div>
                    <p style="font-size:0.8rem;color:var(--gray-500);line-height:1.5">${opp.aiAnalysis}</p>
                </div>
                <button class="as-send-btn" id="as-rec-send" style="margin-top:0">Send via ${opp.campaignType === 'discount' ? 'Email' : 'SMS'}</button>
            `);

            document.getElementById('as-rec-send').addEventListener('click', () => {
                closeActionSheet();
                btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" class="spin-icon" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg> Sending...';
                btn.style.opacity = '0.7';

                setTimeout(() => {
                    opp.status = 'recovering';
                    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg> Sent!';
                    btn.style.opacity = '1';
                    btn.disabled = true;
                    showToast(`Recovery message sent to ${opp.name}`);

                    const card = btn.closest('.lost-opp-card');
                    const statusEl = card?.querySelector('.lost-opp-status');
                    if (statusEl) { statusEl.className = 'lost-opp-status rec-status-recovering'; statusEl.textContent = 'Recovering'; }

                    // Simulate lead responding after a delay
                    setTimeout(() => {
                        opp.status = 'recovered';
                        recoveryStats.recoveredThisWeek += opp.value;
                        recoveryStats.atRisk = Math.max(0, recoveryStats.atRisk - opp.value);
                        recoveryStats.pendingCount = Math.max(0, recoveryStats.pendingCount - 1);
                        if (statusEl) { statusEl.className = 'lost-opp-status rec-status-recovered'; statusEl.textContent = 'Recovered'; }
                        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg> Recovered';
                        btn.classList.add('btn-recovered');
                        showToast(`${opp.name} recovered — ₱${opp.value.toLocaleString()} won back!`, 'success');
                        animateRecoveryCounters();
                    }, 4000);
                }, 1200);
            });
        });
    });
}

function animateRecoveryCounters() {
    document.querySelectorAll('.rec-stat-value').forEach(el => {
        const target = parseFloat(el.dataset.recVal);
        const prefix = el.dataset.recPrefix || '';
        const suffix = el.dataset.recSuffix || '';
        const isDecimal = el.dataset.recDecimal === 'true';
        let current = 0;
        const duration = 1400;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            const display = isDecimal ? current.toFixed(0) : Math.floor(current).toLocaleString();
            el.textContent = prefix + display + suffix;
        }, 16);
    });
}

function drawRecoveryChart() {
    const canvas = document.getElementById('chart-recovery');
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

    const data1 = recoveryStats.weeklyData.recovered;
    const data2 = recoveryStats.weeklyData.lost;
    const labels = recoveryStats.weeklyData.labels;

    const padding = { top: 20, right: 10, bottom: 30, left: 40 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const maxVal = 3000;
    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = '#e2e6eb';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartH / 4) * i;
        ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(w - padding.right, y); ctx.stroke();
        ctx.fillStyle = '#9ca3af'; ctx.font = '9px Inter'; ctx.textAlign = 'right';
        ctx.fillText('₱' + ((maxVal - (maxVal / 4) * i) / 1000).toFixed(1) + 'k', padding.left - 6, y + 4);
    }
    labels.forEach((l, i) => {
        ctx.fillStyle = '#9ca3af'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
        ctx.fillText(l, padding.left + (chartW / (labels.length - 1)) * i, h - 8);
    });

    // Recovered line (green gradient fill)
    const grad1 = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    grad1.addColorStop(0, 'rgba(69, 178, 157, 0.25)'); grad1.addColorStop(1, 'rgba(69, 178, 157, 0)');
    ctx.beginPath();
    data1.forEach((val, i) => {
        const x = padding.left + (chartW / (data1.length - 1)) * i;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding.left + chartW, h - padding.bottom);
    ctx.lineTo(padding.left, h - padding.bottom);
    ctx.closePath(); ctx.fillStyle = grad1; ctx.fill();

    // Recovered line
    drawSingleLine(ctx, data1, padding, chartW, chartH, maxVal, '#45B29D', 2.5);
    // Lost line (red)
    drawSingleLine(ctx, data2, padding, chartW, chartH, maxVal, '#ef4444', 2);

    // Legend
    ctx.fillStyle = '#45B29D'; ctx.fillRect(w - 130, 8, 10, 3);
    ctx.fillStyle = '#9ca3af'; ctx.font = '9px Inter'; ctx.textAlign = 'left';
    ctx.fillText('Recovered', w - 116, 12);
    ctx.fillStyle = '#ef4444'; ctx.fillRect(w - 55, 8, 10, 3);
    ctx.fillStyle = '#9ca3af'; ctx.fillText('Lost', w - 41, 12);
}

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
        const qty = parseInt(qtyInput.value) || 1;
        if (!productId) { showToast('Please select a product', 'error'); return; }

        const product = inventoryData.find(p => p.id === parseInt(productId));
        if (!product) return;
        if (product.stock < qty) { showToast(`Only ${product.stock} units in stock`, 'error'); return; }

        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" class="spin-icon"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg> Processing...';
        btn.style.opacity = '0.8';

        setTimeout(() => {
            // Deduct stock
            product.stock -= qty;
            const total = (product.price * qty).toFixed(2);
            const orderNum = 'NF-' + Math.floor(1900 + Math.random() * 100);

            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg> Sale Complete!';
            btn.classList.add('success');
            btn.style.opacity = '1';

            // Add transaction to list
            const txnList = document.getElementById('pos-transactions');
            if (txnList) {
                const txn = document.createElement('div');
                txn.className = 'pos-txn-card';
                txn.style.animation = 'slideIn 0.3s ease-out both';
                txn.innerHTML = `
                    <div class="pos-txn-icon txn-sale"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>
                    <div class="pos-txn-info"><h4>${product.name} x${qty}</h4><p>Order #${orderNum} - Just now</p></div>
                    <span class="pos-txn-amount">+$${total}</span>
                `;
                txnList.insertBefore(txn, txnList.firstChild);
            }

            renderProducts(inventoryData);
            drawStockChart();
            showToast(`Sale complete — ${product.name} x${qty} · ₱${total}`);

            setTimeout(() => {
                btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg> Process Sale';
                btn.classList.remove('success');
                overlay.classList.remove('active');
                panel.classList.remove('active');
                qtyInput.value = 1;
                document.getElementById('pos-sale-product').value = '';
                document.getElementById('pos-sale-total').textContent = '$0.00';
            }, 1500);
        }, 800);
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
            <button class="pos-card-delete" data-delete-id="${p.id}" title="Delete product">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
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

    // Delete buttons
    grid.querySelectorAll('.pos-card-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.deleteId);
            const product = inventoryData.find(p => p.id === id);
            if (!product) return;
            showActionSheet(`Delete "${product.name}"?`, `
                <p style="font-size:0.85rem;color:var(--gray-500);margin-bottom:20px;line-height:1.5">This will permanently remove <strong>${product.name}</strong> (${product.sku}) from your inventory. This cannot be undone.</p>
                <button class="as-send-btn" id="as-confirm-delete" style="background:linear-gradient(135deg,#ef4444,#b91c1c)">Delete Product</button>
            `);
            document.getElementById('as-confirm-delete').addEventListener('click', () => {
                const idx = inventoryData.findIndex(p => p.id === id);
                if (idx !== -1) inventoryData.splice(idx, 1);
                renderProducts(inventoryData);
                populateSaleDropdown();
                drawStockChart();
                closeActionSheet();
                showToast(`"${product.name}" deleted`, 'error');
            });
        });
    });

    // Card click = edit
    grid.querySelectorAll('.pos-product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.pos-card-delete')) return;
            const id = parseInt(card.dataset.productId);
            const p = inventoryData.find(x => x.id === id);
            if (!p) return;
            showActionSheet(`Edit "${p.name}"`, `
                <div class="as-setting-form">
                    <label class="as-label">Product Name</label>
                    <input class="as-input" id="as-edit-name" value="${p.name}" />
                    <label class="as-label">Price ($)</label>
                    <input class="as-input" type="number" id="as-edit-price" value="${p.price.toFixed(2)}" step="0.01" min="0" />
                    <label class="as-label">Stock Quantity</label>
                    <input class="as-input" type="number" id="as-edit-stock" value="${p.stock}" min="0" />
                    <label class="as-label">Max Stock</label>
                    <input class="as-input" type="number" id="as-edit-maxstock" value="${p.maxStock}" min="0" />
                    <button class="as-send-btn" id="as-edit-save">Save Changes</button>
                </div>
            `);
            document.getElementById('as-edit-save').addEventListener('click', () => {
                p.name = document.getElementById('as-edit-name').value.trim() || p.name;
                p.price = parseFloat(document.getElementById('as-edit-price').value) || p.price;
                p.stock = parseInt(document.getElementById('as-edit-stock').value) || 0;
                p.maxStock = parseInt(document.getElementById('as-edit-maxstock').value) || p.maxStock;
                renderProducts(inventoryData);
                populateSaleDropdown();
                drawStockChart();
                closeActionSheet();
                showToast(`"${p.name}" updated`);
            });
        });
    });

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
                ? '₱' + Math.floor(current).toLocaleString()
                : Math.floor(current).toLocaleString();
        }, 16);
    });
}

function populateSaleDropdown() {
    const sel = document.getElementById('pos-sale-product');
    sel.innerHTML = '<option value="">Select a product...</option>';
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
    document.getElementById('pos-sale-total').textContent = '₱' + total.toFixed(2);
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

// ==================== AI SMART FALLBACK ====================
function smartFallback(text, ctx) {
    const q = text.toLowerCase();
    if (q.includes('lead') && (q.includes('how many') || q.includes('total') || q.includes('count'))) {
        return `You currently have ${ctx.totalLeads} leads in your pipeline — ${ctx.vipLeads} VIP and ${ctx.hotLeads} marked hot. Your top priority should be following up with any contacted leads who haven't responded in 48+ hours.`;
    }
    if (q.includes('revenue') || q.includes('sales') || q.includes('money')) {
        return `Your weekly revenue is ₱${(ctx.weeklyRevenue || 24680).toLocaleString()}, up ${ctx.revenueGrowth || '12%'} from last week. To accelerate growth, consider launching a targeted campaign at your VIP leads — they typically convert at 3x the rate.`;
    }
    if (q.includes('stock') || q.includes('inventory') || q.includes('low')) {
        const low = ctx.lowStockItems || [];
        if (low.length > 0) return `You have ${low.length} items running low on stock: ${low.slice(0, 3).map(i => i.name).join(', ')}. Reorder these now to avoid missed sales — low stock items account for a disproportionate share of lost revenue.`;
        return `All inventory levels look healthy right now. Keep an eye on fast-moving items and set reorder alerts at 20% stock level.`;
    }
    if (q.includes('recover') || q.includes('lost') || q.includes('churn')) {
        return `You have ₱${(ctx.recoveryAtRisk || 30000).toLocaleString()} at risk from dropped leads. Your current recovery rate is ${ctx.recoveryRate || 27}%. Sending a personalized discount to price-hesitant leads is your highest-ROI action right now.`;
    }
    if (q.includes('campaign') || q.includes('email') || q.includes('sms')) {
        return `Your best-performing campaigns target VIP leads with personalized subject lines. SMS campaigns see 3x higher open rates than email for follow-ups. I'd recommend sending a "slot-save" SMS to your hottest leads today.`;
    }
    if (q.includes('automat')) {
        return `Automation is your biggest time-saver. Your "New Lead Welcome" automation is active and running. Consider adding a 48-hour follow-up sequence for leads who open emails but don't respond — that's typically your highest conversion opportunity.`;
    }
    const greetings = ['hi', 'hello', 'hey', 'what can you do', 'help'];
    if (greetings.some(g => q.includes(g))) {
        return `Hi! I'm NaviAI. I can help you analyze your ${ctx.totalLeads} leads, track revenue trends, manage inventory, and recover lost opportunities. Try asking "How are my leads doing?" or "What should I focus on today?"`;
    }
    return `Based on your current data: ${ctx.totalLeads} leads, ₱${(ctx.weeklyRevenue || 24680).toLocaleString()} weekly revenue, and ${(ctx.lowStockItems || []).length} low-stock items. Your biggest opportunity right now is the ₱${(ctx.recoveryAtRisk || 30000).toLocaleString()} in recoverable revenue. Want me to break down any of these areas?`;
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
        panel.style.transform = '';
        overlay.classList.add('active');
        panel.classList.add('active');
    });

    const closeChat = () => {
        overlay.classList.remove('active');
        panel.classList.remove('active');
        input.blur();
        panel.style.transform = '';
    };

    // Lift panel above keyboard — correct formula using offsetTop
    const adjustForKeyboard = () => {
        if (!panel.classList.contains('active')) return;
        const vv = window.visualViewport;
        if (!vv) return;
        const offset = Math.max(0, window.innerHeight - vv.offsetTop - vv.height);
        panel.style.transform = `translateY(-${offset}px)`;
        panel.style.transition = offset > 0 ? 'transform 0.15s ease' : '';
        setTimeout(() => { messagesEl.scrollTop = messagesEl.scrollHeight; }, 50);
    };

    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', adjustForKeyboard);
        window.visualViewport.addEventListener('scroll', adjustForKeyboard);
    }

    // Scroll input into view on focus (iOS fallback)
    input.addEventListener('focus', () => {
        setTimeout(() => {
            adjustForKeyboard();
            input.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 300);
    });

    overlay.addEventListener('click', closeChat);
    closeBtn.addEventListener('click', closeChat);

    const buildContext = () => ({
        totalLeads: leadsData.length,
        vipLeads: leadsData.filter(l => l.tags?.some(t => t.toLowerCase() === 'vip')).length,
        hotLeads: leadsData.filter(l => l.status === 'hot').length,
        lowStockItems: inventoryData
            .filter(p => (p.stock / p.maxStock) <= 0.2)
            .map(p => ({ name: p.name, stock: p.stock, maxStock: p.maxStock })),
        totalInventoryItems: inventoryData.length,
        recoveryAtRisk: recoveryStats.atRisk,
        recoveryRate: recoveryStats.recoveryRate,
        weeklyRevenue: 24680,
        revenueGrowth: '12%',
    });

    const appendMessage = (text, sender) => {
        messagesEl.insertAdjacentHTML('beforeend', `
            <div class="ai-msg ai-msg-${sender}">
                <div class="ai-msg-bubble">${text}</div>
                <span class="ai-msg-time">Just now</span>
            </div>
        `);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    };

    const handleSend = async (text) => {
        if (!text) return;
        appendMessage(text, 'user');
        input.value = '';
        sendBtn.disabled = true;

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

        try {
            const res = await fetch(`${BASE_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, context: buildContext() }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const reply = data.response || smartFallback(text, buildContext());
            const ind = document.getElementById(typingId);
            if (ind) ind.remove();
            appendMessage(reply, 'bot');
        } catch {
            const ind = document.getElementById(typingId);
            if (ind) ind.remove();
            appendMessage(smartFallback(text, buildContext()), 'bot');
        } finally {
            sendBtn.disabled = false;
        }
    };

    sendBtn.addEventListener('click', () => handleSend(input.value.trim()));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend(input.value.trim());
    });

    document.querySelectorAll('.ai-prompt-chip').forEach(chip => {
        chip.addEventListener('click', () => handleSend(chip.dataset.prompt));
    });
}

// ==================== TOAST ====================
let _toastTimer = null;
function showToast(message, type = 'success') {
    const el = document.getElementById('app-toast');
    if (!el) return;
    if (_toastTimer) clearTimeout(_toastTimer);
    el.textContent = message;
    el.className = `app-toast toast-${type} visible`;
    _toastTimer = setTimeout(() => {
        el.classList.remove('visible');
    }, 3000);
}

// ==================== ACTION SHEET ====================
function showActionSheet(title, html) {
    const overlay = document.getElementById('action-sheet-overlay');
    document.getElementById('action-sheet-title').textContent = title;
    document.getElementById('action-sheet-body').innerHTML = html;
    overlay.classList.add('active');
}
function closeActionSheet() {
    document.getElementById('action-sheet-overlay').classList.remove('active');
}

// ==================== CURRENT LEAD TRACKING ====================
let currentLead = null;

// ==================== LEAD ACTIONS ====================
function initLeadActions() {
    document.querySelector('.ab-sms').addEventListener('click', () => {
        if (!currentLead) return;
        showActionSheet(`SMS to ${currentLead.name}`, `
            <label class="as-label">To</label>
            <input class="as-input" value="${currentLead.phone}" readonly />
            <label class="as-label">Message</label>
            <textarea class="as-textarea" id="as-sms-body" placeholder="Type your SMS message...">Hi ${currentLead.name.split(' ')[0]}, just following up on your inquiry. Let me know if you have any questions!</textarea>
            <button class="as-send-btn" id="as-sms-send">Send SMS</button>
        `);
        document.getElementById('as-sms-send').addEventListener('click', () => {
            const body = document.getElementById('as-sms-body').value.trim();
            if (!body) return;
            currentLead.conversation.push({ sender: 'user', text: body, time: 'Just now' });
            addTimelineEntry(currentLead, 'sms', 'SMS Sent', body.substring(0, 60) + (body.length > 60 ? '...' : ''));
            closeActionSheet();
            showToast(`SMS sent to ${currentLead.name}`);
        });
    });

    document.querySelector('.ab-email').addEventListener('click', () => {
        if (!currentLead) return;
        showActionSheet(`Email to ${currentLead.name}`, `
            <label class="as-label">To</label>
            <input class="as-input" value="${currentLead.email}" readonly />
            <label class="as-label">Subject</label>
            <input class="as-input" id="as-email-subject" value="Following up on your inquiry" />
            <label class="as-label">Message</label>
            <textarea class="as-textarea" id="as-email-body" placeholder="Write your email..." style="min-height:120px">Hi ${currentLead.name.split(' ')[0]},\n\nThank you for your interest. I wanted to follow up and see how we can help you move forward.\n\nLooking forward to hearing from you!</textarea>
            <button class="as-send-btn" id="as-email-send">Send Email</button>
        `);
        document.getElementById('as-email-send').addEventListener('click', () => {
            const subject = document.getElementById('as-email-subject').value.trim();
            const body = document.getElementById('as-email-body').value.trim();
            if (!body) return;
            addTimelineEntry(currentLead, 'email', 'Email Sent', subject || body.substring(0, 60));
            closeActionSheet();
            showToast(`Email sent to ${currentLead.name}`);
        });
    });

    document.querySelector('.ab-note').addEventListener('click', () => {
        if (!currentLead) return;
        showActionSheet(`Add Note for ${currentLead.name}`, `
            <label class="as-label">Note</label>
            <textarea class="as-textarea" id="as-note-body" placeholder="Add a note about this lead..." style="min-height:120px"></textarea>
            <button class="as-send-btn" id="as-note-save">Save Note</button>
        `);
        document.getElementById('as-note-save').addEventListener('click', () => {
            const body = document.getElementById('as-note-body').value.trim();
            if (!body) return;
            addTimelineEntry(currentLead, 'note', 'Note Added', body);
            closeActionSheet();
            showToast('Note saved');
        });
    });

    document.querySelector('.ab-tag').addEventListener('click', () => {
        if (!currentLead) return;
        const allTags = ['VIP', 'Enterprise', 'Hot Lead', 'SaaS', 'Agency', 'Referral', 'Priority', 'Tech', 'Inbound', 'E-commerce', 'Retail', 'Health', 'Q1 Campaign', 'Q2 Campaign', 'Follow-Up', 'Closed'];
        const chips = allTags.map(tag => {
            const sel = currentLead.tags.includes(tag) ? ' selected' : '';
            return `<button class="as-tag-chip${sel}" data-tag="${tag}">${tag}</button>`;
        }).join('');
        showActionSheet(`Tags for ${currentLead.name}`, `
            <label class="as-label">Select Tags</label>
            <div class="as-tag-grid">${chips}</div>
            <button class="as-send-btn" id="as-tag-save">Save Tags</button>
        `);
        document.querySelectorAll('.as-tag-chip').forEach(chip => {
            chip.addEventListener('click', () => chip.classList.toggle('selected'));
        });
        document.getElementById('as-tag-save').addEventListener('click', () => {
            const selected = [...document.querySelectorAll('.as-tag-chip.selected')].map(c => c.dataset.tag);
            currentLead.tags = selected;
            document.getElementById('lead-detail-tags').innerHTML = selected.map(t => `<span class="tag">${t}</span>`).join('');
            closeActionSheet();
            showToast('Tags updated');
        });
    });
}

function addTimelineEntry(lead, type, typeName, text) {
    const timeline = document.getElementById('lead-timeline');
    if (!timeline) return;
    const entry = document.createElement('div');
    entry.className = `timeline-item ti-${type}`;
    entry.style.animation = 'slideIn 0.3s ease-out both';
    entry.innerHTML = `
        <div class="tl-dot"></div>
        <div class="tl-content">
            <div class="tl-header"><span class="tl-type">${typeName}</span><span class="tl-time">Just now</span></div>
            <p>${text}</p>
        </div>
    `;
    timeline.insertBefore(entry, timeline.firstChild);

    // Switch to timeline tab
    document.querySelector('[data-ld-tab="timeline"]')?.click();
}

// ==================== CAMPAIGN + BUTTON ====================
function initCampaignAddButton() {
    const btn = document.querySelector('#screen-campaigns .icon-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        showActionSheet('New Campaign', `
            <div class="as-setting-form">
                <label class="as-label">Campaign Name</label>
                <input class="as-input" id="as-camp-name" placeholder="e.g. Summer Sale Blast" />
                <label class="as-label">Type</label>
                <div class="as-tag-grid">
                    <button class="as-tag-chip selected" data-type="email">Email</button>
                    <button class="as-tag-chip" data-type="sms">SMS</button>
                </div>
                <label class="as-label">Audience</label>
                <input class="as-input" id="as-camp-audience" placeholder="e.g. All Leads, VIP, Hot Leads" />
                <button class="as-send-btn" id="as-camp-create">Create Campaign</button>
            </div>
        `);
        document.querySelectorAll('.as-tag-chip[data-type]').forEach(c => {
            c.addEventListener('click', () => {
                document.querySelectorAll('.as-tag-chip[data-type]').forEach(x => x.classList.remove('selected'));
                c.classList.add('selected');
            });
        });
        document.getElementById('as-camp-create').addEventListener('click', () => {
            const name = document.getElementById('as-camp-name').value.trim();
            if (!name) { showToast('Please enter a campaign name', 'error'); return; }
            const type = document.querySelector('.as-tag-chip.selected[data-type]')?.dataset.type || 'email';
            closeActionSheet();
            showToast(`${type.toUpperCase()} campaign "${name}" created`);
            // Pre-fill the campaign creator form
            const nameInput = document.querySelector('.camp-input');
            if (nameInput) { nameInput.value = name; nameInput.focus(); }
        });
    });
}

// ==================== NODE EDITOR ====================
function openNodeEditor(node) {
    const nameEl = node.querySelector('.node-name');
    const typeEl = node.querySelector('.node-type');
    const currentName = nameEl?.textContent || '';
    const currentType = typeEl?.textContent || '';
    const isTrigger = node.classList.contains('node-trigger');

    const nodeTypeOptions = ['Send Email', 'Send SMS', 'Wait 1 Day', 'Wait 3 Days', 'Add Tag', 'Remove Tag', 'Check Condition', 'Notify Team'];
    const triggerOptions = ['New Lead Added', 'No Reply 24h', 'Tag Added', 'Purchase Made', 'Form Submitted', 'Link Clicked'];
    const options = isTrigger ? triggerOptions : nodeTypeOptions;

    showActionSheet(`Edit ${isTrigger ? 'Trigger' : 'Action'} Node`, `
        <div class="as-setting-form">
            ${!isTrigger ? `
            <label class="as-label">Node Type</label>
            <div class="as-tag-grid" id="as-node-type-chips">
                ${options.map(o => `<button class="as-tag-chip${o === currentName ? ' selected' : ''}" data-val="${o}">${o}</button>`).join('')}
            </div>` : `
            <label class="as-label">Trigger Event</label>
            <div class="as-tag-grid" id="as-node-type-chips">
                ${options.map(o => `<button class="as-tag-chip${o === currentName ? ' selected' : ''}" data-val="${o}">${o}</button>`).join('')}
            </div>`}
            ${!isTrigger ? `
            <label class="as-label" style="margin-top:12px">Custom Label (optional)</label>
            <input class="as-input" id="as-node-label" value="${currentName}" placeholder="e.g. Send Welcome Email" />` : ''}
            <div style="display:flex;gap:8px;margin-top:4px">
                <button class="as-send-btn" id="as-node-save" style="flex:1;margin-top:0">Save</button>
                ${!isTrigger ? `<button class="as-send-btn" id="as-node-delete" style="flex:0 0 auto;margin-top:0;background:linear-gradient(135deg,#ef4444,#b91c1c);padding:14px 18px">Delete</button>` : ''}
            </div>
        </div>
    `);

    document.querySelectorAll('#as-node-type-chips .as-tag-chip').forEach(c => {
        c.addEventListener('click', () => {
            document.querySelectorAll('#as-node-type-chips .as-tag-chip').forEach(x => x.classList.remove('selected'));
            c.classList.add('selected');
            const labelInput = document.getElementById('as-node-label');
            if (labelInput) labelInput.value = c.dataset.val;
        });
    });

    document.getElementById('as-node-save')?.addEventListener('click', () => {
        const selected = document.querySelector('#as-node-type-chips .as-tag-chip.selected')?.dataset.val || currentName;
        const labelVal = document.getElementById('as-node-label')?.value.trim() || selected;
        if (nameEl) nameEl.textContent = labelVal;
        // Update node color class based on type
        node.className = node.className.replace(/node-\w+/g, '').trim();
        if (selected.includes('Email')) node.classList.add('auto-node', 'node-action');
        else if (selected.includes('SMS')) node.classList.add('auto-node', 'node-action');
        else if (selected.includes('Wait')) node.classList.add('auto-node', 'node-wait');
        else if (selected.includes('Condition') || selected.includes('Check')) node.classList.add('auto-node', 'node-condition');
        else node.classList.add('auto-node', 'node-action');
        closeActionSheet();
        showToast('Node updated');
        node.style.animation = 'slideIn 0.3s ease-out both';
    });

    document.getElementById('as-node-delete')?.addEventListener('click', () => {
        // Remove this node and its preceding connector
        const prev = node.previousElementSibling;
        if (prev?.classList.contains('node-connector')) prev.remove();
        node.style.transition = 'all 0.3s ease';
        node.style.opacity = '0';
        node.style.transform = 'scale(0.8)';
        setTimeout(() => node.remove(), 300);
        closeActionSheet();
        showToast('Node deleted');
    });
}

// ==================== ADD NODE (AUTOMATIONS) ====================
function initAddNode() {
    const btn = document.getElementById('btn-add-node');
    if (!btn) return;
    btn.addEventListener('click', () => {
        showActionSheet('Add Automation Node', `
            <div class="as-node-list">
                <button class="as-node-opt" data-node-type="send-email">
                    <div class="as-node-icon" style="background: linear-gradient(135deg,#2F6FA3,#1E3A5F)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/></svg>
                    </div>
                    Send Email
                </button>
                <button class="as-node-opt" data-node-type="send-sms">
                    <div class="as-node-icon" style="background: linear-gradient(135deg,#45B29D,#2F6FA3)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                    </div>
                    Send SMS
                </button>
                <button class="as-node-opt" data-node-type="wait">
                    <div class="as-node-icon" style="background: linear-gradient(135deg,#f59e0b,#d97706)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    Wait / Delay
                </button>
                <button class="as-node-opt" data-node-type="condition">
                    <div class="as-node-icon" style="background: linear-gradient(135deg,#8b5cf6,#6d28d9)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    Condition / Branch
                </button>
                <button class="as-node-opt" data-node-type="tag">
                    <div class="as-node-icon" style="background: linear-gradient(135deg,#45B29D,#9ED8C3)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                    </div>
                    Add / Remove Tag
                </button>
            </div>
        `);
        document.querySelectorAll('.as-node-opt').forEach(opt => {
            opt.addEventListener('click', () => {
                const type = opt.dataset.nodeType;
                appendAutomationNode(type, opt.querySelector('div + *')?.textContent?.trim() || type);
                closeActionSheet();
            });
        });
    });
}

const nodeTypeLabels = {
    'send-email': 'Send Email',
    'send-sms': 'Send SMS',
    'wait': 'Wait 24 Hours',
    'condition': 'Check Condition',
    'tag': 'Add Tag'
};

function appendAutomationNode(type, label) {
    const builder = document.querySelector('.auto-builder');
    if (!builder) return;
    const addBtn = document.getElementById('btn-add-node');

    const connectorEl = document.createElement('div');
    connectorEl.className = 'node-connector';
    connectorEl.innerHTML = '<div class="connector-line"></div><div class="connector-dot"></div>';

    const nodeClassMap = { 'send-email': 'node-action', 'send-sms': 'node-action', 'wait': 'node-wait', 'condition': 'node-condition', 'tag': 'node-action' };
    const nodeEl = document.createElement('div');
    nodeEl.className = `auto-node ${nodeClassMap[type] || 'node-action'}`;
    nodeEl.style.animation = 'slideIn 0.4s ease-out both';
    nodeEl.innerHTML = `
        <div class="node-icon">${opt_icon_for(type)}</div>
        <div class="node-label">
            <span class="node-type">${type === 'wait' ? 'Wait' : type === 'condition' ? 'Condition' : 'Action'}</span>
            <span class="node-name">${nodeTypeLabels[type] || label}</span>
        </div>
    `;

    builder.insertBefore(connectorEl, addBtn);
    builder.insertBefore(nodeEl, addBtn);
    showToast(`"${nodeTypeLabels[type] || label}" node added`);
}

function opt_icon_for(type) {
    const icons = {
        'send-email': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/></svg>',
        'send-sms': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
        'wait': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        'condition': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        'tag': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    };
    return icons[type] || icons['send-email'];
}

// ==================== SETTINGS INTERACTIVE ROWS ====================
function initSettingsRows() {
    // Each setting-row that has a clickable value
    document.querySelectorAll('.setting-row').forEach(row => {
        const valEl = row.querySelector('.setting-val');
        if (!valEl) return;
        const label = row.querySelector('span:first-child')?.textContent?.trim();
        const val = valEl.textContent.trim();

        if (val === 'Change') {
            valEl.style.cursor = 'pointer';
            valEl.style.color = 'var(--ocean)';
            valEl.addEventListener('click', () => {
                showActionSheet('Change Password', `
                    <div class="as-setting-form">
                        <label class="as-label">Current Password</label>
                        <input class="as-input" type="password" placeholder="••••••••" />
                        <label class="as-label">New Password</label>
                        <input class="as-input" type="password" id="as-new-pw" placeholder="Min 8 characters" />
                        <label class="as-label">Confirm New Password</label>
                        <input class="as-input" type="password" id="as-confirm-pw" placeholder="Repeat new password" />
                        <button class="as-send-btn" id="as-pw-save">Update Password</button>
                    </div>
                `);
                document.getElementById('as-pw-save').addEventListener('click', () => {
                    const np = document.getElementById('as-new-pw').value;
                    const cp = document.getElementById('as-confirm-pw').value;
                    if (np.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
                    if (np !== cp) { showToast("Passwords don't match", 'error'); return; }
                    closeActionSheet();
                    showToast('Password updated successfully');
                });
            });
        }

        if (val === 'Connect' && label === 'Zapier') {
            valEl.style.cursor = 'pointer';
            valEl.style.color = 'var(--ocean)';
            valEl.addEventListener('click', () => {
                showActionSheet('Connect Zapier', `
                    <div class="as-setting-form">
                        <p style="font-size:0.82rem;color:var(--gray-500);margin-bottom:12px;line-height:1.5">Paste your Zapier webhook URL to connect NaviFlow to your Zaps. You can create one at zapier.com.</p>
                        <label class="as-label">Zapier Webhook URL</label>
                        <input class="as-input" id="as-zapier-url" placeholder="https://hooks.zapier.com/hooks/catch/..." />
                        <button class="as-send-btn" id="as-zapier-connect">Connect</button>
                    </div>
                `);
                document.getElementById('as-zapier-connect').addEventListener('click', () => {
                    const url = document.getElementById('as-zapier-url').value.trim();
                    if (!url) { showToast('Please enter a webhook URL', 'error'); return; }
                    valEl.textContent = 'Connected';
                    valEl.classList.add('connected');
                    valEl.style.cursor = 'default';
                    closeActionSheet();
                    showToast('Zapier connected successfully');
                });
            });
        }

        if (val === 'Configure' && label === 'Webhook') {
            valEl.style.cursor = 'pointer';
            valEl.style.color = 'var(--ocean)';
            valEl.addEventListener('click', () => {
                showActionSheet('Configure Webhook', `
                    <div class="as-setting-form">
                        <p style="font-size:0.82rem;color:var(--gray-500);margin-bottom:12px;line-height:1.5">NaviFlow will POST lead events to this URL in real-time.</p>
                        <label class="as-label">Endpoint URL</label>
                        <input class="as-input" id="as-webhook-url" placeholder="https://your-server.com/webhook" />
                        <label class="as-label">Secret Token (optional)</label>
                        <input class="as-input" id="as-webhook-secret" placeholder="Used to verify the payload signature" />
                        <button class="as-send-btn" id="as-webhook-save">Save Webhook</button>
                    </div>
                `);
                document.getElementById('as-webhook-save').addEventListener('click', () => {
                    const url = document.getElementById('as-webhook-url').value.trim();
                    if (!url) { showToast('Please enter an endpoint URL', 'error'); return; }
                    valEl.textContent = 'Configured';
                    valEl.style.color = '#10b981';
                    valEl.style.cursor = 'default';
                    closeActionSheet();
                    showToast('Webhook configured');
                });
            });
        }
    });

    // Upgrade Plan button
    document.querySelector('.settings-group-content[data-group="subscription"] .btn-primary')?.addEventListener('click', () => {
        showActionSheet('Upgrade Your Plan', `
            <div style="text-align:center;padding:8px 0 16px">
                <div style="font-size:1.6rem;font-weight:800;color:var(--dark);margin-bottom:4px">$99<span style="font-size:1rem;font-weight:500;color:var(--gray-500)">/month</span></div>
                <div style="font-size:0.75rem;color:var(--teal);font-weight:600;margin-bottom:20px">Business Plan</div>
                <ul style="text-align:left;list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
                    ${['Unlimited everything', '25,000 Emails/month', '5,000 SMS/month', 'Advanced AI Insights', 'Priority Support', 'Custom Integrations'].map(f =>
                        `<li style="font-size:0.82rem;color:var(--dark);display:flex;align-items:center;gap:8px"><svg viewBox="0 0 24 24" fill="none" stroke="#45B29D" stroke-width="2.5" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>${f}</li>`
                    ).join('')}
                </ul>
                <button class="as-send-btn" id="as-upgrade-btn" style="margin-top:0">Upgrade to Business</button>
            </div>
        `);
        document.getElementById('as-upgrade-btn').addEventListener('click', () => {
            closeActionSheet();
            showToast('Upgrade request sent — our team will contact you!', 'info');
        });
    });

    // Profile rows (name, email, phone)
    document.querySelectorAll('.settings-group-content[data-group="profile"] .setting-row').forEach(row => {
        const label = row.querySelector('span:first-child')?.textContent?.trim();
        const valEl = row.querySelector('.setting-val');
        if (!valEl || valEl.classList.contains('connected')) return;
        if (label === 'Password') return; // handled above
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
            showActionSheet(`Edit ${label}`, `
                <div class="as-setting-form">
                    <label class="as-label">${label}</label>
                    <input class="as-input" id="as-profile-val" value="${valEl.textContent}" />
                    <button class="as-send-btn" id="as-profile-save">Save</button>
                </div>
            `);
            document.getElementById('as-profile-save').addEventListener('click', () => {
                const v = document.getElementById('as-profile-val').value.trim();
                if (!v) return;
                valEl.textContent = v;
                closeActionSheet();
                showToast(`${label} updated`);
            });
        });
    });
}

// ==================== QUICK ACTIONS ====================
function initQuickActions() {
    const qaMap = {
        'New Automation': () => navigateTo('screen-automations'),
        'Broadcast': () => navigateTo('screen-campaigns'),
        'Add Contact': () => {
            showActionSheet('Add New Lead', `
                <div class="as-setting-form">
                    <label class="as-label">Full Name</label>
                    <input class="as-input" id="as-lead-name" placeholder="e.g. Jane Smith" />
                    <label class="as-label">Email</label>
                    <input class="as-input" id="as-lead-email" placeholder="jane@company.com" />
                    <label class="as-label">Phone</label>
                    <input class="as-input" id="as-lead-phone" placeholder="+1 (555) 000-0000" />
                    <button class="as-send-btn" id="as-lead-add">Add Lead</button>
                </div>
            `);
            document.getElementById('as-lead-add').addEventListener('click', () => {
                const name = document.getElementById('as-lead-name').value.trim();
                const email = document.getElementById('as-lead-email').value.trim();
                if (!name || !email) { showToast('Name and email are required', 'error'); return; }
                const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
                const colors = ['#2F6FA3', '#45B29D', '#1E3A5F', '#9ED8C3'];
                const newLead = {
                    id: leadsData.length + 1, name, initials, email,
                    phone: document.getElementById('as-lead-phone').value.trim() || 'N/A',
                    role: 'New Contact', status: 'new', tags: ['New'],
                    color: colors[leadsData.length % colors.length], conversation: []
                };
                leadsData.unshift(newLead);
                closeActionSheet();
                showToast(`${name} added to leads`);
                navigateTo('screen-leads');
            });
        }
    };

    document.querySelectorAll('.qa-btn').forEach(btn => {
        const label = btn.querySelector('span')?.textContent?.trim();
        if (qaMap[label]) {
            btn.addEventListener('click', qaMap[label]);
        }
    });
}

// ==================== WIRE ALL BUTTON FEATURES ====================
document.addEventListener('DOMContentLoaded', () => {
    // Action sheet dismiss
    document.getElementById('action-sheet-close').addEventListener('click', closeActionSheet);
    document.getElementById('action-sheet-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeActionSheet();
    });
    // Button features
    initLeadActions();
    initAddNode();
    initCampaignAddButton();
    initSettingsRows();
    initQuickActions();
});
