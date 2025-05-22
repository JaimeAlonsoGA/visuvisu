import { Image, ImageStyle } from "expo-image";
import { useRef, useState } from "react";
import { Dimensions, FlatList, LayoutChangeEvent, Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import { Specie } from "../../../models/data";
import Animated, { cancelAnimation, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withTiming } from "react-native-reanimated";
import { clamp, config, friction, pinchTransform, useVector } from "../../../utils/zoom";
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");

const RenderItem = ({ item, index, visibleItems }: { item: Specie; index: number; visibleItems: number[] }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const isVisible = visibleItems.includes(index);
    const childWidth = useSharedValue<number>(1);
    const childHeight = useSharedValue<number>(1);
    if (item.images[0].url === "") {
        return null;
    }

    const onViewableItemsChangedImages = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentImage(viewableItems[0].index ?? 0);
        }
    }).current;

    const openModal = (imgUrl: string) => {
        setModalImage(imgUrl);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalImage(null);
    };

    const translate = useVector(0, 0);
    const offset = useVector(0, 0);
    const origin = useVector(0, 0);
    const scale = useSharedValue<number>(1);
    const scaleOffset = useSharedValue<number>(1);

    const initialFocal = useVector(0, 0);
    const currentFocal = useVector(0, 0);

    const boundaries = useDerivedValue(() => {
        const offsetX = Math.max(0, childWidth.value * scale.value - width) / 2;
        const offsetY = Math.max(0, childHeight.value * scale.value - height) / 2;

        return { x: offsetX, y: offsetY };
    }, [scale, childWidth, childHeight, width, height]);

    const measureChild = (e: LayoutChangeEvent) => {
        childWidth.value = e.nativeEvent.layout.width;
        childHeight.value = e.nativeEvent.layout.height;
    };

    const pinch = Gesture.Pinch()
        .onTouchesMove((e) => {
            if (e.numberOfTouches !== 2) return;

            const one = e.allTouches[0]!;
            const two = e.allTouches[1]!;
            currentFocal.x.value = (one.absoluteX + two.absoluteX) / 2;
            currentFocal.y.value = (one.absoluteY + two.absoluteY) / 2;
        })
        .onStart((e) => {
            initialFocal.x.value = currentFocal.x.value;
            initialFocal.y.value = currentFocal.y.value;

            origin.x.value = e.focalX / scale.value - childWidth.value / 2;
            origin.y.value = e.focalY / scale.value - childHeight.value / 2;

            offset.x.value = translate.x.value;
            offset.y.value = translate.y.value;
            scaleOffset.value = scale.value;
        })
        .onUpdate((e) => {
            const toScale = e.scale * scaleOffset.value;
            const deltaX = currentFocal.x.value - initialFocal.x.value;
            const deltaY = currentFocal.y.value - initialFocal.y.value;

            const { x: toX, y: toY } = pinchTransform({
                toScale: toScale,
                fromScale: scaleOffset.value,
                origin: { x: origin.x.value, y: origin.y.value },
                offset: { x: offset.x.value, y: offset.y.value },
                delta: { x: deltaX, y: deltaY },
            });

            const boundX = Math.max(0, childWidth.value * toScale - width) / 2;
            const boundY = Math.max(0, childHeight.value * toScale - height) / 2;

            translate.x.value = clamp(-1 * boundX, boundX, toX);
            translate.y.value = clamp(-1 * boundY, boundY, toY);
            scale.value = toScale;

            // console.log(translate.x.value, translate.y.value);
        })
        .onEnd(() => {
            if (scale.value < 1) {
                scale.value = withTiming(1);
                translate.x.value = withTiming(0);
                translate.y.value = withTiming(0);
            }
        });

    const isWithinBoundX = useSharedValue<boolean>(true);
    const isWithinBoundY = useSharedValue<boolean>(true);
    const pan = Gesture.Pan()
        .maxPointers(1)
        .onStart((_) => {
            cancelAnimation(translate.x);
            cancelAnimation(translate.y);

            offset.x.value = translate.x.value;
            offset.y.value = translate.y.value;
        })
        .onChange(({ translationX, translationY, changeX, changeY }) => {
            const toX = offset.x.value + translationX;
            const toY = offset.y.value + translationY;

            const { x: boundX, y: boundY } = boundaries.value;
            isWithinBoundX.value = toX >= -1 * boundX && toX <= boundX;
            isWithinBoundY.value = toY >= -1 * boundY && toY <= boundY;

            if (isWithinBoundX.value) {
                translate.x.value = clamp(-1 * boundX, boundX, toX);
            } else {
                if (childWidth.value * scale.value < width) {
                    translate.x.value = clamp(-1 * boundX, boundX, toX);
                } else {
                    const fraction = (Math.abs(toX) - boundX) / width;
                    const frictionX = friction(clamp(0, 1, fraction));
                    translate.x.value += changeX * frictionX;
                }
            }

            if (isWithinBoundY.value) {
                translate.y.value = clamp(-1 * boundY, boundY, toY);
            } else {
                if (childHeight.value * scale.value < height) {
                    translate.y.value = clamp(-1 * boundY, boundY, toY);
                } else {
                    const fraction = (Math.abs(toY) - boundY) / width;
                    const frictionY = friction(clamp(0, 1, fraction));
                    translate.y.value += changeY * frictionY;
                }
            }
        })
        .onEnd(({ velocityX, velocityY }) => {
            const { x: boundX, y: boundY } = boundaries.value;
            const toX = clamp(-1 * boundX, boundX, translate.x.value);
            const toY = clamp(-1 * boundY, boundY, translate.y.value);

            translate.x.value = isWithinBoundX.value
                ? withDecay({ velocity: velocityX / 2, clamp: [-1 * boundX, boundX] })
                : withTiming(toX, config);

            translate.y.value = isWithinBoundY.value
                ? withDecay({ velocity: velocityY / 2, clamp: [-1 * boundY, boundY] })
                : withTiming(toY, config);
        });

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .maxDuration(250)
        .onStart((_) => {
            offset.x.value = translate.x.value;
            offset.y.value = translate.y.value;
        })
        .onEnd((e) => {
            if (scale.value > 2) {
                translate.x.value = withTiming(0);
                translate.y.value = withTiming(0);
                scale.value = withTiming(1);
                return;
            }

            const orgnX = e.x - childWidth.value / 2;
            const orgnY = e.y - childHeight.value / 2;
            const highestScreenDimension = Math.max(width, height);
            const higheststImageDimension = Math.max(
                childWidth.value,
                childHeight.value
            );

            const tapOrigin = width > height ? orgnX : orgnY;
            const toScale =
                ((highestScreenDimension + Math.abs(tapOrigin)) /
                    higheststImageDimension) *
                2;

            const { x, y } = pinchTransform({
                fromScale: scale.value,
                toScale,
                origin: { x: orgnX, y: orgnY },
                offset: { x: offset.x.value, y: offset.y.value },
                delta: { x: 0, y: 0 },
            });

            const boundX = Math.max(0, (childWidth.value * toScale - width) / 2);
            const boundY = Math.max(0, (childHeight.value * toScale - height) / 2);

            translate.x.value = withTiming(clamp(-boundX, boundX, x));
            translate.y.value = withTiming(clamp(-boundY, boundY, y));
            scale.value = withTiming(toScale);
        });

    const detectorStyle = useAnimatedStyle(() => ({
        width: childWidth.value * scale.value,
        height: childHeight.value * scale.value,
        position: 'absolute',
        transform: [
            { translateX: translate.x.value },
            { translateY: translate.y.value },
        ],
    }));

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const imageStyle: ImageStyle = {
        width: width,
        height: height,
        maxWidth: width,
        maxHeight: height * 0.5,
        backgroundColor: "black",

    };

    return (
        <View
            key={index}
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                margin: 8,
                borderRadius: 12,
                backgroundColor: "#FFE0D4",
            }}
        >
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
                <GestureHandlerRootView style={{ flex: 1 }}>
                    {/* Fondo que cierra el modal */}
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(0,0,0,0.85)",
                            }}
                        />
                    </TouchableWithoutFeedback>
                    {/* Imagen centrada con gestos */}
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <GestureDetector gesture={Gesture.Race(pan, pinch, doubleTap)}>
                            <Animated.View style={[detectorStyle, { justifyContent: 'center', alignItems: 'center' }]}>
                                <Animated.View style={animatedStyle} onLayout={measureChild}>
                                    <Image
                                        source={{ uri: modalImage ?? "" }}
                                        style={imageStyle}
                                        contentFit="contain"
                                    />
                                </Animated.View>
                            </Animated.View>
                        </GestureDetector>
                    </View>
                </GestureHandlerRootView>
            </Modal>
            {isVisible ? (
                item.images.length > 1 ? (
                    <>
                        <View style={{ width: width - 64 }}>
                            <FlatList
                                data={item.images}
                                keyExtractor={(_, idx) => idx.toString()}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    width: "100%",
                                    aspectRatio: 1,
                                    marginBottom: 8,
                                    borderRadius: 12,
                                }}
                                renderItem={({ item: img }) => (
                                    <Pressable
                                        onPress={() => openModal(img.url)}>
                                        <Image
                                            source={{ uri: img.url }}
                                            style={{
                                                width: width - 64,
                                                aspectRatio: 1,
                                                borderRadius: 12,
                                            }}
                                            contentFit="contain"
                                            cachePolicy={"memory-disk"}
                                        />
                                    </Pressable>
                                )}
                                onViewableItemsChanged={onViewableItemsChangedImages}
                                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 8 }}>
                            {item.images.map((_, i) => (
                                <View
                                    key={i}
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: 4,
                                        marginHorizontal: 3,
                                        backgroundColor: i === currentImage ? "#1f2937" : "#d1d5db",
                                    }}
                                />
                            ))}
                        </View>
                    </>
                ) : (
                    <Pressable
                        onPress={() => openModal(item.images[0].url)}>
                        <Image
                            source={{ uri: item.images[0].url }}
                            style={{
                                width: "100%",
                                aspectRatio: 1,
                                marginBottom: 8,
                                borderRadius: 12,
                            }}
                            contentFit="contain"
                            cachePolicy={"memory-disk"}
                        />
                    </Pressable>
                )
            ) : (
                <View
                    style={{
                        width: "100%",
                        aspectRatio: 1,
                        marginBottom: 8,
                        borderRadius: 12,
                        backgroundColor: "#e5e7eb",
                    }}
                />
            )
            }
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1f2937" }}>
                {item?.scientific_name}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "light", color: "#1f2937" }}>
                {item?.common_name}
            </Text>
        </View >
    );
};

export default RenderItem;