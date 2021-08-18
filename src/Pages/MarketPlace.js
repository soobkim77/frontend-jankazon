import React from 'react';
import ItemContainer from '../Container/ItemContainer'
import FilterBar from '../Components/FilterBar'
import { Grid } from "semantic-ui-react";
import ItemSpecs from '../Components/ItemSpecs'
import { useState } from 'react'

const Market = () => {
  const [items, setItems] = useState();

  // const handleCategoryDropDown = (event, data) => {
  //   this.setState({
  //     categoryFilterOption: data.value
  //   })
  // }

  //  const handleCategoryDropDown = (event, data) => {
  //   this.setState({
  //     categoryFilterOption: data.value
  //   })
  // }

  //  const handleUserFilter = (e) => {
  //   this.setState({
  //     userFilterOption: e.target.value
  //   })
  // }

  // const filterItems = () => {
  //   /* Category is not All & User search is blank */
  //   if (this.state.categoryFilterOption ===! 'all' && !this.state.userFilterOption){
  //     return this.props.items.filter(item => item.category === this.state.categoryFilterOption)
    
  //     /* Category = All & User search is blank */
  //   } else if (this.state.categoryFilterOption === 'all' && !this.state.userFilterOption){
  //     return this.props.items 
    
  //     /* Category = All & User search is not blank */
  //   } else if (this.state.categoryFilterOption === 'all' && this.state.userFilterOption){
  //     return this.props.items.filter(item => item.name.toLowerCase().includes(this.state.userFilterOption.toLowerCase()))
    
  //     /* Category is not blank & User search is not blank */
  //   } else {
  //     return this.props.items.filter(item => item.category === this.state.categoryFilterOption && item.name.toLowerCase().includes(this.state.userFilterOption.toLowerCase()))
  //   }
  // }

  return (
    <div>

    </div>
  )
}

class MarketPlace extends React.Component {

  state={
    categoryFilterOption: 'all',
    userFilterOption: ''
  }


//   renderContent = () => {
//    if (this.props.itemView !== false) {
//         return <ItemSpecs item={this.props.item} goBack={this.props.goBack} editItem={this.props.editItem} />; 
//     } else {
//         return <ItemContainer myPage={this.state.myPage} remove={this.props.remove} items={this.props.items} view={this.props.view} />;
//     }
// }


  handleCategoryDropDown = (event, data) => {
    this.setState({
      categoryFilterOption: data.value
    })
  }

  handleCategoryDropDown = (event, data) => {
    this.setState({
      categoryFilterOption: data.value
    })
  }

  handleUserFilter = (e) => {
    this.setState({
      userFilterOption: e.target.value
    })
  }

  filterItems = () => {
    /* Category is not All & User search is blank */
    if (this.state.categoryFilterOption ===! 'all' && !this.state.userFilterOption){
      return this.props.items.filter(item => item.category === this.state.categoryFilterOption)
    
      /* Category = All & User search is blank */
    } else if (this.state.categoryFilterOption === 'all' && !this.state.userFilterOption){
      return this.props.items 
    
      /* Category = All & User search is not blank */
    } else if (this.state.categoryFilterOption === 'all' && this.state.userFilterOption){
      return this.props.items.filter(item => item.name.toLowerCase().includes(this.state.userFilterOption.toLowerCase()))
    
      /* Category is not blank & User search is not blank */
    } else {
      return this.props.items.filter(item => item.category === this.state.categoryFilterOption && item.name.toLowerCase().includes(this.state.userFilterOption.toLowerCase()))
    }
  }

  render() {
    return(
      <div>
        {!this.props.isLoggedIn ? 
        null 
        :
        <Grid columns={2} divided stackable >
          <Grid.Column width="3" >
            <FilterBar handleCategoryDropDown={this.handleCategoryDropDown} handleUserFilter={this.handleUserFilter} currentUser={this.props.currentUser} />
          </Grid.Column>
          <Grid.Column width="12">
            {!this.props.itemView ? <ItemContainer items={this.filterItems()} view={this.props.view} item={this.props.item} /> : <ItemSpecs item={this.props.item} goBack={this.props.goBack} buy={this.props.buy} />}
          </Grid.Column>
        </Grid> 
         
        }
      </div>
    )
    }
  }

export default MarketPlace 