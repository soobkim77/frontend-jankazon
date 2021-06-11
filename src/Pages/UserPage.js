import React from 'react';
import ItemForm from '../Components/ItemForm';
import ItemContainer from '../Container/ItemContainer';
import ItemSpecs from '../Components/ItemSpecs';
import EditItem from "../Components/EditItem";


class UserPage extends React.Component{

    state = {
        myPage: true,
    }

    renderContent = () => {
        if (this.props.edit !== false) {
            return <EditItem item={this.props.item} cancelEdit={this.props.cancelEdit} handleSaveEdit={this.props.handleSaveEdit}/>;
        } else if (this.props.itemView !== false) {
            return <ItemSpecs item={this.props.item} goBack={this.props.goBack} editItem={this.props.editItem} myPage={this.state.myPage}/>; 
        } else {
            return <ItemContainer myPage={this.state.myPage} remove={this.props.remove} items={this.props.items} view={this.props.view} />;
        }
    }

    render(){
        return(
            <div>
                <div>
                    { this.props.addItem ? <ItemForm handleSubmit={this.props.handleSubmit} cancelCreate={this.props.cancelCreate}/> : null }
                    {this.props.edit == false && this.props.itemView == false ? <button onClick={this.props.handleClick} className="addBtn"> + Add an Item</button> : null}
                </div>
                <div>
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}

export default UserPage