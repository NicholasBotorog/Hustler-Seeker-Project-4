import React , { useState , useEffect } from 'react'
import axios from 'axios'
import { Link , useNavigate, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage, getPayload, userIsOwner } from '../Helpers/auth'
import ImageUpload from '../Helpers/ImageUpload'
import Select from 'react-select'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import makeAnimated from 'react-select/animated'

const EditProfile = () => {

  const navigate = useNavigate()
  const [profile, setProfile] = useState()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    profile_image:
      'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
  })
  const [errors, setErrors] = useState(false)

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  useEffect(() => {
    const getProfile = async () => { 
      try {
        const { data } = await axios.get('/api/auth/user/')
        console.log(data)
        setProfile(data)
        setFormData(
          {
            username: data.username,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            password: data.password,
            password_confirmation: data.password_confirmation,
            profile_image: data.profile_image,
            // owner: data.owner.id,
          }
        )
      } catch (error) {
        setErrors(error.response.data.errors)
      }
    }
    getProfile()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put('/api/auth/user/', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      navigate('/profile')
    } catch (error) {
      console.log(error)
      console.log(error.response)
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  return (
    <section className="form-page">
      <Container>
        <Row>
          <form className='col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5' onSubmit={handleSubmit}>
            <h1>Register</h1>
            {/* Username */}
            <label htmlFor="username">Username</label>
            <input type="text" name="username" className='input' placeholder='Username' value={formData.username} onChange={handleChange} />
            {errors.username && <p className='text-danger'>{errors.username}</p>}
            
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className='input' placeholder='Email' value={formData.email} onChange={handleChange} />
            {errors.email && <p className='text-danger'>{errors.email}</p>}

            {/* First Name */}
            <label htmlFor="first_name">First Name</label>
            <input type="text" name="first_name" id="first-name" className='input' placeholder='First Name' value={formData.first_name} onChange={handleChange} />
            {errors.first_name && <p className='text-danger'>{errors.first_name}</p>}

            {/* Last Name */}
            <label htmlFor="last_name">Last Name</label>
            <input type="text" name="last_name" id="last-name"className='input' placeholder='Last Name' value={formData.last_name} onChange={handleChange} />
            {errors.last_name && <p className='text-danger'>{errors.last_name}</p>}

            {/* Password */}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className='input' placeholder='Password' value={formData.password} onChange={handleChange} />
            {errors.password && <p className='text-danger'>{errors.password}</p>}

            {/* Password Confirmation */}
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input type="password" id="pasword-confirmation" name="password_confirmation" className='input' placeholder='Password Confirmation' value={formData.password_confirmation} onChange={handleChange} />
            {errors.password_confirmation && <p className='text-danger'>{errors.password_confirmation}</p>}

            <div className="field">
              <ImageUpload
                value= {formData.image} onChange={handleChange}
                setFormData={setFormData}
              />
            </div>
      
            {/* Submit */}
            <button type="submit" className="btn w-100">Register</button>
          </form>
        </Row>
      </Container>
    </section>
  )
}

export default EditProfile