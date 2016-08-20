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
        </label>
        <input
          type="text"
          placeholder="Title"
          value={ this.state.title }
          onChange={ this.handleTitleChange }
        />
        <label>
          Description:
        </label> 
        <input
          type="text"
          placeholder="Description"
          value={ this.state.description }
          onChange={ this.handleDescriptionChange }
        />
        <label>
          Created By:
        </label>
        <input
          type="text"
          placeholder="Created By"
          value={ this.state.createdBy }
          onChange={ this.handleCreatedByChange }
        />
        <label>
          Assigned To: 
        </label>
        <input
          type="text"
          placeholder="Assigned To"
          value={ this.state.assignedTo }
          onChange={ this.handleAssignedToChange }
        />
        <label>
          Priority
        </label>
        <input
          type="text"
          placeholder="Priority"
          value={ this.state.priority }
          onChange={ this.handlePriorityChange }
        />
        <label>
          Status
        </label>
        <input
          type="text"
          placeholder="Status"
          value={ this.state.status }
          onChange={ this.handleStatusChange }
        />
        <input
          type="submit"
          value="Post"
          className="submit"
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
      </div>
    );
  }
});

const TaskList = React.createClass({
  render: function () {
    const taskNodes = this.props.data.map(function (task, index) {
      return (
        <Task
          key={ index }
          title={ task.title }
          description={ task.description }
          createdBy={ task.user_id }
          assignedTo={ task.assignedTo }
          priority={ task.priority }
          status={ task.status_id }
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
    return { data: [] }
  },
  deleteTask: function (id) {
    const ids = this;
    $.ajax({
      url: '/tasks/' + this.props.id + id,
      type: 'DELETE',
      success: function (result) {
        const tasks = self.state.tasks;
        tasks.splice(id, 1);
        self.setState({ tasks: tasks });
      }
    });
  },
  componentDidMount: function () {
    this.loadTasksFromServer();
  },
  render: function() {
    return (
      <div className="taskBox">
        <TaskList data={ this.state.data } />
        <TaskForm onTaskSubmit={ this.handleTaskSubmit }/>
      </div>
    );
  }
});

ReactDOM.render(
  <TaskBox url="/tasks" />,
  document.getElementById('app')
);