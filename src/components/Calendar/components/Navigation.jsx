import styled from "styled-components";
import { useState, useEffect } from "react";
import { SEVEN_DAYS } from "..";

const weekdayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const NavigationWrapper = styled.div`
  height: 163px;
  background-color: #f6f6f6;
  padding: 20px;
  padding-right: 39px;
  padding-left: 118px;
  border-top: 2px solid #ebebeb;
  border-bottom: 2px solid #ebebeb;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 0 -35px;

  &>* {
    text-align: center;
    margin-bottom: 19px;
  }

  .weekDay {
    font-size: 18px;
    font-weight: 500;
  }

  .monthDay {
    font-size: 30px;

    &[data-is-current=true] {
      position: relative;
      color: white;
      z-index: 1;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background-color: var(--red-1);
        z-index: -1;
      }
    }
  }
`;

const MonthSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 7px;
  margin: -6px -13px;

  .content {
    font-size: 24px;
  }
`;

const Back = styled.button`
  display:flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  
  &>img {
    filter: var(--red-1-filter);
  }
`;

const Forth = styled(Back)`
  transform: rotate(180deg);
`;

const Navigation = ({ currentDate, currentWeekMonday, mondayDate, setMondayDate }) => {
  const [currentDay, setCurrentDay] = useState(0);
  const [weekdayNumbers, setWeekdayNumbers] = useState(null);
  const [monthAndYear, setMonthAndYear] = useState(null);

  useEffect(() => {
    setCurrentDay(currentDate.getDate());
  }, [currentDate]);

  useEffect(() => {
    if (!mondayDate) return;

    const month = mondayDate.toLocaleString('default', { month: 'long' });

    setWeekdayNumbers(getWeekdayNumbers());
    setMonthAndYear(`${month} ${mondayDate.getFullYear()}`);
  }, [mondayDate]);

  const getWeekdayNumbers = () => {
    const weekdayNumbers = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(mondayDate);
      day.setDate(mondayDate.getDate() + i);
      weekdayNumbers.push(day.getDate());
    }

    return weekdayNumbers;
  }

  const handleOnBackClick = () => {
    setMondayDate(new Date(mondayDate.getTime() - SEVEN_DAYS));
  }

  const handleOnForthClick = () => {
    setMondayDate(new Date(mondayDate.getTime() + SEVEN_DAYS));
  }

  return (
    <NavigationWrapper>
      <Grid>
        {weekdayNames.map((weekDay, index) =>
          <div key={index} className="weekDay">{weekDay}</div>
        )}
        {weekdayNumbers && weekdayNumbers.map((weekdayNumber, index) =>
          <div
            key={index}
            className={`monthDay`}
            data-is-current={
              weekdayNumber === currentDay &&
              currentWeekMonday.getTime() === mondayDate.getTime()}
          >
            {weekdayNumber}
          </div>
        )}
      </Grid>
      <MonthSelector>
        <Back onClick={handleOnBackClick}><img src="/svg/back.svg" /></Back>
        <div className="content">{monthAndYear}</div>
        <Forth onClick={handleOnForthClick}><img src="/svg/back.svg" /></Forth>
      </MonthSelector>
    </NavigationWrapper>
  );
};

export default Navigation;