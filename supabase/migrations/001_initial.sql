-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────
-- PROFILES (extends auth.users)
-- ─────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text not null default '',
  email       text,
  phone       text,
  country     text default 'India',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    new.email
  )
  on conflict (id) do nothing;

  insert into public.credits (parent_id, balance)
  values (new.id, 0)
  on conflict (parent_id) do nothing;

  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────
-- CHILDREN
-- ─────────────────────────────────────────
create table if not exists public.children (
  id              uuid primary key default gen_random_uuid(),
  parent_id       uuid not null references auth.users(id) on delete cascade,
  name            text not null,
  date_of_birth   date not null,
  age             integer not null check (age between 4 and 18),
  relationship    text default 'parent',
  photo_url       text,
  created_at      timestamptz default now()
);

alter table public.children enable row level security;

create policy "Parents can manage their children"
  on public.children for all using (auth.uid() = parent_id);

-- ─────────────────────────────────────────
-- CREDITS
-- ─────────────────────────────────────────
create table if not exists public.credits (
  id          uuid primary key default gen_random_uuid(),
  parent_id   uuid not null unique references auth.users(id) on delete cascade,
  balance     integer not null default 0 check (balance >= 0),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table public.credits enable row level security;

create policy "Users can view own credits"
  on public.credits for select using (auth.uid() = parent_id);

create policy "Users can update own credits"
  on public.credits for update using (auth.uid() = parent_id);

create policy "Users can insert own credits"
  on public.credits for insert with check (auth.uid() = parent_id);

-- Function to safely deduct a credit
create or replace function public.deduct_credit(p_parent_id uuid)
returns void language plpgsql security definer as $$
begin
  update public.credits
  set balance = balance - 1, updated_at = now()
  where parent_id = p_parent_id and balance > 0;
  if not found then
    raise exception 'Insufficient credits';
  end if;
end;
$$;

-- Function to add credits after payment confirmation
create or replace function public.add_credits(p_parent_id uuid, p_amount integer)
returns void language plpgsql security definer as $$
begin
  update public.credits
  set balance = balance + p_amount, updated_at = now()
  where parent_id = p_parent_id;
  if not found then
    insert into public.credits (parent_id, balance) values (p_parent_id, p_amount);
  end if;
end;
$$;

-- ─────────────────────────────────────────
-- TEST SESSIONS
-- ─────────────────────────────────────────
create table if not exists public.test_sessions (
  id            uuid primary key default gen_random_uuid(),
  child_id      uuid not null references public.children(id) on delete cascade,
  parent_id     uuid not null references auth.users(id) on delete cascade,
  topic         text not null,
  is_free       boolean default false,
  status        text not null default 'in_progress'
                check (status in ('in_progress', 'completed', 'abandoned')),
  answers       jsonb default '{}',
  started_at    timestamptz default now(),
  completed_at  timestamptz
);

alter table public.test_sessions enable row level security;

create policy "Parents can manage their test sessions"
  on public.test_sessions for all using (auth.uid() = parent_id);

-- ─────────────────────────────────────────
-- REPORTS
-- ─────────────────────────────────────────
create table if not exists public.reports (
  id              uuid primary key default gen_random_uuid(),
  session_id      uuid not null references public.test_sessions(id) on delete cascade,
  child_id        uuid not null references public.children(id) on delete cascade,
  parent_id       uuid not null references auth.users(id) on delete cascade,
  topic           text not null,
  overall_score   integer check (overall_score between 1 and 5),
  overall_label   text,
  domain_scores   jsonb default '[]',
  insights        jsonb default '{}',
  parent_notes    text default '',
  generated_at    timestamptz default now()
);

alter table public.reports enable row level security;

create policy "Parents can manage their reports"
  on public.reports for all using (auth.uid() = parent_id);

-- ─────────────────────────────────────────
-- TRANSACTIONS
-- ─────────────────────────────────────────
create table if not exists public.transactions (
  id              uuid primary key default gen_random_uuid(),
  parent_id       uuid not null references auth.users(id) on delete cascade,
  plan            text not null check (plan in ('single', 'four_pack')),
  amount          integer not null,
  credits_added   integer not null,
  upi_ref         text,
  status          text not null default 'pending'
                  check (status in ('pending', 'confirmed', 'rejected')),
  created_at      timestamptz default now()
);

alter table public.transactions enable row level security;

create policy "Users can view own transactions"
  on public.transactions for select using (auth.uid() = parent_id);

create policy "Users can insert own transactions"
  on public.transactions for insert with check (auth.uid() = parent_id);

-- ─────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────
create index if not exists idx_children_parent on public.children(parent_id);
create index if not exists idx_sessions_child on public.test_sessions(child_id);
create index if not exists idx_sessions_parent on public.test_sessions(parent_id);
create index if not exists idx_reports_parent on public.reports(parent_id);
create index if not exists idx_reports_child on public.reports(child_id);
create index if not exists idx_transactions_parent on public.transactions(parent_id);
