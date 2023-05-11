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
		}
		Views: {
			category_articles: {
				Row: {
					articles: any | null
					category: string | null
				}
			}
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
