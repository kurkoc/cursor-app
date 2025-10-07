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
  firstName: string;
  lastName: string;
  birthDate: string; // ISO date-time string
  email: string;
}

export interface FeedbackSaveDto {
  subject: string;
  content: string;
}

export interface CreateDeviceDto {
  deviceId: string;
  type: string;
  name: string;
  brand: string;
  os: string;
  osVersion: string;
  model: string;
}

// ============== Response DTOs ==============

export interface JwtTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface CustomerDetailDto {
  id?: string; // UUID
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  currentCoffees?: number;
  birthDate?: string; // ISO date-time string
  pendingRewards?: number;
  rewardLimit?: number;
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

