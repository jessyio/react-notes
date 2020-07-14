import React, { Component } from 'react'
import * as firebase from 'firebase';

export class Notes extends Component {
  //construtor establishes initial state inside component, takes argument props
  constructor (props){
    super(props);

    //this log checks what the 'constructor' component is receiving
    //it received that the temporary note had nothing sent to it (null in the array list)
    console.log(props)
  }

  //removing notes' reference in firebase data (backend)
  removeNote (id){
    firebase.database().ref('notes').child(id).remove();
  }

  render() {
    return (
      <section className = 'notes-wrapper'>
        <h3>Notes</h3>
        <div className = 'notes'>
          //use {} to write js
          //map each note to this jsx
          {this.props.notes.map(note => (

            //^looping everything in notes^
            //displays written notes' title, content, remove button
            //setting it to note.id because it's unique
            <div className = 'note' key = {note.id} >
              <div className = 'note-title'>
                <h3>{note.title}</h3>
                <div className="remove" onClick={() => this.removeNote(note.id)}>x</div>
              </div>
              <div className="note-content">
                <p>{note.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default Notes;
