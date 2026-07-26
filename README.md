# React Async Search Dropdown

A reusable asynchronous search and multi-select dropdown built with **React**, **Vite**, **Material UI**, and **React Query**.

The project demonstrates a configurable search component that can query remote APIs, debounce user input, display dynamic results, and allow users to select multiple items.

## Features

- 🔍 Asynchronous API-based search
- ⏱️ Debounced search input to reduce unnecessary API requests
- 🏷️ Multi-select support with removable chips
- 🔄 Loading state while fetching results
- ⚠️ Error handling
- 📭 Empty search result handling
- 🚫 Duplicate selection prevention
- ⚙️ Configurable API endpoint
- 🔗 Supports query parameter and URL path based searches
- 🧩 Configurable response mapping
- ♻️ Reusable React component architecture
- ♿ Basic accessibility support
- ⚡ Built with Vite

## Tech Stack

- React
- Vite
- Material UI
- TanStack React Query
- JavaScript
- PropTypes

## SearchDropdown

The core of the project is a reusable `SearchDropdown` component.

It can be configured for different APIs without changing the internal component implementation.

Example:

```jsx
<SearchDropdown
  placeholder="Search people..."
  apiUrl="https://swapi.dev/api/people/"
  queryKey="people"
  queryParamKey="search"
  itemKey="name"
  itemLabel="name"
  dataMapper={(data) => data.results || []}
/>
