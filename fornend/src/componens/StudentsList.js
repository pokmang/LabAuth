import React, { useEffect } from 'react'
import axios from 'axios'
import { Table, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import StudentModal from './StudentModal'
import UpdateModa from './UpdateModal'
import { allActions, studentAction } from '../redux/store'
import { bindActionCreators } from 'redux'
import './StudentsList.css'

const { confirm } = Modal;

const StudentsList = () => {
    const actions = bindActionCreators(allActions, useDispatch())
    const stdActions = bindActionCreators(studentAction, useDispatch())
    const form = useSelector(state => state.form)
    const students = useSelector(state => state.student);
    const student = useSelector(state => state.show);

    const columns = [
        {
            title: 'Student ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <a onClick={() => getStudent(text)}>{text}</a>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Major',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: 'GPA',
            dataIndex: 'GPA',
            key: 'GPA',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a style={{ marginRight: 16 }} onClick={() => update(record.id)}>Update</a>
                    <a onClick={() => deleteStudent(record.id)}>Delete</a>
                </span>
            )
        }
    ]

    const getStudent = async (id) => {
        const result = await axios.get(`http://localhost:8000/api/students/${id}`)
        actions.get_student(result.data)
        actions.show_modal()
    }

    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:8000/api/students/${id}`)
        actions.delete_student(id)
    }

    const update = async (id) => {
        form.id = id
        actions.update_modal()
    }


    useEffect(() => {
        stdActions.getStudents()
    }, [])
    
    return (
        <div >
            <Table columns={columns} dataSource={students} />
            <UpdateModa />
        </div>
    )
}

export default StudentsList