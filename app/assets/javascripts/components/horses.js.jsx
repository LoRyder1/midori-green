this.Horses = React.createClass({
  getInitialState: function() {
    return {
      horses: this.props.data
    };
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