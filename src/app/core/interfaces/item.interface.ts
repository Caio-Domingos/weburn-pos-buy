export interface Item {
  id: string | null;
  name: string | null;
  type: ItemsType | null;
  compareItemID: string | number | null;

  actions: string[];

  voucherConfig?: {
    count: number;
    isPack?: boolean;
    packSku?: string;
  };
  nutriVoucherConfig?: {
    count: number;
    creditValue: number;
    creditField: number;
    usedVoucherField: number;

    prefix?: string;
  };
  mfitConfig?: {
    duration: string;
    auth: string;
    token: string;
  };
  weburnConfig?: {
    duration: string;
    partner: string;
    planIdV2: string;
    prefix: string;
  };
  acConfig?: {
    urlApi: number;
    list: number;
    customField: number;
  };
}

export enum ItemsType {
  PAGARME,
  GURU,
  ATOMM,
}

export const ItemsTypeList = ['PAGARME', 'GURU', 'ATOMM'];

export const ItemActionsList = [
  'VOUCHER',
  'VOUCHER-V2',
  'VOUCHER-BATCH',
  'MFIT',
  'WEBURN-SUBSCRIPTION',
  'WEBURN-SUBSCRIPTION-V2',
  'NUTRI-VOUCHER',
  'NUTRI-CREDIT',
];
