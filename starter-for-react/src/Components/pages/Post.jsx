import React, { useState, useEffect } from 'react'
import { Button, Container } from "../index"
import services from '../../lib/Config'
import { Link, useParams, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

const Post = () => {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      services.getPost(slug)
        .then((post) => {
          if (post) setPost(post)
          else navigate('/')
        })
        .catch(() => navigate('/'))
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  const deletePost = async () => {
    if (post) {
      try {
        const res = await services.deletePost(post.$id)
        if (res) {
          await services.getFileDelete(post.featuredImageId)
          navigate('/')
        }
      } catch (error) {
        console.error("Failed to delete post:", error)
      }
    }
  }

  return post ? (
    <div>
      <Container>
        <div>
          <img
            src={services.getFilePreview(post.featuredImageId)}
            alt={post.title}
            className="rounded-xl"
          />
          {isAuthor && (
            <div>
              <Link to={`/edit/${post.$id}`}>
                <Button className="m-2">Edit Post</Button>
              </Link>
              <Button
                onClick={deletePost}
                className="m-2 bg-red-600 hover:bg-red-700"
              >
                Delete Post
              </Button>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold my-4">{post.title}</h1>
            <div className="prose">{parse(post.content)}</div>
          </div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post

// import React, {useState, useEffect, use} from 'react'
// import { Button , Container } from "../index"
// import services from '../../lib/Config'
// import { Link , useParams , useNavigate } from 'react-router-dom'
// import parse from 'html-react-parser'
// import { useSelector } from 'react-redux'


// const Post = () => {
//     const [ post , setPost ] = useState(null)
//     const {  slug } = useParams()
//     const navigate = useNavigate()
//     const userData = useSelector((state) => state.auth.userData)
//     const isAuthor = post && userData ? post.userId === userData.$id : false
//     useEffect(() => {
//         if (slug) {
//             services.getPost(slug).then((post) => {
//                 if (post) setPost(post)
//                 else navigate('/')
//             })
//         }
//         else { navigate('/') }
            
//     }, [])
//     const deletePost = () => {
//         if (post) {
//             services.deletePost(post.$id).then((res) => {

//                 if (res) {
//                     services.getFileDelete(post.featuredImageId)
//                      navigate('/')
                    
//                 }
//             })
//         }
//     }
//   return post? (
//     <div>
//        <Container>
//         <div>
//             <img src= {services.getFilePreview(post.featuredImageId)}
//             alt= {post.title}
//             className='rounded-xl' 
//             />
//             {
//                 isAuthor && (
//                     <div>
//                         <Link to={`/edit/${post.$id}`}>
//                             <Button className="m-2">Edit Post</Button>
//                         </Link>
//                         <Button onClick={deletePost} className="m-2 bg-red-600 hover:bg-red-700">Delete Post</Button>
//                     </div>
//                 )

//             }
//             <div>
//                 <h1 className='text-3xl font-bold my-4'>{post.title}</h1>
//                 <div className='prose'>
//                     {parse(post.content)}
//                 </div>
//             </div>
            
//         </div>
        
        
//         </Container> 
//     </div>
//   ) : (null)
// }

// export default Post