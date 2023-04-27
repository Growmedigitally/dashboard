import { UPDATE_USER_DATA } from "src/constants/user";

export const updateUserData = (payload) => {
    return { type: UPDATE_USER_DATA, payload };
}