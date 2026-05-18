import {
    BlurMask,
    Canvas,
    Circle,
    Group,
    RadialGradient,
    vec,
} from "@shopify/react-native-skia";
import React, { memo, useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import {
    Easing,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const SIZE = 350;
const CENTER = SIZE * 0.5;

const COLORS = {
  background: "#000000",
  text: "#ede9fe",
  purple: "#6d28d9",
};

const Ring = memo(
  ({
    radius,
    opacity,
    gradientRadius,
    colors,
    blur,
  }: {
    radius: any;
    opacity: any;
    gradientRadius: number;
    colors: string[];
    blur?: number;
  }) => (
    <Circle cx={CENTER} cy={CENTER} r={radius} opacity={opacity}>
      <RadialGradient
        c={vec(CENTER, CENTER)}
        r={gradientRadius}
        colors={colors}
      />
      {blur ? <BlurMask blur={blur} style="normal" /> : null}
    </Circle>
  ),
);

export default function Breathing() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [progress]);

  // Shared animated values
  const outerRadius = useDerivedValue(() => 100 + progress.value * 40);
  const middleRadius = useDerivedValue(() => 70 + progress.value * 30);
  const innerRadius = useDerivedValue(() => 45 + progress.value * 10);

  const outerOpacity = useDerivedValue(() => 0.2 + progress.value * 0.3);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Canvas style={styles.canvas}>
        <Group>
          {/* Outer glow */}
          <Ring
            radius={outerRadius}
            opacity={outerOpacity}
            gradientRadius={140}
            blur={18}
            colors={["#a78bfa", "#7c3aed", "transparent"]}
          />

          {/* Middle ring */}
          <Ring
            radius={middleRadius}
            opacity={0.6}
            gradientRadius={100}
            blur={10}
            colors={["#c4b5fd", COLORS.purple, "transparent"]}
          />

          {/* Inner core */}
          <Ring
            radius={innerRadius}
            opacity={0.95}
            gradientRadius={55}
            colors={["#ede9fe", "#8b5cf6", "#4c1d95"]}
          />
        </Group>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },

  canvas: {
    width: SIZE,
    height: SIZE,
  },

  label: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 1,
  },

  subLabel: {
    color: COLORS.purple,
    fontSize: 12,
    letterSpacing: 2,
  },
});
