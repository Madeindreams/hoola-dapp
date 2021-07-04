import React from 'react'; // removed: component
import { useSelector } from "react-redux"; // removed: useDispatch
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // removed: Link
import styled, { css } from 'styled-components';
import {colors} from './utils/Colors';
import Warning from './components/Warning';
import Sidebar from "./components/Sidebar";
import Navigator from "./components/Navigator";
import Loop from './pages/Loop';
import Swap from './pages/Swap';
import Orders from './pages/Orders';
import Nft from './pages/Nft';
import {
  warningSelector,
  accountSelector,
  sidebarSelector
} from './store/selectors';

function App() {
  const warning = useSelector(warningSelector);
  const account = useSelector(accountSelector);
  const toggle = useSelector(sidebarSelector)
  // const dispatch = useDispatch();
  return (
    <DappWrapper>
      <Router>
       <Navigator />
       <Backdrop toggle={toggle} />
       <Sidebar />
      
       {warning  ? <Warning/> : null}
      
       <Switch>
            <Route path="/loop">
             {account? <Loop /> :  null }
            </Route>
            <Route path="/swap">
            {account? <Swap /> : null}
            </Route>
            <Route path="/liquidity">
            {account? <Orders /> : null }
            </Route>
            <Route path="/nft">
              { account ? <Nft /> : null}
            </Route>
          </Switch>

       </Router>
    </DappWrapper>
  );
}

export default App;

const DappWrapper = styled.div`
position:absolute;
top:0px;
bottom:0px;
width:100%;
min-width:750px;
color:${colors.text.primary};
background:${colors.background.primary};
`;

const Backdrop = styled.div`
  position: absolute;
  display: none;
  visibility: hidden;
  top: 55px;
  left: 0;
  content: '';
  width: 100%;
  bottom:0px;
  background: rgba(35,35,35,.82);
  transition: .25s ease;
  opacity: 0;
  z-index: 5;
  ${props => props.toggle ? css`
    display: block;
    visibility: visible;
    transition: .25s ease;
    opacity: 1;
  `: ``};
`;