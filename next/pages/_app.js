import React from 'react'
import UserContext from '../contexts/UserContext'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

export default function App ({ Component, pageProps }) {
  const [user, setUser] = React.useState(null)

  const authUser = async () => {
    const response = await fetch('/api/auth/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const user = await response.json()
      return user
    }
    return null
  }
  const router = useRouter()
  React.useEffect(() => {
    if (window !== undefined) {
      const localUser = window.localStorage.getItem('user')
      if (localUser) {
        if (!JSON.parse(localUser)?.blocked) {
          setUser(JSON.parse(localUser))
        } else {
          router.push('/login')
        }
      }
    }
    if (!user && pageProps?.protected) {
      authUser()
        .then(user => {
          if ((!user || user?.blocked) && pageProps?.protected) {
            router.push('/login')
          }
          setUser(user)
        })
    }
  }, [])

  const getLayout = Component?.getLayout || ((page) => page)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {getLayout(<Component {...pageProps} />)}
    </UserContext.Provider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object
}
