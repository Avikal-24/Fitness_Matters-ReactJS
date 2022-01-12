import React from 'react'
import image from './image.jpeg'
import { useState } from 'react'
import axios from 'axios'

export default function New_Exercise() {

    const [exercise, modify_exercise] = useState({ username: '', password: '', description: '', duration: 0 });

    function add_name(e) {
        modify_exercise({ username: e.target.value, password: exercise.password, description: exercise.description, duration: exercise.duration });
    }

    function add_password(e) {
        modify_exercise({ username: exercise.username, password: e.target.value, description: exercise.description, duration: exercise.duration });
    }

    function add_description(e) {
        modify_exercise({ username: exercise.username, password: exercise.password, description: e.target.value, duration: exercise.duration });
    }

    function add_duration(e) {
        modify_exercise({ username: exercise.username, password: exercise.password, description: exercise.description, duration: e.target.value });
    }

    function submitted(e) {
        e.preventDefault();
        console.log(exercise);

        if (exercise.username == '' || exercise.password == '' || exercise.description == '' || exercise.duration == 0) {
            console.log("Please enter all the fields.");
            alert("Please enter all the fields.") ;

            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>ERROR </strong> Please enter all the fields.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            return;
        }

        axios.get('http://localhost:1000/all_users').then((response) => {

            let data = response.data;

            //  password checker
            let verify_pass = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i].username == exercise.username) {
                    if (data[i].password != exercise.password) {
                        verify_pass = false;
                    }
                    else {
                        verify_pass = true;
                    }
                    break;
                }
            }

            if (verify_pass == false) {
                console.log("ERROR. Either the password entered is wrong or no such user exists.");
                alert("ERROR. Either the password entered is wrong or no such user exists.") ;


                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>ERROR </strong> Either the password entered is wrong or no such user exists.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>

                return;
            }


            let to_db = {
                username: exercise.username,
                description: exercise.description,
                duration: exercise.duration
            }


            axios.post('http://localhost:1000/new_exercise', to_db).then((res) => {

                console.log("SUCCESS IN ADDING EXERCISE!!");
                alert("SUCCESS IN ADDING EXERCISE!!") ;
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>SUCCESS </strong> New exercise added successfully.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>


            }).catch(err => {
                alert("error in connecting to axios POST in add_exercise") ;
                console.log("error in connecting to axios POST in add_exercise");
            });

        }).catch((err) => {
            console.log("axios GET error in all_users API");
            alert("axios GET error in all_users API") ;
        });

        //    window.location = '/'  ;
    }

    return (
        <>

            <div className="container in-center">
                <h3><u>We're glad to see that you exercised today!!!</u></h3>
            </div>


            <div className="card container " >
                <img src={image} className="card-img-top image container" />
                <div className="card-header">
                    <h5>Enter the details below</h5>
                </div>
                <div className="card-body">

                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                            <input onChange={add_name} type="text" className="form-control" aria-describedby="emailHelp" />
                            <div className="form-text">Enter your username here.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input onChange={add_password} type="password" className="form-control" />
                            <div className="form-text">Too many incorrect attempts may lead to locking of your account.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Exercise description</label>
                            <input onChange={add_description} type="text" className="form-control" aria-describedby="emailHelp" />
                            <div className="form-text">Briefly describe your physical activity.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Duration in minutes</label>
                            <input onChange={add_duration} type="number" className="form-control" aria-describedby="emailHelp" />
                            <div className="form-text">Set the duration of your exercise.</div>
                        </div>
                        <button type="submit" onClick={submitted} className="btn btn-primary">Submit</button>
                    </form>

                </div>
            </div>

        </>
    )
}
