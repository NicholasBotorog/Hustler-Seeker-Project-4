import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

// import { Card, Button, Collapse, Col, Container, Row } from 'react-bootstrap'
import { getUserId, userIsOwner } from '../Helpers/auth'
import { getTokenFromLocalStorage, getPayload } from '../Helpers/auth'

import { Row, Col, Button, Card, Container, Form, FormControl, Modal } from 'react-bootstrap'
import Jobs from './Jobs'

const SingleJob = () => { 

  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [errors, setErrors] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    window.location.reload()
  }
  const handleShow = () => setShow(true)
  const [allComments, setAllComments] = useState(false)
  const closeComments = () => setAllComments(false)
  const showComments = () => setAllComments(true)

  const [formData, setFormData] = useState({
    text: '',
    title: '',
  })

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value, 'job': job.id })
  }

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

  const handlePostReview = async () => {
    try {
      const { data } = await axios.post('/api/reviews/',formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      console.log(data)
      await getSingleJob()
      console.log(data)
      handleClose()
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

  const handleDeleteReview = async(reviewId) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}/`, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      })
      await getSingleJob()
    } catch (error){
      console.log(error)
    }
  }

  const userId = getUserId()
  const apply = job && job.aplication.find((aplication) => aplication.owner === userId)
  const userAplication = userId && !!apply
  const postReview = job && job.reviews.find((review) => review.owner === userId)
  const userReview = userId && !!postReview


  function formatMoney(n) {
    return '$ ' + (Math.round(n * 100) / 100).toLocaleString()
  }

    
  return (
    <Container className="mt-4">
      <Row>
        { job ? 
          <>
            <Col className='job-col-single'>
              <Card className="mb-3 single-job-view">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Card.Title>
                        {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
                      </Card.Title>
                      <Card.Subtitle className="text-muted mb-2">
                        {formatMoney(job.salary)}<br />
                        {/* <div className='single-job-buttons'>
                          <Link to="/jobs" className='btn btn-light text-muted'>Back to Jobs</Link>
                          {userIsOwner(job.owner.id) && (
                            <div>
                              <Button style={{ marginRight: '10px' }}  variant="light" className='text-muted' onClick={handleDelete}>Delete Post</Button>
                              <Link className='btn btn-light text-muted' to={`/jobs/${job.id}/edit/`} >Edit Post</Link>
                            </div>
                          )}
                        </div> */}
                        <hr />
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
                  <Card.Text className='mt-4'> 
                    <p>{job.description}</p>
                    <div className='single-job-buttons' style={{ marginBottom: '10px' }}>
                      { userAplication ? (
                        <Button variant="danger" onClick={() => handleDeleteAplication(apply.id)}>
                          Unapply
                        </Button>
                      ) :
                        (
                          <Button variant="success" onClick={handleApply}>
                            Apply 
                          </Button>
                        )
                      }
                    </div>
                    <div className='single-job-buttons'>
                      <Link to="/jobs" className='btn btn-secondary'>Back to Jobs</Link>
                      {userIsOwner(job.owner.id) && (
                        <div>
                          <Button style={{ marginRight: '10px' }}  variant="light" onClick={handleDelete}>Delete Post</Button>
                          <Link className='btn btn-light' to={`/jobs/${job.id}/edit/`}>Edit Post</Link>
                        </div>
                      )}
                    </div>
                  </Card.Text> 
                </Card.Body>
              </Card>
            </Col>
            <hr />
            
            <div className='single-job-buttons-review'>
              <Button className="modal-launch" onClick={handleShow}>
                <span className='hover-message'>Add a comment</span>
              </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header className="comments-header" closeButton>
                <Modal.Title className="comments-title" >Tell us what you think about {job.company} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Comment title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      autoFocus
                      onChange={handleChange}
                      name='title' />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={handleChange} name='text' />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="comments-footer">
                <button className='comments-save' onClick={handlePostReview}>
                  Post Review
                </button>
                <button className='comments-close' onClick={handleClose}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>
            <div className='single-job-buttons-review'>
              <Button className="load-comments" onClick={showComments}>
              Show comments
              </Button>
            </div>
            <Modal show={allComments} onHide={closeComments} className="comments-detail">
              <Modal.Header className="comments-header" closeButton>
                <Modal.Title className="comments-title">{job.company}: Employees Reviews </Modal.Title>
              </Modal.Header>
              <Modal.Body>

                {job.reviews.length < 1 ?
                      
                  <div className='comment-card'>
                    <h4>No reviews yet</h4>
                  </div>
                  :
                  job.reviews.map(review => (
                    <>
                      <div className='comment-card'>
                        <div className='comment-left'>
                          <p>{review.owner.first_name} {review.owner.last_name} <span> <img className='navbar-pic' src={review.owner.profile_image} alt={review.owner.username} /></span></p>
                          <h4>{review.title}</h4>
                          <h5>{review.text}</h5>
                          <p className = 'text-muted'>Added on {new Date(review.created_at).toLocaleDateString()} </p>
                          { userIsOwner(review.owner.id) && (
                            <Button className='text-muted' variant="light" onClick={() => handleDeleteReview(review.id)}>Delete</Button>
                          )}
                        </div>
                      </div>
                      <hr />
                    </>
                  ))}
              </Modal.Body>
            </Modal>
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