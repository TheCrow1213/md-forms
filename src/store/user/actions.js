import userService from '../../api/userService'

// actionTypes
export const actionTypes = {
    USER_UPDATED: 'USER_UPDATED',
}

// actions
export function userUpdated(user) {
    return {
        type: actionTypes.USER_UPDATED,
        user
    }
}

// thunks
export function createUser() {
    return function (dispatch) {
        return userService.createNewUser()
            .then(function (response) {
                console.log(response)
                console.log('Success!!!')
                dispatch(userUpdated)
            })
            .catch(function (error) {
                console.error(error)
                debugger
            })
    }
}


export default {
    actionTypes,
    createUser,
    // todo dont expose
    userUpdated
}
