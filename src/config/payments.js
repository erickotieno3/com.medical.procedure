// src/config/payments.js
// Payment configuration for AdMob and Medisave

export const PAYMENT_CONFIG = {
  admob: {
    paypalEmail: process.env.PAYPAL_ADMOB || 'juniorotieno@yahoo.com',
    platform: 'PayPal Hyperwallet',
    payoutSchedule: '21st-26th monthly',
    notes: 'Must set up via AdMob dashboard - creates new Hyperwallet account'
  },
  medisave: {
    paypalEmail: process.env.PAYPAL_MEDISAVE || 'erickotienokjv@gmail.com',
    platform: 'Direct PayPal',
    commissionRate: 0.05,
    minPayout: 50, // £50
    payoutSchedule: 'First Friday monthly',
    signupUrl: 'https://medisaveuk.postaffiliatepro.com/affiliates/signup.php'
  },
  paypalAccounts: {
    primary: process.env.PAYPAL_PRIMARY || 'juniorotieno@yahoo.com',
    secondary: process.env.PAYPAL_SECONDARY || 'erickotienokjv@gmail.com'
  }
};

// Helper to get payment method for display
export const getPaymentMethod = (type) => {
  const methods = {
    admob: {
      email: PAYMENT_CONFIG.admob.paypalEmail,
      description: 'AdMob revenue via PayPal Hyperwallet',
      icon: '💰'
    },
    medisave: {
      email: PAYMENT_CONFIG.medisave.paypalEmail,
      description: 'Medisave UK affiliate commissions',
      icon: '💷'
    }
  };
  return methods[type] || methods.admob;
};
