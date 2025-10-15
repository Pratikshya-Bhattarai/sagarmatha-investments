-- Supabase Database Schema for NEPSE Application
-- Run this SQL in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- NEPSE Index table
CREATE TABLE nepse_index (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    open_price DECIMAL(10,2) NOT NULL,
    high_price DECIMAL(10,2) NOT NULL,
    low_price DECIMAL(10,2) NOT NULL,
    close_price DECIMAL(10,2) NOT NULL,
    volume BIGINT NOT NULL,
    turnover BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date)
);

-- NEPSE Stocks table
CREATE TABLE nepse_stocks (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL UNIQUE,
    company_name VARCHAR(255) NOT NULL,
    sector VARCHAR(100),
    current_price DECIMAL(10,2),
    change_amount DECIMAL(10,2),
    change_percent DECIMAL(5,2),
    volume BIGINT,
    turnover BIGINT,
    high_52w DECIMAL(10,2),
    low_52w DECIMAL(10,2),
    market_cap VARCHAR(50),
    pe_ratio DECIMAL(5,2),
    last_trade_time TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NEPSE Indices table
CREATE TABLE nepse_indices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    current_value DECIMAL(10,2),
    change_amount DECIMAL(10,2),
    change_percent DECIMAL(5,2),
    high_52w DECIMAL(10,2),
    low_52w DECIMAL(10,2),
    date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(name, date)
);

-- Data update logs
CREATE TABLE data_update_logs (
    id SERIAL PRIMARY KEY,
    update_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    message TEXT,
    records_updated INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE nepse_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE nepse_stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE nepse_indices ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_update_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON nepse_index FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON nepse_stocks FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON nepse_indices FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON data_update_logs FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_nepse_index_date ON nepse_index(date);
CREATE INDEX idx_nepse_stocks_symbol ON nepse_stocks(symbol);
CREATE INDEX idx_nepse_stocks_sector ON nepse_stocks(sector);
CREATE INDEX idx_nepse_indices_name ON nepse_indices(name);
CREATE INDEX idx_nepse_indices_date ON nepse_indices(date);

-- Insert sample data
INSERT INTO nepse_index (date, open_price, high_price, low_price, close_price, volume, turnover) VALUES
('2024-10-01', 2800.50, 2850.75, 2795.25, 2845.30, 1500000, 8500000000),
('2024-10-02', 2845.30, 2875.60, 2830.15, 2865.45, 1650000, 9200000000),
('2024-10-03', 2865.45, 2890.20, 2850.80, 2880.90, 1400000, 8800000000);

INSERT INTO nepse_stocks (symbol, company_name, sector, current_price, change_amount, change_percent, volume, turnover, high_52w, low_52w, market_cap, pe_ratio, last_trade_time) VALUES
('NICL', 'Nepal Investment Bank Limited', 'Banking', 450.50, 5.25, 1.18, 15000, 6750000, 500.00, 400.00, '45B', 12.5, NOW()),
('NABIL', 'Nabil Bank Limited', 'Banking', 520.75, -8.25, -1.56, 12000, 6250000, 550.00, 480.00, '52B', 15.2, NOW()),
('SCB', 'Standard Chartered Bank Nepal Limited', 'Banking', 480.25, 12.50, 2.67, 18000, 8640000, 500.00, 450.00, '48B', 13.8, NOW());

INSERT INTO nepse_indices (name, symbol, current_value, change_amount, change_percent, high_52w, low_52w, date) VALUES
('NEPSE Index', 'NEPSE', 2880.90, 15.45, 0.54, 3000.00, 2500.00, CURRENT_DATE),
('Banking Index', 'BANKING', 1250.75, 8.25, 0.66, 1300.00, 1100.00, CURRENT_DATE),
('Hydropower Index', 'HYDRO', 850.30, -5.20, -0.61, 900.00, 750.00, CURRENT_DATE);
