import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import TableInventoryEquipment from './TableInventoryEquipment'
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'
import TableFindEquipment from './TableFindEquipment'
import store from '../../../store'

const ViewList = (props) => {
  const history = useHistory()
  // eslint-disable-next-line react/prop-types
  const list_id = props.match.params.id
  const storeReportSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    const state = store.getState()
    const results = state.result_inventory
    formData.append('list_id', list.id)
    results.forEach((o) => {
      formData.append('result_inventory[]', o.original.id)
    })
    axios.post('api/reports', formData).then((res) => {
      if (res.data.status === 200) {
        history.push(`/report/${res.data.report_id}`)
      } else {
        Swal.fire('Проведение инвентаризации', res.data.message, 'error')
      }
    })
  }
  const [loading, setLoading] = useState(true)
  const [inventoryEquipmentList, setInventoryEquipmentList] = useState([])
  const [findEquipmentList, setFindEquipmentList] = useState([])
  const [list, setList] = useState([])
  const list_created_at = new Date(list.created_at)
  useEffect(() => {
    axios.get(`/api/lists/${list_id}`).then((response) => {
      if (response.data.status === 200) {
        const in_works = response.data.list.in_works
        if (in_works) {
          // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
          setList(response.data.list)
          setInventoryEquipmentList(response.data.list.equipments_lists)
          setFindEquipmentList(response.data.list.equipment_finds)
        } else {
          history.push('/list')
          Swal.fire('Просмотр ведомости', 'Работа по выбранной ведомости уже закончена', 'error')
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
            <CCol sm={12}>
              <h4 id="equipment-header" className="card-title mb-0">
                Проведение инвентаризации. Ведомость № {list.id} от{' '}
                {list_created_at.toLocaleDateString() + ' ' + list_created_at.toLocaleTimeString()}
              </h4>
            </CCol>
          </CRow>
          <CRow className={'mb-3'}>
            <CCol sm={5}>
              <h5 className="mb-3">Инвентаризируемое оборудование</h5>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
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
          <TableInventoryEquipment columns={columnsInventory} data={inventoryEquipmentList} />
          <CRow className={'mb-3'}>
            <CCol sm={5}>
              <h5 className="mb-3">Найденное оборудование</h5>
            </CCol>
          </CRow>
          <TableFindEquipment columns={columnsFind} data={findEquipmentList} list_id={list.id} />
          <CRow className="mb-3">
            <CCol sm={12} className="d-none d-md-block">
              <CButtonGroup className="float-start">
                <Link to={`/list`} className="btn btn-outline-dark mx-0 btn-select">
                  Назад к формированию ведомости
                </Link>
                <CButton
                  onClick={storeReportSubmit}
                  type={'submit'}
                  color="dark"
                  variant="outline"
                  className="mx-4 btn-select"
                >
                  Закрыть ведомость
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
export default ViewList
