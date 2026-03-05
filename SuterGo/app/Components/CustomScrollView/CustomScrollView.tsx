import React, { Children, useRef, useState } from 'react';
import { ScrollView, View, StyleSheet, Animated } from 'react-native';

type Props = {
    children: React.ReactNode;
}

const CustomScrollView = (props: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollIndicator = useRef(new Animated.Value(0)).current;
  const [scrollWidth, setScrollWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const maxScroll = contentWidth - layoutMeasurement.width;
    const indicatorPosition = (contentOffset.x / maxScroll) * (scrollWidth - 175); // Adjust indicator width here

    scrollIndicator.setValue(indicatorPosition);
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        persistentScrollbar
        onContentSizeChange={(contentWidth) => setContentWidth(contentWidth)}
        onLayout={(e) => setScrollWidth(e.nativeEvent.layout.width)}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingRight: 20 }}
      >
       {props.children}
      </ScrollView>

      {/* Custom Scroll Indicator */}
      <Animated.View
        style={[
          styles.scrollIndicator,
          { transform: [{ translateX: scrollIndicator }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollIndicator: {
    position: 'absolute',
    bottom: 2,
    height: 4,
    width: 150, // Set width of the indicator
    backgroundColor: 'red', // Red color for custom scrollbar
    borderRadius: 2,
  },
});

export default CustomScrollView