import {
    FETCH_NEWS_SUCCESS,
    FETCH_FAILURE,
    FETCH_ONE_NEWS_SUCCESS,
    DELETE,
    FETCH_COMMENTS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    news: [],
    oneNews: null,
    comments: [],
    oneComment: [],
    show: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS_SUCCESS:
            return {...state, news: action.news};
        case FETCH_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case FETCH_ONE_NEWS_SUCCESS:
            return {
                ...state,
                oneNews: action.news,
                show: true
            };
        case DELETE:
            return {
                ...state,
                oneNews: null,
                show: false,
                error: action.error
            };
        case FETCH_COMMENTS_SUCCESS:
            return {...state, comments: action.comments};
        default:
            return state;
    }
};

export default reducer;