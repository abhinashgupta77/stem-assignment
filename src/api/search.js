import { useQuery } from 'react-query';

/**
 * A custom hook for performing search queries with flexible query parameter handling.
 * 
 * @param {Object} params - The parameters for the search query.
 * @param {string} params.url - The base URL for the API request.
 * @param {Object} [params.queryParams={}] - An object containing the query parameters.
 * @param {string} params.queryKey - The key used in the query cache.
 * @param {string} [params.searchType='search'] - Specifies how to include the search term in the URL. 
 *   Can be 'query' for query parameters or 'path' for URL path.
 * @param {string} [params.queryParamKey='search'] - The key name used in queryParams for the search term.
 * 
 * @returns {Object} The result of the useQuery hook, including data, error, and loading state.
 */

export const useSearch = ({
    url, // The base URL for the API request.
    queryParams = {}, // An object containing the query parameters.
    queryKey, // The key used in the query cache.
    searchType = 'search', // 'query' for query params, 'path' for URL path
    queryParamKey = 'search', // Key name for search term in queryParams
}) => {
    // Construct the query string based on the provided query parameters
    const queryString = new URLSearchParams({
        [queryParamKey]: queryParams[queryParamKey] || ''
    }).toString();

    // Determine the fetch URL based on the search type
    const fetchUrl = searchType === 'path'
        ? `${url}/${queryParams[queryParamKey] || ''}`
        : `${url}?${queryString}`;

    return useQuery(
        [queryKey, queryParams], // Unique key for the query, used for caching
        () => fetch(fetchUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network error');
                }
                return response.json();
            })
            .catch((error) => {
                throw new Error(error.message);
            }),
        {
            staleTime: Infinity, // Prevent query data from becoming stale; no automatic refetch
            enabled: !!queryParams[queryParamKey] || searchType === 'path', // Only fetch if there's a search term or if using path search
        }
    );
};
