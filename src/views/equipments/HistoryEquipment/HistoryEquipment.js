import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import TableEquipmentHistory from './TableEquipmentHistory'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

const HistoryEquipment = (props) => {
  const [historyList, setHistoryList] = useState([])
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line react/prop-types
  const equipment_id = props.match.params.id
  useEffect(() => {
    axios.get(`/api/history/equipment/${equipment_id}`).then((response) => {
      if (response.status === 200) {
        // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
        setHistoryList(response.data.history)
        setEquipment(response.data.equipment)
        setLoading(false)
      }
    })
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Действие',
        accessor: (d) => {
          let action = d.action
          return (
            <div>
              <span>{parse(action)}</span>
            </div>
          )
        },
        disableFilters: true,
      },
      {
        Header: 'Дата и время',
        accessor: (d) => {
          let dat = new Date(d.date)
          return dat.toLocaleDateString() + ' ' + dat.toLocaleTimeString()
        },
        disableFilters: true,
      },
      {
        Header: 'Пользователь',
        accessor: 'user',
        disableFilters: true,
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
            <CCol sm={8}>
              <h4 id="object-header" className="card-title mb-0">
                История оборудования: {equipment.equipment.config_item.name}
              </h4>
            </CCol>
            <CCol sm={4} className="d-none d-md-block">
              <CButtonGroup className="float-end">
                <CButton variant={'outline'} color="dark" className="mx-1 btn-select">
                  Экспортировать
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          <TableEquipmentHistory columns={columns} data={historyList} />
          <CRow className="mb-3">
            <CCol sm={12} className="d-none d-md-block">
              <CButtonGroup className="float-start">
                <Link to={`/equipment/${equipment.id}`} className="btn btn-outline-dark btn-select">
                  Назад
                </Link>
              </CButtonGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
export default HistoryEquipment
