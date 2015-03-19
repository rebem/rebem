'use strict';

import React from 'react';

const autobindExluded = [];
const dummyClass = React.createClass({ render: function() {} });

autobindExluded.push(...Object.getOwnPropertyNames(dummyClass.prototype));
autobindExluded.push(...Object.getOwnPropertyNames(React.Component.prototype));

export default autobindExluded;
