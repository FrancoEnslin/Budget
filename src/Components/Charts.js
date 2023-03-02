import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useBudgets } from '../contexts/BudgetsContext';
import { stringify } from 'uuid';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts() {
    const { expenses, budgets } = useBudgets();
    const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
    const max = budgets.reduce((total, budgets) => total + budgets.max, 0)
    if (max === 0) return null;

    //Investing

    let expensesnewTotal = 0;

   console.log(expenses)

    //Expenses
    function getExpenses(){
        expenses.forEach(element => {
            
             expensesnewTotal =+ element.amount;
            return expensesnewTotal;
        });
    }

    const finalExpenses = getExpenses()
    console.log('total Expenses ',expensesnewTotal)
    console.log(expenses.amount)

    //Savings
    const savings = max - amount;

    console.log('Savings ',savings)

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
                backgroundColor: [
                    
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 0, 0, 0.2)', //- This is a shade of red.
                    'rgba(0, 255, 0, 0.2)',// - This is a shade of green.
                    'rgba(0, 0, 255, 0.2)' ,//- This is a shade of blue.
                    'rgba(255, 255, 0, 0.2)',// - This is a shade of yellow.
                    'rgba(128, 0, 128, 0.2)',// - This is a shade of purple.
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 0, 1)', //- This is a shade of red.
                    'rgba(0, 255, 0, 1)',// - This is a shade of green.
                    'rgba(0, 0, 255, 1)' ,//- This is a shade of blue.
                    'rgba(255, 255, 0, 1)',// - This is a shade of yellow.
                    'rgba(128, 0, 128, 1)',// - This is a shade of purple.
                ],
                borderWidth: 1,
            },
        ],
    };

    //This comprises of Investments, Savings and expenses
    const summary = {
        labels: expensesLabels,
        datasets: [
            {
                label: 'R spent',
                data: amounts,
                backgroundColor: [
                    
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    
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
