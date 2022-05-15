import React from 'react'
import { CFormCheck } from '@coreui/react'

// eslint-disable-next-line react/prop-types,react/display-name
const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <>
      <CFormCheck ref={resolvedRef} {...rest} />
    </>
  )
})

export default IndeterminateCheckbox
