// tester que l'utilisateur reçoit bien son numero de commande et que le numero de commande n'est stocké nulle part

const params = new URL(document.location).searchParams
const orderId = params.get('orderId')
document.getElementById('orderId').innerHTML = `${orderId}`
document.querySelector('.confirmation p').style.boxShadow = '0px 0px 22px 6px green'
