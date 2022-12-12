// const searchParams = new URLSearchParams(document.location)
const searchParams = new URL(document.location).searchParams
const orderId = searchParams.get('orderId')
document.getElementById('orderId').innerHTML = `${orderId}`
document.querySelector('.confirmation p').style.boxShadow = '0px 0px 22px 6px green'
