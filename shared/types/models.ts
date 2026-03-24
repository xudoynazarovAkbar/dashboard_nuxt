import type { Role } from '#shared/types/roles'

export interface User {
  id: string
	firstName: string
	lastName: string
  email: string
  role: Role
}

export interface Post {
  id: string
  title: string
  body: string
}

export interface RestaurantType {
  id: number;
  slug: string;
  name: string;
  logotype: string;
  image: string;
  tags: string[];
}

export type RestaurantsType = RestaurantType[]

export interface RestaurantCategoryType {
	id: number; 
	title: string;
}

export type RestaurantCategoriesType = RestaurantCategoryType[]

export interface ProductType {
	id: number;
  name: string;
  description: string;
  price: number;
  price_original: number;
  photo: string;
  is_available: boolean;
}

export type RestaurantProductsType = {
	id: number;
	title: string;
	products: ProductType[]
}[]