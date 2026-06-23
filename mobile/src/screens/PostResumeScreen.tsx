import React, { useState, useEffect } from 'react';
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
import { resumeService } from '../services/api';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PostResumeScreen = () => {
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await resumeService.getResume();
      setSummary(response.data.summary || '');
      setSkills(response.data.skills?.join('\n') || '');
      setExperience(response.data.experience?.map(
        e => `${e.jobTitle} at ${e.company} (${e.startDate} - ${e.endDate})`
      ).join('\n') || '');
      setEducation(response.data.education?.map(
        e => `${e.degree} in ${e.field} from ${e.school}`
      ).join('\n') || '');
    } catch (error) {
      // Resume doesn't exist yet, which is fine
    }
    setLoading(false);
  };

  const handleSaveResume = async () => {
    setSaving(true);
    try {
      const resumeData = {
        summary,
        skills: skills.split('\n').filter(s => s.trim()),
        // In a real app, you'd parse experience and education properly
      };

      await resumeService.saveResume(resumeData);
      Alert.alert('Success', 'Resume saved successfully!');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to save resume');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Resume</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Professional Summary</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write a brief summary about yourself and your career goals"
          value={summary}
          onChangeText={setSummary}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Skills (one per line)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g., React&#10;JavaScript&#10;Node.js"
          value={skills}
          onChangeText={setSkills}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Work Experience</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g., Senior Developer at Tech Company (2020 - 2023)&#10;Junior Developer at Another Company (2018 - 2020)"
          value={experience}
          onChangeText={setExperience}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Education</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g., Bachelor of Science in Computer Science from University (2018)&#10;Master of Science in AI from University (2020)"
          value={education}
          onChangeText={setEducation}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSaveResume}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save Resume</Text>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    minHeight: 100,
    textAlignVertical: 'top',
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

export default PostResumeScreen;
