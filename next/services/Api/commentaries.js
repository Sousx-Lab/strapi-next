/**
 *
 * @param {string} id
 * @returns
 */
export async function getCommentariesByPostId (id) {
  return await fetch(`${process.env.NEXT_PUBLIC_COMMENT_API}?filters[post_id][id][$eq]=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function createNewCommentary (commentary, jwt) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_COMMENT_API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    },
    body: JSON.stringify(commentary)
  })
  if (response.ok) {
    return await response.json()
  }
  throw new Error('Error creating new commentary')
}
