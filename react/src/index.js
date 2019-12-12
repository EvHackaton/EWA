import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
configure("AaINbzFpL4VFJPWcXizDeBwrfLlcDxzumXroNS923afPeTEl8gubo6hzPOrtf6F/GghG4u9GUZs2QEKuvjiyQINOLHUKRUVkdxDUUlwzzGeSK4JI1yLYNdJbhqDrcBsHg1AkAJNHzsq2b/rhSC04cQY+hu8YHvjzNhiMGc7nNZ/dg50WuRgGpijUiO25KVHcvGKTfTfzlP6coFgSi246Ia3LKVaDbufMi8IpF2FJztmTQMLE9hPPOYIWtRqSpBtHgRoWoZuQVSB1U+PheAPZynM631LF3GeRYurO/8h25nEGbJdWRwy8dRrff4Y5mUX7unXp/AizQmUvB5VXbIECiJqy/6xDb5zjIPrBmrROr83kzrH622E9RIFmOVHI/6J9UdHVX3tyjBGZsbbWXYfifmBZYGpDQ2LdSkWHN3ce9DSr3PFyPhIvV+NcSLWWr7C6tgjrv0PFOgAe1AJQuzSjycWzTV8AY2ZnbyXfBIJOtsC5HE+gwG+1Iqsy5krnP90JLZL4FbrQ2Ipvssv2QyKksnvTWDSxBnUM0HPhuVEyyMWOvdGDz4HW86zdhG2PtRqKmEAJSBzegrqjy3WI8rk8YYQ5vxLspysAy6Oq8RO1jGco5IysuSu0Kw5ukGdHb+omEdr3RmyrdaVer58+7SkEo972hmQc4nlEZU/IvRdhwNNtjeXD0gKqFJHX+TlPjGFhEs2TJyDSwB6tfTK0ENXPDoOK8PnB5oRQp31TuWuRl92LCkilv7GWzOeGIBwvAOrYK9VCZpGgmN83W8pFRa2H+IDmTkVTEiYnTgGh/166LEZlej1Uqw7TgcL2efEF1mP7pkXURpvxKA==").catch(error => {
  alert(error);
});

const style = {
  margin: "auto",
  maxWidth: "1280px",
  maxHeight: "80%"
};

class BarcodePickerClass extends Component {
  static propTypes = {
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
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    ScanditSDKBarcodePicker.create(this.ref.current, this.props).then(barcodePicker => {
      this.barcodePicker = barcodePicker;
      if (this.props.onScan != null) {
        barcodePicker.on("scan", this.props.onScan);
      }
      if (this.props.onError != null) {
        barcodePicker.on("scanError", this.props.onError);
      }
    });
  }

  componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    // These are just some examples of how to react to some possible property changes

    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  }

  render() {
    return <div ref={this.ref} style={style} />;
  }
}

export default BarcodePickerClass;
