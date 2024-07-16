import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


const Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddresss] = useState("")
    const [answer, setAnswer] = useState("")
    //form

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address,answer })
            if (res && res.data.success) {

                toast.success(res.data && res.data.message)
                navigate('/login')
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
                        <form onSubmit={handleSubmit}>                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="fullname"
                                placeholder="Full Name"
                                required

                            />

                            <input
                                type="email"
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

                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="confirm_password"
                                placeholder="Phone"
                                required
                            />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddresss(e.target.value)}
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="confirm_password"
                                placeholder="Address"
                                required
                            />
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                class="block border border-grey-light w-full p-3 rounded mb-4"
                                name="answer"
                                placeholder="Whats your Favourite Coding Lang"
                                required
                            />
                             <h3 className='text-xs text-red-600'>Please remember your favourite coding lang answer as it will help you if you forget your password</h3>
                            <button type='submit'
                            className='p-1 mt-2 rounded-lg bg-blue-600'>submit</button>
                        </form>


                    </div>

                    <div class="text-grey-dark">
                        Already have an account?
                        <Link to="/login" class="no-underline border-b border-blue text-blue">
                            Log in
                        </Link>.

                    </div>

                </div>
            </div>

        </Layout>
    )
}

export default Register