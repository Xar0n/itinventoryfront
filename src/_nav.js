import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBarcode,
  cilDescription,
  cilFindInPage,
  cilInbox,
  cilLaptop,
  cilPrint,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
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
    icon: <CIcon icon={cilFindInPage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Отчеты',
    to: '/report',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Генерация штрих-кодов',
    to: '/generate-barcode',
    icon: <CIcon icon={cilBarcode} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Печать штрих-кодов',
    to: '/print-barcode',
    icon: <CIcon icon={cilPrint} customClassName="nav-icon" />,
  },
]

export default _nav
