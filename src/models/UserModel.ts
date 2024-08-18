export interface UserModel {
  id: number
  firstName: string
  lastName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  address: Address
  bank: Bank
  ein: string
  ssn: string
  userAgent: string
  role: string
}

export interface Address {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: Coordinates
  country: string
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}
