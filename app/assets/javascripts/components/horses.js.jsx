this.Horses = React.createClass({
  getInitialState: function() {
    return {
      horses: this.props.data
    };
  },

  getDefaultProps: function() {
    return { horses: [] };
  },

  updateHorse: function(horse, data) {
    index = this.state.horses.indexOf(horse);
    horses = React.addons.update(this.state.horses, { $splice: [[index, 1, data]] });
    this.replaceState({ horses: horses })
  },

  addHorse: function(horse) {
    horses = this.state.horses.slice();
    horses.push(horse);
    this.setState({horses: horses});
  },

  deleteHorse: function(horse) {
    index = this.state.horses.indexOf(horse);
    horses = React.addons.update(this.state.horses, { $splice: [[index, 1]] });
    this.replaceState({ horses: horses });
  },

  render: function() {
    var el = this;
    var items = this.state.horses;

    return (
      <div className='horses'>
        <h2 className='name'>Horses</h2>
        <div className='row'></div>
        <HorseForm handleNewHorse={this.addHorse} />
        <hr></hr>
        <table className='table table-bordered'>
          <thead>
          <tr>
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {items.map(function(horse, i) {
            return <Horse horse={horse} key={i} handleDeleteHorse={el.deleteHorse} handleEditHorse={el.updateHorse} />
          })}
          </tbody>
        </table>
      </div>
    )
  }
})

// =====// =====// =====// =====// =====// =====// =====// =====// =====// =====// =====// =====

this.HorseForm = React.createClass({
  getInitialState: function() {
    return { name: '', horse_type: '', age: ''};
  },

  valid: function() {
    return this.state.name && this.state.horse_type && this.state.age
  },

  handleChange: function(e) {
    var change = {};
    var targetName = e.target.name;
    change[targetName] = e.target.value;
    this.setState(change);
  },

  handleSubmit: function(e) {

    var request = $.ajax({
      method: 'POST',
      url: "/horses",
      dataType: 'JSON',
      data: {horse: this.state}
    });

    // An arrow function expression lexically binds the 'this' value, Arrow fxns are anonymous
    request.done( (data) => {
      this.props.handleNewHorse(data);
      this.setState(this.getInitialState());
    })
  },

  render: function() {
    var curState = this.state;
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Name' name='name' value={curState.name} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Breed' name='breed' value={curState.breed} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Age' name='year' value={curState.year} onChange={this.handleChange} />
        <button type='submit' className='btn btn-primary' disabled={!this.valid()}>Add Horse</button>
        </div>
      </form>
    )
  }
})


// ===== // =====// =====// =====// =====// =====// =====// =====// =====// =====

this.Horse = React.createClass({
  getInitialState: function() {
    return { edit: false }
  },

  handleToggle: function(e) {
    e.preventDefault();
    this.setState({edit: !this.state.edit })
  },

  handleDelete: function(e) {
    e.preventDefault();
    var request = $.ajax({
      method: 'DELETE',
      url: "/horses/" + this.props.horse.id,
      dataType: 'JSON'
    });

    request.done( () => {
      this.props.handleDeleteHorse(this.props.horse)
    });
  },

  handleEdit: function(e) {
    e.preventDefault();
    var data = {
      name: ReactDOM.findDOMNode(this.refs.name).value,
      breed: ReactDOM.findDOMNode(this.refs.breed).value,
      age: ReactDOM.findDOMNode(this.refs.age).value
    }

    var request = $.ajax({
      method: 'PUT',
      url: "/horses/" + this.props.horse.id,
      dataType: 'JSON',
      data: { horse: data }
    });

    request.done( (data) => {
      this.setState({ edit: false });
      this.props.handleEditHorse(this.props.horse, data);
    })
  },

  render: function() {

  }
})








