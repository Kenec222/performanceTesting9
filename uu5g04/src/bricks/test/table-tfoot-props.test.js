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
import createReactClass from "create-react-class";

const { mount, shallow, wait } = UU5.Test.Tools;

const MyAllowTagsComponents = createReactClass({
  mixins: [UU5.Common.BaseMixin],
  statics: {tagName: "UU5.Example.MyCompButton", classNames: {main: "mytr"}},
  render() {
    return (
      <UU5.Example.MyCompButton {...this.getMainPropsToPass()}/>
    );
  }
});


const CONFIG = {
  mixins: [
    "UU5.Common.BaseMixin",
    "UU5.Common.ElementaryMixin",
    "UU5.Common.ContentMixin",
    "UU5.Common.ColorSchemaMixin",
    "UU5.Common.NestingLevelMixin",
    "UU5.Common.PureRenderMixin"
  ],
  props: {
    allowTags: {
      allowTagsArray: ["UU5.Example.MyCompButton"]
    },
  },
  requiredProps: {
    parent: shallow(<UU5.Bricks.Table id="parentId"/>).instance()
  },
  opt: {
    shallowOpt: {
      disableLifecycleMethods: false
    }
  }
};

describe(`UU5.Bricks.Table.TFoot`, () => {
  UU5.Test.Tools.testProperties(UU5.Bricks.Table.TFoot, CONFIG);

  it('props.allowTags example', () => {
    const wrapper = shallow(
      <UU5.Bricks.Table header='Table' footer='Table footer' id={"uuID1"}>
        <UU5.Bricks.Table.TBody id={"uuID2"} colorSchema="blue">
          <UU5.Bricks.Table.Tr id={"uuID3"}>
            <UU5.Bricks.Table.Td id={"uuID4"} content='Rimmer'/>
            <UU5.Bricks.Table.Td id={"uuID5"} content='2nd class technician'/>
            <UU5.Bricks.Table.Td id={"uuID6"} content='comical'/>
          </UU5.Bricks.Table.Tr>
        </UU5.Bricks.Table.TBody>
        <UU5.Bricks.Table.TFoot colorSchema='danger' id={"uuID7"} allowTags={["UU5.Example.MyCompButton"]}>
          <UU5.Bricks.Table.Tr id={"uuID8"}>
            <UU5.Bricks.Table.Th id={"uuID9"} content='Best rank'/>
            <UU5.Bricks.Table.Td id={"uuID10"} content='1st console officer'/>
            <MyAllowTagsComponents id={"allowID"}/>
          </UU5.Bricks.Table.Tr>
        </UU5.Bricks.Table.TFoot>
      </UU5.Bricks.Table>
    );
    expect(wrapper).toMatchSnapshot();
  });

});
