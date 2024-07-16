import React from 'react'
import { Link } from 'react-router-dom'

 const UserMenu = () => {
  return (
    <div>userMenu
  <div>
<ul class="w-44 h-32 text-sm flex  flex-col m-3 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 ">
    <Link to="/dashboard/user/profile" class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 hover:bg-gray-600">Profile</Link>
    <Link to="/dashboard/user/orders" class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-600">Orders</Link>
    
</ul>
    </div>

    </div>
  )
}

export default UserMenu