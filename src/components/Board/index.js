import React, { useState } from 'react';
import { loadLists } from '../../components/services/api';
import List from '../List';
import { Container } from './styles';
import BoardContext from './context';
import produce from 'immer';

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  function move(fromList, toList, from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);

      
    }))

  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
        <Container>
          {lists.map( (list, index) => <List key={ lists.title } index={ index } data={ list } />)}
        </Container>
    </BoardContext.Provider>
  );
}