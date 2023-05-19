export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[]

export interface Database {
	public: {
		Tables: {
			articles: {
				Row: {
					category: string
					content: string | null
					created_at: string
					id: string
					image_url: string | null
					original_url: string
					published_at: string
					region: string
					source_id: string
					title: string
				}
				Insert: {
					category: string
					content?: string | null
					created_at?: string
					id?: string
					image_url?: string | null
					original_url?: string | null
					published_at: string
					region: string
					source_id: string
					title: string
				}
				Update: {
					category?: string
					content?: string | null
					created_at?: string
					id?: string
					image_url?: string | null
					original_url?: string | null
					published_at?: string
					region?: string
					source_id?: string
					title?: string
				}
			}
			categories: {
				Row: {
					name: string
				}
				Insert: {
					name: string
				}
				Update: {
					name?: string
				}
			}
			regions: {
				Row: {
					code: string
				}
				Insert: {
					code: string
				}
				Update: {
					code?: string
				}
			}
			saved_articles: {
				Row: {
					category: string
					content: string | null
					created_at: string
					id: string
					image_url: string | null
					original_url: string | null
					published_at: string
					region: string
					source_id: string
					title: string
				}
				Insert: {
					category: string
					content?: string | null
					created_at?: string
					id?: string
					image_url?: string | null
					original_url?: string | null
					published_at: string
					region: string
					source_id: string
					title: string
				}
				Update: {
					category?: string
					content?: string | null
					created_at?: string
					id?: string
					image_url?: string | null
					original_url?: string | null
					published_at?: string
					region?: string
					source_id?: string
					title?: string
				}
			}
			sources: {
				Row: {
					category: string
					domain: string
					id: string
					name: string | null
					region: string
				}
				Insert: {
					category: string
					domain: string
					id?: string
					name?: string | null
					region: string
				}
				Update: {
					category?: string
					domain?: string
					id?: string
					name?: string | null
					region?: string
				}
			}
			user_articles: {
				Row: {
					article_id: string
					user_id: string
				}
				Insert: {
					article_id: string
					user_id: string
				}
				Update: {
					article_id?: string
					user_id?: string
				}
			}
			user_categories: {
				Row: {
					category: string
					user_id: string
				}
				Insert: {
					category: string
					user_id: string
				}
				Update: {
					category?: string
					user_id?: string
				}
			}
			user_preferences: {
				Row: {
					theme: string | null
					user: string
				}
				Insert: {
					theme?: string | null
					user: string
				}
				Update: {
					theme?: string | null
					user?: string
				}
			}
		}
		Views: {
			articles_with_bookmark: {
				Row: {
					category: string | null
					content: string | null
					created_at: string | null
					id: string | null
					image_url: string | null
					is_bookmarked: boolean | null
					original_url: string | null
					published_at: string | null
					region: string | null
					source_id: string | null
					title: string | null
				}
				Insert: {
					category?: string | null
					content?: string | null
					created_at?: string | null
					id?: string | null
					image_url?: string | null
					is_bookmarked?: never
					original_url?: string | null
					published_at?: string | null
					region?: string | null
					source_id?: string | null
					title?: string | null
				}
				Update: {
					category?: string | null
					content?: string | null
					created_at?: string | null
					id?: string | null
					image_url?: string | null
					is_bookmarked?: never
					original_url?: string | null
					published_at?: string | null
					region?: string | null
					source_id?: string | null
					title?: string | null
				}
			}
			category_articles: {
				Row: {
					articles: any | null
					category: string | null
				}
			}
		}
		Functions: {
			get_category_feed: {
				Args: {
					user_id: string
					category: string
				}
				Returns: {
					category: string
					content: string
					created_at: string
					id: string
					image_url: string
					is_bookmarked: boolean
					original_url: string
					published_at: string
					region: string
					source_id: string
					title: string
				}[]
			}
			get_user_feed: {
				Args: {
					user_id: string
				}
				Returns: {
					category: string
					content: string
					created_at: string
					id: string
					image_url: string
					is_bookmarked: boolean
					original_url: string
					published_at: string
					region: string
					source_id: string
					title: string
				}[]
			}
			get_user_saved_articles: {
				Args: {
					user_id: string
				}
				Returns: {
					category: string
					content: string | null
					created_at: string
					id: string
					image_url: string | null
					original_url: string | null
					published_at: string
					region: string
					source_id: string
					title: string
				}[]
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
