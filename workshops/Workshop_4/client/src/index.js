import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import ErrorPage from './components/pages/error-page.js';
//pages
import TeachersList from './components/teachers/TeachersList';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from './components/pages/home';
import CoursesList from './components/courses/CoursesList';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Reemplaza con la URL de tu servidor GraphQL
  cache: new InMemoryCache()
});
const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/courses",
    element:<CoursesList></CoursesList>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/teachers",
    element:<TeachersList></TeachersList>,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode >
      <RouterProvider router={router} />
    </React.StrictMode>
  </ApolloProvider>

);
reportWebVitals();
