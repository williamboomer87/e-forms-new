import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Question = (props) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (props.withEffect) {
      let currentText = '';
      let currentIndex = 0;

      const timer = setInterval(() => {
        if (currentIndex < props.text.length) {
          currentText += props.text[currentIndex];
          setDisplayText(currentText);
          currentIndex++;

          if (currentIndex === 40) { // Change the value (20) to your desired number of letters (After print all)
            clearInterval(timer);
            setDisplayText(props.text);
          }
        } else {
          clearInterval(timer);
        }
      }, 100); // Adjust the delay (in milliseconds) between each letter display if needed

      return () => {
        clearInterval(timer);
      };
    } else {
      setDisplayText(props.text);
    }
  }, [props.text, props.withEffect]);

  return (
    <div className="middle-content-box-section-1 p-3 rounded-3 mt-2">
      <div className="row">
        <div className="col-1">
          <Image src="/images/chat-symbol-Group.svg" alt="My Image" width={30} height={30} />
        </div>
        <div className="col-11">
          <p className="text-start">{displayText}</p>
        </div>
      </div>
    </div>
  );
};

export default Question;
