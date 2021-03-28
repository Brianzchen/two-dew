// @flow
import * as React from 'react';
import { range } from 'lodash';

import { useGetListItems } from '@core/service';
import { Box } from '@pkgs/components';

import type { ListT } from '../..';
import AddItem from '../components/AddItem';
import ListItem from '../components/ListItem';

import Column from './Column';

type Props = {
  ...ListT,
};

const DailyTodo = ({
  id,
}: Props): React.Node => {
  const [items, setItems] = React.useState([]);

  const mapItemsToDays = range(0, 7).map((o) => {
    const dayItems = items.filter((i) => i.day === o);
    return {
      day: o,
      items: dayItems,
    };
  });

  useGetListItems(id, (newItems) => {
    setItems(newItems);
  });

  return (
    <Box
      style={{
        display: 'flex',
        overflow: 'auto',
      }}
    >
      {/** this range should change based on responsive design */}
      {mapItemsToDays.map((o) => (
        <Column
          key={o.day}
          day={o.day}
        >
          <AddItem
            listId={id}
            day={o.day}
          />
          {o.items.map((i) => (
            <ListItem
              key={i.id}
              {...i}
            />
          ))}
        </Column>
      ))}
    </Box>
  );
};

export default DailyTodo;
