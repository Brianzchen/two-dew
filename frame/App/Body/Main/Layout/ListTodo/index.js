// @flow
import * as React from 'react';

import { useGetListItems } from '@core/service';
import type { ListT } from '@core/types';

import Box from '@pkgs/components/Box';
import Modal from '@pkgs/components/Modal';

import AddItem from '../components/AddItem';
import ListItem from '../components/ListItem';

type Props = {
  ...ListT,
};

const ListTodo = ({
  id,
}: Props): React.Node => {
  const [showCompleted, setShowCompleted] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  useGetListItems(id, (newItems) => {
    setItems(newItems);
  }, { completed: showCompleted });

  return (
    <div>
      <div>
        <input
          value={showCompleted}
          onChange={() => {
            setShowCompleted((pShowCompleted) => !pShowCompleted);
          }}
          type="checkbox"
        />
        show completed
      </div>
      <Box>
        <button type="button" onClick={() => { setOpenModal(!openModal); }}>Add New List Item</button>
        <Modal open={openModal}>
          <AddItem
            listId={id}
          />
        </Modal>
      </Box>
      {items.map((o) => (
        <ListItem
          key={o.id}
          {...o}
          listId={id}
        />
      ))}
    </div>
  );
};

export default ListTodo;
