import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import SearchDropdown from './SearchDropdown';

import { useSearch } from '../api/search';

// // Mock the useSearch hook
jest.mock('../api/search', () => ({
    useSearch: jest.fn(),
}));

describe('SearchDropdown', () => {
    beforeEach(() => {
        useSearch.mockClear();
    });

    it('renders the input field and placeholder text', () => {
        useSearch.mockReturnValue({
            data: { results: [] },
            error: null,
            isLoading: false,
        });
        render(<SearchDropdown placeholder="Search for items" />);
        expect(screen.getByPlaceholderText(/search for items/i)).toBeInTheDocument();
    });

    it('shows loading spinner when isLoading is true', () => {
        useSearch.mockReturnValue({
            data: {},
            error: null,
            isLoading: true,
        });
        render(<SearchDropdown />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('displays results in the dropdown when results are fetched', async () => {
        useSearch.mockReturnValue({
            data: { results: [{ name: 'Item 1' }, { name: 'Item 2' }] },
            error: null,
            isLoading: false,
        });
        render(<SearchDropdown />);
        fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'Item 1' } });
        await waitFor(() => {
            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
        });
    });

    it('shows no results found message when there are no results', async () => {
        useSearch.mockReturnValue({
            data: { results: [] },
            error: null,
            isLoading: false,
        });
        render(<SearchDropdown />);
        fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'Item 1' } });
        await waitFor(() => {
            expect(screen.getByText('No results found')).toBeInTheDocument();
        });
    });

    it('hides dropdown when clicking outside', async () => {
        useSearch.mockReturnValue({
            data: { results: [{ name: 'Item 1' }] },
            error: null,
            isLoading: false,
        });
        render(<SearchDropdown />);
        fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'Item 1' } });
        await waitFor(() => {
            expect(screen.getByText('Item 1')).toBeInTheDocument();
        });

        // Simulate click outside
        fireEvent.mouseDown(document.body);
        await waitFor(() => {
            expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
        });
    });

    it('adds item to selected items list on selection', async () => {
        useSearch.mockReturnValue({
            data: { results: [{ name: 'Item 1' }] },
            error: null,
            isLoading: false,
        });
        render(<SearchDropdown />);
        fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'Item 1' } });
        await waitFor(() => {
            fireEvent.click(screen.getByText('Item 1'));
        });
        expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('removes item from selected items list on delete', async () => {
        useSearch.mockReturnValue({
            data: { results: [{ name: 'Item 1' }, { name: 'Item 2' }] },
            error: null,
            isLoading: false,
        });
        render(<SearchDropdown placeholder="Search for items" />);

        // Add item
        fireEvent.change(screen.getByPlaceholderText(/search for items/i), { target: { value: 'Item' } });
        fireEvent.click(screen.getByText('Item 1'));

        // Verify item is added to selected items
        const chip = await screen.findByText('Item 1');
        expect(chip).toBeInTheDocument();

        // Find the delete button within the Chip using data-testid
        const deleteButton = screen.getByTestId('CancelIcon');

        // Remove item
        fireEvent.click(deleteButton);

        // Verify item is removed from selected items
        await waitFor(() => {
            expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
        });
    });

    it('clears input value after selecting an option', async () => {
        useSearch.mockReturnValue({
            data: { results: [{ name: 'Item 1' }] },
            error: null,
            isLoading: false,
        });
        render(<SearchDropdown />);
        fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'Item 1' } });
        await waitFor(() => {
            fireEvent.click(screen.getByText('Item 1'));
        });
        expect(screen.getByPlaceholderText(/search/i)).toHaveValue('');
    });
});
