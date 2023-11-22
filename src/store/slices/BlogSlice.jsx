import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
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

//delete article
export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (id, { rejectWithValue }) => {
    try {
      const articles = await getDocs(collection(db, "Articles"));
      for (const snap of articles.docs) {
        if (snap.id === id) {
          await deleteDoc(doc(db, "Articles", snap.id));
        }
      }
      return id;
    } catch (error) {
      console.error("Error deleting article:", error);
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

    return articles;
  }
);

// update article

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async (editedArticle, { rejectWithValue }) => {
    try {
      const articles = await getDocs(collection(db, "Articles"));

      for (var snap of articles.docs) {
        if (snap.id === editedArticle.id) {
          const articleRef = doc(db, "Articles", snap.id);
          await updateDoc(articleRef, editedArticle.article);

          return editedArticle;
        }
      }

      console.log("Article not found");
      throw new Error("Article not found");
    } catch (error) {
      console.error("Error updating article:", error);

      return rejectWithValue(error.message);
    }
  }
);

const blogsSlice = createSlice({
  name: "articles",
  initialState: {
    articlesArray: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articlesArray = action.payload;
      })
      .addCase(addArticleToFirestore.fulfilled, (state, action) => {
        state.articlesArray.push(action.payload);
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articlesArray = state.articlesArray.filter(
          (article) => article.id !== action.payload
        );
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const { id, article } = action.payload;
        const articleIndex = state.articlesArray.findIndex(
          (article) => article.id === id
        );
        if (articleIndex !== -1) {
          state.articlesArray[articleIndex] = { id: id, article };
        }
      });
  },
});

export default blogsSlice.reducer;
