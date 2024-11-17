import { FetchState } from "@/store/store.types";

export const fetchingState: FetchState = { fetching: true, fetched: false, error: false };
export const fetchedState: FetchState = { fetching: false, fetched: true, error: false };
export const initialFetchState: FetchState = { fetching: false, fetched: false, error: false };
export const errorFetchState: FetchState = { fetching: false, fetched: true, error: true };
