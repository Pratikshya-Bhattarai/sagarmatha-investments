#!/usr/bin/env python3
"""
Supabase Database Setup Script
This script helps set up the Supabase database for the NEPSE application.
"""

import os
import sys
import requests
import json

def setup_supabase():
    print("🏔️ Setting up Supabase Database for Sagarmatha Investments")
    print("=" * 60)
    
    # Supabase credentials
    SUPABASE_EMAIL = "intern.pratikshya@gmail.com"
    SUPABASE_PASSWORD = "hVryQ6bfg@DWJ4G"
    
    print(f"📧 Email: {SUPABASE_EMAIL}")
    print(f"🔑 Password: {'*' * len(SUPABASE_PASSWORD)}")
    
    print("\n📋 Next Steps:")
    print("1. Go to https://supabase.com")
    print("2. Login with your credentials")
    print("3. Create a new project called 'nepse-market-data'")
    print("4. Go to SQL Editor")
    print("5. Copy and run the SQL from SUPABASE_DATABASE_SCHEMA.sql")
    print("6. Note down your database credentials")
    
    print("\n🔧 Database Configuration:")
    print("Project Name: nepse-market-data")
    print("Database: postgres")
    print("User: postgres")
    print("Password: [Your Supabase password]")
    print("Host: db.[your-project-ref].supabase.co")
    print("Port: 5432")
    
    print("\n📊 Tables to be created:")
    print("- nepse_index (daily index data)")
    print("- nepse_stocks (stock information)")
    print("- nepse_indices (market indices)")
    print("- data_update_logs (update tracking)")
    
    print("\n✅ After setup, update your .env file with:")
    print("SUPABASE_DB_NAME=postgres")
    print("SUPABASE_DB_USER=postgres")
    print("SUPABASE_DB_PASSWORD=[your-supabase-password]")
    print("SUPABASE_DB_HOST=db.[your-project-ref].supabase.co")
    print("SUPABASE_DB_PORT=5432")
    
    print("\n🚀 Ready for deployment!")
    return True

if __name__ == "__main__":
    setup_supabase()
