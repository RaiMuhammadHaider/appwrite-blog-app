import React from 'react'
import { Button, Container, Logo, LogoutBtn } from '../index'
import { Link , useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const navItems = [
        {name: 'Home', slug : '/' , active : !authStatus},
        {name: 'login', slug : '/login' , active : !authStatus},
        {name : 'signup', slug : '/signup' , active : !authStatus},
        {name : "allPosts", slug : '/posts' , active : authStatus},
        {name : "createPost", slug : '/create-post' , active : authStatus},

    ]

  return (
  <head>
    <div className='w-full shadow-md py-4'>
        <Container>
            <nav className='flex justify-between items-center'>
                <Link to={'/'}>
                <Logo width='120px'/>
                </Link>
                <div className='flex gap-4 items-center'>
{
    navItems.map((item)=> item.active ? <Button key={item.name} onClick={() => navigate(item.slug)} className='capitalize'>{item.name}</Button> : null)
    

}
{authStatus && <li><LogoutBtn/></li>}
                </div>
            </nav>
        </Container>
    </div>
  </head>
    

                )
}

export default Header