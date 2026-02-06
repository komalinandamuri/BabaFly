# 🚀 BabaFly Project Setup Guide

## Quick Start

### Step 1: Install Node.js
If Node.js is not installed, download and install from: https://nodejs.org/

```bash
# Verify installation
node --version  # Should be v20.11.0 or higher
npm --version   # Should be v10.2.4 or higher
```

### Step 2: Install Dependencies
```bash
cd BabaFly
npm install
```

### Step 3: Configure API URL
Update `.env.local` with your backend API URL:
```
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

---

## Project Structure Explained

### /src/pages
All page components representing different routes:
- **HomePage.jsx** - Hero section + Featured products & categories
- **LoginPage.jsx** - User login with form validation
- **RegisterPage.jsx** - New user registration
- **ProductsPage.jsx** - Product listing with filters & sorting
- **ProductDetailsPage.jsx** - Individual product view
- **CategoriesPage.jsx** - All categories
- **CategoryProductsPage.jsx** - Products by category
- **CartPage.jsx** - Shopping cart management
- **CheckoutPage.jsx** - Order checkout & payment
- **OrdersPage.jsx** - User's order history
- **OrderDetailsPage.jsx** - Individual order tracking

### /src/components
Reusable UI components:
- **Navbar.jsx** - Navigation bar with cart count
- **Footer.jsx** - Footer with links & contact
- **PrivateRoute.jsx** - Route protection component
- **UIComponents.jsx** - Loader, Skeleton, EmptyState

### /src/redux
State management using Redux Toolkit:
- **store.js** - Redux store configuration
- **slices/authSlice.js** - Authentication state
- **slices/cartSlice.js** - Shopping cart state
- **slices/productsSlice.js** - Products & filters
- **slices/ordersSlice.js** - Orders state

### /src/services
API integration layer:
- **api.js** - Axios instance with JWT interceptor
- **apiEndpoints.js** - All API endpoint functions

### /src/utils
Helper functions:
- **helpers.js** - Formatting, validation utilities
- **validationSchemas.js** - Yup validation schemas

---

## Key Features Implementation

### 1. Authentication Flow
```
RegisterPage → ValidationSchema → API Call → Redux Store → Login
```
- Tokens stored in localStorage
- Automatic JWT injection via Axios interceptor
- 401 redirect on unauthorized access

### 2. Shopping Flow
```
HomePage → ProductsPage → ProductDetailsPage → CartPage → CheckoutPage
```
- Redux cart state synced with localStorage
- Price calculation with tax
- Address validation before order

### 3. Order Management
```
CheckoutPage → OrdersPage → OrderDetailsPage
```
- Protected routes require authentication
- Order timeline tracking
- Delivery date estimation

---

## Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run all tests |
| `npm run test:coverage` | Coverage report |

---

## Environment Variables

Create `.env.local` file:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Can add more variables as needed
```

---

## Common Issues & Solutions

### Issue: "Node not found"
**Solution**: Add Node.js to system PATH
```bash
# Windows
[Environment]::SetEnvironmentVariable("PATH", "$env:PATH;C:\node-v20.11.0-win-x64", "User")
```

### Issue: "Port 3000 already in use"
**Solution**: Change port in `vite.config.js`
```javascript
server: {
  port: 3001,  // Change this
}
```

### Issue: API calls returning 401
**Solution**: Check token in localStorage
```javascript
// In browser console
localStorage.getItem('token')  // Should have a token
```

### Issue: Styles not loading
**Solution**: Clear browser cache or restart dev server
```bash
npm run dev
```

---

## Testing

### Run All Tests
```bash
npm test
```

### Run Specific Test File
```bash
npm test HomePage.test.jsx
```

### Generate Coverage Report
```bash
npm run test:coverage
```

---

## Deployment Checklist

- [ ] All tests passing
- [ ] Build succeeds without errors
- [ ] Environment variables configured
- [ ] API URL points to production
- [ ] README updated
- [ ] Code pushed to GitHub
- [ ] Demo video recorded

---

## Git Commands Reference

```bash
# Initialize git
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: BabaFly e-commerce platform"

# Add remote
git remote add origin <repo-url>

# Push to GitHub
git push -u origin main
```

---

## Performance Tips

1. **Code Splitting**: Routes are lazy loaded via React Router
2. **Image Optimization**: Use placeholder images, lazy load images
3. **Bundle Size**: Check with `npm run build`
4. **Caching**: Utilize browser caching for static assets

---

## Security Best Practices

1. ✅ Never commit `.env.local` file
2. ✅ Always validate user input
3. ✅ Use HTTPS in production
4. ✅ Keep dependencies updated
5. ✅ Implement rate limiting on backend

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Additional Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)

---

## Support

For issues or questions:
1. Check the README.md file
2. Review relevant documentation links
3. Contact your mentor

**Happy Coding! 🎉**
