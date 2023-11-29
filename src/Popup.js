import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RNModal from "react-native-modal";

const Popup = ({ isVisible = false, children, ...props }) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      {...props}
    >
      {children}
    </RNModal>
  );
};

export default Popup;

const styles = StyleSheet.create({});
