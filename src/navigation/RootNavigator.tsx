import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddBankAccountScreen from '@/screens/AddBankAccountScreen';
import DocumentDetailScreen from '@/screens/DocumentDetailScreen';
import EarningsActivityScreen from '@/screens/EarningsActivityScreen';
import HelpSupportScreen from '@/screens/HelpSupportScreen';
import NotificationsScreen from '@/screens/NotificationsScreen';
import PayoutDetailScreen from '@/screens/PayoutDetailScreen';
import PayoutHistoryScreen from '@/screens/PayoutHistoryScreen';
import ReferARiderScreen from '@/screens/ReferARiderScreen';
import SafetyCentreScreen from '@/screens/SafetyCentreScreen';
import SessionCheckScreen from '@/screens/SessionCheckScreen';
import TripDetailsScreen from '@/screens/TripDetailsScreen';
import WeeklyPlanScreen from '@/screens/WeeklyPlanScreen';
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
import ArrivedWaitingScreen from '@/screens/ArrivedWaitingScreen';
import EnRoutePickupScreen from '@/screens/EnRoutePickupScreen';
import IncomingRequestScreen from '@/screens/IncomingRequestScreen';
import RequestExpiredScreen from '@/screens/RequestExpiredScreen';
import SafetyCheckScreen from '@/screens/SafetyCheckScreen';
import TripAcceptedSummaryScreen from '@/screens/TripAcceptedSummaryScreen';
import ActiveNavigationScreen from '@/screens/ActiveNavigationScreen';
import CallingScreen from '@/screens/CallingScreen';
import CancelTripScreen from '@/screens/CancelTripScreen';
import ChatScreen from '@/screens/ChatScreen';
import SosActiveScreen from '@/screens/SosActiveScreen';
import TripCompleteScreen from '@/screens/TripCompleteScreen';
import DeliveryRequestScreen from '@/screens/DeliveryRequestScreen';
import IdentityCheckScreen from '@/screens/IdentityCheckScreen';
import MultiStopManifestScreen from '@/screens/MultiStopManifestScreen';
import ParcelInTransitNavigationScreen from '@/screens/ParcelInTransitNavigationScreen';
import ParcelPickupVerificationScreen from '@/screens/ParcelPickupVerificationScreen';
import PerStopCancellationScreen from '@/screens/PerStopCancellationScreen';
import CarpoolTripRequestScreen from '@/screens/CarpoolTripRequestScreen';
import DropVerificationCodScreen from '@/screens/DropVerificationCodScreen';
import FareMatchDiscountScreen from '@/screens/FareMatchDiscountScreen';
import FemaleRiderVerificationScreen from '@/screens/FemaleRiderVerificationScreen';
import PinkScootySafetyBadgeScreen from '@/screens/PinkScootySafetyBadgeScreen';
import PinkScootyTripRequestScreen from '@/screens/PinkScootyTripRequestScreen';
import SafetyShieldSosScreen from '@/screens/SafetyShieldSosScreen';

import TabNavigator from './TabNavigator';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const modal = { presentation: 'modal', animation: 'slide_from_bottom' } as const;

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SessionCheck"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="SessionCheck" component={SessionCheckScreen} options={{ animation: 'fade' }} />

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

      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={modal} />
      <Stack.Screen name="TripDetails" component={TripDetailsScreen} options={modal} />
      <Stack.Screen name="EarningsActivity" component={EarningsActivityScreen} />
      <Stack.Screen name="PayoutHistory" component={PayoutHistoryScreen} />
      <Stack.Screen name="PayoutDetail" component={PayoutDetailScreen} />
      <Stack.Screen name="SafetyCentre" component={SafetyCentreScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="ReferARider" component={ReferARiderScreen} />
      <Stack.Screen name="DocumentDetail" component={DocumentDetailScreen} />
      <Stack.Screen name="AddBankAccount" component={AddBankAccountScreen} />
      <Stack.Screen name="WeeklyPlan" component={WeeklyPlanScreen} />
      <Stack.Screen name="IncomingRequest" component={IncomingRequestScreen} />
      <Stack.Screen name="RequestExpired" component={RequestExpiredScreen} />
      <Stack.Screen name="TripAcceptedSummary" component={TripAcceptedSummaryScreen} />
      <Stack.Screen name="EnRoutePickup" component={EnRoutePickupScreen} />
      <Stack.Screen name="ArrivedWaiting" component={ArrivedWaitingScreen} />
      <Stack.Screen name="SafetyCheck" component={SafetyCheckScreen} options={modal} />
      <Stack.Screen name="ActiveNavigation" component={ActiveNavigationScreen} />
      <Stack.Screen name="TripComplete" component={TripCompleteScreen} />
      <Stack.Screen name="CancelTrip" component={CancelTripScreen} options={modal} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Calling" component={CallingScreen} options={modal} />
      <Stack.Screen name="SosActive" component={SosActiveScreen} options={modal} />
      <Stack.Screen name="DeliveryRequest" component={DeliveryRequestScreen} />
      <Stack.Screen name="ParcelPickupVerification" component={ParcelPickupVerificationScreen} />
      <Stack.Screen name="ParcelInTransitNavigation" component={ParcelInTransitNavigationScreen} />
      <Stack.Screen name="MultiStopManifest" component={MultiStopManifestScreen} />
      <Stack.Screen name="PerStopCancellation" component={PerStopCancellationScreen} options={modal} />
      <Stack.Screen name="IdentityCheck" component={IdentityCheckScreen} />
      <Stack.Screen name="DropVerificationCod" component={DropVerificationCodScreen} />
      <Stack.Screen name="FareMatchDiscount" component={FareMatchDiscountScreen} options={modal} />
      <Stack.Screen name="FemaleRiderVerification" component={FemaleRiderVerificationScreen} />
      <Stack.Screen name="PinkScootySafetyBadge" component={PinkScootySafetyBadgeScreen} />
      <Stack.Screen name="SafetyShieldSos" component={SafetyShieldSosScreen} />
      <Stack.Screen name="PinkScootyTripRequest" component={PinkScootyTripRequestScreen} />
      <Stack.Screen name="CarpoolTripRequest" component={CarpoolTripRequestScreen} />
    </Stack.Navigator>
  );
}