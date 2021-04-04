// @flow
import * as React from 'react';

import type { ListT } from '@core/types';
import { Box } from '@pkgs/components';

import type { LayoutT } from '..';
import DailyTodo from './DailyTodo';
import DeleteList from './DeleteList';
import ListTodo from './ListTodo';

type Props = {
  lists: Array<ListT>,
  renderedLists: LayoutT,
  setRenderedLists: ((LayoutT) => LayoutT) => void,
  onListDeletion: (listId: string) => void,
};

const Layout = ({
  lists,
  renderedLists,
  setRenderedLists,
  onListDeletion,
}: Props): React.Node => {
  const updateLayoutList = (posY, posX, newName) => {
    setRenderedLists((pRenderedLists) => (
      pRenderedLists.map((list, index) => {
        if (index === posY) {
          const newData = list.data.map((name, j) => {
            if (j === posX) {
              return newName;
            }
            return name;
          });
          return { data: newData };
        }
        return list;
      })
    ));
  };

  return (
    <Box
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {renderedLists.map(({ data }, i) => (
        // Renders lists downwards
        <Box
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          style={{
            flex: 1,
            display: 'flex',
          }}
        >
          {data.map((listName, j) => {
            const Dropdown = () => (
              <select
                value={listName ?? ''}
                onChange={(event) => {
                  const name = event.currentTarget.value;
                  updateLayoutList(i, j, name);
                }}
              >
                <option defaultValue>
                  {''}
                </option>
                {lists.map((o) => (
                  <option key={o.name}>
                    {o.name}
                  </option>
                ))}
              </select>
            );

            return (
              // Renders lists sideways
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={j}
                style={{
                  flex: 1,
                  maxWidth: '100%',
                }}
              >
                {!listName
                  ? (
                    <Dropdown />
                  )
                  : (
                    <>
                      <Dropdown />
                      {(() => {
                        const list = lists.find((o) => o.name === listName);

                        if (list?.type === 'daily') {
                          return (
                            <>
                              <DeleteList
                                listId={list.id}
                                onListDeletion={onListDeletion}
                              />
                              <DailyTodo
                                {...list}
                              />
                            </>
                          );
                        }
                        if (list?.type === 'list') {
                          return (
                            <>
                              <DeleteList
                                listId={list.id}
                                onListDeletion={onListDeletion}
                              />
                              <ListTodo
                                {...list}
                              />
                            </>
                          );
                        }

                        return null;
                      })()}
                    </>
                  )}
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export default Layout;
