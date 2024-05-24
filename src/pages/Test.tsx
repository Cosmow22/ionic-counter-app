import { 
  IonButton, 
  IonCard, 
  IonCardContent, 
  IonCardTitle, 
  IonCheckbox, 
  IonCol, 
  IonContent,
  IonHeader, 
  IonIcon, 
  IonItem, 
  IonItemOption, 
  IonItemOptions, 
  IonItemSliding, 
  IonLabel, 
  IonList, 
  IonPage, 
  IonRow, 
  IonTitle, 
  IonToolbar,
  IonGrid, 
  IonText,
  IonFab,
  IonFabButton,
  IonButtons,
  IonFooter,
  IonInput,
  InputCustomEvent,
  InputChangeEventDetail} from '@ionic/react';
import { heart, trash, caretUp, caretDown, add, personCircle, helpCircle } from 'ionicons/icons';
import React, { Component, FormEvent } from "react";
import 'hammerjs';
import { useLongPress } from 'react-use';
//import './Test.css';



function Counter({ idx, counter, methods }: {
  idx: number;
  counter: {
    title: string;
    content: number;
    pas: number;
  };
  methods: {
    add: (idx: number) => void;
    sub: (idx: number) => void;
    handleInputChange: (event: IonInputCustomEvent<InputChangeEventDetail>) => (idx: number) => void;
    };
  }
) {

  const longPressHandler = () => {
    console.log('calls callback after long pressing 300ms');
  };
  const defaultOptions = {
    isPreventDefault: true,
    delay: 3000,
  };
  const longPressEvent = useLongPress(() => { console.log('calls callback after long pressing 3s'); }, defaultOptions);

  return (
    <>
      <IonCard className="ion-padding" {...longPressEvent}>
        <IonHeader>
          <IonCardTitle>
            <IonInput value={counter.title} arial-label="text-input" onIonChange={({ event }) => methods.handleInputChange(idx, event)}></IonInput>
          </IonCardTitle>
        </IonHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol class="ion-text-center" size="10">
                <IonLabel color="secondary">{counter.content}</IonLabel>
              </IonCol>
              <IonCol size="1">
                <IonRow>
                  <IonButton onClick={() => { methods.add(idx); } } color="secondary" shape="round" fill="solid">
                    <IonIcon slot="icon-only" icon={caretUp} />
                  </IonButton>
                </IonRow>
                <IonRow>
                  <IonButton onClick={() => { methods.sub(idx); } } color="secondary" shape="round" fill="solid">
                    <IonIcon slot="icon-only" icon={caretDown} />
                  </IonButton>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard></>
  );
}

class App extends Component {
  state = {  
    counters : [
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
          newCountersCounter : 0
        }
        listRef : any;
        
  add = (idx: number) => {
    let newCounters = [...this.state.counters];
    newCounters[idx].content += this.state.counters[idx].pas; 
    this.setState({
      counters: newCounters
    })
  }
  sub = (idx: number) => {
    let newCounters = [... this.state.counters];
    newCounters[idx].content -= this.state.counters[idx].pas; 
    this.setState({
      counters: newCounters
    })
  }
  addCounter = () => {
    console.log("adding a new counter...")
    this.state.newCountersCounter += 1;
    let newCountersList = [... this.state.counters];
    newCountersList.push({
      title: `Nouveau compteur ${this.state.newCountersCounter}`,
      content: 0,
      pas: 1,
    });

    this.setState({
      counters: newCountersList
    });
  }
  handleInputChange = (idx: number, event: InputCustomEvent<InputChangeEventDetail>) => {
    console.log(`input changes on idx: ${idx} at counter: ${event.detail.value}`)
    let newCounters = [... this.state.counters];
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
                    }}
                  />
                );
                })
              }
            <IonFab vertical="bottom" horizontal="center" slot="fixed">
              <IonFabButton onClick={() => this.addCounter()}>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
          </IonContent>
          </IonPage>
        );
    };
};

export default App;

function str(value: string | null | undefined): string {
  throw new Error('Function not implemented.');
}
