import React from 'react'
import PropTypes from 'prop-types'
export default function PublishedAt ({ publishedAt, updatedAt }) {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return (
    <>
    { publishedAt && (
      <p className='small text-muted mb-1'><em className='small'>Publié le{new Date(publishedAt).toLocaleDateString('fr-FR', dateOptions)}</em>
      { (updatedAt) && updatedAt !== publishedAt &&
        <em className='small'>/ Modifié le {new Date(updatedAt).toLocaleDateString('fr-FR', dateOptions)}</em>
      }
    </p>
    )}
    </>
  )
}

PublishedAt.propTypes = {
  publishedAt: PropTypes.string,
  updatedAt: PropTypes.string || null
}
