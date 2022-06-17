import React from 'react'

const FiltersCompany = ({ filters, companies, handleChange }) => {
  return (
    <div className="filter-container">
      <select className = 'text-muted' style={{ border: '0 none', outline: '0 none', height: '43px', margin: '5px', marginRight: '10px', padding: '0 1rem', borderRadius: '5px', textAlign: 'center' }} name="location" value={filters.location} onChange={handleChange}>
        <option value="All">Company</option>
        {companies.map(company=> <option key={company} value={company}>{company}</option>)}
      </select>
    </div>
  )
}

export default FiltersCompany
