import React, { useContext } from 'react'
import Link from 'next/link'
import logo from '../../assets/img/logo.png'
import { UserCircleSvg, ArrowOutSvg } from '../svg'
import UserContext from '../../contexts/UserContext'
import { useRouter } from 'next/router'

export default function Navbar () {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      const { error } = await response.json()
      console.log(error)
      return
    }
    window.localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
          <div className="container">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#mainNav" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mainNav">
              <Link className="navbar-brand me-0" href={'/'}>
                <a>
                  <img src={logo.src} className="img-responsive" alt="Groupomania logo" width={150} />
                </a>
              </Link>
              <ul className="nav navbar-nav ms-auto justify-content-end">
                <li className="nav-item">
                  <Link href={'/'}>
                    <a id="accueil" className={'nav-link ' + (router.pathname === '/' ? 'active' : '')}>
                      Accueil
                      <span className="visually-hidden">(current)</span>
                    </a>
                  </Link>
                </li>
                {(user && (
                  <>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown"
                        href="#" role="button" aria-haspopup="true" aria-expanded="false"><strong>{user?.username}</strong>
                      </a>

                      <div className="dropdown-menu">
                        <div className="dropdown-item icon-white">
                          <Link href={'/user/profil}'} className="text-decoration-none">
                            <a>Profil
                              <i className="d-inline ps-2 float-end">
                                <UserCircleSvg size={18} />
                              </i>
                            </a>
                          </Link>
                        </div>
                        <div className="dropdown-item bg-danger text-light" role="button" onClick={handleLogout}>
                          <a>Déconnexion
                            <i className="d-inline ps-2 float-end">
                              <ArrowOutSvg stroke="#ffff" size={18} />
                            </i>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item">
                      <Link href={`/user/${'user'}`} className="d-none d-md-inline">
                        <a>
                          <img className="rounded-circle border border-2 border-success" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg" width={32} />
                        </a>
                      </Link>
                    </li>
                  </>
                )) || (
                  <li className="nav-item">
                    <Link href={'/login'}>
                      <a id="login" className={'btn btn rounded btn-success'}>
                        Connexion
                        <span className="visually-hidden">(current)</span>
                      </a>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
