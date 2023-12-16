import { useEffect, useState, useRef } from 'react';

const EditableTextItem = ({ initialText, handleSubmit, identifier }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const inputRef = useRef(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  /** @param {Event} e */
  const handleChange = (e) => {
    setText(e.target.value);
  };

  /** @param {Event} e */
  const handleBlur = (e) => {
    setIsEditing(false);
    handleSubmit(identifier, e);
  };

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
        <div>
          {text === '' ?
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setIsEditing(true)}>
              Name task
            </button> :
            <span title="Double click to edit">{text}</span>
          }
        </div>
      )}
    </div>
  );
};

export default EditableTextItem;
