export default {
     addToBookmarks(state, payload) {
          state.bookmarkedRecipes.push(payload.recipe);
     },
     fetchBookmarks(state, payload) {
          state.bookmarkedRecipes = payload.bookmarks;
     },
     removeFromBookmarks(state, payload) {
          state.bookmarkedRecipes = state.bookmarkedRecipes.filter(bookmark => bookmark.id !== payload.recipeId);
     }
}