import React from "react"
import { Button, Container, Logo, LogoutBtn } from "../index"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    { name: "Home", slug: "/", active: true }, // always visible
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/posts", active: authStatus },
    { name: "Create Post", slug: "/create-post", active: authStatus },
    { name: "Contact", slug: "/contact", active: true }, // always visible
  ]

  return (
    <header>
      <div className="w-full shadow-md py-4 bg-white">
        <Container>
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/">
              <Logo width="120px" />
            </Link>

            {/* Navigation */}
            <div className="flex gap-4 items-center">
              {navItems.map(
                (item) =>
                  item.active && (
                    <Button
                      key={item.slug}
                      onClick={() => navigate(item.slug)}
                      className="capitalize"
                    >
                      {item.name}
                    </Button>
                  )
              )}

              {/* Logout button */}
              {authStatus && <LogoutBtn />}
            </div>
          </nav>
        </Container>
      </div>
    </header>
  )
}

export default Header
