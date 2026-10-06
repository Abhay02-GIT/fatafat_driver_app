import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BecomeRiderScreen from '@/screens/auth/BecomeRiderScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import PayoutSetupScreen from '@/screens/auth/PayoutSetupScreen';
import RegisterDocumentsScreen from '@/screens/auth/RegisterDocumentsScreen';
import RegisterReviewScreen from '@/screens/auth/RegisterReviewScreen';
import RegisterStep1Screen from '@/screens/auth/RegisterStep1Screen';
import RegisterStep2VehicleTypeScreen from '@/screens/auth/RegisterStep2VehicleTypeScreen';
import RegisterVehicleDetailsScreen from '@/screens/auth/RegisterVehicleDetailsScreen';
import UploadDocumentScreen from '@/screens/auth/UploadDocumentScreen';
import VerificationPendingScreen from '@/screens/auth/VerificationPendingScreen';
import VerificationRejectedScreen from '@/screens/auth/VerificationRejectedScreen';
import VerifyOtpScreen from '@/screens/auth/VerifyOtpScreen';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen name="BecomeRider" component={BecomeRiderScreen} />
      <Stack.Screen name="RegisterStep1" component={RegisterStep1Screen} />
      <Stack.Screen
        name="RegisterStep2VehicleType"
        component={RegisterStep2VehicleTypeScreen}
      />
      <Stack.Screen name="RegisterVehicleDetails" component={RegisterVehicleDetailsScreen} />
      <Stack.Screen name="RegisterDocuments" component={RegisterDocumentsScreen} />
      <Stack.Screen name="UploadDocument" component={UploadDocumentScreen} />
      <Stack.Screen name="PayoutSetup" component={PayoutSetupScreen} />
      <Stack.Screen name="RegisterReview" component={RegisterReviewScreen} />
      <Stack.Screen name="VerificationPending" component={VerificationPendingScreen} />
      <Stack.Screen name="VerificationRejected" component={VerificationRejectedScreen} />
    </Stack.Navigator>
  );
}