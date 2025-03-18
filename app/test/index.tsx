import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, DollarSign } from 'lucide-react-native';
import {
  FormTextInput,
  FormNumericInput,
  FormSelectInput,
  FormDateInput,
} from '@/components/from-inputs';

// Define form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  age: z.string().min(1, { message: 'Age is required' }),
  salary: z.string().min(1, { message: 'Salary is required' }),
  department: z.string({ required_error: 'Department is required' }),
  startDate: z.string({ required_error: 'Start date is required' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormExample() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      age: '',
      salary: '',
      department: '',
      startDate: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    // Handle form submission
    alert(`Form submitted successfully!\n${JSON.stringify(data, null, 2)}`);
  };

  const departmentOptions = [
    { label: 'Engineering', value: 'engineering' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Sales', value: 'sales' },
    { label: 'Human Resources', value: 'hr' },
    { label: 'Finance', value: 'finance' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Employee Information</Text>
          <Text style={styles.subtitle}>Please fill out all required fields</Text>
        </View>

        <View style={styles.form}>
          <FormTextInput
            name="fullName"
            control={control}
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullName}
            leftIcon={<User size={20} color="#6B7280" />}
            autoCapitalize="words"
          />

          <FormNumericInput
            name="age"
            control={control}
            label="Age"
            placeholder="Enter your age"
            error={errors.age}
            keyboardType="number-pad"
          />

          <FormNumericInput
            name="salary"
            control={control}
            label="Salary"
            placeholder="Enter your salary"
            error={errors.salary}
            leftIcon={<DollarSign size={20} color="#6B7280" />}
            decimal={true}
          />

          <FormSelectInput
            name="department"
            control={control}
            label="Department"
            options={departmentOptions}
            error={errors.department}
            placeholder="Select your department"
          />

          <FormDateInput
            name="startDate"
            control={control}
            label="Start Date"
            error={errors.startDate}
            placeholder="Select start date"
            minDate={new Date(2020, 0, 1)}
            maxDate={new Date(2025, 11, 31)}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
