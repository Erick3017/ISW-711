import useFetch from "../hooks/useFetch";
const SelectTeacher = () =>{

    const {data,loading,error} = useFetch("http://localhost:3001/api/teachers");
    return(
        <>
            {data.map((dpto,index) => { 
                return(
                <option key={index} value={dpto._id}>
                {dpto.first_name +" "+dpto.last_name}
                </option>
                )
            })}
        </>
        
    );
}

export default SelectTeacher;