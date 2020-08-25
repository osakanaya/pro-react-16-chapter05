import Axios from "axios";
import { RestUrls } from "./Urls";

export class RestDataSource {
    SendRequest = (method, url) => Axios.request({ method, url });

    GetData = (dataType) => this.SendRequest("get", RestUrls[dataType]);
}