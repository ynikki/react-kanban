const TaskForm = React.createClass({
  getInitialState: function () {
    return {
      title: '',
      description: '',
      createdBy: '',
      assignedTo: '',
      priority: ''
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
  handleSubmit: function (e) {
    e.preventDefault();

    let title = this.state.title.trim();
    let description = this.state.description.trim();
    let createdBy = this.state.createdBy.trim();
    let assignedTo = this.state.assignedTo.trim();
    let priority = this.state.priority.trim();

    if(!title || !description || !createdBy || !assignedTo || !priority) {
      return;
    }
    this.props.onCommentSubmit({
      title: title,
      description: description,
      createdBy: createdBy,
      assignedTo: assignedTo,
      priority: priority
    });
    this.setState({
      title: '',
      description: '',
      createdBy: '',
      assignedTo: '',
      priority: ''
    });
  },
  render: function () {
    return (
      <form className="taskForm" onSubmit= { this.handleSubmit }>
        Title: 
        <input
          type="text"
          placeholder="Title"
        />
        Description: 
        <input
          type="text"
          placeholder="Description"
        />
        Created By: 
        <input
          type="text"
          placeholder="Created By"
        />
        Assigned To: 
        <input
          type="text"
          placeholder="Assigned To"
        />
        Priority
        <input
          type="text"
          placeholder="Priority"
        />
        <input
          type="submit"
          value="Post"
        />
      </form>
    );
  }
});

const Task = React.createClass({
  render: function () {
    return (
      <div className="title">
        <h2 className="taskTitle">
          Title Goes Here
        </h2>
      </div>
    );
  }
});

const TaskList = React.createClass({
  render: function () {
    return (
      <div className="taskList">
      THE LIST
      </div>
    );
  }
});

const TaskBox = React.createClass({
  render: function() {
    return (
      <div className="taskBox">
        <TaskForm />
        <TaskList />
      </div>
    );
  }
});

ReactDOM.render(
  <TaskBox url="/task/new" />,
  document.getElementById('app')
);