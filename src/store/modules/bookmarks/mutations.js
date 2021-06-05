export default {
     addToBookmarks(state, payload) {
          state.bookmarkedRecipes.push(payload.recipe);
     },
     fetchBookmarks(state, payload) {
          state.bookmarkedRecipes = payload.bookmarks;
     },
     removeFromBookmarks(state, payload) {
          const index = state.bookmarkedRecipes.findIndex(bookmark => bookmark.id === payload.id);
          state.bookmarkedRecipes.splice(index, 1);
     }
}