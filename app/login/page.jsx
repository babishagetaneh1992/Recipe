"use client"
import {useState} from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'


function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e)=> {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      

      if (res.error) {
        // Handle cases where res.error is undefined, null, or not a string/object
         setError("Invalid credentials")
         toast.error('Login Failed')
      } else {
     toast.success("Login successfull")
      router.push('/')
      }
    } catch (error) {
      console.error("Client-side login error:", error);
      toast.error("Login Failed")
    } finally {
      setIsLoading(false)
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
      <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-600'>Login to your account</h2>
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
           
             <div className='mt-4 relative rounded-md shadow-sm'>
          <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent 
              rounded-md shadow-sm text-sm font-medium text-white bg-gray-700
               hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
                disabled = {isLoading}
              >
              {isLoading ? 'Logging in...' : 'Login'} 
            
            </button>   
            </div>
      </form>
      <p className='mt-8 text-center text-sm text-gray-400'>
            you don't have an account?{" "}
            <Link href={'/register'} className='font-medium text-gray-600 hover:text-gray-400'>
                 Sign up here
            </Link>
      </p>
  </div>
  </motion.div>
  </div>
  )
}

export default LoginPage