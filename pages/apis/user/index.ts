import { APIROUTINGS } from "src/utils/apiRoutings/RestClient";

export const getUserByCredentials = (userDetails) => {
    return new Promise((res, rej) => {
        APIROUTINGS.POST(`/api/auth/login`, userDetails)
            .then((response) => {
                res(response.data);
            }).catch(function (error) {
                rej(error.response.data);
                console.log(`Error in /api/auth/login = `, error);
            });
    })
}

export const getUserByToken = () => {
    return new Promise((res, rej) => {
        APIROUTINGS.GET(`/api/user/userByToken`)
            .then((response) => {
                res(response.data);
            }).catch(function (error) {
                rej(error);
                console.log(`Error in /api/auth/login = `, error);
            });
    })
}

// export const updateUserAddress = (address, userId) => {
//     return new Promise((res, rej) => {
//         APIROUTINGS.POST(`${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}/${userId}`, address)
//             .then((response) => {
//                 res(response.data);
//             }).catch(function (error) {
//                 rej(error);
//                 console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}/${userId}=>`, error);
//             });
//     })
// }

// export const getUserByTenantAndMobile = (tenantId, storeId, mobile) => {
//     return new Promise((res, rej) => {
//         APIROUTINGS.GET(`${process.env.NEXT_PUBLIC_GET_USER}/userbymobileno?tenantId=${tenantId}&storeId=${storeId}&mobileNo=${mobile}`)
//             .then((response) => {
//                 res(response.data);
//             }).catch(function (error) {
//                 rej(error);
//                 console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}/${tenantId}/${mobile}=>`, error);
//             });
//     })
// }

// export const markUserOptInForWhatsapp = (tenantId, storeId, usersList) => {
//     return new Promise((res, rej) => {
//         APIROUTINGS.PUT(`${process.env.NEXT_PUBLIC_UPDATE_OPTIN_FOR_WAPP}?tenantId=${tenantId}&storeId=${storeId}`, usersList)
//             .then((response) => {
//                 res(response);
//             }).catch(function (error) {
//                 rej(error);
//                 console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
//             });
//     })
// }

// export const updateUserVisitCount = (userId) => {
//     return new Promise((res, rej) => {
//         APIROUTINGS.PUT(`${process.env.NEXT_PUBLIC_UPDATE_VISIT_COUNT}/${userId}`, {})
//             .then((response) => {
//                 res(response);
//             }).catch(function (error) {
//                 rej(error);
//                 console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
//             });
//     })
// }