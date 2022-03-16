import React, { useEffect, useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import Select from 'react-select'
import axios from 'axios'
import CreatableSelect from 'react-select/creatable'
import Swal from 'sweetalert2'

function addKeyValue(obj, key, data) {
  obj[key] = data
}

const CreateObject = () => {
  const [inventoryNumberList, setInventoryNumberList] = useState([])
  const [viewList, setViewList] = useState([])
  const [gradeList, setGradeList] = useState([])
  const [groupList, setGroupList] = useState([])
  const [organizationList, setOrganizationList] = useState([])
  const [addressList, setAddressList] = useState([])
  const [storageList, setStorageList] = useState([])
  const [nameList, setNameList] = useState([])
  const [errorList, setErrorList] = useState([])
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

  const handleSelect = (value, action) => {
    setObjectInput({ ...objectInput, [action.name]: value.value })
    console.log(objectInput)
  }

  const handleSelectChange = (value, action) => {
    console.log(value)
    console.log(action)
  }

  const handleInput = (e) => {
    e.persist()
    setObjectInput({ ...objectInput, [e.target.name]: e.target.value })
    console.log(objectInput)
  }

  const storeObjectSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('inventory_number_id', objectInput.inventory_number_id)
    formData.append('name_id', objectInput.name_id)
    formData.append('view_id', objectInput.view_id)
    formData.append('grade_id', objectInput.grade_id)
    formData.append('group_id', objectInput.group_id)
    formData.append('organization_id', objectInput.organization_id)
    formData.append('address_id', objectInput.address_id)
    formData.append('storage_id', objectInput.storage_id)
    formData.append('count', objectInput.count)
    axios.post('api/objects', formData).then((res) => {
      if (res === 200) {
        Swal.fire('Создание объекта', res.data.message, 'success')
        setErrorList([])
      } else {
        Swal.fire('Создание объекта', res.data.message, 'warning')
        setErrorList(res.data.errors)
      }
    })
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
  let filteredStorageList = storageList.filter((o) => o.link === objectInput.address_id)
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
                <span className={'main-color'}>*</span>
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
              <CFormLabel htmlFor={'selectView'} className="col-sm-2 col-form-label">
                Вид Creatable
              </CFormLabel>
              <div className="col-sm-10">
                <CreatableSelect
                  name="view_id"
                  id="selectView"
                  isClearable
                  placeholder="Введите или выберите вид"
                  onChange={handleSelect}
                  onInputChange={handleSelectChange}
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
                <span className={'main-color'}>*</span>
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
                <span className={'main-color'}>*</span>
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
                <span className={'main-color'}>*</span>
              </CFormLabel>
              <div className="col-sm-10">
                <Select
                  name="storage_id"
                  id="selectStorage"
                  isClearable
                  placeholder="Выберите склад/кабинет"
                  onChange={handleSelect}
                  options={filteredStorageList}
                />
              </div>
            </CRow>
            <CRow className="mb-5">
              <CFormLabel htmlFor={'inputCount'} className="col-sm-2 col-form-label">
                Количество
                <span className={'main-color'}>*</span>
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
              <CCol sm={12} className="d-none d-md-block">
                <CButtonGroup className="float-end">
                  <CButton type={'submit'} color="dark" variant="outline" className="mx-4">
                    Создать
                  </CButton>
                  {/*TODO Заменить на Link*/}
                  <CButton color="dark" variant="outline">
                    Отменить
                  </CButton>
                </CButtonGroup>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}
export default CreateObject
