import React, {Component, Fragment} from 'react';
import {CardBody, Card, CardTitle, CardText} from "reactstrap";
import {connect} from "react-redux";
import {fetchComments} from "../../store/actions/actions";

import NewsThumbnail from "../../components/NewsThumbnail/NewsThumbnail";
import Comments from "../../components/Comments/Comments"
import AddComment from "../../containers/AddComment/AddComment"

class NewsData extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        this.props.onFetchComments(id);
    }

    render() {
        let oneNews = this.props.oneNews;
        console.log(oneNews);
        if (this.props.oneNews) {
            return <Card key={oneNews.id} style={{marginBottom: '10px'}}>
                <CardBody>
                    <NewsThumbnail image={oneNews.image}/>
                    <CardTitle className="mb-4">
                        <strong>Title: </strong>{oneNews.title}
                    </CardTitle>
                    <CardText>
                        <strong>Content: </strong>{oneNews.content}
                    </CardText>
                    <Comments />
                    <AddComment/>
                </CardBody>
            </Card>
        }
        return (
            <Fragment>
                {oneNews}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        oneNews: state.oneNews,
        oneComment: state.oneComment
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchComments: (id) => dispatch(fetchComments(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsData);