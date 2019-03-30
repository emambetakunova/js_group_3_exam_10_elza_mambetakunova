import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";


import {CardText, Card, CardBody, CardColumns, Button} from "reactstrap";
import {NotificationContainer} from 'react-notifications';
import {fetchDeleteComment} from "../../store/actions/actions";


class Comments extends Component {

    delete = (id) => {
        this.props.fetchDeleteComment(id);
    };

    render() {
        let comment = this.props.comments;
        if (comment === []) {
            comment = <h2>Add new comments</h2>;
        } else {
            comment =  <Card key={comment.id} style={{marginBottom: '10px'}}>
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
        }
        return (
            <Fragment>
                <h5>
                    <strong>Comments</strong>
                </h5>
                <CardColumns>
                    {comment}
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
        fetchDeleteComment: id => dispatch(fetchDeleteComment(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);