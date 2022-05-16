import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { getPost } from '../../services/Api/posts.js'
import Layout from '../../components/layout/Layout'
import PostArticle from '../../components/posts/PostArticle.jsx'
import { ArrowLeftSvg } from '../../components/svg'
import PublishedAt from '../../components/outils/PublishedAt.jsx'
import Commentaries from '../..//components/commentaries/Commentaries'

export default function Post ({ post }) {
  React.useEffect(() => {
    console.log(post)
  }, [post])
  return (
    <>
      <Head>
        <title>Plant: {post?.data && post?.data?.attributes?.title}</title>
      </Head>
      <div className='container'>
        <div className='col-lg-7 d-flex flex-column justify-content-center mx-auto mt-3'>
          <div className='mb-2'>
            <a href='#' className="rounded-circle btn btn-outline-light" onClick={() => window.history.back()}
              style={{ padding: '0.2rem 0.2rem' }}>
                <ArrowLeftSvg strokeWidth="1" size={26} />
            </a>
          </div>
          <PublishedAt publishedAt={post.data.attributes.publishedAt} updatedAt={post.data.attributes.updatedAt} />
          {(post?.data && (
            <article>
            {post?.data?.attributes?.content.blocks.map((block, k) => {
              return (
                <React.Fragment key={k}>
                  <PostArticle block={block} />
                </React.Fragment>
              )
            })}
            </article>
          )) || (
            <div className='d-flex justify-content-center'> loading... </div>
          )}
          <Commentaries postId={post.data.id.toString()} />
        </div>
      </div>
    </>
  )
}
Post.getLayout = function getLayout (page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export async function getServerSideProps ({ params }) {
  try {
    const response = await getPost(params.id)

    if (response.ok) {
      const post = await response.json()
      post.data.attributes.content = JSON.parse(post.data.attributes.content)
      return {
        props: {
          post,
          protected: false
        }
      }
    }
    if (response.status === 404) {
      return {
        redirect: {
          destination: '/404'
        }
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }
}
Post.propTypes = {
  post: PropTypes.object
}
