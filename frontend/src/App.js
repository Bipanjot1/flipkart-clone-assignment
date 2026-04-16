import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

const API = "http://localhost:5000";

const getToken = () => localStorage.getItem("token");
const setToken = (token) => localStorage.setItem("token", token);
const removeToken = () => localStorage.removeItem("token");

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
const containerStyle = {
  maxWidth: "1800px",
  margin: "0 auto",
  padding: "0 20px",
};

function FlipkartHeader({ user }) {
  return (
    <div>
      {/* TOP BLUE BAR */}
      <div
        style={{
          backgroundColor: "#2874f0",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          color: "white",
        }}
      >
        {/* LOGO */}
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "22px",
            fontWeight: "800",
          }}
        >
          Flipkart
        </Link>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search for products, brands and more"
          style={{
            flex: 1,
            padding: "10px",
            border: "none",
            borderRadius: "2px",
            outline: "none",
          }}
        />

        {/* RIGHT SIDE */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {!user ? (
            <Link
              to="/login"
              style={{
                backgroundColor: "white",
                color: "#2874f0",
                padding: "6px 18px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          ) : (
            <span style={{ fontWeight: "600" }}>{user.name}</span>
          )}

          <span>Become a Seller</span>
          <span>More</span>

          <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
            🛒 Cart
          </Link>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div
        style={{
          backgroundColor: "white",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "500",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {[
          "Electronics",
          "TVs & Appliances",
          "Men",
          "Women",
          "Baby & Kids",
          "Home & Furniture",
          "Sports, Books & More",
          "Flights",
          "Offer Zone",
        ].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
} 

function TopHeader({ search = "", setSearch = null, user, setUser, cartCount = 0, setCartCount }) {
    const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
  removeToken();
  setUser(null);
  if (setCartCount) setCartCount(0);
  setShowMenu(false);
  navigate("/login");
};

  const dropdownItemStyle = {
    width: "100%",
    textAlign: "left",
    padding: "14px 18px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#333",
    fontSize: "15px",
  };

  const dropdownLinkStyle = {
    display: "block",
    padding: "14px 18px",
    textDecoration: "none",
    color: "#333",
    fontSize: "15px",
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "16px 24px 12px",
        borderBottom: "1px solid #e5e7eb",
        marginBottom: "18px",
      }}
    >
      {/* top row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <Link
            to="/"
            style={{
              backgroundColor: "#ffe500",
              color: "#1f3fbf",
              textDecoration: "none",
              fontWeight: "800",
              padding: "14px 26px",
              borderRadius: "16px",
              fontSize: "22px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              minWidth: "130px",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "28px" }}>f</span>
            <span>Flipkart</span>
          </Link>

          <div
            style={{
              backgroundColor: "#f3f4f6",
              borderRadius: "16px",
              padding: "14px 22px",
              fontWeight: "700",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            ✈️ Travel
          </div>

          <div
            style={{
              backgroundColor: "#f3f4f6",
              borderRadius: "16px",
              padding: "14px 22px",
              fontWeight: "700",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            🛍️ Grocery
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#222",
            fontSize: "15px",
            fontWeight: "600",
            maxWidth: "420px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user?.savedAddress ? (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "#222",
      fontSize: "15px",
      fontWeight: "600",
      maxWidth: "420px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
  >
    <span>🏢 {user.savedAddress.label || "HOME"}</span>
    <span>{user.savedAddress.address}</span>
    <span>›</span>
    <div
      style={{
        backgroundColor: "#fef3c7",
        borderRadius: "14px",
        padding: "6px 10px",
        fontWeight: "700",
      }}
    >
      ⚡ 0
    </div>
  </div>
) : (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "#666",
      fontSize: "15px",
      fontWeight: "600",
    }}
  >
    <span>Add delivery address</span>
  </div>
)}
        </div>
      </div>

      {/* second row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "22px",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "18px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "22px",
              color: "#666",
            }}
          >
            🔍
          </span>

          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            value={search}
            onChange={(e) => setSearch && setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "16px 18px 16px 56px",
              border: "3px solid #3b82f6",
              borderRadius: "20px",
              fontSize: "18px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "26px" }}>
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "#222",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "22px" }}>👤</span>
                <span>Account</span>
                <span>⌄</span>
              </button>

              {showMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "42px",
                    right: 0,
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.14)",
                    minWidth: "320px",
                    zIndex: 100,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "14px 18px",
                      borderBottom: "1px solid #eee",
                      fontWeight: "700",
                      color: "#222",
                      fontSize: "15px",
                    }}
                  >
                    Your Account
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <button
                      style={dropdownItemStyle}
                      onClick={() => setShowMenu(false)}
                    >
                      👤 My Profile
                    </button>

                    <Link
                      to="/orders"
                      onClick={() => setShowMenu(false)}
                      style={dropdownLinkStyle}
                    >
                      📦 Orders
                    </Link>

                    <button
                      style={dropdownItemStyle}
                      onClick={() => setShowMenu(false)}
                    >
                      🎟️ Coupons
                    </button>

                    <button
                      style={dropdownItemStyle}
                      onClick={() => setShowMenu(false)}
                    >
                      🪙 Supercoin
                    </button>

                    <button
                      style={dropdownItemStyle}
                      onClick={() => setShowMenu(false)}
                    >
                      💳 Saved Cards & Wallet
                    </button>

                    <button
                      style={dropdownItemStyle}
                      onClick={() => setShowMenu(false)}
                    >
                      📍 Saved Addresses
                    </button>

                    <button
                      style={dropdownItemStyle}
                      onClick={() => {
                        setShowMenu(false);
                        navigate("/wishlist");
                      }}
                    >
                      ❤️ Wishlist
                    </button>

                    <button
                      style={dropdownItemStyle}
                      onClick={() => setShowMenu(false)}
                    >
                      🎁 Gift Cards
                    </button>

                    <button
                      style={dropdownItemStyle}
                      onClick={() => setShowMenu(false)}
                    >
                      🔔 Notifications
                    </button>

                    <button
                      onClick={logout}
                      style={{
                        ...dropdownItemStyle,
                        color: "#d32f2f",
                        fontWeight: "700",
                        borderTop: "1px solid #eee",
                      }}
                    >
                      ↪ Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              style={{
                color: "#222",
                textDecoration: "none",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "22px" }}>👤</span>
              <span>Account</span>
              <span>⌄</span>
            </Link>
          )}

          <div
            style={{
              fontSize: "18px",
              color: "#222",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>More</span>
            <span>⌄</span>
          </div>

          <Link
            to="/cart"
            style={{
              color: "#222",
              textDecoration: "none",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ position: "relative", fontSize: "24px" }}>
              🛒
              {cartCount > 0 && (
  <span
    style={{
      position: "absolute",
      top: "-8px",
      right: "-10px",
      backgroundColor: "red",
      color: "white",
      borderRadius: "50%",
      minWidth: "18px",
      height: "18px",
      fontSize: "11px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "700",
      padding: "0 4px",
    }}
  >
    {cartCount}
  </span>
)}
            </span>
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function SectionRow({ title, products, bgColor = "#ffffff" }) {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        margin: "16px 20px",
        borderRadius: "16px",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "20px" }}>{title}</h2>
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            width: "36px",
            height: "36px",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          →
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "14px",
        }}
      >
        {products.map((p) => (
          <Link
            key={`${title}-${p.id}`}
            to={`/product/${p.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "14px",
                padding: "12px",
                minHeight: "250px",
              }}
            >
              <div
                style={{
                  height: "170px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  borderRadius: "10px",
                  backgroundColor: "#f7f7f7",
                }}
              >
                <img
                  src={p.images[0]}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              <p style={{ margin: "12px 0 4px", fontSize: "14px" }}>{p.name}</p>
              <p style={{ margin: 0, fontWeight: "700" }}>Min. 50% Off</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function HomePage({ user, setUser, cartCount, setCartCount }) {
    const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const topCategories = [
    { name: "For You", icon: "👜" },
    { name: "Fashion", icon: "👕" },
    { name: "Mobiles", icon: "📱" },
    { name: "Beauty", icon: "💄" },
    { name: "Electronics", icon: "💻" },
    { name: "Home", icon: "💡" },
    { name: "Appliances", icon: "🖥️" },
    { name: "Toys", icon: "🧸" },
    { name: "Food & H.", icon: "🥫" },
    { name: "Auto", icon: "🛵" },
    { name: "Sports", icon: "🏏" },
    { name: "Books", icon: "📘" },
    { name: "Furniture", icon: "🪑" },
  ];

  const banners = [
  {
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&auto=format&fit=crop&q=60",
    title: "Summer Self Care",
    subtitle: "Min 30% Off",
    color: "white",
    query: "care",
  },
  {
    image:
      "https://images.unsplash.com/photo-1628054663938-841feacf0126?w=900&auto=format&fit=crop&q=60",
    title: "Breezy Clothes",
    subtitle: "Flat 10% Off",
    color: "white",
    query: "shirt",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1664373621827-c84fecefaff9?q=80&w=988&auto=format&fit=crop",
    title: "Daily Essentials",
    subtitle: "Best Deals",
    color: "white",
    query: "kitchen",
  },
];

  useEffect(() => {
  fetchProducts();
}, [search, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
  try {
    let url = `${API}/api/products?`;

    if (search) {
      url += `search=${search}&`;
    }

    if (selectedCategory) {
      url += `category=${selectedCategory}`;
    }

    const res = await axios.get(url);
    setProducts(res.data);
  } catch (err) {
    console.error(err);
  }
};

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const gadgets = products.slice(0, 4);
  const decor = products.slice(4, 8);
  const widest = [...products].slice(0, 4);
  const gifting = [...products].slice(2, 6);

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
<TopHeader search={search} setSearch={setSearch} user={user} setUser={setUser} cartCount={cartCount} setCartCount={setCartCount} />
    <div style={containerStyle}></div>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "0 20px 10px",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            overflowX: "auto",
            paddingTop: "6px",
          }}
        >
          {topCategories.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "72px",
                fontWeight: index === 0 ? "700" : "500",
                color: "#111827",
                paddingTop: "10px",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "4px" }}>{item.icon}</div>
              <div style={{ fontSize: "14px", whiteSpace: "nowrap" }}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "2fr 2fr 1fr",
    gap: "16px",
    padding: "20px",
  }}
>
  {banners.map((banner, index) => (
    <Link
      key={index}
      to={`/collection/${banner.query}`}
      style={{ textDecoration: "none" }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "18px",
          overflow: "hidden",
          height: "230px",
          cursor: "pointer",
        }}
      >
        <img
          src={banner.image}
          alt={banner.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "white",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          <h2 style={{ margin: 0 }}>{banner.title}</h2>
          <p style={{ margin: "6px 0 0" }}>{banner.subtitle}</p>
        </div>
      </div>
    </Link>
  ))}
</div>

      <SectionRow title="Best Gadgets & Appliances" products={gadgets} bgColor="#ddd6fe" />
      <SectionRow title="Widest collection" products={widest} bgColor="#d1fae5" />
      <SectionRow title="Home Decor & Furnishing" products={decor} bgColor="#e9d5ff" />
      <SectionRow title="Gift Ideas" products={gifting} bgColor="#fee2e2" />

      <div
        style={{
          backgroundColor: "#fff",
          margin: "20px",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>All Products</h2>

        <div style={{ marginBottom: "14px" }}>
          <select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="">All</option>
  {categories.map((c) => (
    <option key={c.id} value={c.slug}>
      {c.name}
    </option>
  ))}
</select>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
        >
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                  borderRadius: "12px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    height: "180px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8f8f8",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <h4 style={{ marginBottom: "6px" }}>{p.name}</h4>
                <p style={{ margin: "0 0 6px", fontWeight: "700" }}>₹{p.price}</p>
                <p style={{ margin: 0, color: "green" }}>
                  {p.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FlipkartFooter />
    </div>
    
  );
}

function CollectionPage({ user, setUser, cartCount, setCartCount }) {
  const { query } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCollectionProducts();
  }, [query]);

  const fetchCollectionProducts = async () => {
    try {
      const res = await axios.get(`${API}/api/products`, {
        params: { search: query },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
      <TopHeader
        user={user}
        setUser={setUser}
        cartCount={cartCount}
        setCartCount={setCartCount}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px" }}>
        <h1 style={{ marginBottom: "20px", textTransform: "capitalize" }}>
          {query} Collection
        </h1>

        {products.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
            }}
          >
            No products found in this collection.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "14px",
                    border: "1px solid #eee",
                  }}
                >
                  <div
                    style={{
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f8f8f8",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={p.images?.[0]}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <h3 style={{ fontSize: "16px", margin: "12px 0 8px" }}>
                    {p.name}
                  </h3>
                  <p style={{ margin: 0, fontWeight: "700" }}>₹{p.price}</p>
                  <p style={{ marginTop: "6px", color: "green" }}>
                    {p.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <FlipkartFooter />
    </div>
  );
}

function ProductPage({ user, setUser, cartCount, setCartCount }) {
    const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [showCartToast, setShowCartToast] = useState(false);
const [showWishlistToast, setShowWishlistToast] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(console.error);
  }, [id]);

  const addToWishlist = async () => {
  if (!getToken()) {
    navigate("/login");
    return;
  }

  try {
    await axios.post(
      `${API}/api/wishlist`,
      { product_id: product.id },
      authHeaders()
    );

    setShowWishlistToast(true);
    setTimeout(() => setShowWishlistToast(false), 2000);
  } catch (err) {
    console.error(err);
  }
};

  const addToCart = async () => {
    if (!getToken()) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${API}/api/cart`,
        { product_id: product.id },
        authHeaders()
      );
setCartCount((prev) => prev + 1);
setShowCartToast(true);
setTimeout(() => setShowCartToast(false), 2000);    } catch (err) {
      console.error(err);
      alert("Please login first");
    }
  };

  const buyNow = async () => {
    if (!getToken()) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `${API}/api/cart`,
        { product_id: product.id },
        authHeaders()
      );
      setCartCount((prev) => prev + 1);
      navigate("/checkout");
    } catch (err) {
      console.error(err);
      alert("Please login first");
    }
  };

  if (!product) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
<TopHeader user={user} setUser={setUser} cartCount={cartCount} setCartCount={setCartCount} />      <div style={{ padding: "20px" }}>
        <div style={{ marginBottom: "16px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            ← Back
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "24px",
            display: "flex",
            gap: "24px",
          }}
        >
          <div style={{ flex: 1, display: "flex", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={product.name}
                  onClick={() => setSelectedImage(i)}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    border: selectedImage === i ? "2px solid #2874f0" : "1px solid #ddd",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  height: "420px",
                  border: "1px solid #eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

<div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
  <button
    onClick={addToWishlist}
    style={{
      padding: "12px",
      backgroundColor: "white",
      border: "1px solid #ddd",
      fontWeight: "700",
      cursor: "pointer",
      borderRadius: "6px",
    }}
  >
    ❤️ ADD TO WISHLIST
  </button>

  <div style={{ display: "flex", gap: "12px" }}>                <button
                  onClick={addToCart}
                  style={{
                    flex: 1,
                    padding: "14px",
                    backgroundColor: "#ff9f00",
                    color: "white",
                    border: "none",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  ADD TO CART
                </button>
                <button
                  onClick={buyNow}
                  style={{
                    flex: 1,
                    padding: "14px",
                    backgroundColor: "#fb641b",
                    color: "white",
                    border: "none",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
          </div>

          <div style={{ flex: 1.2 }}>
            <h1 style={{ marginTop: 0 }}>{product.name}</h1>
            <h2>₹{product.price}</h2>
            <p style={{ color: "green", fontWeight: "700" }}>
              {product.stock > 0 ? "Available in stock" : "Out of stock"}
            </p>

            <div
              style={{
                marginTop: "20px",
                padding: "16px",
                backgroundColor: "#f5faff",
                border: "1px solid #dbe8ff",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Delivery Details</h3>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  style={{ flex: 1, padding: "10px" }}
                />
                <button
                  style={{
                    backgroundColor: "#2874f0",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                  }}
                >
                  Check
                </button>
              </div>
              <p>Delivery by tomorrow or within 2-4 business days</p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h3>Specifications</h3>
              {product.specifications &&
                Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      padding: "10px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div style={{ width: "180px", color: "#777" }}>{key}</div>
                    <div>{value}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {showCartToast && (
  <div
    style={{
      position: "fixed",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#212121",
      color: "white",
      padding: "14px 22px",
      borderRadius: "8px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
      zIndex: 9999,
      fontWeight: "600",
    }}
  >
    Added to cart
  </div>
)}

{showWishlistToast && (
  <div
    style={{
      position: "fixed",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#212121",
      color: "white",
      padding: "14px 22px",
      borderRadius: "8px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
      zIndex: 9999,
      fontWeight: "600",
    }}
  >
    Added to wishlist
  </div>
)}
      <FlipkartFooter />
    </div>
  );
}

function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/auth/login`, form);
      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
      <FlipkartHeader />
      

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          backgroundColor: "white",
          display: "flex",
          minHeight: "520px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "35%",
            backgroundColor: "#2874f0",
            color: "white",
            padding: "40px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1 style={{ marginTop: 0, fontSize: "32px" }}>Login</h1>
            <p style={{ fontSize: "24px", lineHeight: "1.5", color: "#dbedff" }}>
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>

          <div style={{ textAlign: "center", fontSize: "90px" }}>🛍️</div>
        </div>

        <div
          style={{
            width: "65%",
            padding: "40px 35px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "28px" }}>
              <input
                type="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  border: "none",
                  borderBottom: "2px solid #2874f0",
                  outline: "none",
                  fontSize: "16px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <input
                type="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  outline: "none",
                  fontSize: "16px",
                }}
              />
            </div>

            <p style={{ fontSize: "13px", color: "#878787", lineHeight: "1.5" }}>
              By continuing, you agree to Flipkart's{" "}
              <span style={{ color: "#2874f0" }}>Terms of Use</span> and{" "}
              <span style={{ color: "#2874f0" }}>Privacy Policy</span>.
            </p>

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "20px",
                backgroundColor: "#fb641b",
                color: "white",
                border: "none",
                padding: "14px",
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              Login
            </button>

            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                color: "#2874f0",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </div>
          </form>

          <div style={{ textAlign: "center" }}>
            <Link
              to="/signup"
              style={{
                color: "#2874f0",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              New to Flipkart? Create an account
            </Link>
          </div>
        </div>
      </div>
      <FlipkartFooter />
    </div>
  );
}

function SignupPage({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/auth/signup`, form);
      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
console.log(err);
alert(err.response?.data?.error || err.message || "Signup failed");    }
  };

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
      <FlipkartHeader />
      

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          backgroundColor: "white",
          display: "flex",
          minHeight: "520px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "35%",
            backgroundColor: "#2874f0",
            color: "white",
            padding: "40px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1 style={{ marginTop: 0, fontSize: "32px" }}>
              Looks like you're new here!
            </h1>
            <p
              style={{
                fontSize: "22px",
                lineHeight: "1.5",
                color: "#dbedff",
              }}
            >
              Sign up with your email to get started and enjoy shopping.
            </p>
          </div>

          <div style={{ textAlign: "center", fontSize: "90px" }}>✨</div>
        </div>

        <div
          style={{
            width: "65%",
            padding: "40px 35px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <form onSubmit={handleSignup}>
            <div style={{ marginBottom: "24px" }}>
              <input
                type="text"
                placeholder="Enter Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  outline: "none",
                  fontSize: "16px",
                }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <input
                type="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  outline: "none",
                  fontSize: "16px",
                }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <input
                type="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={{
                  width: "100%",
                  padding: "12px 0",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  outline: "none",
                  fontSize: "16px",
                }}
              />
            </div>

            <p style={{ fontSize: "13px", color: "#878787", lineHeight: "1.5" }}>
              By continuing, you agree to Flipkart's{" "}
              <span style={{ color: "#2874f0" }}>Terms of Use</span> and{" "}
              <span style={{ color: "#2874f0" }}>Privacy Policy</span>.
            </p>

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "20px",
                backgroundColor: "#fb641b",
                color: "white",
                border: "none",
                padding: "14px",
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              Continue
            </button>
          </form>

          <div style={{ textAlign: "center" }}>
            <Link
              to="/login"
              style={{
                color: "#2874f0",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Existing User? Log in
            </Link>
          </div>
        </div>
      </div>
      <FlipkartFooter />
    </div>
  );
}

function CartPage({ user, setUser, cartCount, setCartCount }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [savedAddress, setSavedAddress] = useState(null);


  useEffect(() => {
  if (!getToken()) {
    navigate("/login");
    return;
  }

  const address = localStorage.getItem("checkout_address");
  if (address) {
    setSavedAddress(JSON.parse(address));
  }

  fetchCart();
}, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/api/cart`, authHeaders());
      setCart(res.data);

      const total = res.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);

      fetchRecommendedProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRecommendedProducts = async (cartItems = []) => {
    try {
      const res = await axios.get(`${API}/api/products`);
      const allProducts = res.data;

      if (cartItems.length === 0) {
        setRecommendedProducts(allProducts.slice(0, 4));
        return;
      }

      const cartProductIds = cartItems.map((item) => item.product_id);
      const filtered = allProducts.filter((p) => !cartProductIds.includes(p.id));
      setRecommendedProducts(filtered.slice(0, 4));
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      await axios.put(`${API}/api/cart/${id}`, { quantity }, authHeaders());
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`${API}/api/cart/${id}`, authHeaders());
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const discount = Math.round(subtotal * 0.18);
  const deliveryFee = subtotal > 999 ? 0 : 40;
  const totalAmount = subtotal - discount + deliveryFee;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
      <TopHeader
        user={user}
        setUser={setUser}
        cartCount={cartCount}
        setCartCount={setCartCount}
      />

      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "16px" }}>
        {cart.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "50px",
              textAlign: "center",
              borderRadius: "6px",
            }}
          >
            <h2>Your cart is empty</h2>
            <p>Add some products to continue shopping.</p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button
                style={{
                  backgroundColor: "#2874f0",
                  color: "white",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ flex: 2.2 }}>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    marginBottom: "12px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      borderBottom: "1px solid #f0f0f0",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        padding: "16px",
                        color: "#2874f0",
                        borderBottom: "2px solid #2874f0",
                      }}
                    >
                      Flipkart ({totalItems})
                    </div>
                    <div style={{ flex: 1, padding: "16px", color: "#878787" }}>
                      Grocery
                    </div>
                  </div>

                  <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    borderBottom: "1px solid #f0f0f0",
  }}
>
  <div>
    <div style={{ fontSize: "14px", marginBottom: "4px" }}>
      Deliver to:{" "}
      <strong>
        {savedAddress?.full_name || user?.name || "User"},{" "}
        {savedAddress?.pincode || ""}
      </strong>{" "}
      <span
        style={{
          backgroundColor: "#f0f0f0",
          color: "#555",
          fontSize: "12px",
          padding: "2px 6px",
          borderRadius: "3px",
        }}
      >
        HOME
      </span>
    </div>

    <div style={{ fontSize: "13px", color: "#878787" }}>
      {savedAddress
        ? `${savedAddress.address}, ${savedAddress.city}, ${savedAddress.state}`
        : "Add address in Order Summary"}
    </div>
  </div>

  <button
    onClick={() => navigate("/order-summary")}
    style={{
      backgroundColor: "white",
      border: "1px solid #dbe0e5",
      color: "#2874f0",
      padding: "10px 18px",
      borderRadius: "4px",
      fontWeight: "600",
      cursor: "pointer",
    }}
  >
    Change
  </button>
</div>

                  {cart.map((item) => {
                    const originalPrice = Math.round(Number(item.price) * 1.28);

                    return (
                      <div
                        key={item.id}
                        style={{
                          padding: "20px 16px 14px",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <div style={{ display: "flex", gap: "18px" }}>
                          <div style={{ width: "150px", flexShrink: 0 }}>
                            <div
                              style={{
                                width: "130px",
                                height: "130px",
                                margin: "0 auto 12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                backgroundColor: "#fff",
                              }}
                            >
                              <img
                                src={item.images?.[0]}
                                alt={item.name}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                style={{
                                  width: "28px",
                                  height: "28px",
                                  borderRadius: "50%",
                                  border: "1px solid #c2c2c2",
                                  backgroundColor: "white",
                                  cursor: "pointer",
                                  fontWeight: "700",
                                }}
                              >
                                -
                              </button>

                              <div
                                style={{
                                  minWidth: "40px",
                                  height: "28px",
                                  border: "1px solid #c2c2c2",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: "white",
                                }}
                              >
                                {item.quantity}
                              </div>

                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                style={{
                                  width: "28px",
                                  height: "28px",
                                  borderRadius: "50%",
                                  border: "1px solid #c2c2c2",
                                  backgroundColor: "white",
                                  cursor: "pointer",
                                  fontWeight: "700",
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: "18px",
                                color: "#212121",
                                marginBottom: "6px",
                                fontWeight: "500",
                              }}
                            >
                              {item.name}
                            </div>

                            <div
                              style={{
                                color: "#878787",
                                fontSize: "14px",
                                marginBottom: "10px",
                              }}
                            >
                              Seller: RetailNet
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "10px",
                              }}
                            >
                              <span
                                style={{
                                  backgroundColor: "#388e3c",
                                  color: "white",
                                  fontSize: "12px",
                                  padding: "2px 6px",
                                  borderRadius: "3px",
                                  fontWeight: "700",
                                }}
                              >
                                4.2 ★
                              </span>
                              <span style={{ color: "#878787", fontSize: "14px" }}>
                                12,453 Ratings & Reviews
                              </span>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "10px",
                              }}
                            >
                              <span
                                style={{
                                  color: "#878787",
                                  textDecoration: "line-through",
                                  fontSize: "14px",
                                }}
                              >
                                ₹{originalPrice}
                              </span>
                              <span
                                style={{
                                  fontSize: "22px",
                                  fontWeight: "700",
                                  color: "#212121",
                                }}
                              >
                                ₹{item.price}
                              </span>
                              <span
                                style={{
                                  color: "#388e3c",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                }}
                              >
                                18% Off
                              </span>
                            </div>

                            <div
                              style={{
                                fontSize: "14px",
                                color: "#212121",
                                marginBottom: "16px",
                              }}
                            >
                              Delivery by tomorrow
                            </div>

                            <div style={{ display: "flex", gap: "26px" }}>
                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  fontWeight: "600",
                                  cursor: "pointer",
                                  color: "#212121",
                                }}
                              >
                                SAVE FOR LATER
                              </button>

                              <button
                                onClick={() => removeItem(item.id)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  fontWeight: "600",
                                  cursor: "pointer",
                                  color: "#212121",
                                }}
                              >
                                REMOVE
                              </button>

                              <button
                                style={{
                                  background: "none",
                                  border: "none",
                                  fontWeight: "600",
                                  cursor: "pointer",
                                  color: "#212121",
                                }}
                              >
                                BUY THIS NOW
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div
                    style={{
                      padding: "16px",
                      display: "flex",
                      justifyContent: "flex-end",
                      borderTop: "1px solid #f0f0f0",
                      backgroundColor: "white",
                      position: "sticky",
                      bottom: 0,
                    }}
                  >
<Link to="/order-summary" style={{ textDecoration: "none" }}>                      <button
                        style={{
                          backgroundColor: "#fb641b",
                          color: "white",
                          border: "none",
                          padding: "16px 60px",
                          fontSize: "16px",
                          fontWeight: "700",
                          cursor: "pointer",
                          borderRadius: "2px",
                        }}
                      >
                        PLACE ORDER
                      </button>
                    </Link>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    padding: "16px",
                  }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Recommended</h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "16px",
                    }}
                  >
                    {recommendedProducts.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.id}`}
                        style={{ textDecoration: "none", color: "#212121" }}
                      >
                        <div>
                          <div
                            style={{
                              height: "160px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: "10px",
                              overflow: "hidden",
                              backgroundColor: "#fff",
                            }}
                          >
                            <img
                              src={p.images?.[0]}
                              alt={p.name}
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <div style={{ fontSize: "14px", marginBottom: "6px" }}>{p.name}</div>
                          <div style={{ fontWeight: "700" }}>₹{p.price}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, position: "sticky", top: "20px" }}>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "16px",
                      color: "#878787",
                      fontWeight: "600",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    PRICE DETAILS
                  </div>

                  <div style={{ padding: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                        fontSize: "15px",
                      }}
                    >
                      <span>Price ({totalItems} item)</span>
                      <span>₹{subtotal}</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                        fontSize: "15px",
                      }}
                    >
                      <span>Discount</span>
                      <span style={{ color: "#388e3c" }}>- ₹{discount}</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                        fontSize: "15px",
                      }}
                    >
                      <span>Delivery Charges</span>
                      <span style={{ color: deliveryFee === 0 ? "#388e3c" : "#212121" }}>
                        {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
                      </span>
                    </div>

                    <div
                      style={{
                        borderTop: "1px dashed #e0e0e0",
                        borderBottom: "1px dashed #e0e0e0",
                        padding: "18px 0",
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "700",
                        fontSize: "18px",
                      }}
                    >
                      <span>Total Amount</span>
                      <span>₹{totalAmount}</span>
                    </div>

                    <div
                      style={{
                        marginTop: "16px",
                        color: "#388e3c",
                        fontWeight: "600",
                        fontSize: "16px",
                      }}
                    >
                      You will save ₹{discount} on this order
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    color: "#878787",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 4px",
                  }}
                >
                  <span style={{ fontSize: "26px" }}>🛡️</span>
                  <span>
                    Safe and secure payments. Easy returns. 100% authentic products.
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <FlipkartFooter />
    </div>
  );
}

function OrderSummaryPage({ user, setUser, cartCount, setCartCount }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
      return;
    }

    const savedAddress = localStorage.getItem("checkout_address");
    if (savedAddress) {
      setForm(JSON.parse(savedAddress));
    }

    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/api/cart`, authHeaders());
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const discount = Math.round(subtotal * 0.18);
  const deliveryFee = subtotal > 999 ? 0 : 40;
  const totalAmount = subtotal - discount + deliveryFee;

  const goToPayment = () => {
  if (
    !form.full_name ||
    !form.phone ||
    !form.address ||
    !form.city ||
    !form.state ||
    !form.pincode
  ) {
    alert("Please fill all address details");
    return;
  }

  localStorage.setItem("checkout_address", JSON.stringify(form));
  navigate("/payment");
};

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
      <TopHeader
        user={user}
        setUser={setUser}
        cartCount={cartCount}
        setCartCount={setCartCount}
      />

      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "16px" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <div style={{ flex: 2.2 }}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "60px",
                  padding: "18px 16px",
                  borderBottom: "1px solid #f0f0f0",
                  fontWeight: "600",
                }}
              >
                <div style={{ color: "#2874f0" }}>✔ Address</div>
                <div style={{ color: "#2874f0" }}>2 Order Summary</div>
                <div style={{ color: "#878787" }}>3 Payment</div>
              </div>

              <div
  style={{
    padding: "20px 24px",
    borderBottom: "1px solid #f0f0f0",
  }}
>
  <div style={{ fontSize: "26px", fontWeight: "600", marginBottom: "16px" }}>
    Delivery Address
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
    <input
      name="full_name"
      placeholder="Full Name"
      value={form.full_name}
      onChange={handleChange}
      style={{
        padding: "14px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "15px",
      }}
    />

    <input
      name="phone"
      placeholder="Phone Number"
      value={form.phone}
      onChange={handleChange}
      style={{
        padding: "14px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "15px",
      }}
    />
  </div>

  <div style={{ marginBottom: "14px" }}>
    <textarea
      name="address"
      placeholder="Address"
      value={form.address}
      onChange={handleChange}
      rows={3}
      style={{
        width: "100%",
        padding: "14px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "15px",
        resize: "vertical",
        boxSizing: "border-box",
      }}
    />
  </div>

  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
    <input
      name="city"
      placeholder="City"
      value={form.city}
      onChange={handleChange}
      style={{
        padding: "14px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "15px",
      }}
    />

    <input
      name="state"
      placeholder="State"
      value={form.state}
      onChange={handleChange}
      style={{
        padding: "14px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "15px",
      }}
    />

    <input
      name="pincode"
      placeholder="Pincode"
      value={form.pincode}
      onChange={handleChange}
      style={{
        padding: "14px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "15px",
      }}
    />
  </div>
</div>

              {cart.map((item) => {
                const originalPrice = Math.round(Number(item.price) * 1.28);

                return (
                  <div
                    key={item.id}
                    style={{
                      padding: "20px 16px",
                      borderBottom: "1px solid #f0f0f0",
                      display: "flex",
                      gap: "18px",
                    }}
                  >
                    <div style={{ width: "150px", flexShrink: 0 }}>
                      <div
                        style={{
                          width: "130px",
                          height: "130px",
                          margin: "0 auto 12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={item.images?.[0]}
                          alt={item.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "18px", fontWeight: "500", marginBottom: "6px" }}>
                        {item.name}
                      </div>

                      <div style={{ color: "#878787", fontSize: "14px", marginBottom: "10px" }}>
                        Seller: RetailNet
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "10px",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "#388e3c",
                            color: "white",
                            fontSize: "12px",
                            padding: "2px 6px",
                            borderRadius: "3px",
                            fontWeight: "700",
                          }}
                        >
                          4.2 ★
                        </span>
                        <span style={{ color: "#878787", fontSize: "14px" }}>
                          12,453 Ratings & Reviews
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#878787",
                            textDecoration: "line-through",
                            fontSize: "14px",
                          }}
                        >
                          ₹{originalPrice}
                        </span>
                        <span style={{ fontSize: "22px", fontWeight: "700" }}>
                          ₹{item.price}
                        </span>
                        <span style={{ color: "#388e3c", fontWeight: "600", fontSize: "14px" }}>
                          18% Off
                        </span>
                      </div>

                      <div style={{ fontSize: "14px", color: "#212121", marginBottom: "10px" }}>
                        Qty: {item.quantity}
                      </div>

                      <div style={{ fontSize: "14px", color: "#212121" }}>
                        Delivery by tomorrow
                      </div>
                    </div>
                  </div>
                );
              })}

              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  justifyContent: "flex-end",
                  borderTop: "1px solid #f0f0f0",
                  backgroundColor: "white",
                }}
              >
                <button
                  onClick={goToPayment}
                  style={{
                    backgroundColor: "#facc15",
                    color: "#111",
                    border: "none",
                    padding: "14px 52px",
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    borderRadius: "2px",
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, position: "sticky", top: "20px" }}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  color: "#878787",
                  fontWeight: "600",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                PRICE DETAILS
              </div>

              <div style={{ padding: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <span>Price</span>
                  <span>₹{subtotal}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <span>Discounts</span>
                  <span style={{ color: "#388e3c" }}>- ₹{discount}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <span>Fees</span>
                  <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
                </div>

                <div
                  style={{
                    borderTop: "1px dashed #e0e0e0",
                    borderBottom: "1px dashed #e0e0e0",
                    padding: "18px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    color: "#388e3c",
                    fontWeight: "600",
                  }}
                >
                  You will save ₹{discount} on this order!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FlipkartFooter />
    </div>
  );
}

function PaymentHeader() {
  return (
    <div
      style={{
        backgroundColor: "#2874f0",
        padding: "14px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "28px",
            fontWeight: "800",
            fontStyle: "italic",
          }}
        >
          Flipkart
        </Link>
      </div>
    </div>
  );
}

function PaymentPage({ user, setUser, cartCount, setCartCount }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
      return;
    }

    const savedAddress = localStorage.getItem("checkout_address");
    if (savedAddress) {
      setForm(JSON.parse(savedAddress));
    }

    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/api/cart`, authHeaders());
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const paymentHandlingFee = 10;
  const protectPromiseFee = 19;
  const mrpDiscount = Math.round(subtotal * 0.72);
  const couponDiscount = 22;
  const totalAmount =
    subtotal - mrpDiscount - couponDiscount + paymentHandlingFee + protectPromiseFee;

  const placeOrder = async () => {
    if (
      !form.full_name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      ...form,
      items: cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: totalAmount,
    };

    try {
      const res = await axios.post(`${API}/api/orders`, payload, authHeaders());
      localStorage.removeItem("checkout_address");
      navigate(`/order-success/${res.data.order_number}`);
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
      <PaymentHeader />

      <div style={{ maxWidth: "1560px", margin: "28px auto", padding: "0 20px" }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "26px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontSize: "20px",
                fontWeight: "700",
                color: "#212121",
              }}
            >
              <button
                onClick={() => navigate("/order-summary")}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "28px",
                  cursor: "pointer",
                  color: "#212121",
                }}
              >
                ←
              </button>
              <span>Complete Payment</span>
            </div>

            <div
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
                padding: "8px 14px",
                fontSize: "14px",
                fontWeight: "700",
                color: "#444",
              }}
            >
              🔒 100% Secure
            </div>
          </div>

          <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
            <div style={{ flex: 2.1 }}>
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  overflow: "hidden",
                  display: "flex",
                  minHeight: "560px",
                }}
              >
                <div
                  style={{
                    width: "48%",
                    borderRight: "1px solid #e5e7eb",
                    backgroundColor: "#fff",
                  }}
                >
                  <div
                    style={{
                      padding: "26px",
                      borderBottom: "1px solid #e5e7eb",
                      backgroundColor: "#f8f8f8",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ fontSize: "28px" }}>💳</div>
                      <div>
                        <div
                          style={{
                            fontSize: "22px",
                            fontWeight: "700",
                            marginBottom: "8px",
                            color: "#212121",
                          }}
                        >
                          Credit / Debit / ATM Card
                        </div>
                        <div
                          style={{
                            color: "#666",
                            fontSize: "16px",
                            marginBottom: "10px",
                          }}
                        >
                          Add and secure cards as per RBI guidelines
                        </div>
                        <div
                          style={{
                            color: "#1a9c36",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          Get upto 5% cashback • 2 offers available
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "26px",
                      borderBottom: "1px solid #e5e7eb",
                      backgroundColor: "#fff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontSize: "24px" }}>💵</div>
                      <div>
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "#212121",
                          }}
                        >
                          Cash on Delivery
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "26px",
                      borderBottom: "1px solid #e5e7eb",
                      color: "#888",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    UPI
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#f5f5f5",
                    padding: "24px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "14px",
                      padding: "24px",
                      maxWidth: "500px",
                    }}
                  >
                    <div
                      style={{
                        color: "#666",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        marginBottom: "26px",
                      }}
                    >
                      Due to handling costs, a nominal fee of ₹10 will be charged
                      for orders placed using this option. Avoid this fee by paying online now.
                    </div>

                    <button
                      onClick={placeOrder}
                      style={{
                        width: "100%",
                        backgroundColor: "#facc15",
                        color: "#111",
                        border: "none",
                        padding: "16px",
                        borderRadius: "8px",
                        fontWeight: "700",
                        fontSize: "28px",
                        cursor: "pointer",
                      }}
                    >
                      Pay ₹{totalAmount.toLocaleString("en-IN")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ width: "500px" }}>
              <div
                style={{
                  backgroundColor: "#eef2ff",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "26px",
                    fontSize: "20px",
                    color: "#212121",
                  }}
                >
                  <span>MRP (incl. of all taxes)</span>
                  <span style={{ fontWeight: "600" }}>
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#212121",
                      marginBottom: "18px",
                    }}
                  >
                    Fees ^
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "18px",
                      color: "#666",
                      fontSize: "18px",
                    }}
                  >
                    <span>Payment Handling Fee</span>
                    <span>₹{paymentHandlingFee}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "24px",
                      color: "#666",
                      fontSize: "18px",
                    }}
                  >
                    <span>Protect Promise Fee</span>
                    <span>₹{protectPromiseFee}</span>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px dashed #d1d5db",
                    paddingTop: "24px",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#212121",
                      marginBottom: "18px",
                    }}
                  >
                    Discounts ^
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "18px",
                      color: "#666",
                      fontSize: "18px",
                    }}
                  >
                    <span>MRP Discount</span>
                    <span style={{ color: "#1a9c36" }}>
                      -₹{mrpDiscount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#666",
                      fontSize: "18px",
                    }}
                  >
                    <span>Coupons for you</span>
                    <span style={{ color: "#1a9c36" }}>-₹{couponDiscount}</span>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #d1d5db",
                    paddingTop: "24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#3157e0",
                    fontSize: "22px",
                    fontWeight: "700",
                  }}
                >
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div
                style={{
                  marginTop: "22px",
                  backgroundColor: "#dcfce7",
                  borderRadius: "16px",
                  padding: "24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#15803d",
                      fontSize: "24px",
                      fontWeight: "700",
                      marginBottom: "6px",
                    }}
                  >
                    5% Cashback
                  </div>
                  <div
                    style={{
                      color: "#15803d",
                      fontSize: "18px",
                    }}
                  >
                    Claim now with payment offers
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      backgroundColor: "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                    }}
                  >
                    A
                  </div>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      backgroundColor: "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                    }}
                  >
                    i
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FlipkartFooter />
    </div>
  );
}
function OrderSuccessPage({ user, setUser, cartCount, setCartCount }) {
  const { id } = useParams();

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
      <TopHeader
        user={user}
        setUser={setUser}
        cartCount={cartCount}
        setCartCount={setCartCount}
      />

      <div style={{ padding: "40px 20px" }}>
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "54px", marginBottom: "16px" }}>✅</div>
          <h1 style={{ marginTop: 0 }}>Order Placed Successfully</h1>
          <p style={{ fontSize: "18px", color: "#555" }}>Your order ID is:</p>
          <h2 style={{ color: "#2874f0" }}>{id}</h2>

          <Link to="/" style={{ textDecoration: "none" }}>
            <button
              style={{
                marginTop: "20px",
                backgroundColor: "#2874f0",
                color: "white",
                border: "none",
                padding: "14px 24px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              CONTINUE SHOPPING
            </button>
          </Link>
        </div>
      </div>

      <FlipkartFooter />
    </div>
  );
}

function OrdersPage({ user, setUser, cartCount, setCartCount }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/api/orders`, authHeaders());
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
      <TopHeader user={user} setUser={setUser} cartCount={cartCount} setCartCount={setCartCount} />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "10px",
          }}
        >
          <h1 style={{ marginTop: 0 }}>My Orders</h1>

          {orders.length === 0 ? (
            <p>No orders placed yet.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                style={{
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  padding: "18px",
                  marginBottom: "16px",
                  backgroundColor: "#fafafa",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "700" }}>
                      Order ID: {order.order_number}
                    </div>
                    <div style={{ color: "#666", marginTop: "4px" }}>
                      {new Date(order.created_at).toLocaleString()}
                    </div>
                  </div>

                  <div
                    style={{
                      color: "green",
                      fontWeight: "700",
                      textTransform: "capitalize",
                    }}
                  >
                    {order.status || "placed"}
                  </div>
                </div>

                <div style={{ marginBottom: "8px" }}>
                  <strong>Total:</strong> ₹{order.total_amount}
                </div>

                <div style={{ color: "#444", lineHeight: "1.6" }}>
                  <div>{order.full_name}</div>
                  <div>{order.phone}</div>
                  <div>
                    {order.address}, {order.city}, {order.state} - {order.pincode}
                  </div>
                             </div>
            </div>
            ))
          )}
        </div>
      </div>
      <FlipkartFooter />
    </div>
      
        
  );
}

function WishlistPage({ user, setUser, cartCount, setCartCount }) {  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
      return;
    }
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${API}/api/wishlist`, authHeaders());
      setWishlist(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`${API}/api/wishlist/${id}`, authHeaders());
      fetchWishlist();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
      <TopHeader user={user} setUser={setUser} cartCount={cartCount} setCartCount={setCartCount} />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "10px",
          }}
        >
          <h1 style={{ marginTop: 0 }}>My Wishlist ❤️</h1>

          {wishlist.length === 0 ? (
  <p>No items in wishlist</p>
) : (
  wishlist.map((item) => (
    <div
      key={item.id}
      style={{
        background: "white",
        padding: "16px",
        border: "1px solid #eee",
        borderRadius: "8px",
        marginBottom: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src={item.images?.[0]}
          alt={item.name}
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
        />

        <div>
          <div style={{ fontWeight: "600" }}>{item.name}</div>
          <div>₹{item.price}</div>
        </div>
      </div>

      <button
        onClick={() => removeFromWishlist(item.id)}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Remove
      </button>
    </div>
  ))
)}           


        </div>
      </div>
    </div>
  );
} 



function FlipkartFooter() {
  return (
    <div
      style={{
        backgroundColor: "#172337",
        color: "white",
        marginTop: "40px",
        paddingTop: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 30px 30px",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "30px",
          fontSize: "14px",
        }}
      >
        <div>
          <h4 style={{ color: "#878787", fontSize: "12px", marginBottom: "14px" }}>ABOUT</h4>
          <p>Contact Us</p>
          <p>About Us</p>
          <p>Careers</p>
          <p>Flipkart Stories</p>
          <p>Press</p>
          <p>Corporate Information</p>
        </div>

        <div>
          <h4 style={{ color: "#878787", fontSize: "12px", marginBottom: "14px" }}>GROUP COMPANIES</h4>
          <p>Myntra</p>
          <p>Cleartrip</p>
          <p>Shopsy</p>
        </div>

        <div>
          <h4 style={{ color: "#878787", fontSize: "12px", marginBottom: "14px" }}>HELP</h4>
          <p>Payments</p>
          <p>Shipping</p>
          <p>Cancellation & Returns</p>
          <p>FAQ</p>
        </div>

        <div>
          <h4 style={{ color: "#878787", fontSize: "12px", marginBottom: "14px" }}>CONSUMER POLICY</h4>
          <p>Cancellation & Returns</p>
          <p>Terms Of Use</p>
          <p>Security</p>
          <p>Privacy</p>
          <p>Sitemap</p>
          <p>Grievance Redressal</p>
          <p>EPR Compliance</p>
        </div>

        <div style={{ borderLeft: "1px solid #454d5e", paddingLeft: "20px" }}>
          <h4 style={{ color: "#878787", fontSize: "12px", marginBottom: "14px" }}>Mail Us:</h4>
          <p style={{ lineHeight: "1.6" }}>
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </p>
        </div>

        <div>
          <h4 style={{ color: "#878787", fontSize: "12px", marginBottom: "14px" }}>Registered Office Address:</h4>
          <p style={{ lineHeight: "1.6" }}>
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </p>
          <p>CIN : U51109KA2012PTC066107</p>
          <p>Telephone: 044-45614700</p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #454d5e",
          padding: "18px 30px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          fontSize: "14px",
        }}
      >
        <span>🛍 Become a Seller</span>
        <span>📢 Advertise</span>
        <span>🎁 Gift Cards</span>
        <span>❓ Help Center</span>
        <span>© 2007-2026 Flipkart.com</span>
        <span>💳 Visa | MasterCard | RuPay</span>
      </div>
    </div>
  );
}

function App() {
const [user, setUser] = useState(null);
const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
  const loadUser = async () => {
    if (!getToken()) return;

    try {
      const res = await axios.get(`${API}/api/auth/me`, authHeaders());
      setUser(res.data);
    } catch (err) {
      removeToken();
      setUser(null);
    }
  };

  const loadCartCount = async () => {
    if (!getToken()) {
      setCartCount(0);
      return;
    }

    try {
      const res = await axios.get(`${API}/api/cart`, authHeaders());
      const total = res.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    } catch (err) {
      console.error(err);
    }
  };

  loadUser();
  loadCartCount();
}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage user={user} setUser={setUser} cartCount={cartCount} setCartCount={setCartCount} />} />
<Route path="/product/:id" element={<ProductPage user={user} setUser={setUser} cartCount={cartCount} setCartCount={setCartCount} />} />
<Route path="/cart" element={<CartPage user={user} setUser={setUser} cartCount={cartCount} setCartCount={setCartCount} />} />
<Route path="/order-summary" element={<OrderSummaryPage user={user} setUser={setUser} cartCount={cartCount} setCartCount={setCartCount} />} />
<Route path="/payment" element={<PaymentPage user={user} setUser={setUser} cartCount={cartCount} setCartCount={setCartCount} />} /><Route path="/order-success/:id" element={<OrderSuccessPage user={user} setUser={setUser} cartCount={cartCount} setCartCount={setCartCount} />} />
<Route path="/orders" element={<OrdersPage user={user} setUser={setUser} cartCount={cartCount} setCartCount={setCartCount} />} />
<Route path="/wishlist" element={<WishlistPage user={user} setUser={setUser} cartCount={cartCount} setCartCount={setCartCount} />} />
<Route
  path="/collection/:query"
  element={
    <CollectionPage
      user={user}
      setUser={setUser}
      cartCount={cartCount}
      setCartCount={setCartCount}
    />
  }
/>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage setUser={setUser} />} />
        
     </Routes>
    </BrowserRouter>
  );
}

 export default App;

