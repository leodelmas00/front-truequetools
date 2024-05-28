import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "wouter";

/*
import { baseURL } from '../api/trueque.api';
import { getUserInfo } from '../api/trueque.api';
*/

export default function EmployeeDetail() {
    const params = useParams();
    const [employee, setEmployee] = useState(null);
    
    /*

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const token = localStorage.getItem('token');
                const employeeResponse = await axios.get(`${baseURL}Employees/${params.employeeId}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                const userInfoResponse = await getUserInfo();
                setEmployee(employeeResponse.data);
            } catch (error) {
                console.error('Error:', error);
            }
            fetchEmployee();
        };
    }, [params.postId]);

    */

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            hola, despues lo sigo jeje
        </div>
    );
}