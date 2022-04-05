import _ from 'underscore'

export function addKeyValue(obj, key, data) {
  obj[key] = data
}

export function isEmpty(value) {
  return typeof value === 'string' && value.trim() === ''
}

export function arrUnique(arr) {
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

function objectByHeader(array, header) {
  let index = array.findIndex(function (item, i) {
    return item.Header === header
  })
  return array[index]
}
