import React, { useState, useEffect, useCallback } from 'react'
import { getTokenFromLocalStorage, getUserId } from '../helpers/auth'
import axios from 'axios'
import JobList from '../jobs/JobList'
import { Link } from 'react-router-dom'

import { Button, Row, Col, Container } from 'react-bootstrap'


const UserProfile = () => { 

  const [profile, setProfile] = useState()
  const [profileErrors, setProfileErrors] = useState(false)
  const [jobs, setJobs] = useState([])
  const [jobErrors, setJobErrors] = useState(false)

  const getJobs = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/jobs/')
      setJobs(data)
      console.log(data)
    } catch (error) {
      setJobErrors(true)
    }
  }, [])

  useEffect(() => {
    getJobs()
  }, [getJobs])

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/user/', {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
        console.log(data)
        setProfile(data)
      } catch (error) {
        setProfileErrors(true)
      }
    }
    getUser()
  }, [])

  const userId = getUserId()

  const userJobs = jobs?.filter((job) => job.owner.id === userId)

  const userAplications = jobs?.filter(job => {
    return job.aplication.find((aplication) => aplication.owner === userId)
  })


  return (
    <>
      <div>
        {profile ? (
          <div className='image-section'>
            <h1>Welcome, {profile.first_name}</h1><Link className='btn btn-light mb-4' to={'/profile/edit/'}>
              <img className='profile-image' src={profile.profile_image} alt="Profile Image" />
            </Link>
            <a href={profile.website}>My Portfolio</a>
          </div>
        )
          :
          (
            <>
              <Container className='image-section'>
                {profileErrors ?
                  <><h2>Oops something went wrong.</h2><img src='https://miro.medium.com/max/600/1*70dNCfAHhxBAhLBe8N-cng.gif' /></>
                  :
                  <h2>Loading...</h2>}
              </Container>
            </>
          )}
      </div>

      <Container className='mt-4'>
        <h2 className='h2-profile'> Your Jobs: </h2>
        {userJobs.length > 0 ?
          <Row style={{ display: 'flex', justifyContent: 'center' }} >
            {userJobs.map((job) => (
              <JobList key={job._id} job={job} />
            ))}
          </Row>
          :
          <div className='free'>
            <p style={{ marginTop: '10px', marginBottom: '25px' }}>Oh no, looks like you haven&apos;t posted any jobs yet! Why not posting one today ? It is free 😉</p>
            <a style={{ marginBottom: '10px' }} href="/post">
              <Button className="font-bold py-2 px-4 button-profile"> Post </Button>
            </a>
          </div>}
        <hr />
        <div className='image-section-2'>
          <h3>Jobs You have Applied For :</h3>
          <Link to="/jobs" className='btn btn-light'>View All Jobs</Link>
        </div>
        <div className='user-aplications'>
          {/* {userAplications.lenght > 0 ?  */}
          <Row style={{ display: 'flex', justifyContent: 'center' }} >
            {userAplications.map((job) => (
              <JobList key={job._id} job={job} />
            ))}
          </Row>
        </div>
      </Container>
    </>
  )
}

export default UserProfile
