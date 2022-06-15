import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Card, Container, Form, FormControl } from 'react-bootstrap'
import Select from 'react-select'
import Job from './JobShow'

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
    job: 'All',
    searchTerm: '',
    tags: 'All',
    location: '',
  })

  const [location, setLocation] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/jobs/')
        console.log(data)
        setJobs(data)
        setJobsToShow(data.slice(0, 2))
      } catch (error){
        console.log(error)
        setErrors(error)
      }
    }
    getData()
  }, [])

  const handleChange = (e) => { 
    setFilters({ ...filters, [e.target.name]: e.target.value })
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
      tags.forEach(tag => tagList.includes(tag.name) ? '' : tagList.push)
    }
  })

  useEffect(()=>{
    if (jobs.length) { 
      const regexSearch = new RegExp(filters.searchTerm, 'i')
      const filtered = jobs
        .filter((job) => {
          return regexSearch.test(job.title) || regexSearch.test(job.company)
        })
      setFilteredJobs(filtered)
    }
  }, [filters, jobs])

  filteredJobs.sort()

  // const locationSelectOption = [
  //   { value: 'Baku', label: 'Baku' },
  //   { valut: 'Bacau', label: 'Bacau' }
  // ]

  // const handleLocationSelect = (selected) => { 
  //   const selectedLocation = selected.map(item=>item.value)
  //   setLocation(selectedLocation)
  // }

  // const JobFiltered2 = (jobs) => {
  //   return jobs.filter(job => {
  //     return (location.includes(job.job_location) || location.length === 0) 
  //   })
  // }

  return (
  // <Container className='mt-4'>
  //   {jobs && !errors && (
  //     <>
  //       <>
  //         <h1>Our jobs:</h1>
  //         <Container className='search-section'>
  //           <div className='search-dropdown'>
  //             <label className="p-1">Location</label>
  //             <Select
  //               options={locationSelectOption}
  //               // components = {animatedComponents}
  //               isMulti
  //               onChange={handleLocationSelect}
  //               value={location.map(item => ({
  //                 label: item[0] + item.substring(1),
  //                 value: item,
  //               }))} />
  //           </div>

    //           <Form className='search-field'>
    //             <Form.Group >
    //               <FormControl className='search-bar' type="search" name="searchTerm" value={filters.searchTerm} placeholder="Looking for Work ?" onChange={handleChange} />
    //             </Form.Group>
    //           </Form>
    //         </Container>
    //       </>
    //       <Container className='mt-5 jobs-main'
    //         // style={{ width: 'calc((100% / 2) ' }}
    //       >
    //         <Row style={{ width: '30px' }}>
    //           {filteredJobs
    //             .slice(0, page * jobsPerPage)
    //             .map((job) => {
    //               return (
    //                 <>
    //                   <div className='job-show'>
    //                     <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/jobs/${job.id}/`}>
    //                       <Col md='6'  xs='12' className='job-list mb-4' >
    //                         <Card bg='dark' text='light' style={{ width: '18rem' }} className='mb-2'>
    //                           <Card.Header>{job.company}</Card.Header>
    //                           <Card.Body>
    //                             <Card.Title>
    //                               {job.title}
    //                             </Card.Title>
    //                             <Card.Text>{job.description}</Card.Text>
    //                           </Card.Body>
    //                         </Card>
    //                       </Col>
    //                     </Link>
    //                   </div>
    //                 </>
    //               )
    //             })}
    //         </Row>
    //       </Container>
    //       <div>
    //         {page < totalPages && (
    //           <Button onClick={() => setPage(page + 1)}>
    //             Load more ..
    //           </Button>
    //         )}
    //       </div>
    //     </>
    //   )
    //   }
    // </Container>
    <>
      <Container className='header'>
        <div className='header-img'>
          <Card className='job-hero'>
            <Card.Img src="https://t4.ftcdn.net/jpg/04/36/95/29/360_F_436952958_gDv0jD4Zf0vMte9qBssJRLUhEbGm1NQY.jpg" />
            <Card.ImgOverlay>
              <Container className='search-section' style ={{ marginTop: '320px' }}>
                <Form className='search-field'>
                  <Form.Group >
                    <FormControl className='search-bar' type="search" name="searchTerm" value={filters.searchTerm} placeholder="Looking for Work ?" onChange={handleChange} />
                  </Form.Group>
                </Form>
              </Container>
            </Card.ImgOverlay>
          </Card>
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
