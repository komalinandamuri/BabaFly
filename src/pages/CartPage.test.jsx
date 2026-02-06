import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import CartPage from '../pages/CartPage';
import { BrowserRouter } from 'react-router-dom';

describe('CartPage', () => {
  test('renders empty cart message', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CartPage />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
