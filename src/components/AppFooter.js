import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <a href="https://github.com/Xar0n" target="_blank" rel="noopener noreferrer">
          Xar0n
        </a>
        <span className="me-1"> &copy; 2022</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
