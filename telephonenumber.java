public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
    if (action.equals("get")) {
        TelephonyManager telephonyManager =
            (TelephonyManager)this.cordova.getActivity().getSystemService(Context.TELEPHONY_SERVICE);
        String result = telephonyManager.getLine1Number();
        if (result != null) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, result));
            return true;
        } else {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, 0));
            return false;
        }
    }
    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION));
    return false;
 }