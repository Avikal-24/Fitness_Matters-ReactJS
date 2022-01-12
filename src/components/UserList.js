import React from 'react'
import image from './image4.png'
import axios from 'axios'
import { useState, useEffect } from "react";


export default function UserList() {

    const [list, setlist] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:1000/all_users').then((response) => {

            let temp = [];
            let data = response.data;

            for (let i = 0; i < data.length; i++) {
                temp.push(data[i].username);
            }

            setlist(temp);

        }).catch((err) => {
            console.log("GET request error");
        })
    }, [])

    function fetchlist() {
        return list.map((elem) => {
            return (
                <>
                    <li className="list-group-item my-2">{elem}</li>
                </>
            );
        })
    }

    return (
        <>
            <br />
            <div className="in-center">
                <h3><u>Users of Fitness-Matters</u></h3>
            </div>

            <div className="card container " >
                <img src={image} className="card-img-top image container" />
                <div className="card-header container in-center">
                    <h5>This is the list of all our users</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group in-center my-2 container">{fetchlist()}</ul>
                </div>
            </div>

        </>
    )
}
