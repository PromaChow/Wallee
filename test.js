<Stack.Navigator>
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{title: 'Welcome'}}
  />
  <Stack.Screen
    name="Profile"
    component={Profile}
    options={{title: 'Welcome'}}
  />
  <Stack.Screen name="Feed" component={Feed} options={{title: 'Welcome'}} />

  <Stack.Screen name="OTP" component={OTP} options={{title: 'Welcome'}} />

  <Stack.Screen name="SignUp" component={SignUp} options={{title: 'Welcome'}} />

  <Stack.Screen
    name="ChangePhoneNumber"
    component={ChangePhoneNumber}
    options={{headerShown: true, title: 'Change Number'}}
  />
  {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
  <Stack.Screen name="Profile_two" component={Profile_two} />
  <Stack.Screen name="CurrenyList" component={CurrencyList} />
  <Stack.Screen
    name="Notification"
    component={Notification}
    options={{headerShown: false, title: 'Welcome'}}
  />
  <Stack.Screen
    name="UserProfile"
    component={UserProfile}
    options={{headerShown: false, title: 'Welcome'}}
  />

  <Stack.Screen
    name="ChangePhoneNumberOuter"
    component={ChangePhoneNumberOuter}
    options={{headerShown: false, title: 'Welcome'}}
  />

  <Stack.Screen
    name="OTPScreenChange"
    component={OTPScreenChange}
    options={{headerShown: false, title: 'Welcome'}}
  />

  <Stack.Screen
    name="Setting"
    component={Setting}
    options={{headerShown: false, title: 'Welcome'}}
  />

  <Stack.Screen
    name="Identifiers"
    component={Identifiers}
    options={{headerShown: false, title: 'Welcome'}}
  />

  <Stack.Screen
    name="HomePage"
    component={HomePage}
    options={{headerShown: false, title: 'Welcome'}}
  />
</Stack.Navigator>;
