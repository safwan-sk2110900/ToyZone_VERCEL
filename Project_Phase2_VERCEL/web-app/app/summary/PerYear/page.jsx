"use client"
import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Layout = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/summary/peryear`, { method: 'GET' });
        if (!response.ok) {
          throw new Error(`Failed to fetch customer data. Status: ${response.status}`);
        }
  
        const chart_data = await response.json();
        const xaxis = Object.keys(chart_data);
        const yaxis = Object.values(chart_data);
  
        const node = chartRef.current;
        const ctx = node.getContext('2d');
  
        if (chartInstance) {
          chartInstance.destroy();
        }
  
        const parentWidth = node.parentElement.clientWidth;
        const parentHeight = node.parentElement.clientHeight;
        const width = parentWidth * 0.95; // 95% of the parent width
        const height = parentHeight * 0.95; // 95% of the parent height
  
        chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: xaxis,
            datasets: [{
              label: 'No of purchases',
              data: yaxis,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)', // Lighter pink
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 99, 132, 0.5)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)', // Darker pink
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 2 // Increase border width for a bolder appearance
            }]
          },
          options: {
            responsive: true, // Enable responsiveness
            maintainAspectRatio: false, // Disable aspect ratio maintenance
            width: width, // Set the width dynamically
            height: height // Set the height dynamically
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <>
<h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: '36px', fontWeight: 'bold', color: '#333', paddingTop: '20px' }}>Year Wise Analysis</h1>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      
      <div style={{ width: '80%', height: '80%' }}>
        <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
            Bar Chart showing the Sales Over time
          </p>
          <p style={{ fontFamily: 'Arial', fontSize: '14px', color: '#666' }}>
            Each Bar represents a year
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Layout;
