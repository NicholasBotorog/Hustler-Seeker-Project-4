import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import Select from 'react-select'

import { Container, Row, Col, Card, Form, FormControl, Spinner, Button } from 'react-bootstrap'
import JobList from './JobList'

const Jobs = () => { 

  const navigate = useNavigate()

  const { id } = useParams()

  const [ jobs, setJobs ] = useState([])
  const [jobsToShow, setJobsToShow] = useState([])
  const [errors, setErrors] = useState(false)
  const [filters, setFilters] = useState({
    job: 'All',
    searchTerm: '',
    tags: 'All',
    location: '',
  })
  const [filteredJobs, setFilteredJobs] = useState([])
  const [page, setPage] = useState(1)

  const [tags, setTags] = useState([])
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

  // useEffect(()=>{
  //   if (jobs.length) { 
  //     const regexSearch = new RegExp(filters.searchTerm, 'i')
  //     const filtered = jobs
  //       .filter((job) => {
  //         return regexSearch.test(job.title) || regexSearch.test(job.company) || (filters.name === 'All') && (job.tag === filters.tags || filters.tags === 'All')
  //       })
  //     setFilteredJobs(filtered)
  //   }
  // }, [filters, jobs])

  // filteredJobs.sort()

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
          return regexSearch.test(job.title) || regexSearch.test(job.company) || (filters.name === 'All') && (job.tags === filters.tags || filters.tags === 'All')
        })
      setFilteredJobs(filtered)
    }
  }, [filters, jobs])

  filteredJobs.sort()

  const locationSelectOption = [
    { value: 'Baku', label: 'Baku' },
    { valut: 'Bacau', label: 'Bacau' }
  ]

  const handleLocationSelect = (selected) => { 
    const selectedLocation = selected.map(item=>item.value)
    setLocation(selectedLocation)
  }

  const JobFiltered2 = (jobs) => {
    return jobs.filter(job => {
      return (location.includes(job.job_location) || location.length === 0) 
    })
  }

  return (
    <>
      {jobs && !errors && (
        <>
          <>
            <h1>Our jobs:</h1>

            <label className="p-1">Location</label>
            <div className="text-pawhub-grey">
              <Select  
                options={locationSelectOption}
                // components = {animatedComponents}
                isMulti
                onChange={handleLocationSelect}
                value={location.map(item=> ({
                  label: item[0] + item.substring(1),
                  value: item,
                }))}
              />
            </div>
            

            <Form>
              <Form.Group className='search'>
                <FormControl className='search-bar' type="search" name="searchTerm" value={filters.searchTerm} placeholder="Looking for Work ?" onChange={handleChange} />
              </Form.Group>
            </Form>
          </>
          <ul>
            <li>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 bg-pawhub-yellow pt-10">
                {filteredJobs
                  .slice(0, page * jobsPerPage)
                  .map((job) => {
                    return (
                      <>
                        <Link to={`/jobs/${job.id}/`}>
                          <div>
                            <hr />
                            <h1>{job.company}</h1>
                            <h2>{job.title}</h2>
                            <h3>{job.salary}</h3>
                            <hr />
                          </div>
                        </Link>
                      </>
                    )
                  })}
                <div>
                  {page < totalPages && (
                    <Button onClick={() => setPage(page + 1)}>
                      Load more ..
                    </Button>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </>
      )
      }
    </>
  )
}

export default Jobs

// const Jobs = () => { 
//   const [jobs, setJobs] = useState([])
//   const [location, setLocation] = useState([])
//   const [search, setSearch] = useState('')
//   const [tags, setTags] = useState('all')
//   const [error, setError] = useState(false)

//   const [page, setPage] = useState(1)

//   useEffect(() => { 
//     const getData = async () => { 
//       try {
//         const { data } = await axios.get('/api/jobs/')
//         setJobs(data)
//       } catch (error) {
//         setError(true)
//       }
//     }
//     getData()
//   }, [search, setJobs])

//   const handleSearch = (e) =>{ 
//     setSearch(e.target.value.toLowerCase())
//     setPage(1)
//   }

//   const handleLocation = (e) => { 
//     setLocation(e.target.value.toLowerCase())
//     setPage(1)
//   }

//   const handleTags = (e) => { 
//     setTags(e.target.value)
//     setPage(1)
//   }

//   const filteredItems = jobs
//     .filter((job) => !search || job.title.toLowerCase().includes(search))
//     .filter((job) => !location || job.job_location.toLowerCase().includes(location))
//     .

//   const itemPerPage = 3
//   const totalPages = Math.ceil(filteredItems.lenth / itemPerPage)

//   return (
//     <><>
//       <input type='text' placeholder='Search Title' id='search-field' onChange={handleSearch} />
//       <input type='text' placeholder='Location' id ='where-field' onChange={handleLocation} />
//     </><ul>
//       <li>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 bg-pawhub-yellow pt-10">
//           {filteredItems
//             .slice(0, page * itemPerPage)
//             .map((job) => (
//               <JobList key={job.id} job={job} />
//             ))}
//           <div>
//             {page < totalPages && (
//               <Button onClick={() => setPage(page + 1)}>
//                   Load more ..
//               </Button>
//             )}
//           </div>
//         </div>
//       </li>
//     </ul></>
//   )

// }

// export default Jobs