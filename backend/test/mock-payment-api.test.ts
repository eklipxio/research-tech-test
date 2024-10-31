import { expect, jest } from '@jest/globals';
import { validate } from 'jsonschema';
import {
  MockPaymentProvider,
  CheckoutData,
  ResponseStatus,
} from '../external/mock-payment-api';

jest.mock('jsonschema', () => ({
  validate: jest.fn(),
}));

describe('MockPaymentProvider', () => {
  const paymentProvider = new MockPaymentProvider();

  it('should return success when validation passes', async () => {
    const checkoutData: CheckoutData = {
      timestamp: Date.now().toString(),
      user_id: 'user',
      product_sku: 'SKU123',
    };

    (validate as jest.Mock).mockReturnValue({ valid: true, errors: [] });

    const response: ResponseStatus = await paymentProvider.processPurchaseCheckout(
      checkoutData
    );

    expect(response.status).toBe('Success');
    expect(response.errors).toBeUndefined();
  });

  it('should return failure when validation fails', async () => {
    const checkoutData: CheckoutData = {
      timestamp: Date.now().toString(),
      user_id: 'user123',
      product_sku: 'SKU123',
    };

    const validationErrors = [
      { property: 'instance.productId', message: 'is required' },
    ];

    (validate as jest.Mock).mockReturnValue({
      valid: false,
      errors: validationErrors,
    });

    await expect(
      paymentProvider.processPurchaseCheckout(checkoutData)
    ).rejects.toEqual({
      status: 'Failure',
      errors: validationErrors.map(
        (error) => `${error.property} ${error.message}`
      ),
    });
  });

  it('should return failure when an unexpected error occurs', async () => {
    const checkoutData: CheckoutData = {
      timestamp: Date.now().toString(),
      user_id: 'user123',
      product_sku: 'SKU123',
    };

    (validate as jest.Mock).mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    await expect(
      paymentProvider.processPurchaseCheckout(checkoutData)
    ).rejects.toEqual({
      status: 'Failure',
      errors: ['Unexpected error'],
    });
  });

  it('should return failure when product_Sku is in the OutOfStockProducts array', async () => {
    const checkoutData: CheckoutData = {
      timestamp: Date.now().toString(),
      user_id: 'user123',
      product_sku: '9QN3UDUD',
    };

    await expect(
      paymentProvider.processPurchaseCheckout(checkoutData)
    ).rejects.toEqual({
      status: 'Failure',
      errors: ['Product SKU 9QN3UDUD is out of stock'],
    });
  });
});
