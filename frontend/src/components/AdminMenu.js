import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
  return (
    
    <div>
<ul class="w-44 h-32 text-sm flex  flex-col m-3 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white ">
    <Link to="/dashboard/admin/create-category" class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 hover:bg-gray-600">Create Category</Link>
    <Link to="/dashboard/admin/create-product" class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-600">Create Product</Link>
    <Link to="/dashboard/admin/users" class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-600">User</Link>
</ul>
    </div>
  )
}

export default AdminMenu