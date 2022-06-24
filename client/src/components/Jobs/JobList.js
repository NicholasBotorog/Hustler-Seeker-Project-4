import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/auth'

import { Col, Button, Card, Container } from 'react-bootstrap'

import { userIsOwner } from '../helpers/auth'


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
    <>
      <Col style={{ maxWidth: '300px', display: 'flex', flexWrap: 'wrap' }}>
        <Link  style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/jobs/${job.id}`}>
          <Card bg='dark' text='light' style={{ height: '150px', overflow: 'hidden', width: '250px', margin: '20px 10px 0 10px', textAlign: 'center' }} >
            <Card.Header>{job.company}</Card.Header>
            <Card.Body>
              <Card.Title>
                {job.title}
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
        <div>
          {userIsOwner(job.owner.id) && (
            <div className="owner-buttons mb-4">
              <Button variant="light" onClick={() => handleDelete(job.id)} style={{ fontWeight: 'bold' }}>Delete Post</Button>
              <Link className='btn btn-light' style={{ marginLeft: '10px', fontWeight: 'bold' }} to={`/jobs/${job.id}/edit/`}>Edit Post</Link>
            </div>
          )}
        </div>
      </Col>
    </>
  )
}

export default JobList
