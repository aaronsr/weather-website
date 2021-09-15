console.log('Client side JS file is loaded.')

//element -> client side javascript
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


//message1.textContent = 'From JS'

weatherForm.addEventListener('submit', (e /*short for event*/)=> {
    e.preventDefault()
    
    const location = searchElement.value
    message1.textContent = 'Loading'
    message2.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            //console.log(data)
            if (data.Error || data.error) {
                message1.textContent = data.Error || data.error
            } else {
                message1.textContent = data.Location
                message2.textContent = data.Forecast
            }
        })
    })
})