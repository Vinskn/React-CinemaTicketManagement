import type { FormType } from "../../types/FormType";

export const addData = (data: FormType) => {
    return {
        type: "ADD_DATA",
        payload: data,
    };
};

export const deleteData = (tanggal: string) => {
    return {
        type: "DELETE_DATA",
        payload: tanggal,
    };
};