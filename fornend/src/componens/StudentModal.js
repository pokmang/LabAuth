import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'antd/dist/antd.css'
import { Modal } from 'antd'

const StudentModal = (props) => {
    const dispatch = useDispatch();
    const visibleShow = useSelector(state => state.showModal);

    const handleOk = () => {
        dispatch({ type: 'OK' })
    }

    const handleCancel = () => {
        dispatch({ type: 'CANCLE' })
    }

    return (
        <div>
            <Modal
                title="Student Information"
                visible={visibleShow}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <table>
                    <tbody>
                        <tr>
                            <td>Student ID : </td>
                            <td>{props.id}</td>
                        </tr>
                        <tr>
                            <td>Name : </td>
                            <td>{props.name}</td>
                        </tr>
                        <tr>
                            <td>Surname : </td>
                            <td>{props.surname}</td>
                        </tr>
                        <tr>
                            <td>Major : </td>
                            <td>{props.major}</td>
                        </tr>
                        <tr>
                            <td>GPA : </td>
                            <td>{props.GPA}</td>
                        </tr>
                    </tbody>
                </table>
            </Modal>
        </div>
    )
}

export default StudentModal