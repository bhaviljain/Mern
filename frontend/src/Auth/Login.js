import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from "axios"
import { useNavigate,useLocation } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../Context/auth';


const Login = () => {
  const location = useLocation()
  const [auth,setAuth] = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password })
      if (res && res.data.success) {

        toast.success(res.data && res.data.message)
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        })
        localStorage.setItem("auth",JSON.stringify(res.data))
        navigate(location.state || '/')
      }
      else {
        toast.error(res.data.message)
      }
    }
    catch (error) {
      toast.error("Something went wrong")
    }
  }


  return (
    <Layout>

      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <form onSubmit={handleSubmit}>                    <h1 class="mb-8 text-3xl text-center">Login</h1>


              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                required
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                required
              />


              <button type='submit'
              >submit</button>
              
            </form>
            <button onClick={()=>{navigate("/forgotPassword")}}>Forgot Password</button>

          </div>




        </div>
      </div>

    </Layout>
  )
}

export default Login