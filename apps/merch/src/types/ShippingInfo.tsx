export interface Country {
  name: string;
  code: string;
}
export interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  address2: string;
  country: Country;
  city: string;
  state: string;
  zip: string;
}
