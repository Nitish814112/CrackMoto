import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import { useState, useRef, useEffect } from "react";

const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#634433",
});

const config = {
  composerPlaceholder: "What would you like to know?",
  botName: "Alexa",
  botAvatar: "https://picsum.photos/200/300",
  botDescription:
    "Hi! 👋 Welcome to webchat",
  email: {
    title: "n814112@gmail.com",
    link: "mailto:n814112@gmail.com",
  },
  phone: {
    title: "88-606-69143",
    link: "tel:+91-88-606-69143",
  },
 
  termsOfService: {
    title: "Terms of service",
    link: "N/A",
  },
  privacyPolicy: {
    title: "Privacy policy",
    link: "NA",
  },
};

const clientId = "949799ed-fc75-470d-9fc5-f1a5a391b8c8";

export const Bot = () => {
  const client = getClient({ clientId });
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  const webchatRef = useRef(null);

  const openWebchat = () => {
    setIsWebchatOpen(true);
  };

  const closeWebchat = () => {
    setIsWebchatOpen(false);
  };

  const clearMessages = () => {
    const webchatElement = webchatRef.current;
    if (webchatElement) {
      let messageContainer = webchatElement.querySelector('.bpModalContainer'); 
      console.log(messageContainer);
      if (messageContainer) {
        messageContainer = " "; 
      }
    }
  };

  useEffect(() => {
    const handleWebchatClose = () => {
      clearMessages();
      closeWebchat();
    };

    const webchatElement = webchatRef.current;

    if (webchatElement) {
      const intervalId = setInterval(() => {
        const closeButton = webchatElement.querySelector('svg[fill="none"]');
        if (closeButton) {
          closeButton.addEventListener("click", handleWebchatClose);
          clearInterval(intervalId);
        }
      }, 100);
    }

    return () => {
      if (webchatElement) {
        const closeButton = webchatElement.querySelector('svg[fill="none"]');
        if (closeButton) {
          closeButton.removeEventListener("click", handleWebchatClose);
        }
      }
    };
  }, [isWebchatOpen]);

  return (
    <>
      <style>{style}</style>
      <WebchatProvider
        key={JSON.stringify(config)}
        theme={theme}
        configuration={config}
        client={client}
      >
        {!isWebchatOpen && (
          <Fab
            onClick={openWebchat}
            style={{
              position: "fixed",
              bottom: "70px",
              right: "10px",  
              zIndex: 1000,
            }}
          />
        )}
        {isWebchatOpen && (
          <div
            ref={webchatRef}
            style={{
              width: "360px",   
              height: "480px",  
              position: "fixed",
              bottom: "70px",
              right: "10px",  
              zIndex: 1000,
              overflow: "hidden",  
            }}
          >
            <Webchat />
          </div>
        )}
      </WebchatProvider>
    </>
  );
};
