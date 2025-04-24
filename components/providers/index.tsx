'use client'
import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'
import QueryProvider from './query-provider'
import { Toaster } from "@/components/ui/sonner"
export default function RootProvider({children}: PropsWithChildren) {
  return (
    <QueryProvider>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </QueryProvider>
  )
}
