import { create } from 'zustand'

interface BookmarkState {
	bookmarks: Record<string, boolean>
	toggleBookmark: (id: string, isBookmarked: boolean) => void
}

export const useBookmarkStore = create<BookmarkState>((set) => ({
	bookmarks: {},
	toggleBookmark: (id: string, isBookmarked) => {
		set((state) => ({
			bookmarks: {
				...state.bookmarks,
				[id]: isBookmarked
			}
		}))
	}
}))
