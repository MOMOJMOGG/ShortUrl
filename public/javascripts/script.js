$(document).ready(() => {
  const copyCode = document.getElementById('short-link')
  $('#copy-btn').click(() => {
    $('.toast').toast('show')

    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(copyCode)
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('copy')
  })
})

