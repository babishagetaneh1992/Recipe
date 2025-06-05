"use client"
import {useState} from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useRouter } from 'next/navigation';


 function Register() {

  
  const [name, setname] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  const router = useRouter()
 


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name || !email || !password ||!confirmPassword) {
      alert("Please fill in all fields")
      return
    }

    try {

      const res = await fetch('http://localhost:3000/api/register',{
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name,email,password}),
      });
   
      if (res.ok) {
        toast.success("Account Created Successfully")
        const form = e.target
        form.reset()
        router.push('/login')
      }

      else {
        throw new Error("Failed to create account")
      }
    } catch (error) {
       console.log(error)
       toast.error(`Error: ${error.message}`)
    }
  }


  return (
    <div>
      <motion.div
         className='sm:mx-auto sm:w-full sm:max-w-md'
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
      >
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-600'>Create your account</h2>
      </motion.div>

      <motion.div
         className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.2 }}
     
      >
    <div className='bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
        <form onSubmit={handleSubmit}>
            <div>
               <label  htmlFor='name' className='block text-sm font-medium text-gray-700'>
                   Full name
               </label>
               <div className='mt-1 relative rounded-md shadow-sm'>
                <input 
                    id='name'
                    type='text'
                    required
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                    placeholder-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                   placeholder='John Doe'
                />
               </div>
               </div>
                <div>
               <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                   Email
               </label>
               <div className='mt-1 relative rounded-md shadow-sm'>
                <input 
                    id='email'
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                    placeholder-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                   placeholder='you@example.com'
                />
               </div>
               </div>
               <div>
               <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                   Password
               </label>
               <div className='mt-1 relative rounded-md shadow-sm'>
                <input 
                    id='password'
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                    placeholder-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                   placeholder='••••••••'
                />
               </div>
               </div>
               <div>
               <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                  Confirm Password
               </label>
               <div className='mt-1 relative rounded-md shadow-sm'>
                <input 
                    id='confirmPassword'
                    type='password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                    placeholder-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                   placeholder='••••••••'
                />
               </div>
               </div>
               <div className='mt-4 relative rounded-md shadow-sm'>
                
            <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent 
                rounded-md shadow-sm text-sm font-medium text-white bg-gray-700
                 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
                >
                  Submit
              
              </button>   
              </div>
        </form>
        <p className='mt-8 text-center text-sm text-gray-400'>
              Already have an account?{" "}
              <Link href={'/login'} className='font-medium text-gray-600 hover:text-gray-400'>
                   Login here
              </Link>
        </p>
    </div>
    </motion.div>
    </div>
  )
}

export default Register