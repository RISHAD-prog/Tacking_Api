import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useParams } from 'react-router-dom';
const Expense = () => {
    const ex = useLoaderData();
    const param = useParams();
    const { register, handleSubmit, error, formState: { errors } } = useForm();
    const today = new Date().toISOString().split('T')[0];
    const [search, setSearch] = useState({ from: null, to: null });
    const [filteredExpenses, setFilteredExpenses] = useState(null);
    const onSubmit = data => {
        console.log(data);
        if (!data) {
            error = <span className=" text-red-500 " >Fill the inputs</span>
            return error;
        }
        else{
            
            setSearch({from:data.to, to:data.from});

            let filteredData= ex.filter(d =>
                moment(d.expenseDate).isBetween(data.from, data.to, null, '[]') 
            );
            setFilteredExpenses(filteredData);
        }

    }
    
    const handleDelete=async(id)=>{
        const del= await axios.delete(`https://localhost:7049/api/Expense/${id}`);
        if(del){
            alert("id is deleted");
        }
        else{
            alert("not deleted");
        }
        
        
        
    }
    console.log(param.id);
    
    console.log(ex);
    return (
        <div className='relative'>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
                <label className="label">
                <span className="label-text">From</span>
                </label>
                <input
                type="date"
                {...register('from', { required: true })}
                className="input input-bordered"
                max={today}
                />
            </div>
            <div className="form-control">
                <label className="label">
                <span className="label-text">To</span>
                </label>
                <input
                type="date"
                {...register('to', { required: true })}
                className="input input-bordered"
                max={today}
                />
            </div>
            <div className="form-control mt-6">
                <input type="submit" className="btn btn-primary me-4" value="See Expense" />
            </div>
            </form>
            
            
            {error}
            <Link to={`/AddExpense/${param.id}`}><button className=' btn btn-primary '>Add Expense</button></Link>
            
            <div className=" overflow-x-auto ">
            <table  className="table table-zebra">
            <tr>
                    <th></th>
                    <th>CategoryId</th>
                    <th>Amount</th>
                    <th>Expense Date</th>
                    <th></th>
                    <th></th>
            </tr>
            
            {filteredExpenses !== null ? (filteredExpenses.map((d, index) => (
                <tr key={d.id}>
                    <th>{index + 1}</th>
                    <td>{d.categoryId}</td>
                    <td>{d.expenseAmount}</td>
                    <td>{moment(d.expenseDate).format("DD MMMM YYYY")}</td>
                    <td><Link to={`/EditExpense/${param.id}`}><button className="btn btn-primary">Edit</button></Link></td>
                    <td><Link to={`/DeleteExpense/${param.id}`}><button className="btn btn-error">Delete</button></Link></td>
                </tr>
            ) )):(ex.map((d, index) => (
                <tr key={d.id}>
                    <th>{index + 1}</th>
                    <td>{d.categoryId}</td>
                    <td>{d.expenseAmount}</td>
                    <td>{moment(d.expenseDate).format("DD MMMM YYYY")}</td>
                    <td><Link to={`/EditExpense/${param.id}`}><button className="btn btn-primary">Edit</button></Link></td>
                    <td><button onClick={()=>handleDelete(d.id)} className="btn btn-error">Delete</button></td>
                </tr>
            ) ) )
            }
        </table> 
        </div>
        </div>
    );
};

export default Expense;