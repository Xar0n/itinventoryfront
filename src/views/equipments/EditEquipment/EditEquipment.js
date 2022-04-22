import React, { useEffect, useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import Select from 'react-select'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  addKeyValue,
  arrUnique,
  successMessageUserWithoutAccept,
} from '../../../components/Functions'
const EditEquipment = (props) => {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [barcode, setBarcode] = useState()
  const [location, setLocation] = useState()
  const [selectEmployee, setSelectEmployee] = useState()
  const [selectObject, setSelectObject] = useState()
  const [selectOrganization, setSelectOrganization] = useState()
  const [selectAddress, setSelectAddress] = useState()
  const [selectStorage, setSelectStorage] = useState()
  const [employeeList, setEmployeeList] = useState([])
  const [errorList, setErrorList] = useState([])
  const [objectList, setObjectList] = useState([])
  const [organizationList, setOrganizationList] = useState([])
  const [addressList, setAddressList] = useState([])
  const [storageList, setStorageList] = useState([])
  const history = useHistory()

  const barcodeGenerateClick = (e) => {
    e.preventDefault()
    axios.get(`api/barcode/generate`).then((res) => {
      if (res.data.status === 200) setBarcode(res.data.barcode)
    })
  }

  const updateEquipmentSubmit = (e) => {
    e.preventDefault()
    let data = {}
    if (barcode) data['barcode'] = barcode
    if (selectEmployee?.value) data['employee_id'] = selectEmployee?.value
    if (location) data['location'] = location
    data['object_id'] = selectObject.value
    axios.patch(`api/equipments/${equipment.id}`, data).then((res) => {
      if (res.data.status === 200) {
        setErrorList([])
        history.push(`/equipment/${equipment.id}`)
        successMessageUserWithoutAccept(res.data.message)
      } else {
        setErrorList(res.data.errors)
      }
    })
  }

  useEffect(() => {
    let isMounted = true
    axios.get('api/all-organization').then((res) => {
      if (res.data.status === 200) {
        setOrganizationList(res.data.organizations)
      }
    })
    axios.get('api/all-address').then((res) => {
      if (res.data.status === 200) {
        setAddressList(res.data.addresses)
        arrUnique(addressList)
      }
    })
    axios.get('api/all-storage').then((res) => {
      if (res.data.status === 200) {
        let storages = res.data.rooms
        storages.map(function (storage) {
          return addKeyValue(storage, 'label', storage.storage)
        })
        setStorageList(storages)
      }
    })
    // eslint-disable-next-line react/prop-types
    const equipment_id = props.match.params.id
    axios.get(`/api/equipments/edit/${equipment_id}`).then((response) => {
      if (isMounted) {
        if (response.data.status === 200) {
          const equipment_l = response.data.equipment
          const objects = response.data.objects_same
          setEquipment(response.data.equipment)
          axios.get(`api/all-employee/${equipment_l.equipment.organization.id}`).then((res) => {
            if (res.data.status === 200) {
              let employee = res.data.employee
              setSelectEmployee(equipment_l?.employee)
              setSelectOrganization(equipment_l?.organization)
              setBarcode(equipment_l?.barcode?.code)
              setLocation(equipment_l?.location)
              setObjectList(objects)
              setEmployeeList(employee)
              setLoading(false)
              setSelectObject(equipment_l?.equipment)
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

  let filteredAddressList = addressList.filter((o) => {
    let links = o.links
    for (let i = 0; i < links.length; i++) {
      return links[i] === selectOrganization.value
    }
  })
  let filteredStorageList = storageList.filter((o) => o.link === selectAddress.value)
  return (
    <>
      <CCard className="mb-5">
        <CCardBody>
          <CRow>
            <CCol sm={12}>
              <h4 id="equipment-header" className="card-title mb-5">
                Редактирование оборудования {equipment?.equipment?.config_item.name}
              </h4>
            </CCol>
          </CRow>
          <h5 className="mb-3">Основная информация</h5>
          <CRow className="mb-3">
            <CFormLabel htmlFor={'selectObject'} className="col-sm-2 col-form-label">
              Объект:
            </CFormLabel>
            <div className="col-sm-8">
              <Select
                name="equipment_id"
                id="selectObject"
                value={selectObject}
                onChange={(e) => setSelectObject(e)}
                options={objectList}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor={'selectStorage'} className="col-sm-2 col-form-label">
              Инвентарный номер:
            </CFormLabel>
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
            <CFormLabel htmlFor={'selectStorage'} className="col-sm-2 col-form-label">
              Штрих-код:
            </CFormLabel>
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
            <CFormLabel htmlFor={'selectStorage'} className="col-sm-2 col-form-label">
              Наименование:
            </CFormLabel>
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
            <CFormLabel htmlFor={'selectStorage'} className="col-sm-2 col-form-label">
              Вид:
            </CFormLabel>
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
            <CFormLabel htmlFor={'selectStorage'} className="col-sm-2 col-form-label">
              Сорт:
            </CFormLabel>
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
            <CFormLabel htmlFor={'selectStorage'} className="col-sm-2 col-form-label">
              Группа:
            </CFormLabel>
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
            <CFormLabel htmlFor={'selectStorage'} className="col-sm-2 col-form-label">
              Сотрудник:
            </CFormLabel>
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
            <CFormLabel htmlFor={'selectOrganization'} className="col-sm-2 col-form-label">
              Организация:
              <span className={'main-color'}>*</span>
            </CFormLabel>
            <div className="col-sm-10">
              <Select
                name="organization_id"
                id="selectOrganization"
                isClearable
                placeholder="Выберите организацию"
                value={selectOrganization}
                onChange={(e) => {
                  setSelectOrganization(e)
                }}
                options={organizationList}
              />
              {errorList?.organization_id?.map(function (error) {
                return <li key={error}>{error}</li>
              })}
            </div>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor={'selectAddress'} className="col-sm-2 col-form-label">
              Адрес:
              <span className={'main-color'}>*</span>
            </CFormLabel>
            <div className="col-sm-10">
              <Select
                name="address_id"
                id="selectAddress"
                isClearable
                placeholder="Выберите адрес"
                options={filteredAddressList}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel htmlFor={'selectStorage'} className="col-sm-2 col-form-label">
              Склад / кабинет:
              <span className={'main-color'}>*</span>
            </CFormLabel>
            <div className="col-sm-10">
              <Select
                name="storage_id"
                id="selectStorage"
                isClearable
                placeholder="Выберите склад/кабинет"
                options={filteredStorageList}
              />
              {errorList?.storage_id?.map(function (error) {
                return <li key={error}>{error}</li>
              })}
            </div>
          </CRow>
          <CRow className="mb-5">
            <CFormLabel htmlFor={'selectStorage'} className="col-sm-2 col-form-label">
              Доп.инф.:
            </CFormLabel>
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
