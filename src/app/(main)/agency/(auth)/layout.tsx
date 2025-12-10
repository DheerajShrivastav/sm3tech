import React from 'react'

const authlayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {children}
    </div>
  )
}

export default authlayout