package com.geoverse_app_rn;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;
import android.content.Intent;
import android.content.res.Configuration;

public class MainActivity extends ReactActivity {

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState); // or super.onCreate(null) with react-native-screens
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this); // display the generated bootsplash.xml drawable over
                                                                 // our MainActivity
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "GeoCRM";
  }
}
