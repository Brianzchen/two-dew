// @flow
import * as React from 'react';

import { Box } from '@pkgs/components';

import type { ListT, LayoutT } from '..';
import DailyTodo from './DailyTodo';
import ListTodo from './ListTodo';

type Props = {
  lists: Array<ListT>,
  renderedLists: LayoutT,
  setRenderedLists: ((LayoutT) => LayoutT) => void,
};

const Layout = ({
  lists,
  renderedLists,
  setRenderedLists,
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
                            <DailyTodo
                              {...list}
                            />
                          );
                        }
                        if (list?.type === 'list') {
                          return (
                            <ListTodo
                              {...list}
                            />
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
