import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, Badge, Button, Collapse, Col } from 'react-bootstrap'
import { getUserId, userIsOwner } from '../Helpers/auth'
import { getTokenFromLocalStorage, getPayload } from '../Helpers/auth'



export default function Job({ job }) {

  const [open, setOpen] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const [singleJob, setSingleJob] = useState(null)
  const [errors, setErrors] = useState(false)

  let today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') 
  const yyyy = today.getFullYear()

  today = mm + '/' + dd + '/' + yyyy

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
                {/* {new Date(job.created_at).toLocaleDateString()} */}
                {today}
              </Card.Subtitle>
              {job.tags.map((tag) => (
                <span className ="badge bg-secondary" style={{ marginRight: '10px' }} key={tag.name}>
                  {tag.name}
                </span>
              ))}
              {/* <span className = "badge bg-secondary">{job.salary}</span> */}
              <span className = "badge bg-secondary">{job.job_location}</span>
              <div style={{ wordBreak: 'break-all', marginTop: '10px' }}>
                <a href='https://ro.indeed.com/jobs?q=part%20time&l=Bucure%C8%99ti%2C%20Ilfov&vjk=12474cd6a36758be' target='_blank' rel="noreferrer">https://ro.indeed.com/jobs?q=part%20time&l=Bucure%C8%99ti%2C%20Ilfov&vjk=12474cd6a36758be</a>
              </div>
            </div>
            <img className="d-none d-md-block" height="50" alt={job.company} src='https://www.nms-mr.com/wp-content/uploads//2017/10/Mercedes-Benz-logo-2011-1920x1080.png' />
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
              <p>{job.description}</p>
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
