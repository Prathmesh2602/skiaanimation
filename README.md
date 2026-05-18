# SkiaAnimations

A collection of GPU-accelerated animations built with **React Native Skia** and **Reanimated 4**, running natively on iOS and Android via Expo.

---

## Animations

| Animation              | Description                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| **Breathing Orb**      | Pulsing radial gradient with blur mask, driven by Reanimated shared values |
| **Wave**               | Interactive sine wave with dual-path morphing and linear gradient fill     |
| **Chasing Bubbles**    | Physics-style circles orbiting a center point                              |
| **Metaball**           | Organic blob merging effect using ColorMatrix blur                         |
| **Focus**              | Touch-to-reveal blurred text letters on a per-character basis              |
| **Blur Cards**         | BackdropBlur cards with layered glass effect                               |
| **Masking Onboarding** | Circle mask reveal transition for onboarding screens                       |

---

## Tech Stack

| Package                      | Version |
| ---------------------------- | ------- |
| Expo                         | 55      |
| React Native                 | 0.83.6  |
| React                        | 19.2.0  |
| @shopify/react-native-skia   | 2.4.18  |
| react-native-reanimated      | 4.2.1   |
| react-native-gesture-handler | 2.30.0  |
| TypeScript                   | 5.9     |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator / Android Emulator or physical device

### Install

```bash
git clone https://github.com/Prathmesh2602/skiaanimation.git
cd SkiaAnimations
npm install
```

### Run

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

> Skia requires a native build — `npx expo start` with Expo Go will not work.

---

## Project Structure

```
src/
├── app/
│   ├── _layout.tsx        # Root layout (Stack, no header)
│   ├── App.tsx            # Entry — swap animations here
│   └── index.tsx
└── Animations/
    ├── Breathing.tsx
    ├── WaveAnimation.tsx
    ├── ChasingBubbles.tsx
    ├── Metaball.tsx
    ├── Focus.tsx
    ├── BlurCards.tsx
    └── MaskingOnboardingScreen.tsx
assets/
└── fonts/
    └── Roboto-Bold.ttf
```

---

## Switching Animations

In [src/app/App.tsx](src/app/App.tsx), uncomment the animation you want to render:

---

## License

MIT
