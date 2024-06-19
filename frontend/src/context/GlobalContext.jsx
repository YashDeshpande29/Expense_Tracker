import {Children, React, createContext, useState } from "react";
import axios from 'axios'
const BASE_URL='http://localhost:5000/api/v1';

const GlobalContext=createContext()

export const GlobalProvider=({children})=>{
    const {incomes,setIncomes}=useState([])
    const {expenses,setExpenses}=useState([])
    return (
        <GlobalContext.Provider>
            {children}
        </GlobalContext.Provider>
    )
}