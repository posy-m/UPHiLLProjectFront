import React from 'react'
import Footerbar from '../_components/footerbar/footerbar'


const layout = ({ children }: { children: React.ReactNode }) => {
  return (<>
    {children}
    <Footerbar />
  </>)
}

export default layout