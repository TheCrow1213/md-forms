import axios from 'axios'
import uuidV4 from 'uuid/v4'

// todo config
var a = axios.create({
    baseUrl: 'https://hdusokrbg5.execute-api.us-west-2.amazonaws.com/dev/testAutomate',
})

export function createNewUser() {
    return a.post('/users', {
        user: {
            id: uuidV4()
        }
    })
}

export default {
    createNewUser
}