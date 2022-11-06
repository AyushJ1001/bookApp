import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookService, { bookData } from "./bookService";

const books: string = localStorage.getItem("books") || JSON.stringify([]);

const initialState = {
  books: books ? books : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all books
export const getAll = createAsyncThunk(
  "book/getAll",
  async (data, thunkAPI) => {
    try {
      return await bookService.getAll();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get book by name
export const getBookByName = createAsyncThunk(
  "book/getBookByName",
  async (name: string, thunkAPI) => {
    try {
      return await bookService.getBookByName(name);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add a book
export const addBook = createAsyncThunk(
  "book/addBook",
  async (data: bookData, thunkAPI) => {
    try {
      return await bookService.addBook(data);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// remove a book
export const removeBook = createAsyncThunk(
  "book/removeBook",
  async (id: string, thunkAPI) => {
    try {
      return await bookService.removeBook(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.books = null;
      })
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.books = null;
      })
      .addCase(removeBook.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.books = null;
      })
      .addCase(getBookByName.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getBookByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getBookByName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.books = null;
      });
  },
});

export const { reset } = bookSlice.actions;
export default bookSlice.reducer;
