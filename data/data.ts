import {AnimationObject} from 'lottie-react-native';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require('../assets/animations/Lottie1.json'),
    text: 'Swipe through restaurants to find your perfect match',
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce',
  },
  {
    id: 2,
    animation: require('../assets//animations/Lottie4.json'),
    text: 'Explore amazing restaurants around you',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    animation: require('../assets//animations/food2.json'),
    text: 'Match with your cravings and enjoy your next meal!',
    textColor: '#F15937',
    backgroundColor: '#faeb8a',
  },
];

export default data;
