// utils/nonceGenerator.js
import * as Crypto from 'expo-crypto';

export const generateNonce = async () => {
  const nonce = Crypto.randomUUID();
  const hashedNonce = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    nonce
  );
  return { nonce, hashedNonce };
};
