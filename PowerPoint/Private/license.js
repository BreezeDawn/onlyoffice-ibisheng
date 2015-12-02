"use strict";

asc_docs_api.prototype.asc_getEditorPermissions = function(licenseUrl, customerId) {
  var t = this;
  if (this.DocInfo && this.DocInfo.get_Id()) {
    var sUserFirstName = null, sUserLastName = null;
    var oUserInfo = this.DocInfo.get_UserInfo();
    if (oUserInfo) {
      sUserFirstName = oUserInfo.get_FirstName();
      sUserLastName = oUserInfo.get_LastName();
    }
    CheckLicense(licenseUrl, customerId, this.DocInfo.get_UserId(), sUserFirstName, sUserLastName, function(err, res) {
      t._onCheckLicenseEnd(err, res);
    });
  } else {
    // Фиктивный вызов
    this._onCheckLicenseEnd(true, g_oLicenseResult.Error);
  }
  this._coAuthoringInit();
};
asc_docs_api.prototype._onEndPermissions = function() {
  if (null !== this.licenseResult && this.isOnFirstConnectEnd) {
    var oResult = new window['Asc'].asc_CAscEditorPermissions();
    oResult.asc_setCanLicense(g_oLicenseResult.Success === this.licenseResult.res);
    oResult.asc_setCanBranding(g_oLicenseResult.Error !== this.licenseResult.res); // Для тех, у кого есть лицензия, branding доступен
    this.asc_fireCallback('asc_onGetEditorPermissions', oResult);
  }
};