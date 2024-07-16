import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../Context/auth'
import UserMenu from '../components/UserMenu'
const Dashboard = () => {
    const[auth] = useAuth()
    return (
        <Layout>
            <div>Dashboard
                <UserMenu />
                <div>
                <h1>{auth?.user?.name}</h1>
            <h1>{auth?.user?.email}</h1>
            <h1>{auth?.user?.phone}</h1>
                </div>
            </div>
        </Layout>

    )
}

export default Dashboard