import React from 'react';
import {
    createBrowserRouter,
} from "react-router-dom";
import Main from '../Layout/Main';
import Category from '../pages/Category/Category';
import Expense from '../pages/Expense/Expense';
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: "/",
            element:<Category></Category>
        },
        {
            path:"Expense/:id",
            element:<Expense></Expense>,
            loader: ({params})=> fetch(`https://localhost:7049/api/Expense/${params.id}`)
        }
      ]
    },
  ]);

export default router;