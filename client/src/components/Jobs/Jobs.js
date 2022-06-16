import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Card, Container, Form, FormControl } from 'react-bootstrap'
import Select from 'react-select'
import Job from './JobShow'
import Filters from '../Helpers/Filter'
import SelectTags from '../Helpers/TagsFilter'

const Jobs = () => { 

  const navigate = useNavigate()

  const { id } = useParams()

  const [params, setParams] = useState({})

  const [ jobs, setJobs ] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [page, setPage] = useState(1)
  const [tags, setTags] = useState([])
  const [jobsToShow, setJobsToShow] = useState([])
  const [errors, setErrors] = useState(false)
  const [filters, setFilters] = useState({
    searchTerm: '',
    tags: 'All',
    location: 'All',
  })

  const [location, setLocation] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/jobs/')
        console.log(data)
        setJobs(data)
      } catch (error){
        console.log(error)
        setErrors(error)
      }
    }
    getData()
  }, [])

  const handleChange = (e) => { 
    setFilters({ ...filters, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }

  const jobsPerPage = 3
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  useEffect( () => { 
    const getTags = async () => { 
      const { data } = await axios.get('/api/tags/')
      setTags(data)
    }
    getTags()
  }, [])

  useEffect(() => { 
    if (tags.length) {
      const tagList = []
      tags.forEach(tag => tagList.includes(tag) ? '' : tagList.push(tag))
    }
  }, [tags])

  useEffect(() => {
    if (jobs.length) {
      const locationList = []
      jobs.forEach(job => locationList.includes(job.job_location) ? '' : locationList.push(job.job_location))
      setLocation(locationList)
    }
  }, [jobs])

  useEffect(()=>{
    if (jobs.length) { 
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      const filtered = jobs
        .filter((job) => {
          return ( regexSearch.test(job.title) || regexSearch.test(job.company) ) && (job.job_location === filters.location || filters.location === 'All')  && (job.tags.name === filters.tags || filters.tags === 'All') 
        })
        // regexSearch.test(job.title) || regexSearch.test(job.company)
        // ( regexSearch.test(job.title) || regexSearch.test(job.company) ) && (job.job_location === filters.location || filters.location === 'All')
      setFilteredJobs(filtered)
    }
  }, [filters, jobs])

  filteredJobs.sort()


  return (
  
    <>
      <Container className='header'>
        <div className='header-img'>
          <Card.Body className='randomImg' style={{ backgroundImage: 'url(https://t4.ftcdn.net/jpg/04/36/95/29/360_F_436952958_gDv0jD4Zf0vMte9qBssJRLUhEbGm1NQY.jpg)' }}>
            <Form className='search-field' style={{ marginTop: '200px' }}>
              <Form.Group style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center' }}>
                <FormControl style={{ marginRight: '10px', height: '43px', marginTop: '4px' }} className='search-bar' type="search" name="searchTerm" value={filters.searchTerm} placeholder="Looking for Work ?" onChange={handleChange} />
                <Filters filters={filters} jobLocation={location} handleChange={handleChange} />
                <SelectTags filters={filters} tags={tags} handleChange={handleChange} />
              </Form.Group>
            </Form>
          </Card.Body>
        </div>
      </Container>

      {/* <Container className='search-section'>
        <Form className='search-field'>
          <Form.Group >
            <FormControl className='search-bar' type="search" name="searchTerm" value={filters.searchTerm} placeholder="Looking for Work ?" onChange={handleChange} />
          </Form.Group>
        </Form>
      </Container> */}
      

      <Container className='mt-2'>
        {filteredJobs
          .slice(0, page * jobsPerPage).map(job => {
            return <Job key={job.id} job={job} />
          })}
        <div className='loading-button'>
          {page < totalPages && (
            <Button variant='secondary' className='mb-5' onClick={() => setPage(page + 1)}>
                Load more ...
            </Button>
          )}
        </div>
      </Container>
    </>
  )
}

export default Jobs
