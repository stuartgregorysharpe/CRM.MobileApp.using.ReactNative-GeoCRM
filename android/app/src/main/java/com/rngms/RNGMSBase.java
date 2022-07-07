package com.rngms;

import android.widget.Toast;
import android.content.Context; 
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailabilityLight;

public class RNGMSBase extends ReactContextBaseJavaModule {

    public RNGMSBase(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // ReactContextBaseJavaModule requires derived class implement getName method. This function returns a string.
    // This string is used to tag the native module on the JavaScript side
    @Override
    public String getName() {
        return "GMSBase";
    }

    // Gets the application package name
    // To export a method for JavaScript use, Java methods need to use the @reactmethod annotation
    @ReactMethod
    public void getPackageName() {
        Toast.makeText(getReactApplicationContext(),"RNGMSBase has been called",Toast.LENGTH_LONG).show();
    }
    
    // Check is the device support GMS service 
    // To export a method for JavaScript use, Java methods need to use the @reactmethod annotation

    @ReactMethod
    public void isGmsAvailable(Callback booleanCallback) {
        boolean isAvailable = false;
        Context context = getReactApplicationContext();
        if (null != context) {
            int result = GoogleApiAvailabilityLight.getInstance().isGooglePlayServicesAvailable(context);
            isAvailable = (ConnectionResult.SUCCESS == result);
        }
        Log.i("React",  "isGmsAvailable: " + isAvailable);
        booleanCallback.invoke(isAvailable);
    }

}