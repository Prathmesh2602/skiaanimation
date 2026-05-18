import {
    Canvas,
    LinearGradient,
    Path,
    Skia,
    vec,
} from "@shopify/react-native-skia";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
    useDerivedValue,
    useFrameCallback,
    useSharedValue,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const FREQUENCY = 2;
const INITIAL_AMPLITUDE = 10;
const INITIAL_VERTICAL_OFFSET = 100;

function buildWaveSVG(phase: number, amplitude: number, verticalOffset: number): string {
  "worklet";
  let d = "";
  for (let i = 0; i < width; i++) {
    const angle = (i / width) * (Math.PI * FREQUENCY) + phase;
    const y = amplitude * Math.sin(angle) + verticalOffset;
    d += i === 0 ? `M ${i} ${y}` : ` L ${i} ${y}`;
  }
  return `${d} L ${width} ${height} L 0 ${height} Z`;
}

export default function WaveAnimation() {
  const verticalOffset = useSharedValue(INITIAL_VERTICAL_OFFSET);
  const amplitude = useSharedValue(INITIAL_AMPLITUDE);
  const time = useSharedValue(0);

  useFrameCallback((info) => {
    time.value = info.timestamp;
  });

  const animatedPath = useDerivedValue(() => {
    const phase = (time.value / 255) % 255;
    const start = Skia.Path.MakeFromSVGString(
      buildWaveSVG(phase, amplitude.value, verticalOffset.value),
    );
    const end = Skia.Path.MakeFromSVGString(
      buildWaveSVG(Math.PI * phase, amplitude.value, verticalOffset.value),
    );
    if (!start || !end) return Skia.Path.Make();
    return start.interpolate(end, 0.5) ?? start;
  });

  const gradientStart = useDerivedValue(() => vec(0, verticalOffset.value));
  const gradientEnd = useDerivedValue(() => vec(0, verticalOffset.value + 500));

  const gesture = Gesture.Pan().onUpdate(({ y }) => {
    "worklet";
    if (y > INITIAL_VERTICAL_OFFSET) {
      verticalOffset.value = Math.min(height, y);
      amplitude.value = Math.max(0, (height - verticalOffset.value) * 0.025);
    }
  });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <Canvas style={styles.canvas}>
          <Path path={animatedPath} style="fill" color="cyan">
            <LinearGradient
              start={gradientStart}
              end={gradientEnd}
              colors={["cyan", "blue"]}
            />
          </Path>
        </Canvas>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  canvas: {
    flex: 1,
  },
});
