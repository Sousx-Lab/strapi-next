import React from 'react'
import PropTypes from 'prop-types'
export default function PostArticle ({ block, options = null }) {
  let cssClass = ''
  const data = { __html: block.data.text }
  if (block.type === 'header') {
    cssClass = options?.header?.block.data.level || ''
    switch (block.data.level) {
      case 1:
        return <h1 className={`${cssClass}`} dangerouslySetInnerHTML={data}/>
      case 2:
        return <h2 className={`${cssClass}`} dangerouslySetInnerHTML={data}/>
      case 3:
        return <h3 className={`${cssClass}`} dangerouslySetInnerHTML={data}/>
      case 4:
        return <h4 className={`${cssClass}`} dangerouslySetInnerHTML={data}/>
      case 5:
        return <h5 className={`${cssClass}`} dangerouslySetInnerHTML={data}/>
      case 6:
        return <h6 className={`${cssClass}`} dangerouslySetInnerHTML={data}/>
      default:
        return <h1 className={`${cssClass}`} dangerouslySetInnerHTML={data}/>
    }
  } else if (block.type === 'paragraph') {
    cssClass = options?.paragraph.p || ''
    return <p className={`${cssClass}`} dangerouslySetInnerHTML={data}/>
  } else if (block.type === 'list') {
    return <ul className={''}>{block.data.items.map((item, index) => {
      return <li key={index} dangerouslySetInnerHTML={data}/>
    }
    )}</ul>
  } else if (block.type === 'image') {
    return (
    <figure>
      <img className='w-100' src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${block.data.file.url}`} alt={block.data.file.alt}/>
      <figcaption className='text-center'>{block.data?.caption || block.data.file.alt}</figcaption>
    </figure>
    )
  }
}
PostArticle.propTypes = {
  block: PropTypes.object,
  options: PropTypes.object || null
}
