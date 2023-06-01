import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFreeCodeCamp } from '@fortawesome/free-brands-svg-icons';
import { faMaximize, faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons';
import '../assets/ContentBox.scss'

function ContentBox({ children, title, handleExpandedBox, hide, maximize }) {
  const [isExpanded, setIsExpanded] = useState("false");

  function handleExpand(boxName) {
    setIsExpanded(!isExpanded);
    handleExpandedBox(boxName);
  }

  return (
    <>
      <div
        className={`content-box ${hide ? "hidden-box" : ""} ${
          maximize ? "expanded-box" : ""
        }`}
      >
        <div className="content-box--header">
          <FontAwesomeIcon icon={faFreeCodeCamp} />
          <span className="content-box--header__title">{title}</span>
          {isExpanded ? (
            <FontAwesomeIcon
              onClick={() => handleExpand(title)}
              className="expand"
              icon={faMaximize}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => handleExpand(title)}
              className="shrink"
              icon={faDownLeftAndUpRightToCenter}
            />
          )}
        </div>
        <div className="content-box--body">{children}</div>
      </div>
    </>
  )
}

export default ContentBox