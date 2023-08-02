import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";
import "./courselist.css"
const GET_COURSES = gql`
  query {
    getCourses {
        _id
        name
        credits
        teacher
    }
  }
`;

const CoursesList = () => {
    const { loading, error, data } = useQuery(GET_COURSES);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error :</p>;
    return (
        <div className="table-container"> {/* Agrega la clase de contenedor de la tabla */}
            <h4>Lista de Coursos</h4>
            <div className="table-row table-header"> {/* Agrega la clase de fila de la tabla y de título de columna */}
                <div className="table-cell">Nombre</div> {/* Agrega la clase de celda de la tabla */}
                <div className="table-cell">Créditos</div> {/* Agrega la clase de celda de la tabla */}
                <div className="table-cell">Teacher</div> {/* Agrega la clase de celda de la tabla */}
            </div>
            {data.getCourses.map((course) => (
                <div className="table-row" key={course._id}> {/* Agrega la clase de fila de la tabla */}
                    <div className="table-cell">{course.name}</div> {/* Agrega la clase de celda de la tabla */}
                    <div className="table-cell">{course.credits}</div> {/* Agrega la clase de celda de la tabla */}
                    <div className="table-cell">{course.teacher}</div> {/* Agrega la clase de celda de la tabla */}
                </div>
            ))}
            <Link to="/">Volver</Link>
        </div>
    );
};

export default CoursesList;