import Notes from '../components/Notes';
import React, {Component} from 'react';
import * as firebase from 'firebase';

class UsersPage extends Component{
  constructor (props){
    super(props);

    //created a variable, a notes array
    this.note = []
  }

  componentDidMount (){
    //this.db = firebase.database();
    //this.note = this.db.get(this.note.id);

    var id = 'Hilda';

    //referencing the database; 'notes' is parent object
    var fb = firebase.database().ref('notes')

    //retrieve the note's title, which is == to the id above
    .orderByChild('title')
    .equalTo(id)

    //'value' is getting the value of the above 'orderByChild & equalTo' object
    //e.g., retrieving {id: "Harry", title:'HarryTitle'}
    .on('value', snapshot => {
      //setting it to a temporary value of id, title, tages and note retrieved from db
      //CURRENTLY REFERENCING THE NOTE INCORRECTLY AS THE CONSOLE.LOG BELOW SHOWS NULL IN THE ARRAY
      let snapshotNote = {
        id: snapshot.val().title,
        title: snapshot.val().title,
        tags: snapshot.val().tags,
        note: snapshot.val().note
      }

    //validating what the db object looks like
    console.log(snapshot.val());

    //validating what the temporary note looks like
    console.log('snapshotNote: ' + snapshotNote)

    //pushing the temporary note onto the array
    this.note.push(snapshotNote);

    console.log(this.note)
  })
  }

  render() {
    return (
      <div>
        <ul>
          {['Sally', 'John', 'Nathan'].map((user, idx) => {
            //function loops through the users
            return <li key={idx}>{user}</li>;
          })}
        </ul>
          <Notes notes={this.note}/>
      </div>
    );
  }

};

export default UsersPage;
