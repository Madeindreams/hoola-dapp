
import {colors} from '../utils/Colors';
import styled from 'styled-components';

const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
  
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
    circle.classList.add("ripple");
  
    const ripple = button.getElementsByClassName("ripple")[0];
  
    if (ripple) {
      ripple.remove();
    }
  
    button.appendChild(circle);
  };
  
  const ButtonFlat = ({
    action,
    icon = () => {
      return null;
    },
    message,
    waitForRipple = false,
    disabled = false,
  }) => {
    const Icon = icon();
    return (
      <ButtonWrapper
        type="submit"
        disabled={disabled}
        onClick={(e) => {
          createRipple(e);
  
          if (waitForRipple) {
            setTimeout(() => {
              action();
            }, 250);
          } else {
            action();
          }
        }}
      >
        {Icon} {message}
      </ButtonWrapper>
    );
  };
  export default ButtonFlat;
  
  const ButtonWrapper = styled.button`
    color: ${colors.text.primary};
    background-color: transparent;
    border: 2px solid ${colors.text.secondary};
    margin-right: 50px;
    border-radius: 5px;
    text-transform: uppercase;
    padding: 10px 5px;
    min-width: 100px;
    margin: auto;
  
    // hover
    transition: box-shadow 0.15s ease-in-out;
  
    // ripple
    overflow: hidden;
    position: relative;
    transition: background 400ms;
  
    &:hover {
      box-shadow: 8px 8px 15px ${colors.background.shadow};
      cursor:pointer;
    }
  
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    span.ripple {
      position: absolute; /* The absolute position we mentioned earlier */
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 400ms linear;
      background-color: ${colors.background.secondary};
    }
  `;