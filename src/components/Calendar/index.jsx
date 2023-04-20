import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import Top from "./components/Top";
import Navigation from "./components/Navigation";
import Body from "./components/Body";
import Bottom from "./components/Bottom";
import EventTimeInput from "./components/EventTimeInput";

export const WEEKDAY_QUANTITY = 7;
export const HOUR_QUANTITY = 24;
export const GRID_CELL_QUANTITY = 168;

export const ONE_DAY = 86400000;
export const SEVEN_DAYS = 604800000;

export const EVENT_DATES = "eventDates";

const CalendarWrapper = styled.div`
  width: 740px;
  aspect-ratio: 740/1313;
  background-color: #ffffff;
  user-select: none;

  @media (max-width: 480px) {
    & button {
      cursor: auto;
    }
  }
`;

const CalendarContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  zoom: ${({ zoom }) => zoom};
`;

const Calendar = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const [currentWeekMonday, setCurrentWeekMonday] = useState(null);
  const [isShowEventTimeInput, setIsShowEventTimeInput] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [mondayDate, setMondayDate] = useState(null);
  const [eventDates, setEventDates] = useState([]);
  const [weekEventDates, setWeekEventDates] = useState([]);
  const [activeCellNumber, setActiveCellNumber] = useState(null);
  const [activeEventDate, setActiveEventDate] = useState(null);
  const [activeCellDate, setActiveCellDate] = useState("");

  const calendarRef = useRef(null);
  const plusRef = useRef(null);
  const deleteRef = useRef(null);

  useEffect(() => {
    const currentWeekMonday = new Date(currentDate.getTime() - ((currentDate.getDay() + 6) % 7) * ONE_DAY);
    setCurrentWeekMonday(currentWeekMonday);
    setMondayDate(currentWeekMonday);

    const eventDatesData = localStorage.getItem(EVENT_DATES);

    eventDatesData && setEventDates(JSON
      .parse(eventDatesData)
      .map(date => new Date(date))
    );
  }, []);

  useEffect(() => {
    const calendar = calendarRef.current;

    if (!calendar) return;

    const resizeObserver = new ResizeObserver(() => {
      setZoom(calendar.clientWidth / 740);
    });

    resizeObserver.observe(calendar);

    return () => resizeObserver.unobserve(calendar);
  }, []);

  useEffect(() => {
    updateWeekEventDates();
  }, [mondayDate]);

  useEffect(() => {
    if (!eventDates) return;

    setActiveEventDate(eventDates.find(date =>
      date.getDay() === activeCellNumber % WEEKDAY_QUANTITY &&
      date.getHours() === Math.floor(activeCellNumber / WEEKDAY_QUANTITY)
    ));

    if (activeCellNumber) {
      const cellDate = new Date(mondayDate);
      const offset = -cellDate.getTimezoneOffset() / 60;

      cellDate.setDate(cellDate.getDate() + (activeCellNumber - 1) % WEEKDAY_QUANTITY);
      cellDate.setHours(Math.floor(activeCellNumber / WEEKDAY_QUANTITY) + offset);

      setActiveCellDate(cellDate.toISOString().substring(0, 19));
    }
    else {
      setActiveCellDate("");
    }
  }, [activeCellNumber]);

  useEffect(() => {
    eventDates.length && localStorage.setItem(EVENT_DATES, JSON.stringify(eventDates));
    updateWeekEventDates();
  }, [eventDates]);

  const updateWeekEventDates = () => {
    if (!mondayDate) return;

    const sundayDate = new Date(mondayDate.getTime() + SEVEN_DAYS - ONE_DAY)
    sundayDate.setHours(23, 59, 59, 999);

    setWeekEventDates(eventDates.filter(date => date >= mondayDate && date <= sundayDate));
  }

  return (
    <CalendarWrapper ref={calendarRef}>
      <CalendarContent zoom={zoom}>
        <Top
          showEventTimeInput={() => setIsShowEventTimeInput(true)}
          plusRef={plusRef}
        />
        <Navigation
          currentDate={currentDate}
          currentWeekMonday={currentWeekMonday}
          mondayDate={mondayDate}
          setMondayDate={setMondayDate} />
        <Body
          className={"body"}
          weekEventDates={weekEventDates}
          activeCellNumber={activeCellNumber}
          setActiveCellNumber={setActiveCellNumber}
          plusRef={plusRef}
          deleteRef={deleteRef}
        />
        <Bottom
          eventDates={eventDates}
          setEventDates={setEventDates}
          activeEventDate={activeEventDate}
          resetActiveCellNumber={() => setActiveCellNumber(null)}
          currentWeekMonday={currentWeekMonday}
          setMondayDate={setMondayDate}
          deleteRef={deleteRef}
        />
        {isShowEventTimeInput && <EventTimeInput
          hide={() => setIsShowEventTimeInput(false)}
          eventDates={eventDates}
          setEventDates={setEventDates}
          activeCellDate={activeCellDate}
        />}
      </CalendarContent>
    </CalendarWrapper>
  );
};

export default Calendar;
