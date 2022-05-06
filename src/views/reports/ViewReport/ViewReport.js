import React, { useEffect, useState } from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import TableFoundEquipment from './TableFoundEquipment'
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'
import TableFindEquipment from './TableFindEquipment'
import store from '../../../store'
import TableLostEquipment from './TableLostEquipment'
import { CChart } from '@coreui/react-chartjs'

const ViewReport = (props) => {
  const history = useHistory()
  // eslint-disable-next-line react/prop-types
  const report_id = props.match.params.id
  const [loading, setLoading] = useState(true)
  const [foundEquipment, setFoundEquipment] = useState([])
  const [lostEquipment, setLostEquipment] = useState([])
  const [findEquipment, setFindEquipment] = useState([])
  const [result, setResult] = useState([])
  const [report, setReport] = useState([])
  let data_diagram = []
  let columns = [
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
          Header: 'Хранилище',
          accessor: 'equipment_num.room.storage',
        },
      ],
    },
    {
      Header: 'Использование',
      columns: [
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
    /*{
      Header: 'Фактическое количество',
      accessor: (d) => {
        return 1
      },
      Footer: (info) => {
        const total = React.useMemo(() => info.rows.reduce((sum, row) => 1 + sum, 0), [info.rows])

        return <>Всего: {total}</>
      },
    },
    {
      Header: 'Количество по данным учета',
      accessor: (d) => {
        return 1
      },
    },*/
  ]
  const report_created_at = new Date(report.created_at)
  useEffect(() => {
    axios.get(`/api/reports/${report_id}`).then((response) => {
      if (response.data.status === 200) {
        const in_works = response.data.report.list.in_works
        if (!in_works) {
          // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
          setReport(response.data.report)
          setFoundEquipment(response.data.equipment_found)
          setLostEquipment(response.data.equipment_lost)
          setFindEquipment(response.data.equipment_find)
          setResult(response.data.result)
          // eslint-disable-next-line react-hooks/exhaustive-deps
        } else {
          history.push('/report')
          Swal.fire('Просмотр отчета', 'Ошибка формирования отчета', 'error')
        }
      }
      setLoading(false)
    })
  }, [])
  const columnsEquipment = React.useMemo(() => columns, [])

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

  const columnsResult = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'result.count',
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
              {report.list.room_id && (
                <CRow className="mb-3">
                  <div className="col-sm-2">Склад/кабинет:</div>
                  <div className="col-sm-10">{report.list.room?.storage}</div>
                </CRow>
              )}
            </CRow>
            <CRow className="col-sm-4">
              <h5>Использованные фильтры</h5>
              <CRow className="mb-3">
                <div className="col-sm-3">Поля:</div>
                <div className="col-sm-9"></div>
              </CRow>
            </CRow>
          </CRow>
          <CAccordion className="mb-5" alwaysOpen activeItemKey={1}>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>
                <h5>Найденное оборудование</h5>
              </CAccordionHeader>
              <CAccordionBody>
                <TableFoundEquipment columns={columnsEquipment} data={foundEquipment} />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader>
                <h5>Отсутствующее оборудование</h5>
              </CAccordionHeader>
              <CAccordionBody>
                <TableLostEquipment columns={columnsEquipment} data={lostEquipment} />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={3}>
              <CAccordionHeader>
                <h5>Излишки оборудования</h5>
              </CAccordionHeader>
              <CAccordionBody>
                <TableFindEquipment columns={columnsFind} data={findEquipment} />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={4}>
              <CAccordionHeader>
                <h5>Результат</h5>
              </CAccordionHeader>
              <CAccordionBody>
                <CCol xs={8} md={4} xl={4}>
                  <CRow>
                    <CChart
                      type="doughnut"
                      data={{
                        labels: ['Найдено', 'Отсутствует', 'Излишки'],
                        datasets: [
                          {
                            backgroundColor: ['#41B883', '#DD1B16', '#00D8FF'],
                            data: [result.count_found, result.count_lost, result.count_find],
                          },
                        ],
                      }}
                    />
                  </CRow>
                </CCol>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCardBody>
      </CCard>
    </>
  )
}
export default ViewReport
