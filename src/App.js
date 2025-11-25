import React, { useState, useEffect, useMemo } from 'react';
import * as DataService from './services/DataService.js';
import { calculateDiscountedPrice } from './utils/priceHelper.js'; // IMPORTANTE
import Header from './components/Layout/Header.js';
import Navbar from './components/Layout/Navbar.js';
import Footer from './components/Layout/Footer.js';
import Home from './views/Home.js';
import CategoryPage from './views/CategoryPage.js';
import Cart from './views/Cart.js';
import LoginForm from './views/LoginForm.js';
import RegisterForm from './views/RegisterForm.js';
import AdminDashboard from './views/AdminDashboard/AdminDashboard.js';
import CheckoutPage from './views/CheckoutPage.js';
import OffersPage from './views/OffersPage.js';
import ContactPage from './views/ContactPage.js';
import ProfilePage from './views/ProfilePage.js';
import ToastNotification from './components/ToastNotification.js';

const initialSessionJSON = localStorage.getItem(DataService.LOCAL_STORAGE_KEYS.SESSION);
const initialUserSession = initialSessionJSON ? JSON.parse(initialSessionJSON) : null;

export default function App() {
  const [products, setProducts] = useState([]); 
  const [cartItems, setCartItems] = useState(DataService.loadCartFromStorage()); 
  const [currentPage, setCurrentPage] = useState('home');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [userSession, setUserSession] = useState(initialUserSession);
  const [toast, setToast] = useState({ message: '', show: false, type: 'success' });
  
  const isLoggedIn = !!userSession;
  const isAdmin = userSession?.role === 'admin';

  useEffect(() => {
    const fetchProducts = async () => {
        const data = await DataService.getProductsData();
        setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    DataService.saveCartToStorage(cartItems);
  }, [cartItems]);
  
  useEffect(() => {
    if (userSession) {
        localStorage.setItem(DataService.LOCAL_STORAGE_KEYS.SESSION, JSON.stringify(userSession));
    } else {
        localStorage.removeItem(DataService.LOCAL_STORAGE_KEYS.SESSION);
    }
    if (!isAdmin && currentPage === 'admin-dashboard') {
        setCurrentPage('home');
    }
  }, [userSession, isAdmin, currentPage]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, show: true });
    setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const navigate = (page, param = null) => {
    setCurrentPage(page);
    if (page === 'category') {
        setCurrentCategory(param);
    }
  };

  const handleAddToCart = (productToAdd) => {
    if (isAdmin) return; 
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentItems, { ...productToAdd, quantity: 1 }];
      }
    });
    showToast(`"${productToAdd.nombre}" añadido al carrito.`);
  };

  const handleLogin = async (email, password) => {
      const session = await DataService.loginUser(email, password);
      if (session) {
          setUserSession(session);
          return session;
      }
      return null;
  };
  
  const handleRegister = async (name, email, password) => {
      return await DataService.registerUser(name, email, password);
  };
  
  const handleLogout = () => {
      localStorage.removeItem('token');
      setUserSession(null);
      navigate('home');
  };

  const cartItemCount = useMemo(() => 
    cartItems.reduce((total, item) => total + item.quantity, 0), 
    [cartItems]
  );
  
  // CÁLCULO DE TOTAL CON DESCUENTOS
  const totalCartPrice = useMemo(() => 
    cartItems.reduce((total, item) => {
        const finalPrice = calculateDiscountedPrice(item.precio, item.descuento);
        return total + (finalPrice * item.quantity);
    }, 0), 
    [cartItems]
  );
  
  const renderPage = () => {
    if (isAdmin) {
        return <AdminDashboard products={products} setProducts={setProducts} navigate={navigate} isAdmin={isAdmin} handleLogout={handleLogout} />;
    }
    
    switch (currentPage) {
      case 'home': return <Home products={products} handleAddToCart={handleAddToCart} navigate={navigate} />;
      case 'category': return <CategoryPage products={products} category={currentCategory} handleAddToCart={handleAddToCart} navigate={navigate} />;
      case 'cart': return <Cart cartItems={cartItems} setCartItems={setCartItems} navigate={navigate} />;
      case 'login': return <LoginForm navigate={navigate} handleLogin={handleLogin} />;
      case 'register': return <RegisterForm navigate={navigate} handleRegister={handleRegister} />;
      case 'checkout': return <CheckoutPage cartItems={cartItems} setCartItems={setCartItems} navigate={navigate} userSession={userSession} />;
      case 'offers': return <OffersPage products={products} handleAddToCart={handleAddToCart} navigate={navigate} />;
      case 'contact': return <ContactPage />;
      case 'profile': return <ProfilePage userSession={userSession} navigate={navigate} />;
      case 'admin-dashboard': return <div className="container my-5"><div className="alert alert-danger">Acceso Denegado.</div></div>;
      default: return <Home products={products} handleAddToCart={handleAddToCart} navigate={navigate} />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        
        {!isAdmin && (
            <>
                <Header 
                    totalCartPrice={totalCartPrice} 
                    cartItemCount={cartItemCount}
                    navigate={navigate}
                    userSession={userSession}
                    handleLogout={handleLogout}
                />
                <Navbar navigate={navigate} isAdmin={isAdmin} />
            </>
        )}

        <main className="flex-grow-1">
            {renderPage()}
        </main>

        {!isAdmin && <Footer />}
        
        <ToastNotification message={toast.message} show={toast.show} type={toast.type} />
    </div>
  );
}