import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import Select from 'react-select'
import axios from 'axios'

function addKeyValue(obj, key, data) {
  obj[key] = data
}

const StoreObject = () => {
  const [selectedOption, setSelectedOption] = useState([])
  const [inventoryNumberList, setInventoryNumberList] = useState([])
  const [viewList, setViewList] = useState([])
  const [gradeList, setGradeList] = useState([])
  const [groupList, setGroupList] = useState([])
  const [organizationList, setOrganizationList] = useState([])
  const [addressList, setAddressList] = useState([])
  const [storageList, setStorageList] = useState([])
  const [nameList, setNameList] = useState([])
  const [objectInput, setObjectInput] = useState({
    inventory_number_id: '',
    name_id: '',
    view_id: '',
    grade_id: '',
    group_id: '',
    organization_id: '',
    address_id: '',
    storage_id: '',
    count: '',
  })
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  const handleSelect = (value, action) => {
    setObjectInput({ ...objectInput, [action.name]: value.value })
    console.log(objectInput)
  }

  const handleInput = (e) => {
    e.persist()
    setObjectInput({ ...objectInput, [e.target.name]: e.target.value })
    console.log(objectInput)
  }

  const storeObjectSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    axios.get('api/all-inventory-number').then((res) => {
      if (res.data.status === 200) {
        setInventoryNumberList(res.data.inventory_numbers)
      }
    })
    axios.get('api/all-name').then((res) => {
      if (res.data.status === 200) {
        setNameList(res.data.names)
      }
    })
    axios.get('api/all-view').then((res) => {
      if (res.data.status === 200) {
        setViewList(res.data.views)
      }
    })
    axios.get('api/all-grade').then((res) => {
      if (res.data.status === 200) {
        setGradeList(res.data.grades)
      }
    })
    axios.get('api/all-group').then((res) => {
      if (res.data.status === 200) {
        setGroupList(res.data.groups)
      }
    })
    axios.get('api/all-organization').then((res) => {
      if (res.data.status === 200) {
        setOrganizationList(res.data.organizations)
      }
    })
    axios.get('api/all-address').then((res) => {
      if (res.data.status === 200) {
        setAddressList(res.data.addresses)
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
  }, [])

  return (
    <>
      <CCard className="mb-5">
        <CCardBody>
          <CRow className={'mb-5'}>
            <CCol sm={5}>
              <h4 id="equipment-header" className="card-title mb-0">
                Создать оборудование
              </h4>
            </CCol>
          </CRow>
          <CForm onSubmit={storeObjectSubmit}>
            <CRow className="mb-3">
              <CFormLabel htmlFor={'selectInventoryNumber'} className="col-sm-2 col-form-label">
                Инвентарный номер
              </CFormLabel>
              <div className="col-sm-10">
                <Select
                  name="inventory_number_id"
                  id="selectInventoryNumber"
                  isClearable
                  placeholder="Введите или выберите инвентарный номер"
                  options={inventoryNumberList}
                  onChange={handleSelect}
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor={'selectInventoryNumber'} className="col-sm-2 col-form-label">
                Наименование
              </CFormLabel>
              <div className="col-sm-10">
                <Select
                  name="name_id"
                  id="selectName"
                  isClearable
                  placeholder="Введите или выберите наименование"
                  options={nameList}
                  onChange={handleSelect}
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor={'selectView'} className="col-sm-2 col-form-label">
                Вид
              </CFormLabel>
              <div className="col-sm-10">
                <Select
                  name="view_id"
                  id="selectView"
                  isClearable
                  placeholder="Введите или выберите вид"
                  onChange={handleSelect}
                  options={viewList}
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor={'selectGrade'} className="col-sm-2 col-form-label">
                Сорт
              </CFormLabel>
              <div className="col-sm-10">
                <Select
                  name="grade_id"
                  id="selectGrade"
                  isClearable
                  placeholder="Введите или выберите сорт"
                  onChange={handleSelect}
                  options={gradeList}
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor={'selectGroup'} className="col-sm-2 col-form-label">
                Группа
              </CFormLabel>
              <div className="col-sm-10">
                <Select
                  name="group_id"
                  id="selectGroup"
                  isClearable
                  placeholder="Введите или выберите группу"
                  onChange={handleSelect}
                  options={groupList}
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor={'selectOrganization'} className="col-sm-2 col-form-label">
                Организация
              </CFormLabel>
              <div className="col-sm-10">
                <Select
                  name="organization_id"
                  id="selectOrganization"
                  isClearable
                  placeholder="Выберите организацию"
                  onChange={handleSelect}
                  options={organizationList}
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor={'selectAddress'} className="col-sm-2 col-form-label">
                Адрес
              </CFormLabel>
              <div className="col-sm-10">
                <Select
                  name="address_id"
                  id="selectAddress"
                  isClearable
                  placeholder="Выберите адрес"
                  onChange={handleSelect}
                  options={addressList}
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor={'selectStorage'} className="col-sm-2 col-form-label">
                Склад / кабинет
              </CFormLabel>
              <div className="col-sm-10">
                <Select
                  name="storage_id"
                  id="selectStorage"
                  isClearable
                  placeholder="Выберите склад/кабинет"
                  onChange={handleSelect}
                  options={storageList.filter((o) => o.link === objectInput.address_id)}
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor={'inputCount'} className="col-sm-2 col-form-label">
                Количество
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput
                  type={'text'}
                  id={'inputCount'}
                  placeholder="Введите количество"
                  aria-label="Количество"
                  aria-describedby="count"
                  name={'count'}
                  onChange={handleInput}
                />
              </div>
            </CRow>

            {/*TODO Добавить отображение справа float-left*/}
            <CRow className="mb-3">
              <div className="col-sm-1">
                <CButton type={'submit'} color="dark" variant="outline" className="px-4">
                  Создать
                </CButton>
              </div>
              <div className="col-sm-1">
                {/*TODO Заменить на Link*/}
                <CButton type={'submit'} color="dark" variant="outline" className="px-4">
                  Отменить
                </CButton>
              </div>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}
export default StoreObject
