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

  render: function() {
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
          </tbody>
        </table>
      </div>
    )
  }
})