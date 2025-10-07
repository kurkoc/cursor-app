import { axiosInstance } from './api-client';
import type {
    CustomerDetailDto,
    CustomerQrDto,
    CustomerUpdateDto,
    JwtTokenResponse,
    OrderListDto,
    RegisterDto,
    VerifyDto,
} from './types/api-types';

/**
 * Account Service
 * Handles authentication and customer account operations
 */
export class AccountService {
  /**
   * Register a new account with phone number
   * POST /account/register
   */
  async register(data: RegisterDto): Promise<void> {
    const response = await axiosInstance.post('/account/register', data);
    return response.data;
  }

  /**
   * Verify phone number with verification code
   * POST /account/verify
   * @returns JWT tokens for authentication
   */
  async verify(data: VerifyDto): Promise<JwtTokenResponse> {
    const response = await axiosInstance.post<JwtTokenResponse>('/account/verify', data);
    return response.data;
  }

  /**
   * Get current customer details
   * GET /account/customer
   */
  async getCustomerDetail(): Promise<CustomerDetailDto> {
    const response = await axiosInstance.get<CustomerDetailDto>('/account/customer');
    return response.data;
  }

  /**
   * Update customer information
   * PUT /account/customer
   */
  async updateCustomer(data: CustomerUpdateDto): Promise<void> {
    const response = await axiosInstance.put('/account/customer', data);
    return response.data;
  }

  /**
   * Get customer's order history
   * GET /account/customer/orders
   */
  async getCustomerOrders(): Promise<OrderListDto[]> {
    const response = await axiosInstance.get<OrderListDto[]>('/account/customer/orders');
    return response.data;
  }

  /**
   * Generate QR code for customer
   * GET /account/qr
   */
  async generateQr(): Promise<CustomerQrDto> {
    const response = await axiosInstance.get<CustomerQrDto>('/account/qr');
    return response.data;
  }
}

// Export singleton instance
export const accountService = new AccountService();

