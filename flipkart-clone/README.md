# Flipkart Clone (E-Commerce Platform)

A full-stack e-commerce web application inspired by Flipkart, built as an SDE Intern assignment.

## 🚀 Tech Stack

* Frontend: React.js
* Backend: Node.js + Express.js
* Database: PostgreSQL

## ✨ Features

### Core Features

* Product listing page (grid layout like Flipkart)
* Search functionality
* Category filtering
* Product detail page
* Add to Cart
* Buy Now flow
* Cart management (update/remove items)
* Order placement flow:

  * Cart → Order Summary → Payment → Success
* Order history page
* User Authentication(Login/Signup)
* Wishlist

### Bonus Features

* Wishlist functionality
* User authentication (Login/Signup)
* Flipkart-like UI and layout
* Email notification on order placement (configured)

---

## 🛠️ Setup Instructions

### 1. Clone repository

```bash
git clone <your-repo-link>
cd flipkart-clone
```

### 2. Backend Setup

```bash
cd backend
npm install
node index.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Create `.env` in backend:

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=flipkart_clone
DB_PASSWORD=your_db_password
DB_PORT=5432

EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```

---

## 🗄️ Database Tables

* users
* products
* categories
* cart_items
* orders
* order_items
* wishlist

---

## 📌 Notes

* Built as part of internship assignment
* Focused on core e-commerce flow and UI similarity to Flipkart
* Can be extended further with payments, reviews, etc.

---

## 📎 Submission

* GitHub Repo: (add your link)
* Deployment: (optional if you deploy)

---

## 👨‍💻 Author

Bipanjot
