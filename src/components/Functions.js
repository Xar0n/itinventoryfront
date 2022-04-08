import _ from 'underscore'
import Swal from 'sweetalert2'

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

export function objectByHeader(array, header) {
  let index = array.findIndex(function (item, i) {
    return item.Header === header
  })
  return array[index]
}

export function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}

export function successMessageUserWithoutAccept(message) {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  })
}
