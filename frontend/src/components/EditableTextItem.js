import { useEffect, useState, useRef } from 'react';

const EditableTextItem = ({ initialText, handleSubmit, identifier }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const inputRef = useRef(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = (e) => {
    setIsEditing(false);
    handleSubmit(identifier, e);
    // Save the changes or perform any required actions here
  };

  // Focus the input field when editing starts
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={inputRef}
        />
      ) : (
        <span>Task: {text}</span>
      )}
    </div>
  );
};

export default EditableTextItem;
