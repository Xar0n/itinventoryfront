import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Select from 'react-select'
import Swal from 'sweetalert2'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const Login = () => {
  const history = useHistory()
  const [selectedOption, setSelectedOption] = useState(null)
  const [loginInput, setLogin] = useState({
    login: '',
    password: '',
    error_list: [],
  })

  const handleInput = (e) => {
    e.persist()
    setLogin({ ...loginInput, [e.target.name]: e.target.value })
  }

  const loginSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: loginInput.name,
      password: loginInput.password,
    }
    axios.get('/sanctum/csrf-cookie').then(() => {
      axios.post('/api/login', data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token)
          localStorage.setItem('auth_name', res.data.username)
          Swal.fire('Авторизация', res.data.message, 'success')
          history.push('/')
        } else if (res.data.status === 401) {
          Swal.fire('Авторизация', res.data.message, 'warning')
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors })
        }
      })
    })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={loginSubmit}>
                    <h1 className={'text-center'}>Инвентаризация ИТ-активов</h1>
                    <h2 className={'text-center'}>Авторизация</h2>
                    <p className="text-medium-emphasis text-center">Войдите в ваш аккаунт</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Логин"
                        name={'name'}
                        onChange={handleInput}
                        value={loginInput.name}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Пароль"
                        name={'password'}
                        onChange={handleInput}
                        value={loginInput.password}
                      />
                    </CInputGroup>
                    <CRow className="justify-content-center">
                      <CCol xs={2}>
                        <CButton
                          type={'submit'}
                          color="dark"
                          variant="outline"
                          className="px-4 btn-select"
                        >
                          Войти
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
