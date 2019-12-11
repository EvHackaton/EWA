import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
configure("AQwtuhhpBl9MFixs4yOOt7UdpWJKRNo1KVls7r57JKx5QSYf0XsgZyR3TEnwRWxZJHSI9P0wc97xS2X+unGtwRJghGPhQZqEAnoghrwcIf3YLE7AaSuZddg0qMpMIcx+UA/OiBzOSrSwnwUEbxeDDYnTeYmp6DNK380aUpvkXbM/rRzQCk+TOSIww9XpObS4aPAIQSPAyz45D6fHy1elHi1+kHFcvqPR54Sd639OalxZ2huf7bGCGh2+1qKEb0HLEi8dcTNUqapTGi4MCe8coC1d9d1x0c0SBH8Mziw3QbnQPdhfZLzyIlozi3+8sT7wGvyrwjVfyd+lFd8HcLkpawcI27F+qkXv/yS8EAWQ295nQO+YfH5vnIueJ0/zkL5k5F5KcOzchjo9h+KZdEqWeXqRByA41UVwrix2oZrNK/V3UBwV7dArwNuO6pYR6fwVxGiJE3ZF2n5AZjxjHOXCH5Ja9fvyZrUPecb/HcRqkRiSwfS5hV5RpunGMF7HdtstDbZtkH1bVMnejg1/sYfYTGtiEozVAHTljFA64NdXURQagOfio9qYFpMiDxAiAah2JSv6y7trxmvBMFRRC0GgXMvsN4c4YpSXgrfjKvrpZA3CiFnuwhTakMmH3IOiBH3yEiD00yUBRchtLrZbS/oA3sILVQ7g7vYjRtxThRrXlHoFUsn0Qr69kiYvdKz6m3etB+zLP10YPlViCGtbfJ/BidUfnZhMw55KAszzs511sMgxYOB6fBbkhAzbs585HYQ5w04d6k4+BxYx2yxqCC2y+ZupnnwcWyYuWTnahUwQ4w==").catch(error => {
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
