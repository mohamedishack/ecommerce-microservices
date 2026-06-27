import React from 'react'

const SearchBar = ({ search, setSearch, category, setCategory }) => {
    return (
        <>
            {/* Search */}
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: "8px", marginBottom: "10px", width: "200px" }}
            />

            {/* Category Filter */}
            <select
                onChange={(e) => setCategory(e.target.value)}
                style={{ padding: "8px", marginLeft: "10px" }}
            >
                <option value="">All</option>
                <option value="mobile">Mobile</option>
                <option value="laptop">Laptop</option>
            </select>
        </>
    )
}

export default SearchBar