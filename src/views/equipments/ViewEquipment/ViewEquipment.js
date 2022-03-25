import React, { useEffect, useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CFormLabel,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import CreatableSelect from 'react-select/creatable'

const ViewEquipment = (props) => {
  const [writeOffInput, setWriteOffInput] = useState({
    used: false,
  })
  const [writeOffSelect, setWriteOffSelect] = useState({
    reasonWriteOff: {},
  })
  const [writeOffList, setWriteOffList] = useState([])
  const [showWriteoff, setShowWriteoff] = useState(false)
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorList, setErrorList] = useState([])
  const history = useHistory()
  const updateEquipmentSubmit = (e) => {
    e.preventDefault()
    let data = {}
    const used = writeOffInput['used']
    const reasonWriteOff = writeOffSelect['reasonWriteOff']
    if (used) data['used'] = used
    if (reasonWriteOff.action === 'create-option')
      data['reason_writeoff_id_create'] = reasonWriteOff.value
    else if (reasonWriteOff.action === 'select-option')
      data['reason_writeoff_id'] = reasonWriteOff.value
    axios.patch(`api/equipments/write-off/${equipment.id}`, data).then((res) => {
      if (res.data.status === 200) {
        //TODO перерисовка страницы чтобы показать, что оборудование списано
        Swal.fire('Списание оборудования', res.data.message, 'success')
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
          setEquipment(response.data.equipment)
        } else if (response.data.status === 404) {
          history.push('/equipment')
          Swal.fire('Просмотр оборудования', response.data.message, 'warning')
        }
      }
    })
    axios.get(`/api/all-reason-write-off`).then((response) => {
      if (isMounted) {
        if (response.data.status === 200) {
          setWriteOffList(response.data.reasons_write_off)
          setLoading(false)
        }
      }
    })
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react/prop-types
  }, [props.match.params.id, history])
  const changeShowWriteOff = (e) => {
    setShowWriteoff(!showWriteoff)
  }
  const handleInput = (e) => {
    e.persist()
    setWriteOffInput({ ...writeOffInput, [e.target.name]: e.target.value })
  }
  const handleSelect = (e, action) => {
    console.log(e)
    console.log(action)
    setWriteOffSelect({ ...writeOffSelect, [action.name]: { ...e, ...action } })
  }
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
            <div className="col-sm-10">{equipment.equipment.inventory_number?.number}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Штрих-код:</div>
            <div className="col-sm-10">{equipment.barcode?.code}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Наименование:</div>
            <div className="col-sm-10">{equipment.equipment.config_item.name}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Вид:</div>
            <div className="col-sm-10">{equipment.equipment.view?.name}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Сорт:</div>
            <div className="col-sm-10">{equipment.equipment.grade?.name}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Группа:</div>
            <div className="col-sm-10">{equipment.equipment.group?.name}</div>
          </CRow>
          <CRow className="mb-3">
            <div className="col-sm-2">Сотрудник:</div>
            <div className="col-sm-10">{equipment.employee?.full_name}</div>
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
          <CRow className="mb-3">
            <div className="col-sm-2">Склад/кабинет:</div>
            <div className="col-sm-10">{equipment.equipment.room.storage}</div>
          </CRow>
          <CRow className="mb-4">
            <div className="col-sm-2">Доп.инф.:</div>
            <div className="col-sm-10">{equipment.location}</div>
          </CRow>
          <CRow className="mb-5">
            {showWriteoff && (
              <div>
                <h5 className="mb-3">Списание</h5>
                <CRow className="mb-3">
                  <div className="col-sm-2">
                    Подтвердите списание:
                    <span className={'main-color'}>*</span>
                  </div>
                  <div className="col-sm-8">
                    <CFormCheck onChange={handleInput} id="flexCheckDefault" name="used" />
                  </div>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor={'selectObject'} className="col-sm-2 col-form-label">
                    Причина списания:
                    <span className={'main-color'}>*</span>
                  </CFormLabel>
                  <div className="col-sm-8">
                    <CreatableSelect
                      placeholder={'Введите или выберите причину списания'}
                      name="reasonWriteOff"
                      id="selectObject"
                      value={writeOffSelect['reasonWriteOff']}
                      onChange={handleSelect}
                      options={writeOffList}
                    />
                  </div>
                </CRow>
                <CCol sm={12} className="d-none d-md-block">
                  <CButtonGroup className="float-start">
                    <CButton color="dark" variant="outline" className="float-start btn-select">
                      Списать
                    </CButton>
                    <CButton
                      onClick={changeShowWriteOff}
                      color="dark"
                      variant="outline"
                      className="float-start btn-select mx-4"
                    >
                      Отменить
                    </CButton>
                  </CButtonGroup>
                </CCol>
              </div>
            )}
            {!showWriteoff && (
              <CCol sm={12} className="d-none d-md-block">
                <CButton
                  onClick={changeShowWriteOff}
                  color="dark"
                  variant="outline"
                  className="float-start btn-select"
                >
                  Списать
                </CButton>
              </CCol>
            )}
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
