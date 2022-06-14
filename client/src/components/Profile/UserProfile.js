import React, { useState, useEffect, useCallback } from 'react'
import { getTokenFromLocalStorage, getUserId } from '../Helpers/auth'
import axios from 'axios'
import JobList from '../Jobs/JobList'
import SingleJob from '../Jobs/SingleJob'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
    <div>
      {profile ? (
        <>
          <div className='image-section'>
            <img className = 'profile-image' src={profile.profile_image} alt="Profile Image" />
          </div>
          <h2>Welcome, {profile.first_name}</h2>
          <h3> Your Jobs: </h3>
          <div>
            {userJobs.length > 0 ?
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {userJobs.map((job) => (
                  <JobList key={job._id} job={job} />
                ))}
              </div>
              :
              <>
                <p className="p-4">Oh no, looks like you haven&apos;t posted any jobs yet! Why not posting one today ? It is free 😉</p>
                <a href="/post">
                  <button className="font-bold py-2 px-4 m-3 rounded"> Post </button>
                </a>
              </>
            }
          </div>
          <hr />
          <h3>Jobs You have Applied For :</h3>
          {userAplications.lenght > 0 ? 
            <div>
              {userAplications.map((job) => (
                <JobList key={job._id} job={job} />
              ))}
            </div>
            :
            <>
              <p className="p-4">Oh no, looks like you haven&apos;t checked our husle section yet. Go get that mula Champ 🤑</p>
              <a href="/jobs">
                <button className="font-bold py-2 px-4 m-3 rounded">Check out all the available Jobs</button>
              </a>
            </>
          }
          <>
            <Link className='btn btn-primary ml-3' to={'/profile/edit/'}>Edit Profile</Link>
          </>
        </>
      ) : (
        <>
          {profileErrors ? <h2>Oops something went wrong.</h2> : <h2>Loading...</h2>}
        </>
      )}
    </div>
  )
}

export default UserProfile