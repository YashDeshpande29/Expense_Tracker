import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts'

function Incomes() {
  return (
    <IncomesStyled>
      <InnerLayout>
           <div className="income-content">
              <div className="form-container">
              <div className="incomes">

              </div>
              </div>
           </div>
      </InnerLayout>
    </IncomesStyled>
  )
}

const IncomesStyled=styled.div`

   
`

export default Incomes