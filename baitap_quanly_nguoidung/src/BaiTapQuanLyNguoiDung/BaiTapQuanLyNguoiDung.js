import React, { Component } from 'react'
import { Container } from '../ComponentQuanLyNguoiDung/Container'
import { ThemeProvider } from 'styled-components'
import { Dropdown } from '../ComponentQuanLyNguoiDung/Dropdown'
import { Heading2, Heading3} from '../ComponentQuanLyNguoiDung/Heading'
import { TextField } from '../ComponentQuanLyNguoiDung/TextField'
import { Button } from '../ComponentQuanLyNguoiDung/Button'
import { Table, Tbody, Thead, Td, Th, Tr } from '../ComponentQuanLyNguoiDung/Table'
import { arrTheme } from '../Theme/ThemeManager'
import { connect } from 'react-redux'
import { addNguoiDungAction, changeThemeAction, deletedNguoiDungActions, editNguoiDungAction, upDateNguoiDungAction } from '../redux/actions/QLNDActions'



class BaiTapQuanLyNguoiDung extends Component {
    state = {
        values: {
            taiKhoan: '',
            hoTen: '',
            passWord: '',
            email: '',
            soDienThoai: '',
            nguoiDung: 'Khách hàng'
        },
        errors: {
            taiKhoan: '',
            hoTen: '',
            passWord: '',
            email: '',
            soDienThoai: ''
        },
        disabled :true
    }
    handleChangeValue = (event) => {
        let { name, value, type } = event.target;
        let newValue = { ...this.state.values, [name]: value }
        let newErrors = { ...this.state.errors }


        if (value.trim() === '') {
            newErrors[name] = name + ' is required !'
        } else {
            newErrors[name] = ''
        }
        if(name === 'taiKhoan'){
            const regexTaiKhoan = /\s/;
            if(regexTaiKhoan.test(value)){
                newErrors[name] = name + ' không được có khoảng trắng !'
            }else{
                newErrors[name] = ''
            }
        }

        if (type === 'email') {

            const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!regexEmail.test(value)) {
                newErrors[name] = name + ' is invalid !';
            } else {
                newErrors[name] = '';
            }

        }
        if (type === 'tel') {
            // console.log(value)
            const regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
            if (!regexPhone.test(value)) {
                newErrors[name] = name + ' is invalid !';
            } else {
                newErrors[name] = '';
            }
        }

