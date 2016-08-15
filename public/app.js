const TaskForm = React.createClass({
  render: function () {
    return (
      <form className="taskForm">
        HELLO
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
      <div classname="description">
        <h2 className="describe">
      </div>
    );
  }
});

const TaskList = React.createClass({
  render: function () {

  }
});

const TaskBox = React.createClass({
  render: function() {
    return (
      <div className="taskBox">
        <TaskList />
        <TaskForm />
      </div>
    );
  }
});

ReactDOM.render(
  <TaskBox url="/">,
  document.getElementById('app')
);