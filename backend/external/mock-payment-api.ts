import { validate } from 'jsonschema';
import schema from './schema.json';

const OutOfStockProducts = ['9QN3UDUD', 'VZF4Z58Z'];

/**
 * Interface representing the data required to pass the schema validation.
 * @see schema.json
 * @property {string} product_sku - The product SKU.
 * @property {string} timestamp - The timestamp of the checkout.
 * @property {string} user_id - The user ID.
 */
export interface CheckoutData {
  product_sku: string;
  timestamp: unknown;
  user_id?: string;
}

/**
 * Interface representing the response status.
 */
export interface ResponseStatus {
  status: 'Success' | 'Failure';
  errors?: string[];
}

/**
 * Interface representing a payment provider.
 */
export interface PaymentProvider {
  processPurchaseCheckout: (
    checkoutData: CheckoutData
  ) => Promise<ResponseStatus>;
}

/**
 * Mock implementation of a payment provider.
 */
class MockPaymentProvider implements PaymentProvider {
  /**
   * Processes a purchase event for the checkout. If the JSON data matches the schema,
   * the method will return a successful response. Otherwise, it will return a failure.
   * Products with SKU `9QN3UDUD` and `VZF4Z58Z` will return an out of stock failure.
   * @param checkoutData - The data required for the checkout.
   * @returns A promise that resolves to the response status `Success` or `Failure`.
   */
  processPurchaseCheckout(checkoutData: CheckoutData): Promise<ResponseStatus> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (OutOfStockProducts.includes(checkoutData.product_sku)) {
            return reject({
              status: 'Failure',
              errors: [
                `Product SKU ${checkoutData.product_sku} is out of stock`,
              ],
            });
          }

          const validationResult = validate(checkoutData, schema);
          if (!validationResult.valid) {
            const errors = validationResult.errors.map(
              (error) => `${error.property} ${error.message}`
            );
            return reject({ status: 'Failure', errors });
          }

          resolve({ status: 'Success' });
        } catch (error) {
          reject({
            status: 'Failure',
            errors: [
              (error as Error).message || 'An unexpected error occurred',
            ],
          });
        }
      }, 1000);
    });
  }
}

export { MockPaymentProvider };
