import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";
import "./teacherslist.css"
const GET_TEACHERS = gql`
  query {
    getTeachers {
      _id
      first_name
      last_name
      cedula
      age
    }
  }
`;

const TeachersList = () => {
  const { loading, error, data } = useQuery(GET_TEACHERS);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error :</p>;
 
  return (
    <div className="table-container">
      <h4>Lista de teachers</h4>
      <div className="table-row table-header"> 
        <div className="table-cell">Nombre</div>
        <div className="table-cell">Apellido</div>
        <div className="table-cell">Cedula</div>
        <div className="table-cell">Edad</div>
      </div>
      {data.getTeachers.map((teacher) => (
        <div className="table-row" key={teacher.first_name}>
          <div className="table-cell">{teacher.last_name}</div>
          <div className="table-cell">{teacher.cedula}</div>
          <div className="table-cell">{teacher.age}</div>

        </div>
      ))}
      <Link to="/">Volver</Link>
    </div>
  );
};

export default TeachersList;