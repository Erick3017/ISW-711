import { Link, useNavigate, useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState,useEffect } from "react";
import axios from "axios";
import SelectTeacher from "../select/select";

const UpdateCourses = () =>{
    const navigate = useNavigate();
    var id = useParams().id;
    const {data,loading,error} = useFetch(`http://localhost:3001/api/courses/?id=${id}`);
    const [course, setCourse] = useState(data)      
   
    const updateCourse = () =>{        
        const data ={
            name:course.name,
            credits:course.credits,
            teacher:course.teacher
        }
        console.log(data)
        if(course.name !="" && course.teacher !="" ){
            axios.put(`http://localhost:3001/api/courses/${id}`,data)
            .then(res =>{
                alert(res.data.message);
                
            })
            .catch( err =>{
                alert(err.message)
            })
            
        }else{
            alert("not complet data");
        }

    }
    const handelInput = (e) =>{
        e.persist();
        setCourse({...course,[e.target.name]: e.target.value});   
        console.log(course);
        
    }
    
    return(        
        <div className="App-header" >           
           {loading ?  ("Loading teachers please wait"):(
            <div>
                <div>
                <h2>Edit Course</h2>
                <Link to="/"><button>Back</button></Link>
            </div>
        <form onSubmit={updateCourse}>
            <div>
            <label >Name of course </label>
                <input name ="name" type="text"  onChange={handelInput}/>
                
            </div>
            <div>
                <label>Credits </label>
                <input name="credits" type="number" min="1"  onChange={handelInput}/>
                
            </div>
                       
            <div>
                <label>List of theachers </label>
                <select name="teacher"onChange={handelInput}>
                    <SelectTeacher/>
                </select> 
            </div>
            <div>
                <button type="sumit"> Update Course</button>
            </div>
            
        </form>

            </div>
            
        )}
                                        
        </div>
    );

}

export default UpdateCourses;