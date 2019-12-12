function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
configure("AaINbzFpL4VFJPWcXizDeBwrfLlcDxzumXroNS923afPeTEl8gubo6hzPOrtf6F/GghG4u9GUZs2QEKuvjiyQINOLHUKRUVkdxDUUlwzzGeSK4JI1yLYNdJbhqDrcBsHg1AkAJNHzsq2b/rhSC04cQY+hu8YHvjzNhiMGc7nNZ/dg50WuRgGpijUiO25KVHcvGKTfTfzlP6coFgSi246Ia3LKVaDbufMi8IpF2FJztmTQMLE9hPPOYIWtRqSpBtHgRoWoZuQVSB1U+PheAPZynM631LF3GeRYurO/8h25nEGbJdWRwy8dRrff4Y5mUX7unXp/AizQmUvB5VXbIECiJqy/6xDb5zjIPrBmrROr83kzrH622E9RIFmOVHI/6J9UdHVX3tyjBGZsbbWXYfifmBZYGpDQ2LdSkWHN3ce9DSr3PFyPhIvV+NcSLWWr7C6tgjrv0PFOgAe1AJQuzSjycWzTV8AY2ZnbyXfBIJOtsC5HE+gwG+1Iqsy5krnP90JLZL4FbrQ2Ipvssv2QyKksnvTWDSxBnUM0HPhuVEyyMWOvdGDz4HW86zdhG2PtRqKmEAJSBzegrqjy3WI8rk8YYQ5vxLspysAy6Oq8RO1jGco5IysuSu0Kw5ukGdHb+omEdr3RmyrdaVer58+7SkEo972hmQc4nlEZU/IvRdhwNNtjeXD0gKqFJHX+TlPjGFhEs2TJyDSwB6tfTK0ENXPDoOK8PnB5oRQp31TuWuRl92LCkilv7GWzOeGIBwvAOrYK9VCZpGgmN83W8pFRa2H+IDmTkVTEiYnTgGh/166LEZlej1Uqw7TgcL2efEF1mP7pkXURpvxKA==").catch(function (error) {
  alert(error);
});

var style = {
  margin: "auto",
  maxWidth: "1280px",
  maxHeight: "80%"
};

var BarcodePickerClass = function (_Component) {
  _inherits(BarcodePickerClass, _Component);

  function BarcodePickerClass(props) {
    _classCallCheck(this, BarcodePickerClass);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.ref = React.createRef();
    return _this;
  }

  BarcodePickerClass.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    ScanditSDKBarcodePicker.create(this.ref.current, this.props).then(function (barcodePicker) {
      _this2.barcodePicker = barcodePicker;
      if (_this2.props.onScan != null) {
        barcodePicker.on("scan", _this2.props.onScan);
      }
      if (_this2.props.onError != null) {
        barcodePicker.on("scanError", _this2.props.onError);
      }
    });
  };

  BarcodePickerClass.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  };

  BarcodePickerClass.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    // These are just some examples of how to react to some possible property changes

    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  };

  BarcodePickerClass.prototype.render = function render() {
    return React.createElement("div", { ref: this.ref, style: style });
  };

  return BarcodePickerClass;
}(Component);

BarcodePickerClass.propTypes = process.env.NODE_ENV !== "production" ? {
  visible: PropTypes.bool,
  playSoundOnScan: PropTypes.bool,
  vibrateOnScan: PropTypes.bool,
  scanningPaused: PropTypes.bool,
  guiStyle: PropTypes.string,
  videoFit: PropTypes.string,
  scanSettings: PropTypes.object,
  enableCameraSwitcher: PropTypes.bool,
  enableTorchToggle: PropTypes.bool,
  enableTapToFocus: PropTypes.bool,
  enablePinchToZoom: PropTypes.bool,
  accessCamera: PropTypes.bool,
  camera: PropTypes.object,
  cameraSettings: PropTypes.object,
  targetScanningFPS: PropTypes.number,
  onScan: PropTypes.func,
  onError: PropTypes.func
} : {};


export default BarcodePickerClass;