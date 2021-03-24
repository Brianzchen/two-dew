// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import routes from '@pkgs/routes';

const Join = (): React.Node => (
  <div>
    join
    <Link to={routes.login}>
      login
    </Link>
  </div>
);

export default Join;
