import React, {Component} from 'react';
import * as firebase from 'firebase';
//import { Graph } from "react-d3-graph";

import Header from './components/Header';
import NotesForm from './components/NotesForm';
import Notes from './components/Notes';
//import NotesGraph from './components/NotesGraph';

// deliverables:
// 1. separate tag's page displaying own note
// 2. auto-generate page off of new tag
// 3. click on tag will route to tag's page
// 4. tag's page displaying all attached notes and their respective tags
//
// more to have:
// 5. autosave while editing
// 6. editable notes with prosemirror
// 7. public can view specific notes/all note's graphs (through a link?)
//
// future state:
// 8. can invite others to your knowledge base and tag them
// 9. graph filters
// 10. wikipedia linkage

import { BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect } from 'react-router-dom';

//pages
import MainPage from "./pages";
import NotFoundPage from "./pages/404";
import UsersPage from "./pages/users";

class App extends Component {
  //constructor establishes initial state inside component
  constructor (){
    super();

    //establish initial state
    this.state = {
      //at the moment, need to have at least one element in note to kickstart the render process
      notes: [{id: "Harry", title:'HarryTitle'}, {id: "Sally"}, {id: 'Jessy'}],
      links: [{source: "Harry", target: "Sally"}]
    }
  }

  componentDidMount (){
    this.db = firebase.database();
    this.listenForChange();
  }

  //adding the note from the frontend (displaying it)
  listenForChange (){
    //reloads every time to loop through the array of notes in the database
    //this.db is the firebase database
    //.ref is the reference to the "notes", the parent of other child notes "keys"
    //every time a child note is added to the note, this function is called
    this.db.ref('notes').on('child_added', snapshot => {

      const title = snapshot.val()
      //creating a note (id, title, content) when each child is added
      let note = {
        id: snapshot.val().title,
        title: snapshot.val().title,
        tags: snapshot.val().tags,
        note: snapshot.val().note
      }

      let notes = [...this.state.notes];
      //pushes notes to go after the previous notes
      notes.push(note);
      console.log(notes)

      let links = [...this.state.links];
      console.log('snapshot' + snapshot.val())
      if (snapshot.val().tags) {
        snapshot.val().tags.forEach(t => {
          //loops through notes and lowercases all notes temporaily for comparison
          var target_note = notes.find(note => {
            console.log(note)
          return note.id.toLowerCase() === t.toLowerCase()
        })
          links.push({source: snapshot.val().title, target: target_note.id})
        });
      }

      this.setState({
        notes,
        links
      });
    });

    //deleting the note from the frontend (removing it)
    this.db.ref('notes').on('child_removed', snapshot => {

      //remove note from frontend if note = id
      let notes = this.state.notes;
      //if note != id, add to 'notes' array
      //if note == key, remove
      notes = notes.filter(note => note.id !== snapshot.key);

      //set state back to notes
      this.setState({
        notes: notes
      });
    });
  }


  render() {
    //console.log(this)
    //graph payload (with minimalist structure)
    let data = {
        //this.state.notes
        //[{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }]
        nodes: this.state.notes,
        links: this.state.links,
        //
        // links: [
        //     { source: "Harry", target: "Sally" },
        //     { source: "Harry", target: "Alice" },
        // ],
    };

// phase 1
// props {
//  this.note.id;
//}

// phase 2
// onClick() {
//  this.note.id = <el>id</el>
//}

    return (
      <Router>
        <Switch>
        //once hit the route path, react router will define, grab and render component "MainPage"
        <Route exact path = '/' component={() => <MainPage notes={this.state.notes} data={data} myConfig={myConfig}/>}  />

        //only renders if no component above matches, displays 404
        <Route exact path='/404' component={NotFoundPage} />

        <Route exact path='/users' component={() => <UsersPage notes={this.state.notes} data={data} myConfig={myConfig}/>} />

        //reidrects not found link to 404
        <Redirect to='/404' />
        </Switch>
      </Router>
    );


    return (
      <div className='App'>
        <Header />
        <main>
          <NotesForm />
          <Notes notes={this.state.notes} />
        </main>
      </div>
    );
  }
}


// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: "yellow",
        size: 120,
        highlightStrokeColor: "black",
    },
    link: {
        highlightColor: "white",
    },
};

// graph event callbacks
/*const onClickGraph = function() {
    window.alert(`Clicked the graph background`);
};

const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
};

const onDoubleClickNode = function(nodeId) {
    window.alert(`Double clicked node ${nodeId}`);
};

const onRightClickNode = function(event, nodeId) {
    window.alert(`Right clicked node ${nodeId}`);
};

const onMouseOverNode = function(nodeId) {
    window.alert(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function(nodeId) {
    window.alert(`Mouse out node ${nodeId}`);
};

const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
};

const onRightClickLink = function(event, source, target) {
    window.alert(`Right clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function(source, target) {
    window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function(source, target) {
    window.alert(`Mouse out link between ${source} and ${target}`);
};

const onNodePositionChange = function(nodeId, x, y) {
    window.alert(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
};*/



export default App;
