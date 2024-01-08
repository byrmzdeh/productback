import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000')
            .then((res) => res.json())
            .then((api) => setData(api))
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [])

    return (
        <div className='home'>
            <h2>Home</h2>
            <div className="cards">
                {data.map((item) => (
                    <div className='card'>
                        <h2>{item.name}</h2>
                        <p>{item.price}</p>
                        <h2>{item.desc}</h2>
                        <div className='buttons'>
                            <button className='update'>Update</button>
                            <button className='delete'> Delete</button>
                        </div>
                    </div>

                )

                )}

            </div>
            <button>
                <Link to='/add'>Add Cart</Link>
            </button>
        </div>
    )
}

export default Home