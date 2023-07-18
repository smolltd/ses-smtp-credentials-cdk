"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// node_modules/utf8/utf8.js
var require_utf8 = __commonJS({
  "node_modules/utf8/utf8.js"(exports) {
    (function(root) {
      var stringFromCharCode = String.fromCharCode;
      function ucs2decode(string) {
        for (var output = [], counter = 0, length = string.length, value, extra; counter < length; )
          value = string.charCodeAt(counter++), value >= 55296 && value <= 56319 && counter < length ? (extra = string.charCodeAt(counter++), (extra & 64512) == 56320 ? output.push(((value & 1023) << 10) + (extra & 1023) + 65536) : (output.push(value), counter--)) : output.push(value);
        return output;
      }
      function ucs2encode(array) {
        for (var length = array.length, index = -1, value, output = ""; ++index < length; )
          value = array[index], value > 65535 && (value -= 65536, output += stringFromCharCode(value >>> 10 & 1023 | 55296), value = 56320 | value & 1023), output += stringFromCharCode(value);
        return output;
      }
      function checkScalarValue(codePoint) {
        if (codePoint >= 55296 && codePoint <= 57343)
          throw Error(
            "Lone surrogate U+" + codePoint.toString(16).toUpperCase() + " is not a scalar value"
          );
      }
      function createByte(codePoint, shift) {
        return stringFromCharCode(codePoint >> shift & 63 | 128);
      }
      function encodeCodePoint(codePoint) {
        if (!(codePoint & 4294967168))
          return stringFromCharCode(codePoint);
        var symbol = "";
        return codePoint & 4294965248 ? codePoint & 4294901760 ? codePoint & 4292870144 || (symbol = stringFromCharCode(codePoint >> 18 & 7 | 240), symbol += createByte(codePoint, 12), symbol += createByte(codePoint, 6)) : (checkScalarValue(codePoint), symbol = stringFromCharCode(codePoint >> 12 & 15 | 224), symbol += createByte(codePoint, 6)) : symbol = stringFromCharCode(codePoint >> 6 & 31 | 192), symbol += stringFromCharCode(codePoint & 63 | 128), symbol;
      }
      function utf8encode(string) {
        for (var codePoints = ucs2decode(string), length = codePoints.length, index = -1, codePoint, byteString = ""; ++index < length; )
          codePoint = codePoints[index], byteString += encodeCodePoint(codePoint);
        return byteString;
      }
      function readContinuationByte() {
        if (byteIndex >= byteCount)
          throw Error("Invalid byte index");
        var continuationByte = byteArray[byteIndex] & 255;
        if (byteIndex++, (continuationByte & 192) == 128)
          return continuationByte & 63;
        throw Error("Invalid continuation byte");
      }
      function decodeSymbol() {
        var byte1, byte2, byte3, byte4, codePoint;
        if (byteIndex > byteCount)
          throw Error("Invalid byte index");
        if (byteIndex == byteCount)
          return !1;
        if (byte1 = byteArray[byteIndex] & 255, byteIndex++, !(byte1 & 128))
          return byte1;
        if ((byte1 & 224) == 192) {
          if (byte2 = readContinuationByte(), codePoint = (byte1 & 31) << 6 | byte2, codePoint >= 128)
            return codePoint;
          throw Error("Invalid continuation byte");
        }
        if ((byte1 & 240) == 224) {
          if (byte2 = readContinuationByte(), byte3 = readContinuationByte(), codePoint = (byte1 & 15) << 12 | byte2 << 6 | byte3, codePoint >= 2048)
            return checkScalarValue(codePoint), codePoint;
          throw Error("Invalid continuation byte");
        }
        if ((byte1 & 248) == 240 && (byte2 = readContinuationByte(), byte3 = readContinuationByte(), byte4 = readContinuationByte(), codePoint = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4, codePoint >= 65536 && codePoint <= 1114111))
          return codePoint;
        throw Error("Invalid UTF-8 detected");
      }
      var byteArray, byteCount, byteIndex;
      function utf8decode(byteString) {
        byteArray = ucs2decode(byteString), byteCount = byteArray.length, byteIndex = 0;
        for (var codePoints = [], tmp; (tmp = decodeSymbol()) !== !1; )
          codePoints.push(tmp);
        return ucs2encode(codePoints);
      }
      root.version = "3.0.0", root.encode = utf8encode, root.decode = utf8decode;
    })(typeof exports > "u" ? exports.utf8 = {} : exports);
  }
});

