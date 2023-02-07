import React, { useContext, useState } from "react"
import { v4 as uuidV4 } from 'uuid';

const BudgetsContext = React.createContext()

export function UsedBudgets() {
    return useContext(BudgetsContext)

}

export const BudgetsProvider = ({ children }) => {

    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expenses => expenses.budgetId === budgetId)
    };
    function addExpense({description, amount, budgetId}) {

        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        })

    };
    function addBudget(name, max) {

        setBudgets(prevBudgets => {

            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }

            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    };
    function deleteBudget() {

    };
    function deleteExpense() {

    };

    return <BudgetsContext.Provider
        value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>
        {children}
    </BudgetsContext.Provider>
}