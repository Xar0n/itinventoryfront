import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilInbox, cilLaptop, cilList, cilPuzzle, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Главная',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Оборудование',
    to: '/equipment',
    icon: <CIcon icon={cilLaptop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Объекты',
    to: '/object',
    icon: <CIcon icon={cilInbox} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ведомости',
    to: '/list',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
]

export default _nav
