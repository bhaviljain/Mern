import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../Context/auth'

const HomePage = () => {
  const[auth,setAuth] = useAuth()
  return (
    <Layout>   
         <div>HomePage</div>
         <p>{JSON.stringify(auth,null,4)}</p>
    </Layout>

  )
}

export default HomePage