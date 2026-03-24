import type { RestaurantCategoriesType, RestaurantProductsType, RestaurantsType, RestaurantType, User } from '#shared/types/models'

export type MeResponse =
  | { authenticated: true; user: User }
  | { authenticated: false; user?: never }

export type AuthActionResponse = 
	| { success: true; user: User } 
	| { success: false; message: string }

export type ApiResponse<T> = 
	| { ok: true; data: T } 
	| { ok: false; error: { message: string } }

export type RestaurantsResponse = ApiResponse<{
  restaurants: RestaurantsType
}>

export type RestaurantResponse = ApiResponse<RestaurantType>

export type CategoriesResponse = ApiResponse<RestaurantCategoriesType>

export type ProductsResponse = ApiResponse<{
	products: RestaurantProductsType
}>