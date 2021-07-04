/* eslint-disable */
import React from "react";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const PleaseConnect = () => {

  const { t } = useTranslation('common');

  return (
    <Connection>
         Please Connect Your wallet
    </Connection>
  );
};
export default PleaseConnect;



const Connection = styled.div`
  position:absolute;
  top:0px;
  text-aling:center;
  left:100px;
 border: 1px solid #ffffff;
  margin:auto;
 
  overflow-x:hidden;
  overflow-y: auto;
  padding: 10px;
`;



