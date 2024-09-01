import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import { useState, useRef, useEffect } from "react";

const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#634433",
});

const config = {
  composerPlaceholder: "What would you like to know?",
  botName: "Customer service",
  botAvatar: "https://picsum.photos/200/300",
  botDescription:
    "Hi! 👋 Welcome to webchat, this is some description talking about what it is. This might be a bit longer when expanded.",
  email: {
    title: "randomEmail@boptress.com",
    link: "mailto:randomEmail@boptress.com",
  },
  phone: {
    title: "555-555-5555",
    link: "tel:555-555-5555",
  },
  website: {
    title: "https://botpress.com",
    link: "https://botpress.com",
  },
  termsOfService: {
    title: "Terms of service",
    link: "https://botpress.com/terms",
  },
  privacyPolicy: {
    title: "Privacy policy",
    link: "https://botpress.com/privacy",
  },
};

// Add your Client ID here ⬇️
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
      console.log(messageContainer);// Adjust the selector if needed
      if (messageContainer) {
        messageContainer = " "; // Clears all chat messages
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
              right: "10px",  // Adjusted to avoid overlapping
              zIndex: 1000,
            }}
          />
        )}
        {isWebchatOpen && (
          <div
            ref={webchatRef}
            style={{
              width: "360px",   // Adjusted width
              height: "480px",  // Adjusted height
              position: "fixed",
              bottom: "70px",
              right: "10px",  // Adjusted to avoid overlapping
              zIndex: 1000,
              overflow: "hidden",  // Prevents overflow
            }}
          >
            <Webchat />
          </div>
        )}
      </WebchatProvider>
    </>
  );
};
