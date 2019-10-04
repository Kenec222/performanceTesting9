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

const { mount, shallow, wait } = UU5.Test.Tools;

const CONFIG = {
  mixins: [
    "UU5.Common.BaseMixin",
    "UU5.Common.ElementaryMixin",
    "UU5.Common.ContentMixin",
    "UU5.Common.PureRenderMixin"
  ],
  props: {
    language: {
      values: ["en", "cs"]
    }
  },
  requiredProps: {
    language: "en-us",
    parent: shallow(<UU5.Bricks.Lsi id="parentId" lsi={{
      cs: 'cs, sk -> (cs) Při neznámém jazyku se zobrazí první v lsi',
      sk: 'cs, sk -> (sk) Pri neznámom jazyku sa zobrazí prvý v lsi'
    }}/>).instance()
  },
  opt: {
    shallowOpt: {
      disableLifecycleMethods: false
    }
  }
};

describe(`UU5.Bricks.Lsi.Item props`, () => {
  UU5.Test.Tools.testProperties(UU5.Bricks.Lsi.Item, CONFIG);
});

describe(`UU5.Bricks.Lsi.Item docKit example`, () => {
  it(`UU5.Bricks.Lsi.Item example01`, () => {
    const wrapper = shallow(
      <UU5.Bricks.Container id={"uuID0"}>
        <UU5.Bricks.Lsi.Item id={"uuID1"} language="cs">
          Item: cs, en, sk - (cs) Při neznámém jazyku se zobrazí Environment.defaultLanguage en
        </UU5.Bricks.Lsi.Item>
        <UU5.Bricks.Lsi.Item
          id={"uuID2"}
          language="en"
          content="Item: cs, en, sk -> (en) When an unknown language is displayed Environment.defaultLanguage en"
        />
      </UU5.Bricks.Container>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