        this.setState({

            values: newValue,
            errors: newErrors
        })
        // console.log(this.state.values.nguoiDung)

    }

    renderTheme = () => {
        return arrTheme.map((theme, index) => {
            return <option key={index} value={theme.id}>
                {theme.name}
            </option>
        })
    }
    renderDanhSachNguoiDung = () => {
        return this.props.danhSachNguoiDung.map((item, index) => {
            return <Tr key ={index}>
                <Td>{index + 1}</Td>
                <Td>{item.taiKhoan}</Td>
                <Td>{item.hoTen}</Td>
                <Td>{item.passWord}</Td>
                <Td>{item.email}</Td>
                <Td>{item.soDienThoai}</Td>
                <Td>{item.nguoiDung}</Td>
                <Td colSpan="3">
                    <div className='d-flex justify-content-center'>
                        <Button onClick = {() =>{
                           this.setState({
                               disabled : false
                           }, () =>{ this.props.dispatch(editNguoiDungAction(item.taiKhoan))})
                        }}><i className="fa fa-edit"></i> Chỉnh sửa</Button>
                        <Button onClick ={() =>{
                            // console.log(item.taiKhoan)
                            this.props.dispatch(deletedNguoiDungActions(item.taiKhoan))
                        }} className="ml-2"><i className="fa fa-trash-alt"></i> Xoá</Button>
                    </div>
                </Td>
            </Tr>
        })
    }


    render() {
        return (
            <ThemeProvider theme={this.props.themeQLND}>
                <Container style={{ width: '90%' }}>
                    <form onSubmit={(event) => event.preventDefault()}>
                        <Dropdown onChange={(e) => {
                            let { value } = e.target;
                            console.log(value)
                            this.props.dispatch(changeThemeAction(value))

                        }}>
                            {this.renderTheme()}
                        </Dropdown>
                        <Heading2 className='text-left'>Form đăng kí</Heading2>
                        <div className="row">
                            <div className="col-6">
                                {this.state.disabled ?  <TextField label="Tài khoản" type="text" name="taiKhoan" required value={this.state.values.taiKhoan} onChange={this.handleChangeValue} /> : 
                                 <TextField disabled label="Tài khoản" type="text" name="taiKhoan" required value={this.state.values.taiKhoan} onChange={this.handleChangeValue} />
                                }
                                <div><span className="text text-danger">{this.state.errors.taiKhoan}</span></div>
                                <TextField label="Mật khẩu" type="passWord" name="passWord" required value={this.state.values.passWord} onChange={this.handleChangeValue} />
                                <div><span className="text text-danger">{this.state.errors.passWord}</span></div>
                                <TextField label="Email" type="email" name="email" required value={this.state.values.email} onChange={this.handleChangeValue} />
                                <div><span className="text text-danger">{this.state.errors.email}</span></div>

                            </div>
                            <div className="col-6">
                                <TextField label="Họ tên" type="text" name="hoTen" required value={this.state.values.hoTen} onChange={this.handleChangeValue} />
                                <div><span className="text text-danger">{this.state.errors.hoTen}</span></div>
                                <TextField label="Số điện thoại" type="tel" name="soDienThoai" required value={this.state.values.soDienThoai} onChange={this.handleChangeValue} />
                                <div><span className="text text-danger">{this.state.errors.soDienThoai}</span></div>
                                <Dropdown className="mt-3" name="nguoiDung" type="text" onChange={this.handleChangeValue} >
                                    <option value="Khách hàng">Khách hàng</option>
                                    <option value="Quản trị">Quản Trị</option>
                                </Dropdown>
                            </div>

                        </div>
                        <div className="mt-3">
                            <Button onClick={() => {
                                let {values} = this.state
                                // console.log(values)
                                let valid = true
                                for(let key in values){
                                    if(values[key] === '') {
                                        valid = false;
                                        return;
                                    }
                                }
                                this.props.dispatch(addNguoiDungAction(values))
                            } }><i className="fa fa-plus"></i> Đăng kí</Button>
                            {this.state.disabled ?  <Button disabled onClick = {() =>{
                                this.props.dispatch(upDateNguoiDungAction(this.state.values))
                            }} className="ml-2"><i className="fa fa-upload"></i> Cập nhật</Button> :  <Button onClick = {() =>{
                                let {values} = this.state
                                this.setState({
                                    disabled : true,
                                    values : {
                                        taiKhoan: '',
                                        hoTen: '',
                                        passWord: '',
                                        email: '',
                                        soDienThoai: '',
                                        nguoiDung: 'Khách hàng'
                                    }
                                }, ()=>{ this.props.dispatch(upDateNguoiDungAction(values))})
                            }} className="ml-2"><i className="fa fa-upload"></i> Cập nhật</Button>
                            }
                        </div>
                        <hr></hr>

                    </form>
                    <Heading3>Danh sách người dùng</Heading3>
                    <Table>
                        <Thead>
                           <Tr>
                               <Th>STT</Th>
                               <Th>Tài khoản</Th>
                               <Th>Họ tên</Th>
                               <Th>Mật khẩu</Th>
                               <Th>Email</Th>
                               <Th>Số điện thoại</Th>
                               <Th>Người dùng</Th>
                               <Th colSpan="3"></Th>
                           </Tr>
                        </Thead>
                        <Tbody>
                            {this.renderDanhSachNguoiDung()}
                        </Tbody>
                    </Table>
                </Container>
            </ThemeProvider>
        )
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.editNguoiDung.taiKhoan !== this.props.editNguoiDung.taiKhoan){
            this.setState({
                values : this.props.editNguoiDung
            })
        }
    }
}

const mapStateToProps = state => {
    return {
        themeQLND: state.QLNDReducer.themeQLND,
        danhSachNguoiDung : state.QLNDReducer.danhSachNguoiDung,
        editNguoiDung : state.QLNDReducer.editNguoiDung
    }
}

export default connect(mapStateToProps)(BaiTapQuanLyNguoiDung)
