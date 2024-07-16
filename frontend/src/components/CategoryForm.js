import React from 'react'

const CategoryForm = ({handleSubmit,name,setName}) => {
  return (
    <div>CategoryForm
        <form onSubmit={handleSubmit}>
        <input type='text' 
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className='border border-black'
        />
        <button>submit</button>
        </form>
    </div>
  )
}

export default CategoryForm