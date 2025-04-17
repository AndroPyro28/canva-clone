'use client'
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export const Header = () => {
  const { } = useSession()
  return (
    <header className='h-16 border-b border-gray-200 bg-white flex items-center'>
      <Button onClick={() => signOut()}>Sign out</Button>
      Header
    </header>
  )
}
