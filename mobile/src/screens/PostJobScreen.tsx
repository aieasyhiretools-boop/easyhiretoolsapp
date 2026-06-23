import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { jobService } from '../services/api';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PostJobScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [requirements, setRequirements] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePostJob = async () => {
    if (!title || !description || !location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const jobData = {
        title,
        description,
        location,
        jobType,
        salary: {
          min: salaryMin ? parseInt(salaryMin) : undefined,
          max: salaryMax ? parseInt(salaryMax) : undefined,
        },
        requirements: requirements.split('\n').filter(r => r.trim()),
        skills: skills.split('\n').filter(s => s.trim()),
      };

      await jobService.postJob(jobData);
      Alert.alert('Success', 'Job posted successfully!');
      
      // Clear form
      setTitle('');
      setDescription('');
      setLocation('');
      setSalaryMin('');
      setSalaryMax('');
      setRequirements('');
      setSkills('');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to post job');
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Post a New Job</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Job Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Senior React Developer"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Job Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the job role and responsibilities"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., New York, NY"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>Job Type</Text>
        <View style={styles.typeContainer}>
          {['full-time', 'part-time', 'contract', 'internship'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                jobType === type && styles.typeButtonActive,
              ]}
              onPress={() => setJobType(type)}
            >
              <Text
                style={[
                  styles.typeText,
                  jobType === type && styles.typeTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Salary Range (Optional)</Text>
        <View style={styles.salaryContainer}>
          <TextInput
            style={[styles.input, styles.salaryInput]}
            placeholder="Min"
            value={salaryMin}
            onChangeText={setSalaryMin}
            keyboardType="number-pad"
          />
          <Text style={styles.salarySeparator}>-</Text>
          <TextInput
            style={[styles.input, styles.salaryInput]}
            placeholder="Max"
            value={salaryMax}
            onChangeText={setSalaryMax}
            keyboardType="number-pad"
          />
        </View>

        <Text style={styles.label}>Requirements (one per line)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g., 5+ years of experience&#10;Strong JavaScript knowledge&#10;Experience with React"
          value={requirements}
          onChangeText={setRequirements}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Required Skills (one per line)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g., JavaScript&#10;React&#10;Node.js"
          value={skills}
          onChangeText={setSkills}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handlePostJob}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Post Job</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeText: {
    fontSize: 12,
    color: '#666',
  },
  typeTextActive: {
    color: '#fff',
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  salaryInput: {
    flex: 1,
  },
  salarySeparator: {
    marginHorizontal: 8,
    color: '#ccc',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PostJobScreen;
