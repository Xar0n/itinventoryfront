import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const history = useHistory()
  const logoutSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/logout').then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_name')
        history.push('/login')
        window.location.reload()
      } else {
      }
    })
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Профиль
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Настройки
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={logoutSubmit}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Выход
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
