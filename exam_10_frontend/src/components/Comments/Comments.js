import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";


import {CardTitle, CardText, Card, CardBody, CardColumns, Button} from "reactstrap";
import {NotificationContainer} from 'react-notifications';
import {fetchComments, fetchDeleteComment} from "../../store/actions/actions";


class Comments extends Component {

    componentDidMount() {
        this.props.onFetchComments();
    }

    delete = (id) => {
        this.props.fetchDeleteComment(id);
    };

    render() {
        console.log(this.props.comments);
        let comments = this.props.comments;
        if (comments.length === 0) {
            comments = <h2>Add new comments</h2>;
        } else {
            comments = this.props.comments.map(comment => (
                <Card key={comment.news_id} style={{marginBottom: '10px'}}>
                    <CardBody>
                        <CardText className="mb-4">
                            <strong>{comment.author} </strong>wrote:
                        </CardText>
                        <CardText>
                            <strong>{comment.comment}</strong>
                        </CardText>
                        <Button onClick={() => this.delete(comment.id)}>Delete</Button>
                    </CardBody>
                </Card>
            ));
        }
        return (
            <Fragment>
                <h1>
                    Comments
                </h1>
                <CardColumns>
                    {comments}
                </CardColumns>
                <NotificationContainer/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        comments: state.comments,
        oneComment: state.oneComment
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchComments: () => dispatch(fetchComments()),
        fetchDeleteComment: id => dispatch(fetchDeleteComment(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);