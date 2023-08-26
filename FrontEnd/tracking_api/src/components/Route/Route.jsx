import React from 'react';
import {
    createBrowserRouter,
} from "react-router-dom";
import Main from '../Layout/Main';
import AddExpense from '../pages/AddExpense/AddExpense';
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
        },
        {
            path: "AddExpense/:id",
            element:<AddExpense></AddExpense>
        }
      ]
    },
  ]);

export default router;