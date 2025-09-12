import React  from 'react'
import { Link } from 'react-router'
import services from '../lib/Config'
const PostCard = ({
    title,
    $id,
    FeaturedImage,

}) => {
    

  return (
   <Link to={`/post/${$id}`} className='border border-gray-300 rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
       <img src={services.getFilePreview(FeaturedImage)} alt={title} className='w-full h-48 object-cover rounded-2xl' />
       <div className='p-4'>
           <h2 className='text-lg font-semibold'>{title}</h2>
       </div>
   </Link>
  )
}

export default PostCard