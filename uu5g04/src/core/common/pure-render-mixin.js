/**
 * Copyright (C) 2019 Unicorn a.s.
 * 
 * This program is free software; you can use it under the terms of the UAF Open License v01 or
 * any later version. The text of the license is available in the file LICENSE or at www.unicorn.com.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See LICENSE for more details.
 * 
 * You may contact Unicorn a.s. at address: V Kapslovne 2767/2, Praha 3, Czech Republic or
 * at the email: info@unicorn.com.
 */

import React from 'react';
import PropTypes from 'prop-types';

export const PureRenderMixin = {

  //@@viewOn:statics
  statics: {
    "UU5.Common.PureRenderMixin": {
      requiredMixins: ["UU5.Common.BaseMixin"]
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    pureRender: PropTypes.bool
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      pureRender: false
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:standardComponentLifeCycle
  getInitialState() {
    // initialize
    this.registerMixin("UU5.Common.PureRenderMixin");
    // state
    return {};
  },

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate;
    if (!this.props.pureRender && !this.getOpt("pureRender")) {
      shouldUpdate = true;
    } else if (typeof this.shouldComponentUpdate_ === 'function') {
      shouldUpdate = this.shouldComponentUpdate_(nextProps, nextState);
    } else {
      shouldUpdate = this.shouldComponentUpdateDefault(nextProps, nextState);
    }
    return shouldUpdate;
  },

  shouldComponentUpdateDefault(nextProps, nextState) {
    return this.shouldRender(nextProps, nextState);
  },
  //@@viewOff:standardComponentLifeCycle

  //@@viewOn:interface
  hasUU5CommonPureRenderMixin() {
    return this.hasMixin("UU5.Common.PureRenderMixin");
  },

  getUU5CommonPureRenderMixinProps() {
    return {
      pureRender: this.props.pureRender
    };
  },

  getUU5CommonPureRenderMixinPropsToPass() {
    return this.getUU5CommonPureRenderMixinProps();
  },
  //@@viewOff:interface

  //@@viewOn:overridingMethods
  //@@viewOff:overridingMethods

  //@@viewOn:componentSpecificHelpers
  //@@viewOff:componentSpecificHelpers
};

export default PureRenderMixin;