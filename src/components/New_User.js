import React from 'react'
import { useState } from 'react'
import image from './image2.jpeg'
import axios from 'axios'
// axios.post('http://localhost:1000/new_user', {data to be sent} ).then( res =>console.log(res.data) ) ;

export default function New_User() {

    const [user, modify_user_info] = useState({ username: '', password: '' });


    function submitted(e) {
        
        e.preventDefault();
        console.log(user);

        if (user.username == '' || user.password == '') {

            console.log("Please enter all the fields.");
            alert("Please enter all the fields.") ;

            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>ERROR </strong> Please enter all the fields.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        }

        axios.get('http://localhost:1000/all_users').then(response => {
            let data = response.data;

            // console.log(data[0]);
            // console.log(typeof (data));

            let finder = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i].username == user.username) {
                    finder = true;
                    break;
                }
            }

            if (finder == false) {
                // this axios.post is giving errors.
                axios.post('http://localhost:1000/new_user', user).then((res) => {

                    console.log("SUCCESS IN ADDING USER!!");
                    alert("SUCCESS IN ADDING USER!!") ;

                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>SUCCESS </strong> New user is added to the database.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>

                }).catch(err => {
                    console.log("error in connecting to backend");
                });
            }

            else {
                console.log("SORRY, this username is already taken");
                alert("SORRY, this username is already taken") ;

                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>ERROR </strong> This username already exists.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }


        }).catch(err => {
            console.log("axios GET request error");
            alert("axios GET request error") ;
        })

        // window.location = '/';
    }
    function update_username(e) {
        modify_user_info({ username: e.target.value, password: user.password });
    }
    function update_password(e) {
        modify_user_info({ username: user.username, password: e.target.value });
    }


    return (
        <>
            <div className="in-center">
                <h1><u>Welcome to Sign up page</u></h1>
            </div>

            <div className="card container " >
                <img src={image} className="card-img-top image container" />
                <div className="card-header container in-center">
                    <h5>Enter the details below</h5>
                </div>
                <div className="card-body">

                    <div id="contents" className='in-center container'>
                        {/* <form action="/" method="POST"> */}
                        <form >
                            <label htmlFor="mail">UserName: </label>
                            <input type="text" id="mail" name="mail" onChange={update_username} />

                            <br /><br />

                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" name="password" onChange={update_password} />

                            <br /><br />

                            <button type="submit" className="btn btn-primary " onClick={submitted}>Sign Up</button>
                        </form>
                    </div>

                </div>
            </div>

        </>
    )
}
