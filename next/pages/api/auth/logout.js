import { destroyCookie } from 'nookies'

export default async (req, res) => {
  try {
    destroyCookie({ res }, 'jwt', { path: '/' })
    res.send({ message: 'Logout successful' })
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}
