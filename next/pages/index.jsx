import Head from 'next/head'
import Layout from '../components/layout/Layout.jsx'
import React from 'react'
import { getPosts } from '../services/Api/posts.js'
import PropTypes from 'prop-types'
import Link from 'next/link'
import PublishedAt from '../components/outils/PublishedAt.jsx'
/** */
export default function HomePage ({ posts }) {
  return (
    <>
      <Head>
        <title>Plant</title>
      </Head>
      <div className='container'>
        <div className='col-lg-7 d-flex flex-column justify-content-center mx-auto mt-3'>
          {posts.length > 0 &&
            posts.map((post, k) => {
              return (
                <div key={k} className='card mb-3 shadow'>
                  <img src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.image_preview.data.attributes.url}`}
                    className="card-img-top" style={{ width: '100%', height: '250px' }} alt="..."></img>
                  <div className='card-body'>
                    <PublishedAt publishedAt={post.publishedAt}/>
                    <h5 className='card-title mb-4'>{post.title}</h5>
                    <p className=''>{`${post.content_preview.split(' ', 40).join(' ')} ...`}</p>
                    <Link href={`/post/${post.id}`}>
                      <a className='small stretched-link'>Lire plus</a>
                    </Link>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

HomePage.getLayout = function getLayout (page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export async function getServerSideProps (context) {
  const posts = await getPosts()
  return {
    props: {
      protected: false,
      posts: posts.data.map((post) => {
        return {
          id: post.id,
          content: JSON.parse(post.attributes.content),
          ...(post.attributes)
        }
      })
    }
  }
}

HomePage.propTypes = {
  posts: PropTypes.array
}
