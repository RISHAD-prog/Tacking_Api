import React from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
const AddExpense = () => {
    const param= useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const today = new Date().toISOString().split('T')[0];
    const addUser = (CategoryId, amount, edate) => {
        const userData = {
            CategoryId: CategoryId,
            ExpenseAmount: amount,
            ExpenseDate: edate
        };
        fetch('https://localhost:7049/api/Expense', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .catch(error => alert(error.message))
    }
    let error = "";
    const onSubmit = data => {
        console.log(data);
        if (!data) {
            error = <span className=" text-red-500 " >Fill the inputs</span>
            return error;
        }
        else{
            addUser(data.CategoryId, data.amount, data.datetime);
            reset();
            alert("Expense has been inserted")
        }
                  
    }
    return (
        <div>
            <div className="hero-content flex-col lg:flex-row mt-5">
                
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                    <div className="card-body">
                        <div className="form-control">
                            <h1 className="text-5xl font-bold">Add Expense </h1>
                            <label className="label">
                                <span className="label-text">CategoryId</span>
                            </label>
                            <input type="text" {...register("CategoryId", { })} placeholder="CategoryId" name="CategoryId" className="input input-bordered" value={param.id} readOnly/>
                            
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Expense Amount</span>
                            </label>
                            <input type="text" {...register("amount", { required: true })} placeholder="Give the amount" className="input input-bordered" />
                            {errors.amount?.type === 'required' && <span className=" text-red-500 " >Amount field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" {...register("datetime", {  })} placeholder="date" name="date" className="input input-bordered" max={today} />
                            
                        </div>
                        
                        <div className="form-control mt-6">
                            <input type="submit" onClick={handleSubmit(onSubmit)} className="btn btn-primary" value="Add Expense" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddExpense;