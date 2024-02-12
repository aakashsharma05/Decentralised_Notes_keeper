import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper{

  public type Note={
    title :  Text;
    content : Text;
  };

  stable var notes : List.List<Note> = List.nil<Note>();

  public func createNote(noteTitle:Text,noteContent:Text)
  {
    var newNote:Note={
      title=noteTitle;
      content=noteContent;
    };
    notes := List.push(newNote,notes);
    Debug.print(debug_show(notes));
  };

  public query func readNotes(): async [Note]{
    return List.toArray(notes);
  };

  public func deleteNote(id :Nat){
    notes := List.append(List.take(notes,id),List.drop(notes,id+1));
    Debug.print(debug_show(notes));
  }

};
