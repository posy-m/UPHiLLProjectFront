'use client'
import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <main>{children}</main>
      
    </QueryClientProvider>
  )
}

export default Layout;
