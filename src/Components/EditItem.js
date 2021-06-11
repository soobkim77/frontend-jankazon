import React from 'react';
import { Form } from 'semantic-ui-react'

class EditItem extends React.Component{
    // state = {
    //     name: this.props.item.name,
    //     image: this.props.item.image_url,
    //     seller: this.props.item.seller_id,
    //     category: this.props.item.category_id,
    //     description: this.props.item.description,
    //     price: this.props.item.price,
    //     condition: this.props.item.condition
    // }

    // nameChange = (e) => {
    //     this.setState({
    //         name: e.target.value
    //     })
    // }

    // nameChange = (e) => {
    //     this.setState({
    //         name: e.target.value
    //     })
    // }

    render() {
        return(
          <Form onSubmit={(e) => this.props.handleSaveEdit (e, this.props.item)}>
              <Form.Input fluid label='Item Name' name="name" placeholder={this.props.item.name} width={2}/>
              <Form.Input fluid label='Image' name="image" placeholder={this.props.item.imageUrl} width={4}/>
              <Form.Input fluid label='Price' name="price" placeholder={this.props.item.price} width={1}/>
              <Form.Input fluid label='Condition' name="condition" placeholder={this.props.item.condition} width={1} />
              <Form.Input fluid label='Category' name="category" placeholder={this.props.item.category} width={2}/>
              <Form.TextArea label='Description' name="description" placeholder={this.props.item.description} width={4}/>
              <Form.Group inline>
                  <Form.Button primary>Save</Form.Button>
                  <Form.Button secondary onClick={this.props.cancelEdit}>Cancel</Form.Button>
              </Form.Group>
          </Form>
    )}
}

export default EditItem