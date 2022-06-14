import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { getUserId, userIsOwner } from '../Helpers/auth'
import { getTokenFromLocalStorage, getPayload } from '../Helpers/auth'
import Jobs from './Jobs'

const SingleJob = () => { 

  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [errors, setErrors] = useState(false)

  const getSingleJob = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/jobs/${id}/`)
      setJob(data)
      console.log(data)
    } catch (error) {
      setErrors(true)
    }
  }, [id])

  useEffect(() => {
    getSingleJob()
  }, [getSingleJob])

  const handleDelete = async () => { 
    try {
      await axios.delete(`/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      navigate('/jobs/')
    } catch (error) { 
      console.log(error)
    }
  }

  const handleApply = async () => { 
    try { 
      await axios.post('/api/aplication/', {
        job: job.id,
        applied: true,
      },
      {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      }
      )
      await getSingleJob()
    } catch (error) { 
      console.log(error)
    }
  }

  const handleDeleteAplication = async(aplicationId) => {
    try {
      await axios.delete(`/api/aplication/${aplicationId}/`, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      await getSingleJob()
    } catch (error) {
      console.log(error)
    }
  } 

  const userId = getUserId()
  const apply = job && job.aplication.find((aplication) => aplication.owner === userId)
  const userAplication = userId && !!apply

  console.log('USER IS APLLYING', userAplication)

  return (
    <Container className="mt-4">
      <Row>
        { job ? 
          <>
            <Col xs="12">
              <h1>{job.company}</h1>
              <hr />
            </Col>
            <Col md="6">
              <p>{job.title}</p>
              <hr />
              <p>{job.description}</p>
              <hr />
              <p>{job.job_location}</p>
              <hr />
              <p>{job.salary}</p>
              <hr />
              <div>
                { userAplication ? (
                  <Button className="ml-3" variant="danger" onClick={() => handleDeleteAplication(apply.id)}>
                    Unapply
                  </Button>
                ) :
                  (
                    <Button className="ml-3" variant="success" onClick={handleApply}>
                    Apply 
                    </Button>
                  )
                }
              </div>
              {userIsOwner(job.owner.id) && (
                <div className="owner-buttons mb-4">
                  <Button className="ml-3" variant="danger" onClick={handleDelete}>Delete Post</Button>
                  <Link className='btn btn-primary ml-3' to={`/jobs/${job.id}/edit/`}>Edit Post</Link>
                </div>
              )}
              <div>
                {job.tags.map((tag) => (
                  <ul key={tag.name}>
                    {tag.name}
                  </ul>
                ))}
              </div>
              <Link to="/jobs" className='btn btn-secondary'>Back to Jobs</Link>
            </Col>
          </>
          :
          <h2 className='text-center'>
          Something went wrong! Please try again later!
          </h2>
        }
      </Row>
    </Container>
  )
}

export default SingleJob