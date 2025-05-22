import { Easing, useSharedValue } from "react-native-reanimated";

type PinchOptions = {
    toScale: number;
    fromScale: number;
    origin: { x: number; y: number };
    delta: { x: number; y: number };
    offset: { x: number; y: number };
};

export const pinchTransform = ({
    toScale,
    fromScale,
    delta,
    origin,
    offset,
}: PinchOptions) => {
    'worklet';

    const fromPinchX = -1 * (origin.x * fromScale - origin.x);
    const fromPinchY = -1 * (origin.y * fromScale - origin.y);
    const toPinchX = -1 * (origin.x * toScale - origin.x);
    const toPinchY = -1 * (origin.y * toScale - origin.y);

    const x = offset.x + toPinchX - fromPinchX + delta.x;
    const y = offset.y + toPinchY - fromPinchY + delta.y;
    return { x, y };
};

export const useVector = (x: number, y?: number) => {
    const x1 = useSharedValue<number>(x);
    const y1 = useSharedValue<number>(y ?? x);

    return { x: x1, y: y1 };
};

export const clamp = (lowerBound: number, upperBound: number, value: number) => {
    'worklet';
    return Math.max(lowerBound, Math.min(value, upperBound));
};

// https://api.flutter.dev/flutter/widgets/BouncingScrollPhysics/frictionFactor.html
export const friction = (fraction: number) => {
    'worklet';
    return 0.75 * Math.pow(1 - fraction * fraction, 2);
};

export const config = { duration: 200, easing: Easing.linear };