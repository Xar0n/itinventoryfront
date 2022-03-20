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

function addKeyValue(obj, key, data) {
  obj[key] = data
}

const EditEquipment = (props) => {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [barcode, setBarcode] = useState()
  const [location, setLocation] = useState()
  const [selectEmployee, setSelectEmployee] = useState()
  const [employeeList, setEmployeeList] = useState([])
  const [errorList, setErrorList] = useState([])
  const history = useHistory()

  const barcodeGenerateClick = (e) => {
    e.preventDefault()
    axios.get(`api/barcode/generate`).then((res) => {
      if (res.data.status === 200) setBarcode(res.data.barcode)
    })
  }

  const updateEquipmentSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    let data = {}
    if (barcode) data['barcode'] = barcode
    if (selectEmployee.value) data['employee_id'] = selectEmployee.value
    if (location) data['location'] = location
    axios.patch(`api/equipments/${equipment.id}`, data).then((res) => {
      if (res.data.status === 200) {
        Swal.fire('Редактирование оборудования', res.data.message, 'success')
        history.push(`/equipment/${equipment.id}`)
        setErrorList([])
      } else {
        setErrorList(res.data.errors)
      }
    })
  }

  useEffect(() => {
    let isMounted = true
    // eslint-disable-next-line react/prop-types
    const equipment_id = props.match.params.id
    axios.get(`/api/equipments/${equipment_id}`).then((response) => {
      if (isMounted) {
        if (response.data.status === 200) {
          const equipment_l = response.data.equipment
          setEquipment(response.data.equipment)
          axios.get(`api/all-employee/${equipment_l.equipment.organization.id}`).then((res) => {
            if (res.data.status === 200) {
              let employee = res.data.employee
              employee.map(function (o) {
                return addKeyValue(o, 'label', o.full_name)
              })
              setSelectEmployee({
                label: equipment_l.employee?.full_name,
                value: equipment_l.employee?.id,
              })
              setBarcode(equipment_l.barcode.code)
              setLocation(equipment_l.location)
              setEmployeeList(employee)
              setLoading(false)
            }
          })
        } else if (response.data.status === 404) {
          history.push('/equipment')
          Swal.fire('Редактирование оборудования', response.data.message, 'warning')
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
                  label: equipment.equipment.inventory_number?.number,
                }}
                isClearable
                isDisabled={true}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Штрих-код:</div>
            <div className="col-sm-8">
              <CFormInput
                type={'text'}
                id={'inputCount'}
                placeholder="Введите или сформируйте штрих-код "
                aria-label="Количество"
                aria-describedby="count"
                name={'barcode'}
                value={barcode}
                onChange={(e) => {
                  setBarcode(e.target.value)
                }}
              />
              {errorList?.barcode?.map(function (error) {
                return <li key={error}>{error}</li>
              })}
            </div>
            <div className="col-sm-1">
              <CButton
                onClick={barcodeGenerateClick}
                type={'submit'}
                color="dark"
                variant="outline"
                className="btn-select"
              >
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
                  label: equipment.equipment.view?.name,
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
                  label: equipment.equipment.grade?.name,
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
                  label: equipment.equipment.group?.name,
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
                value={selectEmployee}
                options={employeeList}
                onChange={(e) => {
                  setSelectEmployee(e)
                }}
                placeholder="Выберите сотрудника"
              />
              {errorList?.employee?.map(function (error) {
                return <li key={error}>{error}</li>
              })}
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
          <CRow className="mb-3">
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
          <CRow className="mb-5">
            <div className="col-sm-2">Доп.инф.:</div>
            <div className="col-sm-8">
              <CFormInput
                type={'text'}
                id={'inputLocation'}
                placeholder="Введите дополнительную информацию о местоположении"
                aria-label="Дополнительная информация о местоположении"
                aria-describedby="location"
                name={'location'}
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value)
                }}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={12} className="d-none d-md-block">
              <CButtonGroup className="float-start">
                <CButton
                  onClick={updateEquipmentSubmit}
                  type={'submit'}
                  color="dark"
                  variant="outline"
                  className="btn-select"
                >
                  Редактировать
                </CButton>
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
