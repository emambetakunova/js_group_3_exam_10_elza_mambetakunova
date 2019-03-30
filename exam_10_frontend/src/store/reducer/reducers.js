import {
    FETCH_NEWS_SUCCESS,
    FETCH_FAILURE,
    FETCH_ONE_NEWS_SUCCESS,
    DELETE,
    FETCH_COMMENTS_SUCCESS,
    FETCH_ONE_COMMENT_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    news: [],
    newsId: null,
    oneNews: null,
    comments: [],
    oneComment: [],
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
                newsId: action.id
            };
        case DELETE:
            return {
                ...state,
                oneNews: null,
                error: action.error
            };
        case FETCH_COMMENTS_SUCCESS:
            return {...state, comments: action.comments};
        case FETCH_ONE_COMMENT_SUCCESS:
            return {
                ...state,
                oneComment: action.comment
            };
        default:
            return state;
    }
};

export default reducer;