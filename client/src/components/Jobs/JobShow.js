import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Collapse, Col } from 'react-bootstrap'
import { userIsOwner } from '../helpers/auth'


export default function Job({ job }) {

  const [open, setOpen] = useState(false)

  return (
    <Col className='job-col'>
      <Card className="mb-3 ">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Title>
                {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
              </Card.Title>
              <Card.Subtitle className="text-muted mb-2">
                {new Date(job.created_at).toLocaleDateString()}
              </Card.Subtitle>
              <span className = "badge bg-secondary" style={{ marginRight: '10px' }}>{job.job_type}</span>
              {job.tags.map((tag) => (
                <span className ="badge bg-secondary" style={{ marginRight: '10px' }} key={tag.name}>
                  {tag.name}
                </span>
              ))}
              <span className = "badge bg-secondary">{job.job_location}</span>
              <div style={{ wordBreak: 'break-all', marginTop: '10px' }}>
                <a href={job.website} target='_blank' rel="noreferrer">{job.website}</a>
              </div>
            </div>
            <img className="d-none d-md-block" height="50" alt={job.company} src={job.logo} />
          </div>
          <Card.Text className='mt-3'>
            <Button
              onClick={() => setOpen(prevOpen => !prevOpen)}
              variant="primary"
            >
              {open ? 'Hide Details' : 'View Details'}
            </Button>
          </Card.Text>
          <Collapse in={open}>
            <div className="mt-4">
              <p>{job.display_message}</p>
              <Link className='btn btn-light' style={{ marginBottom: '5px', marginTop: '10px' }} to={`/jobs/${job.id}/`}>I am Interested!</Link>
              {userIsOwner(job.owner.id) && (
                <div className="owner-buttons mb-4">
                  <Link className='btn btn-light' style={{ marginBottom: '5px', marginTop: '5px' }} to={`/jobs/${job.id}/edit/`}>Edit Post</Link>
                </div>
              )}
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </Col>
  )
}
