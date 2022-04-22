import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const DefaultLayout = () => {
  const history = useHistory()
  const [Authenticated, setAuthenticated] = useState(false)
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get('api/checkingAuthenticated').then((res) => {
      if (res.status === 200) {
        setAuthenticated(true)
        setLoading(false)
      }
    })
    return () => {
      setAuthenticated(false)
    }
  }, [])

  axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    let isFirefox = typeof InstallTrigger
    if (isFirefox) {
      return err
    }
    if (err.response.status === 401) {
      history.push('/')
    }
    return Promise.reject(err)
  })

  if (Loading) {
    return (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )
  }
  return Authenticated ? (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  )
}

export default DefaultLayout
