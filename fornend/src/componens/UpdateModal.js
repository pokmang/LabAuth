import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import 'antd/dist/antd.css'
import { Modal } from 'antd'
import { allActions } from '../redux/store'
import { bindActionCreators } from 'redux'

const UpdateModa = () => {
    const actions = bindActionCreators(allActions, useDispatch())
    const visibleUpdate = useSelector(state => state.updateModal)
    const form = useSelector(state => state.form)

    const handleOk = () => {
        actions.ok()
        updateStudent(form.id)
    }

    const handleCancel = () => {
        actions.cancle()
    }

    const updateStudent = async (id) => {
        await axios.put(`http://localhost:8000/api/students/${id}`, form)
        actions.update_student(id, { ...form, id: id })
    }

    return (
        <div>
            <Modal
                title="Update Student"
                visible={visibleUpdate}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>
                                <input className='inpt' type="text" onChange={(e) => actions.change_name(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Surname</td>
                            <td>
                                <input className='inpt' type="text" onChange={(e) => actions.change_surname(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Major</td>
                            <td>
                                <input className='inpt' type="text" onChange={(e) => actions.change_major(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>GPA</td>
                            <td>
                                <input className='inpt' type="number" onChange={(e) => actions.change_gpa(e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Modal>
        </div>
    )
}

export default UpdateModa