import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('[Supabase] URL set:', !!SUPABASE_URL, '| KEY set:', !!SUPABASE_ANON_KEY);

export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

export const db = {
    // ── Leads ──────────────────────────────────────────────────
    async getLeads() {
        if (!supabase) return null;
        const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (error) { console.error('getLeads:', error.message); return null; }
        return data;
    },
    async upsertLead(lead) {
        if (!supabase) return null;
        const row = {
            id: lead.id,
            name: lead.name,
            initials: lead.initials,
            email: lead.email,
            phone: lead.phone || '',
            role: lead.role || '',
            status: lead.status,
            tags: lead.tags || [],
            color: lead.color,
            conversation: lead.conversation || [],
        };
        const { data, error } = await supabase.from('leads').upsert(row, { onConflict: 'id' }).select().single();
        if (error) { console.error('upsertLead:', error.message); return null; }
        return data;
    },
    async deleteLead(id) {
        if (!supabase) return;
        await supabase.from('leads').delete().eq('id', id);
    },

    // ── Inventory ──────────────────────────────────────────────
    async getInventory() {
        if (!supabase) return null;
        const { data, error } = await supabase.from('inventory').select('*').order('id');
        if (error) { console.error('getInventory:', error.message); return null; }
        return data;
    },
    async upsertProduct(product) {
        if (!supabase) return null;
        const row = {
            id: product.id,
            name: product.name,
            sku: product.sku,
            price: product.price,
            stock: product.stock,
            max_stock: product.maxStock,
            category: product.category,
            gradient: product.gradient,
            icon: product.icon,
        };
        const { data, error } = await supabase.from('inventory').upsert(row, { onConflict: 'id' }).select().single();
        if (error) { console.error('upsertProduct:', error.message); return null; }
        return data;
    },
    async deleteProduct(id) {
        if (!supabase) return;
        await supabase.from('inventory').delete().eq('id', id);
    },

    // ── Recovery ───────────────────────────────────────────────
    async getRecovery() {
        if (!supabase) return null;
        const { data, error } = await supabase.from('recovery').select('*').order('id');
        if (error) { console.error('getRecovery:', error.message); return null; }
        return data;
    },
    async upsertRecovery(item) {
        if (!supabase) return null;
        const row = {
            id: item.id,
            name: item.name,
            initials: item.initials,
            value: item.value,
            days_since: item.daysSince,
            drop_reason: item.dropReason,
            reason_label: item.reasonLabel,
            status: item.status,
            campaign_type: item.campaignType,
            color: item.color,
            ai_message: item.aiMessage,
            ai_analysis: item.aiAnalysis,
        };
        const { data, error } = await supabase.from('recovery').upsert(row, { onConflict: 'id' }).select().single();
        if (error) { console.error('upsertRecovery:', error.message); return null; }
        return data;
    },

    // ── Transactions ───────────────────────────────────────────
    async getTransactions() {
        if (!supabase) return null;
        const { data, error } = await supabase.from('transactions').select('*').order('created_at', { ascending: false }).limit(50);
        if (error) { console.error('getTransactions:', error.message); return null; }
        return data;
    },
    async addTransaction(tx) {
        if (!supabase) return null;
        const { data, error } = await supabase.from('transactions').insert({
            product_name: tx.productName,
            quantity: tx.quantity,
            total: tx.total,
            payment_method: tx.paymentMethod,
        }).select().single();
        if (error) { console.error('addTransaction:', error.message); return null; }
        return data;
    },

    // ── Recovery Stats ─────────────────────────────────────────
    async getRecoveryStats() {
        if (!supabase) return null;
        const { data, error } = await supabase.from('recovery_stats').select('*').eq('id', 1).single();
        if (error) return null;
        return data;
    },
    async saveRecoveryStats(stats) {
        if (!supabase) return;
        await supabase.from('recovery_stats').upsert({
            id: 1,
            at_risk: stats.atRisk,
            recovered_this_week: stats.recoveredThisWeek,
            recovery_rate: stats.recoveryRate,
            pending_count: stats.pendingCount,
            total_recovered: stats.totalRecovered,
        }, { onConflict: 'id' });
    },

    // ── Auth helpers ───────────────────────────────────────────
    async signIn(email, password) {
        if (!supabase) return { error: { message: 'Supabase not configured' } };
        return await supabase.auth.signInWithPassword({ email, password });
    },
    async signUp(email, password) {
        if (!supabase) return { error: { message: 'Supabase not configured' } };
        return await supabase.auth.signUp({ email, password });
    },
    async getGoogleOAuthUrl() {
        if (!supabase) return { error: { message: 'Supabase not configured' } };
        return await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin,
                skipBrowserRedirect: true,
            },
        });
    },
    async signOut() {
        if (!supabase) return;
        await supabase.auth.signOut();
    },
    async getSession() {
        if (!supabase) return null;
        const { data } = await supabase.auth.getSession();
        return data.session;
    },
    async onAuthStateChange(callback) {
        if (!supabase) return;
        supabase.auth.onAuthStateChange((_event, session) => callback(session));
    },
};
