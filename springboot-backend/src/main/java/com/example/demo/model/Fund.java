package com.example.demo.model;

import java.util.List;

public class Fund {
    private String id;
    private String name;
    private String category;
    private String subcategory;
    private double nav;
    private double aum; // in crores
    private double expenseRatio;
    private String riskLevel;
    private int rating;
    private double returns1Y;
    private double returns3Y;
    private double returns5Y;
    private String fundManager;
    private String fundHouse;
    private int minInvestment;
    private int sipMin;
    private String launched;
    private String benchmark;
    private List<NavPoint> navHistory;

    public Fund() {}

    public Fund(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public Fund(String id, String name, String category, String subcategory, double nav, double aum, double expenseRatio,
                String riskLevel, int rating, double returns1Y, double returns3Y, double returns5Y,
                String fundManager, String fundHouse, int minInvestment, int sipMin, String launched,
                String benchmark, List<NavPoint> navHistory) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.subcategory = subcategory;
        this.nav = nav;
        this.aum = aum;
        this.expenseRatio = expenseRatio;
        this.riskLevel = riskLevel;
        this.rating = rating;
        this.returns1Y = returns1Y;
        this.returns3Y = returns3Y;
        this.returns5Y = returns5Y;
        this.fundManager = fundManager;
        this.fundHouse = fundHouse;
        this.minInvestment = minInvestment;
        this.sipMin = sipMin;
        this.launched = launched;
        this.benchmark = benchmark;
        this.navHistory = navHistory;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getSubcategory() { return subcategory; }
    public double getNav() { return nav; }
    public double getAum() { return aum; }
    public double getExpenseRatio() { return expenseRatio; }
    public String getRiskLevel() { return riskLevel; }
    public int getRating() { return rating; }
    public double getReturns1Y() { return returns1Y; }
    public double getReturns3Y() { return returns3Y; }
    public double getReturns5Y() { return returns5Y; }
    public String getFundManager() { return fundManager; }
    public String getFundHouse() { return fundHouse; }
    public int getMinInvestment() { return minInvestment; }
    public int getSipMin() { return sipMin; }
    public String getLaunched() { return launched; }
    public String getBenchmark() { return benchmark; }
    public List<NavPoint> getNavHistory() { return navHistory; }

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setCategory(String category) { this.category = category; }
    public void setSubcategory(String subcategory) { this.subcategory = subcategory; }
    public void setNav(double nav) { this.nav = nav; }
    public void setAum(double aum) { this.aum = aum; }
    public void setExpenseRatio(double expenseRatio) { this.expenseRatio = expenseRatio; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public void setRating(int rating) { this.rating = rating; }
    public void setReturns1Y(double returns1Y) { this.returns1Y = returns1Y; }
    public void setReturns3Y(double returns3Y) { this.returns3Y = returns3Y; }
    public void setReturns5Y(double returns5Y) { this.returns5Y = returns5Y; }
    public void setFundManager(String fundManager) { this.fundManager = fundManager; }
    public void setFundHouse(String fundHouse) { this.fundHouse = fundHouse; }
    public void setMinInvestment(int minInvestment) { this.minInvestment = minInvestment; }
    public void setSipMin(int sipMin) { this.sipMin = sipMin; }
    public void setLaunched(String launched) { this.launched = launched; }
    public void setBenchmark(String benchmark) { this.benchmark = benchmark; }
    public void setNavHistory(List<NavPoint> navHistory) { this.navHistory = navHistory; }

    public static class NavPoint {
        private String date;
        private double value;

        public NavPoint() {}

        public NavPoint(String date, double value) {
            this.date = date;
            this.value = value;
        }

        public String getDate() { return date; }
        public double getValue() { return value; }

        public void setDate(String date) { this.date = date; }
        public void setValue(double value) { this.value = value; }
    }
}
