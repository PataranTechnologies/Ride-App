import {Types} from './types'
export const SetUserAction=(payload)=>{

    return {
        type:Types.setUser,
        payload:payload,
    }

}

export const SetMyLocation=(payload)=>{

    return {
        type:Types.setMyLocation,
        payload:payload,
    }

}
export const SetDestination=(payload)=>{

    return {
        type:Types.setDestination,
        payload:payload,
    }

}
export const AddStops=(payload)=>{

    return {
        type:Types.addStops,
        payload:payload,
    }

}

export const SetMainActive=(payload)=>{

    return {
        type:Types.setMainActive,
        payload:payload,
    }

}
export const SetLocationScreenActive=(payload)=>{

    return {
        type:Types.setLocationScreenActive,
        payload:payload,
    }

}
export const SetBookingScreenActive=(payload)=>{

    return {
        type:Types.setBookingScreenActive,
        payload:payload,
    }

}

export const ResetStops=(payload)=>{

    return {
        type:Types.resetStops,
        payload:payload,
    }

}
export const SetBookedScreenActive=(payload)=>{

    return {
        type:Types.setBookedScreenActive,
        payload:payload,
    }

}


 