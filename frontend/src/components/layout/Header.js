import React from 'react'
import { Link } from 'react-router-dom'
import "../../../src/App.css"
import { useAuth } from '../../Context/auth'
import toast from 'react-hot-toast'
import { token } from 'morgan'

const Header = () => {
  const [auth,setAuth] = useAuth()
  const handleLogout =()=>{
    setAuth({...auth,user:null,token:''})
localStorage.removeItem("auth")
toast.success("logout successfully")
  }
  return (
    <div>
      <header class={`navbar flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 `}>
  <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between " aria-label="Global">
    <Link to="/" class="flex-none text-xl font-semibold dark:text-black ">Brand</Link>
    <div class={`navs flex flex-row items-center gap-10 mt-5 justify-end sm:mt-0 sm:ps-5`}>
    <Link to="/" class="font-medium text-gray-600 hover:text-gray-400 dark:text-black dark:hover:text-neutral-500" >Home</Link>

     {!auth.user ? (<>
      <Link to="/register" class="font-medium text-blue-500"  aria-current="page">Register</Link>
      <Link to="/login" class="font-medium text-gray-600 hover:text-gray-400 dark:text-black dark:hover:text-neutral-500" >Login</Link>
     </>) :
     
     (<>
    {auth?.user?.name}
     <Link to="/login" onClick={handleLogout} class="font-medium text-gray-600 hover:text-gray-400 dark:text-black dark:hover:text-neutral-500" >Logout</Link></>)}
     
      <Link to="/cart" class="font-medium text-gray-600 hover:text-gray-400 dark:text-black dark:hover:text-neutral-500" >Cart</Link>
      <Link to={`/dashboard/${auth?.user?.role  === 1 ? "admin" :"user"}`} class="font-medium text-gray-600 hover:text-gray-400 dark:text-black dark:hover:text-neutral-500" >Dashboard</Link>
    
      <Link to="/about" class="font-medium text-gray-600 hover:text-gray-400 dark:text-black dark:hover:text-neutral-500" >About</Link>
    
    </div>
  </nav>
</header>
    </div>
  )
}

export default Header