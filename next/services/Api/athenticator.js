/**
 * @returns {Object|null}
 */
export async function getUser (token) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_USER_PROVIDER_API, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    if (response.ok) {
      const user = response.json()
      return user
    }
    return null
  } catch (error) {
    console.error(error)
  }
}

/**
 *
 * @param {Object} user
 */
export function setUser (user) {
  try {
    window.localStorage.setItem('user', JSON.stringify(user))
  } catch (error) {
    console.error(error)
  }
}

export async function login (credentials) {
  const response = await fetch(process.env.NEXT_PUBLIC_LOGIN_API, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    const user = await response.json()
    return user
  }
  const { error } = await response.json()
  throw new Error(error.message)
}
