import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../src/app/(root)/layout';  // Adjust the import path if needed


// Mock dependencies
jest.mock('../src/components/shared/Sidebar', () => () => <div data-testid="sidebar">Sidebar</div>);
jest.mock('../src/components/shared/MobileNav', () => () => <div data-testid="mobile-nav">MobileNav</div>);
jest.mock('../src/components/ui/toaster', () => ({ Toaster: () => <div data-testid="toaster">Toaster</div> }));

describe('Layout Component', () => {
  it('renders Sidebar, MobileNav, Toaster and children', () => {
    // Render the Layout with mock children
    render(
      <Layout>
        <div>Child content</div>
      </Layout>
    );

    // Check if Sidebar, MobileNav, and Toaster are rendered
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument();

    // Check if children are rendered
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
