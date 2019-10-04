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
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import ns from "./forms-ns.js";

import AutocompleteTextInput from './internal/autocomplete-text-input.js';
import TextInputMixin from './mixins/text-input-mixin.js';
import Context from "./form-context.js";

import './text-icon.less';

export const TextIcon = Context.withContext(
  createReactClass({
    //@@viewOn:mixins
    mixins: [
      UU5.Common.BaseMixin,
      UU5.Common.PureRenderMixin,
      UU5.Common.ElementaryMixin,
      TextInputMixin
    ],
    //@@viewOff:mixins

    //@@viewOn:statics
    statics: {
      tagName: ns.name("TextIcon"),
      classNames: {
        main: ns.css("text-icon"),
        left: ns.css("text-icon-left"),
        right: ns.css("text-icon-right"),
      },
      errors: {
        validateError: 'Validated result is not object.'
      },
      lsi: () => (UU5.Environment.Lsi.Forms.message)
    },
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {
      value: PropTypes.string,
      password: PropTypes.bool,
      icon: PropTypes.string,
      iconPosition: PropTypes.oneOf(['left', 'right']),
      onClick: PropTypes.func,
      pattern: PropTypes.string,
      actionOnEnter: PropTypes.bool
    },
    //@@viewOff:propTypes

    //@@viewOn:getDefaultProps
    getDefaultProps: function () {
      return {
        value: '',
        password: false,
        icon: null,
        iconPosition: 'right',
        onClick: null,
        pattern: null,
        actionOnEnter: false
      };
    },
    //@@viewOff:getDefaultProps

    //@@viewOn:standardComponentLifeCycle
    componentWillMount() {
      if (this.props.onValidate && typeof this.props.onValidate === 'function') {
        this._validateOnChange({ value: this.state.value, event: null, component: this })
      }

      return this;
    },

    componentWillReceiveProps(nextProps) {
      if (nextProps.controlled) {
        if (this.props.onValidate && typeof this.props.onValidate === 'function') {
          this._validateOnChange({ value: nextProps.value, event: null, component: this }, true);
        } else {
          this.setFeedback(nextProps.feedback, nextProps.message, nextProps.value);
        }
      }
      return this;
    },

    //@@viewOff:standardComponentLifeCycle

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:overridingMethods
    // TODO: tohle je ještě otázka - je potřeba nastavit hodnotu z jiné komponenty (musí být validace) a z onChange (neměla by být validace)
    setValue_(value, setStateCallback) {
      if (this._checkRequired({ value })) {
        if (typeof this.props.onValidate === 'function') {
          this._validateOnChange({ value, event: null, component: this });
        } else {
          this.setInitial(null, value, setStateCallback);
        }
      }

      return this;
    },

    onBlurDefault_(opt) {
      if (this._checkRequired({ value: opt.value }) && !this.props.validateOnChange) {
        opt.required = this.props.required;
        let blurResult = this.getBlurFeedback(opt);
        this.setState({ foundAutocompleteItems: null });
        this._setFeedback(blurResult.feedback, blurResult.message, blurResult.value);
      }
    },

    onChangeDefault_(opt, setStateCallback) {
      if (this.props.validateOnChange) {
        this._validateOnChange(opt, false, setStateCallback);
      } else {
        let result = this.getChangeFeedback(opt);
        let callback = setStateCallback;
        if (!(opt._data && opt._data.closeOnCallback) && result.foundAutocompleteItems && result.foundAutocompleteItems.length > 0) {
          callback = () => this.open(setStateCallback);
        } else {
          callback = () => this.close(setStateCallback);
          this.focus();
        }
        this.setState({
          feedback: result.feedback,
          message: result.message,
          value: result.value,
          foundAutocompleteItems: result.foundAutocompleteItems,
          selectedIndex: result.selectedIndex
        }, callback);
      }

      return this;
    },

    reset_(setStateCallback) {
      let inputDOMNode = this._textInput && this._textInput.getInput();
      if (inputDOMNode) {
        inputDOMNode.value = "";
      }

      this.resetDefault(setStateCallback);
    },
    //@@viewOff:overridingMethods

    //@@viewOn:componentSpecificHelpers
    _validateOnChange(opt, checkValue, setStateCallback) {
      let _callCallback = typeof setStateCallback === "function";

      if (!checkValue || this._hasValueChanged(this.state.value, opt.value)) {
        let result = this.onValidate(opt);
        if (result) {
          if (typeof result === 'object') {
            if (result.feedback) {
              _callCallback = false;
              this.setFeedback(result.feedback, result.message, result.value, setStateCallback);
            } else {
              _callCallback = false;
              this.setState({ value: opt.value }, setStateCallback);
            }
          } else {
            this.showError('validateError', null, { context: { event: e, func: this.props.onValidate, result: result } });
          }
        }
      }

      if (_callCallback) {
        setStateCallback();
      }

      return this;
    },

    _onBlur(opt) {
      opt.component = this;

      if (typeof this.props.onBlur === 'function') {
        this.props.onBlur(opt);
      } else {
        this.onBlurDefault(opt);
      }
    },

    _onFocus(opt) {
      opt.component = this;

      if (typeof this.props.onFocus === 'function') {
        this.props.onFocus(opt);
      } else {
        this.onFocusDefault(opt);
      }
    },

    _onEnter(e) {
      if ((e.keyCode || e.which) === 13 && !e.shiftKey && !e.ctrlKey && typeof this.props.onClick === "function") {
        this.props.onClick({ value: this.state.value, component: this });
      }
    },

    _onIconClick() {
      if (typeof this.props.onClick === 'function') {
        this.props.onClick({ value: this.state.value, component: this });
      }
    },

    _getMainAttrs() {
      let attrs = this._getInputAttrs();
      attrs.className += ' ' + (this.props.iconPosition === 'left' ? this.getClassName().left : this.getClassName().right);
      return attrs;
    },

    _getInputProps(inputId) {
      let inputAttrs = this.props.inputAttrs || {};

      if (this.state.autocompleteItems) {
        inputAttrs = UU5.Common.Tools.merge({ autoComplete: "off" }, inputAttrs);
      }

      if (this.props.actionOnEnter) {
        inputAttrs.onKeyPress = this._onEnter;
      }

      inputAttrs.className === "" ? delete inputAttrs.className : null;

      let props = {
        id: inputId,
        name: this.props.name || inputId,
        value: this.state.value,
        placeholder: this.props.placeholder,
        type: this.props.password ? "password" : this.props.type || "text",
        onChange: !this.isReadOnly() && !this.isComputedDisabled() ? this.onChange : null,
        onFocus: !this.isReadOnly() && !this.isComputedDisabled() ? this._onFocus : null,
        onBlur: this._onBlur,
        onKeyDown: this.onKeyDown,
        mainAttrs: inputAttrs,
        disabled: this.isComputedDisabled(),
        readonly: this.isReadOnly(),
        loading: this.isLoading(),
        feedback: this.getFeedback(),
        ref_: (item) => this._textInput = item,
        borderRadius: this.props.borderRadius,
        elevation: this.props.elevation,
        bgStyle: this.props.bgStyle,
        inputWidth: this._getInputWidth(),
        colorSchema: this.props.colorSchema,
        icon: this.props.icon,
        iconOnClick: this._onIconClick,
        clickable: typeof this.props.onClick === "function"
      };

      if (this.state.autocompleteItems) {
        props = {
          ...props,
          ...{
            itemsListItems: this.state.autocompleteItems,
            foundItemListItems: this.state.autocompleteItems ? this._getChildren() : undefined,
            itemListProps: this.state.autocompleteItems ? this._getItemListProps() : undefined,
            open: this.isOpen(),
            onClose: this.close,
            onOpen: this.open
          }
        };
      }

      return props;
    },

    _getInput(inputId) {
      return <AutocompleteTextInput {...this._getInputProps(inputId)} />;
    },
    //@@viewOff:componentSpecificHelpers

    //@@viewOn:render
    render() {
      let inputId = this.getId() + "-input";

      return (
        <div {...this._getMainAttrs()}>
          {this.getLabel(inputId)}
          {this.getInputWrapper(this._getInput(inputId))}
        </div>
      );
    }
    //@@viewOn:render
  })
);

export default TextIcon;
