import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const FILTERS = ["This Month", "Last 30 Days", "Last 2 Weeks", "This Year"];

export default function GraphContainer() {
  const [activeTab, setActiveTab] = useState<"Income" | "Expense">("Income");
  const [activeFilter, setActiveFilter] = useState("This Month");

  const chartData = [
    { value: 160, label: "Feb" },
    { value: 180, label: "Mar" },
    { value: 190, label: "Apr" },
    { value: 210, label: "May" },
    { value: 200, label: "Jun" },
    { value: 200, label: "Jul" },
    { value: 200, label: "Aug" },
  ];

  const themeColor = activeTab === "Income" ? "#10B981" : "#F43F5E";
  const themeFill = activeTab === "Income" ? "rgba(16, 185, 129, 0.2)" : "rgba(244, 63, 94, 0.2)";

  return (
    <View style={styles.outerWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
        style={styles.filterBar}
      >
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[
              styles.filterItem,
              activeFilter === filter && styles.filterItemActive,
            ]}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.cardContainer}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerLabel}>Total {activeTab}</Text>
            <Text style={styles.balanceText}>$8,200.00</Text>
          </View>

          <View style={styles.toggleWrapper}>
            <TouchableOpacity
              onPress={() => setActiveTab("Expense")}
              style={[styles.toggleBtn, activeTab === "Expense" && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleText, activeTab === "Expense" && styles.toggleTextActive]}>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("Income")}
              style={[styles.toggleBtn, activeTab === "Income" && styles.toggleBtnActive]}
            >
              <Text style={[styles.toggleText, activeTab === "Income" && styles.toggleTextActive]}>
                Income
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.chartWrapper}>
          <LineChart
            areaChart
            curved
            data={chartData}
            width={SCREEN_WIDTH - 90}
            adjustToWidth={true}
            height={160}
            hideDataPoints
            spacing={50}
            color={themeColor}
            thickness={3}
            startFillColor={themeFill}
            endFillColor="rgba(255, 255, 255, 0.01)"
            initialSpacing={10}
            endSpacing={30}
            hideYAxisText
            yAxisLabelWidth={0}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            xAxisLabelTextStyle={styles.xAxisText}
            pointerConfig={{
              pointerStripColor: "#CBD5E1",
              pointerStripWidth: 2,
              pointerColor: themeColor,
              radius: 4,
              showPointerStrip: true,
              pointerLabelWidth: 100,
              pointerLabelHeight: 90,
              activatePointersOnLongPress: false,
              autoAdjustPointerLabelPosition: true,
              shiftPointerLabelX: -45,
              pointerLabelComponent: (items: any) => {
                const isLastItem = items[0].label === chartData[chartData.length - 1].label;

                return (
                  <View style={[styles.tooltip, isLastItem ? { left: -80 } : { left: 0 }]}>
                    <Text style={styles.tooltipTitle}>{items[0].label}</Text>
                    <Text style={[styles.tooltipAmount, { color: themeColor }]}>
                      {activeTab.toLowerCase()} : {items[0].value * 40}
                    </Text>
                  </View>
                );
              },
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    marginBottom: 20,
  },
  filterBar: {
    marginBottom: 16,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
  },
  filterItemActive: {
    backgroundColor: "#1E293B",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  filterTextActive: {
    color: "white",
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 32,
    padding: 24,
    height: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    overflow: "visible",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  headerLabel: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "500",
  },
  balanceText: {
    color: "#1E293B",
    fontSize: 30,
    fontWeight: "800",
  },
  toggleWrapper: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    padding: 4,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  toggleBtnActive: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
  },
  toggleTextActive: {
    color: "#1E293B",
  },
  chartWrapper: {
    marginTop: 10,
    alignItems: "center",
  },
  xAxisText: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "500",
  },
  tooltip: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    width: 130,
    bottom: 40,
  },
  tooltipTitle: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#1E293B",
  },
  tooltipAmount: {
    fontWeight: "700",
    marginTop: 4,
    fontSize: 11,
  },
});