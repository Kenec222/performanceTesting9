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

import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";


const CONFIG = {
  mixins: [
    "UU5.Common.BaseMixin",
    "UU5.Common.ElementaryMixin",
    "UU5.Common.ContentMixin",
    "UU5.Common.NestingLevelMixin",
    "UU5.Common.PureRenderMixin"
  ],
  props: {
    position: {
      values: ["left", "center", "right"]
    },
    verticalPosition: {
      values: ["top", "bottom"]
    },
    alertPosition: {
      values: ["top", "bottom"]
    }
  },
  requiredProps: {},
  opt: {
    shallowOpt: {
      disableLifecycleMethods: false
    }
  }
};


describe(`UU5.Bricks.ProgressBus`, () => {
  UU5.Test.Tools.testProperties(UU5.Bricks.ProgressBus, CONFIG);
});












