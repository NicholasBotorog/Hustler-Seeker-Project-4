import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { userIsOwner } from '../Helpers/auth'
import { getTokenFromLocalStorage, getPayload } from '../Helpers/auth'

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
              {userIsOwner(job.owner.id) && (
                <div className="owner-buttons mb-4">
                  <Button classname="ml-3" variant="danger" onClick={handleDelete}>Delete Post</Button>
                  <Link className='btn btn-primary ml-3' to={`/jobs/${job.id}/edit/`}>Edit Post</Link>
                </div>
              )}
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