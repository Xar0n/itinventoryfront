import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import TableInventoryEquipment from './TableInventoryEquipment'
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'
import TableFindEquipment from './TableFindEquipment'
import store from '../../../store'

const ViewReport = (props) => {
  const history = useHistory()
  // eslint-disable-next-line react/prop-types
  const report_id = props.match.params.id
  const [loading, setLoading] = useState(true)
  const [inventoryEquipmentReport, setInventoryEquipmentReport] = useState([])
  const [findEquipmentReport, setFindEquipmentReport] = useState([])
  const [report, setReport] = useState([])
  const report_created_at = new Date(report.created_at)
  useEffect(() => {
    axios.get(`/api/reports/${report_id}`).then((response) => {
      if (response.data.status === 200) {
        const in_works = response.data.report.list.in_works
        if (!in_works) {
          // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
          setReport(response.data.report)
          setInventoryEquipmentReport(response.data.report.list.equipments_lists)
          setFindEquipmentReport(response.data.report.list.equipment_finds)
        } else {
          history.push('/report')
          Swal.fire('Просмотр отчета', 'Ошибка формирования отчета', 'error')
        }
      }
      setLoading(false)
    })
  }, [])
  const columnsInventory = React.useMemo(
    () => [
      {
        Header: 'Основное',
        columns: [
          {
            Header: '№',
            accessor: 'id',
          },
          {
            Header: 'Название',
            accessor: 'equipment_num.equipment.config_item.name',
          },
          {
            Header: 'Инвентарный номер',
            accessor: 'equipment_num.equipment.inventory_number.number',
          },
          {
            Header: 'Штрих-код',
            accessor: 'equipment_num.barcode.code',
          },
        ],
      },
      {
        Header: 'Местоположение',
        columns: [
          {
            Header: 'Хранилище',
            accessor: 'equipment_num.equipment.room.storage',
          },
          {
            Header: 'Доп.инф.',
            accessor: 'equipment_num.location',
          },
          {
            Header: 'Сотрудник',
            accessor: 'equipment_num.employee.full_name',
          },
        ],
      },
      {
        Header: 'Дополнительное',
        columns: [
          {
            Header: 'Вид',
            accessor: 'equipment_num.equipment.view.name',
          },
          {
            Header: 'Сорт',
            accessor: 'equipment_num.equipment.grade.name',
          },
          {
            Header: 'Группа',
            accessor: 'equipment_num.equipment.group.name',
          },
        ],
      },
    ],
    [],
  )

  const columnsFind = React.useMemo(
    () => [
      {
        Header: 'Основное',
        columns: [
          {
            Header: '№',
            accessor: 'id',
          },
          {
            Header: 'Название',
            accessor: 'config_item.name',
          },
          {
            Header: 'Инвентарный номер',
            accessor: 'inventory_number.number',
          },
          {
            Header: 'Штрих-код',
            accessor: 'barcode.code',
          },
        ],
      },
      {
        Header: 'Местоположение',
        columns: [
          {
            Header: 'Хранилище',
            accessor: 'room.storage',
          },
          {
            Header: 'Доп.инф.',
            accessor: 'location',
          },
          {
            Header: 'Сотрудник',
            accessor: 'employee.full_name',
          },
        ],
      },
    ],
    [],
  )

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
            <CCol sm={6}>
              <h4 id="equipment-header" className="card-title mb-0">
                Отчет о проведенной инвентаризации № {report.id} от{' '}
                {report_created_at.toLocaleDateString() +
                  ' ' +
                  report_created_at.toLocaleTimeString()}
              </h4>
            </CCol>
            <CCol sm={6} className="d-none d-md-block">
              <CButtonGroup className="float-end">
                <CButton variant={'outline'} color="dark" className="mx-1 btn-select">
                  Печать
                </CButton>
                <CButton variant={'outline'} color="dark" className="mx-1 btn-select">
                  Экспортировать
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CRow className="col-sm-8">
              <h5 className="mb-3">Основная информация</h5>
              <CRow className="mb-3">
                <div className="col-sm-2">Организация:</div>
                <div className="col-sm-10">{report.list.organization?.name}</div>
              </CRow>
              <CRow className="mb-3">
                <div className="col-sm-2">Адрес:</div>
                <div className="col-sm-10">{report.list.address?.name}</div>
              </CRow>
              <CRow className="mb-3">
                <div className="col-sm-2">Склад/кабинет:</div>
                <div className="col-sm-10">{report.list.room?.storage}</div>
              </CRow>
            </CRow>
            <CRow className="col-sm-4">
              <h5>Использованные фильтры</h5>
              <CRow className="mb-3">
                <div className="col-sm-3">Поля:</div>
                <div className="col-sm-9"></div>
              </CRow>
            </CRow>
          </CRow>
          <CRow className={'mb-3'}>
            <CCol sm={5}>
              <h5 className="mb-3">Найденное оборудование</h5>
            </CCol>
          </CRow>
          <TableInventoryEquipment columns={columnsInventory} data={inventoryEquipmentReport} />
          <CRow className={'mb-3'}>
            <CCol sm={5}>
              <h5 className="mb-3">Излишки оборудования</h5>
            </CCol>
          </CRow>
          <TableFindEquipment columns={columnsFind} data={findEquipmentReport} />
        </CCardBody>
      </CCard>
    </>
  )
}
export default ViewReport