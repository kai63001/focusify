'use client';
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/counter.slice'
import loginReducer from './slice/login.slice'
import taskReducer from './slice/task.slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    task: taskReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch