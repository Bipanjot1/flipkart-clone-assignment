
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const JWT_SECRET = "mysecretkey123";




/* ---------------- AUTH MIDDLEWARE ---------------- */

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

/* ---------------- TEST ---------------- */

app.get("/", (req, res) => {
  res.send("Server running");
});

/* ---------------- AUTH ROUTES ---------------- */

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING id,name,email",
      [name, email, hashed]
    );

    const user = result.rows[0];

    const token = jwt.sign(user, JWT_SECRET);

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

/* ---------------- CATEGORIES ---------------- */

app.get("/api/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, slug FROM categories ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ---------------- PRODUCTS ---------------- */

app.get("/api/products", async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;

    let query = `
      SELECT p.*
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    let values = [];

    if (search) {
      values.push(`%${search}%`);
      query += ` AND p.name ILIKE $${values.length}`;
    }

    if (category) {
      values.push(category);
      query += ` AND c.slug = $${values.length}`;
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM products WHERE id=$1",
    [req.params.id]
  );
  res.json(result.rows[0]);
});

/* ---------------- CART ---------------- */

app.get("/api/cart", authMiddleware, async (req, res) => {
  const result = await pool.query(
    `SELECT ci.*, p.name, p.price, p.images 
     FROM cart_items ci 
     JOIN products p ON ci.product_id=p.id 
     WHERE ci.user_id=$1`,
    [req.user.id]
  );

  res.json(result.rows);
});

app.post("/api/cart", authMiddleware, async (req, res) => {
  const { product_id } = req.body;

  const existing = await pool.query(
    "SELECT * FROM cart_items WHERE product_id=$1 AND user_id=$2",
    [product_id, req.user.id]
  );

  if (existing.rows.length > 0) {
    await pool.query(
      "UPDATE cart_items SET quantity=quantity+1 WHERE product_id=$1 AND user_id=$2",
      [product_id, req.user.id]
    );
  } else {
    await pool.query(
      "INSERT INTO cart_items (product_id,quantity,user_id) VALUES ($1,1,$2)",
      [product_id, req.user.id]
    );
  }

  res.json({ success: true });
});
app.put("/api/cart/:id", authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;

    await pool.query(
      "UPDATE cart_items SET quantity = $1 WHERE id = $2 AND user_id = $3",
      [quantity, req.params.id, req.user.id]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/cart/:id", authMiddleware, async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM cart_items WHERE id = $1 AND user_id = $2",
      [req.params.id, req.user.id]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- SERVER ---------------- */

/* ---------------- ORDERS ---------------- */

app.get("/api/orders", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/* ---------------- SERVER ---------------- */
app.post("/api/orders", authMiddleware, async (req, res) => {
  try {
    const {
      full_name,
      phone,
      address,
      city,
      state,
      pincode,
      items,
      total_amount,
    } = req.body;

    const order_number = "FK" + Date.now();

    const order = await pool.query(
      `INSERT INTO orders
      (order_number, full_name, phone, address, city, state, pincode, total_amount, user_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        order_number,
        full_name,
        phone,
        address,
        city,
        state,
        pincode,
        total_amount,
        req.user.id,
      ]
    );

    const orderId = order.rows[0].id;

    for (const item of items) {
      await pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1,$2,$3,$4)",
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    await pool.query(
      "DELETE FROM cart_items WHERE user_id = $1",
      [req.user.id]
    );

        res.json(order.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- WISHLIST ---------------- */

app.get("/api/wishlist", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT w.*, p.name, p.price, p.images
       FROM wishlist w
       JOIN products p ON w.product_id = p.id
       WHERE w.user_id = $1`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/wishlist", authMiddleware, async (req, res) => {
  try {
    const { product_id } = req.body;

    const exists = await pool.query(
      "SELECT * FROM wishlist WHERE product_id=$1 AND user_id=$2",
      [product_id, req.user.id]
    );

    if (exists.rows.length > 0) {
      return res.json({ message: "Already in wishlist" });
    }

    await pool.query(
      "INSERT INTO wishlist (product_id, user_id) VALUES ($1,$2)",
      [product_id, req.user.id]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/wishlist/:id", authMiddleware, async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM wishlist WHERE id=$1 AND user_id=$2",
      [req.params.id, req.user.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});