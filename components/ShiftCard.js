import styled from 'styled-components';
import { COLORS, BP } from '../styles/globals';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/items';

const ShiftCard = ({ shift }) => {

  const handleEmployeeDrop = async (item) => {
    await fetch('/api/addusertoshift', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        data: {
          shiftId: parseInt(shift.id),
          employeeId: parseInt(item.id)
        }
      })
    })
      .then(res => res.json())
    // console.log('employee ID: ', item.id);
    // console.log('shift ID: ', shiftId);
  }

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => handleEmployeeDrop(item),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  return (
    <Wrapper isOver={isOver} ref={drop}>
      <p>{format(new Date(shift.startTime), 'HH:mm')} <FontAwesomeIcon icon={faLongArrowAltRight} /> {format(new Date(shift.endTime), 'HH:mm')}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  position: relative;
  margin: .3rem;
  height: 5rem;
  border-radius: 5px;
  border-left: 5px solid ${COLORS.green};
  background-color: ${({ isOver }) => isOver ? COLORS.orange : COLORS.lightGray};
  color: ${({ isOver }) => isOver ? COLORS.white : COLORS.black};
  opacity: ${({ isOver }) => isOver ? '0.7' : '1'};
  transition: .2s ease;
  text-align: center;
  cursor: pointer;

  p {
    position: absolute;
    text-align: right;
    right: 3px;
    top: 0px;
    margin-top: 1px;
    width: 100%;
    font-size: 7px;
  }

  &:hover {
    background-color: ${COLORS.darkGray};
    color: ${COLORS.black};
  }

  @media (min-width: ${BP.small}) {
    p {
      font-size: 12px;
    }
  }
`;

export default ShiftCard;