import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
    const { data: Category = [] } = useQuery({
        queryKey: ['Category'],
        queryFn: async () => {
            const res = await axios.get('https://localhost:7049/api/Category');
            return res.data;
        }
    });
    console.log(Category);
    return (
        <div className='grid grid-cols-3 gap-4 px-11'>
            {
            Category.map((c) => (
            <div key={c.id} className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{c.categoryName}</h2>
                    <div className="">
                    <Link to={`http://localhost:5173/Expense/${c.id}`}><button className="btn btn-primary">See Expenses</button></Link>
                    <button className="btn btn-ghost">Change CategoryName</button>
                    </div>
                </div>
            </div>
            ))
        }
        </div>
        
    );
};

export default Category;