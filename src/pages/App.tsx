import {
  IonContent,
  IonHeader,
  IonIcon, IonPage, IonTitle,
  IonToolbar, IonFab,
  IonFabButton, InputCustomEvent,
  InputChangeEventDetail
} from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { Component } from "react";
import { Counter } from './Home';

export class App extends Component {
  state = {
    counters: [
      {
        title: "Pompes du mois",
        content: 110,
        pas: 10,
      },
      {
        title: "Grains de riz",
        content: 1,
        pas: 1,
      }
    ],
    newCountersCounter: 0
  };
  listRef: any;

  add = (idx: number) => {
    let newCounters = [...this.state.counters];
    newCounters[idx].content += this.state.counters[idx].pas;
    this.setState({
      counters: newCounters
    });
  };
  sub = (idx: number) => {
    let newCounters = [...this.state.counters];
    newCounters[idx].content -= this.state.counters[idx].pas;
    this.setState({
      counters: newCounters
    });
  };
  addCounter = () => {
    console.log("adding a new counter...");
    this.state.newCountersCounter += 1;
    let newCountersList = [...this.state.counters];
    newCountersList.push({
      title: `Nouveau compteur ${this.state.newCountersCounter}`,
      content: 0,
      pas: 1,
    });

    this.setState({
      counters: newCountersList
    });
  };
  handleInputChange = (idx: number, event: InputCustomEvent<InputChangeEventDetail>) => {
    console.log(`input changes on idx: ${idx} at counter: ${event}`);
    let newCounters = [...this.state.counters];
    newCounters[idx].title = event.detail.value;
    this.setState({
      counters: newCounters
    });
  };


  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Professional Counter App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent ref={me => (this.listRef = me)}>
          {this.state.counters.map((counterItem, idx) => {
            return (
              <Counter
                counter={counterItem}
                idx={idx}
                methods={{
                  add: () => this.add(idx),
                  sub: () => this.sub(idx),
                  handleInputChange: () => this.handleInputChange(idx, event)
                }} />
            );
          })}
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={() => this.addCounter()}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
}
