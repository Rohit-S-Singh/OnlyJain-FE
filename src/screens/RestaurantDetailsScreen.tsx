import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Import the shared theme file
import { COLORS } from '../constants/colors';

const ORDER_TYPES = ['Delivery', 'Takeaway', 'Dine-in'];

// ========================================================================
// Modular Sub-components
// ========================================================================

interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
}

/**
 * A reusable labeled input component for the form.
 */
const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholderTextColor={COLORS.placeholder}
      {...props}
    />
  </View>
);

interface OrderTypeSelectorProps {
  selectedTypes: string[];
  onToggleType: (type: string) => void;
}

/**
 * A component to select one or more order types.
 */
const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({ selectedTypes, onToggleType }) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>Order Type</Text>
    <View style={styles.orderTypeContainer}>
      {ORDER_TYPES.map(type => {
        const isSelected = selectedTypes.includes(type);
        return (
          <TouchableOpacity
            key={type}
            style={[styles.orderTypeChip, isSelected && styles.orderTypeChipSelected]}
            onPress={() => onToggleType(type)}
          >
            <Text style={[styles.orderTypeChipText, isSelected && styles.orderTypeChipTextSelected]}>{type}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

// ========================================================================
// Main Screen Component
// ========================================================================

const RestaurantDetailsScreen = () => {
  // --- State Management for all form fields ---
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [locality, setLocality] = useState('');
  const [minOrderQty, setMinOrderQty] = useState('');
  const [comments, setComments] = useState('');
  const [orderType, setOrderType] = useState<string[]>([]);

  /**
   * Toggles the selection of an order type.
   */
  const handleToggleOrderType = (type: string) => {
    setOrderType(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  /**
   * Handles form validation and submission.
   */
  const handleSubmit = () => {
    Keyboard.dismiss();

    // --- Basic Validation ---
    if (!restaurantName || !city || !phone) {
      Alert.alert('Missing Information', 'Please fill in Restaurant Name, City, and Phone Number.');
      return;
    }

    // --- Data Aggregation ---
    const formData = {
      timestamp: new Date().toISOString(),
      restaurantName,
      email,
      phone,
      address,
      city,
      state,
      locality,
      minOrderQty: parseInt(minOrderQty, 10) || 0,
      comments,
      orderType,
    };

    console.log('Form Data Submitted:', formData);
    Alert.alert('Success', 'Restaurant details have been saved successfully!');
    // Here you would typically dispatch an action or make an API call.
  };

  // --- Render Method ---
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
            <Text style={styles.title}>Restaurant Details</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <FormInput label="Restaurant Name" placeholder="e.g., Sattvik Bhojan" value={restaurantName} onChangeText={setRestaurantName} />
          <FormInput label="Email" placeholder="e.g., contact@sattvik.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <FormInput label="Phone Number" placeholder="e.g., 9876543210" value={phone} onChangeText={setPhone} keyboardType="phone-pad" maxLength={10} />
          <FormInput label="Address" placeholder="e.g., 123, Ahimsa Marg" value={address} onChangeText={setAddress} multiline />
          <FormInput label="City" placeholder="e.g., Mumbai" value={city} onChangeText={setCity} />
          <FormInput label="State" placeholder="e.g., Maharashtra" value={state} onChangeText={setState} />
          <FormInput label="Locality" placeholder="e.g., Malabar Hill" value={locality} onChangeText={setLocality} />

          <OrderTypeSelector selectedTypes={orderType} onToggleType={handleToggleOrderType} />

          <FormInput label="Minimum Order Quantity" placeholder="e.g., 5" value={minOrderQty} onChangeText={setMinOrderQty} keyboardType="numeric" />
          <FormInput label="Comments / Additional Info" placeholder="e.g., Specializes in pure Jain cuisine" value={comments} onChangeText={setComments} multiline />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Save Details</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ========================================================================
// Stylesheet
// ========================================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.lightGrey,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textDark,
  },
  orderTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  orderTypeChip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.lightGrey,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orderTypeChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  orderTypeChipText: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  orderTypeChipTextSelected: {
    color: COLORS.textLight,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  submitButtonText: {
    color: COLORS.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RestaurantDetailsScreen;
