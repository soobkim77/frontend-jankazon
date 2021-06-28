import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import "semantic-ui-css/semantic.min.css";
import './App.css';
import MarketPlace from './Pages/MarketPlace'
import UserPage from './Pages/UserPage'
import LogIn from './Components/LogIn'
import NavBar from './Components/NavBar'


class App extends React.Component {
  
  state = {
    items: [],
    users: [],
    addItem: false,
    login: false,
    createUser: true,
    currentItem: {},
    currentUser: {},
    isLoggedIn: false,
    user: {
      username: "",
      password: ""
    },
    itemView: false,
    edit: false
  }

  //Backend Requests
  getItems = () => {
    fetch("http://127.0.0.1:3000/items/")
    .then(r => r.json())
    .then(data => {
      this.setState({items: data.items})
    })
  }

  getUsers = () => {
    fetch("http://127.0.0.1:3000/users/")
    .then(r => r.json())
    .then(data => {
      this.setState({users: data.users})
    })
  }

  handleUsernameChange = (e) => {
    this.setState({user: {...this.state.user, username: e.target.value}})
  }

  handlePasswordChange = (e) => {
    this.setState({user: {...this.state.user, password: e.target.value}})
  }

  validateUser = (e) => {
    e.preventDefault()
    let user = {
      name: this.state.user.username,
      password: this.state.user.password
    }
    let reqPackage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)}
    fetch("http://127.0.0.1:3000/login/", reqPackage)
    .then(r => r.json())
    .then(data => {
      if (data.message == "Successful Login"){
        this.setState({isLoggedIn: true, currentUser: data.user, login: true, user: {username: "", password: ""}})
        this.props.history.push('/marketplace')
      } else {
        alert(data.message)
      }
    })
  }

  createUser = (e) => {
    e.preventDefault()
    let allUsers = this.state.users
    let duplicateUser = allUsers.find(user => user.username === this.state.user.username)
    let newUser = {
      name: this.state.user.username,
      password: this.state.user.password
    }
    let reqPackage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)}
    if(duplicateUser){
      alert('Username Already Exists')
    }
    else{
    fetch('http://127.0.0.1:3000/users/', reqPackage)
      .then(r => r.json())
      .then(data => {
        if(!data.message){
        alert("User created, please log in to continue!")
        this.setState({
          users: [...this.state.users, data],
          login: false,
          createUser: true
        })
      } else {
        alert(data.message)
      }
      })
    }
  }

  componentDidMount = () => {
    this.getItems()
    this.getUsers()
  }

  //
  handleSubmit = (e) => {
    e.preventDefault();

    let newItem = {
      name: e.target.name.value,
      image: e.target.image.value,
      seller: this.state.currentUser,
      category: e.target.category.value,
      description: e.target.description.value,
      price: e.target.price.value,
      condition: e.target.condition.value
    }

    let reqPackage = {
      headers: {"Content-Type":"application/json"},
      method: "POST",
      body: JSON.stringify(newItem)
    }

    fetch("http://127.0.0.1:3000/items/", reqPackage)
    .then(res => res.json())

    .then(data => {
      this.setState({
        items: [...this.state.items, data],
        addItem: !this.state.addItem
      })
    })
  }

  cancelCreate = () => {
    this.setState({
      addItem: !this.state.addItem
    })
  }

  handleClick = () => {
    let addNewItem = !this.state.addItem
    this.setState({
      addItem: addNewItem
    })
  }


  itemsByUser = () => {
    let items =  this.state.items.filter(item => item.seller.id == this.state.currentUser.id)
    return items
  }


  viewItem = (e,item) => {
    e.stopPropagation()
    this.setState({
      currentItem: item,
      itemView: true
    });
  };

  clearCurrentItem = () => {
    this.setState({
      currentItem: {}
    });
  };

  goBack = () => {
    this.setState({
      currentItem: {},
      itemView:false
    });
  };

  editItem = () => {
    this.setState({edit: true})
  }

  cancelEdit = () => {
    this.setState({edit: false});
  }

  handleSaveEdit = (e, item) => {
    e.preventDefault();
  
    const updateItem = {
      name: e.target.name.value,
      image: e.target.image.value,
      seller: this.state.currentItem.seller,
      category: e.target.category.value,
      description: e.target.description.value,
      price: e.target.price.value,
      condition: e.target.condition.value
    };

    fetch(`http://127.0.0.1:3000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updateItem),
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: this.state.items.map(item => item.id !== data.id ? item : data ),
          currentItem: data,
          edit: false,
          itemView:true
        });
      });
  }

  removeItem = (e, deleteItem) => {
    e.stopPropagation()
    fetch(`http://127.0.0.1:3000/items/${deleteItem.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      } 
    })

    this.setState({
      items: this.state.items.filter(item => item !== deleteItem)
    })
  }

  handleLogout = () => {
    this.setState({
    currentUser: {},
    isLoggedIn: false,
    login: false
  })
  }

  buyItem = (e, item) => {
    e.stopPropagation()
    let purchase = {
      item_id: item.id,
      seller_id: item.seller.id,
      purchaser_id: this.state.currentUser.id
    }

    let reqPackage = {
      headers: {"Content-Type":"application/json"},
      method: "POST",
      body: JSON.stringify(purchase)
    }
    fetch(`http://127.0.0.1:3000/purchases`, reqPackage)
    .then(r => r.json())
    .then(purch =>  {this.setState({
      items: this.state.items.map(item => item.id !== purch.item.id ? item : purch.item ), itemView: false})
      this.props.history.push(`/users/${this.state.currentUser.id}`)
    }
    )
  }

  render(){
    return (
      <div className={this.state.isLoggedIn? "": "login-background"} style={{height: "100%"}}>
        {this.state.isLoggedIn ? null : <h1 className="welcome">Welcome to Jankazon</h1>}
        <div>
          {this.state.isLoggedIn ?
            (<NavBar user={this.state.currentUser} isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>)
            :
            (
            <div className="root-container">
              <div>
                <div className="box-controller">
                    {this.state.login?
                    <button className="controller" onClick={() => {this.setState({login: false, createUser: true})}}>LogIn</button>
                    :
                    <button className="controller" onClick={() => {this.setState({createUser: false, login: true})}}>Create User</button>
                    } 
            </div>
                  <div className="box-container">
                    {this.state.login ? 
                  
                    null 
                  
                    : 
                
                    <LogIn log={this.state.login} user={this.state.user} handleUsernameChange={this.handleUsernameChange} handlePasswordChange={this.handlePasswordChange}  handleLogin={(e) => this.validateUser(e)} />} 
                    {this.state.createUser ?
                    null
                    :
                    <LogIn log={this.state.login} user={this.state.user} handleUsernameChange={this.handleUsernameChange} handlePasswordChange={this.handlePasswordChange}  handleLogin={(e) => this.createUser(e)} />
                     }
                  </div>
              </div>            
        </div>)}
        </div>
        {/* <Welcome/> */}
          
        <Switch>  
            <Route exact path="/marketplace" render={()=> {
              return <MarketPlace goBack={this.goBack} itemView={this.state.itemView} view={this.viewItem} isLoggedIn={this.state.isLoggedIn} items={this.state.items} buy={this.buyItem} currentUser={this.state.currentUser} item={this.state.currentItem}/>
            }}/>
            <Route exact path="/users/:id" render={()=> {
              return <UserPage myPage={this.state.myPage} itemView={this.state.itemView} item={this.state.currentItem} remove={this.removeItem} currentUser={this.state.user} handleClick={this.handleClick} handleSubmit={this.handleSubmit} addItem={this.state.addItem} view={this.viewItem} items={this.itemsByUser()} goBack={this.goBack} editItem={this.editItem} cancelEdit={this.cancelEdit} edit={this.state.edit} handleSaveEdit={this.handleSaveEdit} cancelCreate={this.cancelCreate}/>
            }}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);