// provider/main.ts
var main_exports = {};
__export(main_exports, {
  getSmtpPassword: () => getSmtpPassword,
  onCreate: () => onCreate,
  onDelete: () => onDelete,
  onEvent: () => onEvent,
  onUpdate: () => onUpdate,
  sign: () => sign
});
module.exports = __toCommonJS(main_exports);
var AWS = __toESM(require("aws-sdk")), crypto = __toESM(require("crypto")), utf8 = __toESM(require_utf8()), policyName = "ses-smtp-credentials-policy", sign = (key, msg) => crypto.createHmac("sha256", Buffer.from(key.map((a) => a.charCodeAt(0)))).update(utf8.encode(msg)).digest("binary").toString().split(""), getSmtpPassword = (key, region) => {
  let date = "11111111", service = "ses", terminal = "aws4_request", message = "SendRawEmail", versionInBytes = [4], signature = sign(utf8.encode("AWS4" + key).split(""), date);
  signature = sign(signature, region), signature = sign(signature, service), signature = sign(signature, terminal), signature = sign(signature, message);
  let signatureAndVersion = versionInBytes.slice();
  return signature.forEach((a) => signatureAndVersion.push(a.charCodeAt(0))), Buffer.from(signatureAndVersion).toString("base64");
}, onCreate = async (event) => {
  let region = event.ResourceProperties.Region, roleNameSuffix = event.ResourceProperties.RoleNameSuffix, secretName = event.ResourceProperties.SecretName, iam = new AWS.IAM(), secretsManager = new AWS.SecretsManager(), now = /* @__PURE__ */ new Date(), userName = `ses-user-${roleNameSuffix}`, user = await iam.createUser({
    UserName: userName
  }).promise();
  if (!user.User)
    throw new Error("No user created");
  let policy = await iam.putUserPolicy({
    UserName: user.User.UserName,
    PolicyName: policyName,
    PolicyDocument: JSON.stringify({
      Version: "2012-10-17",
      Statement: {
        Effect: "Allow",
        Action: "ses:SendRawEmail",
        Resource: "*"
      }
    })
  }).promise(), accessKey = await iam.createAccessKey({
    UserName: user.User.UserName
  }).promise(), secret = await secretsManager.createSecret({
    Name: secretName
  }).promise(), username = accessKey.AccessKey.AccessKeyId, secretKey = accessKey.AccessKey.SecretAccessKey, password = getSmtpPassword(secretKey, region);
  return await secretsManager.updateSecret({
    SecretId: secretName,
    SecretString: JSON.stringify({
      username,
      secretKey,
      password
    })
  }).promise(), {
    Status: "SUCCESS",
    PhysicalResourceId: `${user.User.UserName}/${accessKey.AccessKey.AccessKeyId}`,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: {
      SecretARN: secret.ARN
    }
  };
}, onUpdate = async (event) => ({
  Status: "SUCCESS",
  RequestId: event.RequestId,
  StackId: event.StackId,
  LogicalResourceId: event.LogicalResourceId,
  PhysicalResourceId: event.PhysicalResourceId
}), onDelete = async (event) => {
  let iam = new AWS.IAM(), [username, accessKeyId] = event.PhysicalResourceId.split(/\//);
  return await iam.deleteAccessKey({
    UserName: username,
    AccessKeyId: accessKeyId
  }).promise(), await iam.deleteUserPolicy({
    UserName: username,
    PolicyName: policyName
  }).promise(), await iam.deleteUser({
    UserName: username
  }).promise(), {
    Status: "SUCCESS",
    RequestId: event.RequestId,
    StackId: event.StackId,
    LogicalResourceId: event.LogicalResourceId,
    PhysicalResourceId: event.PhysicalResourceId
  };
}, onEvent = (event) => {
  console.log(JSON.stringify(event));
  try {
    switch (event.RequestType) {
      case "Create":
        return onCreate(event);
      case "Update":
        return onUpdate(event);
      case "Delete":
        return onDelete(event);
      default:
        return Promise.reject(`Unknown event type in event ${event}`);
    }
  } catch (err) {
    return console.error(err), Promise.reject("Failed");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSmtpPassword,
  onCreate,
  onDelete,
  onEvent,
  onUpdate,
  sign
});
/*! Bundled license information:

utf8/utf8.js:
  (*! https://mths.be/utf8js v3.0.0 by @mathias *)
*/
