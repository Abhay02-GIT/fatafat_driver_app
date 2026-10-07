import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CustomTabBar } from '@/components/custom-tab-bar';
import AccountScreen from '@/screens/tabs/AccountScreen';
import EarningsScreen from '@/screens/tabs/EarningsScreen';
import HomeScreen from '@/screens/tabs/HomeScreen';
import TripsScreen from '@/screens/tabs/TripsScreen';

import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}