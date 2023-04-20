import styled from "styled-components";

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 94px;
  background-color: var(--gray-1);
  border-top: 2px solid var(--gray-2);

  &>button {
    padding: 0 55px;
    color: var(--red-1);
    font-size: 32px;

    &:hover {
      background-color: #ffffff;
    }
  }
`;

const Bottom =
  ({ eventDates, setEventDates, activeEventDate, resetActiveCellNumber,
    currentWeekMonday, setMondayDate, deleteRef }) => {

    const handleOnDeleteClick = () => {
      setEventDates(eventDates.filter(date => date !== activeEventDate));
      resetActiveCellNumber();
    }

    return (
      <BottomWrapper>
        <button
          onClick={() => setMondayDate(currentWeekMonday)}
        >Today</button>

        {activeEventDate && <button
          ref={deleteRef}
          onClick={handleOnDeleteClick}
        >Delete</button>}
      </BottomWrapper>
    );
  };

export default Bottom;
