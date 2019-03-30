import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {NotificationContainer} from 'react-notifications';
import AddCommentForm from "../../components/AddCommentForm/AddCommentForm";
import {createComment} from "../../store/actions/actions";

class AddComment extends Component {

    createComment = data => {
        this.props.onCommentCreated(data).then(()=> {
            this.props.history.push('/news/:id');
        });
    };

    render() {
        return (
            <Fragment>
                <h5><strong>New comment</strong></h5>
                <AddCommentForm onSubmit={this.createComment}/>
                <NotificationContainer/>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onCommentCreated: data => dispatch(createComment(data))

});
export default connect(null, mapDispatchToProps)(AddComment);