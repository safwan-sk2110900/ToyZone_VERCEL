'use client'
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FA19FF', '#19FF6E'];

const Page = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/summary/perlocation`, { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Failed to fetch customer data. Status: ${response.status}`);
                }

                const responseData = await response.json();

                if (!Array.isArray(responseData)) {
                    throw new Error('Response data is not in the expected format.');
                }

                const transformedData = responseData.map(item => ({
                    name: item.location,
                    value: item._count
                }));

                setData(transformedData);
                setIsLoading(false); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    if (isLoading) { 
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <>
        
        <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: '36px', fontWeight: 'bold', color: '#333', paddingTop: '20px' }}>Regional wise analysis</h1>

        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ maxWidth: '90vw', width: '700px' }}>
                <PieChart width={700} height={400}>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend
                        align="right"
                        verticalAlign="middle"
                        iconSize={10}
                        layout="vertical"
                        width={120}
                        wrapperStyle={{ right: '10px', top: '50%' }}
                    />
                </PieChart>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p style={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                        PIE Chart showing the demographics of orders from each location
                    </p>
                    <p style={{ fontFamily: 'Arial', fontSize: '14px', color: '#666' }}>
                        Each color represents a different location.
                    </p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Page;

