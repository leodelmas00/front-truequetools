import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "wouter";
import { baseURL } from '../../api/trueque.api.js'


export default function EmployeeDetail() {
    const params = useParams();
    const [employee, setEmployee] = useState(null);



    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const employeeResponse = await axios.get(`${baseURL}adminview/employees/${params.employeeId}/`, {

                });
                setEmployee(employeeResponse.data);
                console.log(employeeResponse.data)
            } catch (error) {
                console.error('Error:', error);
            }
            fetchEmployee();
        };
    }, [params.employeeId]);



    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {/* {employee.email} */}
        </div>
    );
}