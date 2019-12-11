"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _scanditSdk = require("scandit-sdk");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Configure the library and activate it with a license key
(0, _scanditSdk.configure)("AQwtuhhpBl9MFixs4yOOt7UdpWJKRNo1KVls7r57JKx5QSYf0XsgZyR3TEnwRWxZJHSI9P0wc97xS2X+unGtwRJghGPhQZqEAnoghrwcIf3YLE7AaSuZddg0qMpMIcx+UA/OiBzOSrSwnwUEbxeDDYnTeYmp6DNK380aUpvkXbM/rRzQCk+TOSIww9XpObS4aPAIQSPAyz45D6fHy1elHi1+kHFcvqPR54Sd639OalxZ2huf7bGCGh2+1qKEb0HLEi8dcTNUqapTGi4MCe8coC1d9d1x0c0SBH8Mziw3QbnQPdhfZLzyIlozi3+8sT7wGvyrwjVfyd+lFd8HcLkpawcI27F+qkXv/yS8EAWQ295nQO+YfH5vnIueJ0/zkL5k5F5KcOzchjo9h+KZdEqWeXqRByA41UVwrix2oZrNK/V3UBwV7dArwNuO6pYR6fwVxGiJE3ZF2n5AZjxjHOXCH5Ja9fvyZrUPecb/HcRqkRiSwfS5hV5RpunGMF7HdtstDbZtkH1bVMnejg1/sYfYTGtiEozVAHTljFA64NdXURQagOfio9qYFpMiDxAiAah2JSv6y7trxmvBMFRRC0GgXMvsN4c4YpSXgrfjKvrpZA3CiFnuwhTakMmH3IOiBH3yEiD00yUBRchtLrZbS/oA3sILVQ7g7vYjRtxThRrXlHoFUsn0Qr69kiYvdKz6m3etB+zLP10YPlViCGtbfJ/BidUfnZhMw55KAszzs511sMgxYOB6fBbkhAzbs585HYQ5w04d6k4+BxYx2yxqCC2y+ZupnnwcWyYuWTnahUwQ4w==").catch(function (error) {
  alert(error);
});

var style = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  maxWidth: "1280px",
  maxHeight: "80%"
};

var BarcodePicker = function (_Component) {
  _inherits(BarcodePicker, _Component);

  function BarcodePicker(props) {
    _classCallCheck(this, BarcodePicker);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.ref = _react2.default.createRef();
    return _this;
  }

  BarcodePicker.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    _scanditSdk.BarcodePicker.create(this.ref.current, this.props).then(function (barcodePicker) {
      _this2.barcodePicker = barcodePicker;
      if (_this2.props.onScan != null) {
        barcodePicker.on("scan", _this2.props.onScan);
      }
      if (_this2.props.onError != null) {
        barcodePicker.on("scanError", _this2.props.onError);
      }
    });
  };

  BarcodePicker.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  };

  BarcodePicker.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    // These are just some examples of how to react to some possible property changes

    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  };

  BarcodePicker.prototype.render = function render() {
    return _react2.default.createElement("div", { ref: this.ref, style: style });
  };

  return BarcodePicker;
}(_react.Component);

BarcodePicker.propTypes = process.env.NODE_ENV !== "production" ? {
  visible: _propTypes2.default.bool,
  playSoundOnScan: _propTypes2.default.bool,
  vibrateOnScan: _propTypes2.default.bool,
  scanningPaused: _propTypes2.default.bool,
  guiStyle: _propTypes2.default.string,
  videoFit: _propTypes2.default.string,
  scanSettings: _propTypes2.default.object,
  enableCameraSwitcher: _propTypes2.default.bool,
  enableTorchToggle: _propTypes2.default.bool,
  enableTapToFocus: _propTypes2.default.bool,
  enablePinchToZoom: _propTypes2.default.bool,
  accessCamera: _propTypes2.default.bool,
  camera: _propTypes2.default.object,
  cameraSettings: _propTypes2.default.object,
  targetScanningFPS: _propTypes2.default.number,
  onScan: _propTypes2.default.func,
  onError: _propTypes2.default.func
} : {};
exports.default = BarcodePicker;
module.exports = exports["default"];