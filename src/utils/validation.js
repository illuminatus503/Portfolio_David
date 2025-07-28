// General Form Validation Module
const { useState, useMemo } = React;

// Validation rules
const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    messages: {
      required: 'nameRequired',
      minLength: 'nameMinLength',
      maxLength: 'nameMaxLength',
      pattern: 'namePattern'
    }
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: 'emailRequired',
      pattern: 'emailInvalid'
    }
  },
  subject: {
    required: false, // Subject is optional
    minLength: 5,
    maxLength: 200,
    messages: {
      required: 'subjectRequired',
      minLength: 'subjectMinLength',
      maxLength: 'subjectMaxLength'
    }
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    messages: {
      required: 'messageRequired',
      minLength: 'messageMinLength',
      maxLength: 'messageMaxLength'
    }
  }
};

// Validation function
function validateField(fieldName, value, rules = VALIDATION_RULES) {
  const fieldRules = rules[fieldName];
  if (!fieldRules) return '';

  const trimmedValue = value.trim();

  // Required check
  if (fieldRules.required && !trimmedValue) {
    return fieldRules.messages.required;
  }

  // Skip other validations if not required and empty
  if (!trimmedValue && !fieldRules.required) {
    return '';
  }

  // Min length check
  if (fieldRules.minLength && trimmedValue.length < fieldRules.minLength) {
    return fieldRules.messages.minLength;
  }

  // Max length check
  if (fieldRules.maxLength && trimmedValue.length > fieldRules.maxLength) {
    return fieldRules.messages.maxLength;
  }

  // Pattern check
  if (fieldRules.pattern && !fieldRules.pattern.test(trimmedValue)) {
    return fieldRules.messages.pattern;
  }

  return '';
}

// Validate entire form
function validateForm(formData, rules = VALIDATION_RULES) {
  const errors = {};
  Object.keys(formData).forEach(field => {
    const error = validateField(field, formData[field], rules);
    if (error) errors[field] = error;
  });
  return errors;
}

// Custom hook for form validation
function useFormValidation(initialData = {}, rules = VALIDATION_RULES) {
  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Memoized validation
  const isFormValid = useMemo(() => {
    const errors = validateForm(formData, rules);
    const hasNoErrors = Object.keys(errors).length === 0;
    
    // Only check required fields, not all fields
    const requiredFields = Object.keys(rules).filter(field => rules[field].required);
    const hasAllRequiredFields = requiredFields.every(field => {
      return formData[field]?.trim() !== '';
    });
    
    return hasNoErrors && hasAllRequiredFields;
  }, [formData, rules]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate field
    const error = validateField(name, value, rules);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialData);
    setFormErrors({});
    setTouched({});
  };

  // Set field error manually
  const setFieldError = (field, error) => {
    setFormErrors(prev => ({ ...prev, [field]: error }));
  };

  // Clear field error
  const clearFieldError = (field) => {
    setFormErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    formData,
    formErrors,
    touched,
    isFormValid,
    handleInputChange,
    handleBlur,
    resetForm,
    setFieldError,
    clearFieldError,
    setFormData,
    setFormErrors
  };
}

// Make validation functions globally available
window.validateField = validateField;
window.validateForm = validateForm;
window.useFormValidation = useFormValidation;
window.VALIDATION_RULES = VALIDATION_RULES; 