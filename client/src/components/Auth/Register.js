import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ImageUpload from '../helpers/ImageUpload'


const Register = () => {
  const navigate = useNavigate()
  const [ formData, setFormData ] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    bio: '',
    website: '',
    profile_image:
      'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
  })

  const [ errors, setErrors ] = useState({
    email: [],
    username: [],
    password: [],
    passwordConfirmation: [],
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/register/', formData)
      setTokenToLocalStorage(data.token)
      navigate('/login')
    } catch (error) {
      console.log(error)
      console.log(error.response)
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  const handleImageUrl = (url) => {
    try {
      setFormData({ ...formData, profile_image: url })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="form-page">
      <Container>
        <Row>
          <form className='col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mb-5' onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="field">
              <ImageUpload
                value= {formData.profile_image} onChange={handleChange}
                setFormData={setFormData}
              />
            </div>
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

            {/* Bio */}
            <label htmlFor="bio">Description</label>
            <input type="text" name="bio" id="last-name"className='input' placeholder='Last Name' value={formData.bio} onChange={handleChange} />
            {errors.bio && <p className='text-danger'>{errors.bio}</p>}

            {/* Website */}
            <label htmlFor="website">Portfolio</label>
            <input type="text" name="website" id="last-name"className='input' placeholder='Last Name' value={formData.website} onChange={handleChange} />
            {errors.website && <p className='text-danger'>{errors.website}</p>}

            {/* Password */}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className='input' placeholder='Password' value={formData.password} onChange={handleChange} />
            {errors.password && <p className='text-danger'>{errors.password}</p>}

            {/* Password Confirmation */}
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input type="password" id="pasword-confirmation" name="password_confirmation" className='input' placeholder='Password Confirmation' value={formData.password_confirmation} onChange={handleChange} />
            {errors.password_confirmation && <p className='text-danger'>{errors.password_confirmation}</p>}

            {/* Submit */}
            <button type="submit" className="btn w-100">Register</button>
          </form>
        </Row>
      </Container>
    </section>
  )
}

export default Register