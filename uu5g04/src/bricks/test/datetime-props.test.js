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

const MyDateTimeComponent = createReactClass({

  getInitialState: () => {
    return {
      isCalled: false
    };
  },

  onChangeAlert(event) {
    alert("onChange Alert in dateTimeComponent");
    this.setState({isCalled: true})
  },

  render() {
    return (
      <UU5.Bricks.DateTime id={"uuID"} onChange={this.onChangeAlert}/>
    );
  }
});

const CONFIG = {
  mixins: [
    "UU5.Common.BaseMixin",
    "UU5.Common.ElementaryMixin",
    "UU5.Common.NestingLevelMixin",
    "UU5.Common.PureRenderMixin"
  ],

  /**
   * If we use the props value in CONFIG that enters the testTool API, each slide would then be different as each time
   * a new date is generated every time we start it, even if it is fixed in the props.
   * props value is tested separed
   */
  props: {
    //value -  props value is tested separed
    format: {
      values: ["d. m. Y HH:MM:SS Z (w/52) q/4"]
    },
    country: {
      values: ["en-us"]
    },
    timeZone: {
      values: [-3.5]
    },
    //onChange{},
    dateOnly: {
      values: [true, false]
    },
    timeOnly: {
      values: [true, false]
    },
    secondsDisabled: {
      values: [true, false]
    }
  },
  requiredProps: {
    //Here we must have the value set in the requiredProps otherwise,
    // a new date would be created in every snapshot, and snapshots would vary.
    value: "2018-1-25 14:04:19"
  },
  opt: {
    shallowOpt: {
      disableLifecycleMethods: false
    }
  }
};

const ISOFormatTest = (props, country, expectedValue) => {
  const wrapper = mount(<UU5.Bricks.DateTime {...props} country={country} />);

  expect(wrapper.find(".uu5-bricks-date-time").text()).toBe(expectedValue);
};

describe(`UU5.Bricks.DateTime`, () => {
  UU5.Test.Tools.testProperties(UU5.Bricks.DateTime, CONFIG);

  //Separately test value.
  it(`UU5.Bricks.DateTime - props value`, () => {
    const wrapper = shallow(
      <UU5.Bricks.DateTime id={"uuID"} value={"2018-3-1 21:29:51"}/>
    );
    expect(wrapper.instance().props.value).toMatch(/2018-3-1 21:29:51/);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({value: '2019-3-1 21:29:51'});
    wrapper.update();
    expect(wrapper.instance().props.value).toMatch(/2019-3-1 21:29:51/);
    expect(wrapper).toMatchSnapshot();
  });

  it(`UU5.Bricks.DateTime - ISO format value`, () => {
    let defaultCountry = "en-US";
    ISOFormatTest({ value: "2019-07-20T07:00:00.000Z" }, defaultCountry, "7/20/2019, 9:00:00 AM");
    ISOFormatTest({ value: "2019-07-20T07:00:00.000+02:00" }, defaultCountry, "7/20/2019, 7:00:00 AM");
    ISOFormatTest({ value: "2019-07-20T07:00:00.000+02:00" }, "cs-CZ", "2019-7-20 7:00:00 AM"); // this might be wrong
    ISOFormatTest({ value: "2019-07-20T07:00:00.000+02:00", dateOnly: true }, defaultCountry, "7/20/2019");
    ISOFormatTest({ value: "2019-07-20T07:00:00.000+02:00", timeOnly: true }, defaultCountry, "7:00:00 AM");
    ISOFormatTest({ value: "2019-07-20T07:00:00.000+02:00", timeZone: -2 }, defaultCountry, "7/20/2019, 3:00:00 AM");
  });
});

describe(`UU5.Bricks.DateTime props function`, () => {

  it('onClose() - window.alert.onClose()', () => {
    window.alert = jest.fn();
    const wrapper = shallow(
      <MyDateTimeComponent/>
    );
    expect(wrapper.state().isCalled).toBeFalsy();
    wrapper.simulate('change');
    expect(window.alert).toBeCalled();
    expect(window.alert).toHaveBeenCalledWith('onChange Alert in dateTimeComponent');
    expect(wrapper.state().isCalled).toBeTruthy();
    expect(window.alert.mock.calls[0][0]).toEqual("onChange Alert in dateTimeComponent");
  });

});
