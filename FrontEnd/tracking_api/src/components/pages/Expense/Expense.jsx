
import moment from 'moment';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
const Expense = () => {
    const ex = useLoaderData();
    let count = 1;
    console.log(ex);
    return (
        <div className="overflow-x-auto">
            <table  className="table table-zebra">
            <tr>
                    <th></th>
                    <th>CategoryId</th>
                    <th>Amount</th>
                    <th>Expense Date</th>
                    <th></th>
            </tr>
            {
                
            ex.map(d=>(
                <tr key={d.id}>
                    <th>{count++}</th>
                    <td>{d.categoryId}</td>
                    <td>{d.expenseAmount}</td>
                    <td>{moment(d.expenseDate).format("DD MMMM YYYY")}</td>
                    <td><Link></Link> <button className="btn btn-primary">Edit</button></td>
                </tr>
            
            ))
        }
        </table> 
        </div>
    );
};

export default Expense;