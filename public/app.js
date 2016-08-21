const TaskForm = React.createClass({
  getInitialState: function () {
    return {
      title: '',
      description: '',
      createdBy: '',
      assignedTo: '',
      priority: '',
      status:''
    };
  },
  handleTitleChange: function (e) {
    this.setState({ title: e.target.value });
  },
  handleDescriptionChange: function (e) {
    this.setState({ description: e.target.value });
  },
  handleCreatedByChange: function (e) {
    this.setState({ createdBy: e.target.value });
  },
  handleAssignedToChange: function (e) {
    this.setState({ assignedTo: e.target.value });
  },
  handlePriorityChange: function (e) {
    this.setState({ priority: e.target.value });
  },
  handleStatusChange: function (e) {
    this.setState({ status: e.target.value });
  },
  handleSubmit: function (e) {
    e.preventDefault();

    let title = this.state.title.trim();
    let description = this.state.description.trim();
    let createdBy = this.state.createdBy.trim();
    let assignedTo = this.state.assignedTo.trim();
    let priority = this.state.priority.trim();
    let status = this.state.status.trim();

    if ( !title || !description || !createdBy || !assignedTo || !priority || !status) {
      return;
    }
    this.props.onTaskSubmit({
      title: title,
      description: description,
      user_id: createdBy,
      assignedTo: assignedTo,
      priority: priority,
      status_id: status
    });
    this.setState({
      title: '',
      description: '',
      createdBy: '',
      assignedTo: '',
      priority: '',
      status: ''
    });
  },
  render: function () {
    return (
      <form className="taskForm" onSubmit= { this.handleSubmit }>
        <label>
          Title:
          <input
            type="text"
            placeholder="Title"
            value={ this.state.title }
            onChange={ this.handleTitleChange }
          />
        </label>
        <label>
          Description:
          <textarea
            type="text"
            placeholder="Description"
            value={ this.state.description }
            onChange={ this.handleDescriptionChange }
          />
        </label> 
        <label>
          Created By:
          <input
            type="text"
            placeholder="Created By"
            value={ this.state.createdBy }
            onChange={ this.handleCreatedByChange }
          />
        </label>
        <label>
          Assigned To: 
          <input
            type="text"
            placeholder="Assigned To"
            value={ this.state.assignedTo }
            onChange={ this.handleAssignedToChange }
          />
        </label>
        <label>
          Priority
          <input
            type="text"
            placeholder="Priority"
            value={ this.state.priority }
            onChange={ this.handlePriorityChange }
          />
        </label>
        <label>
          Status
          <br />
          <select
            value={ this.state.status }
            onChange={ this.handleStatusChange }
          >
          <option>Option1</option>
          <option>Option2</option>
          <option>Option3</option>
          </select>
        </label>
        <input
          type="submit"
          value="Post"
          className="submitPost"
        />
      </form>
    );
  }
});

const Task = React.createClass({
  render: function () {
    return (
      <div className="boxes">
        <span className="priority">
          { this.props.priority }
        </span>
        <h3 className="statusTitle">
          { this.props.status }
        </h3>
        <h2 className="taskTitle">
          { this.props.title }
        </h2>
        <p className="description">
          { this.props.description }
        </p>
        <h3 className="createdBy">
          { this.props.createdBy }
        </h3>
        <span className="assignedTo">
          { this.props.assignedTo }
        </span>
        <button
          type="button"
          className="deleteButton"
          onClick={ (e) => {
            this.props.delete(this.props.id); 
          }}
        >
        Delete
        </button>
      </div>
    );
  }
});

const TaskList = React.createClass({
  render: function () {
    const taskNodes = this.props.data.map( (task, index)=> {
      return (
        <Task
          key={ task.id }
          id={ task.id }
          title={ task.title }
          description={ task.description }
          createdBy={ task.user_id }
          assignedTo={ task.assignedTo }
          priority={ task.priority }
          status={ task.status_id }
          delete={ this.props.onTaskDelete }
        >
         { task.text }
        </Task>
      );
    });
    return (
      <div className="taskList">
        { taskNodes.reverse() }
      </div>
    );
  }
});

const TaskBox = React.createClass({
  loadTasksFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadStatusFromServer: function () {
    console.log(this);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      succes: function (status) {
        this.setState({ status_id: status });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTaskSubmit: function (task) {
    const tasks = this.state.data;
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: task,
      success: function (data) {
        const allTasks = tasks.concat([data]);
        this.setState({ data: allTasks });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return { 
      data: [],
      status_id: []
    }
  },
  deleteTask: function (id) {
    // const self = this;
    $.ajax({
      url: '/tasks/' + id,
      type: 'DELETE',
      success: (result) => {
        // arrow function allows you to access the parent function.
        console.log(result);
        this.setState({ data: result });
      }
    });
  },
  componentDidMount: function () {
    this.loadTasksFromServer();
    this.loadStatusFromServer();
  },
  render: function() {
    console.log(this.state.status_id);
    return (
      <div className="taskBox">
        <TaskList data={ this.state.data } 
          onTaskDelete={ this.deleteTask }
          statuses={ this.state.status_id }
        />
        <TaskForm onTaskSubmit={ this.handleTaskSubmit }/>
      </div>
    );
  }
});

ReactDOM.render(
  <TaskBox url="/tasks" />,
  document.getElementById('app')
);