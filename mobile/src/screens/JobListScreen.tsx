import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { jobService } from '../services/api';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const JobListScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobService.getJobs();
      setJobs(response.data);
    } catch (error) {
      console.log('Error fetching jobs:', error);
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJobs();
    setRefreshing(false);
  };

  const renderJobCard = ({ item }) => (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => navigation.navigate('JobDetail', { jobId: item._id })}
    >
      <View>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.company}>{item.company}</Text>
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={14} color="#666" />
          <Text style={styles.location}>{item.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="attach-money" size={14} color="#666" />
          <Text style={styles.salary}>
            {item.salary?.min && item.salary?.max
              ? `${item.salary.min} - ${item.salary.max}`
              : 'Negotiable'}
          </Text>
        </View>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.jobType}</Text>
          </View>
          <Text style={styles.postedDate}>
            Posted {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="work-off" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No jobs available</Text>
          </View>
        }
        contentContainerStyle={jobs.length === 0 ? { flex: 1 } : {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobCard: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  location: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  salary: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  badge: {
    backgroundColor: '#007AFF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  postedDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
  },
});

export default JobListScreen;
