import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='root'>
      <Sidebar />
      {/* Mobile Nav */}
        <div className='root-container'>
            <div className='wrapper'>
            {children}
            </div>

        </div>


        
    </main>
  )
}

export default layout
