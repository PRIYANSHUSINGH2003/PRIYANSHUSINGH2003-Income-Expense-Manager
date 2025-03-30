import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Select, MenuItem, Grid, Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

function App() {
    const [stock, setStock] = useState([]);
    const [incomeExpense, setIncomeExpense] = useState([]);
    const [netProfit, setNetProfit] = useState(0);

    const [stockForm, setStockForm] = useState({ type: '', vendor: '', amount: '' });
    const [entryForm, setEntryForm] = useState({ category: '', amount: '', type: '' });

    useEffect(() => {
        fetchStock();
        fetchIncomeExpense();
    }, []);

    const fetchStock = async () => {
        const response = await axios.get('http://localhost:5000/stock');
        setStock(response.data);
    };

    const fetchIncomeExpense = async () => {
        const response = await axios.get('http://localhost:5000/income-expense');
        setIncomeExpense(response.data.entries);
        setNetProfit(response.data.netProfit);
    };

    const addStock = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/stock', stockForm);
        setStockForm({ type: '', vendor: '', amount: '' });
        fetchStock();
    };

    const addEntry = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/income-expense', entryForm);
        setEntryForm({ category: '', amount: '', type: '' });
        fetchIncomeExpense();
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '40px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                💰 Income & Expense Manager
            </Typography>

            {/* Stock Management */}
            <Card variant="outlined" style={{ marginBottom: '20px' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>📦 Stock Management</Typography>
                    <form onSubmit={addStock}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Type (purchase/sale)" variant="outlined" value={stockForm.type} onChange={(e) => setStockForm({ ...stockForm, type: e.target.value })} required />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Vendor" variant="outlined" value={stockForm.vendor} onChange={(e) => setStockForm({ ...stockForm, vendor: e.target.value })} required />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Amount" type="number" variant="outlined" value={stockForm.amount} onChange={(e) => setStockForm({ ...stockForm, amount: e.target.value })} required />
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '15px' }}>
                            Add Stock
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Display Stock Data */}
            <Card variant="outlined" style={{ marginBottom: '20px' }}>
                <CardContent>
                    <Typography variant="h5">📋 Stock Records</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Vendor</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stock.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.vendor}</TableCell>
                                    <TableCell>₹{item.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Income & Expense */}
            <Card variant="outlined" style={{ marginBottom: '20px' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>💵 Income & Expense</Typography>
                    <form onSubmit={addEntry}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Category" variant="outlined" value={entryForm.category} onChange={(e) => setEntryForm({ ...entryForm, category: e.target.value })} required />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Amount" type="number" variant="outlined" value={entryForm.amount} onChange={(e) => setEntryForm({ ...entryForm, amount: e.target.value })} required />
                            </Grid>
                            <Grid item xs={4}>
                                <Select fullWidth value={entryForm.type} onChange={(e) => setEntryForm({ ...entryForm, type: e.target.value })} required>
                                    <MenuItem value="">Select Type</MenuItem>
                                    <MenuItem value="income">Income</MenuItem>
                                    <MenuItem value="expense">Expense</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" color="secondary" fullWidth style={{ marginTop: '15px' }}>
                            Add Entry
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Display Income & Expense Data */}
            <Card variant="outlined" style={{ marginBottom: '20px' }}>
                <CardContent>
                    <Typography variant="h5">📋 Income & Expense Records</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {incomeExpense.map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell>{entry.category}</TableCell>
                                    <TableCell>{entry.type === 'income' ? 'Income' : 'Expense'}</TableCell>
                                    <TableCell>₹{entry.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Net Profit/Loss */}
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5">📊 Net Profit/Loss</Typography>
                    <Typography variant="h6" style={{ color: netProfit >= 0 ? 'green' : 'red' }}>
                        {netProfit >= 0 ? `+ ₹${netProfit}` : `- ₹${Math.abs(netProfit)}`}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default App;
