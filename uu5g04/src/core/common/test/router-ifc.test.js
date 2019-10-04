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
import ReactDOM from "react-dom";
import "uu5g04-bricks";
import "uu5g04-forms";

const { mount, shallow, wait } = UU5.Test.Tools;

let RouteComponent = createReactClass({
  mixins: [
    UU5.Common.BaseMixin,
    UU5.Common.ElementaryMixin,
    UU5.Common.RouteMixin
  ],
  render() {
    return (
      <UU5.Bricks.Div>
        {this.props.content || this.props.children}
        {Object.keys(this.props.params || {}).length > 0 && <div>Params: <pre>{JSON.stringify(this.props.params)}</pre></div>}
      </UU5.Bricks.Div>
    );
  }
});

let NotFoundRoute = createReactClass({
  mixins: [
    UU5.Common.BaseMixin,
    UU5.Common.ElementaryMixin,
    UU5.Common.RouteMixin
  ],
  render() {
    let { requestedRoute } = this.props.params || {};
    let useCase = (requestedRoute && requestedRoute.useCase) || requestedRoute;
    return (
      <UU5.Common.Error content={`Route "${useCase}" not found.`} />
    );
  }
});

let routes = {
  "home": { component: <RouteComponent content="home" /> }
};


describe('UU5.Common.Router - Internal Interface test', () => {


  it('setRoute()', () => {
    const wrapper = shallow(
      <UU5.Common.Router
        basePath="/vendor-app-subapp/tid-awid"
        notFoundRoute={<NotFoundRoute />}
        routes={<RouteComponent content={"home"}/>}
        urlBuilder={UU5.Common.Url}
        route={<RouteComponent content="initial route" />}
      />
    );
    const setStateCallBack = jest.fn();
    expect(wrapper).toMatchSnapshot();
    const returnValue = UU5.Environment.setRoute({
      component: <RouteComponent content="component, UC direct, no history"/>,
      noHistory: true
    }, null, setStateCallBack);
    expect(() => {
      returnValue
    }).not.toThrow();
    wrapper.update();
    expect(setStateCallBack).toBeCalled();
    expect(setStateCallBack).toHaveBeenCalledTimes(1);
    expect(returnValue).toBe(wrapper.instance());
    expect(wrapper).toMatchSnapshot();
  });

  /**
   * Verification that the method was performed is done through not.toThrow ().
   * It is tested that the method was successfully dialed and the exception was not dropped. Calling ifc does not end in error.
   * ScrollToFragment, preventPageLeave, allowPageLeave would best be tested with Selenium when it can be verified that the modal is open and below.
   */

  it('scrollToFragment()', () => {
    const wrapper = shallow(
      <UU5.Common.Router
        id={"uuID01"}
        basePath="/vendor-app-subapp/tid-awid"
        notFoundRoute={<NotFoundRoute />}
        routes={routes}
        urlBuilder={UU5.Common.Url}
        route={<RouteComponent content="initial route" />}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(() => {UU5.Environment.getRouter().scrollToFragment(1000, 50)}).not.toThrow();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    //console.log(wrapper.debug());
  });

  /**
   * Verification that the method was performed is done through not.toThrow ().
   * It is tested that the method was successfully dialed and the exception was not dropped. Calling ifc does not end in error.
   * ScrollToFragment, preventPageLeave, allowPageLeave would best be tested with Selenium when it can be verified that the modal is open and below.
   */

  it('preventPageLeave()', () => {
    const wrapper = shallow(
      <UU5.Common.Router
        id={"uuID01"}
        basePath="/vendor-app-subapp/tid-awid"
        notFoundRoute={<NotFoundRoute />}
        routes={routes}
        urlBuilder={UU5.Common.Url}
        route={<RouteComponent content="initial route" />}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(() => {UU5.Environment.getRouter().preventPageLeave((callback) => {
      return {
        header: "Test",
        content: (
          <UU5.Bricks.Div>
            Are you sure?
            <UU5.Bricks.Button onClick={() => callback(true)}>Yes</UU5.Bricks.Button>
            <UU5.Bricks.Button onClick={() => callback(false)}>No</UU5.Bricks.Button>
          </UU5.Bricks.Div>
        )
      };
    })}).not.toThrow();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  /**
   * Verification that the method was performed is done through not.toThrow ().
   * It is tested that the method was successfully dialed and the exception was not dropped. Calling ifc does not end in error.
   * ScrollToFragment, preventPageLeave, allowPageLeave would best be tested with Selenium when it can be verified that the modal is open and below.
   */

  it('allowPageLeave()', () => {
    const wrapper = shallow(
      <UU5.Common.Router
        id={"uuID01"}
        basePath="/vendor-app-subapp/tid-awid"
        notFoundRoute={<NotFoundRoute />}
        routes={routes}
        urlBuilder={UU5.Common.Url}
        route={<RouteComponent content="initial route" />}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(() => {UU5.Environment.getRouter().allowPageLeave()}).not.toThrow();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

});
