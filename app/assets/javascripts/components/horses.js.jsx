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

  
})




