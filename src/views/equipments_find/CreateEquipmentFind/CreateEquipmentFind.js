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
import { Link, useHistory } from 'react-router-dom'
import { addKeyValue, isEmpty, arrUnique } from '../../../components/Functions'

const CreateEquipmentFind = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [inventoryNumberList, setInventoryNumberList] = useState([])
  const [addressList, setAddressList] = useState([])
  const [storageList, setStorageList] = useState([])
  const [nameList, setNameList] = useState([])
  const [errorList, setErrorList] = useState([])
  const [equipmentFindInput, setEquipmentFindInput] = useState({
    inventory_number_id: '',
    inventory_number_id_create: '',
    barcode: '',
    name_id: '',
    organization_id: '',
    address_id: '',
    storage_id: '',
  })

  const handleSelect = (value, action) => {
    if (action.action === 'create-option') {
      setEquipmentFindInput({
        ...equipmentFindInput,
        [action.name + '_create']: value.value,
        [action.name]: '',
      })
    } else if (action.action === 'select-option') {
      setEquipmentFindInput({
        ...equipmentFindInput,
        [action.name]: value.value,
        [action.name + '_create']: '',
      })
    }
  }

  const handleInput = (e) => {
    e.persist()
    setEquipmentFindInput({ ...equipmentFindInput, [e.target.name]: e.target.value })
    console.log(equipmentFindInput)
  }

  const storeObjectSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    const inventory_number_id = equipmentFindInput.inventory_number_id
    const inventory_number_id_create = equipmentFindInput.inventory_number_id_create
    const name_id = equipmentFindInput.name_id
    const name_id_create = equipmentFindInput.name_id_create
    const view_id = equipmentFindInput.view_id
    const view_id_create = equipmentFindInput.view_id_create
    const grade_id = equipmentFindInput.grade_id
    const grade_id_create = equipmentFindInput.grade_id_create
    const group_id = equipmentFindInput.group_id
    const group_id_create = equipmentFindInput.group_id_create
    if (isEmpty(inventory_number_id) && !isEmpty(inventory_number_id_create))
      formData.append('inventory_number_id_create', inventory_number_id_create)
    else if (!isEmpty(inventory_number_id))
      formData.append('inventory_number_id', inventory_number_id)
    if (isEmpty(name_id) && !isEmpty(name_id_create))
      formData.append('name_id_create', name_id_create)
    else if (!isEmpty(name_id)) formData.append('name_id', name_id)
    if (isEmpty(view_id) && !isEmpty(view_id_create))
      formData.append('view_id_create', view_id_create)
    else if (!isEmpty(view_id)) formData.append('view_id', view_id)
    if (isEmpty(grade_id) && !isEmpty(grade_id_create))
      formData.append('grade_id_create', grade_id_create)
    else if (!isEmpty(grade_id)) formData.append('grade_id', grade_id)
    if (isEmpty(group_id) && !isEmpty(grade_id_create))
      formData.append('group_id_create', group_id_create)
    else if (!isEmpty(group_id)) formData.append('group_id', group_id)
    formData.append('organization_id', equipmentFindInput.organization_id)
    formData.append('address_id', equipmentFindInput.address_id)
    formData.append('storage_id', equipmentFindInput.storage_id)
    formData.append('count', equipmentFindInput.count)
    axios.post('api/objects', formData).then((res) => {
      if (res.data.status === 200) {
        history.push('/object')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
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
        setLoading(false)
      }
    })
  }, [])
  let filteredAddressList = addressList.filter((o) => {
    let links = o.links
    for (let i = 0; i < links.length; i++) {
      return links[i] === equipmentFindInput.organization_id
    }
  })
  let filteredStorageList = storageList.filter((o) => o.link === equipmentFindInput.address_id)

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
          <CRow className={'mb-5'}>
            <CCol sm={5}>
              <h4 id="equipment-header" className="card-title mb-0">
                Создать объект
              </h4>
            </CCol>
          </CRow>
          <CForm onSubmit={storeObjectSubmit}>
            <CRow className="mb-3">
              <CFormLabel htmlFor={'selectInventoryNumber'} className="col-sm-2 col-form-label">
                Инвентарный номер:
              </CFormLabel>
              <div className="col-sm-10">
                <CreatableSelect
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
                Наименование:
                <span className={'main-color'}>*</span>
              </CFormLabel>
              <div className="col-sm-10">
                <CreatableSelect
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
                  onChange={handleSelect}
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
                  onChange={handleSelect}
                  options={filteredStorageList}
                />
                {errorList?.storage_id?.map(function (error) {
                  return <li key={error}>{error}</li>
                })}
              </div>
            </CRow>
            <CRow className="mb-5">
              <CFormLabel htmlFor={'inputCount'} className="col-sm-2 col-form-label">
                Количество:
                <span className={'main-color'}>*</span>
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput
                  type={'text'}
                  id={'inputCount'}
                  placeholder="Введите количество оборудования"
                  aria-label="Количество оборудования"
                  aria-describedby="count"
                  name={'count'}
                  onChange={handleInput}
                />
                {errorList?.count?.map(function (error) {
                  return <li key={error}>{error}</li>
                })}
              </div>
            </CRow>
            <CRow className="mb-3">
              <CCol sm={12} className="d-none d-md-block">
                <CButtonGroup className="float-start">
                  <CButton
                    type={'submit'}
                    color="dark"
                    variant="outline"
                    className="mx-0 btn-select"
                  >
                    Создать
                  </CButton>
                  <Link to={`/object`} className="btn btn-outline-dark mx-4 btn-select">
                    Отменить
                  </Link>
                </CButtonGroup>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}
export default CreateEquipmentFind
