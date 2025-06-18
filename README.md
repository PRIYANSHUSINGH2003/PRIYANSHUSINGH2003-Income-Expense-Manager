# Income & Expense Manager

This is a simple web application for managing stock, income, and expenses. It allows users to add stock entries, track income and expenses, and calculate net profit.

## Features
- 📦 **Stock Management**: Add and view stock purchases and sales.
- 💵 **Income & Expense Tracking**: Add income and expense entries.
- 📊 **Net Profit Calculation**: Automatically calculates net profit based on income and expenses.
- 🖥 **Responsive UI**: Built with React and Material-UI for a clean and user-friendly interface.

## Technologies Used
- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (or any backend API that provides stock and income/expense data)
- **HTTP Client**: Axios

## Installation
### Prerequisites
Ensure you have **Node.js** and **npm** installed on your system.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/income-expense-manager.git
   cd income-expense-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## Backend Setup
Make sure you have a backend running at `http://localhost:5000` with the following routes:
- `GET /stock` - Fetch stock entries
- `POST /stock` - Add a new stock entry
- `GET /income-expense` - Fetch income and expense entries
- `POST /income-expense` - Add a new income or expense entry

## Running the Application
1. Start your backend server.
2. Run the frontend with `npm start`.
3. Open `http://localhost:3000` in your browser.

## Screenshots
![image](https://github.com/user-attachments/assets/9efbfd63-1cab-406a-97a0-3c62ab76f690)
![image](https://github.com/user-attachments/assets/46ff3c84-2722-45f2-a5b2-4c7840184d13)

## License
This project is licensed under the MIT License.
