import React from 'react';
import { Form } from 'semantic-ui-react';

const ItemForm = (props) => {
    return (
        <div className="container">
            <Form  onSubmit={props.handleSubmit}>
                <h3>Create an item!</h3>
                <Form.Input fluid label="Name" name="name" placeholder="Enter item name..." width={4} />
                <Form.Input fluid label="Image" name="image" placeholder="Enter item's image URL..." width={4} />
                {/* <Form.Input fluid label="Category" name="category" placeholder="Enter item category...clothing, shoes, or accessories" width={4} /> */}
                <Form.Input fluid label="Price" name="price" placeholder="Enter item price..." width={4} />
                {/* <Form.Input fluid label="Condition" name="condition" placeholder="Enter item condition...new, used, or worn" width={4} /> */}
                <Form.TextArea label='Description' name="description" placeholder="Enter item description..." width={4}/>
                <Form.Group inline>
                <Form.Button positive>Create New Item</Form.Button>
                <Form.Button negative onClick={props.cancelCreate}>Cancel</Form.Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default ItemForm