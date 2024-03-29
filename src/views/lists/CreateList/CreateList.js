import React, { useEffect, useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'
import Select from 'react-select'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ru from 'date-fns/locale/ru'
import CreatableSelect from 'react-select/creatable'
import store from '../../../store'
import { addKeyValue, successMessageUserWithoutAccept } from '../../../components/Functions'

const CreateList = (props) => {
  registerLocale('ru', ru)
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  useEffect(() => {}, [])
  //const [createDate, setCreateDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [baseDate, setBaseDate] = useState(new Date())
  const [selectOrganization, setSelectOrganization] = useState([])
  const [selectAddress, setSelectAddress] = useState([])
  const [selectStorage, setSelectStorage] = useState([])
  const [selectInventoryReason, setSelectInventoryReason] = useState([])
  const [selectMol, setSelectMol] = useState([])
  const [selectCommission, setSelectCommission] = useState([])
  const [selectBase, setSelectBase] = useState([])
  const [inventoryReasonList, setInventoryReasonList] = useState([])
  const [commissionList, setCommissionList] = useState([])
  const [molList, setMolList] = useState([])
  const [errorList, setErrorList] = useState([])
  const [list, setList] = useState({
    base_number: '',
  })
  //const [id, setId] = useState()
  const state = store.getState()
  const address = state.address
  const organization = state.organization
  const storage = state.storage
  const baseList = [
    { value: 1, label: 'Приказ' },
    { value: 2, label: 'Постановление' },
    { value: 3, label: 'Распоряжение' },
  ]

  const storeListSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    const organization_id = selectOrganization.value
    const address_id = selectAddress.value
    const storage_id = selectStorage.value
    const inventory_reason = selectInventoryReason.value.value
    const base_id = selectBase.value
    const base_number = list['base_number']
    const base_datetime = baseDate
    const start_datetime = startDate
    const end_datetime = endDate
    const commission_ids = selectCommission
    const mol_ids = selectMol
    if (selectInventoryReason.action.action === 'create-option')
      formData.append('inventory_reason_id_create', inventory_reason)
    else if (selectInventoryReason.action.action === 'select-option')
      formData.append('inventory_reason_id', inventory_reason)
    formData.append('organization_id', organization_id)
    formData.append('address_id', address_id)
    if (storage !== '') formData.append('storage_id', storage_id)
    formData.append('base_id', base_id)
    formData.append(
      'base_datetime',
      base_datetime.toLocaleDateString() + ' ' + base_datetime.toLocaleTimeString(),
    )
    formData.append('base_number', base_number)
    formData.append(
      'start_datetime',
      start_datetime.toLocaleDateString() + ' ' + start_datetime.toLocaleTimeString(),
    )
    formData.append(
      'end_datetime',
      end_datetime.toLocaleDateString() + ' ' + end_datetime.toLocaleTimeString(),
    )
    commission_ids.forEach((o) => {
      formData.append('commission[]', o.value)
    })
    mol_ids.forEach((o) => {
      formData.append('mol[]', o.value)
    })
    axios.post('api/lists', formData).then((res) => {
      if (res.data.status === 200) {
        history.push(`/list/${res.data.list_id}`)
        setErrorList([])
        successMessageUserWithoutAccept(res.data.message)
      } else {
        Swal.fire('Создание ведомости', res.data.message, 'warning')
        setErrorList(res.data.errors)
      }
    })
  }

  const handleInput = (e) => {
    e.persist()
    setList({ ...list, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    axios.get(`api/one-address/${address}`).then((res) => {
      if (res.data.status === 200) {
        setSelectAddress(res.data.address)
        const adr = res.data.address
        if (storage !== '') {
          axios.get(`api/one-storage/${storage}/${adr.value}`).then((res) => {
            if (res.data.status === 200) {
              let storage = res.data.storage
              setSelectStorage(storage)
              setLoading(false)
            } else {
            }
          })
        } else setLoading(false)
      }
    })
    axios.get(`api/one-organization/${organization}`).then((res) => {
      if (res.data.status === 200) {
        setSelectOrganization(res.data.organization)
        const org = res.data.organization
        axios.get(`api/all-mols/${org.value}`).then((res) => {
          if (res.data.status === 200) {
            setMolList(res.data.mols)
          }
        })
        axios.get(`api/inventory-user/${org.value}`).then((res) => {
          if (res.data.status === 200) {
            setCommissionList(res.data.inventory_users)
          }
        })
      }
    })
    axios.get(`api/all-inventory-reason/`).then((res) => {
      if (res.data.status === 200) {
        setInventoryReasonList(res.data.inventory_reasons)
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
          <CRow>
            <CCol sm={12}>
              <h4 id="equipment-header" className="card-title mb-5">
                Создать ведомость
              </h4>
            </CCol>
          </CRow>
          <CForm onSubmit={storeListSubmit}>
            {/* <CRow className="mb-3">
              <div className="col-sm-2">
                Номер:<span className={'main-color'}>*</span>
              </div>
              <div className="col-sm-4">
                <CFormInput
                  type={'text'}
                  id={'inputID'}
                  placeholder="Введите номер"
                  aria-label="номер"
                  aria-describedby="id"
                  name={'id'}
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value)
                  }}
                />
              </div>
              <div className="col-sm-auto">
                от:<span className={'main-color'}>*</span>
              </div>
              <div className="col-sm-auto">
                <DatePicker
                  selected={createDate}
                  onChange={(date) => setCreateDate(date)}
                  showTimeSelect
                  className={'form-control'}
                  dateFormat="d MMMM, yyyy h:mm aa"
                  locale="ru"
                />
              </div>
            </CRow>*/}
            <CRow className="mb-3">
              <div className="col-sm-2 col-form-label">
                МОЛ:<span className={'main-color'}>*</span>
              </div>
              <div className="col-sm-8">
                <Select
                  isMulti
                  name="mol_ids"
                  id="selectMol"
                  isClearable
                  value={selectMol}
                  options={molList}
                  onChange={(e) => {
                    setSelectMol(e)
                  }}
                  placeholder={'Выберите материально ответственных лиц'}
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <div className="col-sm-2 col-form-label">Комиссия:</div>
              <div className="col-sm-8">
                <Select
                  isMulti
                  name="comission_id"
                  id="selectComission"
                  isClearable
                  value={selectCommission}
                  options={commissionList}
                  onChange={(e) => {
                    setSelectCommission(e)
                  }}
                  placeholder={'Выберите членов комиссии инвентаризации'}
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <div className="col-sm-2 col-form-label">Период с:</div>
              <div className="col-sm-auto">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  showTimeSelect
                  className={'form-control'}
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd.MM.yyyy hh:mm:ss"
                  locale="ru"
                />
              </div>
              <div className="col-sm-auto col-form-label">по:</div>
              <div className="col-sm-auto">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  showTimeSelect
                  className={'form-control'}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="dd.MM.yyyy hh:mm:ss"
                  locale="ru"
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <div className="col-sm-2 col-form-label">
                Основание:<span className={'main-color'}>*</span>
              </div>
              <div className="col-sm-2">
                <Select
                  name="base_id"
                  id="selectBase"
                  isClearable
                  options={baseList}
                  value={selectBase}
                  onChange={(e) => {
                    setSelectBase(e)
                  }}
                  placeholder="Выберите основание"
                />
                {errorList?.base_id?.map(function (error) {
                  return <li key={error}>{error}</li>
                })}
                {errorList?.base_number?.map(function (error) {
                  return <li key={error}>{error}</li>
                })}
              </div>
              <div className="col-sm-auto col-form-label">
                №:<span className={'main-color'}>*</span>
              </div>
              <div className="col-sm-auto">
                <CFormInput
                  id={'inputBaseNumber'}
                  placeholder="Введите номер основания"
                  aria-label="Номер основания"
                  aria-describedby="baseNumber"
                  name={'base_number'}
                  value={list.base_number}
                  onChange={handleInput}
                />
              </div>
              <div className="col-sm-auto col-form-label">
                от:<span className={'main-color'}>*</span>
              </div>
              <div className="col-sm-auto">
                <DatePicker
                  selected={baseDate}
                  onChange={(date) => setBaseDate(date)}
                  showTimeSelect
                  className={'form-control'}
                  dateFormat="dd.MM.yyyy hh:mm:ss"
                  locale="ru"
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <div className="col-sm-2 col-form-label">
                Организация:<span className={'main-color'}>*</span>
              </div>
              <div className="col-sm-8">
                <Select
                  options={[selectOrganization]}
                  value={selectOrganization}
                  name="organization_id"
                  id="selectOrganization"
                  isClearable
                  isDisabled={true}
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <div className="col-sm-2 col-form-label">
                Адрес:<span className={'main-color'}>*</span>
              </div>
              <div className="col-sm-8">
                <Select
                  options={[selectAddress]}
                  value={selectAddress}
                  name="address_id"
                  id="selectAddress"
                  isClearable
                  isDisabled={true}
                />
              </div>
            </CRow>
            {storage !== '' && (
              <CRow className="mb-3">
                <div className="col-sm-2 col-form-label">
                  Склад/кабинет:<span className={'main-color'}>*</span>
                </div>
                <div className="col-sm-8">
                  <Select
                    options={[selectStorage]}
                    value={selectStorage}
                    name="storage_id"
                    id="selectStorage"
                    isClearable
                    isDisabled={true}
                  />
                </div>
              </CRow>
            )}
            <CRow className="mb-5">
              <div className="col-sm-2 col-form-label">
                Причина:<span className={'main-color'}>*</span>
              </div>
              <div className="col-sm-8">
                <CreatableSelect
                  name="reason_id"
                  id="selectReason"
                  isClearable
                  placeholder={'Введите или выберите причину инвентаризации'}
                  onChange={(value, action) => {
                    setSelectInventoryReason({ value: value, action: action })
                  }}
                  value={selectInventoryReason.value}
                  options={inventoryReasonList}
                />
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
                    Сформировать ведомость
                  </CButton>
                  <Link to={`/list`} className="btn btn-outline-dark mx-4 btn-select">
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
export default CreateList
