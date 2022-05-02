import React, { useEffect, useState } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { showDate } from '../../../components/Functions'

const ViewObject = (props) => {
  const [object, setObject] = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  useEffect(() => {
    let isMounted = true
    // eslint-disable-next-line react/prop-types
    const object_id = props.match.params.id
    axios.get(`/api/objects/${object_id}`).then((response) => {
      if (isMounted) {
        if (response.data.status === 200) {
          setObject(response.data.object)
          setLoading(false)
        } else if (response.data.status === 404) {
          history.push('/object')
          Swal.fire('Просмотр объекта', response.data.message, 'warning')
        }
      }
    })
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react/prop-types
  }, [props.match.params.id, history])
  if (loading) {
    return (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )
  }
  return (
    <>
      <CCard className="mb-5">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 id="equipment-header" className="card-title mb-5">
                Просмотр объекта: {object.config_item.name}
              </h4>
            </CCol>
          </CRow>
          <CAccordion className="mb-5" alwaysOpen activeItemKey={1}>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>
                <h5 className="mb-3">Основная информация</h5>
              </CAccordionHeader>
              <CAccordionBody>
                <CRow className="mb-3">
                  <div className="col-sm-2">Инвентарный номер:</div>
                  <div className="col-sm-10">{object.inventory_number?.number}</div>
                </CRow>
                <CRow className="mb-3">
                  <div className="col-sm-2">Наименование:</div>
                  <div className="col-sm-10">{object.config_item.name}</div>
                </CRow>
                <CRow className="mb-3">
                  <div className="col-sm-2">Вид:</div>
                  <div className="col-sm-10">{object.view?.name}</div>
                </CRow>
                <CRow className="mb-3">
                  <div className="col-sm-2">Сорт:</div>
                  <div className="col-sm-10">{object.grade?.name}</div>
                </CRow>
                <CRow className="mb-3">
                  <div className="col-sm-2">Группа:</div>
                  <div className="col-sm-10">{object.group?.name}</div>
                </CRow>
                <CRow className="mb-3">
                  <div className="col-sm-2">Дата добавления:</div>
                  <div className="col-sm-10">{showDate(object.created_at)}</div>
                </CRow>
                <CRow className="mb-3">
                  <div className="col-sm-2">Дата обновления:</div>
                  <div className="col-sm-10">{showDate(object.updated_at)}</div>
                </CRow>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader>
                <h5 className="mb-3">Местоположение</h5>
              </CAccordionHeader>
              <CAccordionBody>
                <CRow className="mb-3">
                  <div className="col-sm-2">Организация:</div>
                  <div className="col-sm-10">{object?.organization.name}</div>
                </CRow>
                <CRow className="mb-3">
                  <div className="col-sm-2">Адрес:</div>
                  <div className="col-sm-10">{object.room.address.name}</div>
                </CRow>
                <CRow className="mb-3">
                  <div className="col-sm-2">Склад/кабинет:</div>
                  <div className="col-sm-10">{object.room.storage}</div>
                </CRow>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
          <CRow className="mb-3">
            <CCol sm={12} className="d-none d-md-block">
              <CButtonGroup className="float-start">
                <Link
                  to={`/object/edit/${object.id}`}
                  className="btn btn-outline-dark mx-0 btn-select"
                >
                  Редактировать
                </Link>
                <Link
                  to={`/object/history/${object.id}`}
                  className="btn btn-outline-dark mx-4 btn-select"
                >
                  История
                </Link>
              </CButtonGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
export default ViewObject
