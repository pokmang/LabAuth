import React from 'react'
import { allActions } from '../redux/store'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import './Inputform.css'
import axios from 'axios'

const InputForm = () => {
    const form = useSelector(state => state.form)
    const actions = bindActionCreators(allActions, useDispatch())
    const getStudent = async (id) => {
        const result = await axios.get(`http://localhost:8000/api/students/${id}`)
        actions.get_student(result.data)
        actions.show_modal()
    }
    const update = async (id) => {
        form.id = id
    }

    //ดึงค่าจากbackend
    const addStudent = async () => {
        await axios.post(`http://localhost:8000/api/students`, form)
        actions.add_student({ ...form })
    }

    return (
        <div className='container'>
            <div className ='box'>
            <h2>Add Student</h2>
            <td>Student ID</td>
            <input className='inpt' type="text" onChange={(e) => actions.change_id(e.target.value)} />
            <td>Name</td>
            <input className='inpt' type="text" onChange={(e) => actions.change_name(e.target.value)} />
            <td>Surname</td>
            <input className='inpt' type="text" onChange={(e) => actions.change_surname(e.target.value)} />
            <td>Major</td>
            <input className='inpt' type="text" onChange={(e) => actions.change_major(e.target.value)} />
            <td>GPA</td>
            <input className='inpt' type="number" onChange={(e) => actions.change_gpa(e.target.value)} />
            <td><button className='btn' onClick={addStudent}>ADD</button></td>
            <td><button className='btn' onClick={update}>update</button></td>
            </div>
        </div>
    )
}

export default InputForm