import { Link, useNavigate} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import axios from "axios";
import SelectTeacher from "../select/select";

const CreateCourses = () =>{
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        name:"",
        credits:"",
        teacher:"",
    })     
    const {data,loading,error} = useFetch("http://localhost:3001/api/teachers");

    const saveCourse = () =>{        
        const dataCourse ={
            name:course.name,
            credits:course.credits,
            teacher:course.teacher
        }
        console.log(dataCourse)
        if(course.name !="" && course.teacher !="" ){
            axios.post(`http://localhost:3001/api/courses`,dataCourse)
            .then(res =>{
                alert(res.data.message);
                
            })
            .catch( err =>{
                alert(err.message)
            })
            
        }else{
            alert("not complet data");
        }
        navigate("/");
    }
    const handelInput = (e) =>{
        e.persist();
        setCourse({...course,[e.target.name]: e.target.value});   
        
    }
    
    return(        
        <div className="App-header">           
           {loading ?  ("Loading teachers please wait"):(
            <div>
                <div>
                <h2>Add Course</h2>
                <Link to="/"><button>Back</button></Link>
            </div>
        <form onSubmit={saveCourse}>
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
                <button type="sumit"> Save Course</button>
            </div>
            
        </form>

            </div>
            
        )}
                                        
        </div>
    );

}

export default CreateCourses;