import {
	settings
} from './common';
import CryptoJS from "../libraries/crypto.js";

const defaultKey = CryptoJS.enc.Utf8.parse(settings.request.crypto.key);
const defaultIv = CryptoJS.enc.Utf8.parse(settings.request.crypto.iv);

const encrypt = function(text, key = defaultKey, iv = defaultIv) {
	try {
		return CryptoJS.AES.encrypt(text, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		}).toString();
	} catch (error) {
		console.error("Encryption failed:", error.message);
		return null;
	}
};

const decrypt = function(text, key = defaultKey, iv = defaultIv) {
	try {
		const result = CryptoJS.AES.decrypt(text, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return result.toString(CryptoJS.enc.Utf8);
	} catch (error) {
		console.error("Decryption failed:", error.message);
		return null;
	}
};

export default {
	encrypt,
	decrypt
};