import { addDoc, collection, getDocs } from "firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db from "src/services/firebase";

// Async thunk to add article to Firestore
export const addArticleToFirestore = createAsyncThunk(
  "articles/addArticleToFirestore",
  async (article, { rejectWithValue }) => {
    try {
      const addArticleRef = await addDoc(collection(db, "Articles"), article);
      const newArticle = { id: addArticleRef.id, ...article };
      return newArticle;
    } catch (error) {
      console.error("Error adding article:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch articles from Firestore
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const querySnapshot = await getDocs(collection(db, "Articles"));
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      article: doc.data(),
    }));

    console.log(articles, "cek data");
    return articles;
  }
);

const blogsSlice = createSlice({
  name: "articles",
  initialState: {
    articlesArray: [], // Initial state for articles
  },
  reducers: {
    // If you have synchronous actions, define them here
    // For example:
    // addArticle(state, action) {
    //   state.articlesArray.push(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articlesArray = action.payload;
      })
      .addCase(addArticleToFirestore.fulfilled, (state, action) => {
        state.articlesArray.push(action.payload);
      });
  },
});

// Export actions if needed (e.g., addArticle) and the reducer
// export const { /* addArticle */ } = blogsSlice.actions;
export default blogsSlice.reducer;
