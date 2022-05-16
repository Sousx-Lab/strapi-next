import React, { useState, useEffect } from 'react'
import { getCommentariesByPostId, createNewCommentary } from '../../services/Api/commentaries'
import Loader from '../layout/Loader'
import PublishedAt from '../outils/PublishedAt'
import PropTypes from 'prop-types'

export default function Commentaries ({ postId }) {
  const [commentaries, setCommentaries] = useState({})
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState({
    type: '',
    text: ''
  })
  const [count, setCount] = useState(0)

  const [newCommentary, setNewCommentary] = useState({
    data: {
      content: '',
      post_id: postId
    }
  })
  const handleChnage = ({ currentTarget }) => {
    setNewCommentary({
      ...newCommentary,
      data: {
        ...newCommentary.data,
        [currentTarget.name]: currentTarget.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const jwtData = await fetch('/api/auth/jwt')
      if (!jwtData) {
        setMessage({ type: 'error', text: 'Vous devez être connecté pour poster un commentaire' })
      }
      const { jwt } = await jwtData.json()
      const comment = await createNewCommentary(newCommentary, jwt)
      // console.log(comment)
      // console.log(commentaries, comment.data)
      setCommentaries({ ...commentaries, data: [...commentaries.data, comment.data] })
      setMessage({ type: 'success', text: 'Votre commentaire a bien été ajouté' })
    } catch (error) {
      setMessage({ type: 'error', text: "Une erreur est survenue lors de l'envois du commentaire" })
    }
  }
  useEffect(() => {
    setLoading(true)
    getCommentariesByPostId(postId)
      .then(async (response) => await response.json())
      .then((data) => {
        setCommentaries(data)
        setLoading(false)
        setCount(data.data.length)
      })
      .catch((e) => {
        setLoading(false)
        setMessage({ type: 'error', text: "Une erreur est survenue lors de l'envois du commentaire" })
      })
    setNewCommentary({ ...newCommentary, data: { post_id: postId } })
  }, [postId])
  return (
    <div className="mt-5">
    {loading && <Loader />}
      {message.type && <div className={`alert alert-${message.type}`}>{message.text}</div>}
      <hr />
      <p className='text-muted'>{count > 0 ? `${count.toString()} Commentaire${count > 1 ? 's' : ''}` : 'Aucun Commentaire'}</p>
      <form onSubmit={handleSubmit}>
        <div className='mb-5 w-50'>
          <label htmlFor="content" className='form-label'>Ajouter un commentaire</label>
          <textarea name="content" id="content" className='form-control' rows={5} onChange={handleChnage}/>
          <div id="content" className="form-text mb-3">Veillez respectez les conditions d&apos;utilisation !</div>
          <button type='submit' className='btn btn-primary'>Envoyer</button>
        </div>
      </form>
      {count > 0 && (commentaries.data.map(({ attributes }, k) => {
        return (
          <div className='card mb-2' key={k}>
          <div className="card-header">
            <p className="small mb-2 text-muted d-inline">Par UserName</p>
              <PublishedAt publishedAt={attributes.createdAt} updatedAt={attributes.updatedAt} />
              </div>
            <div className='card-body mb-4'>
              <p className='card-text pt-2'>{attributes.content}</p>
            </div>
          </div>
        )
      })
      )}
      </div>
  )
}

Commentaries.propTypes = {
  postId: PropTypes.string
}
