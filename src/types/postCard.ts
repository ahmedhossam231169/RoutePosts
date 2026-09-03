
export interface PostCardI {
  _id: string
  body?: string
  image?: string
  privacy: string
  user: UserI
  sharedPost?: SharedPostI
  likes: string[]
  createdAt: string
  commentsCount: number
  topComment?: TopCommentI
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
}

export interface UserI {
  _id: string
  name: string
  username: string
  photo: string
}

export interface SharedPostI {
  _id: string
  body: string
  image: string
  privacy: string
  user: User2I
  sharedPost: any
  likes: any[]
  createdAt: string
  commentsCount: number
  topComment: any
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
}

export interface User2I{
  _id: string
  name: string
  username: string
  photo: string
}

export interface TopCommentI {
  _id: string
  content: string
  image?: string
  commentCreator: CommentCreatorI
  post: string
  parentComment: any
  likes: any[]
  createdAt: string
}

export interface CommentCreatorI {
  _id: string
  name: string
  username: string
  photo: string
}

