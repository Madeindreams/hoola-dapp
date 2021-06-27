import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { colors } from "../utils/colors";



const About = () => {
    const dispatch = useDispatch();
    //const account = useSelector(accountSelector);

  
    const props = {
      dispatch,
     // account,
    };
  
    return (
      <AboutWrapper>
        {/* {alert && alertType === "warning" ? Warning(props) : null} */}
      About Page
      </AboutWrapper>
    );
  };
  export default About;



  const AboutWrapper = styled.div`
  text-align: center;
  overflow-y: auto;
  padding: 10px;
`;
