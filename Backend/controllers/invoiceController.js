const PDFDocument = require('pdfkit');
const fs = require('fs');

// Generate invoice
function generateInvoice(req, res) {
    const { customerName, items, total } = req.body;
    const doc = new PDFDocument();
    const filePath = `invoices/invoice_${Date.now()}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text('Invoice', 50, 50);
    doc.fontSize(14).text(`Customer: ${customerName}`, 50, 80);

    doc.moveDown();
    items.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.name} - $${item.price}`, 50, doc.y + 20);
    });

    doc.moveDown();
    doc.fontSize(16).text(`Total: $${total}`, 50, doc.y + 30);

    doc.end();
    res.json({ message: 'Invoice generated', path: filePath });
}

// List invoices
function listInvoices(req, res) {
    fs.readdir('invoices', (err, files) => {
        if (err) return res.status(500).json({ message: 'Error reading invoices' });
        res.json({ invoices: files });
    });
}

module.exports = {
    generateInvoice,
    listInvoices
};
