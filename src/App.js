import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {PrivateKey, PublicKey, key} from 'bitsharesjs';
import { ChainConfig } from 'bitsharesjs-ws';

ChainConfig.address_prefix = 'VIN';


class GeneratedPair extends React.Component {
    render() {
        return (
            <div>
                <p>Public key: {this.props.publicKey}</p>
                <p>Private key: {this.props.privateKey}</p>
            </div>
        )
    }
}


class GeneratePairError extends React.Component {
    render() {
        return (
            <p>
                Something went wrong
            </p>
        )
    }
}


class GeneratorButton extends React.Component {
    render() {
        return (
            <button className="generate-button" onClick={() => this.generate()}>
                Generate VIN key
            </button>
        )
    }
    generate() {
        try {
            let pair = this.generatePair();
            ReactDOM.render(
                <GeneratedPair publicKey={pair.public_key} privateKey={pair.private_key} />,
                document.getElementById('generated-pair')
            );
        } catch (error) {
            console.log(error);
            ReactDOM.render(
                <GeneratePairError />,
                document.getElementById('generated-pair')
            );
        }
    }

    generatePair() {
        let d = PrivateKey.fromBuffer(key.random32ByteBuffer());
        let private_key = d.toWif();
        let public_key = d.toPublicKey().toString();

        PublicKey.fromStringOrThrow(public_key);

        if (PrivateKey.fromWif(private_key).toPublicKey().toString() !== public_key) {
            throw {message: 'Public key miss-match'};
        }

        console.log(public_key, private_key);

        return {public_key, private_key}
    }
}

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Vin keys generator</h1>
        </header>
        <div className="generator">
          <GeneratorButton />
        </div>
        <div id="generated-pair"></div>
      </div>
    );
  }
}

export default App;
