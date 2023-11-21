import { addDoc, collection, getDocs } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import db from "src/services/firebase";

// add article to firestore
export const addArticleToFirestore = createAsyncThunk(
  "articles/addArticleToFirestore",
  async (article) => {
    const addArticleRef = await addDoc(collection(db, "Articles"), article);
    const newArticle = { id: addArticleRef.id, article };
    return newArticle;
  }
);

// fetch articles
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

const blogsSlice = createSlice({
  name: "Books",
  initialState: {
    articlesArray: [],
  },
  // reducers: {

  // },
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

export default blogsSlice.reducer;
