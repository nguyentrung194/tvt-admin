const local = {
  domain: "https://fashion-trend-store.web.app",
  httpGrapqlUri: "https://fashion-trend-v2.hasura.app/v1/graphql",
  wsGrapqlUri: "wss://fashion-trend-v2.hasura.app/v1/graphql",
  firebase: {
    apiKey: "AIzaSyAlVjZX-mR0uXLE6Oje4Pwg0HXfHSsK62Q",
    authDomain: "fashion-trend-store.firebaseapp.com",
    projectId: "fashion-trend-store",
    storageBucket: "fashion-trend-store.appspot.com",
    messagingSenderId: "62813207555",
    appId: "1:62813207555:web:6e8dfb0927e4a11f016236",
    measurementId: "G-KQG5GHE5VG"
  },
};

const staging = {
  domain: "https://fashion-trend-store.web.app",
  httpGrapqlUri: "https://fashion-trend-v2.hasura.app/v1/graphql",
  wsGrapqlUri: "wss://fashion-trend-v2.hasura.app/v1/graphql",
  firebase: {
    apiKey: "AIzaSyAlVjZX-mR0uXLE6Oje4Pwg0HXfHSsK62Q",
    authDomain: "fashion-trend-store.firebaseapp.com",
    projectId: "fashion-trend-store",
    storageBucket: "fashion-trend-store.appspot.com",
    messagingSenderId: "62813207555",
    appId: "1:62813207555:web:6e8dfb0927e4a11f016236",
    measurementId: "G-KQG5GHE5VG",
  },
};

const prod = {
  domain: "https://fashion-trend-store.web.app",
  httpGrapqlUri: "https://fashion-trend-v2.hasura.app/v1/graphql",
  wsGrapqlUri: "wss://fashion-trend-v2.hasura.app/v1/graphql",
  firebase: {
    apiKey: "AIzaSyAlVjZX-mR0uXLE6Oje4Pwg0HXfHSsK62Q",
    authDomain: "fashion-trend-store.firebaseapp.com",
    projectId: "fashion-trend-store",
    storageBucket: "fashion-trend-store.appspot.com",
    messagingSenderId: "62813207555",
    appId: "1:62813207555:web:6e8dfb0927e4a11f016236",
    measurementId: "G-KQG5GHE5VG",
  },
};

let envConfig = local;

if (process.env.REACT_APP_STAGE === "staging") {
  envConfig = staging;
} else if (process.env.REACT_APP_STAGE === "prod") {
  envConfig = prod;
} else {
  envConfig = local;
}

const environment = envConfig;

export default environment;
