// @flow
import * as React from 'react';

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
    <>
      {renderedLists.map(({ data }, i) => (
        // Renders lists downwards
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
        >
          {data.map((listName, j) => {
            const Dropdown = () => (
              <div>
                <select
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
              </div>
            );

            return (
              // Renders lists sideways
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={j}
              >
                {!listName
                  ? (
                    <Dropdown />
                  )
                  : (
                    <div>
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
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Layout;
