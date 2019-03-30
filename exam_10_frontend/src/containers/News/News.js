import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";


import {CardTitle, CardText, Card, CardBody, CardColumns, Button} from "reactstrap";
import {NotificationContainer} from 'react-notifications';
import {fetchNews, openOneNews, fetchDelete} from "../../store/actions/actions";

import NewsThumbnail from "../../components/NewsThumbnail/NewsThumbnail";


class News extends Component {

    componentDidMount() {
        this.props.onFetchNews();
    }

    openOneNews = (id) => {
        this.props.openOneNews(id);
    };

    delete = (id) => {
        this.props.fetchDelete(id);
    };

    render() {
        let news = this.props.news;
        if (news.length === 0) {
            news = <h2>Add new news</h2>;
        } else {
            news = this.props.news.map(news => (
                <Card key={news.id} style={{marginBottom: '10px'}}>
                    <CardBody>
                        <NewsThumbnail image={news.image}/>
                        <CardTitle className="mb-4">
                            <strong>Title: </strong>{news.title}
                        </CardTitle>
                        <CardText>
                            <strong>Content: </strong>{news.content}
                        </CardText>
                        <Link to={"/news/" + news.id}>
                            <Button
                                style={{marginRight: '10px'}}
                                onClick={() => this.openOneNews(news.id)}
                            >
                                Read more..
                            </Button>
                        </Link>
                        <Button onClick={() => this.delete(news.id)}>Delete</Button>
                    </CardBody>
                </Card>
            ));
        }
        return (
            <Fragment>
                <h1>
                    News
                </h1>
                <CardColumns>
                    {news}
                </CardColumns>
                <NotificationContainer/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        news: state.news,
        oneNews: state.oneNews
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchNews: () => dispatch(fetchNews()),
        openOneNews: id => dispatch(openOneNews(id)),
        fetchDelete: id => dispatch(fetchDelete(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(News);