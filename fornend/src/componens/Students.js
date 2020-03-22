import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Students = () => {
    const [students, setStudents] = useState({})
    const [student, setStudent] = useState('')
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [major, setMajor] = useState('')
    const [GPA, setGPA] = useState(0)

    const getStudents = async () => {
        const result = await axios.get(`http://localhost:8000/api/students`)
        setStudents(result.data)
    }

    const addStudent = async (id, name, surname, major, GPA) => {
        const result = await axios.post(`http://localhost:8000/api/students`, {
            id,
            name,
            surname,
            major,
            GPA
        })
        console.log(result.data)
        getStudents()
    }

    const getStudent = async (id) => {
        const result = await axios.get(`http://localhost:8000/api/students/${id}`)
        console.log('Student ID: ', result.data)
        setStudent(result.data)
    }

    const deleteStudent = async (id) => {
        const result = await axios.delete(`http://localhost:8000/api/students/${id}`)
        console.log(result.data)
        getStudents()
    }

    const updateStudent = async (id) => {
        const result = await axios.put(`http://localhost:8000/api/students/${id}`, {
            name,
            surname,
            major,
            GPA
        })
        console.log(result.data)
        getStudents()
    }

    const showStudent = () => {
        if (students && students.length)
            return students.map((student, index) => {
                return (
                    <li key={index}>
                        {(student) ? student.id : '-'} - {(student) ? student.name : '-'} {(student) ? student.surname : '-'} {(student) ? student.major : '-'} {(student) ? student.GPA : 0}
                        <button onClick={() => getStudent(student.id)}>Get</button>
                        <button onClick={() => deleteStudent(student.id)}>Del</button>
                        <button onClick={() => updateStudent(student.id)}>Update</button>
                    </li>
                )
            })
        else {
            return (<h2>No Student</h2>)
        }
    }

    useEffect(() => {
        getStudents()
    }, [])

    return (
        <div>
            <h2>Students</h2>
            <ul>
                {showStudent()}
            </ul>

            Select Student : {student.id} - {student.name} {student.surname} {student.major} {student.GPA}

            <h2>Add student</h2>
            Student ID :
            <input
                placeholder='Student ID'
                type='text'
                name='id'
                onChange={(e) => setId(e.target.value)}
            /> <br />
            Name :
            <input
                placeholder='Name'
                type='text'
                name='name'
                onChange={(e) => setName(e.target.value)}
            /> <br />
            Surname :
            <input
                placeholder='Surname'
                type='text'
                name='surname'
                onChange={(e) => setSurname(e.target.value)}
            /> <br />
            Major :
            <input
                placeholder='Major'
                type='text'
                name='major'
                onChange={(e) => setMajor(e.target.value)}
            /> <br />
            GPA :
            <input
                placeholder='GPA'
                type='number'
                name='GPA'
                onChange={(e) => setGPA(parseFloat(e.target.value))}
            /> <br />
            <button onClick={() => addStudent(id, name, surname, major, GPA)}>Add Student</button>
        </div>
    )
}

export default Students