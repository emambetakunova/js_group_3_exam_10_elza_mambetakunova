import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {NotificationContainer} from 'react-notifications';
import AddForm from "../../components/AddForm/AddForm";
import {createNews} from "../../store/actions/actions";

class AddNews extends Component {

    createNews = data => {
        this.props.onNewsCreated(data).then(()=> {
            this.props.history.push('/news');
        });
    };

    render() {
        return (
            <Fragment>
                <h2>New news</h2>
                <AddForm onSubmit={this.createNews}/>
                <NotificationContainer/>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onNewsCreated: data => dispatch(createNews(data))

});
export default connect(null, mapDispatchToProps)(AddNews);