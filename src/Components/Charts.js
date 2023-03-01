import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useBudgets } from '../contexts/BudgetsContext';
import { stringify } from 'uuid';

ChartJS.register(ArcElement, Tooltip, Legend);



export default function Charts() {

    const { expenses, budgets } = useBudgets();

    const colors = expenses.map(() => {
        const r = Math.floor(Math.random() * 256); // red component (0-255)
        const g = Math.floor(Math.random() * 256); // green component (0-255)
        const b = Math.floor(Math.random() * 256); // blue component (0-255)
        const a = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b}), ${a}`; // return a string in the format "rgb(R, G, B)"
    });

    const colorsAgain = [];

    for (let i = 0; i < 20; i++) {
        const r = Math.floor(Math.random() * 256); // red component (0-255)
        const g = Math.floor(Math.random() * 256); // green component (0-255)
        const b = Math.floor(Math.random() * 256); // blue component (0-255)
        colors.push(`rgb(${r}, ${g}, ${b})`); // push a string in the format "rgb(R, G, B)" to the colors array
    }

    console.log('colors: ', colors)

    const expensesLabels = expenses.map((element) => {
        const label = element.description
        return label
    })

    const amounts = expenses.map((element) => {
        const value = element.amount;
        return value
    })

    const expensesData = {


        labels: expensesLabels,
        datasets: [
            {
                label: 'R spent',
                data: amounts,
                backgroundColor: colorsAgain,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    };

    const summary = {
        labels: expensesLabels,
        datasets: [
            {
                label: 'R spent',
                data: amounts,
                backgroundColor: [
                    colors,
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    colors,
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <>
            <div className='expenses-chart'>
                <Pie data={expensesData} />
            </div>
            <br />
            <div className='summary-chart'>
                <Pie data={summary} />
            </div>
        </>
    )
}
