# 🗄️ Supabase Database Setup Instructions

## Your Supabase Credentials:
- **Email**: intern.pratikshya@gmail.com
- **Password**: hVryQ6bfg@DWJ4G

## Step 1: Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Click "Sign In"
3. Enter your email: `intern.pratikshya@gmail.com`
4. Enter your password: `hVryQ6bfg@DWJ4G`

## Step 2: Create New Project
1. Click "New Project"
2. **Organization**: Use existing or create new
3. **Project Name**: `nepse-market-data`
4. **Database Password**: Generate a strong password (save this!)
5. **Region**: Choose closest to Nepal (Asia Pacific)
6. Click "Create new project"
7. Wait 2-3 minutes for project creation

## Step 3: Get Database Connection Details
1. Go to **Settings** → **Database** in your project dashboard
2. Copy these details:
   - **Host**: `db.xxxxx.supabase.co`
   - **Database**: `postgres`
   - **Username**: `postgres`
   - **Password**: (the one you set during project creation)
   - **Port**: `5432`

## Step 4: Set Up Database Schema
1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New query"
3. Copy and paste the entire SQL script from `SUPABASE_DATABASE_SCHEMA.sql`
4. Click "Run" to execute the script

## Step 5: Verify Tables Created
1. Go to **Table Editor** in your Supabase dashboard
2. You should see these tables:
   - `nepse_index`
   - `nepse_stocks`
   - `nepse_indices`
   - `data_update_logs`

## Step 6: Get API Keys
1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJ...`
   - **service_role key**: `eyJ...` (keep this secret!)

## Step 7: Update Environment Variables
Update your Django backend `.env` file with the Supabase credentials:

```env
SECRET_KEY=your-very-secure-secret-key-here
DEBUG=False
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-supabase-database-password
SUPABASE_DB_HOST=db.your-project-ref.supabase.co
SUPABASE_DB_PORT=5432
```

Update your Next.js frontend `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Step 8: Test Connection
1. Start your Django backend
2. Run migrations: `python manage.py migrate`
3. Generate sample data: `python manage.py generate_sample_data --days 30`
4. Test API endpoints
5. Start your Next.js frontend
6. Verify data loads correctly

## 🎉 Success!
Your Supabase database is now configured and ready to store NEPSE data!
