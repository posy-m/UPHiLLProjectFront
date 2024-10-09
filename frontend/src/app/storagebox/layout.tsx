"use client"

import React, { Component, useState } from 'react'
import Footerbar from '../_components/footerbar/footerbar'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const layout = ({ children }: { children: React.ReactNode }) => {


  return (<>
    <QueryClientProvider client={queryClient}>
      {children}
      <Footerbar />
    </QueryClientProvider >
  </>)

}

export default layout