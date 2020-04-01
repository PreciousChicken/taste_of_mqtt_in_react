import React, { useState, Fragment } from 'react';
import './App.css';

var mqtt    = require('mqtt');
var options = {
	protocol: 'mqtts',
	// clientId uniquely identifies client
	// choose any string you wish
	clientId: 'b0908853' 	
};
var client  = mqtt.connect('mqtt://test.mosquitto.org:8081', options);

// preciouschicken.com is the MQTT topic
client.subscribe('preciouschicken.com');

function App() {
  var note;
  client.on('message', function (topic, message) {
    note = message.toString();
    // Updates React state with message 
    setMesg(note);
    console.log(note);
    client.end();
    });

  // Sets default React state 
  const [mesg, setMesg] = useState(<Fragment><em>nothing heard</em></Fragment>);

  return (
    <div className="App">
    <header className="App-header">
    <h1>A taste of MQTT in React</h1>
    <p>The message is: {mesg}</p>
    <p>
		<a href="https://www.preciouschicken.com/blog/posts/a-taste-of-mqtt-in-react/">preciouschicken.com/blog/posts/a-taste-of-mqtt-in-react/</a>
		</p>
    </header>
    </div>
  );
}

export default App;
