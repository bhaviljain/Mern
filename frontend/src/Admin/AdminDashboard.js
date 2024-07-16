import React from 'react'
import Layout from '../components/layout/Layout'
import AdminMenu from '../components/AdminMenu'
import { useAuth } from '../Context/auth'

const AdminDashboard = () => {
    const[auth,setAuth] = useAuth()
  return (
    <Layout>  
         <div>
            <AdminMenu />
            <h1>{auth?.user?.name}</h1>
            <h1>{auth?.user?.email}</h1>
            <h1>{auth?.user?.phone}</h1>
         </div>
         </Layout>
 
  )
}

export default AdminDashboard