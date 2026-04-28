-- Create database
CREATE DATABASE IF NOT EXISTS mutualfunddb;
USE mutualfunddb;

-- Funds table
CREATE TABLE IF NOT EXISTS funds (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  subcategory VARCHAR(100),
  nav DECIMAL(15,2),
  aum DECIMAL(15,2),
  expense_ratio DECIMAL(6,2),
  risk_level VARCHAR(50),
  rating INT,
  returns_1y DECIMAL(6,2),
  returns_3y DECIMAL(6,2),
  returns_5y DECIMAL(6,2),
  fund_manager VARCHAR(255),
  fund_house VARCHAR(255),
  min_investment INT,
  sip_min INT,
  launched DATE,
  benchmark VARCHAR(255),
  nav_history JSON
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('investor','advisor','analyst','admin') DEFAULT 'investor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample fund
INSERT INTO funds (id, name, category, subcategory, nav, aum, expense_ratio, risk_level, rating, returns_1y, returns_3y, returns_5y, fund_manager, fund_house, min_investment, sip_min, launched, benchmark, nav_history)
VALUES
('1','BlueChip Growth Fund','Equity','Large Cap',58.34,32500,0.89,'High',5,18.5,15.2,14.8,'Rajesh Kumar','Axis Mutual Fund',5000,500,'2013-01-15','Nifty 50', JSON_ARRAY(JSON_OBJECT('date','2021-01-01','value',40), JSON_OBJECT('date','2026-01-01','value',58.34)))
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Sample user
INSERT INTO users (id, full_name, email, password, role)
VALUES ('1','Demo User','demo@example.com','password','investor')
ON DUPLICATE KEY UPDATE full_name=VALUES(full_name);
