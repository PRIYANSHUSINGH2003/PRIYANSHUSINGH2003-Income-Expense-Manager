# Income & Expense Manager Backend

This is the backend for the **Income & Expense Manager** application, built using **Node.js, Express, MongoDB, and PDFKit** for invoice generation.

## Features
- Stock Management (Purchase/Sale by Vendor Name)
- Income & Expense Management
- Invoice Generation with Custom Layout (including logo)

## Prerequisites
Ensure you have the following installed before proceeding:
- **Node.js** (v14 or later)
- **MongoDB** (local or Atlas)

## Installation & Setup

1. **Clone the repository**
```sh
git clone https://github.com/your-repo/income-expense-manager.git
cd income-expense-manager/backend
```

2. **Install dependencies**
```sh
npm install
```

3. **Set up MongoDB connection**
   - Update the MongoDB connection string in `server.js`
   - Replace `<your_mongodb_connection_string>` with your actual **MongoDB URI**

4. **Run the server**
```sh
npm start
```
   - Server will run at `http://localhost:5000`

## API Endpoints

### **Stock Management**
- **Add Stock Entry** (Purchase/Sale)
  ```http
  POST /stock
  ```
  **Body:**
  ```json
  {
    "type": "purchase",
    "vendor": "ABC Suppliers",
    "amount": 5000
  }
  ```
  **Response:**
  ```json
  {
    "_id": "xyz123",
    "type": "purchase",
    "vendor": "ABC Suppliers",
    "amount": 5000,
    "date": "2025-03-30T12:00:00Z"
  }
  ```

- **Get All Stock Entries**
  ```http
  GET /stock
  ```

### **Income & Expense Management**
- **Add Income/Expense Entry**
  ```http
  POST /income-expense
  ```
  **Body:**
  ```json
  {
    "category": "Office Rent",
    "amount": 2000,
    "type": "expense"
  }
  ```

- **Get All Income & Expense Entries**
  ```http
  GET /income-expense
  ```
  **Response:**
  ```json
  {
    "entries": [
      { "category": "Office Rent", "type": "expense", "amount": 2000 },
      { "category": "Product Sale", "type": "income", "amount": 5000 }
    ],
    "netProfit": 3000
  }
  ```

### **Invoice Generation**
- **Generate Invoice (PDF)**
  ```http
  POST /generate-invoice
  ```
  **Body:**
  ```json
  {
    "customerName": "John Doe",
    "items": [
      { "name": "Laptop", "price": 1200 },
      { "name": "Mouse", "price": 50 }
    ],
    "total": 1250
  }
  ```
  **Response:**
  ```json
  {
    "message": "Invoice generated",
    "path": "invoices/invoice_12345.pdf"
  }
  ```

## Running in Production
- Use **PM2** for process management:
  ```sh
  npm install -g pm2
  pm2 start server.js --name income-expense-manager
  ```
- Set up **CORS** if deploying on a different domain.

## License
This project is licensed under the MIT License.

## Contact
For queries, reach out at **andisoftwaresolutions@gmail.com**.

