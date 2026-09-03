import type { PostCardI } from "./postCard"

export interface Data {
  posts: PostCardI[]
}
export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
  total: number
}