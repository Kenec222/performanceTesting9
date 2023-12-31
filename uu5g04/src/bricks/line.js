/**
 * Copyright (C) 2021 Unicorn a.s.
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public
 * License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License at
 * <https://gnu.org/licenses/> for more details.
 *
 * You may obtain additional information at <https://unicorn.com> or contact Unicorn a.s. at address: V Kapslovne 2767/2,
 * Praha 3, Czech Republic or at the email: info@unicorn.com.
 */

//@@viewOn:imports
import * as UU5 from "uu5g04";
import ns from "./bricks-ns.js";

import "./line.less";
import Css from "./internal/css";

const LineEditable = UU5.Common.Component.lazy(async () => {
  await SystemJS.import("uu5g04-forms");
  await SystemJS.import("uu5g04-bricks-editable");
  return import("./internal/line-editable.js");
});
//@@viewOff:imports

export const Line = UU5.Common.VisualComponent.create({
  displayName: "Line", // for backward compatibility (test snapshots)
  //@@viewOn:mixins
  mixins: [
    UU5.Common.BaseMixin,
    UU5.Common.PureRenderMixin,
    UU5.Common.ElementaryMixin,
    UU5.Common.ColorSchemaMixin,
    UU5.Common.NestingLevelMixin,
    UU5.Common.EditableMixin,
  ],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: ns.name("Line"),
    nestingLevel: "smallBox",
    classNames: {
      main: ns.css("line uu5-common-bg"),
      size: ns.css("line-size-"),
      vertical: (props) => {
        let className = ns.css("line-vertical");

        if (typeof props.vertical === "number" || typeof props.vertical === "string") {
          className += " " + Css.css`height: ${UU5.Common.Tools.fillUnit(props.vertical)};`;
        }

        return className;
      },
    },
    defaults: {
      sizes: ["s", "m", "l", "xl"],
    },
    editMode: {},
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    size: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.string,
    vertical: UU5.PropTypes.oneOfType([UU5.PropTypes.bool, UU5.PropTypes.number, UU5.PropTypes.string]),
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      size: "m",
      borderRadius: null,
      vertical: false,
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  onBeforeForceEndEditation_() {
    return this._editableComponent ? this._editableComponent.getPropsToSave() : undefined;
  },
  //@@viewOff:overriding

  //@@viewOn:private
  _registerEditableComponent(ref) {
    this._editableComponent = ref;
  },

  _renderEditationMode() {
    return (
      <UU5.Common.Suspense fallback={this.getEditingLoading()}>
        <LineEditable component={this} ref_={this._registerEditableComponent} />
      </UU5.Common.Suspense>
    );
  },

  _buildMainAttrs() {
    let mainAttrs = this.getMainAttrs();
    let size = this.props.size;
    if (this.props.vertical) {
      mainAttrs.className += " " + this.getClassName("vertical");
    }

    if (this.getDefault().sizes.includes(size)) {
      mainAttrs.className += " " + this.getClassName().size + size;
    } else {
      if (typeof size === "number") {
        size = size + "px";
      }
      mainAttrs.style = { ...mainAttrs.style, ...(this.props.vertical ? { width: size } : { height: size }) };
    }

    if (this.props.borderRadius) {
      mainAttrs.style = { ...mainAttrs.style, ...{ borderRadius: this.props.borderRadius } };
    }
    return mainAttrs;
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <>
        {this.isInlineEdited() && this._renderEditationMode()}
        {this.getNestingLevel() ? <div {...this._buildMainAttrs()}>{this.getDisabledCover()}</div> : null}
      </>
    );
  },
  //@@viewOff:render
});

export default Line;
