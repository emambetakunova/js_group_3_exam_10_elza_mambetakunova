import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class AddComment extends Component {
    state = {
        author: '',
        comment: ''
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.onSubmit(formData)
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };


    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                <FormGroup row>
                    <Label sm={2} for="author">Author</Label>
                    <Col sm={10}>
                        <Input
                            type="text" required
                            name="author" id="author"
                            placeholder="Enter author"
                            value={this.state.author}
                            onChange={this.inputChangeHandler}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} for="comment">Comment</Label>
                    <Col sm={10}>
                        <Input
                            type="textarea" required
                            name="comment" id="comment"
                            placeholder="Enter comment"
                            value={this.state.comment}
                            onChange={this.inputChangeHandler}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={{offset: 2, size: 10}}>
                        <Button type="submit" color="primary">Save</Button>
                    </Col>
                </FormGroup>
            </Form>

        );
    }
}

export default AddComment;