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
    const statusesOption = this.props.statusTypes.map((status,index) => {
      return (
        <option
          key={ index }
          value={ status.id }
        >
          { status.name }
        </option>
      )
    });
    return (
      <div className="taskFormBox">
        <div className="top">
          <h3 className="taskText">Task</h3>
        </div>
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
            <select
              value={ this.state.priority }
              onChange={ this.handlePriorityChange }
              className="priorityOptions"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <br/>
          <label>
            Status
            <span className="choices">
              <select
                value={ this.state.status }
                onChange={ this.handleStatusChange }
                className="statusChoices"
              >
                { statusesOption }
              </select>
            </span>
          </label>
          <input
            type="submit"
            value="Post"
            className="submitPost"
          />
        </form>
      </div>
    );
  }
});

const Task = React.createClass({
  render: function () {
    return (
      <div className="boxes">
        <h2 className="statusTitle">
          { this.props.status_id }
        </h2>
        <button
          type="button"
          className="deleteButton"
          onClick={ (e) => {
            this.props.delete(this.props.id); 
          }}
        >
        x
        </button>
        <span className="priority">
          <h1>PRIORITY:</h1> 
          { this.props.priority }
        </span>
        <h2 className="taskTitle">
          { this.props.title }
        </h2>
        <p className="description">
          { this.props.description }
        </p>
        <span className="createdBy">
          <h1>CREATED BY:</h1>
          { this.props.createdBy }
        </span>
        <span className="assignedTo">
          <h1>ASSIGNED TO:</h1>
          { this.props.assignedTo }
        </span>
         <button
          type="button"
          className="editButton"
          onClick={ (e) => {
            this.props.edit(
              this.props.id,
              this.props.statusId - 1
            ); 
          }}
        >
        LEFT
        </button>
        <button
          type="button"
          className="editButton"
          onClick={ (e) => {
            this.props.edit(
              this.props.id,
              this.props.statusId +1
            ); 
          }}
        >
        RIGHT
        </button>
      </div>
    );
  }
});

const TaskListQueue = React.createClass({
  render: function () {
    const taskNodes = this.props.data.map( (task, index)=> {
      if( task.status_id === 1) { 
        return (
          <Task
            key={ task.id }
            id={ task.id }
            statusId={ task.status_id }
            title={ task.title }
            description={ task.description }
            createdBy={ task.user_id }
            assignedTo={ task.assignedTo }
            priority={ task.priority }
            delete={ this.props.onTaskDelete }
            edit={ this.props.onTaskChange }
          >
           { task.text }
          </Task>
        );
      }
    });
    return (
      <div className="queue">
        { taskNodes.reverse() }
      </div>
    );
  }
});

const TaskListProgress = React.createClass({
  render: function () {
    const taskNodes = this.props.data.map( (task, index)=> {
      if(task.status_id === 2){
        return (
          <Task
            key={ task.id }
            id={ task.id }
            statusId={ task.status_id }
            title={ task.title }
            description={ task.description }
            createdBy={ task.user_id }
            assignedTo={ task.assignedTo }
            priority={ task.priority }
            delete={ this.props.onTaskDelete }
            edit={ this.props.onTaskChange }
          >
           { task.text }
          </Task>
        );
      }
    });
    return (
      <div className="progress">
        { taskNodes.reverse() }
      </div>
    );
  }
});

const TaskListDone = React.createClass({
  render: function () {
    const taskNodes = this.props.data.map( (task, index)=> {
      if(task.status_id === 3) {
        return (
          <Task
            key={ task.id }
            id={ task.id }
            statusId={ task.status_id }
            title={ task.title }
            description={ task.description }
            createdBy={ task.user_id }
            assignedTo={ task.assignedTo }
            priority={ task.priority }
            delete={ this.props.onTaskDelete }
            edit={ this.props.onTaskChange }
          >
           { task.text }
          </Task>
        );
      }
    });
    return (
      <div className="done">
        { taskNodes.reverse() }
      </div>
    );
  }
});

const TaskBox = React.createClass({
  getInitialState: function () {
    return { 
      data: [],
      status: []
    }
  },
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
    $.ajax({
      url: '/tasks/statuses',
      dataType: 'json',
      cache: false,
      success: function (status) {
        this.setState({ status: status });
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
  deleteTask: function (id) {
    // const self = this;
    $.ajax({
      url: '/tasks/' + id,
      type: 'DELETE',
      success: (result) => {
        // arrow function allows you to access the parent function.
        this.setState({ data: result });
      }
    });
  },
  changeTask: function (id, nextStatusId) {
    $.ajax({
      url: '/tasks/' + id,
      dataType: 'json',
      type: 'PUT',
      data: { statusId: nextStatusId },
      succes: (result) => {
        this.setState({ data: result });
      }
    });
  },
  componentDidMount: function () {
    this.loadTasksFromServer();
    this.loadStatusFromServer();
  },
  render: function() {
    return (
      <div className="taskBox">
        <div className="statusBoxes">
          <div className="queueStatus">
            <div className="que">
              <h3>QUEUE</h3>
            </div>
            <TaskListQueue data={ this.state.data } 
              onTaskDelete={ this.deleteTask }
              onTaskChange={ this.changeTask }

            />
          </div>
          <div className="progressStatus">
            <div className="progress">
              <h3>PROGRESS</h3>
            </div>
            <TaskListProgress data={ this.state.data } 
              onTaskDelete={ this.deleteTask }
              onTaskChange={ this.changeTask }

            />
          </div>
          <div className="doneStatus">
            <div className="done">
              <h3>DONE</h3>
            </div>
            <TaskListDone data={ this.state.data } 
              onTaskDelete={ this.deleteTask }
              onTaskChange={ this.changeTask }
            />
          </div>
        </div>
        <TaskForm onTaskSubmit={ this.handleTaskSubmit }
          statusTypes={ this.state.status }
        />
      </div>
    );
  }
});

ReactDOM.render(
  <TaskBox url="/tasks" />,
  document.getElementById('app')
);