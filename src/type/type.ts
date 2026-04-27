// --- Enums ---
export type Role = "USER" | "ADMIN";
export type CommentStatus = "APPROVED" | "PENDING" | "REJECTED";
export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

// --- User Model ---
export interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: string | null; 
  phone?: string | null;
  status: string | null;
  createdAt: Date;
  updatedAt: Date;
  // Relations
  posts?: PostType[];
  sessions?: Session[];
  accounts?: AccountType[];
}

// --- Post Model ---
export interface PostType {
  id: string;
  title: string;
  content: string;
  authorId: string;
  thumbnail?: string | null;
  isFeatured: boolean;
  tags: string[];
  views: number;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
  // Relation
  comments?: CommentType[];
}

// --- Comment Model ---
export interface CommentType {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  parentId?: string | null;
  status: CommentStatus;
  createdAt: Date;
  updatedAt: Date;
  // Relation
  post?: PostType;
}

// --- Auth Related ---
export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
  user?: UserType;
}

export interface AccountType {
  id: string;
  accountId: string;             
  providerId: string;            
  userId: string;               
  user?: UserType;                  
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  
  accessTokenExpiresAt?: Date | string | null;
  refreshTokenExpiresAt?: Date | string | null;
  
  scope?: string | null;        
  password?: string | null;     
  
  createdAt: Date | string;
  updatedAt: Date | string;
}