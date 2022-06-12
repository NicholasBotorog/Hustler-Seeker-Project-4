import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'


const Jobs = () => { 

  const navigate = useNavigate()
  const { id } = useParams()
  const [ jobs, setJobs ] = useState([])
  const [errors, setErrors] = useState(false)

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

  return <>
    <h1>Our jobs:</h1>
    <ul>
      <li>
        {jobs.map((job) => {
          return (
            <>
              <Link to={`/jobs/${job.id}/`}>
                <div >
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
      </li>
    </ul>
  </>
}

export default Jobs