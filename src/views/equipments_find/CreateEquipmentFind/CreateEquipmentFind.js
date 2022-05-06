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

const CreateEquipmentFind = (props) => {
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [inventoryNumberList, setInventoryNumberList] = useState([])
  const [storageList, setStorageList] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [nameList, setNameList] = useState([])
  const [errorList, setErrorList] = useState([])
  const [equipmentFindInput, setEquipmentFindInput] = useState({
    inventory_number_id: '',
    inventory_number_id_create: '',
    barcode: '',
    location: '',
    name_id: '',
    employee_id: '',
    organization_id: '',
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

  const storeEquipmentFindSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    const inventory_number_id = equipmentFindInput.inventory_number_id
    const inventory_number_id_create = equipmentFindInput.inventory_number_id_create
    const barcode = equipmentFindInput.barcode
    const name_id = equipmentFindInput.name_id
    const location = equipmentFindInput.location
    const list_id = list.id
    const name_id_create = equipmentFindInput.name_id_create
    const employee_id = equipmentFindInput.employee_id
    if (isEmpty(inventory_number_id) && !isEmpty(inventory_number_id_create))
      formData.append('inventory_number_id_create', inventory_number_id_create)
    else if (!isEmpty(inventory_number_id))
      formData.append('inventory_number_id', inventory_number_id)
    if (isEmpty(name_id) && !isEmpty(name_id_create))
      formData.append('name_id_create', name_id_create)
    else if (!isEmpty(name_id)) formData.append('name_id', name_id)
    if (list.room_id) formData.append('storage_id', equipmentFindInput.storage_id)
    formData.append('location', location)
    formData.append('list_id', list_id)
    formData.append('employee_id', employee_id)
    formData.append('barcode', barcode)
    axios.post('api/equipments_finds', formData).then((res) => {
      if (res.data.status === 200) {
        history.push(`/list/${list.id}`)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
        setErrorList([])
      } else {
        Swal.fire('Создание найденного оборудования', res.data.message, 'warning')
        setErrorList(res.data.errors)
      }
    })
  }

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const list_id = props.match.params.id
    axios.get(`api/equipments_finds/create/${list_id}`).then((res) => {
      if (res.data.status === 200) {
        setList(res.data.list)
        setInventoryNumberList(res.data.inventory_numbers)
        setNameList(res.data.names)
        setStorageList(res.data.storages)
        setEmployeeList(res.data.employees)
        setLoading(false)
      }
    })
  }, [])

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
                Создать найденное оборудование
              </h4>
            </CCol>
          </CRow>
          <CForm onSubmit={storeEquipmentFindSubmit}>
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
              <CFormLabel htmlFor={'inputBarcode'} className="col-sm-2 col-form-label">
                Штрихкод:
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput
                  type={'text'}
                  id={'inputBarcode'}
                  placeholder="Введите штрихкод"
                  aria-label="Штрихкод"
                  aria-describedby="barcode"
                  name={'barcode'}
                  onChange={handleInput}
                />
                {errorList?.barcode?.map(function (error) {
                  return <li key={error}>{error}</li>
                })}
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor={'selectStorage'} className="col-sm-2 col-form-label">
                Сотрудник:
              </CFormLabel>
              <div className="col-sm-10">
                <Select
                  name="employee_id"
                  id="selectEmployee"
                  isClearable
                  placeholder="Выберите сотрудника"
                  onChange={handleSelect}
                  options={employeeList}
                />
                {errorList?.employee_id?.map(function (error) {
                  return <li key={error}>{error}</li>
                })}
              </div>
            </CRow>
            {!list.room_id && (
              <CRow className="mb-3">
                <CFormLabel htmlFor={'selectStorage'} className="col-sm-2 col-form-label">
                  Хранилище:
                  <span className={'main-color'}>*</span>
                </CFormLabel>
                <div className="col-sm-10">
                  <Select
                    name="storage_id"
                    id="selectStorage"
                    isClearable
                    placeholder="Выберите хранилище"
                    onChange={handleSelect}
                    options={storageList}
                  />
                  {errorList?.storage_id?.map(function (error) {
                    return <li key={error}>{error}</li>
                  })}
                </div>
              </CRow>
            )}
            <CRow className="mb-5">
              <CFormLabel htmlFor={'inputBarcode'} className="col-sm-2 col-form-label">
                Доп. инф. о местоположении:
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput
                  type={'text'}
                  id={'inputLocation'}
                  placeholder="Введите дополнительную информацию о местоположении"
                  aria-label="Доп. инф. о местоположении"
                  aria-describedby="location"
                  name={'location'}
                  onChange={handleInput}
                />
                {errorList?.location?.map(function (error) {
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
                  <Link to={`/list/${list.id}`} className="btn btn-outline-dark mx-4 btn-select">
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
