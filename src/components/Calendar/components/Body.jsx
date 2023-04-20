import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { GRID_CELL_QUANTITY, HOUR_QUANTITY } from "..";

const WEEKDAY_QUANTITY = 7;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  overflow-y: scroll;

   &::-webkit-scrollbar {
    width: 0px;
  }
`;

const Hours = styled.div`
  display: grid;
  margin: 37px 0;
  flex: 1;

  &>div {
    display: flex;
    align-items: center;
    justify-content: right;
    width: 20px;
    color: var(--gray-3);
    font-size: 20px;
    width: 100%;
    padding-right: 7px;
    height: 74px;
  }
`;

const Cells = styled.div`
  display: grid;
  grid-template-columns: repeat(${WEEKDAY_QUANTITY}, 1fr);

  &>button {
    width: 94px;
    height: 74px;
    border: 1px solid var(--gray-2);
    padding: 2px;

    &>div {
      width: 100%;
      height: 100%;
    }

    &[data-is-no-left-border=true] {
      border-left: none;
    }

    &[data-is-no-right-border=true] {
      border-right: none;
    }

    &[data-is-no-bottom-border=true] {
      border-bottom: none;
    }

    &[data-is-no-top-border=true] {
      border-top: none;
    }

    &[data-has-event=true] {
      &>div { 
        background-color: var(--blue-1);
      }

      &:hover {
        &>div {
          background-color: #d9dbff;
        }
      }
    }

    &:hover {
      &>div {
        background-color: #00000008;
      }
    }

    &:nth-child(${({ activeCellNumber }) => activeCellNumber}) {
      &>div {
        background-color: #00000017;
      }

      &:hover {
        &>div {
          background-color: #00000027;
        }
      }

      &[data-has-event=true] {
        &>div {
          background-color: var(--blue-2);
        }

        &:hover {
          &>div {
            background-color: #979dff;
          }
        }
      }
    }
  }
  
`;

const Body =
  ({ weekEventDates, activeCellNumber, setActiveCellNumber, plusRef, deleteRef }) => {
    const [cells, setCells] = useState();
    const [hours, setHours] = useState();
    const [isScrollSet, setIsScrollSet] = useState(false);

    const bodyRef = useRef();
    const cellsRef = useRef();

    useEffect(() => {
      const hours = [];
      const cells = [];

      for (let i = 1; i <= HOUR_QUANTITY - 1; i++) {
        hours.push(
          <div key={i}>{"00".substring(`${i}`.length) + i + ":00"}</div>
        );
      }

      for (let i = 0; i < GRID_CELL_QUANTITY; i++) {
        cells.push(
          <button
            key={i}
            data-is-no-left-border={!(i % WEEKDAY_QUANTITY)}
            data-is-no-right-border={!((i + 1) % WEEKDAY_QUANTITY)}
            data-is-no-bottom-border={i >= GRID_CELL_QUANTITY - WEEKDAY_QUANTITY}
            data-is-no-top-border={i < WEEKDAY_QUANTITY}
            data-has-event={
              weekEventDates.some(date =>
                date.getDay() - 1 === i % WEEKDAY_QUANTITY &&
                date.getHours() === Math.floor(i / WEEKDAY_QUANTITY)
              )
            }
            onClick={() => handleOnCellClick(i)}
          ><div /></button>
        );
      }

      setHours(hours);
      setCells(cells);
    }, [weekEventDates]);

    useEffect(() => {
      if (!isScrollSet && cells && bodyRef.current) {
        bodyRef.current.scrollTop = 618;
        setIsScrollSet(true);
      }
    }, [cells]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!cellsRef.current?.contains(event.target) &&
          !plusRef.current?.contains(event.target) &&
          !deleteRef.current?.contains(event.target)) {
          setActiveCellNumber("");
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [cellsRef]);

    const handleOnCellClick = (i) => {
      setActiveCellNumber(i + 1);
    }

    return (
      <BodyWrapper ref={bodyRef}>
        <Hours>{hours}</Hours>
        <Cells activeCellNumber={activeCellNumber} ref={cellsRef}>{cells}</Cells>
      </BodyWrapper>
    );
  };

export default Body;