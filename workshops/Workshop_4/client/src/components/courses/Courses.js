import useFetch from "../hooks/useFetch";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useFetch("http://localhost:3001/api/courses");
    const [courseName, setCourseName] = useState("")
    const [courses, setCourses] = useState(data)

    const deleteCourse = (e,id)=>{
        e.preventDefault();
        console.log(id);        
        axios.delete(`http://localhost:3001/api/courses/${id}`)
        .then(res =>{
            alert(res.data.message);
            
        })
        .catch( err =>{
            alert(err.message)
        })
        
        
        
    }
    const handelInput = (e) =>{
        e.persist();
        setCourseName(e.target.value);   
        console.log(courseName);
        
    }
    const courseDetaills = courses.map((iteam, index) => {

        return (
            <tr key={index}>
                <td>{iteam._id}</td>
                <td>{iteam.name}</td>
                <td>{iteam.credits}</td>
                <td>{iteam.teacher}</td>
                <td><Link to={`/update/${iteam._id}`}><button>Edit</button></Link></td>
                <td><button onClick={e =>{deleteCourse(e,iteam._id)}}>Delete</button></td>                
            </tr>
        );
    })

    const handleInputSearch = () =>{        
        axios.get(`http://localhost:3001/api/courses/?name=${courseName}`)
        .then(res =>{
            console.log(res.data);
            setCourses(res.data)
            
        })
        .catch( err =>{
            alert(err.message)
        })
    }
    const handleButtonSearch = (order) =>{        
        axios.get(`http://localhost:3001/api/courses/?sort=${order}`)
        .then(res =>{
            setCourses(res.data)
            
        })
        .catch( err =>{
            alert(err.message)
        })
    }
    return (
        <div className="App-header">
            {loading ? ("Loading please wait") : (
                <div>
                    <div>
                        <h2>Table of Courses</h2>
                        <Link to="/create"><button>Add Course</button></Link>
                        <div >
                            
                            <input type="text" placeholder="Search.." name="search" onChange={handelInput}/>
                            <button onClick={handleInputSearch} type="submit">submit</button>
                        
                            <button onClick={e =>{handleButtonSearch("name")}} >Asc</button>
                            <button onClick={e =>{handleButtonSearch("-name")}}>Des</button>
                        </div>
                        
                    </div>
                    <div>  
                                              
                        <table  id="courses">                        
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Credits</th>
                                    <th>Teacher</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                            {courseDetaills}
                            </tbody>
                            
                        </table>
                        
                    </div>
                </div>
            )}
        </div>
    );

}


export default Courses;