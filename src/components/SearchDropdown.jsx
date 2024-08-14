import { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
    TextField,
    MenuItem,
    Chip,
    CircularProgress,
    Box,
    Typography,
} from "@mui/material";

import { useSearch } from "../api/search";
import useDebounce from "../hooks/useDebounce";

const styles = {
    dropdown: {
        position: 'absolute',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
        zIndex: 1,
        maxHeight: '200px',
        overflowY: 'auto',
        width: '100%',
    },
    chip: {
        marginRight: 8,
        marginBottom: 8,
    },
};

// Component to display when no search results are found
const NoResultsFound = () => (
    <Box sx={styles.dropdown}>
        <MenuItem style={{ cursor: 'default' }}>No results found</MenuItem>
    </Box>
);

/**
 * A dropdown component for searching and selecting items.
 * 
 * @param {string} props.placeholder - Placeholder text for the input field.
 * @param {string} props.apiUrl - Base URL for the API endpoint.
 * @param {string} props.queryKey - Key used in the query cache.
 * @param {Function} props.dataMapper - Function to map API response data to dropdown options.
 * @param {string} props.itemKey - Key used to identify the item in the dropdown options.
 * @param {string} props.itemLabel - Key used for the display label of the item.
 * @param {string} props.queryParamKey - Key used in the query parameters for search.
 * @param {string} props.searchType - Specifies if the search term is a query parameter or part of the URL path.
 */

const SearchDropdown = ({
    placeholder = "Search...",
    apiUrl = "https://swapi.dev/api/people/",
    queryKey = "search",
    dataMapper = (data) => data.results || [],
    itemKey = "name",
    itemLabel = "name",
    queryParamKey = "search",
    searchType = 'query',
}) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Debounced input value to reduce the number of API calls
    const debouncedInputValue = useDebounce(inputValue, 500);

    // Fetch data from the API based on the search term
    const {
        data = {},
        error,
        isLoading,
    } = useSearch({
        url: apiUrl,
        queryParams: { [queryParamKey]: debouncedInputValue },
        queryKey,
        searchType,
        queryParamKey,
    });

    // Handler for input change events
    const handleInputChange = useCallback((event) => {
        setInputValue(event.target.value);
        setIsDropdownOpen(true);
    }, []);

    // Handler for selecting an option from the dropdown
    const handleSelectOption = useCallback((option) => {
        // Check if the item is already selected
        if (!selectedItems.some((item) => item[itemKey] === option[itemKey])) {
            setSelectedItems((prevItems) => [...prevItems, option]);
        }
        setInputValue('');
        setIsDropdownOpen(false);
    }, [selectedItems, itemKey]);

    // Handler for removing a selected item
    const handleRemoveItem = useCallback((itemToRemove) => {
        // Filter out the item to remove from the selected items list
        setSelectedItems((prevItems) =>
            prevItems.filter((item) => item[itemKey] !== itemToRemove[itemKey])
        );
    }, [itemKey]);

    // Memoize results to prevent unnecessary re-renders
    const results = useMemo(() => dataMapper(data), [data, dataMapper]);

    // Determine if the 'No results found' message should be displayed
    const showNoDataFound = useMemo(() => !isLoading && debouncedInputValue && results.length === 0,
        [isLoading, debouncedInputValue, results]);

    return (
        <Box>
            <TextField
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                autoComplete="off"
                fullWidth
                aria-label={placeholder}
                aria-describedby="search-helper-text"
                InputProps={{
                    endAdornment: isLoading && <CircularProgress size={24} />,
                    startAdornment: (
                        <Box display="flex" flexWrap="wrap">
                            {selectedItems.map((item) => (
                                <Chip
                                    key={item[itemKey]}
                                    label={item[itemLabel]}
                                    onDelete={() => handleRemoveItem(item)}
                                    style={styles.chip}
                                    aria-label={`Selected ${item[itemLabel]}`}
                                />
                            ))}
                        </Box>
                    ),
                }}
            />
            {error && <Typography color="error" aria-live="polite">{error}</Typography>}
            {(results.length > 0 && isDropdownOpen) && (
                <Box
                    sx={styles.dropdown}
                    aria-live="polite"
                >
                    {results.map((option) => (
                        <MenuItem
                            key={option[itemKey]}
                            onClick={() => handleSelectOption(option)}
                            aria-label={`Select ${option[itemLabel]}`}
                        >
                            {option[itemLabel]}
                        </MenuItem>
                    ))}
                </Box>
            )}
            {showNoDataFound && <NoResultsFound />}
        </Box>
    );
};

SearchDropdown.propTypes = {
    placeholder: PropTypes.string,
    apiUrl: PropTypes.string,
    queryKey: PropTypes.string,
    dataMapper: PropTypes.func,
    itemKey: PropTypes.string,
    itemLabel: PropTypes.string,
    queryParamKey: PropTypes.string,
    searchType: PropTypes.oneOf(['query', 'path']),
};

export default SearchDropdown;
