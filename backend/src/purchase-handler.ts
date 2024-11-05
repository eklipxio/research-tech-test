import { Context } from 'koa';
import {
  CheckoutData,
  MockPaymentProvider,
} from '../external/mock-payment-api';

const paymentProvider = new MockPaymentProvider();

export const purchaseHandler = async (ctx: Context): Promise<void> => {
  try {
    const { sku, userId } = ctx.request.body as {
      sku: string;
      userId?: string;
    };

    if (!sku) {
      ctx.status = 400;
      ctx.body = { success: false, message: 'SKU is required' };
      return;
    }

    const checkoutData: CheckoutData = {
      product_sku: sku,
      timestamp: new Date().toISOString(), // mandatory field
      user_id: userId, // Optional field
    };

    const result = await paymentProvider.processPurchaseCheckout(checkoutData);

    if (result.status === 'Success') {
      ctx.status = 200;
      ctx.body = {
        success: true,
        message: `Purchase completed for SKU: ${sku}`,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: 'Purchase failed',
        errors: result.errors,
      };
    }
  } catch (error) {
    console.error('Error processing purchase:', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'An error occurred while processing your purchase',
    };
  }
};
