import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';

import SearchDropdown from './components/SearchDropdown';

const apiUrl = 'https://swapi.dev/api/people/';

// Define how to extract and map data from the API response
const dataMapper = (data) => data.results || [];

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='App'>
                <h1>Search Star Wars characters</h1>
                <SearchDropdown
                    placeholder="Search characters..."
                    apiUrl={apiUrl}
                    queryKey="starWarsCharacters"
                    dataMapper={dataMapper}
                    itemKey="name"
                    itemLabel="name"
                    queryParamKey="search"
                    searchType="query"
                />
            </div>
        </QueryClientProvider>
    )
}

export default App;
