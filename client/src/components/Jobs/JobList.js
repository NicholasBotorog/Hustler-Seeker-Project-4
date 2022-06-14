import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage, getPayload } from '../Helpers/auth'

import { Row, Col, Button, Card, Container } from 'react-bootstrap'

import { userIsOwner } from '../Helpers/auth'

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

  return (
    <Container className="mt-4 job-user">

      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/jobs/${job.id}`} >
        <Col className='job-list'>
          <Card bg='dark' text='light' style={{ width: '18rem' }} className='mb-2'>
            <Card.Header>{job.company}</Card.Header>
            <Card.Body>
              <Card.Title>
                {job.title}
              </Card.Title>
              <Card.Text>{job.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Link>

      { userIsOwner(job.owner.id) && (
        <div className="owner-buttons mb-4">
          <Button variant="danger" onClick={() => handleDelete(job.id)}>Delete Post</Button>
          <Link className='btn btn-primary' to={`/jobs/${job.id}/edit/`}>Edit Post</Link>
        </div>
      )}
      <Link to="/jobs" className='btn btn-warning'>All Jobs</Link>
    </Container>
  )
}

export default JobList
