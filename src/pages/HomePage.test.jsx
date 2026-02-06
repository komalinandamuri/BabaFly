import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import HomePage from '../pages/HomePage';

describe('HomePage', () => {
  test('renders homepage without crashing', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    const headings = screen.queryAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });
});
