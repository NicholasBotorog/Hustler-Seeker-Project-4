import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'
import  Logo from '../helpers/Logo'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'


const AddJob = () => { 

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    salary: '',
    still_open: true,
    description: '',
    job_location: '',
    job_type: '',
    display_message: '',
    website: '',
    logo: 'https://www.kindpng.com/picc/m/206-2069779_generic-company-logo-clipart-best-transparent-background-generic.png',
    tags: [],
  })
  const [errors, setErrors] = useState(false)
  const [multi, setMulti] = useState([])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleOptions = (tags) => { 
    setFormData({ ...formData, tags: tags.map((tag) => tag.id) })
  }

  useEffect( () => { 
    const getTags = async () => { 
      const { data } = await axios.get('/api/tags/')
      setMulti(data)
    }
    getTags()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/jobs/', formData, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      navigate(`/jobs/${data.id}`)
    } catch (error) {
      console.log(error)
      console.log(error.response)
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }


  const animatedComponents = makeAnimated()

  return (
    <section className="form-page">
      <Container style={{ marginBottom: '30px' }}>
        <Row>
          <form className='col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-5' onSubmit={handleSubmit}>
            <h1>Looking for People? Post a Job with us ! </h1>

            {/* Image */}
            <div className="field">
              <Logo
                value= {formData.logo} onChange={handleChange}
                setFormData={setFormData}
              />
            </div>
            {errors.logo && <p className='text-danger'>{errors.logo}</p>} 


            {/* Company */}
            <label htmlFor="company">Company</label>
            <input type="text" name="company" className='input' placeholder='Company' value={formData.company} onChange={handleChange} />
            {errors.company && <p className='text-danger'>{errors.company}</p>}

            {/* Title */}
            <label htmlFor="title">Title</label>
            <input type="text" name="title" className='input' placeholder='Title' value={formData.title} onChange={handleChange} />
            {errors.title && <p className='text-danger'>{errors.title}</p>}

            {/* Display Message */}
            <label htmlFor="display_message">Company Info</label>
            <input type="text" name="display_message" className='input' placeholder='Short Description' value={formData.display_message} onChange={handleChange} />
            {errors.display_message && <p className='text-danger'>{errors.display_message}</p>}

            {/* Description */}
            <label htmlFor="description">Description</label>
            <textarea name="description" className='input' placeholder='Description' value={formData.description} onChange={handleChange}></textarea>
            {errors.description && <p className='text-danger'>{errors.description}</p>}

            {/* Job Location */}
            <label htmlFor="job_location">Job Location</label>
            <input type="text" name="job_location" className='input' placeholder='Job Location' id='job-location' value={formData.job_location} onChange={handleChange} />
            {errors.job_location && <p className='text-danger'>{errors.job_location}</p>}

            {/* Type */}
            <label htmlFor="job_type">Type</label>
            <input type="text" name="job_type" className='input' placeholder='Type' value={formData.job_type} onChange={handleChange} />
            {errors.job_type && <p className='text-danger'>{errors.job_type}</p>}

            {/* Salary */}
            <label htmlFor="salary">Salary</label>
            <input type="text" name="salary" className='input' placeholder='Salary' value={formData.salary} onChange={handleChange} />
            {errors.salary && <p className='text-danger'>{errors.salary}</p>}

            {/* Tags */}
            <label htmlFor="tags">Tags</label>
            <Select  
              options={multi.map((multi) => ({
                id: multi.id,
                value: multi.id,
                label: multi.name, 
              }))}
              components = {animatedComponents}
              isMulti
              name='tags'
              onChange={handleOptions}
            />

            {/* Website*/}
            <label htmlFor="website">Website</label>
            <input type="text" name="website" className='input' placeholder='Website' value={formData.website} onChange={handleChange} />
            {errors.website && <p className='text-danger'>{errors.website}</p>}
            
            {/* Submit */}
            <button type="submit" className="btn btn-secondary w-100 mt-4">Post</button>
          </form>
        </Row>
      </Container>
    </section>

  )
}

export default AddJob