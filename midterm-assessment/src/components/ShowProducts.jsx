import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // Import Moment.js
import './ShowProducts.css'; // Import the CSS file

const ShowProducts = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        displayProducts(); // Fetch products when the component mounts
    }, []);

    const displayProducts = () => {
        const url = 'http://localhost:3000/api/v1/products';
        axios.get(url)
            .then(response => {
                setData(response.data.products);
            })
            .catch(error => {
                alert('Server is not responding', error);
            });
    };

    const viewProductDetails = productId => {
        navigate(`/products/${productId}`);
    };

    const deleteData = id => {
        axios.delete(`http://localhost:3000/api/v1/products/${id}`)
            .then(() => {
                displayProducts(); // Refresh product list after deletion
            })
            .catch(error => {
                console.error(error);
            });

        const newData = data.filter(item => item._id !== id);
        setData(newData);
    };

    return (
        <div className='outer'>
            <h1>Get Product Details</h1>
            <div className='inner'>
                {data.map(value => {
                    const formattedDate = value.created_at ? moment(value.created_at).format('DD-MM-YY') : 'No Date';

                    return (
                        <div className='inside' key={value._id}>
                            <p><b>Name:</b> {value.name}</p>
                            <p><b>Price:</b> {value.price}</p>
                            <p><b>Date Added:</b> {formattedDate}</p>
                            <button onClick={() => viewProductDetails(value._id)}>View Details</button>
                            <button onClick={() => deleteData(value._id)}>Delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ShowProducts
