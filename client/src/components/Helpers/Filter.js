import React from 'react'
import Select from 'react-select'
import { Form, FormControl } from 'react-bootstrap'

const Filters = ({ filters, jobLocation, handleChange }) => {
  return (
    <div className="filter-container">
      <select name="location" value={filters.location} onChange={handleChange}>
        <option value="All">All</option>
        {jobLocation.map(location=> <option key={location} value={location}>{location}</option>)}
      </select>
    </div>
  )
}

export default Filters