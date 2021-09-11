import { arrTheme } from "../../Theme/ThemeManager"
import { QLNDDarkTheme } from "../../Theme/QLNDDarkTheme"
import { add_nguoi_dung, change_theme, deleted_nguoi_dung, edit_nguoi_dung, update_nguoi_dung } from "../types/QLNDTypes"

const initialState = {
    themeQLND: QLNDDarkTheme,
    danhSachNguoiDung:[ {
        taiKhoan: 'NguyenTien',
        hoTen: 'Nguyen Hoang Tien',
        passWord: '123',
        email: 'hoangtienflytom@gmail.com',
        soDienThoai: '0868408924',
        nguoiDung: 'Khách hàng',
    },
    {
        taiKhoan: 'NguyenTienAn',
        hoTen: 'Nguyen Hoang Tien',
        passWord: '123',
        email: 'hoangtisenflytom@gmail.com',
        soDienThoai: '08368408924',
        nguoiDung: 'Quản trị'}
],
    editNguoiDung : ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case change_theme: {
            //  console.log(action.idTheme)
            let theme = arrTheme.find(theme => theme.id === action.idTheme)
            // console.log(theme)

            return { ...state, themeQLND: theme.theme }
        }
        case add_nguoi_dung :{
            // console.log(action.nguoiDung)
            let newDanhSachNguoiDung = [...state.danhSachNguoiDung]
            let indexTaiKhoan = newDanhSachNguoiDung.findIndex(nguoiDung => nguoiDung.taiKhoan === action.nguoiDung.taiKhoan);
            if(indexTaiKhoan !== -1){
                alert('Tài khoản đã tồn tại !')
                return {...state}
            }
            let indexSoDienThoai = newDanhSachNguoiDung.findIndex(nguoiDung => nguoiDung.soDienThoai === action.nguoiDung.soDienThoai);
            if(indexSoDienThoai !== -1){
                alert('Số điện thoại đã tồn tại !')
                return {...state}
            }
            let indexEmail = newDanhSachNguoiDung.findIndex(nguoiDung => nguoiDung.email === action.nguoiDung.email);
            if(indexEmail !== -1){
                alert('Email đã tồn tại !')
                return {...state}
            }
            newDanhSachNguoiDung.push(action.nguoiDung)
            state.danhSachNguoiDung = newDanhSachNguoiDung
            return {...state}
        }
        case deleted_nguoi_dung : {
            // console.log(action.taiKhoan)
            // let newDanhSachNguoiDung = [...state.danhSachNguoiDung]
            return {...state, danhSachNguoiDung : state.danhSachNguoiDung.filter(nguoiDung => nguoiDung.taiKhoan !== action.taiKhoan)}
        }
        case edit_nguoi_dung : {
    
            let nguoiDungEdit =  state.danhSachNguoiDung.find(nguoiDung => nguoiDung.taiKhoan === action.taiKhoan)
          
            // console.log(nguoiDungEdit);
            state.editNguoiDung = nguoiDungEdit
            // console.log( 'edinguoidung',state.editNguoiDung)
            return {...state}
        }
        case update_nguoi_dung:{
            // console.log( 'update',action.nguoiDung)
            state.editNguoiDung = action.nguoiDung
            // console.log('edit',state.editNguoiDung)
            let newDanhSachNguoiDung = [...state.danhSachNguoiDung]
            let index = newDanhSachNguoiDung.findIndex(nguoiDung => nguoiDung.taiKhoan === state.editNguoiDung.taiKhoan)
            // console.log(index)
            if(index !== -1){
                newDanhSachNguoiDung[index] = state.editNguoiDung
            }
            state.editNguoiDung = ''
            state.danhSachNguoiDung = newDanhSachNguoiDung;
            return {...state}

        }
        default:
            return { ...state }
    }
}


