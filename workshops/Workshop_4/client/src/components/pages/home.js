import { Link } from "react-router-dom";
const Home = () => {

    return(
        <div>
            <Link to="/courses">Ver Courses</Link>    
            <Link to="/teachers">Ver teachers</Link>    
        </div>

    );
}

export default Home;