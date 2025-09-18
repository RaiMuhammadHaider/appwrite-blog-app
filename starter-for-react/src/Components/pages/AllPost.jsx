import React, {useState , useEffect, use} from 'react'
import { Container , PostCard } from  "../index"
import services from '../../lib/Config'

const AllPost = () => {
    const [posts , setPosts] = useState([])
    useEffect(() => {} , [])
    useEffect(() => {
        services.getPosts().then((posts)=>{
            if (posts) {
                setPosts(posts.documents)
            }
        })
    } , [])
  return (
    <div>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-10'>
          {posts.map((post) => (
            <div key={post.$id} className='w-full'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPost