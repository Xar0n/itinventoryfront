import React, { useState } from 'react'
import Select from 'react-select'
import _, { isNull } from 'underscore'
import { useAsyncDebounce } from 'react-table'
import { CFormInput } from '@coreui/react'

function arrUnique(arr) {
  var cleaned = []
  arr.forEach(function (itm) {
    var unique = true
    cleaned.forEach(function (itm2) {
      if (_.isEqual(itm, itm2)) unique = false
    })
    if (unique) cleaned.push(itm)
  })
  return cleaned
}

// eslint-disable-next-line react/prop-types
export function GlobalFilter({ preGlobalFilteredRows, filter, setFilter }) {
  // eslint-disable-next-line react/prop-types
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(filter)
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined)
  }, 200)
  return (
    <div className="col-sm-5">
      <CFormInput
        type="text"
        id="inputSearch"
        placeholder={`Поиск среди ${count} строк`}
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      />
    </div>
  )
}

// eslint-disable-next-line react/prop-types
export function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  const [option, setOption] = useState('')
  const options = React.useMemo(() => {
    const options = new Set()
    // eslint-disable-next-line react/prop-types
    preFilteredRows.forEach((row, idx, array) => {
      options.add({ value: row.values[id], label: row.values[id] })
    })
    return [...options.values()]
  }, [id, preFilteredRows])
  let filteredValues
  // if (strJson !== '[]') {
  filteredValues = arrUnique(options)
  //   setOption(filteredValues)
  // }
  return (
    <Select
      isClearable
      placeholder=""
      defaultValue={filterValue}
      onChange={(e) => {
        if (e) {
          setFilter(e.value || undefined)
        } else {
          setFilter(undefined)
        }
      }}
      options={filteredValues}
    />
  )
}
