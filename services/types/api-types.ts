/**
 * Auto-generated types from OpenAPI specification
 * API: Checkout API v1
 */

// ============== Request DTOs ==============

export interface VerifyDto {
  phone?: string;
  code?: string;
}

export interface RegisterDto {
  phone?: string;
}

export interface CustomerUpdateDto {
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
  email: string | null;
}

export interface FeedbackSaveDto {
  subject: string;
  content: string;
}

export interface CreateDeviceDto {
  deviceId: string;
  type: string | null;
  name: string | null;
  brand: string | null;
  os: string | null;
  osVersion: string | null;
  model: string | null;
  isSimulator: boolean;
}

// ============== Response DTOs ==============

export interface JwtTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface CustomerDetailDto {
  id: string;
  phone: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  currentCoffees?: number;
  birthDate?: string | null;
  pendingRewards?: number;
  totalCoffees?: number;
  lastOrderDate?: string | null;
}

export interface CustomerQrDto {
  customerId: string; // UUID
  timestamp: string; // ISO date-time string
  hash: string;
}

export interface OrderListDto {
  id: string; // UUID
  orderDate: string; // ISO date-time string
  coffeeCount: number;
  earnedReward: number;
}

// ============== Common Types ==============

export type ApiResponse<T> = T;
export type ApiErrorResponse = string[];
