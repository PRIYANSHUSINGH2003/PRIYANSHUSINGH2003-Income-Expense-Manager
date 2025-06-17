const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    type: String, // purchase or sale
    vendor: String,
    amount: Number,
    date: { type: Date, default: Date.now }
});
const Stock = mongoose.models.Stock || mongoose.model('Stock', StockSchema);

const IncomeExpenseSchema = new mongoose.Schema({
    category: String,
    amount: Number,
    type: String, // income or expense
    date: { type: Date, default: Date.now }
});
const IncomeExpense = mongoose.models.IncomeExpense || mongoose.model('IncomeExpense', IncomeExpenseSchema);

// Add stock
async function addStock(req, res) {
    const stock = new Stock(req.body);
    await stock.save();
    res.json(stock);
}

// Get stock
async function getStock(req, res) {
    const stocks = await Stock.find();
    const totalSales = stocks.filter(stock => stock.type === 'sale').reduce((sum, stock) => sum + stock.amount, 0);
    const totalCosts = stocks.filter(stock => stock.type === 'purchase').reduce((sum, stock) => sum + stock.amount, 0);
    const netProfitStock = totalSales - totalCosts;
    res.json({ stocks, netProfitStock });
}

// Add income/expense
async function addIncomeExpense(req, res) {
    const entry = new IncomeExpense(req.body);
    await entry.save();
    res.json(entry);
}

// Get income/expense
async function getIncomeExpense(req, res) {
    const entries = await IncomeExpense.find();
    const totalIncome = entries.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
    const totalExpense = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
    res.json({ entries, netProfit: totalIncome - totalExpense });
}

module.exports = {
    addStock,
    getStock,
    addIncomeExpense,
    getIncomeExpense
};
