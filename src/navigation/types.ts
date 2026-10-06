import { useNavigation, type NavigatorScreenParams } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type TabParamList = {
  Home: undefined;
  Trips: undefined;
  Earnings: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  SessionCheck: undefined;

  Login: undefined;
  VerifyOtp: { phone: string };
  BecomeRider: undefined;
  RegisterStep1: undefined;
  RegisterStep2VehicleType: undefined;
  RegisterVehicleDetails: undefined;
  RegisterDocuments: undefined;
  UploadDocument: { title: string; docId: string };
  RegisterReview: undefined;
  VerificationPending: undefined;
  VerificationRejected: undefined;
  PayoutSetup: undefined;

  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  Notifications: undefined;
  TripDetails: undefined;
  EarningsActivity: undefined;
  PayoutHistory: undefined;
  PayoutDetail: undefined;
  SafetyCentre: undefined;
  HelpSupport: undefined;
  ReferARider: undefined;
  DocumentDetail: { docId: string };
  AddBankAccount: undefined;
  WeeklyPlan: undefined;

  IncomingRequest: undefined;
  TripAcceptedSummary: undefined;
  EnRoutePickup: undefined;
  ArrivedWaiting: undefined;
  SafetyCheck: undefined;
  ActiveNavigation: undefined;
  TripComplete: undefined;
  CancelTrip: undefined;
  Chat: undefined;
  Calling: undefined;
  IdentityCheck: undefined;
  ParcelPickupVerification: undefined;
  MultiStopManifest: undefined;
  SosActive: undefined;
  RequestExpired: undefined;
  FareMatchDiscount: undefined;
  FemaleRiderVerification: undefined;
  PinkScootySafetyBadge: undefined;
  SafetyShieldSos: undefined;
  PinkScootyTripRequest: undefined;
  CarpoolTripRequest: undefined;
  PerStopCancellation: { stopName?: string; stopInfo?: string } | undefined;
  DeliveryRequest: undefined;
  ParcelInTransitNavigation: undefined;
  DropVerificationCod: undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export function useNav() {
  return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
}