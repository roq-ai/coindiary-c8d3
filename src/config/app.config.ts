interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Owner', 'Admin'],
  tenantName: 'Organization',
  applicationName: 'coindiary',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage user data',
    'Manage organization data',
    'Manage crypto news data',
    'Manage crypto market data',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/fb2ae198-939a-49a6-89ef-41185ffe4ab4',
};
