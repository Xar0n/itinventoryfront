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
  CFormSelect,
  CInputGroup,
  CInputGroupText,
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

function addKeyValue(obj, key, data) {
  obj[key] = data
}

const CreateList = (props) => {
  registerLocale('ru', ru)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  useEffect(() => {}, [])
  const [createDate, setCreateDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [baseDate, setBaseDate] = useState(new Date())
  const [selectOrganization, setSelectOrganization] = useState([])
  const [selectAddress, setSelectAddress] = useState([])
  const [selectStorage, setSelectStorage] = useState([])
  const [selectInventoryReason, setSelectInventoryReason] = useState([])
  const [selectMol, setSelectMol] = useState([])
  const [selectCommission, setSelectCommission] = useState([])
  const [inventoryReasonList, setInventoryReasonList] = useState([])
  const [commissionList, setCommissionList] = useState([])
  const [molList, setMolList] = useState([])

  const address_id = 1
  const organization_id = 1
  const storage_id = 1

  useEffect(() => {
    axios.get(`api/one-address/${address_id}`).then((res) => {
      if (res.data.status === 200) {
        setSelectAddress(res.data.address)
      }
    })
    axios.get(`api/one-organization/${organization_id}`).then((res) => {
      if (res.data.status === 200) {
        setSelectOrganization(res.data.organization)
      }
    })
    axios.get(`api/one-storage/${storage_id}`).then((res) => {
      if (res.data.status === 200) {
        let storage = res.data.storage
        storage['label'] = storage['storage']
        setSelectStorage(storage)
      }
    })
    axios.get(`api/all-inventory-reason/`).then((res) => {
      if (res.data.status === 200) {
        setInventoryReasonList(res.data.inventory_reasons)
      }
    })
    axios.get(`api/all-employee/${organization_id}`).then((res) => {
      if (res.data.status === 200) {
        let mol = res.data.employee
        mol.map(function (o) {
          return addKeyValue(o, 'label', o.full_name)
        })
        setMolList(mol)
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
          <CRow className="mb-3">
            <div className="col-sm-2">
              Номер:<span className={'main-color'}>*</span>
            </div>
            <div className="col-sm-4">
              <CFormInput
                type={'text'}
                id={'inputID'}
                placeholder="Введите номер"
                aria-label="Количество"
                aria-describedby="id"
                name={'id'}
                //onChange={handleInput}
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
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">
              МОЛ:<span className={'main-color'}>*</span>
            </div>
            <div className="col-sm-8">
              <Select
                isMulti
                name="barcode_id"
                id="selectBarcode"
                isClearable
                options={molList}
                placeholder="Выберите материально ответственных лиц"
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Комиссия:</div>
            <div className="col-sm-8">
              <Select
                isMulti
                name="comission_id"
                id="selectComission"
                isClearable
                placeholder={'Выберите членов комиссии инвентаризации'}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Период с:</div>
            <div className="col-sm-auto">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                showTimeSelect
                className={'form-control'}
                startDate={startDate}
                endDate={endDate}
                dateFormat="d MMMM, yyyy h:mm aa"
                locale="ru"
              />
            </div>
            <div className="col-sm-auto">по:</div>
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
                dateFormat="d MMMM, yyyy h:mm aa"
                locale="ru"
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">
              Основание:<span className={'main-color'}>*</span>
            </div>
            <div className="col-sm-auto">
              <CFormSelect>
                <option>Выберите основание</option>
                <option value="1">Приказ</option>
                <option value="2">Постановление</option>
                <option value="3">Распоряжение</option>
              </CFormSelect>
            </div>
            <div className="col-sm-auto">
              №:<span className={'main-color'}>*</span>
            </div>
            <div className="col-sm-auto">
              <CFormInput
                type={'text'}
                id={'inputBaseNumber'}
                placeholder="Введите номер основания"
                aria-label="Номер основания"
                aria-describedby="baseNumber"
                name={'baseNumber'}
                //onChange={handleInput}
              />
            </div>
            <div className="col-sm-auto">
              от:<span className={'main-color'}>*</span>
            </div>
            <div className="col-sm-auto">
              <DatePicker
                selected={baseDate}
                onChange={(date) => setBaseDate(date)}
                showTimeSelect
                className={'form-control'}
                dateFormat="d MMMM, yyyy h:mm aa"
                locale="ru"
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">
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
            <div className="col-sm-2">
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
          <CRow className="mb-3">
            <div className="col-sm-2">
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
          <CRow className="mb-5">
            <div className="col-sm-2">
              Причина:<span className={'main-color'}>*</span>
            </div>
            <div className="col-sm-8">
              <CreatableSelect
                name="reason_id"
                id="selectReason"
                isClearable
                placeholder={'Введите или выберите причину инвентаризации'}
                onChange={(value, action) => {
                  setSelectInventoryReason([value, action])
                }}
                value={selectInventoryReason.value}
                options={inventoryReasonList}
              />
            </div>
          </CRow>
          <CRow className="mb-3">
            <CCol sm={12} className="d-none d-md-block">
              <CButtonGroup className="float-start">
                {/*TODO Кнопка создания с событием*/}
                <Link to={`/equipment`} className="btn btn-outline-dark mx-0 btn-select">
                  Создать
                </Link>
                <Link to={`/list`} className="btn btn-outline-dark mx-4 btn-select">
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
export default CreateList
