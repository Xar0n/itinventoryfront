import React, { useEffect, useState } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { showDate, successMessageUserWithoutAccept } from '../../../components/Functions'

const ViewEquipmentFind = (props) => {
  const [equipmentFind, setEquipmentFind] = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  // eslint-disable-next-line react/prop-types
  const equipment_find_id = props.match.params.id_eq
  // eslint-disable-next-line react/prop-types
  const list_id = props.match.params.id
  const deleteEquipmentFindClick = (e) => {
    e.preventDefault()
    axios.delete(`api/equipments_finds/${equipmentFind.id}`).then((res) => {
      if (res.data.status === 200) {
        history.push(`/list/${list_id}`)
        successMessageUserWithoutAccept(res.data.message)
      } else {
      }
    })
  }
  useEffect(() => {
    let isMounted = true
    axios.get(`/api/equipments_finds/${equipment_find_id}`).then((response) => {
      if (isMounted) {
        if (response.data.status === 200) {
          setEquipmentFind(response.data.equipment_find)
          setLoading(false)
        } else if (response.data.status === 404) {
          history.push(`/list/${list_id}`)
          Swal.fire('Просмотр найденного оборудования', response.data.message, 'warning')
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
                Просмотр объекта: {equipmentFind.config_item.name}
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
                  <div className="col-sm-10">{equipmentFind?.inventory_number?.number}</div>
                </CRow>
                <CRow className="mb-3">
                  <div className="col-sm-2">Наименование:</div>
                  <div className="col-sm-10">{equipmentFind.config_item.name}</div>
                </CRow>
                <CRow className="mb-3">
                  <div className="col-sm-2">Сотрудник:</div>
                  <div className="col-sm-10">{equipmentFind?.employee?.full_name}</div>
                </CRow>
                <CRow className="mb-3">
                  <div className="col-sm-2">Дата добавления:</div>
                  <div className="col-sm-10">{showDate(equipmentFind.created_at)}</div>
                </CRow>
                <CRow className="mb-3">
                  <div className="col-sm-2">Дата обновления:</div>
                  <div className="col-sm-10">{showDate(equipmentFind.updated_at)}</div>
                </CRow>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader>
                <h5 className="mb-3">Местоположение</h5>
              </CAccordionHeader>
              <CAccordionBody>
                <CRow className="mb-3">
                  <div className="col-sm-2">Склад/кабинет:</div>
                  <div className="col-sm-10">{equipmentFind?.room?.storage}</div>
                </CRow>
                <CRow>
                  <div className="col-sm-2">Доп.инф.:</div>
                  <div className="col-sm-10">{equipmentFind?.location}</div>
                </CRow>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
          <CRow className="mb-3">
            <CCol sm={12} className="d-none d-md-block">
              <CButtonGroup className="float-start">
                <Link
                  to={`/list/${equipmentFind.list_id}`}
                  className="btn btn-outline-dark btn-select"
                >
                  Назад
                </Link>
                <Link
                  to={`/object/edit/${equipmentFind.id}`}
                  className="btn btn-outline-dark mx-4 btn-select"
                >
                  Редактировать
                </Link>
                <CButton
                  onClick={deleteEquipmentFindClick}
                  color="dark"
                  variant="outline"
                  className="btn-select"
                >
                  Удалить
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
export default ViewEquipmentFind
