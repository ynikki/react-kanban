const TaskForm = React.createClass({
  render: function () {
    return (
      <form className="taskForm" onSubmit= { this.handleSubmit }>
        <input
          type="text"
          placeholder="Title"
        />
        <input
          type="text"
          placeholder="Description"
        />
        <input
          type="text"
          placeholder="Created By"
        />
        <input
          type="text"
          placeholder="Assigned To"
        />
        <input
          type="text"
          placeholder="Created By"
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