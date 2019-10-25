import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Container, Label } from './styles';
import BoardContext from '../Board/context';
//Modelo de cada card

export default function Cards( { data, index, listIndex }) {
  
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [ {isDragging}, dragRef ] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  // construindo a função drag permite os conteudos arrastáveis
  
  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targgetListIndex = listIndex;

      const draggedIndex = item.index;
      const targgetIndex = index;

      if (draggedIndex === targgetIndex && draggedListIndex) {
        return;

      }
    const targgetSize  = ref.current.getBoundingClientRect();
    const targgetCenter = (targgetSize.botton - targgetSize.top) /2;
    
    const draggedOffset = monitor.getClientOffset();
    const draggedTop = draggedOffset.y - targgetSize.top;

      if (draggedIndex < targgetIndex && draggedTop < targgetCenter){
        return
      } if (draggedIndex > targgetIndex && draggedTop > targgetCenter) {
        return
      }

      move(draggedListIndex, targgetListIndex, draggedIndex, targgetIndex);  
      
      item.index = targgetIndex;
      item.listIndex = targgetListIndex;

  }
  })

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
      { data.labels.map( label => <Label key={label} color={label} />)}
      </header>
      <p>{ data.content }</p>
      { data.user && <img src={data.user} alt=""/>}
    </Container>
  );
}
