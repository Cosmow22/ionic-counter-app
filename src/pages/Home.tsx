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
  IonInput,
  IonModal,
  InputCustomEvent,
  InputChangeEventDetail,
  IonReorderGroup,
  IonReorder,
  IonRange,
  useIonViewDidLeave,
} from '@ionic/react';
import {caretUp, caretDown, add, arrowBackOutline, trashOutline } from 'ionicons/icons';
import { Component, RefObject } from "react";
import { useLongPress } from 'react-use';


function CounterWiget({ idx, counter, methods }: {
  idx: number;
  iRef: any;
  counter: {
    title: string;
    content: number;
    pitch: number;
    isModalOpened: boolean
  };
  methods: {
    add: (idx: number, minus?: boolean, value?: any) => void;
    toogleModal: (idx: number) => void;
    deleteCounter: (idx: number) => void;
    changePitch: (idx: number, value: any) => void;
    handleInputChange: (idx: number, event: any) => void;
    };
  }
) {

  const longPressHandler = () => {
    console.log('calls callback after long pressing 2s');
    methods.toogleModal(idx)
  };
  const defaultOptions = {
    isPreventDefault: true,
    delay: 2000,
  };
  const longPressEvent = useLongPress(longPressHandler, defaultOptions);

  return (
      <>
      <IonCard className="ion-padding" {...longPressEvent}>
      <IonHeader>
        <IonCardTitle>
          <IonInput
            value={counter.title}
            arial-label="text-input" 
            onIonChange={event => methods.handleInputChange(idx, event)}
          />
        </IonCardTitle>
      </IonHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol class="ion-text-center" size="10">
              <div className="counter-value">{counter.content}</div>
            </IonCol>
            <IonCol size="1">
              <IonRow className="ion-align-items-center">
                <IonButton onClick={() => { methods.add(idx) }} color="secondary" shape="round" fill="solid">
                  <IonIcon slot="icon-only" icon={caretUp} />
                </IonButton>
              </IonRow>
              <IonRow className="ion-align-items-center">
                <IonButton onClick={() => { methods.add(idx, true) }} color="secondary" shape="round" fill="solid">
                  <IonIcon slot="icon-only" icon={caretDown} />
                </IonButton>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
    <IonModal isOpen={counter.isModalOpened}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Manage</IonTitle>
            <IonButton onClick={() => methods.toogleModal(idx)} slot="start" shape="round">
              <IonIcon icon={arrowBackOutline} slot="icon-only"></IonIcon>
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <div className="range-container">
                <IonLabel><h1>Modify counter's value</h1></IonLabel>
                <IonRange
                  aria-label="Range with pin"
                  pin={true}
                  pinFormatter={(value: number) => (value >= 0 ? `+${value}` : value)}
                  min={-50}
                  max={50}
                  value={0}
                  onIonChange={({ detail }) => (methods.add(idx, false, detail.value))}>
                </IonRange>
              </div>
            </IonItem>
            <IonItem>
              <div className="flex-container">
                <IonLabel><h1>Change counter pitch</h1></IonLabel>
                <IonRange
                  aria-label="Range with pin"
                  pin={true}
                  pinFormatter={(value: number) => (value !== 0 ? `+${value}` : value)}
                  min={1}
                  max={10}
                  value={counter.pitch}
                  onIonChange={({ detail }) => (methods.changePitch(idx, detail.value))}>
                </IonRange>
              </div>
            </IonItem>
            <div className="flex-container">
              <IonButton color="danger" onClick={() => methods.deleteCounter(idx)}>
                <IonIcon icon={trashOutline}></IonIcon>
                Delete
              </IonButton>
            </div>
          </IonList>
        </IonContent>
      </IonModal></>
  );
}

class Home extends Component {
  state = {  
    counters : [
            {
              title: "Pompes du mois",
              content: 110,
              pitch: 10,
              isModalOpened: false,
            },
            {
              title: "Grains de riz",
              content: 287,
              pitch: 1,
              isModalOpened: false,
            } 
          ],
    newCountersCounter : 0,
    //storedState: false as unknown as string | null
    }
        
      
  add = (idx: number, minus: boolean=false, value?: any): void => {
    let newCounters = [...this.state.counters];
    
    if (minus) {
      newCounters[idx].content -= this.state.counters[idx].pitch; 
    } else {
      newCounters[idx].content += value ?? this.state.counters[idx].pitch; 
    }
    this.setState({
      counters: newCounters
    })
    console.log(`${this.state.counters[idx]} vaut ${this.state.counters[idx].content} dans la classe`)
  }
  
  changePitch = (idx: number, value: any) => {
    let newCounters = [... this.state.counters];
    newCounters[idx].pitch = value;
    this.setState({
      counters: newCounters
    })  
  }
  
  addCounter = () => {
    this.state.newCountersCounter += 1;
    let newCountersList = [... this.state.counters];
    newCountersList.push({
      title: `Nouveau compteur ${this.state.newCountersCounter}`,
      content: 0,
      pitch: 1,
      isModalOpened: false,
    });
    this.setState({
      counters: newCountersList
    });
  }
  
  deleteCounter = (idx: number) => {
    let newCountersList = [... this.state.counters];
    newCountersList.splice(idx, 1)
    this.setState({
      counters: newCountersList
    });
    if (this.state.counters[idx].title.startsWith("Nouveau compteur")) {
      this.state.newCountersCounter -= 1;
    }
  }
  
  toogleModal = (idx: number) => {
    let newCounters = [... this.state.counters];
    newCounters[idx].isModalOpened = ! this.state.counters[idx].isModalOpened
    this.setState({
      counters: newCounters
    });
  }

  inputRef: any;
  handleInputChange = (idx: number, event: any) => {
    console.log(`input changes on idx: ${idx} at counter: ${event}`)
    let newCounters = [... this.state.counters];
    newCounters[idx].title = event.detail.value ////this.inputRef.getInputElement();
    this.setState({
      counters: newCounters
    });
  }
  
  reorderCardHandler = (event: any) => {
    const itemMove = this.state.counters.splice(event.detail.from, 1)[0];
    this.state.counters.splice(event.detail.to, 0, itemMove);
    event.detail.complete()
  }
  

  render() {  
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Professional Counter App</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
            <IonReorderGroup disabled={false} onIonItemReorder={this.reorderCardHandler}> 
              {this.state.counters.map((counterItem, idx) => {
                return (
                  <IonItem key={idx}>
                  <CounterWiget
                    counter={counterItem}
                    idx={idx}
                    iRef={this.inputRef}
                    methods={{
                      add: this.add,
                      toogleModal: this.toogleModal,
                      deleteCounter: this.deleteCounter,
                      changePitch: this.changePitch,
                      handleInputChange: this.handleInputChange,
                    }} />
                  <IonReorder slot="end"></IonReorder>
                  </IonItem>
                );
              })
            }
            </IonReorderGroup>
            </IonList>
            <IonFab vertical="bottom" horizontal="center" slot="fixed">
              <IonFabButton onClick={() => this.addCounter()}>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
            <IonLabel>Les carottes sont cuites</IonLabel>
          </IonContent>
          </IonPage>
        );
    };
};

export default Home;
