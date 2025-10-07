# API Services

Auto-generated API services from OpenAPI specification for the Checkout API v1.

## Structure

```
services/
├── api-client.ts          # Central axios instance with interceptors
├── types/
│   └── api-types.ts       # TypeScript types from OpenAPI schemas
├── account-service.ts     # Authentication & customer operations
├── feedback-service.ts    # Feedback operations
├── device-service.ts      # Device registration
├── health-service.ts      # Health check endpoints
└── index.ts              # Barrel export
```

## Configuration

The base URL is configured in `services/api-client.ts`:
- Default: `http://localhost:5050`
- Can be overridden via `app.json` extra config:

```json
{
  "expo": {
    "extra": {
      "apiUrl": "https://your-production-api.com"
    }
  }
}
```

## Usage Examples

### Authentication Flow

```typescript
import { accountService, apiClient } from '@/services';

// 1. Register with phone number
async function register(phone: string) {
  try {
    await accountService.register({ phone });
    console.log('Verification code sent!');
  } catch (error) {
    console.error('Registration failed:', error);
  }
}

// 2. Verify with code
async function verify(phone: string, code: string) {
  try {
    const tokens = await accountService.verify({ phone, code });
    
    // Store tokens securely
    await SecureStore.setItemAsync('accessToken', tokens.accessToken);
    await SecureStore.setItemAsync('refreshToken', tokens.refreshToken);
    
    // Set auth token for future requests
    apiClient.setAuthToken(tokens.accessToken);
    
    return tokens;
  } catch (error) {
    console.error('Verification failed:', error);
  }
}
```

### Customer Operations

```typescript
import { accountService } from '@/services';

// Get customer details
async function loadProfile() {
  try {
    const customer = await accountService.getCustomerDetail();
    console.log(`Welcome ${customer.firstName}!`);
    console.log(`Current coffees: ${customer.currentCoffees}`);
    return customer;
  } catch (error) {
    console.error('Failed to load profile:', error);
  }
}

// Update customer info
async function updateProfile(data: CustomerUpdateDto) {
  try {
    await accountService.updateCustomer({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthDate: data.birthDate,
    });
    console.log('Profile updated!');
  } catch (error) {
    console.error('Failed to update profile:', error);
  }
}

// Get orders
async function loadOrders() {
  try {
    const orders = await accountService.getCustomerOrders();
    console.log(`You have ${orders.length} orders`);
    return orders;
  } catch (error) {
    console.error('Failed to load orders:', error);
  }
}

// Generate QR code
async function getQrCode() {
  try {
    const qr = await accountService.generateQr();
    return qr;
  } catch (error) {
    console.error('Failed to generate QR:', error);
  }
}
```

### Device Registration

```typescript
import { deviceService } from '@/services';
import * as Device from 'expo-device';

async function registerDevice() {
  try {
    const deviceInfo = {
      deviceId: Device.osBuildId || 'unknown',
      type: Device.deviceType?.toString() || 'PHONE',
      name: Device.deviceName || 'Unknown Device',
      brand: Device.brand || 'Unknown',
      os: Device.osName || 'Unknown',
      osVersion: Device.osVersion || '0',
      model: Device.modelName || 'Unknown',
    };
    
    await deviceService.createDevice(deviceInfo);
    console.log('Device registered!');
  } catch (error) {
    console.error('Device registration failed:', error);
  }
}
```

### Feedback

```typescript
import { feedbackService } from '@/services';

async function sendFeedback(subject: string, content: string) {
  try {
    await feedbackService.createFeedback({ subject, content });
    console.log('Feedback submitted!');
  } catch (error) {
    console.error('Failed to submit feedback:', error);
  }
}
```

### Health Checks

```typescript
import { healthService } from '@/services';

async function checkApiHealth() {
  try {
    await healthService.checkHealth();
    console.log('API is healthy');
  } catch (error) {
    console.error('API health check failed:', error);
  }
}
```

## Error Handling

All services use the centralized error handling from `api-client.ts`. Errors are transformed into:

```typescript
interface ApiError {
  message: string;
  errors?: string[];      // Validation errors from API
  statusCode?: number;
}
```

Example error handling:

```typescript
import { ApiError } from '@/services';

try {
  await accountService.verify({ phone, code });
} catch (error) {
  const apiError = error as ApiError;
  
  if (apiError.statusCode === 400 && apiError.errors) {
    // Show validation errors
    console.log('Validation errors:', apiError.errors);
  } else if (apiError.statusCode === 401) {
    // Handle unauthorized
    console.log('Authentication failed');
  } else {
    // Generic error
    console.log('Error:', apiError.message);
  }
}
```

## Storage Service

Platform-specific storage service that automatically uses the appropriate storage method:

- **Mobile**: Uses `expo-secure-store` for secure token storage
- **Web**: Uses `@react-native-async-storage/async-storage` for browser storage

```typescript
import { storageService } from '@/services';

// Store tokens (works on both web and mobile)
await storageService.setItem('accessToken', token);
await storageService.setItem('refreshToken', refreshToken);

// Retrieve tokens
const token = await storageService.getItem('accessToken');

// Remove tokens
await storageService.removeItem('accessToken');

// Clear all storage
await storageService.clear();
```

## Authentication Interceptor

The axios client automatically adds Bearer tokens to requests from storage. No manual token management needed:

```typescript
// Token is automatically retrieved from storage on each request
// Just store/remove tokens using storageService and the interceptor handles the rest
```

## Integration with Auth Context

Example integration with your existing `AuthContext`:

```typescript
import { accountService, apiClient } from '@/services';
import * as SecureStore from 'expo-secure-store';

// In your AuthContext
async function signIn(phone: string, code: string) {
  const tokens = await accountService.verify({ phone, code });
  
  // Store tokens
  await storageService.setItem('accessToken', tokens.accessToken);
  await storageService.setItem('refreshToken', tokens.refreshToken);
  
  // Token is automatically added to requests via interceptor
  
  // Load user data
  const user = await accountService.getCustomerDetail();
  
  setUser(user);
  setIsAuthenticated(true);
}

async function signOut() {
  // Clear tokens
  await storageService.removeItem('accessToken');
  await storageService.removeItem('refreshToken');
  
  // Token is automatically removed from requests when cleared from storage
  
  setUser(null);
  setIsAuthenticated(false);
}
```

## Notes

- All date fields use ISO 8601 format strings (`YYYY-MM-DDTHH:mm:ss.sssZ`)
- UUIDs are represented as strings
- The API client has a 30-second timeout by default
- All requests automatically include `Content-Type: application/json`

