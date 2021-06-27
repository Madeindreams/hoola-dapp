
import React from "react"; // removed: useEffect
// import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { colors } from "../utils/Colors";
import { weiToFloat } from "../utils/Balances";

    const EthBalance = (balance,decimals) => {
          return(
           
              <EtherBalanceWrapper>
              <EtherBalanceLogo src={`./assets/erc20logo/ETH.svg`} alt="ETH"/>
              {weiToFloat(balance,decimals)}
              </EtherBalanceWrapper> 
         
          )
      }
      
    export default EthBalance;

const EtherBalanceWrapper = styled.div`
position:relative;
margin:auto;
width:75px;
font-weight:600;
text-shadow: 3px 3px  ${colors.background.secondary};
margin-bottom:10px;
`;
const EtherBalanceLogo = styled.img`
position:absolute;
left:-20px;
height:25px;
text-shadow: 10px 2px 10px 5px ${colors.background.secondary};

`;
