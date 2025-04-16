'use client'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

export const Header = () => {
  return (
    <div>

      <Button onClick={() => signOut()}>Sign out</Button>
      Header
    </div>
  )
}
