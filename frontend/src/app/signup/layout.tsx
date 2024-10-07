"use client"

import React from 'react'
import Header from '../_components/header/header'
import { usePathname } from 'next/navigation'

const layout = ({ children }: { children: React.ReactNode }) => {

  const path = usePathname()

  return (<>
    <Header showBackButton={path === '/signup' ? true : false} />
    {children}
  </>)
}

export default layout