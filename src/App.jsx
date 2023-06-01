import { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { defaultText } from './helpers/utils';
import ContentBox from './components/ContentBox';
import './assets/App.scss';

function App() {
  const [markedText, setMarkedText] = useState(defaultText);
  const [hideEditor, setHideEditor] = useState(false);
  const [hidePreviewer, setHidePreviewer] = useState(false);

  function changeMarkedText(event) {
    const { value } = event.target;
    setMarkedText(value);
  }

  function handleExpandedBox(boxTitle) {
    if (boxTitle === "Editor") {
      setHidePreviewer(!hidePreviewer);
    } else if (boxTitle === "Previewer") {
      setHideEditor(!hideEditor);
    }
  }

  useEffect(() => {
    document.getElementById("preview").innerHTML = DOMPurify.sanitize(
      marked.parse(markedText)
    );
  }, [markedText]);

  return (
    <>
      <div className="markdown--wrapper">
        <ContentBox
          title="Editor"
          handleExpandedBox={handleExpandedBox}
          hide={hideEditor}
          maximize={hidePreviewer}
        >
          <textarea
            id="editor"
            name="editor"
            type="text"
            spellCheck="false"
            rows="5"
            cols="50"
            onChange={changeMarkedText}
            defaultValue={defaultText}
          ></textarea>
        </ContentBox>
        <ContentBox
          title="Previewer"
          handleExpandedBox={handleExpandedBox}
          hide={hidePreviewer}
          maximize={hideEditor}
        >
          <div className="previewer--text">
            <div id="preview"></div>
          </div>
        </ContentBox>
      </div>
    </>
  )
}

export default App
