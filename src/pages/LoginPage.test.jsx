import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import LoginPage from '../pages/LoginPage';
import { BrowserRouter } from 'react-router-dom';

describe('LoginPage', () => {
  test('renders login form', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  test('shows validation errors', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </BrowserRouter>
    );
    const button = screen.getByRole('button', { name: /login/i });
    fireEvent.click(button);
    // Wait for async validation
    setTimeout(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    }, 100);
  });
});
