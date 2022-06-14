
import axios from 'axios'

const ImageUpload = ({ formData, setFormData }) => { 

  const uploadURL = process.env.REACT_APP_CLOUDINARY_URL
  const preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

  console.log(uploadURL, preset)

  const handleImageUpload = async e => { 
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', preset)
    const res = await axios.post(uploadURL, data)
    setFormData({ ...formData, profile_image: res.data.url })
  }

  return (
    <>
      { FormData.profileImage ? 
        <div>
          <img src={formData.profile_image} alt='Image to upload' />
        </div>
        :
        <>
          <label htmlFor ='image' className="checkbox labl">Image Upload</label>
          <input 
            name='image'
            className="input-edit"
            type="file"
            onChange={handleImageUpload}
          />
        </>
      }
    </>
  )
}

export default ImageUpload