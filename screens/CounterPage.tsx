import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppTheme } from '../theme/AppTheme';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function CounterPage() {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const counterScale = useRef(new Animated.Value(1)).current;
  const buttonScaleIncrement = useRef(new Animated.Value(1)).current;
  const buttonScaleDecrement = useRef(new Animated.Value(1)).current;
  const buttonScaleReset = useRef(new Animated.Value(1)).current;

  // Entrance animation on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: AppTheme.animation.slow,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Counter value change animation
  useEffect(() => {
    Animated.sequence([
      Animated.spring(counterScale, {
        toValue: 1.2,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.spring(counterScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [count]);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const createPressAnimation = (animValue: Animated.Value) => ({
    onPressIn: () => {
      Animated.spring(animValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    },
    onPressOut: () => {
      Animated.spring(animValue, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }).start();
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="calculator" size={32} color={AppTheme.colors.primary} />
          <Text style={styles.title}>Counter</Text>
        </View>

        {/* Counter Display Card */}
        <Animated.View
          style={[
            styles.counterCard,
            {
              transform: [{ scale: counterScale }],
            },
          ]}
        >
          <Text style={styles.counterLabel}>Current Count</Text>
          <Text style={styles.counterValue}>{count}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons
                name={count > 0 ? 'trending-up' : count < 0 ? 'trending-down' : 'remove'}
                size={20}
                color={count > 0 ? AppTheme.colors.success : count < 0 ? AppTheme.colors.danger : AppTheme.colors.textSecondary}
              />
              <Text style={styles.statLabel}>
                {count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero'}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {/* Increment Button */}
          <Animated.View
            style={[
              styles.primaryButtonWrapper,
              { transform: [{ scale: buttonScaleIncrement }] },
            ]}
          >
            <Pressable
              style={styles.primaryButton}
              onPress={handleIncrement}
              {...createPressAnimation(buttonScaleIncrement)}
            >
              <Ionicons name="add" size={32} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Increment</Text>
            </Pressable>
          </Animated.View>

          {/* Decrement Button */}
          <Animated.View
            style={[
              styles.secondaryButtonWrapper,
              { transform: [{ scale: buttonScaleDecrement }] },
            ]}
          >
            <Pressable
              style={styles.secondaryButton}
              onPress={handleDecrement}
              {...createPressAnimation(buttonScaleDecrement)}
            >
              <Ionicons name="remove" size={32} color="#FFFFFF" />
              <Text style={styles.secondaryButtonText}>Decrement</Text>
            </Pressable>
          </Animated.View>
        </View>

        {/* Reset Button */}
        <Animated.View
          style={[
            styles.resetButtonWrapper,
            { transform: [{ scale: buttonScaleReset }] },
          ]}
        >
          <Pressable
            style={styles.resetButton}
            onPress={handleReset}
            {...createPressAnimation(buttonScaleReset)}
          >
            <Ionicons name="refresh" size={20} color={AppTheme.colors.textSecondary} />
            <Text style={styles.resetButtonText}>Reset to Zero</Text>
          </Pressable>
        </Animated.View>

        {/* Navigation Menu */}
        <View style={styles.menuContainer}>
          <Pressable
            style={styles.menuButton}
            onPress={() => navigation.navigate('History' as never)}
          >
            <Ionicons name="time" size={24} color={AppTheme.colors.primary} />
            <Text style={styles.menuButtonText}>History</Text>
            <Ionicons name="chevron-forward" size={20} color={AppTheme.colors.textSecondary} />
          </Pressable>
          <View style={styles.menuDivider} />
          <Pressable
            style={styles.menuButton}
            onPress={() => navigation.navigate('Settings' as never)}
          >
            <Ionicons name="settings" size={24} color={AppTheme.colors.primary} />
            <Text style={styles.menuButtonText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={AppTheme.colors.textSecondary} />
          </Pressable>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: AppTheme.spacing.lg,
    paddingTop: AppTheme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AppTheme.spacing.xl,
  },
  title: {
    fontSize: AppTheme.typography.fontSize.display,
    fontWeight: AppTheme.typography.fontWeight.bold as any,
    color: AppTheme.colors.text,
    marginLeft: AppTheme.spacing.md,
  },
  counterCard: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.borderRadius.xl,
    padding: AppTheme.spacing.xl,
    marginBottom: AppTheme.spacing.xl,
    alignItems: 'center',
    ...AppTheme.elevation.lg,
  },
  counterLabel: {
    fontSize: AppTheme.typography.fontSize.md,
    fontWeight: AppTheme.typography.fontWeight.medium as any,
    color: AppTheme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: AppTheme.spacing.sm,
  },
  counterValue: {
    fontSize: 80,
    fontWeight: AppTheme.typography.fontWeight.bold as any,
    color: AppTheme.colors.primary,
    marginVertical: AppTheme.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: AppTheme.spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: AppTheme.spacing.md,
    paddingVertical: AppTheme.spacing.sm,
    backgroundColor: AppTheme.colors.background,
    borderRadius: AppTheme.borderRadius.full,
  },
  statLabel: {
    fontSize: AppTheme.typography.fontSize.sm,
    fontWeight: AppTheme.typography.fontWeight.semibold as any,
    color: AppTheme.colors.textSecondary,
    marginLeft: AppTheme.spacing.xs,
  },
  actionsContainer: {
    gap: AppTheme.spacing.md,
    marginBottom: AppTheme.spacing.lg,
  },
  primaryButtonWrapper: {
    ...AppTheme.elevation.md,
    borderRadius: AppTheme.borderRadius.lg,
  },
  primaryButton: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: AppTheme.borderRadius.lg,
    paddingVertical: AppTheme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: AppTheme.spacing.sm,
  },
  primaryButtonText: {
    fontSize: AppTheme.typography.fontSize.xl,
    fontWeight: AppTheme.typography.fontWeight.bold as any,
    color: '#FFFFFF',
  },
  secondaryButtonWrapper: {
    ...AppTheme.elevation.md,
    borderRadius: AppTheme.borderRadius.lg,
  },
  secondaryButton: {
    backgroundColor: AppTheme.colors.secondary,
    borderRadius: AppTheme.borderRadius.lg,
    paddingVertical: AppTheme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: AppTheme.spacing.sm,
  },
  secondaryButtonText: {
    fontSize: AppTheme.typography.fontSize.xl,
    fontWeight: AppTheme.typography.fontWeight.bold as any,
    color: '#FFFFFF',
  },
  resetButtonWrapper: {
    borderRadius: AppTheme.borderRadius.lg,
  },
  resetButton: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.borderRadius.lg,
    paddingVertical: AppTheme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: AppTheme.spacing.sm,
    borderWidth: 2,
    borderColor: AppTheme.colors.border,
  },
  resetButtonText: {
    fontSize: AppTheme.typography.fontSize.md,
    fontWeight: AppTheme.typography.fontWeight.semibold as any,
    color: AppTheme.colors.textSecondary,
  },
  menuContainer: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: AppTheme.borderRadius.lg,
    marginTop: AppTheme.spacing.xl,
    overflow: 'hidden',
    ...AppTheme.elevation.sm,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: AppTheme.spacing.lg,
    paddingHorizontal: AppTheme.spacing.lg,
    gap: AppTheme.spacing.md,
  },
  menuButtonText: {
    flex: 1,
    fontSize: AppTheme.typography.fontSize.lg,
    fontWeight: AppTheme.typography.fontWeight.medium as any,
    color: AppTheme.colors.text,
  },
  menuDivider: {
    height: 1,
    backgroundColor: AppTheme.colors.border,
    marginHorizontal: AppTheme.spacing.lg,
  },
});
