// test-pinata.js
import fetch from 'node-fetch'

const PINATA_API_KEY = '361783078a850b4f92d7'
const PINATA_SECRET_KEY = '9fd6b5a1aa7355eac308775be6a290908fdc3e7e976de5adb6e18aa88d2468c4'

async function testPinata() {
  try {
    const response = await fetch('https://api.pinata.cloud/data/testAuthentication', {
      method: 'GET',
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      }
    })

    const data = await response.json()
    
    if (data.message === 'Congratulations! You are communicating with the Pinata API!') {
      console.log('✅ Pinata authentication successful!')
      console.log(data)
    } else {
      console.log('❌ Authentication failed')
      console.log(data)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

testPinata()
