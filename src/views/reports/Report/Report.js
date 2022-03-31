import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import TableReport from './TableReport'
import store, { resetFilters } from '../../../store'
import { useDispatch } from 'react-redux'
import * as _ from 'underscore'

const Report = () => {
  const dispath = useDispatch()
  dispath(resetFilters())
  const [loading, setLoading] = useState(true)
  const [reportList, setReportList] = useState([])
  useEffect(() => {
    axios.get('/api/reports').then((response) => {
      if (response.status === 200) {
        // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
        setReportList(response.data.reports)
      }
      setLoading(false)
    })
  }, [])
  const columns = React.useMemo(
    () => [
      {
        Header: 'Основное',
        columns: [
          {
            Header: '№',
            accessor: 'id',
            disableFilters: true,
          },
          {
            Header: 'МОЛ',
            id: 'list.mols',
            accessor: (data) => {
              let output = []
              _.map(data.list.mols, (mol) => {
                output.push(mol.full_name)
              })
              return output.join(', ')
            },
            disableFilters: true,
          },
          {
            Header: 'Комиссия',
            accessor: (data) => {
              let output = []
              _.map(data.list.user, (com) => {
                output.push(com.name)
              })
              return output.join(', ')
            },
            disableFilters: true,
          },
          {
            Header: 'Основание',
            accessor: 'list.basis_full',
            disableFilters: true,
          },
          {
            Header: 'Причина',
            accessor: 'list.inventory_reason.name',
            disableFilters: true,
          },
          {
            Header: 'Создатель',
            accessor: 'list.creator.name',
            disableFilters: false,
          },
        ],
      },
      {
        Header: 'Местоположение',
        columns: [
          {
            Header: 'Организация',
            accessor: 'list.organization.name',
            disableFilters: false,
          },
          {
            Header: 'Адрес',
            accessor: 'list.address.name',
            disableFilters: false,
          },
          {
            Header: 'Хранилище',
            accessor: 'list.room.storage',
            disableFilters: false,
          },
        ],
      },
      {
        Header: 'Время',
        columns: [
          {
            Header: 'Дата создания',
            id: 'created_at',
            accessor: (d) => {
              let dat = new Date(d.created_at)
              return dat.toLocaleDateString() + ' ' + dat.toLocaleTimeString()
            },
            disableFilters: true,
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
            <CCol sm={5}>
              <h4 id="equipment-header" className="card-title mb-0">
                Отчеты
              </h4>
            </CCol>
          </CRow>
          <TableReport columns={columns} data={reportList} />
        </CCardBody>
      </CCard>
    </>
  )
}
export default Report
