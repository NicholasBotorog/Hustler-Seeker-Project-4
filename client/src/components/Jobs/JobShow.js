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

  //!
  const getSingleJob = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/jobs/${id}/`)
      setSingleJob(data)
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

  const [tags, setTags] = useState([])
  useEffect( () => { 
    const getTags = async () => { 
      const { data } = await axios.get('/api/tags/')
      setTags(data)
    }
    getTags()
  }, [])
  //! 

  return (
    <Col className='job-col'>
      <Card className="mb-3">
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
                <span>https://ro.indeed.com/jobs?q=part%20time&l=Bucure%C8%99ti%2C%20Ilfov&vjk=12474cd6a36758be</span>
              </div>
            </div>
            <img className="d-none d-md-block" height="50" alt={job.company} src='https://www.nms-mr.com/wp-content/uploads//2017/10/Mercedes-Benz-logo-2011-1920x1080.png' />
          </div>
          <Card.Text className='mt-4'>
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
              {userIsOwner(job.owner.id) && (
                <div className="owner-buttons mb-4">
                  <Button className="ml-3" variant="danger" onClick={handleDelete}>Delete Post</Button>
                  <Link className='btn btn-light ml-3' to={`/jobs/${job.id}/edit/`}>Edit Post</Link>
                </div>
              )}
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    </Col>
  )
}
