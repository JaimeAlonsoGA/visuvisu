import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useMemo } from "react";
import { Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { attribution, imageSource } from "../lib/species";
import type { SpeciesImage } from "../lib/types";

const MAX_SCALE = 5;
const DOUBLE_TAP_SCALE = 2.5;
const DISMISS_DISTANCE = 120;

const clamp = (min: number, max: number, v: number) => {
  "worklet";
  return Math.min(max, Math.max(min, v));
};

/** Full-screen, zoomable viewer. A single instance is shared by a whole list. */
export default function ImageViewer({
  image,
  caption,
  onClose,
}: {
  image: SpeciesImage | null;
  caption?: string;
  onClose: () => void;
}) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const savedTx = useSharedValue(0);
  const savedTy = useSharedValue(0);

  // Every image opens un-zoomed.
  useEffect(() => {
    scale.value = savedScale.value = 1;
    tx.value = ty.value = savedTx.value = savedTy.value = 0;
  }, [image]);

  const gesture = useMemo(() => {
    const bound = (s: number, size: number) => {
      "worklet";
      return Math.max(0, (size * s - size) / 2);
    };

    const settle = () => {
      "worklet";
      if (scale.value <= 1) {
        scale.value = withTiming(1);
        tx.value = withTiming(0);
        ty.value = withTiming(0);
        savedScale.value = 1;
        savedTx.value = savedTy.value = 0;
        return;
      }
      const bx = bound(scale.value, width);
      const by = bound(scale.value, height);
      savedScale.value = scale.value;
      savedTx.value = clamp(-bx, bx, tx.value);
      savedTy.value = clamp(-by, by, ty.value);
      tx.value = withTiming(savedTx.value);
      ty.value = withTiming(savedTy.value);
    };

    const pinch = Gesture.Pinch()
      .onStart(() => {
        savedScale.value = scale.value;
        savedTx.value = tx.value;
        savedTy.value = ty.value;
      })
      .onUpdate((e) => {
        const next = clamp(0.8, MAX_SCALE, savedScale.value * e.scale);
        // Keep the content under the focal point fixed while scaling.
        const fx = e.focalX - width / 2;
        const fy = e.focalY - height / 2;
        const ratio = next / savedScale.value;
        tx.value = fx - (fx - savedTx.value) * ratio;
        ty.value = fy - (fy - savedTy.value) * ratio;
        scale.value = next;
      })
      .onEnd(settle);

    const pan = Gesture.Pan()
      .averageTouches(true)
      .onStart(() => {
        savedTx.value = tx.value;
        savedTy.value = ty.value;
      })
      .onUpdate((e) => {
        if (e.numberOfPointers > 1) return; // pinch handles two-finger movement
        if (scale.value > 1) {
          tx.value = savedTx.value + e.translationX;
          ty.value = savedTy.value + e.translationY;
        } else {
          ty.value = e.translationY; // swipe to dismiss
        }
      })
      .onEnd((e) => {
        if (scale.value <= 1 && Math.abs(e.translationY) > DISMISS_DISTANCE) {
          scheduleOnRN(onClose);
          return;
        }
        settle();
      });

    const doubleTap = Gesture.Tap()
      .numberOfTaps(2)
      .maxDuration(250)
      .onEnd((e) => {
        if (scale.value > 1) {
          scale.value = withTiming(1);
          tx.value = withTiming(0);
          ty.value = withTiming(0);
          savedScale.value = 1;
          savedTx.value = savedTy.value = 0;
          return;
        }
        const fx = e.x - width / 2;
        const fy = e.y - height / 2;
        const bx = bound(DOUBLE_TAP_SCALE, width);
        const by = bound(DOUBLE_TAP_SCALE, height);
        savedScale.value = DOUBLE_TAP_SCALE;
        savedTx.value = clamp(-bx, bx, -fx * (DOUBLE_TAP_SCALE - 1));
        savedTy.value = clamp(-by, by, -fy * (DOUBLE_TAP_SCALE - 1));
        scale.value = withTiming(DOUBLE_TAP_SCALE);
        tx.value = withTiming(savedTx.value);
        ty.value = withTiming(savedTy.value);
      });

    return Gesture.Simultaneous(pinch, pan, doubleTap);
  }, [width, height, onClose]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { scale: scale.value }],
    opacity: scale.value <= 1 ? 1 - Math.min(Math.abs(ty.value) / (DISMISS_DISTANCE * 3), 0.5) : 1,
  }));

  const credit = image ? attribution(image) : "";

  return (
    <Modal
      visible={image !== null}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={styles.backdrop}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
            {image && (
              <Image
                source={imageSource(image.url)}
                style={StyleSheet.absoluteFill}
                contentFit="contain"
                cachePolicy="memory-disk"
                accessibilityLabel={caption ?? image.title}
              />
            )}
          </Animated.View>
        </GestureDetector>

        <Pressable
          onPress={onClose}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Cerrar imagen"
          style={[styles.close, { top: insets.top + 12 }]}
        >
          <FontAwesome name="close" size={22} color="white" />
        </Pressable>

        {(caption || credit) && (
          <View pointerEvents="none" style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
            {caption ? <Text style={styles.caption}>{caption}</Text> : null}
            {credit ? (
              <Text style={styles.credit} numberOfLines={2}>
                {credit}
              </Text>
            ) : null}
          </View>
        )}
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.95)" },
  close: {
    position: "absolute",
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  footer: { position: "absolute", left: 0, right: 0, bottom: 0, paddingHorizontal: 16, alignItems: "center" },
  caption: { color: "white", fontSize: 16, fontStyle: "italic", marginBottom: 4 },
  credit: { color: "rgba(255,255,255,0.6)", fontSize: 11, textAlign: "center" },
});
