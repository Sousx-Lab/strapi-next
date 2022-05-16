import { setCookie } from 'nookies'
import { login } from '../../../services/Api/athenticator'

export default async (req, res) => {
  const { identifier, password } = req.body

  try {
    const user = await login({ identifier, password })
    setCookie({ res }, 'jwt', user.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
    delete user.jwt
    res.status(200).json(user)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}
