function append_zero(element) {
  if (element < 10) {
    return '0' + element
  } else {
    return '' + element
  }
}

function get_date() {
  const date = new Date()
  const hour = date.getHours() + 1 // 0 ~ 23
  const minutes = date.getMinutes() + 1 // 0 ~ 59
  const second = date.getSeconds() + 1 // 0 ~ 59
  return append_zero(hour) + '-' + append_zero(minutes) + '-' + append_zero(second)
}


$(document).ready(() => {
  const copyCode = document.getElementById('short-link')
  $('#copy-btn').click(() => {
    $('.toast').find('small').text(get_date())
    $('.toast').find('.toast-body').text('Copy!')
    $('.toast').toast('show')

    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(copyCode)
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('copy')
  })

  $('#submit-btn').click((e) => {
    e.preventDefault()
    const url = $('#target-url').val()

    if (url === "") {
      $('.toast').find('small').text(get_date())
      $('.toast').find('.toast-body').text('Error: Empty Url!')
      $('.toast').toast('show')
    } else {
      const pattern = /^(http|https):\/\//
      if (pattern.exec(url) === null) {
        $('.toast').find('small').text(get_date())
        $('.toast').find('.toast-body').text('Error: Start Without http:// | https://')
        $('.toast').toast('show')
      } else {
        $('#submit-form').submit()
      }
    }
  })
})
