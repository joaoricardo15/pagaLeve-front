import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

test('renders carbon footprint form', async () => {
    render(<App />);
    expect(
      screen.getByRole("link", { name: "Sinai logo" })
    ).toBeInTheDocument();
    expect(
      await screen.findAllByRole("spinbutton")
    ).toHaveLength(3)
    expect(
      screen.getByRole("button", { name: "Simulate" })
    ).toBeInTheDocument();
});
