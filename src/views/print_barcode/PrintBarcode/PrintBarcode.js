import React, { useEffect, useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import TablePrintBarcode from './TablePrintBarcode'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import store, { resetFilters } from '../../../store'
import { useDispatch } from 'react-redux'
import { CheckBoxColumnFilter } from '../../equipments/Equipment/FiltersEquipment'
import { isEmpty, successMessageUserWithoutAccept } from '../../../components/Functions'
import parse from 'html-react-parser'
import { string } from 'prop-types'

const PrintBarcode = () => {
  const dispath = useDispatch()
  const history = useHistory()
  const [visibleWindow, setVisibleWindow] = useState(false)
  const [loading, setLoading] = useState(true)
  const [equipmentList, setEquipmentList] = useState([])
  const [viewBarcode, setViewBarcode] = useState([])
  const printBarcodeClick = (e) => {
    e.preventDefault()
    const formData = new FormData()
    const state = store.getState()
    const results = state.barcode_print
    results.forEach((o) => {
      formData.append('barcode_print[]', o.original.id)
    })
    axios.post('api/barcode/printFor', formData).then((res) => {
      if (res.data.status === 200) {
        setVisibleWindow(!visibleWindow)
        setViewBarcode(res.data.barcodes)
      } else {
        Swal.fire('Печать штрихкодов', res.data.message, 'error')
      }
    })
  }
  useEffect(() => {
    axios.get('/api/equipments?with_barcode=1').then((response) => {
      if (response.status === 200) {
        // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
        setEquipmentList(response.data.equipments)
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
            Header: 'Название',
            accessor: 'equipment.config_item.name',
            disableFilters: true,
          },
          {
            Header: 'Инвентарный номер',
            accessor: 'equipment.inventory_number.number',
            disableFilters: true,
          },
          {
            Header: 'Штрих-код',
            accessor: 'barcode.code',
            disableFilters: true,
          },
          {
            Header: 'Использование',
            id: 'used',
            accessor: (d) => {
              if (d.used) return '+'
              return '_'
            },
            Filter: CheckBoxColumnFilter,
            disableFilters: false,
          },
          {
            Header: 'Причина списания',
            accessor: 'reason_writeoff.name',
            disableFilters: true,
          },
        ],
      },
      {
        Header: 'Местоположение',
        columns: [
          {
            Header: 'Организация',
            accessor: 'organization.name',
            disableFilters: false,
          },
          {
            Header: 'Адрес',
            accessor: 'room.address.name',
            disableFilters: false,
          },
          {
            Header: 'Хранилище',
            accessor: 'room.storage',
            disableFilters: false,
          },
          {
            Header: 'Доп.инф.',
            accessor: 'location',
            disableFilters: true,
          },
          {
            Header: 'Сотрудник',
            accessor: 'employee.full_name',
            disableFilters: false,
          },
        ],
      },
      {
        Header: 'Дополнительное',
        columns: [
          {
            Header: 'Вид',
            accessor: 'equipment.view.name',
            disableFilters: false,
          },
          {
            Header: 'Сорт',
            accessor: 'equipment.grade.name',
            disableFilters: false,
          },
          {
            Header: 'Группа',
            accessor: 'equipment.group.name',
            disableFilters: false,
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
                Печать штрихкодов
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end">
                <CButton
                  onClick={printBarcodeClick}
                  variant={'outline'}
                  color="dark"
                  className="mx-1 btn-select"
                >
                  Печать
                </CButton>
              </CButtonGroup>
            </CCol>
          </CRow>
          <TablePrintBarcode columns={columns} data={equipmentList} />
        </CCardBody>
      </CCard>
      <CModal scrollable fullscreen visible={visibleWindow} onClose={() => setVisibleWindow(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>{parse(viewBarcode.toString())}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleWindow(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default PrintBarcode
