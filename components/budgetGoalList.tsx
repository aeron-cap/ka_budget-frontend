import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// TODO: we limit this to 3 max
const budgetGoals = [
  {
    id: 1,
    title: 'New Car',
    current: 8500,
    target: 15000,
    color: '#2563EB',
    icon: 'radio-button-on',
  },
  {
    id: 2,
    title: 'Emergency Fund',
    current: 7500,
    target: 10000,
    color: '#10B981',
    icon: 'wallet',
  },
  {
    id: 3,
    title: 'Vacation',
    current: 1200,
    target: 3000,
    color: '#F59E0B',
    icon: 'radio-button-on',
  },
];

export default function BudgetGoalList() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Saving Goals</Text>
        <TouchableOpacity>
          <Text style={styles.manageText}>Manage</Text>
        </TouchableOpacity>
      </View>

      {budgetGoals.map((goal) => {
        const percentage = Math.round((goal.current / goal.target) * 100);

        return (
          <View key={goal.id} style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={[styles.iconContainer, { backgroundColor: goal.color }]}>
                <Ionicons name={goal.icon as any} size={20} color="white" />
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalSubtitle}>
                  ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                </Text>
              </View>

              <Text style={styles.percentageText}>{percentage}%</Text>
            </View>

            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${percentage}%`, backgroundColor: goal.color },
                ]}
              />
            </View>
          </View>
        );
      })}

      <TouchableOpacity style={styles.newGoalButton}>
        <Ionicons name="flash" size={18} color="#2563EB" style={styles.newGoalIcon} />
        <Text style={styles.newGoalText}>Set New Saving Goal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 600,
    borderRadius: 24
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  manageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  goalSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  percentageText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  newGoalButton: {
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#BFDBFE',
    backgroundColor: '#EFF6FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newGoalIcon: {
    marginRight: 8,
  },
  newGoalText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563EB',
  },
});