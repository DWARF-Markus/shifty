import styled from 'styled-components';
import { COLORS } from '../styles/globals';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../utils/items';

const EmployeeCard = ({ brightMode, id, companyId, firstName, lastName, image, vacations }) => {

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      id,
      firstName,
      lastName,
      image,
      companyId,
      vacations
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <Wrapper brightMode={brightMode} isDragging={isDragging} ref={drag}>
      <img src={image ? image : require('../assets/icon-dot-orange.svg')} alt="shifty" style={{ width: '20px', height: '20px', objectFit: 'cover', borderRadius: '50%' }} />
      <p>{firstName} {lastName}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
  color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
  display: flex;
  margin: 5px;
  padding: 3px 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: .15s ease;
  box-shadow: none;
  border-radius: 5px;
  opacity: ${({ isDragging }) => isDragging ? '.7' : '.9'};

  ${props => props.brightMode && `
     background-color: ${props.isDragging ? 'white' : '#e9e9e9'}; 
  `};

  ${props => !props.brightMode && `
     background-color: ${props.isDragging ? '#484848' : '#252525'}; 
  `};

  &:hover {
    transform: scale(1.07);
    box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);
  }

  p {
    margin: 0 0 0 3px;
    white-space: pre;
  }

`;

export default EmployeeCard;