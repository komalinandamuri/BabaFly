# 🎯 Quick Reference Guide - BabaFly

## Project Links

- **Repository**: [To be filled after GitHub upload]
- **Live Demo**: [To be filled after deployment]
- **Backend API**: http://localhost:5000/api (development)

---

## Quick Start (30 seconds)

```bash
cd BabaFly
npm install
npm run dev
# Open http://localhost:3000
```

---

## Project Structure at a Glance

```
src/
├── pages/          # 11 route pages
├── components/     # 4 reusable components
├── redux/          # State management
├── services/       # API integration
├── utils/          # Helper functions
├── layouts/        # Main layout
├── assets/         # Static files
├── App.jsx         # Main component
└── main.jsx        # Entry point
```

---

## Available Routes

| Path | Page | Protection |
|------|------|-----------|
| `/` | Home | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/products` | All Products | No |
| `/products/:id` | Product Details | No |
| `/categories` | Categories | No |
| `/categories/:id` | Category Products | No |
| `/cart` | Shopping Cart | No |
| `/checkout` | Checkout | ✅ Auth |
| `/orders` | My Orders | ✅ Auth |
| `/orders/:id` | Order Details | ✅ Auth |

---

## Key Files to Know

### Redux Slices
- `authSlice.js` - Login, logout, user data
- `cartSlice.js` - Add, update, remove items
- `productsSlice.js` - Products list, filters
- `ordersSlice.js` - User orders

### API Services
- `api.js` - Axios config with JWT interceptor
- `apiEndpoints.js` - All API functions

### Utils
- `helpers.js` - Formatting, validation helpers
- `validationSchemas.js` - Yup form schemas

---

## NPM Scripts

```bash
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview prod build
npm test               # Run all tests
npm run test:coverage  # Test coverage report
npm run lint           # Run ESLint
```

---

## Redux State Shape

```javascript
store = {
  auth: { user, token, isLoading, error },
  cart: { items, totalPrice },
  products: { products, filteredProducts, filters, sortBy },
  orders: { orders, selectedOrder, isLoading }
}
```

---

## Form Validation

```javascript
// Login
email: required, valid email
password: min 6 chars

// Register
name: min 3 chars
email: required, valid email
phone: 10 digits
password: min 6 chars
confirmPassword: must match

// Checkout Address
fullName: min 3 chars
email: valid email
phone: 10 digits
address: required
pincode: 6 digits
```

---

## API Call Pattern

```javascript
import { apiFunction } from '../services/apiEndpoints';
import { useDispatch, useSelector } from 'react-redux';

// In component
const dispatch = useDispatch();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await apiFunction(params);
      dispatch(setStateAction(response.data));
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed');
    }
  };
  fetchData();
}, []);
```

---

## Common Tasks

### Add Product to Cart
```javascript
import { addToCart } from '../redux/slices/cartSlice';
dispatch(addToCart({ ...product, quantity: 1 }));
```

### Update Cart Item
```javascript
import { updateCartItem } from '../redux/slices/cartSlice';
dispatch(updateCartItem({ id, quantity: 2 }));
```

### Access Auth State
```javascript
const { user, token } = useSelector(state => state.auth);
```

### Show Toast Notification
```javascript
import toast from 'react-hot-toast';
toast.success('Item added!');
toast.error('Failed');
```

### Check Authentication
```javascript
const ProtectedComponent = () => {
  const { token } = useSelector(state => state.auth);
  if (!token) return <Navigate to="/login" />;
  return <Component />;
};
```

---

## Styling Classes

```jsx
// Buttons
className="btn-primary"      // Gold background
className="btn-secondary"    // Dark background
className="btn-outline"      // Bordered

// Forms
className="form-input"       // Input field
className="form-label"       // Label
className="form-error"       // Error message

// Badges
className="badge badge-primary"    // Gold badge
className="badge badge-success"    // Green badge
className="badge badge-error"      // Red badge
```

---

## Environment Variables

```
VITE_API_URL=http://localhost:5000/api
```

For production:
```
VITE_API_URL=https://your-api-domain.com/api
```

---

## Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| "Cannot find module" | `npm install` |
| Port 3000 in use | Change port in vite.config.js |
| CORS errors | Check backend CORS settings |
| API 401 errors | Login again, check localStorage |
| Styles not applying | Clear cache, restart dev server |
| Tests failing | Check jest.config.js setup |

---

## Performance Tips

- Cart persists in localStorage (fast)
- Redux state in memory (fast)
- Lazy load routes (smaller bundle)
- Use Vite for fast builds
- Tailwind CSS tree-shaking (smaller CSS)

---

## Browser DevTools

### Redux DevTools
1. Install Redux DevTools browser extension
2. Observe state changes in real-time
3. Time-travel debugging available

### React DevTools
1. Install React DevTools browser extension
2. Inspect component props and hooks
3. Track component render performance

### Network Tab
1. Check API requests
2. Monitor response times
3. Verify token in headers

---

## Deployment Checklist

```
[ ] npm run build succeeds
[ ] No console errors
[ ] API URL configured
[ ] Environment variables set
[ ] All tests passing
[ ] Responsive design tested
[ ] Links verified
[ ] Git pushed
```

---

## File Naming Conventions

- **Components**: PascalCase (.jsx)
  - `HomePage.jsx`
  - `ProductCard.jsx`

- **Utilities**: camelCase (.js)
  - `helpers.js`
  - `validationSchemas.js`

- **Redux**: camelCase (.js)
  - `authSlice.js`
  - `cartSlice.js`

---

## Code Organization

```
Each page includes:
- Component import
- Redux hooks
- API calls
- State management
- JSX structure
- Responsive design

Each component includes:
- Props destructuring
- JSX structure
- Tailwind classes
- Error handling
```

---

## Git Commands Cheatsheet

```bash
git init                           # Initialize git
git add .                         # Stage all files
git commit -m "message"           # Commit changes
git branch -M main                # Rename to main
git remote add origin <url>       # Add remote
git push -u origin main           # Push to GitHub
git status                        # Check status
git log                           # View history
```

---

## Resources

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router](https://reactrouter.com)

---

## Getting Help

1. Check **README.md** for overview
2. Check **SETUP_GUIDE.md** for setup
3. Check **API_INTEGRATION_GUIDE.md** for APIs
4. Check **DEPLOYMENT_GUIDE.md** for deployment
5. Check **COMPLETION_CHECKLIST.md** for progress

---

## Key Milestones

- ✅ Project initialized
- ✅ All pages created
- ✅ Redux setup
- ✅ API integrated
- ✅ Tests written
- ✅ Documentation done
- ⏳ GitHub upload
- ⏳ Deployment
- ⏳ Demo video
- ⏳ LinkedIn submission

---

**Questions? Check the documentation files! 📚**
