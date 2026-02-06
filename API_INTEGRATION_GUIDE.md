# 📡 API Integration Guide - BabaFly

## API Base Configuration

All API calls go through the configured base URL in `.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

The Axios instance automatically adds JWT tokens to all requests.

---

## Authentication Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}

Response (201):
{
  "message": "Registration successful",
  "user": {
    "_id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

### Login User
```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "token": "jwt-token-here",
  "user": {
    "_id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Logout User
```
POST /auth/logout
Authorization: Bearer {token}

Response (200):
{
  "message": "Logout successful"
}
```

---

## Product Endpoints

### Get All Products
```
GET /products?page=1&limit=20&sort=latest
Authorization: Bearer {token}

Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 20)
- sort: Sort option (latest, price-low, price-high)

Response (200):
{
  "data": [
    {
      "_id": "product-id",
      "name": "Gold Ring",
      "description": "Beautiful gold ring",
      "price": 25000,
      "originalPrice": 30000,
      "discount": 17,
      "metalType": "Gold",
      "polishType": "High Polish",
      "image": "image-url",
      "images": ["image-url-1", "image-url-2"],
      "weight": "5.2",
      "purity": "22K",
      "rating": 4.5,
      "reviews": 12,
      "stock": 10
    }
  ],
  "total": 100
}
```

### Get Product by ID
```
GET /products/:id
Authorization: Bearer {token}

Response (200):
{
  "_id": "product-id",
  "name": "Gold Ring",
  "description": "Beautiful gold ring",
  "price": 25000,
  "originalPrice": 30000,
  "discount": 17,
  "metalType": "Gold",
  "polishType": "High Polish",
  "image": "image-url",
  "images": ["image-url-1", "image-url-2"],
  "weight": "5.2",
  "purity": "22K",
  "rating": 4.5,
  "reviews": 12,
  "stock": 10,
  "relatedProducts": [...]
}
```

### Search Products
```
GET /products/search?query=gold+ring
Authorization: Bearer {token}

Query Parameters:
- query: Search keyword

Response (200):
[
  {
    "_id": "product-id",
    "name": "Gold Ring",
    ...
  }
]
```

---

## Category Endpoints

### Get All Categories
```
GET /categories
Authorization: Bearer {token}

Response (200):
[
  {
    "_id": "category-id",
    "name": "Rings",
    "description": "Beautiful jewelry rings",
    "icon": "💍"
  },
  {
    "_id": "category-id-2",
    "name": "Necklaces",
    "description": "Elegant necklaces",
    "icon": "📿"
  }
]
```

### Get Category by ID
```
GET /categories/:id
Authorization: Bearer {token}

Response (200):
{
  "_id": "category-id",
  "name": "Rings",
  "description": "Beautiful jewelry rings",
  "icon": "💍"
}
```

### Get Category Products
```
GET /categories/:id/products?page=1&limit=20
Authorization: Bearer {token}

Query Parameters:
- page: Page number
- limit: Items per page

Response (200):
{
  "data": [...products],
  "total": 50
}
```

---

## Order Endpoints

### Create Order
```
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "items": [
    {
      "productId": "product-id",
      "quantity": 2,
      "price": 25000
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "addressLine1": "123 Street",
    "addressLine2": "Apt 4",
    "city": "Delhi",
    "state": "Delhi",
    "pincode": "110001"
  },
  "totalAmount": 50000
}

Response (201):
{
  "_id": "order-id",
  "items": [...],
  "shippingAddress": {...},
  "totalAmount": 50000,
  "status": "pending",
  "createdAt": "2026-01-20T10:00:00Z"
}
```

### Get User's Orders
```
GET /orders
Authorization: Bearer {token}

Response (200):
[
  {
    "_id": "order-id",
    "items": [...],
    "totalAmount": 50000,
    "status": "pending",
    "createdAt": "2026-01-20T10:00:00Z"
  }
]
```

### Get Order Details
```
GET /orders/:id
Authorization: Bearer {token}

Response (200):
{
  "_id": "order-id",
  "items": [
    {
      "productId": {
        "_id": "product-id",
        "name": "Gold Ring",
        "image": "url"
      },
      "quantity": 2,
      "price": 25000
    }
  ],
  "shippingAddress": {...},
  "totalAmount": 50000,
  "status": "processing",
  "createdAt": "2026-01-20T10:00:00Z",
  "updatedAt": "2026-01-20T10:30:00Z"
}
```

### Update Order Status
```
PUT /orders/:id
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "status": "shipped"
}

Response (200):
{
  "_id": "order-id",
  "status": "shipped",
  ...
}

Status Options: pending, processing, shipped, delivered, cancelled
```

---

## Filter Endpoints

### Get Metal Types
```
GET /filters/metal-types
Authorization: Bearer {token}

Response (200):
["Gold", "Silver", "Platinum", "Diamond"]
```

### Get Polish Types
```
GET /filters/polish-types
Authorization: Bearer {token}

Response (200):
["High Polish", "Matte", "Brushed", "Hammered"]
```

### Get Price Range
```
GET /filters/price-range
Authorization: Bearer {token}

Response (200):
{
  "min": 1000,
  "max": 1000000
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid request parameters",
  "errors": {
    "email": "Email is required"
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Token is invalid or expired"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "message": "Email already exists"
}
```

### 500 Internal Server Error
```json
{
  "message": "Something went wrong on the server"
}
```

---

## Request Headers

All requests should include:
```
Content-Type: application/json
Authorization: Bearer {token}  (for authenticated endpoints)
```

---

## Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Exceeding limit returns 429 Too Many Requests

---

## Pagination

List endpoints support pagination:
```
GET /products?page=2&limit=20

Response includes:
{
  "data": [...items],
  "total": 100,
  "page": 2,
  "limit": 20,
  "totalPages": 5
}
```

---

## API Testing Tools

### Using cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get Products
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer {token}"
```

### Using Postman
1. Import the collection from backend
2. Set variables: `base_url`, `token`
3. Run requests with Bearer token

### Using VS Code REST Client
Create a `.http` file:
```http
### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

### Get Products
GET http://localhost:5000/api/products
Authorization: Bearer {{token}}
```

---

## Common Issues & Solutions

### Issue: 401 Unauthorized
**Cause**: Token is missing or expired
**Solution**: Login again to get a new token

### Issue: 404 Not Found
**Cause**: Invalid product/order ID
**Solution**: Verify the ID is correct

### Issue: CORS Error
**Cause**: Backend doesn't allow requests from frontend URL
**Solution**: Configure CORS on backend

### Issue: Request Timeout
**Cause**: Backend is not responding
**Solution**: Check if backend server is running

---

## API Usage in Components

### Example: Get Products
```javascript
import { productsAPI } from '../services/apiEndpoints';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/slices/productsSlice';

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getProducts();
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchProducts();
}, []);
```

### Example: Create Order
```javascript
import { ordersAPI } from '../services/apiEndpoints';

const handleCheckout = async (orderData) => {
  try {
    const response = await ordersAPI.createOrder(orderData);
    console.log('Order created:', response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};
```

---

## Best Practices

1. ✅ Always use try-catch for API calls
2. ✅ Handle errors gracefully with toast notifications
3. ✅ Show loading states during API calls
4. ✅ Validate data before sending
5. ✅ Use environment variables for API URL
6. ✅ Implement request/response interceptors
7. ✅ Cache API responses when possible
8. ✅ Use proper HTTP methods (GET, POST, PUT, DELETE)

---

**For Backend API Documentation, refer to the backend repository**
