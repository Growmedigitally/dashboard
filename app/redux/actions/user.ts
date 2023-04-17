import { UPDATE_USER_DATA } from "@constant/user";

export const updateUserData = (payload) => {
    return { type: UPDATE_USER_DATA, payload };
}