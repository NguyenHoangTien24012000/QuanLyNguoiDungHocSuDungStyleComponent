import { add_nguoi_dung, change_theme, deleted_nguoi_dung, edit_nguoi_dung, update_nguoi_dung } from "../types/QLNDTypes";

export const changeThemeAction = (idTheme) => ({
    type : change_theme,
    idTheme
})
export const addNguoiDungAction = (nguoiDung) =>({
    type : add_nguoi_dung,
    nguoiDung
})

export const deletedNguoiDungActions = (taiKhoan) =>({
    type : deleted_nguoi_dung,
    taiKhoan
})

export const editNguoiDungAction = (taiKhoan) =>({
    type : edit_nguoi_dung,
    taiKhoan
})

export const upDateNguoiDungAction = (nguoiDung) => ({
    type : update_nguoi_dung,
    nguoiDung
})