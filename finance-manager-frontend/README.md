# Finance Manager Frontend

A web-based Income & Expense Manager application built with React and Material-UI to track stock, income, and expenses efficiently.

## 🚀 Features
- 📦 **Stock Management**: Add and track stock purchases and sales.
- 💰 **Income & Expense Tracking**: Record income and expenses with category selection.
- 📊 **Net Profit Calculation**: Automatically calculates and displays the net profit/loss.
- 🛠 **Material-UI for UI Components**: Modern and responsive UI.

## 📂 Project Structure
```
finance-manager-frontend/
│── src/
│   ├── App.js             # Main React component
│   ├── index.js           # Application entry point
│   ├── styles/            # Custom stylesheets
│── public/                # Static assets
│── package.json           # Project dependencies
│── README.md              # Project documentation
```

## 🛠 Installation & Setup
### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Run
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/yourusername/finance-manager-frontend.git
   cd finance-manager-frontend
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Run the Application:**
   ```sh
   npm start
   ```
4. Open your browser and visit `http://localhost:3000`.

## ⚙️ Backend Setup
This frontend requires a backend API. Make sure the backend is running at `http://localhost:5000`.
- [Backend Repository](https://github.com/yourusername/finance-manager-backend)

## 🎨 Tech Stack
- **Frontend**: React.js, Material-UI
- **State Management**: React Hooks
- **API Calls**: Axios
- **Styling**: Material-UI, CSS

## 📌 API Endpoints Used
- `GET /stock` - Fetch all stock entries
- `POST /stock` - Add a new stock entry
- `GET /income-expense` - Fetch income and expense data
- `POST /income-expense` - Add an income or expense entry

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
🚀 **Contributions & Feedback Welcome!** If you have any suggestions or find issues, feel free to open an issue or a pull request. Happy coding! 🎉

