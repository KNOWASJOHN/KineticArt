# Supabase Setup Guide

Follow these steps to connect your Kinetic Art Registration website to a Supabase backend.

## 1. Create a Supabase Project

1.  Go to [database.new](https://database.new) and create a new project.
2.  Save your database password securely.
3.  Once the project is created, go to **Project Settings > API**.
4.  Copy the `Project URL` and `anon public` key.

## 2. Environment Variables

Create a `.env.local` file in the root of your project and add the following keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
```

## 3. Database Schema

Go to the **SQL Editor** in your Supabase dashboard and run the following SQL query to create the table:

```sql
create table participants (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  college text not null,
  phone text not null
);

-- Enable Row Level Security (RLS)
alter table participants enable row level security;

-- Create Policy: Allow anyone to insert (register)
create policy "Enable insert for everyone"
on participants for insert
with check (true);

-- Create Policy: Allow anyone to read (view participants)
create policy "Enable read access for everyone"
on participants for select
using (true);
```

## 4. Next Steps for Developer

I will now perform the following actions automatically to connect your code:

1.  Install `@supabase/ssr` and `@supabase/supabase-js`.
2.  Create helper files in `utils/supabase/` to manage the connection.
3.  Update the **Registration Form** to save data to this table.
4.  Update the **Participants Page** to read data from this table instead of using mock data.
