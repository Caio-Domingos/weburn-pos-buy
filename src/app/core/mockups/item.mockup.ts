import { Item, ItemsType } from '../interfaces/item.interface';

export const mockup__items: Item[] = [
  {
    id: '1',
    name: 'Pagar.me',
    type: ItemsType.PAGARME,
    compareItemID: 1,
    actions: ['MFIT', 'NUTRI-VOUCHER', 'NUTRI-CREDIT'],

    voucherConfig: {
      count: 1,
      isPack: false,
      packSku: '',
    },

    nutriVoucherConfig: {
      count: 1,
      creditValue: 1,
      creditField: 1,
      usedVoucherField: 57,
      prefix: '',
    },

    mfitConfig: {
      duration: '1',
      auth: '',
      token: '',
    },

    weburnConfig: {
      duration: '1',
      partner: '',
      planIdV2: '',
      prefix: '',
    },

    acConfig: {
      urlApi: 1,
      list: 1,
      customField: 1,
    },
  },
];
