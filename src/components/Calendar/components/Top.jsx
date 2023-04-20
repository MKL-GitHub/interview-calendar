import styled from "styled-components";

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 147px;
  padding-left: 58px;
  padding-right: 28px;
`;

const Title = styled.div`
  color: var(--black-1);
  font-size: 40px;
  font-weight: 300;
  letter-spacing: -3px;
  white-space: nowrap;
`;

const Plus = styled.button`
  width: 58px;
  height: 58px;
  padding: 14px;
  border-radius: 50%;
  cursor: pointer;

  &>img {
    filter: var(--red-1-filter);
  }
`;

const Top = ({ showEventTimeInput, plusRef }) => {
  return (
    <TopWrapper>
      <Title>Interview Calendar</Title>
      <Plus
        ref={plusRef}
        onClick={showEventTimeInput}
      ><img src="/svg/plus.svg" /></Plus>
    </TopWrapper>
  );
};

export default Top;