-- ============================================================
-- NaviFlow Supabase Schema
-- Run this in Supabase → SQL Editor → New Query → Run
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Leads ─────────────────────────────────────────────────────
create table if not exists leads (
  id          bigint primary key,
  name        text not null,
  initials    text,
  email       text,
  phone       text,
  role        text,
  status      text default 'new',
  tags        text[] default '{}',
  color       text,
  conversation jsonb default '[]',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
alter table leads enable row level security;
create policy "Allow all for authenticated" on leads for all using (auth.role() = 'authenticated');
-- Allow anon for prototype (remove in production)
create policy "Allow anon read" on leads for select using (true);
create policy "Allow anon write" on leads for insert with check (true);
create policy "Allow anon update" on leads for update using (true);
create policy "Allow anon delete" on leads for delete using (true);

-- ── Inventory ─────────────────────────────────────────────────
create table if not exists inventory (
  id          bigint primary key,
  name        text not null,
  sku         text,
  price       numeric(10,2),
  stock       integer default 0,
  max_stock   integer default 100,
  category    text,
  gradient    text,
  icon        text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
alter table inventory enable row level security;
create policy "Allow anon all on inventory" on inventory for all using (true) with check (true);

-- ── Recovery ──────────────────────────────────────────────────
create table if not exists recovery (
  id            bigint primary key,
  name          text,
  initials      text,
  value         numeric(10,2),
  days_since    integer default 0,
  drop_reason   text,
  reason_label  text,
  status        text default 'pending',
  campaign_type text,
  color         text,
  ai_message    text,
  ai_analysis   text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
alter table recovery enable row level security;
create policy "Allow anon all on recovery" on recovery for all using (true) with check (true);

-- ── Transactions ──────────────────────────────────────────────
create table if not exists transactions (
  id             bigserial primary key,
  product_name   text,
  quantity       integer,
  total          numeric(10,2),
  payment_method text,
  created_at     timestamptz default now()
);
alter table transactions enable row level security;
create policy "Allow anon all on transactions" on transactions for all using (true) with check (true);

-- ── Recovery Stats ────────────────────────────────────────────
create table if not exists recovery_stats (
  id                   integer primary key default 1,
  at_risk              numeric(12,2) default 30000,
  recovered_this_week  numeric(12,2) default 12450,
  recovery_rate        integer default 27,
  pending_count        integer default 8,
  total_recovered      numeric(12,2) default 48200,
  updated_at           timestamptz default now()
);
alter table recovery_stats enable row level security;
create policy "Allow anon all on recovery_stats" on recovery_stats for all using (true) with check (true);

-- Insert default recovery stats row
insert into recovery_stats (id) values (1) on conflict (id) do nothing;

-- ── Auto-update timestamps ────────────────────────────────────
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger leads_updated_at before update on leads for each row execute function update_updated_at();
create trigger inventory_updated_at before update on inventory for each row execute function update_updated_at();
create trigger recovery_updated_at before update on recovery for each row execute function update_updated_at();
