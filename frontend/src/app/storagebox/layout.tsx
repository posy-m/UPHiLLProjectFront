"use client"

import React, { Component, useState } from 'react'
import Footerbar from '../_components/footerbar/footerbar'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '../_components/header/header';
import { usePathname } from 'next/navigation';

const queryClient = new QueryClient();

const layout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname()

  return (<>
    <QueryClientProvider client={queryClient}>
      <Header showBackButton={path === '/signup' ? true : false} />
      {children}
      <Footerbar />
    </QueryClientProvider >
  </>)

}

export default layout