import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage, getPayload } from '../Helpers/auth'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const JobList = ({ job }) => { 
  const handleDelete = async (id) => { 
    try {
      await axios.delete(`/api/jobs/${id}/`, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      window.location.reload()
    } catch (error) { 
      console.log(error)
    }
  }

  const userIsOwner = (ownerId) => {
    const payload = getPayload()
    if (!payload) return 
    return ownerId === payload.sub
  }

  return (
    <Container className="mt-4">
      <Row>
        <>
          <Col xs="12">
            <h1>{job.company}</h1>
            <hr />
          </Col>
          {/* <Col md="6">
            <img src={cheese.image} alt={cheese.name} />
          </Col> */}
          <Col md="6">
            <p>{job.title}</p>
            <hr />
            <p>{job.description}</p>
            <hr />
            <p>{job.job_location}</p>
            <hr />
            { userIsOwner(job.owner.id) && (
              <div className="owner-buttons mb-4">
                <Button variant="danger" onClick={handleDelete}>Delete Post</Button>
                <Link className='btn btn-primary' to={`/jobs/${job.id}/edit`}>Edit Post</Link>
              </div>
            )}
            <Link to="/jobs" className='btn btn-warning'>All Jobs</Link>
          </Col>
        </>
      </Row>
    </Container>
  )
}

export default JobList
