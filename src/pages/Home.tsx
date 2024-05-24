import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonFab, IonFabButton, IonIcon, IonText } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Widget from '../components/Widget'
import './Home.css';
import { useState } from 'react';
import { add } from 'ionicons/icons';

const Home: React.FC = () => {
  const [widgets, setWidgets] = useState<JSX.Element[]>([]);

  const addWidget = () => {
    setWidgets([...widgets, <Widget key={widgets.length} />]);
    console.log("test")
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonText class="ion-text-center ion-padding">{widgets}</IonText>
      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton onClick={() => addWidget()}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
