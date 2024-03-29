import React, { useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import store from '../../store'
import { isEmpty } from '../Functions'

const AppHeaderDropdown = () => {
  const history = useHistory()
  const state = store.getState()
  let user_name = ''
  if (state.user) user_name = state.user.full_name
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
        <div>
          <CAvatar src={avatar8} size="md" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">{user_name}</CDropdownHeader>
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
