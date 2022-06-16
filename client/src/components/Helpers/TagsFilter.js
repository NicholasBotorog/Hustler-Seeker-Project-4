import React, { useState, useEffect  } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()


export const SelectTags = ({ filters, tags, handleChange }) => {

  // useEffect( () => { 
  //   const getTags = async () => { 
  //     const { data } = await axios.get('/api/tags/')
  //     setTags(data)
  //   }
  //   getTags()
  // }, [])

  // useEffect(() => { 
  //   if (tags.length) {
  //     const tagList = []
  //     tags.forEach(tag => tagList.includes(tag.name) ? '' : tagList.push(tag.name))
  //   }
  // }, [tags])


  // const [formData, setFormData] = useState({
  //   tags: [],
  // })
  // const [multi, setMulti] = useState([])

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }

  // const handleOptions = (tags) => { 
  //   setFormData({ ...formData, tags: tags.map((tag) => tag.id) })
  // }

  return (
    <>
      {/* <>
      <Select
        name="tags" value={filters.tags} onChange={handleChange}
        options={tags.map(tag => key={tag} value={tag}>{tag})}
        components={animatedComponents}
        isMulti />
    </> */}
      <div className="filter-container">
        <select className = 'text-muted' style={{ border: '0 none', outline: '0 none', height: '43px', margin: '5px', padding: '0 1rem', borderRadius: '5px', textAlign: 'center' }} name="tags" value={filters.tags} onChange={handleChange}>
          <option value="All">Industries</option>
          {tags.map(tag => <option key={tag.name} value={tag.name}>{tag.name}</option>)}
        </select>
      </div>
    </>
  )
}

export default SelectTags