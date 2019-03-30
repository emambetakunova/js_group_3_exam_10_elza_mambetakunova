import axios from "../../axios-api";
import {FETCH_NEWS_SUCCESS, FETCH_FAILURE, CREATE_NEW_NEWS_SUCCESS, FETCH_ONE_NEWS_SUCCESS, DELETE} from "./actionTypes";
import {NotificationManager} from "react-notifications";

export const fetchNewsSuccess = news => {
    return {type: FETCH_NEWS_SUCCESS, news};
};
export const fetchFailure = error => ({type: FETCH_FAILURE, error});

export const createNewNewsSuccess = () => ({type: CREATE_NEW_NEWS_SUCCESS});

export const fetchOneNewsSuccess = (news, id) => {
    return {type: FETCH_ONE_NEWS_SUCCESS, news, id};
};

export const createNotification = (type) => {
    return () => {
        switch (type) {
            case 'success':
                NotificationManager.success("Success", 'Success');
                break;
            case 'error':
                NotificationManager.error("Error", 'Database error 500', 5000);
                break;
            default:
                break;
        }
    };
};


export const fetchNews = () => {
    return dispatch => {
        return axios.get('/news').then(
            response => {
                dispatch(fetchNewsSuccess(response.data))
            },
            error => {
                dispatch(fetchFailure(error));
                dispatch(createNotification('error'));
            }
        );
    };
};

export const createNews = data => {
    return dispatch => {
        return axios.post('/news', data).then(
            () => {
                dispatch(createNewNewsSuccess())
            }, error => {
                dispatch(fetchFailure(error));
            }
        );
    };
};

export const openOneNews = id => {
    return dispatch => {
        return axios.get('/news/' + id).then(
            response => {
                dispatch(fetchOneNewsSuccess(response.data))
            }, error => {
                dispatch(fetchFailure(error));
                dispatch(createNotification('error'));
            }
        );
    };
};

export const fetchDelete = (id) => {
    return dispatch => {
        axios.delete('/news/' + id).then(() => {
            dispatch({type: DELETE});
            dispatch(fetchNews());
        })
    };
};
