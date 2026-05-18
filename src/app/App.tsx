import WaveAnimation from "@/Animations/WaveAnimation";
import React from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

function App() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Metaball /> */}
        {/* <Breathing /> */}
        {/* <ChasingBubbles /> */}
        {/* <Focus /> */}
        {/* <MaskingOnboardingScreen /> */}
        {/* <BlurCards /> */}
        <WaveAnimation />
      </SafeAreaView>
    </>
  );
}

const AppContainer = gestureHandlerRootHOC(App);

export default AppContainer;
