import { UserButton, SignedIn } from '@clerk/nextjs'
import React from 'react'

const Home = () => {
  return (
    <div>
<p>Home</p>
<SignedIn>
  <UserButton />
</SignedIn>
    </div>
  )
}

export default Home