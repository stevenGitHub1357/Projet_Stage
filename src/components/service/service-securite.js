import React, { useEffect, useState } from "react";
import axios from "axios";
import Global_url from "../../global_url";
import CryptoJS from "crypto-js";
var Url = Global_url


const secretKey = "cleSecret"
const iv = CryptoJS.lib.WordArray.random(16);

export {secretKey,iv}
