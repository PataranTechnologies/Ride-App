import APIKit from './APIKit';

export const saveDeviceTokenApi = (fcm_token) => {
    const payload = {
        fcm: fcm_token,
    };
    return new Promise((resolve) => {
        APIKit.post('/fcm', payload)
            .then(({ data }) => {
                resolve(data);
            })
            .catch(error => {
                resolve(error);
            })
    });
}