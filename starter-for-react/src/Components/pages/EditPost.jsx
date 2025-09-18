// import React , {useState , useEffect} from 'react'
// import {useNavigate ,  useParams } from 'react-router-dom'
// import { Container , PostForm } from  "../index"
// import services from '../../lib/Config'

// const EditPost = () => {
//     const [post , setPost] = useState(null)
//     const {slug} = useParams()
//     const navigate = useNavigate()
//     useEffect(()=>{
//         if (slug) {
//             services.getPost(slug).then((post)=>{
//                 if (post) {
//                     setPost(post)
//                 } else {
//                     navigate('/404')
//                 }
//             })
//         }
//     }, [slug , navigate])
//   return post? (
//     <Container className="min-h-screen flex justify-center items-start pt-10 pb-20">
//       <PostForm post={post} />
//     </Container>
//   ) : (
//     <div>Loading...</div>
//   )
  
  
// }

// export default EditPost
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from "../index"
import services from '../../lib/Config'

const EditPost = () => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        try {
          const post = await services.getPost(slug)
          if (post) {
            setPost(post)
          } else {
            navigate('/404')
          }
        } catch (err) {
          console.error("Failed to fetch post:", err)
          navigate('/404')
        } finally {
          setLoading(false)
        }
      }
      fetchPost()
    }
  }, [slug, navigate])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <Container className="min-h-screen flex justify-center items-start pt-10 pb-20">
      <PostForm post={post} />
    </Container>
  )
}

export default EditPost
