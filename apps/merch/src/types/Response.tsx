export enum ResponseType {
  Success,
  Fail,
}

export interface ShippingCart {
  productid: string;
  color: string;
  size: string;
  quantity: number;
}

export interface PreSession {
  updated_at: Date;
  wallet_address: string;
  session_id: string;
}

export interface ShippingSession {
  address: string;
  city: string;
  country: string;
  email: string;
  first_name: string;
  geo_state: string;
  last_name?: string;
  nft_send_txn_id?: string | null;
  phone?: number;
  session_id?: string;
  sol_send_txn_id?: string | null;
  stage_completed: number | string;
  updated_at?: Date;
  wallet_address?: string;
  zip: string;
  cart?: ShippingCart[];
}

export interface Response {
  type: ResponseType;
  data: string | PreSession | ShippingSession;
}
