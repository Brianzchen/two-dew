// @flow
import * as React from 'react';

import { useGetListItems } from '@core/service';
import { Box, Button } from '@pkgs/components';
import type { ListT } from '@core/types';

import Modal from '@pkgs/components/Modal';

import AddItem from '../components/AddItem';
import ListItem from '../components/ListItem';
import Column from '../Column';

type Props = {
  ...ListT,
  onListDeletion: (listId: string) => void,
};

const ListTodo = ({
  id,
  name,
  onListDeletion,
}: Props): React.Node => {
  const [showCompleted, setShowCompleted] = React.useState(false);
  const [showFlagged, setShowFlagged] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);

  useGetListItems(id, (newItems) => {
    setItems(newItems);
  }, {
    completed: showCompleted,
    flagged: showFlagged,
  });

  return (
    <div>
      <Button onClick={() => { setOpenModal(!openModal); }}>
        Add New List Item
      </Button>
      <Modal open={openModal}>
        <Box>
          <AddItem
            listId={id}
          />
          <Button
            onClick={() => setOpenModal(false)}
            style={{
              color: '#C35050',
              float: 'right',
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
      <Box
        style={{
          display: 'flex',
          overflow: 'auto',
        }}
      >
        {/** this range should change based on responsive design */}
        <Column
          title={name}
          showCompleted={showCompleted}
          setShowCompleted={setShowCompleted}
          listId={id}
          onListDeletion={onListDeletion}
          showFlagged={showFlagged}
          setShowFlagged={setShowFlagged}
        >
          <AddItem
            listId={id}
          />
          {items.map((i) => (
            <ListItem
              key={i.id}
              listId={id}
              {...i}
            />
          ))}
        </Column>
      </Box>
    </div>
  );
};

export default ListTodo;
