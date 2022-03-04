import React, { useEffect, useState } from 'react'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import TableEquipment from './TableEquipment'

const Equipment = () => {
  const [loading, setLoading] = useState(true)
  const [equpipmentsList, setEqupipmentsList] = useState([])
  useEffect(() => {
    axios.get('/api/equipments').then((response) => {
      if (response.status === 200) {
        // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
        setEqupipmentsList(response.data.equipments)
      }
      //console.log(equpipmentsList)
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
          },
          {
            Header: 'Название',
            accessor: 'equipment.config_item.name',
          },
          {
            Header: 'Инвентарный номер',
            accessor: 'equipment.inventory_number.number',
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
            Header: 'Организация',
            accessor: 'equipment.organization.name',
          },
          {
            Header: 'Адрес',
            accessor: 'equipment.room.address.name',
          },
          {
            Header: 'Хранилище',
            accessor: 'equipment.room.storage',
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
      {
        Header: 'Дополнительное',
        columns: [
          {
            Header: 'Вид',
            accessor: 'equipment.view.name',
          },
          {
            Header: 'Сорт',
            accessor: 'equipment.grade.name',
          },
          {
            Header: 'Группа',
            accessor: 'equipment.group.name',
          },
        ],
      },
    ],
    [],
  )
  return (
    <>
      <CCard className="mb-5">
        {/*<CCardHeader>Оборудование</CCardHeader>*/}
        <CCardBody>
          <CRow className={'mb-5'}>
            <CCol sm={5}>
              <h4 id="equipment-header" className="card-title mb-0">
                Оборудование
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end">
                <CButton variant={'outline'} color="dark" className="mx-1">
                  Инвентаризация
                </CButton>
                <CButton variant={'outline'} color="dark" className="mx-1">
                  Учетные данные
                </CButton>
                <CButton variant={'outline'} color="dark" className="mx-1">
                  Импортировать
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          <TableEquipment columns={columns} data={equpipmentsList} />
        </CCardBody>
      </CCard>
    </>
  )
}
export default Equipment
