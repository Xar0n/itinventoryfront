import React, { useEffect, useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import Select from 'react-select'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const ViewEquipment = (props) => {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  useEffect(() => {
    let isMounted = true
    // eslint-disable-next-line react/prop-types
    const equipment_id = props.match.params.id
    axios.get(`/api/equipments/${equipment_id}`).then((response) => {
      if (isMounted) {
        if (response.data.status === 200) {
          setEquipment(response.data.equipment)
          setLoading(false)
        } else if (response.data.status === 404) {
          history.push('/equipment')
          Swal.fire('Просмотр оборудования', response.data.message, 'warning')
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
                Просмотр оборудования {equipment.equipment.config_item.name}
              </h4>
            </CCol>
          </CRow>
          <h5 className="mb-3">Основная информация</h5>
          <CRow className="mb-3">
            <div className="col-sm-2">Инвентарный номер:</div>
            <div className="col-sm-10">{equipment.equipment.inventory_number.number}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Штрих-код:</div>
            <div className="col-sm-10">{equipment.barcode.code}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Наименование:</div>
            <div className="col-sm-10">{equipment.equipment.config_item.name}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Вид:</div>
            <div className="col-sm-10">{equipment.equipment.view.name}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Сорт:</div>
            <div className="col-sm-10">{equipment.equipment.grade.name}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Группа:</div>
            <div className="col-sm-10">{equipment.equipment.group.name}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Сотрудник:</div>
            <div className="col-sm-10">{equipment.employee.full_name}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Дата добавления:</div>
            <div className="col-sm-10">{equipment.created_at}</div>
          </CRow>
          <CRow className="mb-4">
            <div className="col-sm-2">Дата актуализации:</div>
            <div className="col-sm-10">{equipment.updated_at}</div>
          </CRow>
          <h5 className="mb-3">Местоположение</h5>
          <CRow className="mb-3">
            <div className="col-sm-2">Организация:</div>
            <div className="col-sm-10">{equipment.equipment.organization.name}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Адрес:</div>
            <div className="col-sm-10">{equipment.equipment.room.address.name}</div>
          </CRow>
          <CRow className="mb-5">
            <div className="col-sm-2">Склад/кабинет:</div>
            <div className="col-sm-10">{equipment.equipment.room.storage}</div>
          </CRow>
          <CRow className="mb-5">
            <CCol sm={12} className="d-none d-md-block">
              <CButton color="dark" variant="outline" className="float-start btn-select">
                Списать
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={12} className="d-none d-md-block">
              <CButtonGroup className="float-start">
                <Link
                  to={`/equipment/edit/${equipment.id}`}
                  className="btn btn-outline-dark mx-0 btn-select"
                >
                  Редактировать
                </Link>
                <Link
                  to={`/equipment/history/${equipment.id}`}
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
export default ViewEquipment
