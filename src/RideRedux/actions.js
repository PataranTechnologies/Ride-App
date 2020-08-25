import Types from './types'
const SetUserAction=(payload)=>{

    return ({
        type:Types.setUser,
        payload:payload,
    })

}