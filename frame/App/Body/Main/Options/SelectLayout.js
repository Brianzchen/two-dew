// @flow
import * as React from 'react';
import { range } from 'lodash';

import { ClickAwayListener } from '@pkgs/components';

import type { LayoutT } from '..';

type Props = {
  setRenderedLists: (LayoutT) => void,
};

const SelectLayout = ({
  setRenderedLists,
}: Props): React.Node => {
  const [showLayouts, setShowLayouts] = React.useState(false);

  const updateLayout = (rows: number, cols: number) => {
    const newLayout = range(0, rows).map(() => ({
      data: range(0, cols).map((() => '')),
    }));
    setRenderedLists(newLayout);
    setShowLayouts(false);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setShowLayouts(false);
      }}
    >
      <div>
        <button
          type="button"
          onClick={() => {
            setShowLayouts(true);
          }}
        >
          select layout
        </button>
        {showLayouts && (
          <div>
            <button
              type="button"
              onClick={() => {
                updateLayout(1, 1);
              }}
            >
              {'[[\'\']]'}
            </button>
            <button
              type="button"
              onClick={() => {
                updateLayout(1, 2);
              }}
            >
              {'[[\'\', \'\']]'}
            </button>
            <button
              type="button"
              onClick={() => {
                updateLayout(2, 1);
              }}
            >
              {'[[\'\'], [\'\']]'}
            </button>
            <button
              type="button"
              onClick={() => {
                setRenderedLists([
                  {
                    data: [''],
                  },
                  {
                    data: ['', ''],
                  },
                ]);
              }}
            >
              {'[[\'\'], [\'\', \'\']]'}
            </button>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default SelectLayout;
