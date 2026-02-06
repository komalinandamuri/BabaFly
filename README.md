# 🌟 BabaFly - Premium Jewelry E-Commerce Platform

A modern, fully responsive web application for buying and selling premium jewelry online. Built with React, Redux Toolkit, Tailwind CSS, and integrated with a backend API.

## 🚀 Features

### ✨ Core Features
- **User Authentication**: Secure login and registration with JWT tokens
- **Product Catalog**: Browse and search premium jewelry products
- **Advanced Filtering**: Filter by price, metal type, and polish type
- **Shopping Cart**: Add, update, and remove items from cart
- **Checkout**: Complete order placement with address management
- **Order Tracking**: View order history and detailed order information
- **Category Management**: Browse products by categories
- **Product Details**: Comprehensive product information with specifications

### 🎨 UI/UX Features
- Fully responsive design (mobile-first approach)
- Beautiful Tailwind CSS components
- Smooth animations and transitions
- Loading skeletons and empty states
- Toast notifications for user feedback
- Modern navigation and footer

### 🔐 Security & Data Management
- JWT-based authentication
- Protected routes for authenticated users
- Secure API integration with Axios interceptors
- Local storage for cart persistence
- Redux state management

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - UI library
- **Vite 5.0.8** - Build tool
- **Redux Toolkit 1.9.7** - State management
- **React Router 6.20.0** - Client-side routing
- **Tailwind CSS 3.3.6** - Styling
- **Axios 1.6.2** - HTTP client
- **React Hook Form 7.48.0** - Form handling
- **Yup 1.3.3** - Schema validation
- **React Hot Toast 2.4.1** - Notifications
- **Framer Motion 10.16.16** - Animations
- **Lucide React** - Icons

### Development & Testing
- **Jest 29.7.0** - Testing framework
- **React Testing Library 14.1.2** - Component testing
- **Babel 7.23.5** - JavaScript compiler

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation component
│   ├── Footer.jsx              # Footer component
│   ├── PrivateRoute.jsx        # Protected route wrapper
│   └── UIComponents.jsx        # Reusable UI components (Loader, Skeleton, EmptyState)
├── pages/
│   ├── HomePage.jsx            # Homepage with hero section
│   ├── LoginPage.jsx           # User login
│   ├── RegisterPage.jsx        # User registration
│   ├── ProductsPage.jsx        # Products listing with filters
│   ├── ProductDetailsPage.jsx  # Individual product details
│   ├── CategoriesPage.jsx      # Categories listing
│   ├── CategoryProductsPage.jsx # Category-specific products
│   ├── CartPage.jsx            # Shopping cart
│   ├── CheckoutPage.jsx        # Order checkout
│   ├── OrdersPage.jsx          # User's orders list
│   └── OrderDetailsPage.jsx    # Individual order details
├── layouts/
│   └── MainLayout.jsx          # Main app layout wrapper
├── redux/
│   ├── store.js                # Redux store configuration
│   └── slices/
│       ├── authSlice.js        # Authentication state
│       ├── cartSlice.js        # Shopping cart state
│       ├── productsSlice.js    # Products and filters state
│       └── ordersSlice.js      # Orders state
├── services/
│   ├── api.js                  # Axios instance with interceptors
│   └── apiEndpoints.js         # API endpoint functions
├── utils/
│   ├── helpers.js              # Utility functions
│   └── validationSchemas.js    # Yup validation schemas
├── assets/                     # Static assets
├── App.jsx                     # Main app component
├── main.jsx                    # Entry point
└── index.css                   # Global styles

```

## 🔌 API Integration

The application connects to a backend API for all data operations:

### Authentication APIs
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

### Product APIs
- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `GET /products/search?query=` - Search products

### Category APIs
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category details
- `GET /categories/:id/products` - Get category products

### Order APIs
- `GET /orders` - Get user's orders
- `GET /orders/:id` - Get order details
- `POST /orders` - Create new order
- `PUT /orders/:id` - Update order

### Filter APIs
- `GET /filters/metal-types` - Get available metal types
- `GET /filters/polish-types` - Get available polish types
- `GET /filters/price-range` - Get price range

## 🚀 Getting Started

### Prerequisites
- Node.js v20.11.0 or higher
- npm v10.2.4 or higher

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd BabaFly
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy example env file
cp .env.example .env.local

# Update .env.local with your API URL
VITE_API_URL=http://localhost:5000/api
```

### Development

**Start the development server**
```bash
npm run dev
```

The application will open at `http://localhost:3000`

**Build for production**
```bash
npm run build
```

**Preview production build**
```bash
npm run preview
```

**Run tests**
```bash
npm test
```

**Run tests with coverage**
```bash
npm run test:coverage
```

## 📋 Redux State Structure

```javascript
{
  auth: {
    user: { id, name, email, phone },
    token: "jwt-token",
    isLoading: false,
    error: null
  },
  cart: {
    items: [{ _id, name, price, quantity, ... }],
    totalPrice: 0
  },
  products: {
    products: [...],
    filteredProducts: [...],
    categories: [...],
    selectedProduct: null,
    isLoading: false,
    filters: {
      priceRange: [0, 1000000],
      metalType: [],
      polishType: []
    },
    sortBy: "latest"
  },
  orders: {
    orders: [...],
    selectedOrder: null,
    isLoading: false
  }
}
```

## 🧪 Testing

The project includes basic tests for key components:

- **HomePage.test.jsx** - Tests homepage rendering
- **LoginPage.test.jsx** - Tests login form validation
- **CartPage.test.jsx** - Tests cart functionality

Run tests with:
```bash
npm test
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile** (320px and up)
- **Tablet** (768px and up)
- **Desktop** (1024px and up)

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Private routes accessible only to authenticated users
- **Axios Interceptors**: Automatic token attachment to requests
- **401 Redirect**: Automatic logout on unauthorized access
- **Local Storage**: Secure cart data persistence

## 🎨 Customization

### Tailwind Configuration
Edit `tailwind.config.js` to customize colors, spacing, and other design tokens:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#FFD700',      // Gold
      secondary: '#1a1a1a',    // Dark
      accent: '#FF6B6B'        // Red
    }
  }
}
```

### API Configuration
Update `.env.local` to change the API base URL:
```
VITE_API_URL=https://your-api-url.com/api
```

## 📚 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |

## 🚀 Deployment

### Vercel Deployment

1. **Push code to GitHub**
2. **Connect repository to Vercel**
3. **Set environment variables in Vercel**:
   - `VITE_API_URL=<your-api-url>`
4. **Deploy**

### Netlify Deployment

1. **Build the project**
```bash
npm run build
```

2. **Deploy the dist folder to Netlify**

3. **Set environment variables**:
   - `VITE_API_URL=<your-api-url>`

4. **Configure redirects in netlify.toml**:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📄 Form Validation Schemas

### Login Schema
- Email: Required, valid email format
- Password: Required, minimum 6 characters

### Register Schema
- Name: Required, minimum 3 characters
- Email: Required, valid email format
- Phone: Required, 10 digits
- Password: Required, minimum 6 characters
- Confirm Password: Must match password

### Checkout Address Schema
- Full Name: Required, minimum 3 characters
- Email: Required, valid email
- Phone: Required, 10 digits
- Address Line 1: Required
- City: Required
- State: Required
- Pincode: Required, 6 digits

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built for the Info Bharat Internship Program

## 📞 Support

For issues and questions, please contact the mentor or open an issue in the repository.

---

**Happy Coding! 🎉**
