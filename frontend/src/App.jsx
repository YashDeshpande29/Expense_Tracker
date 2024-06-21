import React ,{useState} from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles'; // Adjust the path as needed
import { MainLayout } from './styles/Layouts';
import Navigation from './components/Navigation/Navigation.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Expenses from "./components/Expenses/Expenses.jsx";
import { useGlobalContext } from './context/GlobalContext.jsx';
import Income from './components/incomes/Incomes.jsx';
import Signup from './components/signup/Signup.jsx';
import Login from './components/login/Login.jsx';
import { BrowserRouter as Router, Route,  Routes, useNavigate } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound.jsx';


function App() {
  const [active,setActive]=useState(1);

  const global=useGlobalContext()
  console.log(global)
  const displayData=()=>{
    switch(active){
      case 1:
        return <Dashboard/>
      case 2:
        return <Dashboard/>
      case 3:
        return <Income/>
      case 4:
        return <Expenses/>
      default:<Dashboard/>
    }
  }
 
  // const handleLogin = () => {
  //   // Redirect to main page after successful login
  //   window.location.href = '/';
  // };

  // const handleSignup = () => {
  //   // Redirect to main page after successful signup
  //   window.location.href = '/';
  //  };

    return (

      <Router>
      <AppStyled className='App'>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
            <Route path="/" element={
                <MainLayout>
                  <Navigation active={active} setActive={setActive} />
                    <main>
                      {displayData()}
                    </main>
                </MainLayout>
            } />
        <Route path="*" element={<NotFound />} /> {/* Fallback route for 404 */}
        </Routes>
      </AppStyled>
  </Router>

    );
}



const AppStyled = styled.div`
    height: 100vh;
    position:relative;
    main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid white;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
