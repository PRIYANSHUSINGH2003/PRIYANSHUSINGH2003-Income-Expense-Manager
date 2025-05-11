// Backend: Node.js with Express (server.js)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect('mongodb+srv://priyanshusingh00004:110044@cluster0.zy000zt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    serverSelectionTimeoutMS: 5000, // Adjusted timeout for server selection
    socketTimeoutMS: 45000, // Consider increasing socket timeout
    connectTimeoutMS: 30000,
});
 
const StockSchema = new mongoose.Schema({
    type: String, // purchase or sale
    vendor: String,
    amount: Number,
    date: { type: Date, default: Date.now }
});
const Stock = mongoose.model('Stock', StockSchema);

const IncomeExpenseSchema = new mongoose.Schema({
    category: String,
    amount: Number,
    type: String, // income or expense
    date: { type: Date, default: Date.now }
});
const IncomeExpense = mongoose.model('IncomeExpense', IncomeExpenseSchema);

// Routes
app.post('/stock', async (req, res) => {
    const stock = new Stock(req.body);
    await stock.save();
    res.json(stock);
});

app.get('/stock', async (req, res) => {
    const stocks = await Stock.find();
    const totalSales = stocks
            .filter(stock => stock.type === 'sale')
            .reduce((sum, stock) => sum + stock.amount, 0);
    const totalCosts = stocks
            .filter(stock => stock.type === 'purchase')
            .reduce((sum, stock) => sum + stock.amount, 0);
    const netProfitStock = totalSales - totalCosts;
    res.json({ stocks, netProfitStock });
});

app.post('/income-expense', async (req, res) => {
    const entry = new IncomeExpense(req.body);
    await entry.save();
    res.json(entry);
});

app.get('/income-expense', async (req, res) => {
    const entries = await IncomeExpense.find();
    const totalIncome = entries.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
    const totalExpense = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
    res.json({ entries, netProfit: totalIncome - totalExpense });
});

// Invoice Generation
app.post('/generate-invoice', (req, res) => {
    const { customerName, items, total } = req.body;
    const doc = new PDFDocument();
    const filePath = `invoices/invoice_${Date.now()}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));

    doc.image('logo.png', 50, 50, { width: 100 });
    doc.fontSize(20).text('Invoice', 50, 150);
    doc.fontSize(14).text(`Customer: ${customerName}`, 50, 180);

    doc.moveDown();
    items.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.name} - $${item.price}`, 50, doc.y + 20);
    });

    doc.moveDown();
    doc.fontSize(16).text(`Total: $${total}`, 50, doc.y + 30);

    doc.end();
    res.json({ message: 'Invoice generated', path: filePath });
});

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
