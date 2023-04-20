import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const EventTimeInputWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000064;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const AddingBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 624px;
  height: 410px;
  border-radius: 33px;
  background-color: var(--gray-2);
  overflow: hidden;
`;

const Heading = styled.div`
  text-align: center;
  margin-bottom: 53px;

  &>div:nth-child(1) {
    font-size: 38px;
    font-weight: 600;
    line-height: 52px;
  }

  &>div:nth-child(2) {
    font-size: 30px;
    line-height: 40px;
  }
`;

const Input = styled.input`
  width: 550px;
  height: 58px;
  margin-bottom: 28px;
  align-self: center;
  border: 1px solid var(--gray-3);
  padding: 8px;
  font-size: 30px;
  caret-color: var(--blue-3);

  &::-webkit-inner-spin-button, 
  &::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

  &[data-is-valid=false] {
    border-color: var(--red-1);
  }
`;

const Buttons = styled.div`
  display: flex;
  height: 102px;
  border-top: 2px solid var(--gray-3); 
  
  &>button {
    width: 50%;
    color: var(--blue-3);
    font-size: 40px;

    &:first-child {
      border-right: 1px solid var(--gray-3);
    }

    &:last-child {
      border-left: 1px solid var(--gray-3);
    }

    &:hover {
      background-color: var(--gray-1);
    }
  }
`;


const EventTimeInput =
  ({ hide, eventDates, activeCellDate, setEventDates }) => {
    const [datetime, setDatetime] = useState(activeCellDate);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
      setIsValid(true);
    }, [datetime]);

    const handleOnOkClick = () => {
      if (datetime) {
        setEventDates([new Date(datetime), ...eventDates]);
        hide();
      }
      else {
        setIsValid(false);
      }
    }

    return (
      <EventTimeInputWrapper>
        <AddingBlock>
          <Heading>
            <div>https://calendar.com</div>
            <div>Enter event time: <br />YYYY-MM-DD HH:mm:ss</div>
          </Heading>
          <Input
            type="datetime-local"
            name="datetime"
            step="1"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            data-is-valid={isValid}
          />
          <Buttons>
            <button onClick={hide}>Cancel</button>
            <button onClick={handleOnOkClick}>OK</button>
          </Buttons>
        </AddingBlock>
      </EventTimeInputWrapper>
    );
  };

export default EventTimeInput;