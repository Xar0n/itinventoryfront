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

const EditEquipment = (props) => {
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
                Редактирование оборудования {equipment.equipment.config_item.name}
              </h4>
            </CCol>
          </CRow>
          <h5 className="mb-3">Основная информация</h5>
          <CRow className="mb-3">
            <div className="col-sm-2">Инвентарный номер:</div>
            <div className="col-sm-8">
              <Select
                name="inventory_number_id"
                id="selectInventoryNumber"
                value={{
                  label: equipment.equipment.inventory_number.number,
                }}
                isClearable
                isDisabled={true}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Штрих-код:</div>
            <div className="col-sm-8">
              <Select
                name="barcode_id"
                id="selectBarcode"
                isClearable
                value={{
                  label: equipment.barcode.code,
                }}
                placeholder="Введите или выберите штрих-код"
              />
            </div>
            <div className="col-sm-1">
              <CButton type={'submit'} color="dark" variant="outline" className="btn-select">
                Сформировать
              </CButton>
            </div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Наименование:</div>
            <div className="col-sm-8">
              <Select
                name="name_id"
                id="selectName"
                isClearable
                value={{
                  label: equipment.equipment.config_item.name,
                }}
                isDisabled={true}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Вид:</div>
            <div className="col-sm-8">
              <Select
                name="name_id"
                id="selectName"
                isClearable
                value={{
                  label: equipment.equipment.view.name,
                }}
                isDisabled={true}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Сорт:</div>
            <div className="col-sm-8">
              <Select
                name="grade_id"
                id="selectGrade"
                isClearable
                value={{
                  label: equipment.equipment.grade.name,
                }}
                isDisabled={true}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Группа:</div>
            <div className="col-sm-8">
              <Select
                name="group_id"
                id="selectGroup"
                isClearable
                value={{
                  label: equipment.equipment.group.name,
                }}
                isDisabled={true}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Сотрудник:</div>
            <div className="col-sm-8">
              <Select
                name="employee_id"
                id="selectEmployee"
                isClearable
                value={{
                  label: equipment.employee.full_name,
                }}
                placeholder="Выберите сотрудника"
              />
            </div>
          </CRow>
          <h5 className="mb-3">Местоположение</h5>
          <CRow className="mb-3">
            <div className="col-sm-2">Организация:</div>
            <div className="col-sm-8">
              <Select
                name="organization_id"
                id="selectOrganization"
                isClearable
                value={{
                  label: equipment.equipment.organization.name,
                }}
                isDisabled={true}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Адрес:</div>
            <div className="col-sm-8">
              <Select
                name="address_id"
                id="selectAddress"
                isClearable
                value={{
                  label: equipment.equipment.room.address.name,
                }}
                isDisabled={true}
              />
            </div>
          </CRow>
          <CRow className="mb-5">
            <div className="col-sm-2">Склад/кабинет:</div>
            <div className="col-sm-8">
              <Select
                name="storage_id"
                id="selectStorage"
                isClearable
                value={{
                  label: equipment.equipment.room.storage,
                }}
                isDisabled={true}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={12} className="d-none d-md-block">
              <CButtonGroup className="float-start">
                <Link to={`/equipment`} className="btn btn-outline-dark mx-0 btn-select">
                  Редактировать
                </Link>
                <Link
                  to={`/equipment/${equipment.id}`}
                  className="btn btn-outline-dark mx-4 btn-select"
                >
                  Отменить
                </Link>
              </CButtonGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
export default EditEquipment
