import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { jobService } from '../services/api';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const JobDetailScreen = ({ route }) => {
  const { jobId } = route.params;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetchJobDetail();
  }, []);

  const fetchJobDetail = async () => {
    try {
      const response = await jobService.getJob(jobId);
      setJob(response.data);
    } catch (error) {
      console.log('Error fetching job:', error);
    }
    setLoading(false);
  };

  const handleApply = async () => {
    setApplying(true);
    try {
      await jobService.applyJob(jobId);
      Alert.alert('Success', 'Application submitted successfully!');
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to apply for job'
      );
    }
    setApplying(false);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.centerContainer}>
        <Text>Job not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.infoItem}>
          <MaterialIcons name="location-on" size={20} color="#007AFF" />
          <Text style={styles.infoText}>{job.location}</Text>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="work" size={20} color="#007AFF" />
          <Text style={styles.infoText}>{job.jobType}</Text>
        </View>

        {job.salary?.min && job.salary?.max && (
          <View style={styles.infoItem}>
            <MaterialIcons name="attach-money" size={20} color="#007AFF" />
            <Text style={styles.infoText}>
              {job.salary.min} - {job.salary.max} {job.salary.currency}
            </Text>
          </View>
        )}

        <View style={styles.infoItem}>
          <MaterialIcons name="calendar-today" size={20} color="#007AFF" />
          <Text style={styles.infoText}>
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{job.description}</Text>
      </View>

      {job.requirements && job.requirements.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          {job.requirements.map((req, index) => (
            <View key={index} style={styles.listItem}>
              <MaterialIcons name="check-circle" size={16} color="#007AFF" />
              <Text style={styles.listText}>{req}</Text>
            </View>
          ))}
        </View>
      )}

      {job.skills && job.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Skills</Text>
          <View style={styles.skillsContainer}>
            {job.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.applyButton}
        onPress={handleApply}
        disabled={applying}
      >
        <Text style={styles.applyButtonText}>
          {applying ? 'Applying...' : 'Apply Now'}
        </Text>
      </TouchableOpacity>

      <View style={styles.spacing} />
    </ScrollView>
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
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacing: {
    height: 20,
  },
});

export default JobDetailScreen;
