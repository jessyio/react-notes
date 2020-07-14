import React, {Component} from 'react';
import * as firebase from 'firebase';

//import Header from './components/Header';
//import Header from './components/NotesForm';

export class NotesForm extends Component {
  //constructor establishes initial state inside component
  constructor (){
    super();

    //sets initial state, which represents the value of the new items being inputed and the items that should show in the notes
    this.state = {
      title: '',
      note: ''
    }
    //binds createNote with "this" because "this" will go to the global state (the class)
    this.createNote = this.createNote.bind(this);
  }

  //combining the function to handle both title and content
  onChangeHandler(evt, key){
    //takes a js object as its argument
    this.setState({
      //provide key value pairs of items within the state to update
      //react then takes your objects and merge with state objects (don't have to re-establish state)

      //pass the event of note title and content keys
      //target is the input field below
      [key]: evt.target.value
    })
  }

   createNote (){
     const re = /(?<=#)[^\s]+/gm
     // parse data to get tags....
     if (this.state.title !== '' && this.state.note !== ''){
       //.ref defines where to save on firebase (inside file root notes)
       //.push passes through the object title, note, tags; firebase then generates a key
       firebase.database().ref('notes').push({
         title: this.state.title,
         note: this.state.note,
         tags: Array.from(this.state.note.matchAll(re), m=>m[0])
       }).then(() => {
         this.setState({title:'', note:''})
       })
     }
   }

  //renders through all jsx into html, called at component initialization and when component state updates
  //actual user interface
  render() {
    return (
      //fuck "divs", that's old school. let's use "sections"
      <section className = "noteform">
        <h3> Today's notes </h3>
        <div className = 'form-group'>
          <label htmlFor = 'noteform-title'>Title</label>
          <input type = 'text' id = 'noteform-title' name='noteform-title' value = {this.state.title}
          onChange = {(evt) => this.onChangeHandler(evt, 'title')} />
        </div>
        <div className = 'form-group'>
          <label htmlFor = 'noteform-note'>Note</label>
          <textarea name = 'noteform-note' id = 'noteform-note'value = {this.state.note}
          onChange = {(evt) => this.onChangeHandler(evt, 'note')}></textarea>
        </div>
        <button onClick={this.createNote}> Create Note </button>
      </section>
    )
  }
}

export default NotesForm;
