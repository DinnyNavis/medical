import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const DoctorSearch = ({ onSearch, onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        specialty: '',
        sortBy: 'name'
    });

    const specialties = ['All', 'Pediatrician', 'Nutritionist', 'Dentist', 'Cardiologist'];

    const handleSearch = (value) => {
        setSearchTerm(value);
        onSearch(value);
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        setFilters({ specialty: '', sortBy: 'name' });
        setSearchTerm('');
        onSearch('');
        onFilterChange({ specialty: '', sortBy: 'name' });
    };

    return (
        <div className="doctor-search-container">
            {/* Search Bar */}
            <div className="search-bar-wrapper">
                <div className="search-bar">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search doctors by name or specialty..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button className="clear-search" onClick={() => handleSearch('')}>
                            <X size={18} />
                        </button>
                    )}
                </div>
                <button
                    className={`filter-toggle ${showFilters ? 'active' : ''}`}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter size={20} />
                    <span>Filters</span>
                </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="filter-panel">
                    <div className="filter-group">
                        <label>Specialty</label>
                        <div className="specialty-chips">
                            {specialties.map(spec => (
                                <button
                                    key={spec}
                                    className={`chip ${filters.specialty === spec ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('specialty', spec === 'All' ? '' : spec)}
                                >
                                    {spec}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Sort By</label>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            className="filter-select"
                        >
                            <option value="name">Name (A-Z)</option>
                            <option value="specialty">Specialty</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>

                    <button className="clear-filters" onClick={clearFilters}>
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default DoctorSearch;
