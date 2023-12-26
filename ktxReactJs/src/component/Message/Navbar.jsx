import React, { useContext } from 'react'
const Navbar = () => {
  return (
    <div className='navbar'>
      <span className="logo">iDorm Chat</span>
      <div className="user">
        <img src='https://images.pexels.com/photos/837306/pexels-photo-837306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="" />
        <span>Admin</span>
       
        
      </div>
    </div>
  )
}

export default Navbar