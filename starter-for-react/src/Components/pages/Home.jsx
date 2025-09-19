// import React, {useState , useEffect} from 'react'
// import { Container , PostCard } from  "../index"
// import services from '../../lib/Config'


// const Home = () => {
//     const [posts , setPosts] = useState([])
//     useEffect(() => {
//         services.getPosts().then((posts)=>{
//             if (posts) {
//                 setPosts(posts.documents)
//             }
//         })
//     } , [])
//   return posts.length === 0 ? (
//     <div>Loading...</div>
//   ) : (
//     <div>
//     <Container>
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-10'>
//             {posts.map((post)=>{
//                 <div key={post.$id}>
//                     <PostCard {...post} />
//                 </div>
//             })}
//         </div>
//     </Container>
  
// </div>
//     )
// }   

// export default Home
import React, { useState, useEffect } from 'react'
import { Container, PostCard } from "../../Components/index"
import services from '../../lib/Config'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    services.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
      setLoading(false)
    }).catch((err) => {
      console.error("Error fetching posts:", err)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (posts.length === 0) {
    return <div className="flex justify-center items-center min-h-screen">No posts available</div>
  }

  return (
    <div>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-10'>
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
