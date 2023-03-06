import React, { useRef } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useBudgets } from '../contexts/BudgetsContext';
import { stringify } from 'uuid';
import { Button } from 'bootstrap';
import { Stack } from 'react-bootstrap';
import { exportComponentAsPDF } from 'react-component-export-image';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts() {
    const { expenses, budgets } = useBudgets();
    const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
    const max = budgets.reduce((total, budgets) => total + budgets.max, 0)
    if (max === 0) return null;
    let summaryCosts = [];
    let expensesnewTotal = 0;
    let investingTotal = 0;

    // const month = new Date().getMonth()
    // console.log(month) 


    //Expenses and Investing
    function getExpenses() {
        expenses.forEach(element => {

            if (element.description === 'Investments') {
                investingTotal = element.amount;
                
            }else{
                expensesnewTotal = expensesnewTotal + element.amount;
                return expensesnewTotal;  
            }

        });
    }

    //Savings
    const savings = max - amount;

    const finalExpenses = getExpenses()
    console.log('total investments: ', investingTotal)
    console.log('total Expenses ', expensesnewTotal)
    console.log('Final expenses ', finalExpenses)
    console.log('savings ', savings)

    const expensesLabels = expenses.map((element) => {
        const label = element.description
        return label
    })

     let summaryLabels = ['Expenses', 'Investments', 'Savings', ]

     summaryCosts = [expensesnewTotal, investingTotal , savings , ];

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
                    'rgba(0, 0, 255, 0.2)',//- This is a shade of blue.
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
                    'rgba(0, 0, 255, 1)',//- This is a shade of blue.
                    'rgba(255, 255, 0, 1)',// - This is a shade of yellow.
                    'rgba(128, 0, 128, 1)',// - This is a shade of purple.
                ],
                borderWidth: 1,
            },
        ],
    };

    //This comprises of Investments, Savings and expenses
    const summary = {
        labels: summaryLabels,
        datasets: [
            {
                label: 'R spent',
                data: summaryCosts,
                backgroundColor: [

                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(60, 179, 113, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(60, 179, 113, 1)',


                ],
                borderWidth: 1,
            },
        ],
    };



 
    return (
        <>
            
            <div className='expenses-chart' style={{display: 'block'}} >
                <h5 style={{alignItems: 'center', flexDirection: 'row',}}>Expenses</h5>
                <br />
                <Pie data={expensesData} />
            </div>
            <br />
          
            <div className='summary-chart' style={{display: 'block'}}>
                <h3 style={{alignItems: 'center', flexDirection: 'row',}}>Summary</h3>
                <Pie data={summary} />
             {/* <button onClick={() => exportComponentAsPDF(componentRef)}></button> */}
            </div> 
           
        </>
    )
}
