import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import TableObject from './TableObject'

const ObjectE = () => {
  const [objectsList, setObjectsList] = useState([])
  useEffect(() => {
    axios.get('/api/objects').then((response) => {
      if (response.status === 200) {
        // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
        setObjectsList(response.data.objects)
      }
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
            Header: 'Количество',
            accessor: 'count',
          },
          {
            Header: 'Назначено',
            accessor: 'equipment_num_count',
          },
        ],
      },
      {
        Header: 'Местоположение',
        columns: [
          {
            Header: 'Организация',
            accessor: 'organization.name',
          },
          {
            Header: 'Адрес',
            accessor: 'room.address.name',
          },
          {
            Header: 'Хранилище',
            accessor: 'room.storage',
          },
        ],
      },
      {
        Header: 'Дополнительное',
        columns: [
          {
            Header: 'Вид',
            accessor: 'view.name',
          },
          {
            Header: 'Сорт',
            accessor: 'grade.name',
          },
          {
            Header: 'Группа',
            accessor: 'group.name',
          },
        ],
      },
    ],
    [],
  )
  return (
    <>
      <CCard className="mb-5">
        <CCardBody>
          <CRow className={'mb-5'}>
            <CCol sm={5}>
              <h4 id="object-header" className="card-title mb-0">
                Объекты
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end">
                <CButton variant={'outline'} color="dark" className="mx-1">
                  Импортировать
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          <TableObject columns={columns} data={objectsList} />
        </CCardBody>
      </CCard>
    </>
  )
}
export default ObjectE
