export async function getPosts () {
  const response = await fetch(`${process.env.NEXT_PUBLIC_POST_API}?populate=*`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    return (await response.json())
  }
  const { error } = await response.json()
  throw new Error(error.message)
}

/**
 * @param {string} id
 * @returns
 */
export async function getPost (id) {
  return await fetch(`${process.env.NEXT_PUBLIC_POST_API}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
