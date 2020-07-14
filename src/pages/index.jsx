import React from "react";
import { Link } from 'react-router-dom';
import { Graph } from "react-d3-graph";

import Header from '../components/Header';
import NotesForm from '../components/NotesForm';
import Notes from '../components/Notes';

const MainPage = (props) => {
  console.log(props)
  return (
    <div>
      <Header />
      <small> Main Page </small>
      <Link to='/users'>Show List of Users</Link>
      <NotesForm />
      <Notes notes={props.notes} />
      <Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={props.data}
          config={props.myConfig}
          // onClickNode={onClickNode}
          // onDoubleClickNode={onDoubleClickNode}
          // onRightClickNode={onRightClickNode}
          // onClickGraph={onClickGraph}
          // onClickLink={onClickLink}
          // onRightClickLink={onRightClickLink}
          // onMouseOverNode={onMouseOverNode}
          // onMouseOutNode={onMouseOutNode}
          // onMouseOverLink={onMouseOverLink}
          // onMouseOutLink={onMouseOutLink}
          // onNodePositionChange={onNodePositionChange}
      />
    </div>
  );
};

export default MainPage;
