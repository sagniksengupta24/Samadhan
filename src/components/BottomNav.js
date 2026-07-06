import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import { colors } from "../constants/colors";
import { navItems } from "../constants/tabs";
import { styles } from "../styles/appStyles";

export default function BottomNav({ activeTab, onChange }) {
  return (
    <View style={styles.bottomNavWrap} pointerEvents="box-none">
      <BlurView intensity={34} tint="light" style={styles.bottomNav}>
        {navItems.map((item) => {
          const active = item.key === activeTab;
          return (
            <Pressable
              key={item.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={item.label}
              onPress={() => onChange(item.key)}
              style={({ pressed }) => [
                styles.navItem,
                active && styles.navItemActive,
                pressed && styles.navPressed
              ]}
            >
              <Ionicons
                name={active ? item.icon : `${item.icon}-outline`}
                color={active ? colors.onPrimary : "rgba(85,66,68,0.66)"}
                size={22}
              />
              <Text style={[styles.navLabel, active && styles.navLabelActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}
