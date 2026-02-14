import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'mfEcommerceConsumer',
  remotes: {
    paymentProvider: 'mfPaymentProvider@http://localhost:3001/mf-manifest.json',
    productProvider: 'mfProductProvider@http://localhost:3002/mf-manifest.json',
    authProvider: 'mfAuthProvider@http://localhost:3003/mf-manifest.json',
  },
  exposes: {
    './eventBus': './src/lib/eventBus.ts',
  },
  shareStrategy: 'loaded-first',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
  dts: false,
});
