import React from 'react'
import Layout from '../components/layout/Layout.jsx'
import { useRouter } from 'next/router'
import UserContext from '../contexts//UserContext'
import Head from 'next/head'
export default function LoginPage () {
  const router = useRouter()
  const { setUser } = React.useContext(UserContext)
  const [credentials, setCredentials] = React.useState({
    identifier: '',
    password: ''
  })

  const handleChnage = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const isCredentials = !Object.keys(credentials).every((k) => credentials[k] !== '')

  const [errors, setErrors] = React.useState()
  const [isSubmited, setIsSubmited] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmited(true)

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      const { error } = await response.json()
      setErrors(error)
      setIsSubmited(false)
      return
    }
    const { user } = await response.json()
    window.localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>GroupoMania | Login</title>
      </Head>
      <div className='container vh-100'>
        <div className='d-flex align-self-center flex-column col-6 mx-auto h-100 mt-5'>
          {errors && (
            <div className="alert alert-dismissible alert-danger">
              <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
              <p className="text-white">{errors}</p>
            </div>
          )}
          <div className='text-center'>
            <h1 className='fs-3'>Login</h1>
          </div>
          <div className='w-100'>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name='identifier' value={credentials.identifier} onChange={handleChnage} aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' value={credentials.password} onChange={handleChnage} />
              </div>
              <button type="submit" disabled={!!((isSubmited || isCredentials))} className="btn btn-primary rounded-2">
                {isSubmited && (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                )}
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
LoginPage.getLayout = function getLayout (page) {
  return (
    <Layout>
      {page}
    </Layout>

  )
}
export async function getStaticProps (context) {
  return {
    props: {
      protected: false
    }
  }
}
