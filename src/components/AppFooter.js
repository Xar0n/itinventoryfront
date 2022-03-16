import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          T0NI
        </a>
        <span className="me-1"> &copy; 2022</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
