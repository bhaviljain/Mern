import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import AdminMenu from '../components/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import CategoryForm from '../components/CategoryForm'
import { Modal } from 'antd';

const CreateCategory = () => {
  const [visible, setVisible] = useState(false);
  const [categories, setCategory] = useState([])
const [name,setName] = useState("")
const [selected, setSelected] = useState(null)
const [updatename, setUpdatedName]= useState("")
const handleSubmit =async (e)=>{
  e.preventDefault()
  try{
    const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name})
    if(data.success){
      toast.success(`${name} is created`)
      getallCategory()
    }
    else{
      toast.error(data.message)
    }
  }
  catch(error){
    console.log(error);
  }
}
  const getallCategory = async()=>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      setCategory(data.category)
    }
    catch(error)
    {
    console.log(error)
    toast.error("Something went wrong")
    }
  }
  useEffect(()=>{
  getallCategory()
  },[])

  const handleUpdateSubmit =async (e)=>{
  e.preventDefault()
  try{
    const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatename})
    if(data.success){
      toast.success(`${updatename} name is updated`)
      setSelected(null)
      setUpdatedName("")
      setVisible(false)
      getallCategory()
    }
    else{
      toast.error(data
        .message
      )
    }
  }
  catch(error){
    toast.error("something went wrong")
  }
  }
  return (
    <Layout>
      <CategoryForm 
      handleSubmit={handleSubmit}
      name={name}
      setName={setName}
      />
      <div className='flex justify-evenly'>
      <AdminMenu />
    <div>CreateCategory
      {categories && categories?.map((c)=>{
        return(
          <div key={c._id}
          className='flex justify-center gap-3 p-1 border-b-2 border-gray-400 w-80'>
            {c.name}
            <button className='p-.4 px-4 rounded-xl bg-gray-400 
            '
            onClick={()=>{setVisible(true);
              setUpdatedName(c.name);setSelected(c)}}
            >Edit</button>
            <button className='p-.4 px-4 rounded-xl bg-red-800 '>Delete</button>
          </div>
        )
      })}
       <Modal
    onCancel={()=>setVisible(false)}  footer={null} visible={visible}
    >
      <CategoryForm 
      name={updatename}
      setName = {setUpdatedName}
      handleSubmit={handleUpdateSubmit}
      />
    </Modal>
    </div>
   
    </div>
    </Layout>
  )
}

export default CreateCategory